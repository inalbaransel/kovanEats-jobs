"use client";

import { useState } from "react";
import { Job } from "@/lib/data";

export default function ApplicationForm({ job }: { job: Job }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      jobSlug: job.slug,
      jobTitle: job.title,
      name: formData.get("name"),
      email: formData.get("email"),
      portfolio: formData.get("portfolio"),
      customQuestion: formData.get("customQuestion"),
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Özür dileriz, bir hata oluştu.");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Bilinmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-3xl text-center border border-green-100 flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">Başvurunuz Alındı!</h3>
        <p className="font-medium opacity-90">Teşekkürler, başvurunuz kovanımıza ulaştı. Sıkı durun, sizinle en kısa sürede iletişime geçeceğiz.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border text-left border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

      <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-8">Başvuru Formu</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-neutral-700">Ad Soyad</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              placeholder="Ahmet Yılmaz"
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">E-Posta</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              placeholder="ahmet@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="portfolio" className="block text-sm font-semibold text-neutral-700">Portfolyo / LinkedIn / Web Sitesi</label>
          <input 
            type="url" 
            id="portfolio" 
            name="portfolio" 
            required
            placeholder="https://linkedin.com/in/ahmetyilmaz"
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="customQuestion" className="block text-sm font-semibold text-neutral-700">
            {job.customQuestionLabel}
          </label>
          <textarea 
            id="customQuestion" 
            name="customQuestion" 
            required
            rows={3}
            placeholder={job.customQuestionPlaceholder}
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 resize-y"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-neutral-900 hover:bg-black text-white px-8 py-4.5 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center text-lg mt-4 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <span className="flex items-center gap-2">
               <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Gönderiliyor...
            </span>
          ) : "Başvurumu Tamamla"}
        </button>
      </form>
    </div>
  );
}
