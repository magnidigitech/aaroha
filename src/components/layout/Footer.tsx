import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export const Footer: React.FC = () => {
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
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
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
                <div className="space-x-2">
                  {COMPANY_INFO.phones.map((p, idx) => (
                    <a key={idx} href={`tel:${p.raw}`} className="text-slate-300 hover:text-white transition-colors">
                      {p.display} {idx < COMPANY_INFO.phones.length - 1 ? "· " : ""}
                    </a>
                  ))}
                </div>
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
