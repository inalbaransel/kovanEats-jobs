import { notFound } from "next/navigation";
import { getJobBySlug, jobs } from "@/lib/data";
import JobApplyContent from "@/components/JobApplyContent";

export function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export default async function JobApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return <JobApplyContent job={job} />;
}
