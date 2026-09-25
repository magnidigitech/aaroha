import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Layers,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  Terminal,
  Briefcase,
  Boxes,
  FileCheck,
  Cpu,
  Coins,
  Sparkles,
  Server,
  UserCheck,
} from "lucide-react";
import { SERVICES_CATALOG } from "@/data/services";
import { getServiceSeo } from "@/data/seoMap";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_CATALOG.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const seo = getServiceSeo(slug);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_CATALOG.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES_CATALOG.filter((s) => service.relatedSlugs.includes(s.slug));

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.category,
    provider: {
      "@type": "Organization",
      name: "AAROHA Technologies",
    },
    description: service.summary,
    areaServed: "Global",
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* 1. Hero Header */}
      <section className="bg-[#050E2B] text-white pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/50 via-transparent to-transparent opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
                {service.category} Practice
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
                {service.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#enquiry-form"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center space-x-2 text-sm"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#scope-deliverables"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold px-5 py-3.5 rounded-xl transition-all text-sm"
                >
                  View Deliverables & Scope
                </a>
              </div>
            </div>

            {/* Quick Summary Badge Card */}
            <div className="lg:col-span-4 hidden lg:block bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center space-x-3 text-blue-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Enterprise Quality Guarantee</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% Intellectual Property & Source Code Ownership</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Production-Grade Architecture & Rigorous QA Testing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Transparent Milestone-Based Delivery Plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Form Layout */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* 2. Overview & Who It Is For */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Service Overview</span>
                  </h2>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line mt-4">
                    {service.overview}
                  </p>
                </div>

                {/* 3. Who It Is For */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>Who This Service Is For</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
                    {service.intendedAudience.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Problems We Address */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Practical Challenges We Solve</span>
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {service.problemsAddressed.map((problem, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3.5 bg-rose-50/40 rounded-xl border border-rose-100"
                    >
                      <span className="text-rose-500 font-bold text-sm">•</span>
                      <span className="text-xs text-slate-700 leading-relaxed font-medium">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. What We Deliver & Scope Checklist */}
              <div
                id="scope-deliverables"
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6"
              >
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-xl border-b border-slate-100 pb-3">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <h2>What We Deliver</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.scopeDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Scope Boundaries (Included vs Separate Agreement) */}
                {service.scopeBoundaries && (
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Scope Boundaries & Clear Commitments
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/70 space-y-2">
                        <span className="font-bold text-emerald-900 block flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Standard Included Scope</span>
                        </span>
                        <ul className="space-y-2 text-emerald-950">
                          {service.scopeBoundaries.included.map((inc, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-800 block flex items-center space-x-1.5">
                          <FileCheck className="w-4 h-4 text-slate-500" />
                          <span>Requires Separate Agreement</span>
                        </span>
                        <ul className="space-y-2 text-slate-600">
                          {service.scopeBoundaries.separateAgreement.map((sep, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-slate-400 font-bold">•</span>
                              <span>{sep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Intended Use Cases */}
              {service.useCases && service.useCases.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <Boxes className="w-5 h-5 text-blue-600" />
                    <span>Target Use Cases & Workflows</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {service.useCases.map((useCase, idx) => (
                      <div key={idx} className="bg-blue-50/40 p-4 rounded-xl border border-blue-100 space-y-1">
                        <span className="text-xs font-bold text-blue-900 block">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. How We Work (Delivery Methodology) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>How We Work & Delivery Methodology</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{service.deliveryApproach}</p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-xs font-extrabold text-blue-600 uppercase block">01. Discovery</span>
                    <span className="text-[11px] text-slate-500 block">Scope & Wireframes</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-xs font-extrabold text-blue-600 uppercase block">02. Architecture</span>
                    <span className="text-[11px] text-slate-500 block">Schema & API Plan</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-xs font-extrabold text-blue-600 uppercase block">03. Build & Test</span>
                    <span className="text-[11px] text-slate-500 block">Sprint Demos & QA</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-xs font-extrabold text-blue-600 uppercase block">04. Handover</span>
                    <span className="text-[11px] text-slate-500 block">Code Transfer & Support</span>
                  </div>
                </div>
              </div>

              {/* 8. Technology Choices */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Core Technologies & Toolstack</span>
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {service.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-200/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 9. Cost & Timeline Factors */}
              {service.costFactors && service.costFactors.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <span>Cost & Timeline Factors</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Project estimates vary depending on technical complexity rather than flat template rates. Key cost drivers include:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {service.costFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 10. Handover, Ownership & Support */}
              {service.handoverDetails && service.handoverDetails.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Handover, IP Ownership & Support</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    {service.handoverDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Client Preparation Checklist */}
              {service.clientPreparation && service.clientPreparation.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <FileCheck className="w-5 h-5 text-blue-600" />
                    <span>Client Preparation Checklist</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    To help us launch your project quickly, having these items ready is beneficial:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {service.clientPreparation.map((prep, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 12. Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold text-xl">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <h2>Frequently Asked Questions</h2>
                  </div>
                  <Accordion items={service.faqs} />
                </div>
              )}

              {/* 13. Related Services */}
              {relatedServices.length > 0 && (
                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Related Engineering Practices
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/services/${rel.slug}`}
                        className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-blue-400 transition-all block group shadow-sm"
                      >
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {rel.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{rel.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Form Column (14. Final Enquiry) */}
            <div id="enquiry-form" className="lg:col-span-5 sticky top-24">
              <BusinessEnquiryForm initialServiceSlug={service.slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

