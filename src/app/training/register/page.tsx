import React from "react";
import Link from "next/link";
import { TrainingRegistrationForm } from "@/components/forms/TrainingRegistrationForm";
import { CheckCircle2, Shield, Phone, Mail, Award, Clock, Users, BookOpen, ChevronRight } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training & Career Registration Form | AAROHA Technologies",
  description:
    "Register for AAROHA Technologies training programs. Build Skills. Work on Real Projects. Advance Your Career in Azure Data Engineering, GenAI, Python, Databricks & Oracle.",
  alternates: { canonical: "https://www.aaroha-inc.com/training/register" },
};

export default function TrainingRegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ program?: string }>;
}) {
  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/training" className="hover:text-blue-600">
            Training & Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Registration Form</span>
        </nav>

        {/* Top Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>AAROHA Technologies Career Programs</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Training & Career Registration
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Build Skills. Work on Real Projects. Advance Your Career.
          </p>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Registration Form */}
          <div className="lg:col-span-8">
            <TrainingRegistrationForm />
          </div>

          {/* Sidebar Info & Trust Badges */}
          <div className="lg:col-span-4 space-y-6">
            {/* Why Register Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>What Happens After You Register?</span>
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Personal Counseling Session:</strong>
                    <span className="text-slate-500">Our senior technical advisor reviews your background and contacts you directly.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Detailed Syllabus & Demo Session:</strong>
                    <span className="text-slate-500">Receive batch schedules, complete curriculum document, and live demo access.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Real-Time Project Roadmap:</strong>
                    <span className="text-slate-500">Get guidance on POP (Project Oriented Program) and real enterprise project labs.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Career & Placement Support:</strong>
                    <span className="text-slate-500">Resume building, mock interviews, and direct referral opportunities.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Top Programs Badge */}
            <div className="bg-gradient-to-br from-[#050E2B] to-[#0A1F52] rounded-3xl p-6 text-white space-y-4 shadow-xl">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Featured Tech Track</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join our flagship program: <strong>Azure Data Engineer with GenAI & AI Agents</strong>. Learn ADF, Databricks, PySpark, Microsoft Fabric, Vector Databases & OpenAI RAG workflows.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2.5 py-1 rounded-full">Real-Time Projects</span>
                <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2.5 py-1 rounded-full">Interview Prep</span>
                <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2.5 py-1 rounded-full">1-on-1 Mentorship</span>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500">Need Instant Help?</h4>
              <p className="text-xs text-slate-600">Speak directly with our training counseling team:</p>
              <div className="space-y-2 text-xs font-semibold text-slate-900 pt-1">
                {COMPANY_INFO.phones.map((p, idx) => (
                  <a key={idx} href={`tel:${p.raw}`} className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{p.display}</span>
                  </a>
                ))}
                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center space-x-2 text-slate-700 hover:text-blue-600">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
