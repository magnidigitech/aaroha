import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Code2, Database, Users, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { SITE_METADATA_MAP } from "@/data/seoMap";

export const metadata = {
  title: SITE_METADATA_MAP.about.title,
  description: SITE_METADATA_MAP.about.description,
  alternates: { canonical: SITE_METADATA_MAP.about.canonical },
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Breadcrumb & Title */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-3">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">About</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About AAROHA Technologies
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Software, cloud, and data engineering solutions built for growing businesses — backed by the delivery network of J2D Technologies.
          </p>
        </div>

        {/* Core Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{COMPANY_INFO.poweredBy}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              A delivery partner across the software & data lifecycle
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              AAROHA Technologies helps startups, growing companies, and enterprise teams navigate software development, cloud infrastructure, and data engineering challenges from strategy through to production.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Powered by J2D Technologies' delivery network, we combine local responsiveness with the depth of a larger engineering group. This allows our partners to access senior technical expertise without the overhead of building an in-house team from scratch.
            </p>
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span>30 Engineering Practices</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Azure & Cloud Data Stack</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Mentored Tech Training</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#050E2B] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
            <h3 className="text-xl font-bold">Location & Office</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our engineering office and training center is located in the tech hub of Madhapur, Hyderabad.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.full}</span>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Contact Our Office</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-16 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Our Engineering Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">1. Workflows First</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We map your actual business processes before writing code, ensuring software fits your operational reality.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">2. Maintainability & IP Ownership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We build clean, type-safe codebases with full documentation and transfer 100% intellectual property rights.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">3. Direct Communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You collaborate directly with engineers working your sprint cadence through transparent communication channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
