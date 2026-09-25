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
    <section className="py-24 bg-[#050E2B] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Delivery Approach</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Structured, predictable software engineering
          </h3>
          <p className="mt-4 text-base text-slate-300">
            How we partner with software teams to deliver maintainable applications and pipelines on schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                <div className="text-4xl font-extrabold text-blue-400 mb-4 tracking-tight">{s.num}</div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
