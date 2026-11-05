"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CrmLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/crm/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      router.push(data.redirectTo || "/crm/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-xs mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              A
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            AAROHA Lead CRM
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-normal">
            Sign in with your enterprise credentials
          </p>
        </div>

        {/* Apple Style Login Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-3xl p-7 sm:p-9 transition-all">
          {error && (
            <div className="mb-5 bg-rose-50/80 border border-rose-200/70 text-rose-700 text-xs py-3 px-3.5 rounded-xl flex items-start space-x-2.5">
              <span className="font-semibold shrink-0 mt-0.5">Note:</span>
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Work Email
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4 stroke-[1.75]" />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@aaroha-inc.com"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 stroke-[1.75]" />
                </div>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black active:scale-[0.99] text-white font-medium text-sm shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.75]" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 stroke-[1.75]" />
            <span>End-to-end encrypted CRM session</span>
          </div>
        </div>

        {/* Sub-footer */}
        <p className="mt-6 text-center text-xs text-slate-400 font-normal">
          AAROHA Technologies &bull; Powered by J2D Technologies
        </p>
      </div>
    </div>
  );
}
