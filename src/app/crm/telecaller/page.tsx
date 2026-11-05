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
  ChevronRight,
  History,
  TrendingUp,
  Award,
  RefreshCw,
  ArrowRight,
  Sparkles,
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
    <div className="min-h-screen bg-[#F5F5F7] text-slate-900 flex flex-col pb-24 sm:pb-10 selection:bg-blue-500 selection:text-white">
      {/* Apple Frosted Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            A
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 leading-none">
                Telecaller Calling Desk
              </h1>
              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                Workspace
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              Logged in as: <span className="text-slate-800 font-medium">{currentUser?.name || "Telecaller"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => {
              loadLeads();
              loadFollowUps();
              loadMetrics();
            }}
            className="w-8 h-8 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-rose-700 hover:bg-rose-50/60 active:scale-[0.98] transition-all text-xs font-medium cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[1.75]" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 flex-1">
        {/* Overdue Calls Alert Banner */}
        {followups.overdue.length > 0 && (
          <div className="mb-5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-tight">{followups.overdue.length} Overdue Call(s) Need Attention</h4>
                <p className="text-xs text-rose-100 mt-0.5 font-normal">
                  You have pending scheduled calls that passed their due date.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("followups")}
              className="px-4 py-2 rounded-xl bg-white text-rose-700 font-medium text-xs shadow-xs hover:bg-rose-50 active:scale-[0.98] transition-all shrink-0 ml-3 cursor-pointer"
            >
              Resolve Overdue
            </button>
          </div>
        )}

        {/* Desktop Apple Segmented Navigation */}
        <div className="hidden sm:flex bg-slate-200/60 p-1 rounded-2xl space-x-1 text-xs font-medium mb-6 w-fit">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "dashboard"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Overview Desk
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "leads"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Assigned Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("followups")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === "followups"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Follow-up Pipeline</span>
            {(followups.today.length > 0 || followups.overdue.length > 0) && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-semibold">
                {followups.today.length + followups.overdue.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: OVERVIEW DESK */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-medium text-slate-500 block">My Assigned Leads</span>
                <span className="text-3xl font-semibold tracking-tight text-slate-900 mt-1 block">{leads.length}</span>
                <span className="text-[11px] text-slate-400 mt-1 block">In your personal queue</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-amber-800 block">Today&apos;s Follow-ups</span>
                <span className="text-3xl font-semibold tracking-tight text-amber-900 mt-1 block">{followups.today.length}</span>
                <span className="text-[11px] text-amber-700/80 mt-1 block">Must contact today</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-200/70 bg-gradient-to-b from-rose-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-rose-800 block">Overdue Calls</span>
                <span className="text-3xl font-semibold tracking-tight text-rose-900 mt-1 block">{followups.overdue.length}</span>
                <span className="text-[11px] text-rose-700/80 mt-1 block">Needs immediate call</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-emerald-800 block">Converted Leads</span>
                <span className="text-3xl font-semibold tracking-tight text-emerald-900 mt-1 block">{metrics?.converted || 0}</span>
                <span className="text-[11px] text-emerald-700/80 mt-1 block">Successfully enrolled</span>
              </div>
            </div>

            {/* Today's Urgent Calls Queue */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                  <h3 className="font-semibold text-slate-900 text-sm tracking-tight">
                    Scheduled Calls for Today ({followups.today.length})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab("followups")}
                  className="text-xs text-blue-600 font-medium hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
                </button>
              </div>

              {followups.today.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs font-normal">
                  No scheduled follow-up calls pending for today.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {followups.today.map((f) => (
                    <div key={f.id} className="p-4 rounded-2xl border border-amber-200/70 bg-amber-50/30 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{f.lead_name}</div>
                        <a href={`tel:${f.lead_phone}`} className="text-blue-600 font-medium text-xs hover:underline flex items-center space-x-1.5 mt-0.5">
                          <Phone className="w-3 h-3 stroke-[1.75]" />
                          <span>{f.lead_phone}</span>
                        </a>
                        <p className="text-[11px] text-slate-500 mt-1 font-normal">
                          Time: {new Date(f.scheduled_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} &bull; {f.remarks || "No objective noted"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs shadow-xs active:scale-[0.98] transition cursor-pointer shrink-0 ml-3"
                      >
                        Complete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight">Lead Calling Queue</h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Open your lead queue, call candidates directly, and log feedback into the CRM.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("leads")}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs shadow-sm active:scale-[0.98] transition cursor-pointer shrink-0"
              >
                Go to My Assigned Leads ({leads.length})
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MY LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 stroke-[1.75]" />
                <input
                  type="text"
                  placeholder="Search by candidate name, phone, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-normal text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="font-normal text-slate-500 text-xs shrink-0">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 font-medium text-slate-700 focus:bg-white focus:outline-none text-xs"
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

            {/* Apple Card Grid for Leads */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 text-slate-400 text-xs space-y-2">
                <User className="w-8 h-8 text-slate-300 mx-auto stroke-[1.75]" />
                <p className="font-medium text-slate-600">No leads found in your queue matching criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLeads.map((lead) => {
                  const cleanP = lead.mobile_number.replace(/[^0-9]/g, "");
                  const wa = cleanP ? `https://wa.me/${cleanP.length === 10 ? `91${cleanP}` : cleanP}` : "";

                  return (
                    <div
                      key={lead.id}
                      className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300/80 transition-all duration-200"
                    >
                      <div>
                        {/* Header: Lead Code & Status Badge */}
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {lead.lead_code}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                              lead.status === "Converted"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : lead.status === "Interested" || lead.status === "Demo / Counselling Scheduled"
                                ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                                : lead.status === "Follow-up Required"
                                ? "bg-amber-50 text-amber-800 border border-amber-200/60"
                                : lead.status === "Lost" || lead.status === "Not Interested"
                                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                : "bg-slate-100 text-slate-700 border border-slate-200/60"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        {/* Candidate Name & Contact */}
                        <h4
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsDetailModalOpen(true);
                          }}
                          className="font-semibold text-slate-900 text-base hover:text-blue-600 transition cursor-pointer"
                        >
                          {lead.full_name}
                        </h4>

                        <div className="mt-1 space-y-0.5 text-xs">
                          <a href={`tel:${lead.mobile_number}`} className="font-medium text-slate-800 hover:text-blue-600 block">
                            {lead.mobile_number}
                          </a>
                          {lead.email && <div className="text-[11px] text-slate-400 truncate">{lead.email}</div>}
                        </div>

                        {/* Candidate Track & Background */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
                          {lead.candidate_type && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 font-medium">
                              {lead.candidate_type}
                            </span>
                          )}
                          {lead.year_of_passing && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 font-medium">
                              Passed {lead.year_of_passing}
                            </span>
                          )}
                          {lead.domain_change === "Yes" && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium border border-purple-200/60">
                              Domain Switch
                            </span>
                          )}
                        </div>

                        {lead.target_program && (
                          <div className="mt-2 text-[11px] text-slate-700 font-normal truncate">
                            Track: <span className="font-medium">{lead.target_program}</span>
                          </div>
                        )}

                        {lead.next_followup_at && (
                          <div className="mt-2 text-[11px] text-amber-800 bg-amber-50/70 border border-amber-200/60 rounded-xl px-2.5 py-1 flex items-center space-x-1.5 font-medium">
                            <Clock className="w-3 h-3 stroke-[1.75]" />
                            <span>Follow-up: {new Date(lead.next_followup_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-3 gap-2">
                        <a
                          href={`tel:${lead.mobile_number}`}
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsCallModalOpen(true);
                          }}
                          className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs flex items-center justify-center space-x-1.5 active:scale-[0.98] transition shadow-xs"
                          title="Call on phone and record remarks"
                        >
                          <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                          <span>Call</span>
                        </a>

                        {wa ? (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100/70 font-medium text-xs flex items-center justify-center space-x-1.5 active:scale-[0.98] transition shadow-2xs"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 stroke-[1.75]" />
                            <span>WA</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="py-2 px-2 rounded-xl bg-slate-100 text-slate-400 font-medium text-xs flex items-center justify-center"
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
                          className="py-2 px-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100/70 font-medium text-xs flex items-center justify-center space-x-1.5 active:scale-[0.98] transition shadow-2xs cursor-pointer"
                          title="Schedule follow-up call"
                        >
                          <Calendar className="w-3.5 h-3.5 stroke-[1.75]" />
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
              <div className="bg-white rounded-3xl p-6 border border-rose-200/80 shadow-xs space-y-3.5">
                <div className="flex items-center space-x-2 text-rose-700 font-semibold text-sm">
                  <AlertCircle className="w-4 h-4 stroke-[1.75]" />
                  <h4>Overdue Calls ({followups.overdue.length}) - Action Required</h4>
                </div>
                <div className="space-y-2.5">
                  {followups.overdue.map((f) => (
                    <div key={f.id} className="p-4 rounded-2xl border border-rose-200/70 bg-rose-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{f.lead_name}</div>
                        <a href={`tel:${f.lead_phone}`} className="text-blue-600 font-medium text-xs hover:underline flex items-center space-x-1.5 mt-0.5">
                          <Phone className="w-3 h-3 stroke-[1.75]" />
                          <span>{f.lead_phone}</span>
                        </a>
                        <p className="text-[11px] text-rose-800 font-medium mt-1">
                          Was Due: {new Date(f.scheduled_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {new Date(f.scheduled_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} &bull; {f.remarks || "No objective noted"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs active:scale-[0.98] transition cursor-pointer self-start sm:self-auto"
                      >
                        Call & Complete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Today Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold text-sm">
                <Clock className="w-4 h-4 stroke-[1.75]" />
                <h4>Scheduled For Today ({followups.today.length})</h4>
              </div>
              {followups.today.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No follow-ups scheduled for today.</div>
              ) : (
                <div className="space-y-2.5">
                  {followups.today.map((f) => (
                    <div key={f.id} className="p-4 rounded-2xl border border-amber-200/70 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{f.lead_name}</div>
                        <a href={`tel:${f.lead_phone}`} className="text-blue-600 font-medium text-xs hover:underline flex items-center space-x-1.5 mt-0.5">
                          <Phone className="w-3 h-3 stroke-[1.75]" />
                          <span>{f.lead_phone}</span>
                        </a>
                        <p className="text-[11px] text-slate-600 mt-1 font-normal">
                          Time: {new Date(f.scheduled_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} &bull; Priority: <strong className="font-semibold">{f.priority}</strong> &bull; {f.remarks || "No remark"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs active:scale-[0.98] transition cursor-pointer self-start sm:self-auto"
                      >
                        Record Outcome
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold text-sm">
                <Calendar className="w-4 h-4 stroke-[1.75]" />
                <h4>Upcoming Days ({followups.upcoming.length})</h4>
              </div>
              {followups.upcoming.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No future follow-ups scheduled.</div>
              ) : (
                <div className="space-y-2">
                  {followups.upcoming.map((f) => (
                    <div key={f.id} className="p-3.5 rounded-2xl border border-slate-200/70 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-900">{f.lead_name}</span> &bull; <span className="text-slate-500">{f.lead_phone}</span>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(f.scheduled_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} &bull; {f.remarks || ""}
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveFollowUpToComplete(f)}
                        className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98] font-medium"
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

      {/* Apple Floating Pill Bottom Navigation Bar (Mobile only) */}
      <nav className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg rounded-2xl p-1.5 flex items-center justify-around text-[10px] font-medium">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === "dashboard" ? "text-slate-900 font-semibold bg-slate-100" : "text-slate-500"
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5 stroke-[1.75]" />
          <span>Desk</span>
        </button>

        <button
          onClick={() => setActiveTab("leads")}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === "leads" ? "text-slate-900 font-semibold bg-slate-100" : "text-slate-500"
          }`}
        >
          <User className="w-4 h-4 mb-0.5 stroke-[1.75]" />
          <span>My Leads</span>
        </button>

        <button
          onClick={() => setActiveTab("followups")}
          className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === "followups" ? "text-slate-900 font-semibold bg-slate-100" : "text-slate-500"
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5 stroke-[1.75]" />
          <span>Follow-ups</span>
          {followups.overdue.length > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center py-1.5 px-3 rounded-xl text-slate-500 hover:text-rose-600 transition"
        >
          <LogOut className="w-4 h-4 mb-0.5 stroke-[1.75]" />
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
