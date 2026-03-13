"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

type Application = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  createdAt: { seconds: number } | null;
  status: "pending" | "approved" | "rejected";
  read: boolean;
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Application[];
      setApplications(apps);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = applications.filter((a) => filter === "all" || a.status === filter);

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    unread: applications.filter((a) => !a.read).length,
  };

  const statusConfig = {
    pending: { label: "Beklemede", color: "bg-amber-50 text-amber-700 border-amber-200" },
    approved: { label: "Onaylandı", color: "bg-green-50 text-green-700 border-green-200" },
    rejected: { label: "Reddedildi", color: "bg-red-50 text-red-600 border-red-200" },
  };

  const formatDate = (ts: { seconds: number } | null) => {
    if (!ts) return "—";
    return new Date(ts.seconds * 1000).toLocaleDateString("tr-TR", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🐝</span>
          <div>
            <h1 className="text-sm font-bold text-neutral-900">KovanEats Admin</h1>
            <p className="text-xs text-neutral-400">Başvuru Yönetim Paneli</p>
          </div>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-neutral-100 border border-transparent hover:border-neutral-200"
        >
          Çıkış Yap
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Toplam", value: counts.all, border: "border-neutral-200", text: "text-neutral-900" },
            { label: "Beklemede", value: counts.pending, border: "border-amber-200", text: "text-amber-600" },
            { label: "Onaylananlar", value: counts.approved, border: "border-green-200", text: "text-green-600" },
            { label: "Reddedilenler", value: counts.rejected, border: "border-red-200", text: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className={`bg-white border ${stat.border} rounded-2xl p-5 shadow-sm`}>
              <p className={`text-3xl font-extrabold ${stat.text}`}>{stat.value}</p>
              <p className="text-xs text-neutral-400 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap items-center">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                filter === f
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {f === "all" ? "Tümü" : f === "pending" ? "Beklemede" : f === "approved" ? "Onaylananlar" : "Reddedilenler"}
              <span className="ml-1.5 opacity-60">({counts[f]})</span>
            </button>
          ))}
          {counts.unread > 0 && (
            <div className="ml-auto flex items-center gap-2 text-xs text-amber-600 font-bold">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {counts.unread} okunmamış
            </div>
          )}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-neutral-400 bg-white border border-neutral-200 rounded-2xl">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">Henüz başvuru yok.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((app) => {
              const status = statusConfig[app.status] || statusConfig.pending;
              return (
                <Link
                  key={app.id}
                  href={`/admin/baransel/${app.id}`}
                  className="flex items-center gap-4 p-4 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 rounded-2xl transition-all group shadow-sm"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${!app.read ? "bg-amber-500" : "bg-transparent"}`} />

                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-700 shrink-0 border border-neutral-200">
                    {app.name?.charAt(0).toUpperCase() || "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold text-sm truncate ${!app.read ? "text-neutral-900" : "text-neutral-600"}`}>
                        {app.name}
                      </p>
                      {!app.read && (
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full shrink-0">YENİ</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">{app.email} · {app.jobTitle}</p>
                  </div>

                  <p className="text-xs text-neutral-400 shrink-0 hidden md:block">{formatDate(app.createdAt)}</p>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${status.color}`}>
                    {status.label}
                  </span>

                  <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-600 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
