"use client";

import { Job } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import ApplicationForm from "./ApplicationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function JobApplyContent({ job }: { job: Job }) {
  const { lang, t } = useLanguage();
  const title = lang === "EN" ? job.en.title : job.title;

  return (
    <div className="flex-1 flex flex-col w-full py-12 md:py-20 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-neutral-200/50 blur-[100px] rounded-[100%] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-6 w-full">
        {/* Top Navigation */}
        <Link
          href={`/${job.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> {t.applyPage.backToJob(title)}
        </Link>

        {/* Form Title area */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold tracking-wider text-neutral-600 dark:text-neutral-300 mb-4 uppercase">
            {t.applyPage.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-neutral-900 dark:text-white mb-4">
            {t.applyPage.heading}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-xl mx-auto text-lg leading-relaxed">
            {t.applyPage.description}
          </p>
        </div>

        {/* The Form Component */}
        <ApplicationForm job={job} />
      </div>
    </div>
  );
}
