"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  Target,
  Sparkles,
  Share2,
  HelpCircle,
  CheckSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Calendar,
  Clock,
  Laptop,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Code2,
  Zap,
  Search,
  X,
} from "lucide-react";

interface TrainingRegistrationFormProps {
  initialProgram?: string;
}

interface ProgramOption {
  id: string;
  title: string;
  category: "Flagship" | "Cloud & Data" | "AI & GenAI" | "Database & Enterprise" | "Upcoming Tracks" | "General";
  icon: any;
  popular?: boolean;
  upcoming?: boolean;
}

const PROGRAM_OPTIONS: ProgramOption[] = [
  { id: "azure-genai", title: "Azure Data Engineer with GenAI & AI Agents", category: "Flagship", icon: Zap, popular: true },
  { id: "azure-de", title: "Azure Data Engineering", category: "Cloud & Data", icon: Code2, popular: true },
  { id: "data-science", title: "Data Science & Advanced AI", category: "Upcoming Tracks", icon: Sparkles, upcoming: true, popular: true },
  { id: "data-analytics", title: "Data Analytics & Business Intelligence", category: "Upcoming Tracks", icon: Briefcase, upcoming: true, popular: true },
  { id: "cyber-security", title: "Cyber Security & Defense Engineering", category: "Upcoming Tracks", icon: ShieldCheck, upcoming: true },
  { id: "quantum-computing", title: "Quantum Computing & Algorithms", category: "Upcoming Tracks", icon: Zap, upcoming: true },
  { id: "fde-engineering", title: "Forward Deployed Engineering (FDE)", category: "Upcoming Tracks", icon: Code2, upcoming: true },
  { id: "genai", title: "Generative AI", category: "AI & GenAI", icon: Zap, popular: true },
  { id: "ai-agents", title: "AI Agents", category: "AI & GenAI", icon: Sparkles },
  { id: "azure", title: "Microsoft Azure", category: "Cloud & Data", icon: Terminal },
  { id: "adf", title: "Azure Data Factory (ADF)", category: "Cloud & Data", icon: Briefcase },
  { id: "databricks", title: "Azure Databricks", category: "Cloud & Data", icon: Code2 },
  { id: "fabric", title: "Microsoft Fabric", category: "Cloud & Data", icon: Sparkles, popular: true },
  { id: "snowflake", title: "Snowflake", category: "Cloud & Data", icon: Terminal },
  { id: "python", title: "Python", category: "Cloud & Data", icon: Code2 },
  { id: "pyspark", title: "PySpark", category: "Cloud & Data", icon: Terminal },
  { id: "data-eng", title: "Data Engineering", category: "Cloud & Data", icon: Briefcase },
  { id: "oracle", title: "Oracle / Oracle Database", category: "Database & Enterprise", icon: Terminal },
  { id: "oracle-dba", title: "Oracle Apps DBA / EBS", category: "Database & Enterprise", icon: Briefcase },
  { id: "oci", title: "OCI – Oracle Cloud Infrastructure", category: "Database & Enterprise", icon: Terminal },
  { id: "other", title: "Other", category: "General", icon: HelpCircle },
];

const CATEGORY_FILTERS = ["All", "Upcoming Tracks", "Flagship", "Cloud & Data", "AI & GenAI", "Database & Enterprise"];

const INDIAN_STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Delhi NCR",
  "Kerala",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Other / International",
];

const POPULAR_SKILLS = [
  "SQL",
  "Python",
  "Azure",
  "ADF",
  "Databricks",
  "PySpark",
  "Snowflake",
  "Java",
  "Oracle",
  "Linux",
  "Power BI",
  "Excel",
  "Docker",
  "Git",
];

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Background", icon: GraduationCap },
  { id: 3, label: "Program", icon: BookOpen },
  { id: 4, label: "Goals", icon: Target },
  { id: 5, label: "Projects", icon: Briefcase },
  { id: 6, label: "Review", icon: CheckSquare },
];

export const TrainingRegistrationForm: React.FC<TrainingRegistrationFormProps> = ({ initialProgram }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [sameAsMobile, setSameAsMobile] = useState<boolean>(true);

  // Program Search & Category Filter state
  const [programSearchQuery, setProgramSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Multi-Select Selected Programs state
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(
    initialProgram ? [initialProgram] : ["Azure Data Engineer with GenAI & AI Agents"]
  );

  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    city: "",
    state: "Telangana",

    // Step 2: Professional / Educational Details
    currentStatus: "Student",
    highestQualification: "B.Tech / B.E.",
    specialization: "",
    totalExperience: "Fresher",
    jobTitle: "",
    company: "",

    // Step 3: Select Your Training Program
    trainingProgram: initialProgram || "Azure Data Engineer with GenAI & AI Agents",
    preferredMode: "Online",
    preferredBatchTiming: "Morning",
    preferredStartDate: "Immediately",

    // Step 4: Experience & Career Goals
    priorExperience: "Basic knowledge",
    primaryObjective: "Learn a new technology",
    currentSkills: "SQL, Python, Azure",
    expectedOutcome: "",

    // Step 5: Project & Practical Learning
    realTimeProjectInterest: "Yes",
    popInterest: "Yes",
    interviewPrepInterest: "Yes",
    placementAssistanceInterest: "Yes",
    hearAboutUs: "LinkedIn",
    referralCode: "",

    // Additional
    message: "",

    // Step 6: Consent
    consentAccurate: false,
    consentCommunication: false,
  });

  // Field-specific validation errors object
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorsFading, setErrorsFading] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Auto-dismiss field error highlights gracefully after 5 seconds (5000ms)
  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0) {
      setErrorsFading(false);
      const fadeTimer = setTimeout(() => {
        setErrorsFading(true);
      }, 4000);

      const clearTimer = setTimeout(() => {
        setFieldErrors({});
        setErrorsFading(false);
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [fieldErrors]);

  const updateFormData = (key: string, value: any) => {
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }

    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "mobileNumber" && sameAsMobile) {
        updated.whatsappNumber = value;
      }
      return updated;
    });
  };

  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsappNumber: prev.mobileNumber }));
    }
  };

  // Toggle multi-select program
  const toggleProgramSelection = (programTitle: string) => {
    if (fieldErrors.selectedPrograms) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.selectedPrograms;
        return next;
      });
    }

    let updated: string[];
    if (selectedPrograms.includes(programTitle)) {
      if (selectedPrograms.length === 1) {
        return;
      }
      updated = selectedPrograms.filter((p) => p !== programTitle);
    } else {
      updated = [...selectedPrograms, programTitle];
    }
    setSelectedPrograms(updated);
    updateFormData("trainingProgram", updated.join(", "));
  };

  // Filtered Programs for Live Search
  const filteredPrograms = useMemo(() => {
    return PROGRAM_OPTIONS.filter((prog) => {
      const matchesSearch =
        prog.title.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
        prog.category.toLowerCase().includes(programSearchQuery.toLowerCase());

      const matchesCategory = activeCategory === "All" || prog.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [programSearchQuery, activeCategory]);

  const toggleSkillTag = (skill: string) => {
    const current = formData.currentSkills
      ? formData.currentSkills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    if (current.includes(skill)) {
      const next = current.filter((s) => s !== skill);
      updateFormData("currentSkills", next.join(", "));
    } else {
      const next = [...current, skill];
      updateFormData("currentSkills", next.join(", "));
    }
  };

  // Step Validation & Soft Red Field Error Highlighting
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    let firstInvalidId: string | null = null;

    if (step === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = "Please enter your Full Name.";
        if (!firstInvalidId) firstInvalidId = "input-fullName";
      }
      if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
        errors.mobileNumber = "Please enter a valid 10-digit Mobile Number.";
        if (!firstInvalidId) firstInvalidId = "input-mobileNumber";
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        errors.email = "Please enter a valid Email Address.";
        if (!firstInvalidId) firstInvalidId = "input-email";
      }
      if (!formData.city.trim()) {
        errors.city = "Please enter your City.";
        if (!firstInvalidId) firstInvalidId = "input-city";
      }
    }

    if (step === 2) {
      if (!formData.currentStatus) {
        errors.currentStatus = "Please select your Current Status.";
        if (!firstInvalidId) firstInvalidId = "field-currentStatus";
      }
      if (!formData.highestQualification) {
        errors.highestQualification = "Please select your Highest Qualification.";
        if (!firstInvalidId) firstInvalidId = "field-highestQualification";
      }
    }

    if (step === 3) {
      if (!selectedPrograms.length) {
        errors.selectedPrograms = "Please select at least one Training Program.";
        if (!firstInvalidId) firstInvalidId = "field-selectedPrograms";
      }
      if (!formData.preferredMode) {
        errors.preferredMode = "Please select a Preferred Training Mode.";
        if (!firstInvalidId) firstInvalidId = "field-preferredMode";
      }
      if (!formData.preferredBatchTiming) {
        errors.preferredBatchTiming = "Please select a Batch Timing.";
        if (!firstInvalidId) firstInvalidId = "field-preferredBatchTiming";
      }
    }

    if (step === 4) {
      if (!formData.primaryObjective) {
        errors.primaryObjective = "Please select your Primary Objective.";
        if (!firstInvalidId) firstInvalidId = "field-primaryObjective";
      }
    }

    if (step === 5) {
      if (!formData.hearAboutUs) {
        errors.hearAboutUs = "Please select how you heard about us.";
        if (!firstInvalidId) firstInvalidId = "field-hearAboutUs";
      }
    }

    if (step === 6) {
      if (!formData.consentAccurate) {
        errors.consentAccurate = "Accuracy declaration consent is required.";
        if (!firstInvalidId) firstInvalidId = "field-consentAccurate";
      }
      if (!formData.consentCommunication) {
        errors.consentCommunication = "Communication consent is required.";
        if (!firstInvalidId) firstInvalidId = "field-consentCommunication";
      }
    }

    setFieldErrors(errors);

    // Auto-focus & smooth scroll to first invalid field
    if (firstInvalidId) {
      setTimeout(() => {
        const elem = document.getElementById(firstInvalidId!);
        if (elem) {
          elem.focus();
          elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 100, behavior: "smooth" });
      }
    }
  };

  const handlePrevStep = () => {
    setFieldErrors({});
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setStatus("submitting");

    const submissionPayload = {
      ...formData,
      trainingProgram: selectedPrograms.join(", "),
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        throw new Error(data.error || "Failed to submit registration. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setFieldErrors({ submit: err.message || "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all relative">
      {/* Dark Navy Flow Header */}
      <div className="bg-gradient-to-r from-[#050E2B] via-[#0A1F52] to-[#050E2B] p-4 sm:p-8 text-white relative">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
          <div>
            <h2 className="text-base sm:text-2xl font-black text-white leading-tight">
              AAROHA Technologies
            </h2>
            <p className="text-[11px] sm:text-xs text-blue-300 font-medium">
              Training & Career Registration Form
            </p>
          </div>
          <div className="shrink-0 bg-blue-500/20 border border-blue-400/30 px-3 py-1.5 rounded-full text-right">
            <span className="text-xs sm:text-sm font-extrabold text-white">
              Step {currentStep}<span className="text-blue-300 font-normal">/6</span>
            </span>
          </div>
        </div>

        {/* Scrollable Step Navigator */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-0.5 -mx-1 px-1 sm:grid sm:grid-cols-6 sm:gap-2.5 sm:mx-0 sm:px-0">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isDone = currentStep > s.id;
            const isActive = currentStep === s.id;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (s.id < currentStep || validateStep(currentStep)) {
                    setCurrentStep(s.id);
                  }
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all shrink-0 sm:shrink sm:flex-col sm:justify-center sm:space-x-0 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/40 ring-2 ring-blue-400/50"
                    : isDone
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-white/5 text-slate-400 border border-white/5"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                )}
                <span className="text-xs font-bold whitespace-nowrap sm:text-[11px] sm:truncate sm:mt-1">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {status === "success" ? (
        /* Success Screen */
        <div className="p-5 sm:p-14 text-center space-y-6 animate-in fade-in zoom-in-95 duration-400">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900">
              Thank you for registering with <span className="whitespace-nowrap">AAROHA Technologies</span>!
            </h3>
            <p className="text-sm sm:text-lg font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-3.5 sm:p-4 rounded-2xl">
              Your registration has been successfully received.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our team will review your details and contact you shortly regarding the selected program(s) (<strong>{selectedPrograms.join(", ")}</strong>), upcoming batch schedules, demo session links, and career opportunities.
            </p>
          </div>

          {/* Submission Recap Card */}
          <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-700">
            <div className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex justify-between items-center">
              <span>Registration Summary</span>
              <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">
                CONFIRMED
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div><span className="text-slate-500">Name:</span> <strong className="text-slate-900">{formData.fullName}</strong></div>
              <div><span className="text-slate-500">Mobile:</span> <strong className="text-slate-900">{formData.mobileNumber}</strong></div>
              <div><span className="text-slate-500">Email:</span> <strong className="text-slate-900">{formData.email}</strong></div>
              <div><span className="text-slate-500">Mode:</span> <strong className="text-slate-900">{formData.preferredMode} ({formData.preferredBatchTiming})</strong></div>
            </div>
          </div>

          {/* Official Branding Footer */}
          <div className="max-w-md mx-auto bg-[#050E2B] text-white p-5 rounded-2xl space-y-2 shadow-lg">
            <h4 className="text-base sm:text-lg font-black tracking-wide text-white">
              AAROHA Technologies
            </h4>
            <p className="text-[11px] sm:text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Elevate | Empower | Excel
            </p>
            <p className="text-xs text-slate-300">
              Website:{" "}
              <a
                href="https://www.aaroha-inc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 font-bold underline hover:text-white"
              >
                www.aaroha-inc.com
              </a>
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setCurrentStep(1);
                setFieldErrors({});
                setFormData((prev) => ({ ...prev, fullName: "", email: "", mobileNumber: "" }));
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Submit Another Registration</span>
            </button>
          </div>
        </div>
      ) : (
        /* Multi-Step Flow Form */
        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6 sm:space-y-8">

          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Step 1: Personal Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter your contact details so our team can reach you with program syllabus & batch info.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name Input Box */}
                <div className="sm:col-span-2">
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2 ${
                    fieldErrors.fullName && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <User className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.fullName && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>FULL NAME</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="input-fullName"
                      type="text"
                      required
                      autoFocus
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-700 ease-out ${
                        fieldErrors.fullName && !errorsFading
                          ? "border-rose-300 bg-rose-50/20 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          : "border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white"
                      }`}
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <p className={`text-[11px] font-semibold text-rose-600 mt-1 flex items-center space-x-1 transition-all duration-700 ease-out ${
                      errorsFading ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
                    }`}>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number Input Box */}
                <div>
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2 ${
                    fieldErrors.mobileNumber && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <Phone className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.mobileNumber && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>MOBILE NUMBER</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="input-mobileNumber"
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={(e) => updateFormData("mobileNumber", e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-700 ease-out ${
                        fieldErrors.mobileNumber && !errorsFading
                          ? "border-rose-300 bg-rose-50/20 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          : "border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white"
                      }`}
                    />
                  </div>
                  {fieldErrors.mobileNumber && (
                    <p className={`text-[11px] font-semibold text-rose-600 mt-1 flex items-center space-x-1 transition-all duration-700 ease-out ${
                      errorsFading ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
                    }`}>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{fieldErrors.mobileNumber}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp Number Input Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span>WHATSAPP NUMBER</span>
                    </div>
                    <label className="flex items-center space-x-1.5 text-[11px] text-blue-600 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                        className="accent-blue-600 rounded"
                      />
                      <span>Same as Mobile</span>
                    </label>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      disabled={sameAsMobile}
                      onChange={(e) => updateFormData("whatsappNumber", e.target.value.replace(/\D/g, ""))}
                      placeholder="WhatsApp number"
                      className="w-full pl-10 pr-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Email Address Input Box */}
                <div className="sm:col-span-2">
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2 ${
                    fieldErrors.email && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <Mail className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.email && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>EMAIL ADDRESS</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="input-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="your.email@domain.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-700 ease-out ${
                        fieldErrors.email && !errorsFading
                          ? "border-rose-300 bg-rose-50/20 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          : "border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white"
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className={`text-[11px] font-semibold text-rose-600 mt-1 flex items-center space-x-1 transition-all duration-700 ease-out ${
                      errorsFading ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
                    }`}>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* City Input Box */}
                <div>
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2 ${
                    fieldErrors.city && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <MapPin className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.city && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>CITY</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="input-city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="e.g. Hyderabad, Bangalore"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-700 ease-out ${
                        fieldErrors.city && !errorsFading
                          ? "border-rose-300 bg-rose-50/20 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          : "border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white"
                      }`}
                    />
                  </div>
                  {fieldErrors.city && (
                    <p className={`text-[11px] font-semibold text-rose-600 mt-1 flex items-center space-x-1 transition-all duration-700 ease-out ${
                      errorsFading ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
                    }`}>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{fieldErrors.city}</span>
                    </p>
                  )}
                </div>

                {/* State Select */}
                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>STATE</span>
                  </div>
                  <select
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white transition-all"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Background Details */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>Step 2: Educational & Professional Background</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your current status and experience so we can customize your training curriculum.
                </p>
              </div>

              {/* Current Status Cards */}
              <div id="field-currentStatus">
                <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-3 ${
                  fieldErrors.currentStatus && !errorsFading
                    ? "bg-rose-50/70 border-rose-200 text-rose-800"
                    : "bg-slate-100 border-slate-200 text-slate-900"
                }`}>
                  <User className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.currentStatus && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                  <span>CURRENT STATUS</span>
                  <span className="text-rose-500 font-bold">*</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Student", desc: "Currently pursuing degree" },
                    { label: "Recent Graduate", desc: "Passed out in last 0-2 yrs" },
                    { label: "Working Professional", desc: "Currently employed in IT/Non-IT" },
                    { label: "Career Transition", desc: "Switching to Data/AI domain" },
                    { label: "Looking for a Job", desc: "Actively seeking opportunities" },
                    { label: "Other", desc: "Custom background" },
                  ].map((item) => {
                    const isSelected = formData.currentStatus === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => updateFormData("currentStatus", item.label)}
                        className={`p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all duration-500 ease-out relative ${
                          isSelected
                            ? "border-2 border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-950 font-bold shadow-md shadow-blue-500/10"
                            : fieldErrors.currentStatus && !errorsFading
                            ? "border-rose-300 bg-rose-50/15 text-slate-900"
                            : "border-slate-200 hover:border-blue-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm font-black">{item.label}</span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-slate-100"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 block leading-tight">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Highest Qualification Cards */}
              <div id="field-highestQualification">
                <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-3 ${
                  fieldErrors.highestQualification && !errorsFading
                    ? "bg-rose-50/70 border-rose-200 text-rose-800"
                    : "bg-slate-100 border-slate-200 text-slate-900"
                }`}>
                  <GraduationCap className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.highestQualification && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                  <span>HIGHEST QUALIFICATION</span>
                  <span className="text-rose-500 font-bold">*</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["B.Tech / B.E.", "M.Tech / M.E.", "MCA", "B.Sc.", "M.Sc.", "MBA", "BCA", "Diploma", "Other"].map(
                    (qual) => {
                      const isSelected = formData.highestQualification === qual;
                      return (
                        <button
                          key={qual}
                          type="button"
                          onClick={() => updateFormData("highestQualification", qual)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-extrabold text-center transition-all duration-500 ease-out ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/30"
                              : fieldErrors.highestQualification && !errorsFading
                              ? "border-rose-300 bg-rose-50/15 text-slate-900"
                              : "border-slate-200 hover:border-blue-300 text-slate-800 bg-white"
                          }`}
                        >
                          {qual}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Specialization Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>SPECIALIZATION / BRANCH</span>
                  </div>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => updateFormData("specialization", e.target.value)}
                    placeholder="e.g. Computer Science, ECE, IT"
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Computer Science", "ECE", "IT", "Data Science", "Mechanical"].map((branch) => (
                      <button
                        key={branch}
                        type="button"
                        onClick={() => updateFormData("specialization", branch)}
                        className="text-[10px] font-bold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 px-2 py-0.5 rounded-md border border-slate-200 transition-colors"
                      >
                        + {branch}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total IT Experience */}
                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>TOTAL IT EXPERIENCE</span>
                  </div>
                  <select
                    value={formData.totalExperience}
                    onChange={(e) => updateFormData("totalExperience", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white transition-all"
                  >
                    {["Fresher", "Less than 1 Year", "1–3 Years", "3–5 Years", "5–8 Years", "8+ Years"].map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>CURRENT ROLE (IF WORKING)</span>
                  </div>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData("jobTitle", e.target.value)}
                    placeholder="e.g. Software Engineer, Analyst"
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>CURRENT COMPANY</span>
                  </div>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    placeholder="Company name (if applicable)"
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Program & Schedule with Live Search & Multi-Select */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Step 3: Select Training Program & Preferences</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Search & select one or multiple training programs, mode, and batch timings.
                </p>
              </div>

              {/* PROGRAM SELECTION SECTION */}
              <div id="field-selectedPrograms" className="space-y-4">
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border transition-all duration-500 ease-out ${
                  fieldErrors.selectedPrograms && !errorsFading
                    ? "bg-rose-50/60 border-rose-200"
                    : "bg-slate-100 border-slate-200"
                }`}>
                  <div className="flex items-center space-x-2">
                    <Zap className={`w-4 h-4 transition-colors duration-500 ${fieldErrors.selectedPrograms && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span className={`text-xs font-black uppercase tracking-wider ${fieldErrors.selectedPrograms && !errorsFading ? "text-rose-800" : "text-slate-900"}`}>
                      WHICH PROGRAM(S) ARE YOU INTERESTED IN?
                    </span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>

                  <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                    {selectedPrograms.length} Selected (Multi-Select Enabled)
                  </span>
                </div>

                {fieldErrors.selectedPrograms && (
                  <p className={`text-[11px] font-semibold text-rose-600 flex items-center space-x-1 transition-all duration-700 ease-out ${
                    errorsFading ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
                  }`}>
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{fieldErrors.selectedPrograms}</span>
                  </p>
                )}

                {/* Live Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={programSearchQuery}
                    onChange={(e) => setProgramSearchQuery(e.target.value)}
                    placeholder="Type to filter programs (e.g., Azure, AI, Python, Oracle, Databricks)..."
                    className="w-full pl-11 pr-10 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white shadow-sm"
                  />
                  {programSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setProgramSearchQuery("")}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                  {CATEGORY_FILTERS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Selected Programs Chips Display */}
                {selectedPrograms.length > 0 && (
                  <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 space-y-1.5">
                    <span className="text-[11px] font-extrabold uppercase text-blue-900 tracking-wider block">
                      Currently Selected Programs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPrograms.map((title) => (
                        <span
                          key={title}
                          className="inline-flex items-center space-x-1.5 bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-lg shadow-sm"
                        >
                          <span>{title}</span>
                          {selectedPrograms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => toggleProgramSelection(title)}
                              className="hover:bg-blue-700 rounded p-0.5"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Multi-Select Program Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((prog) => {
                      const isSelected = selectedPrograms.includes(prog.title);
                      const Icon = prog.icon;

                      return (
                        <button
                          key={prog.id}
                          type="button"
                          onClick={() => toggleProgramSelection(prog.title)}
                          className={`p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all duration-500 ease-out flex flex-col justify-between ${
                            isSelected
                              ? "border-2 border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50/60 ring-2 ring-blue-600/30 shadow-md scale-[1.01]"
                              : "border-slate-200 hover:border-blue-300 bg-white text-slate-800 shadow-sm"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="flex items-center space-x-1.5">
                              {prog.upcoming && (
                                <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                                  UPCOMING
                                </span>
                              )}
                              {prog.popular && !prog.upcoming && (
                                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                  POPULAR
                                </span>
                              )}
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                                  isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                          </div>

                          <div>
                            <span
                              className={`text-xs font-black block leading-snug ${
                                isSelected ? "text-blue-950" : "text-slate-900"
                              }`}
                            >
                              {prog.title}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">
                              {prog.category}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <p className="text-xs font-bold">No programs found matching &quot;{programSearchQuery}&quot;</p>
                      <button
                        type="button"
                        onClick={() => {
                          setProgramSearchQuery("");
                          setActiveCategory("All");
                        }}
                        className="mt-2 text-xs font-bold text-blue-600 underline"
                      >
                        Reset search filter
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Training Mode, Batch Timing, Start Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                {/* Training Mode Cards */}
                <div id="field-preferredMode">
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2.5 ${
                    fieldErrors.preferredMode && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <Laptop className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.preferredMode && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>TRAINING MODE</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="space-y-2">
                    {["Online", "Offline", "Hybrid"].map((mode) => {
                      const isSelected = formData.preferredMode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => updateFormData("preferredMode", mode)}
                          className={`w-full p-3 rounded-xl border text-xs font-black text-left flex items-center justify-between transition-all duration-500 ease-out ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-sm"
                              : fieldErrors.preferredMode && !errorsFading
                              ? "border-rose-300 bg-rose-50/15 text-slate-900"
                              : "border-slate-200 text-slate-700 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span>{mode} Training</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Batch Timing Cards */}
                <div id="field-preferredBatchTiming">
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2.5 ${
                    fieldErrors.preferredBatchTiming && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <Clock className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.preferredBatchTiming && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>BATCH TIMING</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="space-y-2">
                    {["Morning", "Afternoon", "Evening", "Weekend", "Flexible"].map((timing) => {
                      const isSelected = formData.preferredBatchTiming === timing;
                      return (
                        <button
                          key={timing}
                          type="button"
                          onClick={() => updateFormData("preferredBatchTiming", timing)}
                          className={`w-full p-2.5 rounded-xl border text-xs font-black text-left flex items-center justify-between transition-all duration-500 ease-out ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-sm"
                              : fieldErrors.preferredBatchTiming && !errorsFading
                              ? "border-rose-300 bg-rose-50/15 text-slate-900"
                              : "border-slate-200 text-slate-700 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span>{timing} Batch</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Start Date Cards */}
                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>PREFERRED START DATE</span>
                  </div>
                  <div className="space-y-2">
                    {["Immediately", "Within 1 Week", "Within 2 Weeks", "Within 1 Month", "Later"].map((startDate) => {
                      const isSelected = formData.preferredStartDate === startDate;
                      return (
                        <button
                          key={startDate}
                          type="button"
                          onClick={() => updateFormData("preferredStartDate", startDate)}
                          className={`w-full p-2.5 rounded-xl border text-xs font-black text-left flex items-center justify-between transition-all duration-500 ease-out ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-sm"
                              : "border-slate-200 text-slate-700 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span>{startDate}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Experience & Goals */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Step 4: Experience & Career Goals</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tell us about your tech background and primary learning objectives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Prior Tech Experience */}
                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>PRIOR TECH EXPERIENCE</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      "No experience",
                      "Basic knowledge",
                      "Academic experience",
                      "Project experience",
                      "Professional experience",
                    ].map((exp) => {
                      const isSelected = formData.priorExperience === exp;
                      return (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => updateFormData("priorExperience", exp)}
                          className={`w-full p-2.5 rounded-xl border text-xs font-black text-left flex items-center justify-between transition-all duration-500 ease-out ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-sm"
                              : "border-slate-200 text-slate-700 bg-white"
                          }`}
                        >
                          <span>{exp}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Objective */}
                <div id="field-primaryObjective">
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2.5 ${
                    fieldErrors.primaryObjective && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <Target className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.primaryObjective && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>PRIMARY OBJECTIVE</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Learn a new technology",
                      "Upgrade existing skills",
                      "Career transition",
                      "Get interview ready",
                      "Get project experience",
                      "Prepare for a new job",
                      "Improve current career prospects",
                      "Other",
                    ].map((obj) => {
                      const isSelected = formData.primaryObjective === obj;
                      return (
                        <button
                          key={obj}
                          type="button"
                          onClick={() => updateFormData("primaryObjective", obj)}
                          className={`w-full p-2 rounded-xl border text-xs font-black text-left flex items-center justify-between transition-all duration-500 ease-out ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-sm"
                              : fieldErrors.primaryObjective && !errorsFading
                              ? "border-rose-300 bg-rose-50/15 text-slate-900"
                              : "border-slate-200 text-slate-700 bg-white"
                          }`}
                        >
                          <span>{obj}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Current Known Skills Tag Picker */}
                <div className="sm:col-span-2 pt-1">
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-600" />
                    <span>CURRENT KNOWN SKILLS / TECHNOLOGIES</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Click tags below or type your current tech stack:
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {POPULAR_SKILLS.map((skill) => {
                      const isSelected = formData.currentSkills
                        .split(",")
                        .map((s) => s.trim())
                        .includes(skill);

                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkillTag(skill)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                          }`}
                        >
                          {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={formData.currentSkills}
                    onChange={(e) => updateFormData("currentSkills", e.target.value)}
                    placeholder='e.g. "SQL, Python, Azure, ADF, Java, Oracle, Linux"'
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>

                {/* Expected Career Outcome */}
                <div className="sm:col-span-2">
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>EXPECTED CAREER OUTCOME</span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.expectedOutcome}
                    onChange={(e) => updateFormData("expectedOutcome", e.target.value)}
                    placeholder="Tell us briefly what career transition, role, or project experience you expect from this program..."
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Projects & Source */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span>Step 5: Project & Practical Learning Options</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure real-time project labs, interview preparation, and referral details.
                </p>
              </div>

              {/* Practical Learning Preference Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl sm:rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide block">
                    Real-Time Project Experience
                  </span>
                  <div className="flex gap-2">
                    {["Yes", "No", "Maybe"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData("realTimeProjectInterest", opt)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                          formData.realTimeProjectInterest === opt
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl sm:rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide block">
                    Project Oriented Program (POP)
                  </span>
                  <div className="flex gap-2">
                    {["Yes", "No", "Need info"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData("popInterest", opt)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                          formData.popInterest === opt
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl sm:rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide block">
                    Interview Preparation & Support
                  </span>
                  <div className="flex gap-2">
                    {["Yes", "No"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData("interviewPrepInterest", opt)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                          formData.interviewPrepInterest === opt
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl sm:rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide block">
                    Placement Assistance Info
                  </span>
                  <div className="flex gap-2">
                    {["Yes", "No"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData("placementAssistanceInterest", opt)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                          formData.placementAssistanceInterest === opt
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* How Did You Hear About Us? */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div id="field-hearAboutUs">
                  <div className={`inline-flex items-center space-x-2 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-md border transition-all duration-500 ease-out mb-2 ${
                    fieldErrors.hearAboutUs && !errorsFading
                      ? "bg-rose-50/70 border-rose-200 text-rose-800"
                      : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}>
                    <Share2 className={`w-3.5 h-3.5 transition-colors duration-500 ${fieldErrors.hearAboutUs && !errorsFading ? "text-rose-500" : "text-blue-600"}`} />
                    <span>HOW DID YOU HEAR ABOUT US?</span>
                    <span className="text-rose-500 font-bold">*</span>
                  </div>
                  <select
                    value={formData.hearAboutUs}
                    onChange={(e) => updateFormData("hearAboutUs", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white transition-all"
                  >
                    {[
                      "LinkedIn",
                      "Instagram",
                      "Facebook",
                      "YouTube",
                      "Google Search",
                      "WhatsApp",
                      "Friend / Referral",
                      "Website",
                      "Advertisement",
                      "Other",
                    ].map((src) => (
                      <option key={src} value={src}>
                        {src}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>REFERRAL NAME / CODE</span>
                  </div>
                  <input
                    type="text"
                    value={formData.referralCode}
                    onChange={(e) => updateFormData("referralCode", e.target.value)}
                    placeholder="Referral code (if applicable)"
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="inline-flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mb-2">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>MESSAGE / QUESTIONS</span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    placeholder="Ask any questions regarding course modules, demo session dates, project details, or fee structure..."
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Consent */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                  <span>Step 6: Review Registration & Consent</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Please review your selected details below before submitting.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Personal Summary */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-1">
                    <strong className="text-slate-900 font-bold flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>Personal Info</span>
                    </strong>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-blue-600 font-bold hover:underline text-[11px]"
                    >
                      Edit
                    </button>
                  </div>
                  <div><span className="text-slate-500">Name:</span> <strong className="text-slate-900">{formData.fullName}</strong></div>
                  <div><span className="text-slate-500">Mobile:</span> <strong className="text-slate-900">{formData.mobileNumber}</strong></div>
                  <div><span className="text-slate-500">Email:</span> <strong className="text-slate-900">{formData.email}</strong></div>
                  <div><span className="text-slate-500">Location:</span> <strong className="text-slate-900">{formData.city}, {formData.state}</strong></div>
                </div>

                {/* Program Summary */}
                <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200 space-y-1">
                  <div className="flex justify-between items-center border-b border-blue-200 pb-1 mb-1">
                    <strong className="text-blue-950 font-bold flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Selected Track ({selectedPrograms.length})</span>
                    </strong>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-blue-600 font-bold hover:underline text-[11px]"
                    >
                      Edit
                    </button>
                  </div>
                  <div><span className="text-slate-600">Programs:</span> <strong className="text-blue-900">{selectedPrograms.join(", ")}</strong></div>
                  <div><span className="text-slate-600">Mode:</span> <strong className="text-slate-900">{formData.preferredMode}</strong></div>
                  <div><span className="text-slate-600">Batch Timing:</span> <strong className="text-slate-900">{formData.preferredBatchTiming}</strong></div>
                  <div><span className="text-slate-600">Start Date:</span> <strong className="text-slate-900">{formData.preferredStartDate}</strong></div>
                </div>

                {/* Background Summary */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-1">
                    <strong className="text-slate-900 font-bold flex items-center space-x-1">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Background</span>
                    </strong>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-blue-600 font-bold hover:underline text-[11px]"
                    >
                      Edit
                    </button>
                  </div>
                  <div><span className="text-slate-500">Status:</span> <strong className="text-slate-900">{formData.currentStatus}</strong></div>
                  <div><span className="text-slate-500">Degree:</span> <strong className="text-slate-900">{formData.highestQualification}</strong></div>
                  <div><span className="text-slate-500">Experience:</span> <strong className="text-slate-900">{formData.totalExperience}</strong></div>
                </div>

                {/* Goals Summary */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-1">
                    <strong className="text-slate-900 font-bold flex items-center space-x-1">
                      <Target className="w-3.5 h-3.5 text-blue-600" />
                      <span>Goals & Support</span>
                    </strong>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="text-blue-600 font-bold hover:underline text-[11px]"
                    >
                      Edit
                    </button>
                  </div>
                  <div><span className="text-slate-500">Objective:</span> <strong className="text-slate-900">{formData.primaryObjective}</strong></div>
                  <div><span className="text-slate-500">Project Lab:</span> <strong className="text-slate-900">{formData.realTimeProjectInterest}</strong></div>
                  <div><span className="text-slate-500">Placement Info:</span> <strong className="text-slate-900">{formData.placementAssistanceInterest}</strong></div>
                </div>
              </div>

              {/* Consent Section */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label id="field-consentAccurate" className={`flex items-start space-x-2.5 cursor-pointer text-xs font-medium leading-relaxed p-2 rounded-lg transition-all duration-500 ease-out ${
                  fieldErrors.consentAccurate && !errorsFading ? "bg-rose-50/60 text-rose-950 font-bold border border-rose-200" : "text-slate-700"
                }`}>
                  <input
                    type="checkbox"
                    required
                    checked={formData.consentAccurate}
                    onChange={(e) => updateFormData("consentAccurate", e.target.checked)}
                    className="accent-blue-600 w-4 h-4 mt-0.5 rounded shrink-0"
                  />
                  <span>
                    I confirm that the information provided by me is accurate and I agree to be contacted by AAROHA Technologies regarding training programs, demos, career programs, and related services. <span className="text-rose-500">*</span>
                  </span>
                </label>

                <label id="field-consentCommunication" className={`flex items-start space-x-2.5 cursor-pointer text-xs font-medium leading-relaxed p-2 rounded-lg transition-all duration-500 ease-out ${
                  fieldErrors.consentCommunication && !errorsFading ? "bg-rose-50/60 text-rose-950 font-bold border border-rose-200" : "text-slate-700"
                }`}>
                  <input
                    type="checkbox"
                    required
                    checked={formData.consentCommunication}
                    onChange={(e) => updateFormData("consentCommunication", e.target.checked)}
                    className="accent-blue-600 w-4 h-4 mt-0.5 rounded shrink-0"
                  />
                  <span>
                    I agree to receive communication through phone, WhatsApp, SMS, or email regarding my enquiry. <span className="text-rose-500">*</span>
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP CONTROLS (Back / Next / Submit) */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 sm:px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-all shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 sm:flex-initial justify-center px-5 sm:px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer whitespace-nowrap"
              >
                <span className="sm:hidden">Step {currentStep + 1} &rarr;</span>
                <span className="hidden sm:inline">Continue to Step {currentStep + 1} &rarr;</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex-1 sm:flex-initial justify-center px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs sm:text-base flex items-center space-x-2 transition-all shadow-lg shadow-blue-600/40 disabled:opacity-50 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>SUBMIT / REGISTER NOW</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
