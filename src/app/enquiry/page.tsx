import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { TrainingEnquiryForm } from "@/components/forms/TrainingEnquiryForm";
import { COMPANY_INFO } from "@/data/company";
import { SITE_METADATA_MAP } from "@/data/seoMap";

export const metadata: Metadata = {
  title: SITE_METADATA_MAP.enquiry?.title || "Candidate Enquiry & Course Counseling | AAROHA Technologies",
  description:
    SITE_METADATA_MAP.enquiry?.description ||
    "Submit your candidate enquiry to receive syllabus outlines, batch schedules, domain-switch guidance, and 1-on-1 career counseling from AAROHA Technologies.",
  alternates: {
    canonical: SITE_METADATA_MAP.enquiry?.canonical || "https://www.aaroha-inc.com/enquiry",
  },
};

export default async function EnquiryPage({
  searchParams,
}: {
  searchParams?: Promise<{ course?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialCourseSlug = resolvedParams?.course;

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/training" className="hover:text-blue-600 transition-colors">
            Training & Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Candidate Enquiry</span>
        </nav>

        {/* Top Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Admissions & Career Counseling</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Candidate Enquiry
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Connect with our senior technical mentors for in-depth syllabus reviews, upcoming batch timings, domain-switch roadmaps, and 360° placement counseling.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Enquiry Form Column */}
          <div className="lg:col-span-7">
            <TrainingEnquiryForm initialCourseSlug={initialCourseSlug} />
          </div>

          {/* Right Information & Support Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* What Happens Next Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3>What Happens After You Submit?</h3>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">1-on-1 Profile Assessment:</strong> A career counselor reviews your educational background, passing year, and career targets.
                  </span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Syllabus & Demo Access:</strong> Receive full curriculum modules, project specifications, and scheduled demo batch links.
                  </span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Domain-Switch Roadmap:</strong> If changing domains (Non-IT to IT, QA to Data, etc.), we provide tailored bridge modules.
                  </span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Flexible Batches & EMI:</strong> Guidance on weekend/weekday timings, live mentor access, and transparent fee schedules.
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-xs text-slate-500">
                You can also contact our admissions and counseling team directly:
              </p>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">Phone Calls:</span>
                    <div className="flex flex-col space-y-0.5 mt-0.5">
                      {COMPANY_INFO.phones.map((p, idx) => (
                        <a key={idx} href={`tel:${p.raw}`} className="text-blue-600 hover:underline font-medium">
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">Counseling Email:</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-blue-600 hover:underline font-medium">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">WhatsApp Support:</span>
                    <a
                      href={COMPANY_INFO.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-bold"
                    >
                      Chat with Counselor &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-1">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">Walk-in Center:</span>
                    <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                      {COMPANY_INFO.address.full}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Banner Card */}
            <div className="bg-gradient-to-br from-blue-900 to-[#050E2B] text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>The AAROHA Advantage</span>
              </div>
              <h4 className="text-base font-bold text-white">Built by Engineers, Not Just Tutors</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our trainers are actively working engineers powered by J2D Technologies. Every student builds enterprise-grade pipelines, deployed models, and real repositories.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200">Real Azure Labs</span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200">Mock Interviews</span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200">Resume Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
