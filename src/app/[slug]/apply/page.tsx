import { notFound } from "next/navigation";
import { getJobBySlug, jobs } from "@/lib/data";
import ApplicationForm from "@/components/ApplicationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export default async function JobApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col w-full py-12 md:py-20 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-neutral-200/50 blur-[100px] rounded-[100%] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-6 w-full">
        {/* Top Navigation */}
        <Link 
           href={`/${job.slug}`} 
           className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> İlana Geri Dön ({job.title})
        </Link>
        
        {/* Form Title area */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-bold tracking-wider text-neutral-600 mb-4 uppercase">
            Başvuru
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-neutral-900 mb-4">
            Bir Adım Kaldı
          </h2>
          <p className="text-neutral-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">
            Kovanımıza katılma şansını yakalamak için aşağıdaki formu doldur. Uzun ve çok soru olacak dedin, yerini ayırdık.
          </p>
        </div>

        {/* The Form Component Itself */}
        <ApplicationForm job={job} />
      </div>
    </div>
  );
}
