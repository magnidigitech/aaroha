"use client";

import React, { useState } from "react";
import { Phone, X, Save, Clock } from "lucide-react";
import { CrmLead, LeadStatus } from "@/lib/crm/types";

interface CallLogModalProps {
  lead: CrmLead;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CALL_STATUSES = [
  "Connected / Spoke",
  "Call Not Answered",
  "Switched Off",
  "Busy / Call Back Later",
  "Wrong Number",
  "Disconnected",
];

const LEAD_NEXT_STATUSES: LeadStatus[] = [
  "Interested",
  "Demo / Counselling Scheduled",
  "Follow-up Required",
  "Not Interested",
  "Call Not Answered",
  "Switched Off",
  "Busy",
  "Converted",
  "Lost",
];

export const CallLogModal: React.FC<CallLogModalProps> = ({ lead, isOpen, onClose, onSuccess }) => {
  const [callStatus, setCallStatus] = useState("Connected / Spoke");
  const [remarks, setRemarks] = useState("");
  const [duration, setDuration] = useState("60");
  const [leadStatus, setLeadStatus] = useState<LeadStatus>(lead.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim()) {
      setError("Please enter conversation remarks.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/crm/leads/${lead.id}/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call_status: callStatus,
          remarks: remarks.trim(),
          duration_seconds: Number(duration) || 0,
          update_lead_status: leadStatus !== lead.status ? leadStatus : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to log call");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Log Call Record</h3>
              <p className="text-xs text-slate-500">{lead.full_name} &bull; {lead.mobile_number}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">Call Outcome</label>
            <select
              value={callStatus}
              onChange={(e) => setCallStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            >
              {CALL_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Conversation Remarks <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Detailed notes: candidate interest, fee questions, target batch timing, domain change discussion..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Call Duration (seconds)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Update Lead Status
              </label>
              <select
                value={leadStatus}
                onChange={(e) => setLeadStatus(e.target.value as LeadStatus)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-semibold text-slate-800"
              >
                {LEAD_NEXT_STATUSES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/30 flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Saving Log..." : "Save Call Log"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
