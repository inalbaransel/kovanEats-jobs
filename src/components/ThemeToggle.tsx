"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, Theme } from "./ThemeProvider";
import { useState } from "react";

const options: { value: Theme; icon: React.FC<{ className?: string }>; label: string }[] = [
  { value: "light", icon: Sun, label: "Açık" },
  { value: "system", icon: Monitor, label: "Sistem" },
  { value: "dark", icon: Moon, label: "Koyu" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [hovered, setHovered] = useState<Theme | null>(null);

  return (
    <div className="fixed top-5 right-5 z-50">
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
        className="
          relative flex items-center gap-0.5 p-1
          bg-white/80 dark:bg-neutral-900/80
          backdrop-blur-xl
          border border-neutral-200/70 dark:border-neutral-700/70
          rounded-full shadow-lg shadow-black/5 dark:shadow-black/30
        "
      >
        {options.map((opt) => {
          const isActive = theme === opt.value;
          const isHovered = hovered === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              onMouseEnter={() => setHovered(opt.value)}
              onMouseLeave={() => setHovered(null)}
              title={opt.label}
              className="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="theme-active-pill"
                  className="
                    absolute inset-0 rounded-full
                    bg-neutral-900 dark:bg-white
                    shadow-md
                  "
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Hover background (only when not active) */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800"
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.div
                className="relative z-10"
                animate={{
                  scale: isActive ? 1.05 : 1,
                  rotate: isActive && opt.value === "dark" ? -15 : isActive && opt.value === "light" ? 15 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <opt.icon
                  className={`
                    w-3.5 h-3.5 transition-colors duration-200
                    ${isActive
                      ? "text-white dark:text-neutral-900"
                      : "text-neutral-400 dark:text-neutral-500"
                    }
                  `}
                />
              </motion.div>
            </button>
          );
        })}

        {/* Subtle glow under active item */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full blur-sm bg-neutral-400/30 dark:bg-neutral-400/20"
          animate={{
            x:
              theme === "light"
                ? "-100%"
                : theme === "system"
                ? "0%"
                : "100%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        />
      </motion.div>
    </div>
  );
}
