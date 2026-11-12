"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export const FloatingWidgets: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/crm")) {
    return null;
  }

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

      {/* Left Side Quick Access & Social Bar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col bg-white/95 backdrop-blur-md border border-l-0 border-slate-200 rounded-r-xl shadow-lg p-1.5 space-y-1.5">
        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Send Email"
          aria-label="Send Email"
        >
          <Mail className="w-5 h-5" />
        </a>

        <div className="h-px bg-slate-200 mx-1.5" />

        <a
          href={COMPANY_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-600 hover:text-[#0A66C2] hover:bg-blue-50 rounded-lg transition-colors"
          title="LinkedIn"
          aria-label="AAROHA Technologies on LinkedIn"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </a>

        <a
          href={COMPANY_INFO.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-600 hover:text-[#FF0000] hover:bg-red-50 rounded-lg transition-colors"
          title="YouTube"
          aria-label="AAROHA Technologies on YouTube"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>

        <a
          href={COMPANY_INFO.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-600 hover:text-[#E4405F] hover:bg-pink-50 rounded-lg transition-colors"
          title="Instagram"
          aria-label="AAROHA Technologies on Instagram"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
        </a>

        <a
          href={COMPANY_INFO.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-600 hover:text-[#1877F2] hover:bg-blue-50 rounded-lg transition-colors"
          title="Facebook"
          aria-label="AAROHA Technologies on Facebook"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
          </svg>
        </a>
      </div>
    </>
  );
};
