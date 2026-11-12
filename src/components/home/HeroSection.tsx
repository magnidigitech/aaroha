import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Code2, GraduationCap } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { InteractiveHeroBackground } from "@/components/home/InteractiveHeroBackground";
import { HeroInteractiveCard } from "@/components/home/HeroInteractiveCard";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 text-slate-900 py-10 lg:py-12 overflow-hidden border-b border-slate-200/80">
      {/* Interactive Mouse Tracking Spotlight & Constellation Mesh Background */}
      <InteractiveHeroBackground />

      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 2xl:gap-14 items-center">
          {/* Left Column: Headline & Action Items */}
          <div className="lg:col-span-7 space-y-5 2xl:space-y-6">
            {/* Brand Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{COMPANY_INFO.poweredBy}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-slate-900 tracking-tight leading-[1.18]">
              Software, cloud and data engineering for growing businesses.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg 2xl:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              We help teams build applications, connect systems, and put their data to work — from planning and development through launch and ongoing support.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-300 hover:border-blue-400 text-slate-800 font-medium text-base transition-all duration-200 hover:bg-white shadow-sm"
              >
                <Code2 className="w-5 h-5 text-blue-600" />
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Separate Training Journey Link */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center space-x-3 text-slate-600 text-sm">
              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                Looking for technology courses?{" "}
                <Link href="/training" className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4">
                  Explore our training & placement programs &rarr;
                </Link>
              </span>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Full 100% IP Ownership</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Dedicated Engineering Sprints</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
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
