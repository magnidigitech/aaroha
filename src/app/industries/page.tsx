import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Stethoscope,
  Film,
  Landmark,
  GraduationCap,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { INDUSTRIES_CATALOG } from "@/data/industries";
import { SITE_METADATA_MAP } from "@/data/seoMap";

const iconMap: Record<string, any> = {
  ShoppingBag,
  Stethoscope,
  Film,
  Landmark,
  GraduationCap,
  Truck,
};

const industryTagMap: Record<string, string> = {
  ecommerce: "E-Commerce & Digital Commerce",
  healthcare: "Healthcare & Life Sciences",
  "media-entertainment": "Media, Streaming & Content",
  finance: "FinTech & Financial Services",
  education: "EdTech & Learning Portals",
  "retail-logistics": "Logistics & Supply Chain",
};

export const metadata = {
  title: SITE_METADATA_MAP.industries.title,
  description: SITE_METADATA_MAP.industries.description,
  alternates: { canonical: SITE_METADATA_MAP.industries.canonical },
};

export default function IndustriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <section className="bg-[#050E2B] text-white py-16 sm:py-20 border-b border-white/10 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/50 via-transparent to-transparent opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">Industries</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Domain Expertise
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Domain-Specific Software & Data Engineering
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Our engineering, cloud data, and application practices apply across core commercial sectors. Explore how we solve unique operational challenges for every industry.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {INDUSTRIES_CATALOG.map((ind) => {
            const Icon = iconMap[ind.iconName] || ShoppingBag;
            const domainTag = industryTagMap[ind.slug] || "Enterprise Technology";

            return (
              <div
                key={ind.slug}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
              >
                {/* Top Accent Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

                <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div>
                    {/* Header Row: Domain Tag & Icon Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                        {domainTag}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#050E2B] tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {ind.name}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {ind.description}
                    </p>
                  </div>

                  {/* Challenges & Value Delivery Cards */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    {/* Common Challenges */}
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60 space-y-2.5">
                      <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Common Industry Challenges</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {ind.commonChallenges.map((c, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-rose-500 font-bold shrink-0">•</span>
                            <span className="leading-relaxed">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How We Deliver Value */}
                    <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100 space-y-2.5">
                      <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                        <span>How AAROHA Delivers Value</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-800">
                        {ind.howWeHelp.map((h, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                    >
                      <span>Discuss {ind.name} Engineering Solution</span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#050E2B] rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-60" />
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full inline-block">
              Custom Engineering Scopes
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Don't see your industry listed?</h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              We work across diverse sectors beyond these — tell us about your technical goals and our engineering leads will design a custom solution.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all"
              >
                <span>Discuss Your Project With Our Leads</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
