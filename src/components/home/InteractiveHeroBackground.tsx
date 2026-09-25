"use client";

import React, { useEffect, useRef, useState } from "react";

export const InteractiveHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate constellation nodes
    const nodeCount = Math.floor(Math.min(width, height) / 18);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1,
      });
    }

    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.1;
      currentMouseY += (targetMouseY - currentMouseY) * 0.1;

      // Draw nodes & connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move node
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse distance
        const dx = currentMouseX - node.x;
        const dy = currentMouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Highlight nodes near mouse
        const maxDist = 180;
        let nodeAlpha = 0.25;

        if (dist < maxDist) {
          const factor = 1 - dist / maxDist;
          node.radius = node.baseRadius + factor * 2.5;
          nodeAlpha = 0.25 + factor * 0.65;

          // Draw connection line to mouse
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(currentMouseX, currentMouseY);
          ctx.strokeStyle = `rgba(59, 130, 246, ${factor * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          node.radius = node.baseRadius;
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (nDist < 120) {
            const lineAlpha = (1 - nDist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${nodeAlpha})`;
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = dist < maxDist ? 10 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      setMousePos({ x: targetMouseX, y: targetMouseY, active: true });
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, active: false }));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-auto">
      {/* Dynamic Mouse Spotlight Gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: mousePos.active ? 1 : 0.6,
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.22), rgba(30, 58, 138, 0.08) 45%, transparent 75%)`,
        }}
      />

      {/* Secondary Ambient Accent Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 70%)`,
        }}
      />

      {/* Interactive Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
