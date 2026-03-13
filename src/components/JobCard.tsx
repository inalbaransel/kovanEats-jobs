import Link from "next/link";
import { Job } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="group relative bg-white border border-neutral-200 rounded-3xl p-8 hover:shadow-2xl hover:border-neutral-300 transition-all duration-500 flex flex-col justify-between h-[320px] overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-neutral-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 group-hover:text-black transition-colors">{job.title}</h2>
        <p className="text-neutral-500 font-medium leading-relaxed">{job.subtitle}</p>
      </div>

      <div className="relative z-10 mt-auto pt-8 flex items-center justify-between border-t border-neutral-100">
        <Link 
          href={`/${job.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-black hover:gap-3 transition-all"
        >
          Pozisyonları Gör <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
