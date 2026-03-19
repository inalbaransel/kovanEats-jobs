"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Mascot: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

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

    // Random blinking interval - made more frequent
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      },
      2000 + Math.random() * 2000,
    ); // 2-4 seconds

    // Click away to close logic
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        // Optional: Also hide the initial bubble if desired, or just collapse.
        // For now, let's keep it consistent with "hikayeyi kapat"
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
          Bir Startup Vizyonu: Birlikte Büyüyeceğiz
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
        <p>
          Yemeksepeti&apos;nin hikayesini bilirsin; ilk kurulduğunda ekipteki
          kimseye devasa maaşlar vaat edilememişti. Kurucusu o günleri
          anlatırken, tek vaatlerinin bir gün başarılı olurlarsa bu başarıyı
          herkesle paylaşmak olduğunu söyler.
        </p>
        <p>
          İşler büyüyüp milyonluk cirolar geldiğinde ise sözlerini tuttular. O
          büyük kazancı ekipteki herkesle, sanki her biri şirketin ortağıymış
          gibi paylaştılar. Çünkü gerçek bir startup ruhu, başarıyı tek başına
          değil, o yolu beraber yürüyenlerle kucaklamayı gerektirir.
        </p>
        <p>
          Biz de tam bu ruhla yola çıkıyoruz. Şu an bir startup&apos;ız ve en
          büyük sermayemiz hayallerimiz. Yarın o büyük sıçramayı yaptığımızda,
          başarımızı sadece kurucuların değil, bu kovanı bugün beraber örenlerin
          başarısı olarak göreceğiz.
        </p>
        <p className="font-medium text-neutral-900 dark:text-white bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
          Senin de bizi tercih etmen için bu hikayeyi anlattık. Bu vizyonu
          beraber gerçeğe dönüştürmeye, kovanın bir parçası olmaya var mısın? 🤗
        </p>
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
                  mascot-bubble text-neutral-800 dark:text-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                  border border-white/20 dark:border-neutral-700/30 relative h-auto antialiased overflow-hidden
                  ${
                    isExpanded
                      ? "rounded-4xl w-[calc(100vw-48px)] sm:w-[420px]"
                      : "rounded-3xl w-max max-w-[calc(100vw-48px)]"
                  }
                `}
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
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
                          Neden KovanEats&apos;i tercih etmelisin? 😑
                        </span>
                        <button
                          onClick={toggleExpand}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95"
                        >
                          Hikayeyi Oku
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
                {/* Bubble Tip - Thought Cloud Style */}
                <motion.div
                  layout
                  className="mascot-tip absolute -bottom-2 right-4 w-4 h-4 bg-white/98 dark:bg-neutral-900/98 border-r border-b border-white/20 dark:border-neutral-700/20 rotate-45 rounded-sm z-0"
                ></motion.div>
                {/* Extra Thought Dots for more vertical reach */}
                <motion.div
                  layout
                  className="mascot-dot-1 absolute -bottom-6 right-5 w-2.5 h-2.5 bg-white/95 dark:bg-neutral-900/95 border border-white/20 dark:border-neutral-700/20 rounded-full shadow-sm animate-pulse scale-90"
                ></motion.div>
                <motion.div
                  layout
                  className="mascot-dot-2 absolute -bottom-10 right-6 w-1 h-1 bg-white/90 dark:bg-neutral-900/90 border border-white/20 dark:border-neutral-700/20 rounded-full shadow-sm animate-pulse delay-75 scale-75"
                ></motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Body */}
        <div
          className="w-20 h-20 md:w-24 md:h-24 cursor-pointer"
          onClick={() => setShowBubble(!showBubble)}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Outer Glow / Aura */}
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="url(#paint0_radial)"
              fillOpacity="0.4"
            />

            {/* Main Body */}
            <circle cx="50" cy="50" r="40" fill="url(#paint1_linear)" />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />

            {/* Eyes Group - Animated Together */}
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
                cx="38"
                cy="45"
                rx="6"
                ry={isBlinking ? "1" : "8"}
                fill="white"
                animate={{ ry: isBlinking ? 1 : 8 }}
                transition={{ duration: 0.1 }}
              />
              {/* Right Eye */}
              <motion.ellipse
                cx="62"
                cy="45"
                rx="6"
                ry={isBlinking ? "1" : "8"}
                fill="white"
                animate={{ ry: isBlinking ? 1 : 8 }}
                transition={{ duration: 0.1 }}
              />
            </motion.g>

            <defs>
              <radialGradient
                id="paint0_radial"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(50 50) rotate(90) scale(48)"
              >
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="paint1_linear"
                x1="50"
                y1="10"
                x2="50"
                y2="90"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#60A5FA" />
                <stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Mascot;
