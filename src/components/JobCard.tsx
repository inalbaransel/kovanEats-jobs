import Link from "next/link";
import { Job } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="group relative bg-white border border-neutral-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-3xl p-8 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 hover:border-neutral-300/80 transition-all duration-500 flex flex-col justify-between min-h-[340px] h-full overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-linear-to-br from-neutral-100 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-3">
        <h2 className="text-[26px] md:text-[24px] leading-tight font-extrabold tracking-tight text-neutral-900 group-hover:text-black transition-colors line-clamp-4">
          {job.title}
        </h2>
        <p className="text-neutral-500 font-medium leading-relaxed pr-2 text-base">
          {job.subtitle}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-4 flex items-center justify-between border-t border-neutral-100/80 group-hover:border-neutral-200 transition-colors duration-500">
        <Link 
          href={`/${job.slug}`}
          className="inline-flex items-center gap-2 text-[16px] font-bold text-neutral-800 hover:text-black hover:gap-3 transition-all"
        >
          Detayları İncele <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
