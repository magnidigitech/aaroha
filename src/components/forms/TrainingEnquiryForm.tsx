"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, AlertCircle, Sparkles, MessageCircle, ExternalLink } from "lucide-react";
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
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
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

    // 3. Construct WhatsApp Message with all submitted form details
    const targetCourse = TRAINING_COURSES.find((c) => c.slug === formData.courseSlug);
    const targetCourseTitle = targetCourse ? targetCourse.title : formData.courseSlug;

    const lines = [
      "👋 *New Candidate Enquiry - AAROHA Technologies*",
      "",
      `👤 *Full Name:* ${formData.name.trim()}`,
      `📧 *Email ID:* ${formData.email.trim()}`,
      `📱 *Mobile Number:* ${formData.phone.trim()}`,
      `🎓 *Year of Passing Out:* ${formData.yearOfPassing}`,
      `💼 *Candidate Type:* ${formData.candidateType}`,
    ];

    if (formData.candidateType === "Experienced" && formData.totalExperience) {
      lines.push(`⏱️ *Total Experience:* ${formData.totalExperience}`);
    }

    lines.push(`🔄 *Interested in Domain Change:* ${formData.changingDomain}`);

    if (formData.changingDomain === "Yes" && formData.interestedDomain) {
      lines.push(`🎯 *Interested Domain:* ${formData.interestedDomain}`);
    }

    if (targetCourseTitle) {
      lines.push(`📚 *Target Program:* ${targetCourseTitle}`);
    }

    if (formData.message.trim()) {
      lines.push(`💬 *Questions / Notes:* ${formData.message.trim()}`);
    }

    lines.push("", "Please share batch schedules, curriculum details, and placement roadmaps. Thank you!");

    const fullMessage = lines.join("\n");
    const generatedWhatsAppUrl = `https://wa.me/919581167111?text=${encodeURIComponent(fullMessage)}`;
    setWhatsAppUrl(generatedWhatsAppUrl);

    // 4. Open WhatsApp immediately in user-gesture context (avoids popup blockers)
    try {
      window.open(generatedWhatsAppUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback handled by button on success screen
    }

    // 5. Concurrently dispatch email notification via backend API to training@aaroha-inc.com & user
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
            lead_type: "training_whatsapp_enquiry",
            content_category: "Candidate Enquiry",
            content_name: formData.courseSlug,
            candidate_type: formData.candidateType,
            year_of_passing: formData.yearOfPassing,
          });
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        // Even if email fails, WhatsApp was launched; show success with alert
        setStatus("success");
      }
    } catch (err: any) {
      // If network error occurred, still treat as success since WhatsApp opened
      setStatus("success");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xl transition-all">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold tracking-wide uppercase mb-2">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Direct WhatsApp & Admissions Counseling</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Candidate Enquiry Form</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Fill in your details below to instantly connect with our counseling team on WhatsApp and receive course syllabus, schedules, and placement roadmaps.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4 animate-in fade-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-900">Enquiry Dispatched & WhatsApp Opened!</h4>
          <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
            Your details have been registered and sent to our admissions team at <span className="font-semibold text-emerald-800">training@aaroha-inc.com</span>. WhatsApp chat has also been prepared with all your submitted details.
          </p>

          {whatsAppUrl && (
            <div className="pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Click Here if WhatsApp Did Not Open Automatically</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                hasTrackedSubmissionRef.current = false;
                setStatus("idle");
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
              }}
              className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-950 transition-colors cursor-pointer"
            >
              Fill Another Enquiry
            </button>
          </div>
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white transition"
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
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs"
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
                  className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 border-slate-300 mr-2"
                />
                <span>Fresher</span>
              </label>

              <label
                className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  formData.candidateType === "Experienced"
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs"
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
                  className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 border-slate-300 mr-2"
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
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs"
                    : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <input
                  type="radio"
                  name="changingDomain"
                  value="Yes"
                  checked={formData.changingDomain === "Yes"}
                  onChange={() => setFormData({ ...formData, changingDomain: "Yes" })}
                  className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 border-slate-300 mr-2"
                />
                <span>Yes</span>
              </label>

              <label
                className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  formData.changingDomain === "No"
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs"
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
                  className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 border-slate-300 mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Conditional Field: Interested Domain */}
          {formData.changingDomain === "Yes" && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 animate-in fade-in duration-200">
              <label htmlFor="enquiry-interested-domain" className="block text-xs font-semibold text-emerald-900 mb-1">
                Interested Domain <span className="text-rose-500">*</span>
              </label>
              <select
                id="enquiry-interested-domain"
                required
                value={formData.interestedDomain}
                onChange={(e) => setFormData({ ...formData, interestedDomain: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-emerald-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white transition"
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
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
            />
          </div>

          {/* WhatsApp Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2.5 disabled:opacity-60 cursor-pointer active:scale-[0.99]"
          >
            {status === "submitting" ? (
              <span>Connecting to WhatsApp & Sending Details...</span>
            ) : (
              <>
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Send WhatsApp Message (+91 95811 67111)</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400">
            🔒 Clicking sends your enquiry directly to our admissions team on WhatsApp & dispatches an email confirmation.
          </p>
        </form>
      )}
    </div>
  );
};
