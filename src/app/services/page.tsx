"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, CheckCircle2, HelpCircle, Layers, Users, Zap, Code2, Layout, Database, Settings } from "lucide-react";
import {
  SERVICES_CATALOG,
  ServiceCategory,
  BUSINESS_NEEDS_MAP,
  SERVICE_COMPARISONS,
  ENGAGEMENT_OPTIONS,
  GENERAL_SERVICES_FAQS,
} from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Accordion } from "@/components/ui/Accordion";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";

const TRENDING_PRIORITY: Record<string, number> = {
  "cloud-data-engineering": 1,
  "web-development": 2,
  "generative-ai-agent-development": 3,
  "custom-software-development": 4,
  "saas-development": 5,
  "sap-s4-hana-implementation": 6,
  "dedicated-development-team": 7,
  "web-application-development": 8,
  "mobile-app-development": 9,
  "data-analytics-bi": 10,
  "devops-ci-cd-automation": 11,
  "software-integration-services": 12,
  "ai-consulting": 13,
  "mvp-development": 14,
  "digital-transformation": 15,
  "full-stack-development": 16,
  "ui-ux-design": 17,
  "machine-learning-solutions": 18,
};

const CORE_SERVICES = [...SERVICES_CATALOG].sort((a, b) => {
  const rankA = TRENDING_PRIORITY[a.slug] ?? 99;
  const rankB = TRENDING_PRIORITY[b.slug] ?? 99;
  return rankA - rankB;
});

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "All">("All");
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

  const categories: (ServiceCategory | "All")[] = [
    "All",
    "Software Engineering",
    "Application Development",
    "AI & Data",
    "Specialized Practices",
  ];

  const filteredServices = CORE_SERVICES.filter((svc) => {
    const matchesCategory = selectedCategory === "All" || svc.category === selectedCategory;
    const matchesNeed = !selectedNeed || BUSINESS_NEEDS_MAP.find((n) => n.id === selectedNeed)?.slugs.includes(svc.slug);
    const matchesQuery =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesNeed && matchesQuery;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-16">
        {/* 1. Header Introduction */}
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-3">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Software, Cloud & Data Engineering Practices
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We help teams build new applications, modernize existing software, connect internal tools, and build production data platforms — with clear deliverables, clean code handover, and 100% IP ownership.
          </p>
        </div>

        {/* 2. Choose by Business Need */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Guided Selector</span>
              <h2 className="text-2xl font-extrabold text-slate-900">Choose by Your Primary Business Need</h2>
            </div>
            {selectedNeed && (
              <button
                type="button"
                onClick={() => setSelectedNeed(null)}
                className="text-xs font-bold text-blue-600 underline"
              >
                Clear Need Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BUSINESS_NEEDS_MAP.map((need) => {
              const isSelected = selectedNeed === need.id;
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => setSelectedNeed(isSelected ? null : need.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#050E2B] text-white border-[#050E2B] shadow-md"
                      : "bg-slate-50/70 border-slate-200 hover:border-blue-400 text-slate-900"
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-bold mb-1">{need.title}</h3>
                    <p className={`text-[11px] leading-snug ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {need.tagline}
                    </p>
                  </div>
                  <span
                    className={`mt-4 text-[11px] font-semibold inline-flex items-center space-x-1 ${
                      isSelected ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    <span>{isSelected ? "Selected" : "Filter Services"} &rarr;</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Service Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Software Engineering</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Custom applications, SaaS products, MVP builds, and API integrations mapped around your business workflows.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Application Development</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Web apps, mobile solutions, legacy modernization, and accessible UI/UX frontends.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI & Data</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Azure cloud data lakehouses, Databricks pipelines, statistical modeling, and machine learning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Specialized Practices</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Azure DevOps, Power BI, SAP S/4HANA & ABAP, Generative AI RAG agents, and MLOps.
            </p>
          </div>
        </div>

        {/* 4. Filterable Service Directory */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, technology, or practice (e.g. Azure, React, SAP, RAG)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="text-xs font-semibold text-slate-500 px-3 py-1.5 bg-slate-100 rounded-lg shrink-0 text-center">
                Showing {filteredServices.length} of {CORE_SERVICES.length} Core Practices
              </div>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pt-2 no-scrollbar border-t border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#050E2B] text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat === "All" ? "All Practices" : cat}
                </button>
              ))}
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
              <p className="text-sm text-slate-600">
                We couldn't find any services matching "{searchQuery}". Try clearing filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedNeed(null);
                }}
                className="text-xs font-semibold text-blue-600 underline"
              >
                Reset Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((svc) => (
                <ServiceCard key={svc.slug} service={svc} />
              ))}
            </div>
          )}
        </div>

        {/* 5. How Services Differ (Comparisons) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Clear Comparisons</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How Our Services Differ</h2>
            <p className="text-slate-600 text-sm mt-2">
              Understanding subtle distinctions between technical offerings helps choose the right engagement model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_COMPARISONS.map((comp, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-base">{comp.title}</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{comp.point1}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{comp.point2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Engagement Options */}
        <div className="bg-[#050E2B] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-1">Working Models</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Engagement Options</h2>
            <p className="text-slate-300 text-sm mt-2">
              Choose the working structure that matches your project scope and team capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_OPTIONS.map((opt, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <h3 className="text-lg font-bold text-white">{opt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{opt.description}</p>
                <div className="pt-3 border-t border-white/10 text-xs font-semibold text-blue-300">
                  <span>Best for: </span>
                  <span className="text-white font-normal">{opt.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. General Services FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-2xl">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2>Services & Engagement FAQs</h2>
          </div>
          <Accordion items={GENERAL_SERVICES_FAQS} />
        </div>

        {/* 8. Enquiry Section */}
        <div className="max-w-4xl mx-auto pt-8">
          <BusinessEnquiryForm />
        </div>
      </div>
    </div>
  );
}
