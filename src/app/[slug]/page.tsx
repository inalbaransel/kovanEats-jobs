import { getJobBySlug, jobs } from "@/lib/data";
import { notFound } from "next/navigation";
import JobDetailClient from "@/components/JobDetailClient";

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

  return <JobDetailClient job={job} />;
}
