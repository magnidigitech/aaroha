import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Cloud,
  GitMerge,
  Rocket,
  Globe,
  Zap,
  LayoutGrid,
  Users,
  Monitor,
  Layout,
  RefreshCw,
  Smartphone,
  ShoppingBag,
  UserCheck,
  ShieldCheck,
  Palette,
  Code,
  Database,
  BrainCircuit,
  BarChart3,
  Briefcase,
  Server,
  PieChart,
  FileCode,
  Settings,
  Building2,
  Bot,
  Workflow,
} from "lucide-react";
import { ServiceDetail } from "@/data/services";

const iconMap: Record<string, any> = {
  Code2,
  Cpu,
  Layers,
  Cloud,
  GitMerge,
  Rocket,
  Globe,
  Zap,
  LayoutGrid,
  Users,
  Monitor,
  Layout,
  RefreshCw,
  Smartphone,
  ShoppingBag,
  UserCheck,
  ShieldCheck,
  Figma: Palette,
  Palette,
  Code,
  Database,
  BrainCircuit,
  BarChart3,
  Briefcase,
  Server,
  PieChart,
  FileCode,
  Settings,
  Building2,
  Bot,
  Workflow,
};

const categoryTheme: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  "Software Engineering": {
    bg: "bg-blue-50/70",
    text: "text-blue-700",
    border: "border-blue-100",
    accent: "bg-blue-600",
  },
  "Application Development": {
    bg: "bg-sky-50/70",
    text: "text-sky-700",
    border: "border-sky-100",
    accent: "bg-sky-600",
  },
  "AI & Data": {
    bg: "bg-blue-50/70",
    text: "text-blue-700",
    border: "border-blue-100",
    accent: "bg-blue-600",
  },
  "Specialized Practices": {
    bg: "bg-slate-100/70",
    text: "text-slate-800",
    border: "border-slate-200",
    accent: "bg-slate-800",
  },
};

interface ServiceCardProps {
  service: ServiceDetail;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Code2;
  const theme = categoryTheme[service.category] || categoryTheme["Software Engineering"];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="block group h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
    >
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden relative cursor-pointer">
        {/* Top Accent Bar */}
        <div className={`h-1 w-full ${theme.accent}`} />

        <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-5">
          <div>
            {/* Header Row: Category Badge & Practice Icon */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${theme.bg} ${theme.text} ${theme.border}`}
              >
                {service.category}
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-700 border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-[#050E2B] tracking-tight mb-2.5 group-hover:text-blue-600 transition-colors leading-snug">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]">
              {service.summary}
            </p>
          </div>

          {/* Tech Stack Pills & View More Button on the same row */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5 items-center">
              {service.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Same Line: Right-aligned View More with Arrow */}
            <div className="flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700 space-x-1 shrink-0 ml-2">
              <span>View More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
