"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { SERVICES_CATALOG } from "@/data/services";

interface BusinessEnquiryFormProps {
  initialServiceSlug?: string;
}

export const BusinessEnquiryForm: React.FC<BusinessEnquiryFormProps> = ({ initialServiceSlug }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceSlug: initialServiceSlug || "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Project Message).");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "business", ...formData }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          serviceSlug: initialServiceSlug || "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send project enquiry. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Discuss Your Project</h3>
        <p className="text-sm text-slate-600 mt-1">
          Share your software, cloud, or data project requirements — our engineering leads will get back to you within 24 hours.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-900">Enquiry Submitted Successfully!</h4>
          <p className="text-sm text-emerald-700">
            Thank you for reaching out. A senior engineering member will review your project details and respond shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs font-semibold text-emerald-800 underline hover:text-emerald-900"
          >
            Send Another Project Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Inc."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Service of Interest</label>
            <select
              value={formData.serviceSlug}
              onChange={(e) => setFormData({ ...formData, serviceSlug: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="">-- Select a Service (Optional) --</option>
              {SERVICES_CATALOG.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title} ({s.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Overview & Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about what you're trying to build or solve, timelines, and goals..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span>Sending Enquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Project Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
