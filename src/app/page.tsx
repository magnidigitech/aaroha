import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { FeaturedServicesSection } from "@/components/home/FeaturedServicesSection";
import { DeliveryProcessSection } from "@/components/home/DeliveryProcessSection";
import { WhyAarohaSection } from "@/components/home/WhyAarohaSection";
import { TrainingTeaserSection } from "@/components/home/TrainingTeaserSection";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
      <FeaturedServicesSection />
      <DeliveryProcessSection />
      <WhyAarohaSection />
      <TrainingTeaserSection />

      {/* Project Enquiry Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Get Started</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Ready to talk about your software or data project?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether you need a custom web application, cloud data engineering on Azure, or a dedicated software team, we are ready to discuss your goals.
              </p>
              <div className="space-y-4 pt-4 text-sm text-slate-700">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="block text-slate-900">Direct Engineering Review</strong>
                    <span className="text-slate-600 text-xs">
                      Your inquiry is reviewed by technical project leads, not automated bot handlers.
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="block text-slate-900">Transparent Scope & Milestones</strong>
                    <span className="text-slate-600 text-xs">
                      We outline technical feasibility, estimated timelines, and milestone breakdowns clearly.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BusinessEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
