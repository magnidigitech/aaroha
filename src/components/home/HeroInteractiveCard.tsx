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
        className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl px-7 pt-6 pb-4 text-white shadow-2xl overflow-hidden cursor-pointer group"
      >
        {/* Dynamic 3D Cursor Lighting Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0.4,
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.35), transparent 85%)`,
          }}
        />

        <div className="relative z-10 space-y-4">
          {/* Card Eyebrow Header (Removed Enterprise Ready badge as requested) */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2 text-blue-400">
              <span className="text-xs font-extrabold uppercase tracking-widest">
                AAROHA TECHNOLOGIES (ELEVATE | EMPOWER | EXCEL)
              </span>
            </div>
          </div>

          {/* Interactive Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <Link
              href="/services"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all space-y-1 block group/item"
            >
              <div className="flex items-center justify-between text-blue-400">
                <Code2 className="w-5 h-5" />
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-extrabold text-white">30</div>
              <div className="text-[11px] font-semibold text-slate-300">Specialized Services</div>
            </Link>

            <Link
              href="/training"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all space-y-1 block group/item"
            >
              <div className="flex items-center justify-between text-blue-400">
                <GraduationCap className="w-5 h-5" />
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-extrabold text-white">10</div>
              <div className="text-[11px] font-semibold text-slate-300">Training Programs</div>
            </Link>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Core Tech Stack & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {["Azure Cloud", "Databricks", "React 19", "Next.js", "PySpark", "GenAI RAG", "SAP ABAP", "Kubernetes"].map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/10 text-white font-mono px-3 py-1 rounded-lg border border-white/15 hover:bg-blue-600/30 hover:border-blue-400/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row - With Active Link for Powered by J2D */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% IP & Code Ownership</span>
            </span>
            <Link
              href="/about"
              className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition-colors flex items-center space-x-1"
            >
              <span>Powered by J2D &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
