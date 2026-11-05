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
  ExternalLink,
  MessageCircle,
  Sparkles,
  ArrowRight,
  UserCheck,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                {lead?.lead_code || "LEAD"}
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                {lead?.form_name || "Website Lead"}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">{lead?.full_name || "Loading..."}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
              <a href={`tel:${lead?.mobile_number}`} className="flex items-center space-x-1 text-blue-600 font-bold hover:underline">
                <Phone className="w-3.5 h-3.5" />
                <span>{lead?.mobile_number}</span>
              </a>
              {lead?.email && (
                <>
                  <span>&bull;</span>
                  <a href={`mailto:${lead.email}`} className="flex items-center space-x-1 hover:underline">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{lead.email}</span>
                  </a>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Bar */}
        {lead && (
          <div className="px-4 sm:px-6 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Quick Call & WhatsApp Buttons */}
            <div className="flex items-center space-x-2">
              <a
                href={`tel:${lead.mobile_number}`}
                onClick={() => onOpenCallModal(lead)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => onOpenFollowUpModal(lead)}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Follow-up</span>
              </button>
            </div>

            {/* Status & Assignment selectors */}
            <div className="flex items-center space-x-2">
              <div>
                <select
                  disabled={updating}
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-xs bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="">Unassigned</option>
                    {telecallers.map((t) => (
                      <option key={t.id} value={t.id}>Assign: {t.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Header */}
        <div className="border-b border-slate-200 px-6 flex space-x-6 text-xs font-bold uppercase tracking-wider bg-slate-50/50">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === "timeline" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Activity Timeline ({timeline.length})
          </button>
          <button
            onClick={() => setActiveTab("calls")}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === "calls" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Call Logs ({callLogs.length})
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === "details" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Full Profile Info
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs">
          {loading ? (
            <div className="py-12 text-center text-slate-400">Loading details...</div>
          ) : activeTab === "timeline" ? (
            /* Activity Timeline */
            <div className="space-y-4">
              {timeline.length === 0 ? (
                <div className="text-center py-8 text-slate-400">No activity recorded yet.</div>
              ) : (
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {timeline.map((act) => (
                    <div key={act.id} className="relative">
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ring-4 ring-white">
                        <History className="w-3 h-3" />
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">{act.title}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(act.created_at).toLocaleString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {act.details && <p className="text-slate-600 whitespace-pre-line">{act.details}</p>}
                        {act.user_name && (
                          <div className="mt-1.5 text-[10px] text-slate-400 font-medium">
                            By: {act.user_name}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === "calls" ? (
            /* Call Logs */
            <div className="space-y-3">
              {callLogs.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Phone className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-slate-500 font-medium">No calls logged for this candidate yet.</p>
                  {lead && (
                    <button
                      type="button"
                      onClick={() => onOpenCallModal(lead)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                    >
                      Log First Call
                    </button>
                  )}
                </div>
              ) : (
                callLogs.map((log) => (
                  <div key={log.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {log.call_status}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.created_at).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-slate-700">{log.remarks}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                      <span>Telecaller: <strong>{log.telecaller_name || "Agent"}</strong></span>
                      {log.duration_seconds > 0 && <span>Duration: {log.duration_seconds}s</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Full Profile Details */
            lead && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Candidate Type</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{lead.candidate_type || "N/A"}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Passing Year</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{lead.year_of_passing || "N/A"}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Interested in Domain Change</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{lead.domain_change || "N/A"}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Target Program / Domain</span>
                  <span className="font-bold text-blue-700 text-sm mt-0.5 block">{lead.target_program || lead.interested_domain || "General Tech"}</span>
                </div>

                {lead.total_experience && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Total Experience</span>
                    <span className="font-semibold text-slate-900 block mt-0.5">{lead.total_experience}</span>
                  </div>
                )}

                {lead.city && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">City / Location</span>
                    <span className="font-semibold text-slate-900 block mt-0.5">{lead.city}</span>
                  </div>
                )}

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 sm:col-span-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Form Source & Submission</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">
                    {lead.form_name} &bull; Received on {new Date(lead.created_at).toLocaleString("en-IN")}
                  </span>
                </div>

                {lead.notes && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 sm:col-span-2">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Student Message / Notes</span>
                    <p className="text-slate-800 mt-1 whitespace-pre-line">{lead.notes}</p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

