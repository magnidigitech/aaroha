"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/crm")) {
    return null;
  }

  return (
    <footer className="bg-[#050E2B] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/aaroha-logo-dark.png"
                alt="AAROHA Technologies"
                width={240}
                height={55}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Software, cloud, and data engineering solutions built for growing businesses — powered by J2D Technologies.
            </p>
            <div className="space-y-2 pt-2 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="text-slate-400">{COMPANY_INFO.address.full}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {COMPANY_INFO.phones.map((p, idx) => (
                    <span key={idx} className="inline-flex items-center">
                      <a href={`tel:${p.raw}`} className="text-slate-300 hover:text-white transition-colors">
                        {p.display}
                      </a>
                      {idx < COMPANY_INFO.phones.length - 1 && <span className="ml-2 text-slate-600">&middot;</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-3 pt-3">
                <a
                  href={COMPANY_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#38bdf8] hover:bg-white/10 transition-colors"
                  title="LinkedIn"
                  aria-label="AAROHA Technologies on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={COMPANY_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#f87171] hover:bg-white/10 transition-colors"
                  title="YouTube"
                  aria-label="AAROHA Technologies on YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={COMPANY_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#f472b6] hover:bg-white/10 transition-colors"
                  title="Instagram"
                  aria-label="AAROHA Technologies on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </a>
                <a
                  href={COMPANY_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#60a5fa] hover:bg-white/10 transition-colors"
                  title="Facebook"
                  aria-label="AAROHA Technologies on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Core Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/services/custom-software-development" className="hover:text-white transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/saas-development" className="hover:text-white transition-colors">
                  SaaS Development
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-data-engineering" className="hover:text-white transition-colors">
                  Cloud & Data Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/dedicated-development-team" className="hover:text-white transition-colors">
                  Staff Augmentation
                </Link>
              </li>
              <li>
                <Link href="/services/digital-transformation" className="hover:text-white transition-colors">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-400 font-medium hover:underline pt-1 inline-block">
                  View All 30 Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Training */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Training & Placement</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/training/azure-data-engineer-genai" className="hover:text-white transition-colors">
                  Azure Data Eng with GenAI
                </Link>
              </li>
              <li>
                <Link href="/training/azure-data-engineer" className="hover:text-white transition-colors">
                  Azure Data Engineer
                </Link>
              </li>
              <li>
                <Link href="/training/data-science-ml" className="hover:text-white transition-colors">
                  Data Science & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/training/python-full-stack" className="hover:text-white transition-colors">
                  Python Full Stack
                </Link>
              </li>
              <li>
                <Link href="/training/sap-abap" className="hover:text-white transition-colors">
                  SAP ABAP Programming
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-blue-400 font-medium hover:underline pt-1 inline-block">
                  AAROHA Program & Placement &rarr;
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="text-emerald-400 font-semibold hover:underline pt-0.5 inline-block">
                  Course & Candidate Enquiry &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Company */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers & Openings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.j2dWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-blue-400 font-medium"
                >
                  J2D Technologies &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. {COMPANY_INFO.poweredBy}. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
