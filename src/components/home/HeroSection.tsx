import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Code2, GraduationCap } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { InteractiveHeroBackground } from "@/components/home/InteractiveHeroBackground";
import { HeroInteractiveCard } from "@/components/home/HeroInteractiveCard";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#050E2B] text-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-white/10">
      {/* Interactive Mouse Tracking Spotlight & Constellation Mesh Background */}
      <InteractiveHeroBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action Items */}
          <div className="lg:col-span-7 space-y-6">
            {/* Brand Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{COMPANY_INFO.poweredBy}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Software, cloud and data engineering for growing businesses.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              We help teams build applications, connect systems, and put their data to work — from planning and development through launch and ongoing support.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all duration-200 shadow-xl shadow-blue-600/30 hover:-translate-y-0.5"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl border border-white/20 hover:border-white text-white font-medium text-base transition-all duration-200 hover:bg-white/5"
              >
                <Code2 className="w-5 h-5 text-blue-400" />
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Separate Training Journey Link */}
            <div className="pt-4 border-t border-white/10 flex items-center space-x-3 text-slate-400 text-sm">
              <GraduationCap className="w-5 h-5 text-blue-400 shrink-0" />
              <span>
                Looking for technology courses?{" "}
                <Link href="/training" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4">
                  Explore our training & placement programs &rarr;
                </Link>
              </span>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Full 100% IP Ownership</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Dedicated Engineering Sprints</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Transparent Delivery Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Architecture Showcase Card */}
          <div className="lg:col-span-5">
            <HeroInteractiveCard />
          </div>
        </div>
      </div>
    </section>
  );
};
