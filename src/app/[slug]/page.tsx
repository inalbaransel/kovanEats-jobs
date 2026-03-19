import { getJobBySlug, jobs } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Header Banner */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 py-20 px-6 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neutral-200/50 dark:bg-neutral-700/30 blur-[100px] rounded-[100%] pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-start relative z-10">
          <Link
             href="/"
             className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Tüm Pozisyonlara Dön
          </Link>
          <div className="inline-block px-3 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold tracking-wider text-neutral-600 dark:text-neutral-300 mb-6 uppercase">
            {job.title} Departmanı
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-neutral-900 dark:text-white mb-6">
            {job.title} Rolü
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
            {job.description}
          </p>
          <div className="mt-10">
            <Link
              href={`/${job.slug}/apply`}
              className="inline-flex items-center justify-center bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-black dark:hover:bg-neutral-200 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Kovana Katıl
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-16">
        
        <div className="md:col-span-2 space-y-16">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-sm border border-neutral-200 dark:border-neutral-700">1</span>
              Sorumluluklar
            </h2>
            <ul className="space-y-5 text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-sm border border-neutral-200 dark:border-neutral-700">2</span>
              Beklentiler
            </h2>
            <ul className="space-y-5 text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
              {job.expectations.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
           <div className="sticky top-28 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-6 rounded-2xl shadow-sm">
             <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-lg">Özet Bilgi</h3>
             <ul className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
               <li className="flex justify-between border-b border-neutral-200 dark:border-neutral-700 pb-3">
                 <span>Çalışma Şekli</span>
                 <span className="font-medium text-neutral-900 dark:text-white">Esnek & Sorumluluk Odaklı</span>
               </li>
               <li className="flex justify-between border-b border-neutral-200 dark:border-neutral-700 pb-3">
                 <span>Konum</span>
                 <span className="font-medium text-neutral-900 dark:text-white">Hibrit / Freelance / İstanbul</span>
               </li>
               <li className="flex justify-between">
                 <span>Departman</span>
                 <span className="font-medium text-neutral-900 dark:text-white">{job.title}</span>
               </li>
             </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
