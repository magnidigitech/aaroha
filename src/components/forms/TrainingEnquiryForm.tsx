"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { TRAINING_COURSES } from "@/data/training";

interface TrainingEnquiryFormProps {
  initialCourseSlug?: string;
}

export const TrainingEnquiryForm: React.FC<TrainingEnquiryFormProps> = ({ initialCourseSlug }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    courseSlug: initialCourseSlug || "azure-data-engineer-genai",
    experienceLevel: "Beginner / Graduate",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactInfo) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Phone or Email).");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "training", ...formData }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          contactInfo: "",
          courseSlug: initialCourseSlug || "azure-data-engineer-genai",
          experienceLevel: "Beginner / Graduate",
          message: "",
        });
      } else {
        throw new Error("Failed to submit course request. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Request Course Details</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Receive syllabus details, batch timings, project info, and placement guidance.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2 animate-in fade-in duration-300">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-900">Course Request Received!</h4>
          <p className="text-xs text-emerald-700">
            Thank you! Our career counselor will send you the course details and contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-1 text-xs font-semibold text-emerald-800 underline hover:text-emerald-900"
          >
            Request Details for Another Course
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {status === "error" && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-xs text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address or Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              placeholder="email@example.com or +91 9876543210"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Course / Program</label>
            <select
              value={formData.courseSlug}
              onChange={(e) => setFormData({ ...formData, courseSlug: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              {TRAINING_COURSES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} {c.isUpcoming ? " [🚀 Upcoming Batch]" : `(${c.duration})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Background / Experience</label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="Beginner / Graduate">Graduate / Fresher</option>
              <option value="Working Professional (IT)">Working Professional (IT / Tech)</option>
              <option value="Working Professional (Non-IT)">Working Professional (Non-IT / Domain)</option>
              <option value="Corporate Team">Corporate Team Request</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Questions (Optional)</label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Ask about batch timings, syllabus, placement assistance, etc..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span>Submitting Request...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Request Course Details</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
