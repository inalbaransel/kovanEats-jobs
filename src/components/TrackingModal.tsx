"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Key,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

interface Application {
  id: string;
  jobTitle: string;
  status: "pending" | "review" | "rejected" | "accepted";
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  review: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  accepted: "text-green-500 bg-green-500/10 border-green-500/20",
  rejected: "text-red-500 bg-red-500/10 border-red-500/20",
};

const ModalOverlay = memo(function ModalOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-md"
    />
  );
});

export default function TrackingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setCode("");
        setError("");
        setApps([]);
      }, 300);
    }
  }, [isOpen]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.replace(/\D/g, ""));
  }, []);

  const handleSendCode = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/track/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t.track.error);
      }
      setStep(2);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.track.error);
    } finally {
      setLoading(false);
    }
  }, [email, t.track.error]);

  const handleVerifyCode = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/track/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t.track.invalidCode);
      }
      if (data.applications.length === 0) {
        setError(t.track.noApps);
      } else {
        setApps(data.applications);
        setStep(3);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.track.invalidCode);
    } finally {
      setLoading(false);
    }
  }, [email, code, t.track.invalidCode, t.track.noApps]);

  const stepTransition = { duration: 0.15 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <ModalOverlay onClose={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] shadow-2xl shadow-neutral-900/10 dark:shadow-black/40"
            style={{
              background: isDark ? "rgba(18,18,18,0.88)" : "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px) saturate(1.8)",
              WebkitBackdropFilter: "blur(20px) saturate(1.8)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.65)",
            }}
          >
            <div className="p-8 w-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white border border-neutral-200/60 dark:border-none shadow-sm flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-neutral-900" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {t.track.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={stepTransition}
                    onSubmit={handleSendCode}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 ml-1">
                        {t.track.emailLabel}
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={handleEmailChange}
                          placeholder={t.track.emailPlaceholder}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/60 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800 focus:outline-none focus:bg-white dark:focus:bg-neutral-900 focus:ring-4 focus:ring-neutral-900/5 dark:focus:ring-white/10 dark:focus:border-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-neutral-900/20 dark:hover:shadow-white/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        t.track.sendCode
                      )}
                    </button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={stepTransition}
                    onSubmit={handleVerifyCode}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 ml-1">
                        {t.track.enterCode}
                      </label>
                      <div className="relative group">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={code}
                          onChange={handleCodeChange}
                          placeholder={t.track.codePlaceholder}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/60 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800 focus:outline-none focus:bg-white dark:focus:bg-neutral-900 focus:ring-4 focus:ring-neutral-900/5 dark:focus:ring-white/10 dark:focus:border-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all text-neutral-900 dark:text-white tracking-[0.5em] font-mono text-xl placeholder:text-neutral-400 placeholder:tracking-normal"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 border border-neutral-200 dark:border-neutral-700 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-neutral-600 dark:text-neutral-400"
                      >
                        {t.track.back}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-2 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-neutral-900/20 dark:hover:shadow-white/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          t.track.verify
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={stepTransition}
                    className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
                  >
                    <p className="text-sm text-neutral-500 mb-4">
                      {t.track.success}
                    </p>
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className="p-5 rounded-2xl border border-white/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 shadow-sm space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-bold text-neutral-900 dark:text-white leading-tight">
                            {app.jobTitle}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-wider shrink-0 ${STATUS_COLORS[app.status] ?? "text-neutral-500 bg-neutral-500/10 border-neutral-500/20"}`}
                          >
                            {t.track.status[app.status as keyof typeof t.track.status]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
