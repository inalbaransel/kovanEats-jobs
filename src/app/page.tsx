"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import JobCard from "@/components/JobCard";
import { jobs } from "@/lib/data";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Title and Subtitle Animation
      gsap.fromTo(
        ".hero-element",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      );

      // Cards Animation
      gsap.fromTo(
        ".job-card-wrapper",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          delay: 0.3,
        },
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full min-h-[80vh]"
    >
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-2xl flex flex-col items-center">
        <h1 className="hero-element flex items-center justify-center gap-3 md:gap-6 text-5xl md:text-7xl font-extrabold tracking-tighter text-neutral-900 mb-4">
          <div className="flex items-center">
            <img
              src="/kovanEats_logo.png"
              alt="Kovan Logo"
              className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] object-contain relative -top-2 md:-top-3"
            />
          </div>
          <span className="text-neutral-400">Kariyer</span>
        </h1>
        <p className="hero-element text-lg text-neutral-500 font-medium">
          KovanEats'te kariyer fırsatlarını keşfet.
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
