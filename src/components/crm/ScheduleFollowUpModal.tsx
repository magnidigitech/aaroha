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
  // Default to tomorrow 10:00 AM
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(10, 0, 0, 0);

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
          scheduled_at: scheduledAt,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Schedule Follow-up</h3>
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
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Follow-up Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Low", "Medium", "High"] as FollowUpPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 rounded-xl font-bold border transition text-center cursor-pointer ${
                    priority === p
                      ? p === "High"
                        ? "bg-rose-50 border-rose-500 text-rose-700 shadow-xs"
                        : p === "Medium"
                        ? "bg-amber-50 border-amber-500 text-amber-800 shadow-xs"
                        : "bg-slate-100 border-slate-400 text-slate-800 shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Follow-up Objective / Note
            </label>
            <textarea
              rows={2.5}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g., Ask about batch timings decision, send brochure PDF, confirm demo attendance..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
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
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/30 flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{loading ? "Scheduling..." : "Confirm Follow-up"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

