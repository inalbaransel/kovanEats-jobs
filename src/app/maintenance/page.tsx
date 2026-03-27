"use client";

import { useEffect } from "react";
import KovanLogo from "@/components/KovanLogo";

export default function MaintenancePage() {
  useEffect(() => {
    // Her zaman açık (light) mod
    document.documentElement.classList.remove("dark");
    // html ve body'yi tam ekrana sabitle, scroll'u kapat
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#fafafa";
    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
      };

  }, []);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden bg-[#fafafa]">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        {/* Logo */}
        <div className="scale-110 md:scale-125">
          <KovanLogo />
        </div>

        {/* Main message */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-neutral-900 leading-tight">
            Perde arkasında
            <br />
            büyük şeyler pişiyor! 🍯
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 font-medium">
            Yakında görüşürüz.
          </p>
        </div>
      </div>
    </div>
  );
}
