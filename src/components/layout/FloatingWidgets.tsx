"use client";

import React from "react";
import { MessageSquare, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export const FloatingWidgets: React.FC = () => {
  return (
    <>
      {/* Floating WhatsApp Action */}
      <a
        href={COMPANY_INFO.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-semibold pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>

      {/* Side Email Quick Access */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col bg-[#0A1F52] border border-l-0 border-white/10 rounded-r-xl shadow-lg p-2 space-y-3">
        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          title="Send Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </>
  );
};
