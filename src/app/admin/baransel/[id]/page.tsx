"use client";

import { use, useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Application = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  portfolio: string;
  answers: Record<string, string>;
  createdAt: { seconds: number } | null;
  status: "pending" | "approved" | "rejected";
  read: boolean;
};

export default function ApplicantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<"approve" | "reject" | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error" | "warn"; msg: string } | null>(null);
  const router = useRouter();

  const showToast = (type: "success" | "error" | "warn", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    const fetchAndMarkRead = async () => {
      const docRef = doc(db, "applications", id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        router.replace("/admin/baransel");
        return;
      }
      const data = { id: snap.id, ...snap.data() } as Application;
      setApp(data);
      setLoading(false);
      if (!data.read) {
        await updateDoc(docRef, { read: true });
      }
    };
    fetchAndMarkRead();
  }, [id, router]);

  const handleAction = async (action: "approve" | "reject") => {
    if (!app) return;
    setActionLoading(action);
    try {
      const endpoint = action === "approve" ? "/api/admin/approve" : "/api/admin/reject";
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        showToast("error", "Oturum bilgisi alınamadı. Lütfen tekrar giriş yapın.");
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id: app.id, name: app.name, email: app.email, jobTitle: app.jobTitle }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", `İşlem başarısız: ${data.error}`);
        return;
      }
      setApp((prev) => prev ? { ...prev, status: action === "approve" ? "approved" : "rejected" } : prev);
      if (data.emailSent) {
        showToast("success", `${action === "approve" ? "Onay" : "Red"} maili ${app.email} adresine gönderildi.`);
      } else {
        showToast("warn", `Durum güncellendi fakat mail gönderilemedi. Resend domain doğrulaması gerekebilir.\n${data.emailError ? String(data.emailError) : ""}`);
      }
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (ts: { seconds: number } | null) => {
    if (!ts) return "—";
    return new Date(ts.seconds * 1000).toLocaleDateString("tr-TR", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (!app) return null;

  const isPending = app.status === "pending";

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl border max-w-sm w-full text-sm font-medium animate-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" ? "bg-green-50 border-green-200 text-green-800" :
          toast.type === "warn" ? "bg-amber-50 border-amber-200 text-amber-800" :
          "bg-red-50 border-red-200 text-red-700"
        }`}>
          <span className="text-base mt-px shrink-0">
            {toast.type === "success" ? "✓" : toast.type === "warn" ? "⚠" : "✕"}
          </span>
          <span className="whitespace-pre-wrap">{toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-auto shrink-0 opacity-50 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/admin/baransel"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors bg-neutral-100 hover:bg-neutral-200 px-3 py-2 rounded-lg"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm Başvurular
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-sm font-semibold text-neutral-900 truncate">{app.name}</span>
          <div className="ml-auto">
            {app.status === "pending" && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">Beklemede</span>
            )}
            {app.status === "approved" && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-green-50 text-green-700 border-green-200">✓ Onaylandı</span>
            )}
            {app.status === "rejected" && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-red-50 text-red-600 border-red-200">✗ Reddedildi</span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left: Main Info */}
          <div className="md:col-span-2 space-y-5">
            {/* Hero Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-2xl font-black text-neutral-700 shrink-0 border border-neutral-200">
                  {app.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">{app.name}</h1>
                  <p className="text-sm text-neutral-500 font-medium">{app.jobTitle} adayı</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={`mailto:${app.email}`}
                  className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl p-3 hover:bg-neutral-100 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">E-Posta</p>
                    <p className="text-xs font-semibold text-neutral-900 truncate group-hover:underline">{app.email}</p>
                  </div>
                </a>

                {app.portfolio ? (
                  <a
                    href={app.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl p-3 hover:bg-neutral-100 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase">Portfolyo</p>
                      <p className="text-xs font-semibold text-neutral-900 truncate group-hover:underline">Linki Aç</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-100 rounded-xl p-3 opacity-40">
                    <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase">Portfolyo</p>
                      <p className="text-xs font-semibold text-neutral-400">Belirtilmedi</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Answers */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-neutral-900 mb-4">Pozisyona Özel Cevaplar</h2>
              <div className="space-y-4">
                {app.answers && Object.entries(app.answers).length > 0 ? (
                  Object.entries(app.answers).map(([, value], i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <p className="text-sm font-semibold text-neutral-700">Soru {i + 1}</p>
                      </div>
                      <div className="ml-7 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {value || <span className="text-neutral-400 italic">Boş bırakıldı</span>}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-neutral-400 italic">Cevap bulunmuyor.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4">
            {/* Meta */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Bilgiler</h3>
              <div className="space-y-3">
                {[
                  { label: "Başvuru Tarihi", value: formatDate(app.createdAt) },
                  { label: "Pozisyon", value: app.jobTitle },
                  { label: "Okunma", value: app.read ? "Okundu" : "Okunmadı" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">{item.label}</p>
                    <p className="text-sm font-semibold text-neutral-900 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            {isPending ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Karar Ver</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleAction("approve")}
                    disabled={actionLoading !== null}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 shadow-sm hover:shadow-md"
                  >
                    {actionLoading === "approve" ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        Onayla
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleAction("reject")}
                    disabled={actionLoading !== null}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-500 font-bold py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 border border-red-200 hover:border-red-300"
                  >
                    {actionLoading === "reject" ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        Reddet
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-neutral-400 mt-3 text-center leading-relaxed">
                  Aksiyon alındığında adaya otomatik mail gönderilir.
                </p>
              </div>
            ) : (
              <div className={`rounded-2xl p-5 border text-sm font-semibold text-center ${
                app.status === "approved"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}>
                {app.status === "approved" ? (
                  <><div className="text-2xl mb-2">✓</div>Onaylandı<br /><span className="text-xs font-normal opacity-70">Aday bilgilendirildi.</span></>
                ) : (
                  <><div className="text-2xl mb-2">✗</div>Reddedildi<br /><span className="text-xs font-normal opacity-70">Aday bilgilendirildi.</span></>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
