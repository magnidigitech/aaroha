"use client";

import React, { useState } from "react";
import { UserPlus, X, Lock, Mail, User, ShieldCheck } from "lucide-react";

interface AddTelecallerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddTelecallerModal: React.FC<AddTelecallerModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"TELECALLER" | "ADMIN">("TELECALLER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/crm/telecallers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create account");
      }

      onSuccess();
      onClose();
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <UserPlus className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">Add Team Member</h3>
              <p className="text-xs text-slate-500 font-normal">Create login for telecaller or administrator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {error && (
          <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 text-xs py-2.5 px-3.5 rounded-xl flex items-center space-x-2">
            <span className="font-semibold">Error:</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Ananya Rao"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-sm font-normal"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 stroke-[1.75]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Work Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@aaroha-inc.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-sm font-normal"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 stroke-[1.75]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Login Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-sm font-normal"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 stroke-[1.75]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Role & Permissions
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "TELECALLER" | "ADMIN")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-xs font-medium"
            >
              <option value="TELECALLER">Telecaller (Assigned leads only)</option>
              <option value="ADMIN">CRM Administrator (Full portal access)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black active:scale-[0.98] text-white font-medium shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{loading ? "Creating..." : "Create Account"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
