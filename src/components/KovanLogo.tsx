"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function KovanLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative w-[130px] md:w-[350px] h-auto shrink-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={isDark ? "dark" : "light"}
          src={isDark ? "/kovaneats-siyah-logo.png" : "/kovanEats_logo.png"}
          alt="Kovan Logo"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full h-auto object-contain relative -top-2 md:-top-7 select-none pointer-events-none"
          draggable={false}
        />
      </AnimatePresence>
    </div>
  );
}
