import React from "react";
import { Award, ShieldCheck, Zap, MessageSquare } from "lucide-react";

export const WhyAarohaSection: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: "Proven Delivery Track Record",
      description: "Delivering software and cloud projects backed by J2D's enterprise technology delivery network.",
    },
    {
      icon: ShieldCheck,
      title: "Full Intellectual Property Ownership",
      description: "You retain 100% ownership of source code, technical documentation, and deployment assets.",
    },
    {
      icon: Zap,
      title: "Modern Engineering Stack",
      description: "Architectures built with current frameworks — TypeScript, React, Next.js, Python, Azure, and Databricks.",
    },
    {
      icon: MessageSquare,
      title: "Direct Engineer Communication",
      description: "Direct collaboration with your project developers through daily standups and transparent task tracking.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Why Work With Us</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Why businesses choose AAROHA Technologies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{p.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
