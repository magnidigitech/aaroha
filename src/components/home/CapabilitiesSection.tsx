import React from "react";
import Link from "next/link";
import { Code, Database, Briefcase, UserCheck, ArrowRight } from "lucide-react";

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: Code,
      title: "Software Engineering",
      description: "Custom web applications, SaaS platforms, MVP builds, and API integration middleware.",
      href: "/services/custom-software-development",
    },
    {
      icon: Database,
      title: "Cloud & Data Engineering",
      description: "Azure Data Factory, Databricks, Synapse, Snowflake, and Microsoft Fabric pipelines.",
      href: "/services/cloud-data-engineering",
    },
    {
      icon: Briefcase,
      title: "Technology Consulting",
      description: "Architecture reviews, digital transformation roadmaps, and cloud infrastructure auditing.",
      href: "/services/digital-transformation",
    },
    {
      icon: UserCheck,
      title: "Dedicated Teams",
      description: "Ring-fenced engineering capacity working directly within your sprint workflows.",
      href: "/services/dedicated-development-team",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Core Engineering Practices</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            A delivery partner across the software lifecycle
          </h3>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            AAROHA Technologies supports startups, growing companies, and enterprises across software, cloud, and data needs — operating as an integrated extension of your engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <Link
                key={idx}
                href={cap.href}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all group flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{cap.description}</p>
                </div>
                <div className="inline-flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
