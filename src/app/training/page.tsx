"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  Award,
  CheckCircle2,
  FileText,
  Globe,
  Mic,
  Code,
  Users,
  Handshake,
  Clock,
  Sparkles,
  HelpCircle,
  BookOpen,
  UserCheck,
  Briefcase,
  Layers,
  ChevronRight,
  Calendar,
} from "lucide-react";
import {
  TRAINING_COURSES,
  AAROHA_PROGRAM_STEPS,
  CAREER_SUPPORT_AREAS,
  GENERAL_TRAINING_FAQS,
  TrainingCourse,
} from "@/data/training";
import { TrainingEnquiryForm } from "@/components/forms/TrainingEnquiryForm";
import { Accordion } from "@/components/ui/Accordion";

const iconMap: Record<string, any> = {
  FileText,
  Mic,
  Code,
  Handshake,
  Clock,
};

const COURSE_COMPARISON = [
  {
    startingKnowledge: "No Coding / Basic Excel",
    goal: "Query data & build executive Power BI dashboards",
    recommended: "Business Analytics with Power BI & SQL",
    slug: "business-analytics-powerbi",
  },
  {
    startingKnowledge: "Basic Computer / Math",
    goal: "Become a Full-Stack Web Developer",
    recommended: "Python Full Stack or Java Full Stack",
    slug: "python-full-stack",
  },
  {
    startingKnowledge: "Basic SQL / IT Background",
    goal: "Build cloud data pipelines & lakehouses",
    recommended: "Azure Data Engineer Masterclass",
    slug: "azure-data-engineer",
  },
  {
    startingKnowledge: "Prior SQL/Python Experience",
    goal: "Integrate Azure OpenAI & Vector RAG Agents",
    recommended: "Azure Data Engineer with Gen AI",
    slug: "azure-data-engineer-genai",
  },
  {
    startingKnowledge: "Intermediate Python",
    goal: "Build GenAI RAG apps & autonomous AI agents",
    recommended: "Generative AI Engineering & RAG Systems",
    slug: "generative-ai-engineering",
  },
  {
    startingKnowledge: "Basic HTML/CSS/JS",
    goal: "Master modern React 19 & Next.js App Router",
    recommended: "React & Next.js Frontend Engineering",
    slug: "react-nextjs-frontend",
  },
  {
    startingKnowledge: "Basic Linux / IT Admin",
    goal: "Automate cloud infrastructure & Kubernetes",
    recommended: "DevOps & Cloud Infrastructure Engineering",
    slug: "devops-cloud-engineering",
  },
  {
    startingKnowledge: "Basic Programming / SAP",
    goal: "Master SAP ABAP on HANA & CDS/OData",
    recommended: "SAP ABAP on HANA Development",
    slug: "sap-abap",
  },
];

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Upcoming Programs",
    "Cloud & Data Engineering",
    "Software Engineering",
    "AI & Analytics",
    "Emerging & Security",
    "SAP Practices",
  ];

  const upcomingCoursesList = TRAINING_COURSES.filter((c) => c.isUpcoming);

  const filteredCourses =
    selectedCategory === "All"
      ? TRAINING_COURSES
      : selectedCategory === "Upcoming Programs"
      ? upcomingCoursesList
      : TRAINING_COURSES.filter((c) => c.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* 1. Hero Section - Matching Header Dark Navy Palette */}
      <section className="bg-[#050E2B] text-white pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/50 via-transparent to-transparent opacity-60" />
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">Training Programs</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
              AAROHA Engineering Academy
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Build practical technology skills through guided projects.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Master high-demand Cloud Data, Software Engineering, AI & SAP skills. Taught by senior engineering mentors with module exercises, simulated business projects, and transparent placement guidance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#courses"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition-all flex items-center space-x-2 text-sm"
              >
                <span>Explore All Programs ({TRAINING_COURSES.length})</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#upcoming-spotlight"
                className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 font-semibold px-6 py-3.5 rounded-xl border border-cyan-400/30 transition-all text-sm flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>View 5 Upcoming Courses</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-20 pt-8">
        {/* Spotlight Banner for Upcoming Courses */}
        <div id="upcoming-spotlight" className="scroll-mt-28 bg-gradient-to-br from-[#050E2B] via-[#0A1F52] to-[#050E2B] rounded-3xl p-8 sm:p-10 border border-blue-500/30 shadow-2xl relative overflow-hidden text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launching Next Cohort</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Upcoming Elite Technology Programs
              </h2>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Pre-register now to reserve your seat in our next batches with early-bird scholarships and direct mentor onboarding.
              </p>
            </div>
            <Link
              href="/training/register"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all shrink-0"
            >
              <span>Pre-Register for Next Batch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
            {upcomingCoursesList.map((course) => (
              <Link
                key={course.slug}
                href={`/training/${course.slug}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-2xl p-4.5 transition-all group flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 inline-block mb-2">
                    Upcoming
                  </span>
                  <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
                    {course.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold pt-2 border-t border-white/10">
                  <span>{course.duration}</span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Curriculum Soon</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Course Filters & Catalog Directory */}
        <div id="courses" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                Course Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Explore All Training Programs
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Showing {filteredCourses.length} Programs
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#050E2B] text-white shadow-md"
                    : cat === "Upcoming Programs"
                    ? "bg-cyan-50 text-cyan-900 border border-cyan-300 font-bold hover:bg-cyan-100"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat === "All"
                  ? `All Programs (${TRAINING_COURSES.length})`
                  : cat === "Upcoming Programs"
                  ? `🚀 Upcoming Programs (${upcomingCoursesList.length})`
                  : cat}
              </button>
            ))}
          </div>

          {/* 3. Fully Clickable Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/training/${course.slug}`}
                className={`rounded-3xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer ${
                  course.isUpcoming
                    ? "bg-gradient-to-b from-indigo-50/50 via-white to-white border-2 border-indigo-400/90 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-200/60 hover:border-indigo-600 hover:shadow-2xl hover:-translate-y-1.5"
                    : "bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500/50 hover:-translate-y-1"
                }`}
              >
                {/* Top Accent Gradient */}
                <div
                  className={`w-full ${
                    course.isUpcoming
                      ? "h-2.5 bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-600"
                      : `h-2 bg-gradient-to-r ${course.gradientBg}`
                  }`}
                />

                <div className="p-7 flex flex-col justify-between flex-grow space-y-5">
                  <div className="space-y-3">
                    {/* Duration & Level Badge Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {course.isUpcoming ? (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-100 text-amber-950 border border-amber-300 flex items-center space-x-1.5 shadow-xs">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                            </span>
                            <span>Upcoming Track</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                            {course.duration}
                          </span>
                        )}

                        {course.isUpcoming && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {course.duration}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                          course.isUpcoming
                            ? "bg-purple-50 text-purple-700 border border-purple-200 font-bold"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3
                      className={`text-xl font-extrabold tracking-tight transition-colors leading-snug ${
                        course.isUpcoming
                          ? "text-slate-950 group-hover:text-indigo-600"
                          : "text-[#050E2B] group-hover:text-blue-600"
                      }`}
                    >
                      {course.title}
                    </h3>

                    {/* One-Sentence Summary */}
                    <p className="text-slate-600 text-sm leading-relaxed min-h-[3.75rem]">
                      {course.summary}
                    </p>
                  </div>

                  {/* Prerequisites & Format Info */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {course.isUpcoming ? (
                      <div className="flex items-start space-x-2 text-xs bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl text-amber-900">
                        <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span className="font-semibold text-amber-950 text-[11px]">
                          <strong>Curriculum Status:</strong> Finalizing syllabus (updating soon)
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2 text-xs text-slate-700">
                        <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">
                          <strong>Prerequisites:</strong> {course.quickFacts.prerequisiteSummary}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start space-x-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{course.weeklyHours} · {course.format}</span>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                            course.isUpcoming
                              ? "bg-indigo-50/80 text-indigo-800 border-indigo-200/60"
                              : "bg-slate-100 text-slate-700 border-slate-200/60"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                    {course.isUpcoming ? (
                      <>
                        <div className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500 text-white font-bold text-[11px] transition-all flex items-center justify-center space-x-1 shadow-sm shadow-indigo-600/25">
                          <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          <span className="truncate">Curriculum Soon</span>
                        </div>

                        <div className="py-2.5 rounded-xl bg-amber-100 group-hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors flex items-center justify-center border border-amber-300">
                          <span>Pre-Register</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1 shadow-sm shadow-blue-600/20">
                          <span>View Curriculum</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>

                        <div className="py-2.5 rounded-xl bg-slate-100 group-hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center">
                          <span>Enquire</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. Help Choosing Matrix Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Course Comparison Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Which Course Fits Your Goals?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Compare recommended programs based on your current starting knowledge and target career objective.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Starting Knowledge</th>
                  <th className="p-3.5">Learning Goal</th>
                  <th className="p-3.5">Recommended Course</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COURSE_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-medium text-slate-900">{row.startingKnowledge}</td>
                    <td className="p-3.5">{row.goal}</td>
                    <td className="p-3.5 font-bold text-blue-700">{row.recommended}</td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/training/${row.slug}`}
                        className="inline-flex items-center space-x-1 font-bold text-blue-600 hover:text-blue-800"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. How Learning Works — 5-Step Methodology */}
        <div className="bg-[#050E2B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full inline-block mb-3">
              The AAROHA Learning Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              How Learning & Practice Work
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              Every course combines interactive live instruction, hands-on lab exercises, simulated enterprise capstones, and line-by-line mentor reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {AAROHA_PROGRAM_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                  0{step.step}
                </div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Real Trainer Profiles */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Practitioner Mentors
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Learn Directly From Senior Engineers
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Our trainers are active IT architects and principal developers bringing real industry workflows into every session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-5">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg shrink-0">
                KV
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">Venkat V.</h3>
                <span className="text-xs font-semibold text-blue-700 block">Principal Cloud Data Architect</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  12+ years of experience architecting Azure Databricks, PySpark, Snowflake, and ADF pipelines for enterprise clients across healthcare and finance.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-5">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-lg shrink-0">
                SD
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">Swaroop D.</h3>
                <span className="text-xs font-semibold text-blue-700 block">Lead Full-Stack & AI Systems Lead</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  10+ years specializing in Python microservices, React/Next.js frontend systems, and Gen AI LLM RAG pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Student Projects Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Portfolio Building
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Student Projects & Exercises
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              We clearly distinguish between daily practice exercises and simulated business projects so you know exactly what work you will produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-3">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider bg-blue-100 px-2.5 py-1 rounded">
                Simulated Business Project
              </span>
              <h3 className="text-base font-bold text-slate-900">Healthcare Claim Fraud Detection Lakehouse</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Build an automated end-to-end Azure Data Factory ingestion pipeline into Databricks Delta Lake, processing 5M+ simulated claim records with PySpark anomaly models.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-blue-200">
                  Azure Data Factory
                </span>
                <span className="text-[11px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-blue-200">
                  Databricks PySpark
                </span>
                <span className="text-[11px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-blue-200">
                  Delta Lake
                </span>
              </div>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-3">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider bg-blue-100 px-2.5 py-1 rounded">
                Simulated Business Project
              </span>
              <h3 className="text-base font-bold text-slate-900">Enterprise Vector RAG Assistant with LangChain</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Develop a Python FastAPI back-end connected to Azure OpenAI embeddings and FAISS vector database to answer queries from enterprise PDF documents.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[11px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-blue-200">
                  Azure OpenAI
                </span>
                <span className="text-[11px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-blue-200">
                  LangChain
                </span>
                <span className="text-[11px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-blue-200">
                  FastAPI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Precise Career Support Explanation */}
        <div id="placement" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Career Assistance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              360° Placement Assistance Scope
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              We provide transparent career support without making unsupported 100% placement rate claims. Here is exactly what our career guidance includes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAREER_SUPPORT_AREAS.map((area, idx) => {
              const Icon = iconMap[area.icon] || FileText;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{area.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>

          {/* Student Responsibilities Notice */}
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-200 space-y-2 text-xs text-slate-800">
            <span className="font-bold text-blue-900 block flex items-center space-x-1.5 text-sm">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Student Placement Eligibility Conditions</span>
            </span>
            <p className="text-slate-700 leading-relaxed">
              Placement referral assistance is provided for 6 months post-course graduation to students who maintain 80%+ class attendance, complete all module lab assignments, finish their capstone project, and pass the 1-on-1 technical mock interview evaluation.
            </p>
          </div>
        </div>

        {/* 9. General Training FAQs */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-2xl">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2>Frequently Asked Questions About Studying</h2>
          </div>
          <Accordion items={GENERAL_TRAINING_FAQS} />
        </div>

        {/* 10. Student Enquiry Form */}
        <div id="enquiry-form" className="scroll-mt-28 max-w-3xl mx-auto pt-4">
          <TrainingEnquiryForm />
        </div>
      </div>
    </div>
  );
}
