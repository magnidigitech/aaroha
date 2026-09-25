"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="pr-4 text-base">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-blue-600 transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
