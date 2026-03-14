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
      <div className="bg-neutral-50 border-b border-neutral-100 py-20 px-6 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neutral-200/50 blur-[100px] rounded-[100%] pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-start relative z-10">
          <Link 
             href="/" 
             className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Tüm Pozisyonlara Dön
          </Link>
          <div className="inline-block px-3 py-1 rounded-md bg-white border border-neutral-200 text-xs font-bold tracking-wider text-neutral-600 mb-6 uppercase">
            {job.title} Departmanı
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-neutral-900 mb-6">
            {job.title} Rolü
          </h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl leading-relaxed">
            {job.description}
          </p>
          <div className="mt-10">
            <Link 
              href={`/${job.slug}/apply`} 
              className="inline-flex items-center justify-center bg-neutral-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black hover:scale-105 transition-all shadow-lg hover:shadow-xl"
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
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm border border-neutral-200">1</span>
              Sorumluluklar
            </h2>
            <ul className="space-y-5 text-neutral-600 leading-relaxed font-medium">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm border border-neutral-200">2</span>
              Beklentiler
            </h2>
            <ul className="space-y-5 text-neutral-600 leading-relaxed font-medium">
              {job.expectations.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
           <div className="sticky top-28 bg-neutral-50 border border-neutral-100 p-6 rounded-2xl shadow-sm">
             <h3 className="font-bold text-neutral-900 mb-4 text-lg">Özet Bilgi</h3>
             <ul className="space-y-4 text-sm text-neutral-600">
               <li className="flex justify-between border-b border-neutral-200 pb-3">
                 <span>Çalışma Şekli</span>
                 <span className="font-medium text-neutral-900">Esnek & Sorumluluk Odaklı</span>
               </li>
               <li className="flex justify-between border-b border-neutral-200 pb-3">
                 <span>Konum</span>
                 <span className="font-medium text-neutral-900">Hibrit / Freelance / İstanbul</span>
               </li>
               <li className="flex justify-between">
                 <span>Departman</span>
                 <span className="font-medium text-neutral-900">{job.title}</span>
               </li>
             </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
