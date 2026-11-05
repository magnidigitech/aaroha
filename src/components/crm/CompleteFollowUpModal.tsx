"use client";

import React, { useState } from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";
import { CrmFollowUp, LeadStatus } from "@/lib/crm/types";

interface CompleteFollowUpModalProps {
  followUp: CrmFollowUp;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OUTCOME_STATUSES: LeadStatus[] = [
  "Interested",
  "Demo / Counselling Scheduled",
  "Converted",
  "Follow-up Required",
  "Not Interested",
  "Lost",
  "Call Not Answered",
];

export const CompleteFollowUpModal: React.FC<CompleteFollowUpModalProps> = ({
  followUp,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [outcomeRemarks, setOutcomeRemarks] = useState("");
  const [newStatus, setNewStatus] = useState<LeadStatus>("Interested");
  const [needSubsequentFollowUp, setNeedSubsequentFollowUp] = useState(false);
  const [nextDate, setNextDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeRemarks.trim()) {
      setError("Please describe the call outcome and feedback.");
      return;
    }

    if (needSubsequentFollowUp && !nextDate) {
      setError("Please choose the next scheduled follow-up date & time.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/crm/followups/${followUp.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          outcome_remarks: outcomeRemarks.trim(),
          new_status: newStatus,
          next_scheduled_at: needSubsequentFollowUp ? nextDate : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to complete follow-up");
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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Follow-up Outcome</h3>
              <p className="text-xs text-slate-500">{followUp.lead_name} &bull; {followUp.lead_phone}</p>
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
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Outcome Remarks <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={outcomeRemarks}
              onChange={(e) => setOutcomeRemarks(e.target.value)}
              placeholder="What was the result of the conversation? e.g., Confirmed demo attendance for Saturday, agreed on course fee..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Update Lead Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as LeadStatus)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-semibold"
            >
              {OUTCOME_STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={needSubsequentFollowUp}
                onChange={(e) => setNeedSubsequentFollowUp(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Schedule another follow-up call with prospect</span>
            </label>
          </div>

          {needSubsequentFollowUp && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Next Follow-up Date & Time
              </label>
              <input
                type="datetime-local"
                required={needSubsequentFollowUp}
                value={nextDate}
                onChange={(e) => setNextDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              />
            </div>
          )}

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
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{loading ? "Completing..." : "Complete Follow-up"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
