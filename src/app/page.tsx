import JobCard from "@/components/JobCard";
import { jobs } from "@/lib/data";
import KovanLogo from "@/components/KovanLogo";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full min-h-[80vh]">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-5xl flex flex-col items-center">
        <h1 className="hero-element flex flex-row items-center justify-center gap-3 md:gap-4 text-4xl md:text-8xl font-extrabold tracking-tighter text-neutral-900 dark:text-white mb-4">
          <KovanLogo />
          <span className="text-neutral-400">Kariyer</span>
        </h1>
        <p className="hero-element text-lg text-neutral-500 font-medium">
          KovanEats&apos;te kariyer fırsatlarını keşfet.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 lg:px-0">
        {jobs.map((job) => (
          <div key={job.id} className="job-card-wrapper">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
