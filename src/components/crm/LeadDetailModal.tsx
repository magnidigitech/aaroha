"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  User,
  Calendar,
  Clock,
  History,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  UserCheck,
  FileText,
  MapPin,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { CrmLead, CrmActivityTimeline, CrmCallLog, LeadStatus, CrmUser } from "@/lib/crm/types";

interface LeadDetailModalProps {
  leadId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCallModal: (lead: CrmLead) => void;
  onOpenFollowUpModal: (lead: CrmLead) => void;
  isAdmin: boolean;
  telecallers: CrmUser[];
  onLeadUpdated: () => void;
}

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "Assigned",
  "Not Contacted",
  "Call Not Answered",
  "Switched Off",
  "Busy",
  "Interested",
  "Not Interested",
  "Follow-up Required",
  "Demo / Counselling Scheduled",
  "Converted",
  "Lost",
];

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  leadId,
  isOpen,
  onClose,
  onOpenCallModal,
  onOpenFollowUpModal,
  isAdmin,
  telecallers,
  onLeadUpdated,
}) => {
  const [lead, setLead] = useState<CrmLead | null>(null);
  const [timeline, setTimeline] = useState<CrmActivityTimeline[]>([]);
  const [callLogs, setCallLogs] = useState<CrmCallLog[]>([]);
  const [activeTab, setActiveTab] = useState<"timeline" | "calls" | "details">("timeline");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (leadId && isOpen) {
      loadLead(leadId);
    }
  }, [leadId, isOpen]);

  const loadLead = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/crm/leads/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
        setTimeline(data.timeline || []);
        setCallLogs(data.callLogs || []);
      }
    } catch (err) {
      console.error("Error loading lead", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead) return;

    // If changing to Follow-up Required, directly trigger the follow-up scheduler
    if (newStatus === "Follow-up Required") {
      onOpenFollowUpModal(lead);
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/crm/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await loadLead(lead.id);
        onLeadUpdated();
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignChange = async (teleIdStr: string) => {
    if (!lead) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/crm/leads/${lead.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telecaller_id: teleIdStr ? Number(teleIdStr) : null }),
      });
      if (res.ok) {
        await loadLead(lead.id);
        onLeadUpdated();
      }
    } finally {
      setUpdating(false);
    }
  };

  if (!isOpen) return null;

  const cleanPhone = lead?.mobile_number ? lead.mobile_number.replace(/[^0-9]/g, "") : "";
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}?text=${encodeURIComponent(
        `Hello ${lead?.full_name || ""}, this is from AAROHA Technologies regarding your enquiry.`
      )}`
    : "";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18)] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Apple Style Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 tracking-tight">
                {lead?.lead_code || "LEAD"}
              </span>
              <span className="text-xs text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-normal">
                {lead?.form_name || "Website Enquiry"}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight mt-1">{lead?.full_name || "Loading..."}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600">
              <a href={`tel:${lead?.mobile_number}`} className="flex items-center space-x-1.5 text-blue-600 hover:text-blue-700 font-medium">
                <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>{lead?.mobile_number}</span>
              </a>
              {lead?.email && (
                <>
                  <span className="text-slate-300">&bull;</span>
                  <a href={`mailto:${lead.email}`} className="flex items-center space-x-1.5 hover:text-slate-900">
                    <Mail className="w-3.5 h-3.5 stroke-[1.75] text-slate-400" />
                    <span>{lead.email}</span>
                  </a>
                </>
              )}
              {lead?.city && (
                <>
                  <span className="text-slate-300">&bull;</span>
                  <span className="flex items-center space-x-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 stroke-[1.75] text-slate-400" />
                    <span>{lead.city}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {/* Quick Action Bar */}
        {lead && (
          <div className="px-6 py-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => onOpenCallModal(lead)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black active:scale-[0.98] text-white font-medium transition-all shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Log Call</span>
              </button>

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100/70 active:scale-[0.98] font-medium transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>WhatsApp</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => onOpenFollowUpModal(lead)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100/70 active:scale-[0.98] font-medium transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Schedule Follow-up</span>
              </button>
            </div>

            {/* Status & Assignment selectors */}
            <div className="flex items-center space-x-2">
              <div>
                <select
                  disabled={updating}
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 font-medium text-xs bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  {ALL_STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {isAdmin && (
                <div>
                  <select
                    disabled={updating}
                    value={lead.assigned_telecaller_id || ""}
                    onChange={(e) => handleAssignChange(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 font-medium text-xs bg-slate-50 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">Unassigned</option>
                    {telecallers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Apple Segmented Tab Control */}
        <div className="border-b border-slate-100 px-6 pt-2 pb-2 bg-slate-50/30 flex items-center justify-between">
          <div className="inline-flex p-1 bg-slate-200/60 rounded-xl space-x-1 text-xs">
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "timeline"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Activity Timeline ({timeline.length})
            </button>
            <button
              onClick={() => setActiveTab("calls")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "calls"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Call History ({callLogs.length})
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "details"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Candidate Profile
            </button>
          </div>

          {lead?.next_followup_at && (
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
              <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Next Follow-up: {new Date(lead.next_followup_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
            </div>
          )}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-2" />
              <span>Loading details...</span>
            </div>
          ) : !lead ? (
            <div className="text-center py-12 text-slate-400 text-xs">Lead record not found</div>
          ) : (
            <>
              {/* TAB 1: ACTIVITY TIMELINE */}
              {activeTab === "timeline" && (
                <div className="space-y-4">
                  {timeline.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No activity recorded yet for this lead.
                    </div>
                  ) : (
                    <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {timeline.map((act) => (
                        <div key={act.id} className="relative group">
                          {/* Timeline dot */}
                          <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] shadow-xs ${
                            act.action_type.includes("CREATED")
                              ? "bg-blue-600 ring-4 ring-white"
                              : act.action_type.includes("ASSIGN")
                              ? "bg-indigo-600 ring-4 ring-white"
                              : act.action_type.includes("CALL")
                              ? "bg-slate-700 ring-4 ring-white"
                              : act.action_type.includes("FOLLOW_UP")
                              ? "bg-amber-600 ring-4 ring-white"
                              : act.action_type.includes("STATUS")
                              ? "bg-emerald-600 ring-4 ring-white"
                              : "bg-slate-500 ring-4 ring-white"
                          }`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>

                          <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 rounded-2xl p-4 transition-all">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-slate-900">{act.title}</span>
                              <span className="text-[11px] text-slate-400">
                                {new Date(act.created_at).toLocaleString("en-IN", {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })}
                              </span>
                            </div>
                            {act.details && (
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {act.details}
                              </p>
                            )}
                            {act.user_name && (
                              <div className="mt-2 text-[11px] text-slate-400 font-medium">
                                Action by: {act.user_name}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CALL LOGS */}
              {activeTab === "calls" && (
                <div className="space-y-3">
                  {callLogs.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No call records logged yet. Click &quot;Log Call&quot; above to add conversation notes.
                    </div>
                  ) : (
                    callLogs.map((call) => (
                      <div key={call.id} className="p-4 rounded-2xl border border-slate-200/70 bg-white shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                              {call.call_status}
                            </span>
                            <span className="text-xs text-slate-400">
                              Duration: {Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {new Date(call.created_at).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">
                          {call.remarks}
                        </p>
                        {call.telecaller_name && (
                          <span className="text-[11px] text-slate-400 block">
                            Logged by: {call.telecaller_name}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: CANDIDATE PROFILE DETAILS */}
              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-3">
                    <h4 className="font-semibold text-slate-900 border-b border-slate-200 pb-2">
                      Academic & Professional Profile
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Candidate Type:</span>
                        <span className="font-medium text-slate-900">{lead.candidate_type || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Year of Passing:</span>
                        <span className="font-medium text-slate-900">{lead.year_of_passing || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Experience:</span>
                        <span className="font-medium text-slate-900">{lead.total_experience || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Domain Change:</span>
                        <span className="font-medium text-slate-900">{lead.domain_change === "Yes" ? "Yes" : "No"}</span>
                      </div>
                      {lead.interested_domain && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Interested Domain:</span>
                          <span className="font-medium text-slate-900">{lead.interested_domain}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-3">
                    <h4 className="font-semibold text-slate-900 border-b border-slate-200 pb-2">
                      Enquiry Origin & Program
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Program:</span>
                        <span className="font-medium text-slate-900">{lead.target_program || "General"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Source:</span>
                        <span className="font-medium text-slate-900">{lead.enquiry_source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Form Name:</span>
                        <span className="font-medium text-slate-900">{lead.form_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Captured At:</span>
                        <span className="font-medium text-slate-900">
                          {new Date(lead.created_at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Assigned Telecaller:</span>
                        <span className="font-medium text-slate-900">{lead.assigned_telecaller_name || "Unassigned"}</span>
                      </div>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="md:col-span-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                      <h4 className="font-semibold text-slate-900">Enquiry Form Notes / Questions</h4>
                      <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                        {lead.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
