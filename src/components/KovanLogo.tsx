"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function KovanLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative w-[130px] md:w-[350px] shrink-0">
      {/* Görünmez spacer: container yüksekliğini sabit tutar */}
      <img
        src="/kovanEats_logo.png"
        alt=""
        aria-hidden="true"
        className="w-full h-auto opacity-0 pointer-events-none select-none relative -top-2 md:-top-7"
        draggable={false}
      />
      {/* Açık tema logosu */}
      <img
        src="/kovanEats_logo.png"
        alt="Kovan Logo"
        className="absolute inset-0 w-full h-auto object-contain -top-2 md:-top-7 select-none pointer-events-none transition-opacity duration-300 ease-in-out"
        style={{ opacity: isDark ? 0 : 1 }}
        draggable={false}
      />
      {/* Koyu tema logosu */}
      <img
        src="/kovaneats-siyah-logo.png"
        alt="Kovan Logo"
        className="absolute inset-0 w-full h-auto object-contain -top-2 md:-top-7 select-none pointer-events-none transition-opacity duration-300 ease-in-out"
        style={{ opacity: isDark ? 1 : 0 }}
        draggable={false}
      />
    </div>
  );
}
