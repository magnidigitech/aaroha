import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { TRAINING_COURSES } from "@/data/training";

export const TrainingTeaserSection: React.FC = () => {
  const featuredCourses = TRAINING_COURSES.slice(0, 4);

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50/80 border border-slate-200 rounded-3xl p-8 sm:p-12 text-slate-900 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4 mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Technology Training & Career Programs</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Looking to advance your tech career or upskill your team?
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              We offer career-focused programs in Azure Data Engineering, Data Science, Python Full Stack, SAP, and Generative AI — supported by the project-oriented AAROHA Program and 360° placement assistance.
            </p>
          </div>

          {/* Quick Course Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {featuredCourses.map((c) => (
              <div
                key={c.slug}
                className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {c.duration}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">{c.title}</h4>
                </div>
                <Link
                  href={`/training/${c.slug}`}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center transition-colors"
                >
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-slate-200 gap-4">
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>5-Step AAROHA Program</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>360° Placement Assistance</span>
              </span>
            </div>

            <Link
              href="/training"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
            >
              <span>Explore All {TRAINING_COURSES.length} Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
