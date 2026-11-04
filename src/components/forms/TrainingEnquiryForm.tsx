"use client";

import React, { useState, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { TRAINING_COURSES } from "@/data/training";
import { trackMetaEvent } from "@/components/analytics/MetaPixel";

interface TrainingEnquiryFormProps {
  initialCourseSlug?: string;
}

export const TrainingEnquiryForm: React.FC<TrainingEnquiryFormProps> = ({ initialCourseSlug }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    yearOfPassing: "",
    candidateType: "Fresher" as "Fresher" | "Experienced",
    totalExperience: "",
    changingDomain: "No" as "Yes" | "No",
    interestedDomain: "",
    courseSlug: initialCourseSlug || "azure-data-engineer-genai",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasTrackedSubmissionRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate mandatory base fields
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your Full Name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid Email ID.");
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim() || cleanPhone.length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a valid 10-digit Mobile Number.");
      return;
    }

    if (!formData.yearOfPassing) {
      setStatus("error");
      setErrorMessage("Please select your Year of Passing Out.");
      return;
    }

    // 2. Validate conditional fields
    if (formData.candidateType === "Experienced" && !formData.totalExperience) {
      setStatus("error");
      setErrorMessage("Please select your Total Years of Experience.");
      return;
    }

    if (formData.changingDomain === "Yes" && !formData.interestedDomain) {
      setStatus("error");
      setErrorMessage("Please select your Interested Domain.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        type: "training",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        contactInfo: `${formData.email.trim()} | ${formData.phone.trim()}`,
        yearOfPassing: formData.yearOfPassing,
        candidateType: formData.candidateType,
        totalExperience: formData.candidateType === "Experienced" ? formData.totalExperience : undefined,
        changingDomain: formData.changingDomain,
        interestedDomain: formData.changingDomain === "Yes" ? formData.interestedDomain : undefined,
        courseSlug: formData.courseSlug,
        experienceLevel:
          formData.candidateType === "Experienced"
            ? `Experienced (${formData.totalExperience || "N/A"})`
            : "Fresher / Graduate",
        message: formData.message.trim(),
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        if (!hasTrackedSubmissionRef.current) {
          hasTrackedSubmissionRef.current = true;
          trackMetaEvent("Lead", {
            lead_type: "training_enquiry",
            content_category: "Candidate Enquiry",
            content_name: formData.courseSlug,
            candidate_type: formData.candidateType,
            year_of_passing: formData.yearOfPassing,
          });
        }
        setFormData({
          name: "",
          email: "",
          phone: "",
          yearOfPassing: "",
          candidateType: "Fresher",
          totalExperience: "",
          changingDomain: "No",
          interestedDomain: "",
          courseSlug: initialCourseSlug || "azure-data-engineer-genai",
          message: "",
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xl transition-all">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wide uppercase mb-2">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>Candidate Admissions & Guidance</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Enquiry Form</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Submit your profile details to receive syllabus outlines, batch schedules, project reviews, and placement assistance.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-900">Enquiry Submitted Successfully!</h4>
          <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
            Thank you! Your enquiry has been received. Our senior technical career counselor will review your profile and reach out via phone and email with detailed course plans.
          </p>
          <button
            type="button"
            onClick={() => {
              hasTrackedSubmissionRef.current = false;
              setStatus("idle");
            }}
            className="mt-3 inline-block px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg shadow-sm hover:bg-emerald-50 transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-700 flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Full Name */}
          <div>
            <label htmlFor="enquiry-fullname" className="block text-xs font-semibold text-slate-700 mb-1">
              1. Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="enquiry-fullname"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Rajesh Sharma"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          {/* 2 & 3. Email ID and Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="enquiry-email" className="block text-xs font-semibold text-slate-700 mb-1">
                2. Email ID <span className="text-rose-500">*</span>
              </label>
              <input
                id="enquiry-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rajesh@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                3. Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* 4. Year of Passing Out */}
          <div>
            <label htmlFor="enquiry-year-passing" className="block text-xs font-semibold text-slate-700 mb-1">
              4. Year of Passing Out <span className="text-rose-500">*</span>
            </label>
            <select
              id="enquiry-year-passing"
              required
              value={formData.yearOfPassing}
              onChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white transition"
            >
              <option value="">Select Passing Year</option>
              <option value="Pursuing">Pursuing (Currently in College)</option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="Before 2020">Before 2020</option>
            </select>
          </div>

          {/* 5. Candidate Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              5. Candidate Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  formData.candidateType === "Fresher"
                    ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <input
                  type="radio"
                  name="candidateType"
                  value="Fresher"
                  checked={formData.candidateType === "Fresher"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      candidateType: "Fresher",
                      totalExperience: "",
                    })
                  }
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 mr-2"
                />
                <span>Fresher</span>
              </label>

              <label
                className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  formData.candidateType === "Experienced"
                    ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <input
                  type="radio"
                  name="candidateType"
                  value="Experienced"
                  checked={formData.candidateType === "Experienced"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      candidateType: "Experienced",
                    })
                  }
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 mr-2"
                />
                <span>Experienced</span>
              </label>
            </div>
          </div>

          {/* Conditional Field: Total Years of Experience */}
          {formData.candidateType === "Experienced" && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 animate-in fade-in duration-200">
              <label htmlFor="enquiry-total-experience" className="block text-xs font-semibold text-amber-900 mb-1">
                Total Years of Experience <span className="text-rose-500">*</span>
              </label>
              <select
                id="enquiry-total-experience"
                required
                value={formData.totalExperience}
                onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-amber-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="">Select Total Experience</option>
                <option value="Less than 1 Year">Less than 1 Year</option>
                <option value="1 – 2 Years">1 – 2 Years</option>
                <option value="2 – 4 Years">2 – 4 Years</option>
                <option value="4 – 6 Years">4 – 6 Years</option>
                <option value="6+ Years">6+ Years</option>
              </select>
            </div>
          )}

          {/* 6. Are You Interested in Changing Your Domain? */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              6. Are You Interested in Changing Your Domain? <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  formData.changingDomain === "Yes"
                    ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <input
                  type="radio"
                  name="changingDomain"
                  value="Yes"
                  checked={formData.changingDomain === "Yes"}
                  onChange={() => setFormData({ ...formData, changingDomain: "Yes" })}
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 mr-2"
                />
                <span>Yes</span>
              </label>

              <label
                className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  formData.changingDomain === "No"
                    ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <input
                  type="radio"
                  name="changingDomain"
                  value="No"
                  checked={formData.changingDomain === "No"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      changingDomain: "No",
                      interestedDomain: "",
                    })
                  }
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Conditional Field: Interested Domain */}
          {formData.changingDomain === "Yes" && (
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 animate-in fade-in duration-200">
              <label htmlFor="enquiry-interested-domain" className="block text-xs font-semibold text-blue-900 mb-1">
                Interested Domain <span className="text-rose-500">*</span>
              </label>
              <select
                id="enquiry-interested-domain"
                required
                value={formData.interestedDomain}
                onChange={(e) => setFormData({ ...formData, interestedDomain: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-blue-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
              >
                <option value="">Select Domain of Interest</option>
                <option value="Azure Data Engineering & GenAI">Azure Data Engineering & GenAI</option>
                <option value="Cloud Engineering & DevOps (AWS / Azure)">Cloud Engineering & DevOps (AWS / Azure)</option>
                <option value="Full Stack Web Development (React / Node / Next.js)">Full Stack Web Development (React / Node / Next.js)</option>
                <option value="Data Science & Artificial Intelligence (AI / ML)">Data Science & Artificial Intelligence (AI / ML)</option>
                <option value="Snowflake & Modern Data Warehousing">Snowflake & Modern Data Warehousing</option>
                <option value="Power BI & Data Analytics">Power BI & Data Analytics</option>
                <option value="SAP Practices (S/4HANA / ABAP / FICO)">SAP Practices (S/4HANA / ABAP / FICO)</option>
                <option value="Cybersecurity & Cloud Security">Cybersecurity & Cloud Security</option>
                <option value="Software Testing & QA Automation">Software Testing & QA Automation</option>
                <option value="Other Domain">Other Domain</option>
              </select>
            </div>
          )}

          {/* Preferred / Target Course */}
          <div>
            <label htmlFor="enquiry-target-course" className="block text-xs font-semibold text-slate-700 mb-1">
              Target Course / Program (Optional)
            </label>
            <select
              id="enquiry-target-course"
              value={formData.courseSlug}
              onChange={(e) => setFormData({ ...formData, courseSlug: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white transition"
            >
              {TRAINING_COURSES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} {c.isUpcoming ? " [🚀 Upcoming Batch]" : `(${c.duration})`}
                </option>
              ))}
            </select>
          </div>

          {/* Questions / Message */}
          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-semibold text-slate-700 mb-1">
              Specific Questions (Optional)
            </label>
            <textarea
              id="enquiry-message"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Ask about batch timings, fee structures, hands-on projects, or placement support..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer active:scale-[0.99]"
          >
            {status === "submitting" ? (
              <span>Submitting Enquiry...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
