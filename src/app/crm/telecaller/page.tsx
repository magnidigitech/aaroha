"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  PhoneCall,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Search,
  Filter,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
  History,
  TrendingUp,
  Award,
  RefreshCw,
} from "lucide-react";
import { CrmLead, CrmFollowUp, LeadStatus, CrmUser } from "@/lib/crm/types";
import { CallLogModal } from "@/components/crm/CallLogModal";
import { ScheduleFollowUpModal } from "@/components/crm/ScheduleFollowUpModal";
import { CompleteFollowUpModal } from "@/components/crm/CompleteFollowUpModal";
import { LeadDetailModal } from "@/components/crm/LeadDetailModal";

export default function TelecallerPortalPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CrmUser | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "followups">("dashboard");
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [followups, setFollowups] = useState<{
    today: CrmFollowUp[];
    upcoming: CrmFollowUp[];
    overdue: CrmFollowUp[];
    completed: CrmFollowUp[];
  }>({ today: [], upcoming: [], overdue: [], completed: [] });

  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals state
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeFollowUpToComplete, setActiveFollowUpToComplete] = useState<CrmFollowUp | null>(null);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    setLoading(true);
    try {
      const authRes = await fetch("/api/crm/auth/me");
      if (!authRes.ok) {
        router.push("/crm/login");
        return;
      }
      const authData = await authRes.json();
      setCurrentUser(authData.user);

      await Promise.all([loadLeads(), loadFollowUps(), loadMetrics()]);
    } catch {
      router.push("/crm/login");
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async () => {
    try {
      const res = await fetch("/api/crm/leads?limit=100");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadFollowUps = async () => {
    try {
      const res = await fetch("/api/crm/followups");
      if (res.ok) {
        const data = await res.json();
        setFollowups(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadMetrics = async () => {
    try {
      const res = await fetch("/api/crm/analytics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.push("/crm/login");
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      !search ||
      l.full_name.toLowerCase().includes(search.toLowerCase()) ||
      l.mobile_number.includes(search) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col pb-20 sm:pb-8">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
            A
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">Telecaller Calling Desk</h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Logged in as: <strong className="text-blue-700">{currentUser?.name || "Telecaller"}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              loadLeads();
              loadFollowUps();
              loadMetrics();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex-1">
        {/* Overdue Follow-ups Alert Banner */}
        {followups.overdue.length > 0 && (
          <div className="mb-4 bg-rose-500 text-white rounded-2xl p-4 shadow-md flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Action Required: {followups.overdue.length} Overdue Follow-up(s)</h4>
                <p className="text-xs text-rose-100 mt-0.5">
                  You have pending calls that were scheduled prior to today and have not been resolved.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("followups")}
              className="px-3.5 py-1.5 rounded-xl bg-white text-rose-700 font-bold text-xs shadow-sm hover:bg-rose-50 transition shrink-0 ml-3"
            >
              View Overdue
            </button>
          </div>
        )}

        {/* Desktop Tabs */}
        <div className="hidden sm:flex border-b border-slate-200 mb-6 space-x-8 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === "dashboard" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Overview Dashboard
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === "leads" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            My Assigned Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("followups")}
            className={`py-3 border-b-2 transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === "followups" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>Scheduled Follow-ups</span>
            {(followups.today.length > 0 || followups.overdue.length > 0) && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-black">
                {followups.today.length + followups.overdue.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Assigned Leads</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">{metrics?.total || leads.length}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">In your telecaller queue</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Today's Follow-ups</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-900 mt-1 block">{followups.today.length}</span>
                <span className="text-[10px] text-amber-700 mt-1 block">Must contact today</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-xs">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">Overdue Calls</span>
                <span className="text-2xl sm:text-3xl font-black text-rose-900 mt-1 block">{followups.overdue.length}</span>
                <span className="text-[10px] text-rose-700 mt-1 block">Pending past due</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Converted Leads</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1 block">{metrics?.converted || 0}</span>
                <span className="text-[10px] text-emerald-700 mt-1 block">Successfully enrolled</span>
              </div>
            </div>

            {/* Today's Urgent Call Queue */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Calls to Make Today ({followups.today.length})</h3>
                </div>
                <button
                  onClick={() => setActiveTab("followups")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              {followups.today.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  🎉 No pending follow-ups scheduled for today. Great job! Check your assigned leads to schedule calls.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {followups.today.map((f) => (
                    <div key={f.id} className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{f.lead_name}</div>
                        <a href={`tel:${f.lead_phone}`} className="text-blue-600 font-bold text-xs hover:underline flex items-center space-x-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{f.lead_phone}</span>
                        </a>
                        <p className="text-[11px] text-slate-500 mt-1">Time: {new Date(f.scheduled_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} &bull; {f.remarks || "No remark"}</p>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer shrink-0 ml-2"
                      >
                        Complete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold">Ready to begin calling?</h3>
                <p className="text-xs text-blue-100 mt-1">
                  Open your lead queue, tap "Call Now" on any prospect, and record feedback directly in the CRM.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("leads")}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-sm hover:bg-blue-50 transition cursor-pointer shrink-0"
              >
                Go to My Leads ({leads.length})
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MY LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search lead by name, phone, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="font-semibold text-slate-500 text-xs shrink-0">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Interested">Interested</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Demo / Counselling Scheduled">Demo Scheduled</option>
                  <option value="Call Not Answered">Call Not Answered</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Mobile-First Responsive Lead Cards */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-400 text-xs space-y-2">
                <User className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-semibold text-slate-600">No leads found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredLeads.map((lead) => {
                  const cleanP = lead.mobile_number.replace(/[^0-9]/g, "");
                  const wa = cleanP ? `https://wa.me/${cleanP.length === 10 ? `91${cleanP}` : cleanP}` : "";

                  return (
                    <div
                      key={lead.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div>
                        {/* Status Badge & Lead Code */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                            {lead.lead_code}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              lead.status === "Converted"
                                ? "bg-emerald-100 text-emerald-800"
                                : lead.status === "Interested" || lead.status === "Demo / Counselling Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : lead.status === "Follow-up Required"
                                ? "bg-amber-100 text-amber-800"
                                : lead.status === "Lost" || lead.status === "Not Interested"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        {/* Name & Contact */}
                        <h4
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsDetailModalOpen(true);
                          }}
                          className="font-black text-slate-900 text-base hover:text-blue-600 transition cursor-pointer"
                        >
                          {lead.full_name}
                        </h4>

                        <div className="mt-1 space-y-0.5 text-xs text-slate-600">
                          <div className="font-semibold text-blue-700">{lead.mobile_number}</div>
                          {lead.email && <div className="text-[11px] text-slate-500 truncate">{lead.email}</div>}
                        </div>

                        {/* Candidate Details tags */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
                          {lead.candidate_type && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                              {lead.candidate_type}
                            </span>
                          )}
                          {lead.year_of_passing && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                              Passout: {lead.year_of_passing}
                            </span>
                          )}
                          {lead.domain_change === "Yes" && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200">
                              Domain Switch
                            </span>
                          )}
                        </div>

                        {lead.target_program && (
                          <div className="mt-2 text-[11px] text-slate-700 font-medium truncate">
                            Track: <strong>{lead.target_program}</strong>
                          </div>
                        )}
                      </div>

                      {/* Touch-Friendly Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                        <a
                          href={`tel:${lead.mobile_number}`}
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsCallModalOpen(true);
                          }}
                          className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-1 transition shadow-xs"
                          title="Call on phone and log remarks"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>

                        {wa ? (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center space-x-1 transition shadow-xs"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WA</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="py-2.5 px-2 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center"
                          >
                            WA
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsFollowUpModalOpen(true);
                          }}
                          className="py-2.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center space-x-1 transition shadow-xs cursor-pointer"
                          title="Schedule follow-up call"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Follow</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SCHEDULED FOLLOW-UPS */}
        {activeTab === "followups" && (
          <div className="space-y-6">
            {/* Overdue Section */}
            {followups.overdue.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs space-y-3">
                <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <h4>Overdue Calls ({followups.overdue.length}) - Past Scheduled Date</h4>
                </div>
                <div className="space-y-2.5">
                  {followups.overdue.map((f) => (
                    <div key={f.id} className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{f.lead_name}</div>
                        <a href={`tel:${f.lead_phone}`} className="text-blue-600 font-bold text-xs hover:underline flex items-center space-x-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{f.lead_phone}</span>
                        </a>
                        <p className="text-[11px] text-rose-800 font-semibold mt-1">
                          Was Due: {new Date(f.scheduled_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {new Date(f.scheduled_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} &bull; {f.remarks || "No remark"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer self-start sm:self-auto"
                      >
                        Call & Complete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Today Section */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <h4>Scheduled For Today ({followups.today.length})</h4>
              </div>
              {followups.today.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">No follow-ups scheduled for today.</div>
              ) : (
                <div className="space-y-2.5">
                  {followups.today.map((f) => (
                    <div key={f.id} className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{f.lead_name}</div>
                        <a href={`tel:${f.lead_phone}`} className="text-blue-600 font-bold text-xs hover:underline flex items-center space-x-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{f.lead_phone}</span>
                        </a>
                        <p className="text-[11px] text-slate-600 mt-1">
                          Time: {new Date(f.scheduled_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} &bull; Priority: <strong>{f.priority}</strong> &bull; {f.remarks || "No remark"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer self-start sm:self-auto"
                      >
                        Complete Call
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Section */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-blue-800 font-bold text-sm">
                <Calendar className="w-4 h-4" />
                <h4>Upcoming Days ({followups.upcoming.length})</h4>
              </div>
              {followups.upcoming.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">No future follow-ups scheduled.</div>
              ) : (
                <div className="space-y-2">
                  {followups.upcoming.map((f) => (
                    <div key={f.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{f.lead_name}</span> &bull; <span className="text-slate-500">{f.lead_phone}</span>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(f.scheduled_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} &bull; {f.remarks || ""}
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                      >
                        Resolve
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Persistent on Small Screens) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around text-[10px] font-bold">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
            activeTab === "dashboard" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-0.5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("leads")}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
            activeTab === "leads" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>My Leads</span>
        </button>

        <button
          onClick={() => setActiveTab("followups")}
          className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition ${
            activeTab === "followups" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Follow-ups</span>
          {followups.overdue.length > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-rose-500 hover:text-rose-700 transition"
        >
          <LogOut className="w-5 h-5 mb-0.5" />
          <span>Exit</span>
        </button>
      </nav>

      {/* Modals */}
      {selectedLead && (
        <>
          <CallLogModal
            lead={selectedLead}
            isOpen={isCallModalOpen}
            onClose={() => setIsCallModalOpen(false)}
            onSuccess={() => {
              loadLeads();
              loadFollowUps();
              loadMetrics();
            }}
          />

          <ScheduleFollowUpModal
            lead={selectedLead}
            isOpen={isFollowUpModalOpen}
            onClose={() => setIsFollowUpModalOpen(false)}
            onSuccess={() => {
              loadLeads();
              loadFollowUps();
              loadMetrics();
            }}
          />

          <LeadDetailModal
            leadId={selectedLead.id}
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            onOpenCallModal={(l) => {
              setSelectedLead(l);
              setIsCallModalOpen(true);
            }}
            onOpenFollowUpModal={(l) => {
              setSelectedLead(l);
              setIsFollowUpModalOpen(true);
            }}
            isAdmin={false}
            telecallers={[]}
            onLeadUpdated={() => {
              loadLeads();
              loadFollowUps();
              loadMetrics();
            }}
          />
        </>
      )}

      {activeFollowUpToComplete && (
        <CompleteFollowUpModal
          followUp={activeFollowUpToComplete}
          isOpen={!!activeFollowUpToComplete}
          onClose={() => setActiveFollowUpToComplete(null)}
          onSuccess={() => {
            loadLeads();
            loadFollowUps();
            loadMetrics();
          }}
        />
      )}
    </div>
  );
}
