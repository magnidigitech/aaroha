"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  src: string;
  title: string;
  category: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    src: "/assets/hero/hero-slide-1-cloud.jpg",
    title: "Cloud & Data Infrastructure",
    category: "Cloud Architecture",
  },
  {
    id: 2,
    src: "/assets/hero/hero-slide-2-software.jpg",
    title: "Software Engineering Studio",
    category: "Custom Applications",
  },
  {
    id: 3,
    src: "/assets/hero/hero-slide-3-ai.jpg",
    title: "Big Data & AI Neural Pipelines",
    category: "Data & GenAI",
  },
  {
    id: 4,
    src: "/assets/hero/hero-slide-4-architecture.jpg",
    title: "Enterprise Architecture & Modernization",
    category: "Digital Transformation",
  },
  {
    id: 5,
    src: "/assets/hero/hero-slide-5-training.jpg",
    title: "Technology Training & Career Labs",
    category: "AAROHA Academy",
  },
];

export const InteractiveHeroBackground: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 35 });
  const targetPos = useRef({ x: 50, y: 35 });
  const currentPos = useRef({ x: 50, y: 35 });
  const animFrameId = useRef<number | null>(null);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Smooth mouse spotlight tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetPos.current = {
        x: (e.clientX / innerWidth) * 100,
        y: (e.clientY / innerHeight) * 100,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05;

      setMousePos({
        x: Math.round(currentPos.current.x * 10) / 10,
        y: Math.round(currentPos.current.y * 10) / 10,
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
      {/* 1. Base Dark Solid Background */}
      <div className="absolute inset-0 bg-[#050E2B]" />

      {/* 2. Vibrant Cinematic Crossfading Background Slides */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-75" : "opacity-0"
              }`}
            >
              <div
                className={`w-full h-full transform transition-transform duration-[6500ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center filter saturate-[1.15] brightness-95"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Balanced Left-Weighted Vignette Mask (Protects text contrast while letting center & right images shine) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050E2B]/95 via-[#050E2B]/65 to-[#050E2B]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050E2B] via-transparent to-[#050E2B]/60" />

      {/* 4. Interactive Cursor Spotlight Ambient Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.18), transparent 70%)`,
        }}
      />

      {/* 5. Subtle Technical Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 6. Slide Navigation & Category Badge (Bottom Right) */}
      <div className="pointer-events-auto absolute bottom-6 right-8 hidden lg:flex items-center space-x-3 bg-[#050E2B]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs shadow-2xl">
        <div className="flex items-center space-x-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-6 bg-blue-400 shadow-sm shadow-blue-400/50" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-slate-200 font-semibold text-[11px] border-l border-white/15 pl-3">
          {HERO_SLIDES[currentSlide].category}
        </span>
      </div>

      {/* 7. Precision Top & Bottom Edge Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#050E2B] to-transparent" />
    </div>
  );
};
