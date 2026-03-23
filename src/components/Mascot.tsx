"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { usePathname } from "next/navigation";
import GlassSurface from "./GlassSurface";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

type Choreography = {
  animate: Record<string, number[]>;
  transition: { duration: number; ease: string };
};

const choreographies: Choreography[] = [
  // Yavaş yüzme — hafif x+y drift
  {
    animate: { y: [0, -12, -6, -16, -8, 0], x: [0, 4, -3, 5, -2, 0] },
    transition: { duration: 5, ease: "easeInOut" },
  },
  // Meraklı eğilme — rotate + hafif sıçrama
  {
    animate: { y: [0, -8, -14, -6, 0], rotate: [0, -3, 2, -1, 0] },
    transition: { duration: 4.5, ease: "easeInOut" },
  },
  // Tembel sallantı — çok yavaş x ağırlıklı
  {
    animate: { x: [0, 7, -5, 8, -4, 0], y: [0, -5, -3, -8, -4, 0] },
    transition: { duration: 6, ease: "easeInOut" },
  },
  // Mutlu sekme — hızlı iki sıçrama
  {
    animate: { y: [0, -18, -4, -20, -6, 0], x: [0, 2, -2, 3, -1, 0] },
    transition: { duration: 3.5, ease: "easeInOut" },
  },
  // Nefes alma — çok küçük scale + y
  {
    animate: { y: [0, -6, -3, -9, 0], scale: [1, 1.03, 1.01, 1.04, 1] },
    transition: { duration: 5.5, ease: "easeInOut" },
  },
  // Spiral sürükleme — x,y,rotate bir arada
  {
    animate: { y: [0, -10, -15, -8, -12, 0], x: [0, 6, -4, 7, -3, 0], rotate: [0, 2, -2, 1, -1, 0] },
    transition: { duration: 5, ease: "easeInOut" },
  },
];

type ExpressionType =
  | "neutral"
  | "excited"
  | "cute"
  | "catmouth"
  | "steam"
  | "surprised"
  | "happy"
  | "wink"
  | "smug"
  | "starstruck"
  | "business";

type JobReaction = { expression: ExpressionType };

const JOB_REACTIONS: Record<string, JobReaction> = {
  "mobile-developer":         { expression: "cute" },
  "backend-infrastructure":   { expression: "steam" },
  "frontend-engineer":        { expression: "wink" },
  "video-motion-specialist":  { expression: "starstruck" },
  "visual-identity-designer": { expression: "catmouth" },
  "brand-ambassador":         { expression: "smug" },
  "performance-marketing":    { expression: "business" },
  "strategic-partnership":    { expression: "surprised" },
};

function getMouthPath(expression: ExpressionType): string {
  switch (expression) {
    case "excited":    return "M 36 76 Q 50 88 64 76";
    case "steam":      return "M 42 77 Q 50 80 58 77";
    case "wink":       return "M 38 76 Q 50 84 62 76";
    case "happy":      return "M 34 74 Q 50 86 66 74";
    case "smug":       return "M 40 76 Q 46 73 58 76";
    case "starstruck": return "M 36 75 Q 50 82 64 75";
    case "catmouth":   return "M 40 76 Q 44 82 50 78 Q 56 82 60 76";
    case "business":   return "M 38 77 L 62 77";
    default:           return "M 38 77 L 62 77";
  }
}

// Eye config per expression
const EYE_CONFIG: Record<ExpressionType, { lRy: number; rRy: number; cy: number }> = {
  neutral:    { lRy: 14, rRy: 14, cy: 45 },
  cute:       { lRy: 16, rRy: 16, cy: 43 },
  catmouth:   { lRy: 12, rRy: 12, cy: 46 },
  excited:    { lRy: 16, rRy: 16, cy: 43 },
  steam:      { lRy: 10, rRy: 10, cy: 46 },
  wink:       { lRy: 14, rRy:  1, cy: 45 },
  surprised:  { lRy: 16, rRy: 16, cy: 44 },
  happy:      { lRy: 12, rRy: 12, cy: 46 },
  smug:       { lRy: 14, rRy:  8, cy: 45 },
  starstruck: { lRy: 16, rRy: 16, cy: 43 },
  business:   { lRy: 11, rRy: 11, cy: 45 },
};

const Mascot: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [activeExpression, setActiveExpression] = useState<ExpressionType>("neutral");
  const [showReactionBubble, setShowReactionBubble] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeExpressionRef = useRef<ExpressionType>("neutral");
  activeExpressionRef.current = activeExpression;

  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const bodyControls = useAnimationControls();
  const isExpandedRef = useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  const pathname = usePathname();
  const currentSlug = pathname.startsWith("/") ? pathname.slice(1) : "";

  // Sonsuz rastgele koreografi döngüsü — expression aktifken duraklat
  useEffect(() => {
    let cancelled = false;

    const runLoop = async () => {
      while (!cancelled) {
        if (isExpandedRef.current || activeExpressionRef.current !== "neutral") {
          await new Promise((r) => setTimeout(r, 300));
          continue;
        }
        const pick = choreographies[Math.floor(Math.random() * choreographies.length)];
        await bodyControls.start({
          ...pick.animate,
          transition: { ...pick.transition, repeat: 0 } as any,
        });
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 800));
      }
    };

    runLoop();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rastgele göz kırpma + click outside (pathname bağımsız)
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      },
      2000 + Math.random() * 2000,
    );

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
      clearInterval(blinkInterval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // "Neden tercih etmelisin?" balonunu sadece ana sayfada göster
  useEffect(() => {
    if (JOB_REACTIONS[currentSlug]) return;

    const bubbleTimer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => clearTimeout(bubbleTimer);
  }, [currentSlug]);

  // Pathname değişince job tepkisini tetikle
  useEffect(() => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);

    const reaction = JOB_REACTIONS[currentSlug];
    if (reaction) {
      setShowBubble(false);
      setIsExpanded(false);
      setActiveExpression(reaction.expression);
      reactionTimerRef.current = setTimeout(() => setShowReactionBubble(true), 600);
    } else {
      setActiveExpression("neutral");
      setShowReactionBubble(false);
    }

    return () => {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    };
  }, [currentSlug]);

  // Tepki balonunu 4.5 saniyede otomatik kapat
  useEffect(() => {
    if (!showReactionBubble) return;
    const timer = setTimeout(() => setShowReactionBubble(false), 4500);
    return () => clearTimeout(timer);
  }, [showReactionBubble]);

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

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const eyeCfg = EYE_CONFIG[activeExpression];

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
        animate={bodyControls}
        style={{ willChange: "transform" }}
        className="relative flex flex-col items-end pointer-events-auto"
      >
        {/* "Neden tercih etmelisin?" Speech Bubble */}
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

        {/* Job Reaction Bubble */}
        <AnimatePresence>
          {showReactionBubble && t.mascot.jobReactions[currentSlug] && (
            <motion.div
              key="reaction-bubble"
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
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ willChange: "transform, opacity" }}
              className="absolute bottom-[105px] right-0 isolate origin-bottom-right"
            >
              <div
                className="mascot-bubble rounded-[24px] w-max max-w-[min(280px,calc(100vw-48px))]
                           bg-white/60 dark:bg-[#1C1C1E]/60
                           shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.12)]
                           dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)]
                           border border-white/50 dark:border-white/10
                           relative antialiased"
                style={{
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                }}
              >
                <div className="px-4 py-3 relative z-10">
                  <span className="font-semibold text-neutral-900 dark:text-white text-sm leading-tight">
                    {t.mascot.jobReactions[currentSlug]}
                  </span>
                </div>
                {/* Bubble Tip */}
                <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-xl border-r border-b border-white/50 dark:border-white/10 rotate-45 rounded-sm z-0 shadow-[4px_4px_16px_rgba(0,0,0,0.04)]" />
                {/* Thought Dots */}
                <div className="absolute -bottom-6 right-5 w-2.5 h-2.5 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full shadow-sm animate-pulse scale-90" />
                <div className="absolute -bottom-10 right-6 w-1 h-1 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-sm border border-white/50 dark:border-white/10 rounded-full shadow-sm animate-pulse delay-75 scale-75" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Mascot Body */}
        <div
          className="cursor-pointer relative"
          onClick={() => {
            if (JOB_REACTIONS[currentSlug]) {
              setShowReactionBubble(!showReactionBubble);
            } else {
              setShowBubble(!showBubble);
            }
          }}
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
            isDark={isDark}
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
                  cy={eyeCfg.cy}
                  rx="9"
                  ry={isBlinking ? 1 : eyeCfg.lRy}
                  className="fill-neutral-900 dark:fill-white transition-colors duration-300"
                  animate={{ ry: isBlinking ? 1 : eyeCfg.lRy, cy: eyeCfg.cy }}
                  transition={{ duration: 0.15 }}
                />
                {/* Right Eye */}
                <motion.ellipse
                  cx="64"
                  cy={eyeCfg.cy}
                  rx="9"
                  ry={isBlinking ? 1 : eyeCfg.rRy}
                  className="fill-neutral-900 dark:fill-white transition-colors duration-300"
                  animate={{ ry: isBlinking ? 1 : eyeCfg.rRy, cy: eyeCfg.cy }}
                  transition={{ duration: 0.15 }}
                />

                {/* Mouth — stroke path (most expressions) */}
                <motion.path
                  d={getMouthPath(activeExpression)}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  className="text-neutral-900 dark:text-white"
                  animate={{
                    opacity: activeExpression !== "neutral" && activeExpression !== "surprised" && activeExpression !== "cute" && activeExpression !== "steam" ? 1 : 0,
                    scaleY: activeExpression !== "neutral" && activeExpression !== "surprised" && activeExpression !== "cute" && activeExpression !== "steam" ? 1 : 0,
                  }}
                  style={{ transformOrigin: "50px 76px" }}
                  transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
                />
                {/* Mouth — big O for surprised */}
                <motion.ellipse
                  cx="50"
                  cy="78"
                  rx="5"
                  ry="7"
                  className="fill-neutral-900 dark:fill-white"
                  animate={{
                    opacity: activeExpression === "surprised" ? 1 : 0,
                    scaleY: activeExpression === "surprised" ? 1 : 0,
                  }}
                  style={{ transformOrigin: "50px 78px" }}
                  transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
                />
                {/* Mouth — uff oval for steam (backend) */}
                <motion.ellipse
                  cx="50"
                  cy="78"
                  rx="6"
                  ry="3"
                  className="fill-neutral-900 dark:fill-white"
                  animate={{
                    opacity: activeExpression === "steam" ? 1 : 0,
                    scale: activeExpression === "steam" ? 1 : 0,
                  }}
                  style={{ transformOrigin: "50px 78px" }}
                  transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
                />
                {/* Mouth — small round o for cute (mobile) */}
                <motion.ellipse
                  cx="50"
                  cy="78"
                  rx="4"
                  ry="4"
                  className="fill-neutral-900 dark:fill-white"
                  animate={{
                    opacity: activeExpression === "cute" ? 1 : 0,
                    scale: activeExpression === "cute" ? 1 : 0,
                  }}
                  style={{ transformOrigin: "50px 78px" }}
                  transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
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
