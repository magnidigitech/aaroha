import React from "react";
import { Search, Code2, CloudUpload, Headphones } from "lucide-react";

export const DeliveryProcessSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discovery & Requirements",
      description: "We map your user workflows, data structures, and tech constraints to build a clear project scope.",
    },
    {
      num: "02",
      icon: Code2,
      title: "Agile Sprint Delivery",
      description: "Iterative development with bi-weekly demos, transparent task boards, and continuous code commits.",
    },
    {
      num: "03",
      icon: CloudUpload,
      title: "QA & Cloud Deployment",
      description: "Rigorous testing, security auditing, and automated CI/CD deployment to your cloud environment.",
    },
    {
      num: "04",
      icon: Headphones,
      title: "Handover & Ongoing Support",
      description: "Full IP transfer, clean documentation, developer handover, and SLA-backed ongoing maintenance.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Delivery Approach</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Structured, predictable software engineering
          </h3>
          <p className="mt-4 text-base text-slate-600">
            How we partner with software teams to deliver maintainable applications and pipelines on schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-extrabold text-blue-600 mb-4 tracking-tight">{s.num}</div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
