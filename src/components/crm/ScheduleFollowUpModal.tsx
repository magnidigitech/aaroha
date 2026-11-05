"use client";

import React, { useState } from "react";
import { Calendar, X, Clock, AlertCircle } from "lucide-react";
import { CrmLead, FollowUpPriority } from "@/lib/crm/types";

interface ScheduleFollowUpModalProps {
  lead: CrmLead;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ScheduleFollowUpModal: React.FC<ScheduleFollowUpModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Default to tomorrow 11:00 AM
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(11, 0, 0, 0);

  const formatLocalIso = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [scheduledAt, setScheduledAt] = useState(formatLocalIso(defaultDate));
  const [priority, setPriority] = useState<FollowUpPriority>("Medium");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledAt) {
      setError("Please pick a scheduled date and time.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/crm/leads/${lead.id}/followup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduled_at: new Date(scheduledAt).toISOString(),
          priority,
          remarks: remarks.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to schedule follow-up");
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
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">Schedule Follow-up</h3>
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
              Follow-up Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Low", "Medium", "High"] as FollowUpPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    priority === p
                      ? p === "High"
                        ? "bg-rose-50/80 border-rose-200 text-rose-700 shadow-xs"
                        : p === "Medium"
                        ? "bg-amber-50/80 border-amber-200 text-amber-800 shadow-xs"
                        : "bg-slate-100 border-slate-200 text-slate-800 shadow-xs"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Follow-up Objective (optional)
            </label>
            <textarea
              rows={2.5}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g., Curriculum roadmap review, batch schedule confirmation, demo call..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all resize-none"
            />
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
              <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{loading ? "Scheduling..." : "Confirm Follow-up"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
