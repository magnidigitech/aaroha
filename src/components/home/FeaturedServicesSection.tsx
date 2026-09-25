"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_CATALOG, ServiceCategory, ServiceDetail } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";

const FEATURED_SLUGS = [
  "cloud-data-engineering",
  "web-development",
  "generative-ai-agent-development",
  "custom-software-development",
  "saas-development",
  "sap-s4-hana-implementation",
  "dedicated-development-team",
  "web-application-development",
  "mobile-app-development",
];

export const FeaturedServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "All">("All");

  const categories: (ServiceCategory | "All")[] = [
    "All",
    "Software Engineering",
    "Application Development",
    "AI & Data",
    "Specialized Practices",
  ];

  const featuredServices = FEATURED_SLUGS.map((slug) =>
    SERVICES_CATALOG.find((s) => s.slug === slug)
  ).filter(Boolean) as ServiceDetail[];

  const filteredServices =
    activeCategory === "All"
      ? featuredServices
      : SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Service Catalog</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Featured Engineering Services
            </h3>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <span>Browse All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 border-b border-slate-100 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#050E2B] text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat === "All" ? "Featured Services" : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <ServiceCard key={svc.slug} service={svc} />
          ))}
        </div>
      </div>
    </section>
  );
};
