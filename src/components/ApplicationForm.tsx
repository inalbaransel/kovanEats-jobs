"use client";

import { useState } from "react";
import { Job } from "@/lib/data";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ApplicationForm({ job }: { job: Job }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setError("Lütfen bot olmadığınızı doğrulayın.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      jobSlug: job.slug,
      jobTitle: job.title,
      name: formData.get("name"),
      email: formData.get("email"),
      portfolio: formData.get("portfolio"),
      answers,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Özür dileriz, bir hata oluştu.");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setAnswers({});
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-xl w-full flex flex-col items-center p-6 md:p-12 text-center animate-in fade-in zoom-in-95 duration-1000">
          {/* Animated Checkmark Container */}
          <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700" />
            <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_-8px_rgba(34,197,94,0.5)]">
              <svg
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M5 13l4 4L19 7"
                  className="animate-[check_0.8s_cubic-bezier(0.65,0,0.45,1)_forwards]"
                  style={{
                    strokeDasharray: 50,
                    strokeDashoffset: 50,
                  }}
                />
              </svg>
            </div>
          </div>

          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6 px-4">
            Başvurunuz Kovanımıza Düştü!
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-sm mx-auto leading-relaxed text-lg px-4">
            Harika bir adım attın. Başvurun elimize ulaştı, ekibimiz heyecanla
            incelemeye başlıyor. Seninle en kısa sürede iletişime geçeceğiz.
            <span className="block mt-4 text-neutral-900 dark:text-white font-bold">Mail kutunu sık sık kontrol etmeyi unutma!</span>
          </p>

          <div className="mt-12">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-bold hover:bg-black dark:hover:bg-neutral-200 hover:scale-105 transition-all shadow-lg active:scale-95 uppercase tracking-widest flex items-center gap-2"
            >
              ← Ana Sayfaya Dön
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes check {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border text-left border-neutral-200 dark:border-neutral-700 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 dark:bg-neutral-800 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

      <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
        Başvuru Formu
      </h3>

      {error && (
        <div className="bg-red-50 dark:bg-red-950 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 dark:border-red-900 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              Ad Soyad
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Ahmet Yılmaz"
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent transition-all bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              E-Posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="ahmet@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent transition-all bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="portfolio"
            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
          >
            Portfolyo / LinkedIn / Web Sitesi
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            required
            placeholder="https://linkedin.com/in/ahmetyilmaz"
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent transition-all bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
          />
        </div>

        {/* Divider */}
        {job.customQuestions.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-neutral-100 dark:bg-neutral-700" />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Pozisyona Özel Sorular
              </span>
              <div className="h-px flex-1 bg-neutral-100 dark:bg-neutral-700" />
            </div>

            <div className="space-y-6">
              {job.customQuestions.map((q, index) => (
                <div key={q.id} className="space-y-2">
                  <label
                    htmlFor={q.id}
                    className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold mr-2">
                      {index + 1}
                    </span>
                    {q.label}
                  </label>
                  <textarea
                    id={q.id}
                    name={q.id}
                    required
                    rows={3}
                    placeholder={q.placeholder}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent transition-all bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-y"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center py-2">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ""}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center text-lg mt-4 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Kovana Gönderiliyor...
            </span>
          ) : (
            "Başvurumu Tamamla"
          )}
        </button>
      </form>
    </div>
  );
}
