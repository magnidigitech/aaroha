"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowRight, Code2, Layout, Database, Settings, GraduationCap } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { SERVICES_CATALOG } from "@/data/services";
import { TRAINING_COURSES } from "@/data/training";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const pathname = usePathname();

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trainingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setServicesOpen(false);
    setTrainingOpen(false);
  }, [pathname]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setTrainingOpen(false);
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
  };

  const handleTrainingMouseEnter = () => {
    if (trainingTimeoutRef.current) clearTimeout(trainingTimeoutRef.current);
    setServicesOpen(false);
    setTrainingOpen(true);
  };

  const handleTrainingMouseLeave = () => {
    trainingTimeoutRef.current = setTimeout(() => {
      setTrainingOpen(false);
    }, 300);
  };

  const softwareServices = SERVICES_CATALOG.filter((s) => s.category === "Software Engineering");
  const appDevServices = SERVICES_CATALOG.filter((s) => s.category === "Application Development");
  const aiDataServices = SERVICES_CATALOG.filter((s) => s.category === "AI & Data");
  const specializedServices = SERVICES_CATALOG.filter((s) => s.category === "Specialized Practices");

  const cloudTrainingCourses = TRAINING_COURSES.filter((c) => !c.isUpcoming && (c.category === "Cloud & Data Engineering" || c.category === "AI & Analytics"));
  const softwareTrainingCourses = TRAINING_COURSES.filter((c) => !c.isUpcoming && (c.category === "Software Engineering" || c.category === "SAP Practices"));
  const upcomingTrainingCourses = TRAINING_COURSES.filter((c) => c.isUpcoming);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050E2B]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
          : "bg-[#050E2B] border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative">
        <div className="flex items-center justify-between">
          {/* Left Group: Logo & Primary Desktop Navigation */}
          <div className="flex items-center space-x-8 xl:space-x-10">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/assets/aaroha-logo-dark.png"
              alt="AAROHA Technologies — Powered by J2D"
              width={240}
              height={55}
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* Services Mega Menu Dropdown */}
            <div
              className="static"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/services") || servicesOpen
                    ? "text-white bg-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 opacity-70 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown Container with Hover Bridge */}
              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <div className="w-[1020px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-slate-900">
                    {/* Top Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">Comprehensive Engineering Practices</h3>
                        <p className="text-xs text-slate-500">Explore all 30 specialized software, application, cloud data, and SAP practices.</p>
                      </div>
                      <Link
                        href="/services"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition-colors"
                      >
                        <span>View Directory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* 4-Column Full Catalog Grid */}
                    <div className="grid grid-cols-4 gap-6">
                      {/* Software Engineering (10) */}
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          <Code2 className="w-4 h-4 text-blue-600" />
                          <span>Software Eng ({softwareServices.length})</span>
                        </div>
                        <ul className="space-y-1 text-xs">
                          {softwareServices.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                href={`/services/${svc.slug}`}
                                className="block py-1 text-slate-700 hover:text-blue-600 hover:translate-x-1 font-medium transition-all truncate"
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application Development (9) */}
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          <Layout className="w-4 h-4 text-blue-600" />
                          <span>Application Dev ({appDevServices.length})</span>
                        </div>
                        <ul className="space-y-1 text-xs">
                          {appDevServices.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                href={`/services/${svc.slug}`}
                                className="block py-1 text-slate-700 hover:text-blue-600 hover:translate-x-1 font-medium transition-all truncate"
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* AI & Data (5) */}
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          <Database className="w-4 h-4 text-blue-600" />
                          <span>AI & Data ({aiDataServices.length})</span>
                        </div>
                        <ul className="space-y-1 text-xs">
                          {aiDataServices.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                href={`/services/${svc.slug}`}
                                className="block py-1 text-slate-700 hover:text-blue-600 hover:translate-x-1 font-medium transition-all truncate"
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specialized Practices (7) */}
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          <Settings className="w-4 h-4 text-blue-600" />
                          <span>Specialized ({specializedServices.length})</span>
                        </div>
                        <ul className="space-y-1 text-xs">
                          {specializedServices.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                href={`/services/${svc.slug}`}
                                className="block py-1 text-slate-700 hover:text-blue-600 hover:translate-x-1 font-medium transition-all truncate"
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Link */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-slate-600 font-medium">Looking for a custom engineering scope?</span>
                      <Link
                        href="/contact"
                        className="text-blue-600 font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Discuss your project with our leads &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Training Mega Menu Dropdown */}
            <div
              className="static"
              onMouseEnter={handleTrainingMouseEnter}
              onMouseLeave={handleTrainingMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/training") || trainingOpen
                    ? "text-white bg-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setTrainingOpen(!trainingOpen)}
              >
                <span>Training</span>
                <ChevronDown
                  className={`w-4 h-4 opacity-70 transition-transform duration-200 ${
                    trainingOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Training Dropdown Container */}
              {trainingOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={handleTrainingMouseEnter}
                  onMouseLeave={handleTrainingMouseLeave}
                >
                  <div className="w-[1000px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-slate-900">
                    {/* Top Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                          <h3 className="text-base font-extrabold text-slate-900">AAROHA Engineering Academy</h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Explore our {TRAINING_COURSES.length} project-backed technology training and career acceleration programs.</p>
                      </div>
                      <Link
                        href="/training"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition-colors"
                      >
                        <span>View All {TRAINING_COURSES.length} Programs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* 3-Column Catalog Grid */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* Cloud, Data & AI Programs */}
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          <Database className="w-4 h-4 text-blue-600" />
                          <span>Cloud & Data Tracks ({cloudTrainingCourses.length})</span>
                        </div>
                        <ul className="space-y-2 text-xs">
                          {cloudTrainingCourses.map((course) => (
                            <li key={course.slug}>
                              <Link
                                href={`/training/${course.slug}`}
                                className="group/item flex items-center justify-between py-1 text-slate-700 hover:text-blue-600 font-medium transition-all"
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform truncate">{course.title}</span>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded shrink-0 ml-1">
                                  {course.duration}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Software & Enterprise Programs */}
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          <Code2 className="w-4 h-4 text-blue-600" />
                          <span>Software & AI Tracks ({softwareTrainingCourses.length})</span>
                        </div>
                        <ul className="space-y-2 text-xs">
                          {softwareTrainingCourses.map((course) => (
                            <li key={course.slug}>
                              <Link
                                href={`/training/${course.slug}`}
                                className="group/item flex items-center justify-between py-1 text-slate-700 hover:text-blue-600 font-medium transition-all"
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform truncate">{course.title}</span>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded shrink-0 ml-1">
                                  {course.duration}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Upcoming Spotlight Programs */}
                      <div className="bg-gradient-to-br from-amber-500/5 via-blue-500/5 to-indigo-500/10 p-3.5 rounded-xl border border-amber-500/20">
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-3 pb-2 border-b border-amber-200/50">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                          <span>Upcoming Tracks ({upcomingTrainingCourses.length})</span>
                        </div>
                        <ul className="space-y-2 text-xs">
                          {upcomingTrainingCourses.map((course) => (
                            <li key={course.slug}>
                              <Link
                                href={`/training/${course.slug}`}
                                className="group/item flex items-center justify-between py-1 text-slate-800 hover:text-amber-700 font-semibold transition-all"
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform truncate">{course.title}</span>
                                <span className="text-[9px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded shrink-0 ml-1">
                                  Upcoming
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t border-amber-200/60 text-[11px] text-amber-800 font-medium">
                          <Link href="/training/register" className="text-amber-700 font-bold hover:underline flex items-center justify-between">
                            <span>Pre-register for early batch access</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl">
                      <div className="flex items-center space-x-3 text-slate-600 font-medium text-[11px]">
                        <span>✓ 5-Step AAROHA Program</span>
                        <span>·</span>
                        <span>✓ 360° Placement Assistance</span>
                        <span>·</span>
                        <span>✓ Real Project Labs</span>
                      </div>
                      <Link
                        href="/contact"
                        className="text-blue-600 font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Discuss with Course Mentor &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/industries"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/industries" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Industries
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              About
            </Link>

            <Link
              href="/careers"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/careers" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Careers
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/register"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-all shadow-md shadow-teal-500/20"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Register Now</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 shadow-md shadow-blue-600/30"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1F52] border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200">
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            All Services (30)
          </Link>
          <Link
            href="/training"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Training & Courses
          </Link>
          <Link
            href="/industries"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Industries
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            About Us
          </Link>
          <Link
            href="/careers"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Careers
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col space-y-2">
            <Link
              href="/register"
              className="w-full text-center py-2.5 rounded-lg bg-teal-500 text-white font-bold text-sm"
            >
              Training & Career Registration
            </Link>
            <Link
              href="/contact"
              className="w-full text-center py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm"
            >
              Discuss a Project
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phones[0].raw}`}
              className="w-full text-center py-2.5 rounded-lg border border-white/20 text-white font-medium text-sm"
            >
              Call Us: {COMPANY_INFO.phones[0].display}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
