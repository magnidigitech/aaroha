import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Award, 
  HelpCircle, 
  GraduationCap, 
  Users, 
  Calendar, 
  Briefcase, 
  Video, 
  FileCode, 
  MessageSquare, 
  Check, 
  Layers, 
  Cpu, 
  Star,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { TRAINING_COURSES } from "@/data/training";
import { getCourseSeo } from "@/data/seoMap";
import { TrainingEnquiryForm } from "@/components/forms/TrainingEnquiryForm";
import { ProgramSnapshotCard } from "@/components/training/ProgramSnapshotCard";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRAINING_COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const seo = getCourseSeo(slug);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = TRAINING_COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const certIssuer = course.certificateIssuer || "AAROHA Technologies Certificate of Course Completion";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    provider: {
      "@type": "Organization",
      name: "AAROHA Technologies",
    },
    educationalCredentialAwarded: certIssuer,
  };

  // Convert course curriculum modules to Accordion item format
  const curriculumAccordionItems = course.curriculum.map((mod, idx) => ({
    question: `Module ${idx + 1}: ${mod.module}`,
    answer: (
      <div className="space-y-4 pt-1">
        <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-3 text-xs text-blue-950">
          <span className="font-bold text-blue-900 block mb-1">Learning Objective:</span>
          {mod.objective}
        </div>

        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">Topics Covered:</span>
          <div className="flex flex-wrap gap-1.5">
            {mod.topics.map((t, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Practical Exercise:</span>
            <span className="text-slate-700">{mod.exercise}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Assessment Method:</span>
            <span className="text-slate-700">{mod.assessment || "End-of-module review"}</span>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* 1. Course Hero Section — Matching Solid Navy #050E2B Theme */}
      <section className="bg-[#050E2B] text-white pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/50 via-transparent to-transparent opacity-60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/training" className="hover:text-white transition-colors">
              Training
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                  Duration: {course.duration}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                  Format: {course.format}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full inline-block">
                  {course.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {course.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#enquiry-section"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center space-x-2 text-sm"
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                  <span>Enquire About Course</span>
                </a>
                <a
                  href="#curriculum"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold px-5 py-3.5 rounded-xl transition-all text-sm"
                >
                  View Full Syllabus
                </a>
              </div>
            </div>

            {/* Quick Hero 3D Interactive Program Snapshot Card */}
            <div className="lg:col-span-4">
              <ProgramSnapshotCard
                commitment={course.quickFacts.commitment}
                language={course.quickFacts.language}
                nextBatchDate={course.scheduleFees.nextBatchDate}
                certIssuer={certIssuer}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Compact Sticky Section Navigation - Centered tabs docking right beneath main site header */}
      <nav className="sticky top-[72px] sm:top-[80px] z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 sm:space-x-8 overflow-x-auto text-xs font-bold py-3.5 text-slate-700 no-scrollbar">
            <a href="#overview" className="hover:text-blue-600 whitespace-nowrap transition-colors">Overview</a>
            <a href="#quick-facts" className="hover:text-blue-600 whitespace-nowrap transition-colors">Quick Facts</a>
            <a href="#who-should-join" className="hover:text-blue-600 whitespace-nowrap transition-colors">Who Should Join</a>
            <a href="#what-you-learn" className="hover:text-blue-600 whitespace-nowrap transition-colors">What You Learn</a>
            <a href="#curriculum" className="hover:text-blue-600 whitespace-nowrap transition-colors">Curriculum</a>
            <a href="#projects" className="hover:text-blue-600 whitespace-nowrap transition-colors">Projects</a>
            <a href="#class-experience" className="hover:text-blue-600 whitespace-nowrap transition-colors">Class Experience</a>
            <a href="#trainer" className="hover:text-blue-600 whitespace-nowrap transition-colors">Trainer</a>
            <a href="#fees" className="hover:text-blue-600 whitespace-nowrap transition-colors">Schedule & Fees</a>
            <a href="#career" className="hover:text-blue-600 whitespace-nowrap transition-colors">Career Support</a>
            <a href="#faqs" className="hover:text-blue-600 whitespace-nowrap transition-colors">FAQs</a>
          </div>
        </div>
      </nav>

      {/* 3. Main Page Layout */}
      <div className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Course Overview</h2>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{course.overview}</p>
              </section>

              {/* Quick Facts Section */}
              <section id="quick-facts" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Quick Facts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 block uppercase">Weekly Commitment</span>
                      <span className="text-sm font-semibold text-slate-900">{course.quickFacts.commitment}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 block uppercase">Language of Instruction</span>
                      <span className="text-sm font-semibold text-slate-900">{course.quickFacts.language}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                    <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 block uppercase">Batch Options</span>
                      <span className="text-sm font-semibold text-slate-900">{course.quickFacts.batchDetails}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                    <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 block uppercase">Prerequisites</span>
                      <span className="text-sm font-semibold text-slate-900">{course.quickFacts.prerequisiteSummary}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Who Should Join Section */}
              <section id="who-should-join" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Who Should Join</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-blue-600">
                      Target Audience
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {course.intendedLearners.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-blue-600">
                      Expected Baseline Knowledge
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {course.prerequisites.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* What You Will Learn Section */}
              <section id="what-you-learn" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">What You Will Learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curriculum Section */}
              <section id="curriculum" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-bold text-slate-900">Curriculum Modules</h2>
                  <span className="text-xs font-semibold text-slate-500">{course.curriculum.length} Modules</span>
                </div>
                <p className="text-xs text-slate-600">
                  Each module combines theoretical concepts, practical coding exercises, and milestone assessments.
                </p>
                <Accordion items={curriculumAccordionItems} />
              </section>

              {/* Projects Breakdown Section */}
              <section id="projects" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-bold text-slate-900">Hands-on Student Projects</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Clearly structured practice exercises and end-to-end simulated capstone projects.
                  </p>
                </div>

                <div className="space-y-6">
                  {course.projects.map((proj, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          proj.type === "Simulated Business Project" || proj.type === "Capstone Project"
                            ? "bg-amber-100 text-amber-900 border border-amber-200"
                            : "bg-blue-100 text-blue-900 border border-blue-200"
                        }`}>
                          {proj.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">Project #{idx + 1}</span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                        <p className="text-xs text-slate-600 mt-1"><span className="font-semibold text-slate-800">Problem Addressed:</span> {proj.problem}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                          <span className="font-bold text-slate-900 block">What You Build:</span>
                          <p className="text-slate-700">{proj.whatYouBuild}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                          <span className="font-bold text-slate-900 block font-sans">Expected Deliverables:</span>
                          <ul className="space-y-1 text-slate-700 list-disc list-inside">
                            {proj.deliverables.map((del, dIdx) => (
                              <li key={dIdx}>{del}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-xs font-bold text-slate-500 mr-2 self-center">Tools Used:</span>
                        {proj.tools.map((t, tIdx) => (
                          <span key={tIdx} className="text-xs bg-white text-slate-800 font-mono px-2 py-0.5 rounded border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-3 text-xs text-blue-950 flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-blue-900">Mentor Review Process: </span>
                          <span>{proj.reviewProcess}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Class Experience Section */}
              <section id="class-experience" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Class Experience & Learning Environment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <Video className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Live Sessions</h3>
                    <p className="text-slate-600">{course.classExperience.liveSessions}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <FileCode className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Recordings & Access</h3>
                    <p className="text-slate-600">{course.classExperience.recordings}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Assignments & Work</h3>
                    <p className="text-slate-600">{course.classExperience.assignments}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Doubt & Support</h3>
                    <p className="text-slate-600">{course.classExperience.doubtSupport}</p>
                  </div>
                </div>
              </section>

              {/* Trainer Profile Section */}
              <section id="trainer" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Lead Industry Trainer</h2>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-800 to-blue-950 text-white font-bold text-xl flex items-center justify-center shrink-0 border-2 border-blue-500 shadow-md">
                    {course.trainer.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{course.trainer.name}</h3>
                      <p className="text-xs font-semibold text-blue-600">{course.trainer.title}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{course.trainer.experience}</p>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-slate-900">Teaching Responsibility: </span>
                      {course.trainer.role}
                    </div>
                  </div>
                </div>
              </section>

              {/* Schedule and Fees Section */}
              <section id="fees" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Schedule & Transparent Fees</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                    <span className="text-xs font-bold text-blue-900 uppercase">Upcoming Batch</span>
                    <p className="text-sm font-bold text-slate-900">{course.scheduleFees.nextBatchDate}</p>
                    <p className="text-xs text-slate-600">{course.scheduleFees.timings}</p>
                  </div>

                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 uppercase">Total Fee & Terms</span>
                    <p className="text-sm font-bold text-slate-900">{course.scheduleFees.feeStructure}</p>
                    <p className="text-xs text-slate-600">{course.scheduleFees.paymentTerms}</p>
                  </div>
                </div>
              </section>

              {/* Career Assistance Section */}
              <section id="career" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-bold text-slate-900">360° Career Assistance Scope</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Substantiated referral assistance and technical preparation without misleading promises.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Resume & Portfolio</span>
                    <p className="text-slate-600">{course.careerSupportDetails.resumePreparation}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Mock Interviews</span>
                    <p className="text-slate-600">{course.careerSupportDetails.mockInterviews}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Technical Preparation</span>
                    <p className="text-slate-600">{course.careerSupportDetails.technicalPreparation}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Referral Network</span>
                    <p className="text-slate-600">{course.careerSupportDetails.jobReferrals}</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-2">
                  <span className="font-bold text-amber-900 block">Support Duration & Student Responsibilities:</span>
                  <p><span className="font-semibold">Support Duration:</span> {course.careerSupportDetails.supportDuration}</p>
                  <div>
                    <span className="font-semibold block mb-1">Eligibility Conditions:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {course.careerSupportDetails.studentResponsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Course FAQs Section */}
              <section id="faqs" className="scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-xl border-b border-slate-100 pb-3">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <h2>Frequently Asked Questions</h2>
                </div>
                <Accordion items={course.faqs} />
              </section>

            </div>

            {/* Right Sticky Enquiry Column - Fits 100vh viewport space cleanly */}
            <div id="enquiry-section" className="scroll-mt-36 lg:col-span-5 sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar space-y-4">
              <TrainingEnquiryForm initialCourseSlug={course.slug} />

              {/* Trust Badge Card */}
              <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>AAROHA Quality Assurance</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Join interactive cohorts taught directly by working IT practitioners. Code real-world project portfolios reviewed line-by-line before career referrals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Bottom Fixed CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 block">Course Fee</span>
          <span className="text-xs font-bold text-slate-900">{course.scheduleFees.feeStructure}</span>
        </div>
        <a
          href="#enquiry-section"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30"
        >
          Enquire About Course
        </a>
      </div>
    </>
  );
}
