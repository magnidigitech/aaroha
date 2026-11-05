"use client";

import React, { useState, useEffect } from "react";
import { Phone, X, Save, Clock, Calendar, AlertCircle, Sparkles } from "lucide-react";
import { CrmLead, LeadStatus, FollowUpPriority } from "@/lib/crm/types";

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

  // Follow-up sub-fields
  const [requiresFollowUp, setRequiresFollowUp] = useState(lead.status === "Follow-up Required");
  const [followupDate, setFollowupDate] = useState("");
  const [followupPriority, setFollowupPriority] = useState<FollowUpPriority>("High");
  const [followupNotes, setFollowupNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Default follow-up time to tomorrow 11:00 AM
  useEffect(() => {
    if (isOpen) {
      setLeadStatus(lead.status);
      setRequiresFollowUp(lead.status === "Follow-up Required");
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(11, 0, 0, 0);
      const iso = tomorrow.toISOString().slice(0, 16);
      setFollowupDate(iso);
      setError("");
    }
  }, [isOpen, lead]);

  const handleStatusChange = (newStatus: LeadStatus) => {
    setLeadStatus(newStatus);
    if (newStatus === "Follow-up Required") {
      setRequiresFollowUp(true);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim()) {
      setError("Please enter conversation remarks.");
      return;
    }

    if (requiresFollowUp && !followupDate) {
      setError("Please specify the next follow-up date and time.");
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
          update_lead_status: requiresFollowUp ? "Follow-up Required" : leadStatus !== lead.status ? leadStatus : undefined,
          followup_date: requiresFollowUp ? new Date(followupDate).toISOString() : undefined,
          followup_priority: requiresFollowUp ? followupPriority : undefined,
          followup_remarks: requiresFollowUp ? followupNotes.trim() || remarks.trim() : undefined,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <Phone className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">Log Call Interaction</h3>
              <p className="text-xs text-slate-500 font-normal">{lead.full_name} &bull; {lead.mobile_number}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {error && (
          <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 text-xs py-2.5 px-3.5 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 stroke-[1.75]" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Call Outcome
            </label>
            <select
              value={callStatus}
              onChange={(e) => setCallStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-medium"
            >
              {CALL_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Conversation Remarks <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Record candidate interest, discussed program, fee query, batch preferences..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Call Duration (seconds)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all"
                />
                <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 stroke-[1.75]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Update Lead Status
              </label>
              <select
                value={leadStatus}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-medium"
              >
                {LEAD_NEXT_STATUSES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Follow-up Required Toggle / Expansion Card */}
          <div className="pt-2">
            <div className={`p-4 rounded-2xl border transition-all duration-200 ${
              requiresFollowUp
                ? "bg-amber-50/40 border-amber-200/80"
                : "bg-slate-50/60 border-slate-200/60"
            }`}>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requiresFollowUp}
                    onChange={(e) => {
                      setRequiresFollowUp(e.target.checked);
                      if (e.target.checked) {
                        setLeadStatus("Follow-up Required");
                      }
                    }}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className="font-medium text-slate-800 text-xs flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 stroke-[1.75]" />
                    <span>Schedule Next Follow-up</span>
                  </span>
                </label>
                {requiresFollowUp && (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    Follow-up Required
                  </span>
                )}
              </div>

              {requiresFollowUp && (
                <div className="mt-3.5 pt-3 border-t border-amber-200/60 space-y-3 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Follow-up Date & Time <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        required={requiresFollowUp}
                        value={followupDate}
                        onChange={(e) => setFollowupDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Priority Level
                      </label>
                      <div className="flex space-x-1.5">
                        {(["High", "Medium", "Low"] as FollowUpPriority[]).map((p) => (
                          <button
                            type="button"
                            key={p}
                            onClick={() => setFollowupPriority(p)}
                            className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                              followupPriority === p
                                ? p === "High"
                                  ? "bg-rose-50 text-rose-700 border-rose-300 shadow-xs"
                                  : p === "Medium"
                                  ? "bg-amber-50 text-amber-700 border-amber-300 shadow-xs"
                                  : "bg-slate-100 text-slate-700 border-slate-300 shadow-xs"
                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Follow-up Objective (optional)
                    </label>
                    <input
                      type="text"
                      value={followupNotes}
                      onChange={(e) => setFollowupNotes(e.target.value)}
                      placeholder="e.g., Demo confirmation, fee approval, batch schedule discussion"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-xs placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black active:scale-[0.98] text-white font-medium shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{loading ? "Recording..." : "Save Call Log"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
