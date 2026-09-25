"use client";

import React, { useState, useRef } from "react";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ProgramSnapshotCardProps {
  commitment: string;
  language: string;
  nextBatchDate: string;
  certIssuer: string;
}

export const ProgramSnapshotCard: React.FC<ProgramSnapshotCardProps> = ({
  commitment,
  language,
  nextBatchDate,
  certIssuer,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor distance relative to card dimensions
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;
    setMousePos({ x: xPct, y: yPct });

    // Calculate 3D rotation angles (subtle 4 deg max tilt)
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 4;
    const rotateX = -((mouseY - height / 2) / (height / 2)) * 4;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000">
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
        className="relative bg-[#050E2B]/90 backdrop-blur-xl border border-white/20 rounded-2xl px-6 pt-5 pb-4 text-white shadow-2xl overflow-hidden group cursor-pointer"
      >
        {/* Dynamic 3D Lighting Radial Glow following cursor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.35), transparent 85%)`,
          }}
        />

        {/* Card Content Wrapper */}
        <div className="relative z-10 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Program Snapshot
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-400 opacity-90" />
          </div>

          {/* Standardized Alignment Grid Rows */}
          <div className="space-y-2.5 text-xs">
            {/* Row 1: Weekly Commitment */}
            <div className="grid grid-cols-12 items-center pb-2.5 border-b border-white/10">
              <span className="col-span-5 text-slate-400 font-medium leading-tight">
                Weekly Commitment:
              </span>
              <span className="col-span-7 text-right font-bold text-white leading-normal">
                {commitment}
              </span>
            </div>

            {/* Row 2: Language */}
            <div className="grid grid-cols-12 items-center pb-2.5 border-b border-white/10">
              <span className="col-span-5 text-slate-400 font-medium leading-tight">
                Language:
              </span>
              <span className="col-span-7 text-right font-bold text-white leading-normal">
                {language}
              </span>
            </div>

            {/* Row 3: Next Batch */}
            <div className="grid grid-cols-12 items-center pb-2.5 border-b border-white/10">
              <span className="col-span-5 text-slate-400 font-medium leading-tight">
                Next Batch:
              </span>
              <span className="col-span-7 text-right font-bold text-white leading-normal">
                {nextBatchDate}
              </span>
            </div>

            {/* Row 4: Certificate Issuer */}
            <div className="grid grid-cols-12 items-center pt-0.5">
              <span className="col-span-5 text-slate-400 font-medium leading-tight">
                Certificate Issuer:
              </span>
              <span className="col-span-7 text-right font-bold text-white leading-normal">
                {certIssuer}
              </span>
            </div>
          </div>

          {/* Bottom Micro Quality Badge */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Interactive Cohort</span>
            </span>
            <span className="text-slate-400">Live + Practical Labs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
