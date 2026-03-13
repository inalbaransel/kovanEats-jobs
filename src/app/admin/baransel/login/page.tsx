"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-neutral-200 rounded-2xl mb-5 shadow-sm">
            <span className="text-2xl">🐝</span>
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">KovanEats Admin</h1>
          <p className="text-neutral-400 text-sm mt-1.5 font-medium">Sadece yetkili kişiler erişebilir.</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-neutral-600 font-semibold block">E-Posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kovaneats.com"
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-600 font-semibold block">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-95 disabled:opacity-50 mt-2 shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Giriş Yapılıyor...
                </span>
              ) : "Giriş Yap"}
            </button>
          </form>
        </div>

        <p className="text-center text-neutral-400 text-xs mt-6">
          © 2026 KovanEats · Developed by Baransel
        </p>
      </div>
    </div>
  );
}
