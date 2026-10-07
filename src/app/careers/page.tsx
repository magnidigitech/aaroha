import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { CAREERS_OVERVIEW, ACTIVE_JOB_OPENINGS } from "@/data/careers";
import { SITE_METADATA_MAP } from "@/data/seoMap";

export const metadata = {
  title: SITE_METADATA_MAP.careers.title,
  description: SITE_METADATA_MAP.careers.description,
  alternates: { canonical: SITE_METADATA_MAP.careers.canonical },
};

export default function CareersPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Header Breadcrumb & Title */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-3">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">Careers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Careers at AAROHA Technologies
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">{CAREERS_OVERVIEW.subheadline}</p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CAREERS_OVERVIEW.benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* Active Openings or Expression of Interest */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-16 space-y-6">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
            <Briefcase className="w-5 h-5" />
            <span>Open Positions</span>
          </div>

          {ACTIVE_JOB_OPENINGS.length === 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">No active specific openings at this time</h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                We are always happy to connect with talented React frontend developers, Python backend engineers, and Azure data specialists. Submit an expression of interest and we will reach out when matching openings arise.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
                >
                  <span>Send Expression of Interest</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {ACTIVE_JOB_OPENINGS.map((job) => (
                <div key={job.id} className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {job.department} · {job.location} ({job.workArrangement}) · {job.type}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
