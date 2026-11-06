"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  UserPlus,
  PhoneCall,
  Calendar,
  Clock,
  TrendingUp,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
  Layers,
  BarChart3,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Trash2,
} from "lucide-react";
import { CrmLead, CrmUser, TelecallerStats, CrmFollowUp, LeadStatus } from "@/lib/crm/types";
import { LeadDetailModal } from "@/components/crm/LeadDetailModal";
import { CallLogModal } from "@/components/crm/CallLogModal";
import { ScheduleFollowUpModal } from "@/components/crm/ScheduleFollowUpModal";
import { CompleteFollowUpModal } from "@/components/crm/CompleteFollowUpModal";
import { AddTelecallerModal } from "@/components/crm/AddTelecallerModal";

export default function AdminCrmPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CrmUser | null>(null);
  const [activeNav, setActiveNav] = useState<"dashboard" | "leads" | "assignment" | "followups" | "telecallers" | "reports">("dashboard");

  // Data states
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [telecallers, setTelecallers] = useState<CrmUser[]>([]);
  const [allUsers, setAllUsers] = useState<CrmUser[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [performance, setPerformance] = useState<TelecallerStats[]>([]);
  const [followups, setFollowups] = useState<{
    today: CrmFollowUp[];
    upcoming: CrmFollowUp[];
    overdue: CrmFollowUp[];
    completed: CrmFollowUp[];
  }>({ today: [], upcoming: [], overdue: [], completed: [] });

  const [loading, setLoading] = useState(true);
  const [roundRobinLoading, setRoundRobinLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [telecallerFilter, setTelecallerFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  // Bulk Selection
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
  const [bulkTelecallerId, setBulkTelecallerId] = useState("");

  // Modals
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isAddTelecallerOpen, setIsAddTelecallerOpen] = useState(false);
  const [activeFollowUpToComplete, setActiveFollowUpToComplete] = useState<CrmFollowUp | null>(null);

  useEffect(() => {
    checkAuthAndInit();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadLeads(currentPage);
    }
  }, [searchTerm, statusFilter, telecallerFilter, sourceFilter, currentPage]);

  const checkAuthAndInit = async () => {
    setLoading(true);
    try {
      const authRes = await fetch("/api/crm/auth/me");
      if (!authRes.ok) {
        router.push("/crm/login");
        return;
      }
      const data = await authRes.json();
      if (data.user.role !== "ADMIN") {
        router.push("/crm/telecaller");
        return;
      }
      setCurrentUser(data.user);

      await Promise.all([
        loadLeads(1),
        loadTelecallers(),
        loadFollowUps(),
        loadAnalytics(),
      ]);
    } catch {
      router.push("/crm/login");
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "25",
      });
      if (searchTerm) params.set("search", searchTerm);
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (telecallerFilter !== "All") params.set("telecaller_id", telecallerFilter);
      if (sourceFilter !== "All") params.set("source", sourceFilter);

      const res = await fetch(`/api/crm/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setTotalLeads(data.total || 0);
        setCurrentPage(data.page || 1);
        setTotalPages(data.totalPages || 1);
      }
    } catch (e) {
      console.error("Failed to load leads", e);
    }
  };

  const loadTelecallers = async () => {
    try {
      const res = await fetch("/api/crm/telecallers");
      if (res.ok) {
        const data = await res.json();
        const userList: CrmUser[] = data.users || data.telecallers || [];
        setAllUsers(userList);
        setTelecallers(userList.filter((u: CrmUser) => u.is_active && u.role === "TELECALLER"));
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

  const loadAnalytics = async () => {
    try {
      const res = await fetch("/api/crm/analytics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
        setPerformance(data.performance || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBulkAssign = async () => {
    if (!bulkTelecallerId || selectedLeadIds.length === 0) return;
    try {
      const res = await fetch("/api/crm/leads/bulk-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_ids: selectedLeadIds,
          telecaller_id: Number(bulkTelecallerId),
        }),
      });
      if (res.ok) {
        setSelectedLeadIds([]);
        setBulkTelecallerId("");
        await loadLeads(currentPage);
        await loadAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAutoRoundRobin = async () => {
    setRoundRobinLoading(true);
    try {
      const unassignedLeads = leads.filter((l) => !l.assigned_telecaller_id);
      if (unassignedLeads.length === 0 || telecallers.length === 0) return;

      for (let i = 0; i < unassignedLeads.length; i++) {
        const tele = telecallers[i % telecallers.length];
        await fetch(`/api/crm/leads/${unassignedLeads[i].id}/assign`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telecaller_id: tele.id }),
        });
      }

      await loadLeads(currentPage);
      await loadAnalytics();
    } catch (e) {
      console.error(e);
    } finally {
      setRoundRobinLoading(false);
    }
  };

  const handleToggleUser = async (userId: number, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/crm/telecallers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isActive: !currentStatus }),
      });
      if (res.ok) {
        await loadTelecallers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!window.confirm(`Are you sure you want to remove telecaller "${userName}"?`)) return;
    try {
      const res = await fetch(`/api/crm/telecallers?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await loadTelecallers();
        await loadAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.push("/crm/login");
  };

  const toggleSelectLead = (id: number) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === leads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(leads.map((l) => l.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-slate-900 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Apple Frosted Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            A
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 leading-none">
                AAROHA Lead CRM
              </h1>
              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Enterprise Lead Management & Telecalling Operations
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 text-xs">
          <a
            href="/api/crm/leads?export=csv"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 active:scale-[0.98] transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => {
              loadLeads(currentPage);
              loadFollowUps();
              loadAnalytics();
            }}
            className="w-8 h-8 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
            title="Refresh CRM Data"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-rose-700 hover:bg-rose-50/60 active:scale-[0.98] transition-all font-medium cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[1.75]" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 pb-10 flex-1 flex flex-col">
        {/* Apple Segmented Pill Navigation Tabs */}
        <div className="bg-slate-200/60 p-1 rounded-2xl flex items-center space-x-1 text-xs font-medium overflow-x-auto mb-6 shrink-0">
          <button
            onClick={() => setActiveNav("dashboard")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeNav === "dashboard"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveNav("leads")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeNav === "leads"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Leads ({totalLeads})
          </button>
          <button
            onClick={() => setActiveNav("assignment")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeNav === "assignment"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Lead Assignment
          </button>
          <button
            onClick={() => setActiveNav("followups")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
              activeNav === "followups"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Follow-ups</span>
            {followups.overdue.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-semibold">
                {followups.overdue.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveNav("telecallers")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeNav === "telecallers"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Telecallers ({telecallers.length})
          </button>
          <button
            onClick={() => setActiveNav("reports")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeNav === "reports"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Performance Reports
          </button>
        </div>

        {/* SECTION 1: DASHBOARD OVERVIEW */}
        {activeNav === "dashboard" && (
          <div className="space-y-6">
            {/* Apple Minimal KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-medium text-slate-500 block">Total Ingested Leads</span>
                <span className="text-3xl font-semibold tracking-tight text-slate-900 mt-1 block">
                  {metrics?.total || 0}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">All-time captured</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-blue-200/70 bg-gradient-to-b from-blue-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-blue-700 block">Today&apos;s New Leads</span>
                <span className="text-3xl font-semibold tracking-tight text-blue-900 mt-1 block">
                  {metrics?.todayLeads || 0}
                </span>
                <span className="text-[11px] text-blue-600/80 mt-1 block">Received today</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-amber-800 block">Unassigned Leads</span>
                <span className="text-3xl font-semibold tracking-tight text-amber-900 mt-1 block">
                  {metrics?.unassigned || 0}
                </span>
                <span className="text-[11px] text-amber-700/80 mt-1 block">Requires telecaller</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-200/70 bg-gradient-to-b from-rose-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-rose-800 block">Overdue Calls</span>
                <span className="text-3xl font-semibold tracking-tight text-rose-900 mt-1 block">
                  {metrics?.overdueFollowups || 0}
                </span>
                <span className="text-[11px] text-rose-700/80 mt-1 block">Immediate action</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50/40 to-white shadow-xs">
                <span className="text-[11px] font-medium text-emerald-800 block">Converted Leads</span>
                <span className="text-3xl font-semibold tracking-tight text-emerald-900 mt-1 block">
                  {metrics?.converted || 0}
                </span>
                <span className="text-[11px] text-emerald-700/80 mt-1 block">Conversion: {metrics?.conversionRate || 0}%</span>
              </div>
            </div>

            {/* Trends & Pipeline Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Last 7 Days Intake Trend */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="flex items-center space-x-2.5">
                    <TrendingUp className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                    <h3 className="font-semibold text-slate-900 text-sm tracking-tight">Lead Intake Velocity (Last 7 Days)</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-normal">Real-time Ingestion</span>
                </div>

                <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                  {metrics?.last7Days?.map((d: any, idx: number) => {
                    const maxVal = Math.max(...metrics.last7Days.map((x: any) => x.count), 1);
                    const heightPercent = Math.max(Math.round((d.count / maxVal) * 100), 10);

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                          {d.count}
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full max-w-[34px] bg-slate-900 group-hover:bg-blue-600 rounded-t-xl transition-all duration-200 shadow-2xs"
                        />
                        <span className="text-[10px] font-medium text-slate-400">{d.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Pipeline */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="flex items-center space-x-2.5">
                    <BarChart3 className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                    <h3 className="font-semibold text-slate-900 text-sm tracking-tight">Pipeline by Lead Status</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-normal">Active Flow</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {Object.entries(metrics?.statusCounts || {}).map(([st, count]) => {
                    const total = metrics?.total || 1;
                    const pct = Math.round(((count as number) / total) * 100);

                    return (
                      <div key={st} className="space-y-1">
                        <div className="flex justify-between text-xs font-normal">
                          <span className="text-slate-700">{st}</span>
                          <span className="text-slate-900 font-medium">{count as number} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${pct}%` }}
                            className={`h-full rounded-full transition-all duration-300 ${
                              st === "Converted"
                                ? "bg-emerald-500"
                                : st === "Interested" || st === "Demo / Counselling Scheduled"
                                ? "bg-blue-500"
                                : st === "Follow-up Required"
                                ? "bg-amber-500"
                                : st === "Lost" || st === "Not Interested"
                                ? "bg-rose-400"
                                : "bg-slate-400"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ALL LEADS TABLE */}
        {activeNav === "leads" && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 stroke-[1.75]" />
                <input
                  type="text"
                  placeholder="Search by name, phone, code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-normal text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 font-medium text-slate-700 focus:bg-white focus:outline-none text-xs"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Interested">Interested</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Demo / Counselling Scheduled">Demo Scheduled</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>

                <select
                  value={telecallerFilter}
                  onChange={(e) => setTelecallerFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 font-medium text-slate-700 focus:bg-white focus:outline-none text-xs"
                >
                  <option value="All">All Telecallers</option>
                  <option value="unassigned">Unassigned Only</option>
                  {telecallers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bulk Action Toolbar */}
            {selectedLeadIds.length > 0 && (
              <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-between text-xs animate-in fade-in shadow-md">
                <span className="font-medium pl-1">
                  {selectedLeadIds.length} lead(s) selected
                </span>
                <div className="flex items-center space-x-2">
                  <select
                    value={bulkTelecallerId}
                    onChange={(e) => setBulkTelecallerId(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 font-medium text-white text-xs focus:outline-none"
                  >
                    <option value="">Select Telecaller...</option>
                    {telecallers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleBulkAssign}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition cursor-pointer active:scale-[0.98]"
                  >
                    Assign Now
                  </button>
                </div>
              </div>
            )}

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200/80 font-medium text-slate-500 text-[11px]">
                    <tr>
                      <th className="p-3.5 w-8">
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.length === leads.length && leads.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                      </th>
                      <th className="p-3.5 font-medium">Lead ID</th>
                      <th className="p-3.5 font-medium">Candidate Name</th>
                      <th className="p-3.5 font-medium">Contact</th>
                      <th className="p-3.5 font-medium">Target Track</th>
                      <th className="p-3.5 font-medium">Status</th>
                      <th className="p-3.5 font-medium">Assigned To</th>
                      <th className="p-3.5 font-medium">Next Follow-up</th>
                      <th className="p-3.5 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-12 text-center text-slate-400">
                          No leads found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      leads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5">
                            <input
                              type="checkbox"
                              checked={selectedLeadIds.includes(l.id)}
                              onChange={() => toggleSelectLead(l.id)}
                              className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                            />
                          </td>
                          <td className="p-3.5 font-mono text-slate-600 text-[11px]">
                            {l.lead_code}
                          </td>
                          <td className="p-3.5">
                            <div
                              onClick={() => {
                                setSelectedLead(l);
                                setIsDetailModalOpen(true);
                              }}
                              className="font-semibold text-slate-900 hover:text-blue-600 transition cursor-pointer"
                            >
                              {l.full_name}
                            </div>
                            <div className="text-[11px] text-slate-400">{l.candidate_type || "General"}</div>
                          </td>
                          <td className="p-3.5">
                            <a href={`tel:${l.mobile_number}`} className="font-medium text-slate-800 hover:underline block">
                              {l.mobile_number}
                            </a>
                            <span className="text-[10px] text-slate-400">{l.email || "No email"}</span>
                          </td>
                          <td className="p-3.5 max-w-[160px] truncate text-slate-700 font-medium">
                            {l.target_program || l.interested_domain || "General"}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                                l.status === "Converted"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                  : l.status === "Interested" || l.status === "Demo / Counselling Scheduled"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                                  : l.status === "Follow-up Required"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200/60"
                                  : l.status === "Lost"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                  : "bg-slate-100 text-slate-700 border border-slate-200/60"
                              }`}
                            >
                              {l.status}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {l.assigned_telecaller_name ? (
                              <span className="font-medium text-slate-800">{l.assigned_telecaller_name}</span>
                            ) : (
                              <span className="text-amber-800 font-medium bg-amber-50 px-2.5 py-0.5 rounded-full text-[11px] border border-amber-200/60">
                                Unassigned
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-500 text-[11px]">
                            {l.next_followup_at ? (
                              <span className="text-amber-800 font-medium">
                                {new Date(l.next_followup_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                              </span>
                            ) : (
                              <span className="text-slate-400">None</span>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                setSelectedLead(l);
                                setIsDetailModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 active:scale-[0.98] transition cursor-pointer"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Page {currentPage} of {totalPages} &bull; Total {totalLeads} leads</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => loadLeads(currentPage - 1)}
                    className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[1.75]" />
                  </button>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => loadLeads(currentPage + 1)}
                    className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[1.75]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: LEAD ASSIGNMENT */}
        {activeNav === "assignment" && (
          <div className="space-y-6">
            {/* Auto Round Robin Action Banner */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900 text-base tracking-tight">Automated Lead Distribution</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distribute all pending unassigned enquiries equally across active telecallers in one click.
                </p>
              </div>
              <button
                disabled={roundRobinLoading || leads.filter((l) => !l.assigned_telecaller_id).length === 0}
                onClick={handleAutoRoundRobin}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs shadow-sm flex items-center space-x-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-40"
              >
                <Zap className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>{roundRobinLoading ? "Distributing..." : "Run Round-Robin Distribution"}</span>
              </button>
            </div>

            {/* Telecaller Workload Capacity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {telecallers.map((tele) => {
                const teleLeadsCount = leads.filter((l) => l.assigned_telecaller_id === tele.id).length;
                return (
                  <div key={tele.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900 text-sm">{tele.name}</div>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                        Active Desk
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal">{tele.email}</p>
                    <div className="pt-2.5 border-t border-slate-100 flex justify-between text-xs font-normal">
                      <span className="text-slate-500">Active Queue Load:</span>
                      <span className="text-slate-900 font-semibold">{teleLeadsCount} Leads</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Unassigned Leads Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <h3 className="font-semibold text-slate-900 text-sm tracking-tight">Queue of Unassigned Enquiries</h3>
                <span className="text-xs text-amber-800 font-medium bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                  {leads.filter((l) => !l.assigned_telecaller_id).length} Leads Waiting
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {leads.filter((l) => !l.assigned_telecaller_id).length === 0 ? (
                  <div className="py-10 text-center text-slate-400">
                    All website leads are currently assigned to telecallers.
                  </div>
                ) : (
                  leads
                    .filter((l) => !l.assigned_telecaller_id)
                    .map((l) => (
                      <div key={l.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-semibold text-slate-900">{l.full_name}</span> &bull;{" "}
                          <span className="text-blue-600 font-medium">{l.mobile_number}</span> &bull;{" "}
                          <span className="text-slate-500">{l.target_program || "General"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            onChange={async (e) => {
                              if (e.target.value) {
                                await fetch(`/api/crm/leads/${l.id}/assign`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ telecaller_id: Number(e.target.value) }),
                                });
                                await loadLeads(currentPage);
                                await loadAnalytics();
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 font-medium bg-slate-50/50 text-xs"
                          >
                            <option value="">Assign To...</option>
                            {telecallers.map((t) => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: TELECALLERS MANAGEMENT */}
        {activeNav === "telecallers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-base tracking-tight">Staff & Telecaller Desks</h3>
                <p className="text-xs text-slate-500 font-normal">Manage access credentials and active calling status.</p>
              </div>
              <button
                onClick={() => setIsAddTelecallerOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs shadow-sm flex items-center space-x-1.5 transition-all active:scale-[0.98] cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 font-medium text-slate-500 text-[11px]">
                  <tr>
                    <th className="p-3.5 font-medium">Team Member</th>
                    <th className="p-3.5 font-medium">Role</th>
                    <th className="p-3.5 font-medium">Status</th>
                    <th className="p-3.5 font-medium">Account Created</th>
                    <th className="p-3.5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900">{u.name}</div>
                        <div className="text-slate-400 text-[11px] font-normal">{u.email}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full text-[11px]">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                            u.is_active ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" : "bg-rose-50 text-rose-700 border border-rose-200/60"
                          }`}
                        >
                          {u.is_active ? "Active" : "Deactivated"}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-normal">
                        {new Date(u.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      </td>
                      <td className="p-3.5 text-right">
                        {u.role !== "ADMIN" && (
                          <div className="inline-flex items-center space-x-1.5">
                            <button
                              onClick={() => handleToggleUser(u.id, u.is_active)}
                              className={`px-3 py-1.5 rounded-xl font-medium transition text-xs cursor-pointer active:scale-[0.98] ${
                                u.is_active
                                  ? "border border-slate-200 text-slate-600 hover:bg-slate-100"
                                  : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50/70"
                              }`}
                            >
                              {u.is_active ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="p-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50/70 transition cursor-pointer active:scale-[0.98]"
                              title="Delete Telecaller"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.75]" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 5: PERFORMANCE REPORTS */}
        {activeNav === "reports" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 text-base tracking-tight">Telecaller Performance & Productivity</h3>
              <p className="text-xs text-slate-500 font-normal">Conversion efficiency, call activity, and resolved follow-ups.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 font-medium text-slate-500 text-[11px]">
                  <tr>
                    <th className="p-3.5 font-medium">Telecaller</th>
                    <th className="p-3.5 text-center font-medium">Assigned Leads</th>
                    <th className="p-3.5 text-center font-medium">Calls Logged</th>
                    <th className="p-3.5 text-center font-medium">Interested</th>
                    <th className="p-3.5 text-center font-medium">Follow-ups Pending</th>
                    <th className="p-3.5 text-center font-medium">Converted</th>
                    <th className="p-3.5 text-right font-medium">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {performance.map((perf) => (
                    <tr key={perf.telecaller_id} className="hover:bg-slate-50/70">
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900">{perf.name}</div>
                        <div className="text-slate-400 text-[11px] font-normal">{perf.email}</div>
                      </td>
                      <td className="p-3.5 text-center font-medium text-slate-800">{perf.total_leads}</td>
                      <td className="p-3.5 text-center font-medium text-blue-700">{perf.calls_made}</td>
                      <td className="p-3.5 text-center font-medium text-amber-700">{perf.interested_leads}</td>
                      <td className="p-3.5 text-center font-medium text-slate-600">{perf.followups_pending}</td>
                      <td className="p-3.5 text-center font-semibold text-emerald-700">{perf.converted_leads}</td>
                      <td className="p-3.5 text-right font-semibold text-slate-900 text-sm">
                        {perf.conversion_rate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 6: FOLLOW-UPS OVERVIEW */}
        {activeNav === "followups" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <h3 className="font-semibold text-slate-900 text-sm tracking-tight">System-Wide Follow-up Pipeline</h3>
                <span className="text-xs font-normal text-slate-500">
                  Overdue: <strong className="text-rose-600 font-semibold">{followups.overdue.length}</strong> &bull; Today: <strong className="text-amber-800 font-semibold">{followups.today.length}</strong>
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {followups.overdue.length === 0 && followups.today.length === 0 && (
                  <div className="py-8 text-center text-slate-400">
                    No overdue or today&apos;s follow-up calls pending across telecallers.
                  </div>
                )}

                {followups.overdue.map((f) => (
                  <div key={f.id} className="p-3.5 rounded-2xl border border-rose-200/70 bg-rose-50/40 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900">{f.lead_name}</span> &bull; <span className="text-slate-500">{f.lead_phone}</span>
                      <p className="text-[11px] text-rose-800 mt-0.5">
                        Overdue &bull; Telecaller: <strong>{f.telecaller_name}</strong> &bull; {f.remarks || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveFollowUpToComplete(f)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium active:scale-[0.98] transition cursor-pointer"
                    >
                      Resolve
                    </button>
                  </div>
                ))}

                {followups.today.map((f) => (
                  <div key={f.id} className="p-3.5 rounded-2xl border border-amber-200/70 bg-amber-50/40 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900">{f.lead_name}</span> &bull; <span className="text-slate-500">{f.lead_phone}</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Due Today &bull; Telecaller: <strong>{f.telecaller_name}</strong> &bull; {f.remarks || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveFollowUpToComplete(f)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium active:scale-[0.98] transition cursor-pointer"
                    >
                      Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedLead && (
        <>
          <CallLogModal
            lead={selectedLead}
            isOpen={isCallModalOpen}
            onClose={() => setIsCallModalOpen(false)}
            onSuccess={() => {
              loadLeads(currentPage);
              loadFollowUps();
              loadAnalytics();
            }}
          />

          <ScheduleFollowUpModal
            lead={selectedLead}
            isOpen={isFollowUpModalOpen}
            onClose={() => setIsFollowUpModalOpen(false)}
            onSuccess={() => {
              loadLeads(currentPage);
              loadFollowUps();
              loadAnalytics();
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
            isAdmin={true}
            telecallers={telecallers}
            onLeadUpdated={() => {
              loadLeads(currentPage);
              loadFollowUps();
              loadAnalytics();
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
            loadLeads(currentPage);
            loadFollowUps();
            loadAnalytics();
          }}
        />
      )}

      <AddTelecallerModal
        isOpen={isAddTelecallerOpen}
        onClose={() => setIsAddTelecallerOpen(false)}
        onSuccess={() => {
          loadTelecallers();
          loadAnalytics();
        }}
      />
    </div>
  );
}
