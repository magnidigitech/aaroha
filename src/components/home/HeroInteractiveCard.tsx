"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Cpu, Layers, Database, Sparkles, ShieldCheck, ArrowRight, Code2, GraduationCap } from "lucide-react";

export const HeroInteractiveCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;
    setMousePos({ x: xPct, y: yPct });

    const rotateY = ((mouseX - width / 2) / (width / 2)) * 4;
    const rotateX = -((mouseY - height / 2) / (height / 2)) * 4;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 hidden lg:block">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.01, 1.01, 1.01)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-3xl px-7 pt-6 pb-4 text-slate-900 shadow-xl shadow-blue-900/5 overflow-hidden cursor-pointer group"
      >
        {/* Dynamic 3D Cursor Lighting Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0.4,
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.12), transparent 85%)`,
          }}
        />

        <div className="relative z-10 space-y-4">
          {/* Card Eyebrow Header (Removed Enterprise Ready badge as requested) */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center space-x-2 text-blue-700">
              <span className="text-xs font-extrabold uppercase tracking-widest">
                AAROHA TECHNOLOGIES (ELEVATE | EMPOWER | EXCEL)
              </span>
            </div>
          </div>

          {/* Interactive Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <Link
              href="/services"
              className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/50 transition-all space-y-1 block group/item"
            >
              <div className="flex items-center justify-between text-blue-600">
                <Code2 className="w-5 h-5" />
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">30</div>
              <div className="text-[11px] font-semibold text-slate-600">Specialized Services</div>
            </Link>

            <Link
              href="/training"
              className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/50 transition-all space-y-1 block group/item"
            >
              <div className="flex items-center justify-between text-blue-600">
                <GraduationCap className="w-5 h-5" />
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">10</div>
              <div className="text-[11px] font-semibold text-slate-600">Training Programs</div>
            </Link>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Core Tech Stack & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {["Azure Cloud", "Databricks", "React 19", "Next.js", "PySpark", "GenAI RAG", "SAP ABAP", "Kubernetes"].map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-100 text-slate-700 font-mono px-3 py-1 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row - With Active Link for Powered by J2D */}
          <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% IP & Code Ownership</span>
            </span>
            <Link
              href="/about"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors flex items-center space-x-1"
            >
              <span>Powered by J2D &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
