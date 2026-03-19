"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "./GlassSurface";
import { useLanguage } from "@/lib/i18n";

const Mascot: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const startCloseTimer = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      if (!isExpanded) {
        setShowBubble(false);
      }
    }, 5000);
  }, [isExpanded]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (showBubble && !isExpanded) {
      startCloseTimer();
    } else {
      clearCloseTimer();
    }
    return () => clearCloseTimer();
  }, [showBubble, isExpanded, startCloseTimer, clearCloseTimer]);

  useEffect(() => {
    // Show speech bubble after 3 seconds
    const bubbleTimer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    // Random blinking interval
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      },
      2000 + Math.random() * 2000,
    );

    // Click away to close logic
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(bubbleTimer);
      clearInterval(blinkInterval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const storyContent = (
    <div className="flex flex-col gap-4 text-neutral-800 dark:text-neutral-200 leading-relaxed">
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-700 pb-2 mb-1">
        <span className="font-bold text-blue-600 tracking-tight text-base">
          {t.mascot.storyTitle}
        </span>
        <button
          onClick={toggleExpand}
          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors"
          title="Kapat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {t.mascot.storyParagraphs.map((paragraph, i) =>
          i === t.mascot.storyParagraphs.length - 1 ? (
            <p
              key={i}
              className="font-medium text-neutral-900 dark:text-white bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/30"
            >
              {paragraph}
            </p>
          ) : (
            <p key={i}>{paragraph}</p>
          )
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50 pointer-events-none select-none"
    >
      <motion.div
        animate={{
          y: isExpanded ? 0 : [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: isExpanded ? 0 : Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
        className="relative flex flex-col items-end pointer-events-auto"
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10, x: -20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x:
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? -5
                    : -20,
              }}
              exit={{ opacity: 0, scale: 0.8, y: 10, x: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ willChange: "transform, opacity" }}
              className="absolute bottom-[105px] right-0 isolate origin-bottom-right"
            >
              <motion.div
                layout
                layoutRoot
                className={`
                  mascot-bubble text-neutral-800 dark:text-neutral-200
                  bg-white/60 dark:bg-[#1C1C1E]/60
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.12)]
                  dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)]
                  border border-white/50 dark:border-white/10
                  relative h-auto antialiased
                  ${
                    isExpanded
                      ? "rounded-[32px] w-[calc(100vw-48px)] sm:w-[420px]"
                      : "rounded-[24px] w-max max-w-[calc(100vw-48px)]"
                  }
                `}
                style={{
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  transform: "translateZ(0)",
                  WebkitFontSmoothing: "antialiased",
                }}
                transition={{
                  layout: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.2 },
                }}
              >
                <div className="px-5 sm:px-6 py-4 sm:py-5 relative z-10">
                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.1 },
                        }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 whitespace-nowrap"
                      >
                        <span className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base leading-tight">
                          {t.mascot.question}
                        </span>
                        <button
                          onClick={toggleExpand}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95"
                        >
                          {t.mascot.readStory}
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          transition: { duration: 0.1 },
                        }}
                      >
                        {storyContent}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Bubble Tip */}
                <motion.div
                  layout
                  className="mascot-tip absolute -bottom-2 right-4 w-4 h-4 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-xl border-r border-b border-white/50 dark:border-white/10 rotate-45 rounded-sm z-0 shadow-[4px_4px_16px_rgba(0,0,0,0.04)]"
                ></motion.div>
                {/* Extra Thought Dots */}
                <motion.div
                  layout
                  className="mascot-dot-1 absolute -bottom-6 right-5 w-2.5 h-2.5 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full shadow-sm animate-pulse scale-90"
                ></motion.div>
                <motion.div
                  layout
                  className="mascot-dot-2 absolute -bottom-10 right-6 w-1 h-1 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-sm border border-white/50 dark:border-white/10 rounded-full shadow-sm animate-pulse delay-75 scale-75"
                ></motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Body */}
        <div
          className="cursor-pointer relative"
          onClick={() => setShowBubble(!showBubble)}
        >
          <GlassSurface
            width={76}
            height={76}
            borderRadius={38}
            borderWidth={0.07}
            blur={16}
            displace={0}
            distortionScale={-80}
            xChannel="R"
            yChannel="B"
            redOffset={0}
            greenOffset={8}
            blueOffset={16}
            brightness={50}
            opacity={1}
            backgroundOpacity={0}
            mixBlendMode="screen"
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full pointer-events-none drop-shadow-lg"
            >
              <motion.g
                animate={{
                  x: [0, 2, -2, 0],
                  y: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Left Eye */}
                <motion.ellipse
                  cx="36"
                  cy="45"
                  rx="9"
                  ry={isBlinking ? "1" : "14"}
                  className="fill-neutral-900 dark:fill-white transition-colors duration-300"
                  animate={{ ry: isBlinking ? 1 : 14 }}
                  transition={{ duration: 0.1 }}
                />
                {/* Right Eye */}
                <motion.ellipse
                  cx="64"
                  cy="45"
                  rx="9"
                  ry={isBlinking ? "1" : "14"}
                  className="fill-neutral-900 dark:fill-white transition-colors duration-300"
                  animate={{ ry: isBlinking ? 1 : 14 }}
                  transition={{ duration: 0.1 }}
                />
              </motion.g>
            </svg>
          </GlassSurface>
        </div>
      </motion.div>
    </div>
  );
};

export default Mascot;
