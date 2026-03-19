"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Sun, Moon, Monitor, FileSearch, Globe } from "lucide-react";
import { useTheme, Theme } from "./ThemeProvider";
import { useLanguage } from "@/lib/i18n";
import GlassSurface from "./GlassSurface";

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: -8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 28,
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -6,
    transition: {
      duration: 0.18,
      ease: "easeIn" as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 350, damping: 28 } },
};

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const themeOptions: { value: Theme; icon: React.FC<{ className?: string }>; label: string }[] = [
    { value: "light", icon: Sun, label: t.menu.themeLight },
    { value: "system", icon: Monitor, label: t.menu.themeSystem },
    { value: "dark", icon: Moon, label: t.menu.themeDark },
  ];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={containerRef} className="fixed top-5 right-5 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.06 }}
        aria-label={t.menu.open}
        className="relative focus:outline-none rounded-full"
      >
        <GlassSurface
          width={40}
          height={40}
          borderRadius={20}
          borderWidth={0.07}
          blur={16}
          displace={0}
          distortionScale={-60}
          xChannel="R"
          yChannel="B"
          redOffset={0}
          greenOffset={6}
          blueOffset={12}
          brightness={50}
          opacity={1}
          backgroundOpacity={0}
          mixBlendMode="screen"
        >
        {/* Hamburger ↔ X morph */}
        <div className="w-4 h-4 relative flex items-center justify-center">
          {/* Top line */}
          <motion.span
            animate={open ? { rotate: 45, y: 0, width: "16px" } : { rotate: 0, y: -5, width: "14px" }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute h-[1.5px] rounded-full bg-neutral-700 dark:bg-neutral-300 block"
          />
          {/* Middle line */}
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, width: "16px" }}
            transition={{ duration: 0.15 }}
            className="absolute h-[1.5px] rounded-full bg-neutral-700 dark:bg-neutral-300 block"
          />
          {/* Bottom line */}
          <motion.span
            animate={open ? { rotate: -45, y: 0, width: "16px" } : { rotate: 0, y: 5, width: "10px" }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute h-[1.5px] rounded-full bg-neutral-700 dark:bg-neutral-300 block"
          />
        </div>
        </GlassSurface>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            layoutRoot
            style={{ originX: 1, originY: 0 }}
            className="
              absolute top-12 right-0
              w-64
              bg-white/90 dark:bg-neutral-900/90
              backdrop-blur-2xl
              border border-neutral-200/60 dark:border-neutral-700/60
              rounded-2xl
              shadow-2xl shadow-black/10 dark:shadow-black/40
              overflow-hidden
              p-2
            "
          >
            {/* ── Tema ── */}
            <motion.div variants={itemVariants} className="px-3 pt-2 pb-1">
              <p className="text-[10px] font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-2">
                {t.menu.theme}
              </p>
              <LayoutGroup id="menu-theme">
                <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                {themeOptions.map((opt) => {
                  const isActive = theme === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setTheme(opt.value)}
                      title={opt.label}
                      className="relative flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="menu-theme-pill"
                          className="absolute inset-0 rounded-lg bg-white dark:bg-neutral-700 shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <motion.div
                        className="relative z-10 flex items-center gap-1.5"
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <opt.icon
                          className={`w-3.5 h-3.5 transition-colors duration-200 ${
                            isActive
                              ? "text-neutral-900 dark:text-white"
                              : "text-neutral-400 dark:text-neutral-500"
                          }`}
                        />
                        <span
                          className={`transition-colors duration-200 ${
                            isActive
                              ? "text-neutral-900 dark:text-white"
                              : "text-neutral-400 dark:text-neutral-500"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </motion.div>

          {/* ── Divider ── */}
            <motion.div
              variants={itemVariants}
              className="h-px bg-neutral-100 dark:bg-neutral-800 mx-3 my-1"
            />

            {/* ── Başvuru Takip ── */}
            <motion.div variants={itemVariants} className="px-2 py-1">
              <button
                disabled
                className="
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-neutral-400 dark:text-neutral-500
                  hover:bg-neutral-50 dark:hover:bg-neutral-800
                  transition-colors duration-150 group
                  cursor-not-allowed
                "
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                  <FileSearch className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold leading-tight">{t.menu.trackApp}</span>
                  <span className="text-[10px] font-medium text-neutral-300 dark:text-neutral-600 leading-tight">{t.menu.comingSoon}</span>
                </div>
              </button>
            </motion.div>

            {/* ── Divider ── */}
            <motion.div
              variants={itemVariants}
              className="h-px bg-neutral-100 dark:bg-neutral-800 mx-3 my-1"
            />

            {/* ── Dil ── */}
            <motion.div variants={itemVariants} className="px-3 pb-2 pt-1">
              <p className="text-[10px] font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-2">
                {t.menu.language}
              </p>
              <LayoutGroup id="menu-lang">
                <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                {(["TR", "EN"] as const).map((l) => {
                  const isActive = lang === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className="relative flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="menu-lang-pill"
                          className="absolute inset-0 rounded-lg bg-white dark:bg-neutral-700 shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <motion.div
                        className="relative z-10 flex items-center gap-1.5"
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Globe
                          className={`w-3.5 h-3.5 transition-colors duration-200 ${
                            isActive
                              ? "text-neutral-900 dark:text-white"
                              : "text-neutral-400 dark:text-neutral-500"
                          }`}
                        />
                        <span
                          className={`transition-colors duration-200 ${
                            isActive
                              ? "text-neutral-900 dark:text-white"
                              : "text-neutral-400 dark:text-neutral-500"
                          }`}
                        >
                          {l}
                        </span>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
