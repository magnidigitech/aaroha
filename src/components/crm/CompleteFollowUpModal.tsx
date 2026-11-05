"use client";

import React, { useState } from "react";
import { CheckCircle2, X, AlertCircle, Calendar } from "lucide-react";
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
          new_status: needSubsequentFollowUp ? "Follow-up Required" : newStatus,
          next_scheduled_at: needSubsequentFollowUp ? new Date(nextDate).toISOString() : undefined,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">Record Follow-up Outcome</h3>
              <p className="text-xs text-slate-500 font-normal">{followUp.lead_name} &bull; {followUp.lead_phone}</p>
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
              Call Outcome & Feedback <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={outcomeRemarks}
              onChange={(e) => setOutcomeRemarks(e.target.value)}
              placeholder="Detailed conversation outcome: decision status, batch fit, counselling feedback..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Updated Lead Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => {
                const val = e.target.value as LeadStatus;
                setNewStatus(val);
                if (val === "Follow-up Required") {
                  setNeedSubsequentFollowUp(true);
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-medium"
            >
              {OUTCOME_STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <div className={`p-3.5 rounded-2xl border transition-all ${
              needSubsequentFollowUp
                ? "bg-amber-50/40 border-amber-200/80"
                : "bg-slate-50/60 border-slate-200/60"
            }`}>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needSubsequentFollowUp}
                  onChange={(e) => setNeedSubsequentFollowUp(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span className="font-medium text-slate-800 text-xs flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 stroke-[1.75]" />
                  <span>Schedule next follow-up call with candidate</span>
                </span>
              </label>

              {needSubsequentFollowUp && (
                <div className="mt-3 pt-3 border-t border-amber-200/60 animate-in fade-in duration-150">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Next Follow-up Date & Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required={needSubsequentFollowUp}
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-xs"
                  />
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
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{loading ? "Recording..." : "Complete Follow-up"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
