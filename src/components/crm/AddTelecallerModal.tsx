"use client";

import React, { useState } from "react";
import { UserPlus, X, Lock, Mail, User, Shield } from "lucide-react";

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
        body: JSON.stringify({ name, email, password, role }),
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Staff / Telecaller Account</h3>
              <p className="text-xs text-slate-500">Provide login credentials for your team</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Staff Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Ananya Rao"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@aaroha-inc.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Login Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              System Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "TELECALLER" | "ADMIN")}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-semibold"
            >
              <option value="TELECALLER">Telecaller (Assigned leads only)</option>
              <option value="ADMIN">CRM Administrator (Full permissions)</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/30 flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? "Creating..." : "Create Account"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
