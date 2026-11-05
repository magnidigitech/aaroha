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
} from "lucide-react";
import { CrmLead, CrmUser, TelecallerStats, CrmFollowUp } from "@/lib/crm/types";
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

  const loadLeads = async (page: number) => {
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "25");
      if (searchTerm) params.set("search", searchTerm);
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (telecallerFilter !== "All") params.set("telecaller_id", telecallerFilter);
      if (sourceFilter !== "All") params.set("source", sourceFilter);

      const res = await fetch(`/api/crm/leads?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setLeads(d.leads || []);
        setTotalLeads(d.total || 0);
        setTotalPages(d.totalPages || 1);
        setCurrentPage(page);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadTelecallers = async () => {
    try {
      const res = await fetch("/api/crm/telecallers");
      if (res.ok) {
        const d = await res.json();
        setAllUsers(d.users || []);
        setTelecallers((d.users || []).filter((u: CrmUser) => u.role === "TELECALLER" && u.is_active));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadFollowUps = async () => {
    try {
      const res = await fetch("/api/crm/followups");
      if (res.ok) {
        const d = await res.json();
        setFollowups(d);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAnalytics = async () => {
    try {
      const res = await fetch("/api/crm/analytics");
      if (res.ok) {
        const d = await res.json();
        setMetrics(d.metrics);
        setPerformance(d.performance || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBulkAssign = async () => {
    if (selectedLeadIds.length === 0 || !bulkTelecallerId) return;
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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
            A
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">AAROHA CRM &bull; Admin Panel</h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Enterprise Lead Management & Telecalling Operations
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <a
            href="/api/crm/leads?export=csv"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => {
              loadLeads(currentPage);
              loadFollowUps();
              loadAnalytics();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            title="Refresh CRM Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 font-semibold text-rose-700 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sub-navigation & Content */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-6 border-b border-slate-200 overflow-x-auto pb-1 text-xs font-bold uppercase tracking-wider mb-6">
          <button
            onClick={() => setActiveNav("dashboard")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeNav === "dashboard" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveNav("leads")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeNav === "leads" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            All Leads ({totalLeads})
          </button>
          <button
            onClick={() => setActiveNav("assignment")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeNav === "assignment" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Lead Assignment
          </button>
          <button
            onClick={() => setActiveNav("followups")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
              activeNav === "followups" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>Follow-ups</span>
            {followups.overdue.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white font-black">
                {followups.overdue.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveNav("telecallers")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeNav === "telecallers" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Telecallers ({telecallers.length})
          </button>
          <button
            onClick={() => setActiveNav("reports")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeNav === "reports" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Performance Reports
          </button>
        </div>

        {/* SECTION 1: DASHBOARD OVERVIEW */}
        {activeNav === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Ingested Leads</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{metrics?.total || 0}</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">All time captured</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-xs">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Today's New Leads</span>
                <span className="text-2xl font-black text-blue-900 mt-1 block">{metrics?.todayLeads || 0}</span>
                <span className="text-[10px] text-blue-600 mt-0.5 block">Received today</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Unassigned Leads</span>
                <span className="text-2xl font-black text-amber-900 mt-1 block">{metrics?.unassigned || 0}</span>
                <span className="text-[10px] text-amber-700 mt-0.5 block">Needs telecaller</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-xs">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">Overdue Calls</span>
                <span className="text-2xl font-black text-rose-900 mt-1 block">{metrics?.overdueFollowups || 0}</span>
                <span className="text-[10px] text-rose-700 mt-0.5 block">Needs escalation</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Converted Prospects</span>
                <span className="text-2xl font-black text-emerald-900 mt-1 block">{metrics?.converted || 0}</span>
                <span className="text-[10px] text-emerald-700 mt-0.5 block">Rate: {metrics?.conversionRate || 0}%</span>
              </div>
            </div>

            {/* Trends & Status Breakdown Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Last 7 Days Leads Bar Chart */}
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <h3 className="font-extrabold text-slate-900 text-sm">Lead Generation Trend (Last 7 Days)</h3>
                  </div>
                </div>

                <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
                  {metrics?.last7Days?.map((d: any, idx: number) => {
                    const maxVal = Math.max(...metrics.last7Days.map((x: any) => x.count), 1);
                    const heightPercent = Math.max(Math.round((d.count / maxVal) * 100), 8);

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <span className="text-[10px] font-bold text-slate-700">{d.count}</span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full max-w-[36px] bg-blue-600 hover:bg-blue-500 rounded-t-lg transition-all"
                        />
                        <span className="text-[10px] font-semibold text-slate-500">{d.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm">Lead Pipeline by Status</h3>
                </div>

                <div className="space-y-2 text-xs">
                  {Object.entries(metrics?.statusCounts || {}).map(([st, count]) => {
                    const total = metrics?.total || 1;
                    const pct = Math.round(((count as number) / total) * 100);

                    return (
                      <div key={st} className="space-y-1">
                        <div className="flex justify-between font-semibold">
                          <span className="text-slate-700">{st}</span>
                          <span className="text-slate-900 font-bold">{count as number} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${pct}%` }}
                            className={`h-full rounded-full ${
                              st === "Converted"
                                ? "bg-emerald-500"
                                : st === "Interested" || st === "Demo / Counselling Scheduled"
                                ? "bg-blue-500"
                                : st === "Follow-up Required"
                                ? "bg-amber-500"
                                : st === "Lost" || st === "Not Interested"
                                ? "bg-rose-500"
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
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name, phone, code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700"
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
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700"
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
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
                <span className="font-bold text-blue-900">
                  {selectedLeadIds.length} lead(s) selected
                </span>
                <div className="flex items-center space-x-2">
                  <select
                    value={bulkTelecallerId}
                    onChange={(e) => setBulkTelecallerId(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-blue-300 bg-white font-semibold text-slate-800"
                  >
                    <option value="">Select Telecaller to Assign</option>
                    {telecallers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleBulkAssign}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                  >
                    Assign Now
                  </button>
                </div>
              </div>
            )}

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider">
                    <tr>
                      <th className="p-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.length === leads.length && leads.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded text-blue-600"
                        />
                      </th>
                      <th className="p-3">Lead ID</th>
                      <th className="p-3">Candidate Name</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Target Track</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Assigned To</th>
                      <th className="p-3">Received</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          No leads found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      leads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selectedLeadIds.includes(l.id)}
                              onChange={() => toggleSelectLead(l.id)}
                              className="rounded text-blue-600"
                            />
                          </td>
                          <td className="p-3 font-mono font-bold text-blue-700 text-[11px]">
                            {l.lead_code}
                          </td>
                          <td className="p-3">
                            <div
                              onClick={() => {
                                setSelectedLead(l);
                                setIsDetailModalOpen(true);
                              }}
                              className="font-extrabold text-slate-900 hover:text-blue-600 transition cursor-pointer"
                            >
                              {l.full_name}
                            </div>
                            <div className="text-[10px] text-slate-400">{l.candidate_type || "General"}</div>
                          </td>
                          <td className="p-3">
                            <a href={`tel:${l.mobile_number}`} className="font-bold text-slate-800 hover:underline block">
                              {l.mobile_number}
                            </a>
                            <span className="text-[10px] text-slate-400">{l.email || "No email"}</span>
                          </td>
                          <td className="p-3 max-w-[160px] truncate text-slate-700 font-medium">
                            {l.target_program || l.interested_domain || "General"}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                l.status === "Converted"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : l.status === "Interested" || l.status === "Demo / Counselling Scheduled"
                                  ? "bg-blue-100 text-blue-800"
                                  : l.status === "Follow-up Required"
                                  ? "bg-amber-100 text-amber-800"
                                  : l.status === "Lost"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {l.status}
                            </span>
                          </td>
                          <td className="p-3">
                            {l.assigned_telecaller_name ? (
                              <span className="font-semibold text-slate-800">{l.assigned_telecaller_name}</span>
                            ) : (
                              <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                                Unassigned
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-slate-500 text-[11px]">
                            {new Date(l.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedLead(l);
                                setIsDetailModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition cursor-pointer"
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
              <div className="p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Page {currentPage} of {totalPages} &bull; Total {totalLeads} leads</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => loadLeads(currentPage - 1)}
                    className="p-1 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => loadLeads(currentPage + 1)}
                    className="p-1 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: LEAD ASSIGNMENT */}
        {activeNav === "assignment" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {telecallers.map((tele) => {
                const teleLeadsCount = leads.filter((l) => l.assigned_telecaller_id === tele.id).length;
                return (
                  <div key={tele.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-slate-900 text-sm">{tele.name}</div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{tele.email}</p>
                    <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Current Lead Load:</span>
                      <span className="text-blue-700 font-bold">{teleLeadsCount} Leads</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm">All Leads Waiting for Assignment</h3>
                <span className="text-xs text-amber-700 font-bold">
                  {leads.filter((l) => !l.assigned_telecaller_id).length} Unassigned Leads
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {leads.filter((l) => !l.assigned_telecaller_id).length === 0 ? (
                  <div className="py-8 text-center text-slate-400">
                    🎉 All leads are currently assigned to telecallers!
                  </div>
                ) : (
                  leads
                    .filter((l) => !l.assigned_telecaller_id)
                    .map((l) => (
                      <div key={l.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-slate-900">{l.full_name}</span> &bull;{" "}
                          <span className="text-blue-600 font-bold">{l.mobile_number}</span> &bull;{" "}
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
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold bg-white"
                          >
                            <option value="">Quick Assign To...</option>
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
                <h3 className="font-black text-slate-900 text-lg">Staff & Telecaller Accounts</h3>
                <p className="text-xs text-slate-500">Manage user logins, access roles, and active telecalling status.</p>
              </div>
              <button
                onClick={() => setIsAddTelecallerOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Telecaller</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider">
                  <tr>
                    <th className="p-3">Staff Member</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Joined Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-slate-400 text-[11px]">{u.email}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.is_active ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {u.is_active ? "Active" : "Deactivated"}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">
                        {new Date(u.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      </td>
                      <td className="p-3 text-right">
                        {u.role !== "ADMIN" && (
                          <button
                            onClick={() => handleToggleUser(u.id, u.is_active)}
                            className={`px-3 py-1 rounded-lg font-bold transition text-xs cursor-pointer ${
                              u.is_active
                                ? "border border-rose-200 text-rose-700 hover:bg-rose-50"
                                : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            {u.is_active ? "Deactivate" : "Activate"}
                          </button>
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
              <h3 className="font-black text-slate-900 text-lg">Telecaller Conversion & Productivity Reports</h3>
              <p className="text-xs text-slate-500">Analyze calls attempted, follow-ups completed, and conversions by agent.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider">
                  <tr>
                    <th className="p-3">Telecaller</th>
                    <th className="p-3 text-center">Assigned Leads</th>
                    <th className="p-3 text-center">Calls Made</th>
                    <th className="p-3 text-center">Interested</th>
                    <th className="p-3 text-center">Follow-ups Pending</th>
                    <th className="p-3 text-center">Converted</th>
                    <th className="p-3 text-right">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {performance.map((perf) => (
                    <tr key={perf.telecaller_id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-extrabold text-slate-900">{perf.name}</div>
                        <div className="text-slate-400 text-[10px]">{perf.email}</div>
                      </td>
                      <td className="p-3 text-center font-bold text-slate-800">{perf.total_leads}</td>
                      <td className="p-3 text-center font-bold text-blue-700">{perf.calls_made}</td>
                      <td className="p-3 text-center font-bold text-amber-700">{perf.interested_leads}</td>
                      <td className="p-3 text-center font-bold text-slate-600">{perf.followups_pending}</td>
                      <td className="p-3 text-center font-extrabold text-emerald-700">{perf.converted_leads}</td>
                      <td className="p-3 text-right font-black text-slate-900 text-sm">
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
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm">System-Wide Follow-ups</h3>
                <span className="text-xs font-semibold text-slate-500">
                  Overdue: <strong className="text-rose-600">{followups.overdue.length}</strong> &bull; Today: <strong className="text-amber-600">{followups.today.length}</strong>
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {followups.overdue.map((f) => (
                  <div key={f.id} className="p-3 rounded-xl border border-rose-200 bg-rose-50/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{f.lead_name}</span> &bull; <span className="text-slate-500">{f.lead_phone}</span>
                      <p className="text-[11px] text-rose-800 mt-0.5">
                        Overdue &bull; Telecaller: <strong>{f.telecaller_name}</strong> &bull; {f.remarks || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveFollowUpToComplete(f)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold"
                    >
                      Resolve
                    </button>
                  </div>
                ))}

                {followups.today.map((f) => (
                  <div key={f.id} className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{f.lead_name}</span> &bull; <span className="text-slate-500">{f.lead_phone}</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Due Today &bull; Telecaller: <strong>{f.telecaller_name}</strong> &bull; {f.remarks || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveFollowUpToComplete(f)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
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
        onSuccess={() => loadTelecallers()}
      />
    </div>
  );
}

