"use client";

import { useState, useEffect, type HTMLAttributes } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface DiaTextProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[];
  duration?: number;
  className?: string;
}

export function DiaText({ words, duration = 2000, className, style, ...props }: DiaTextProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (words.length < 2 || reducedMotion) return;
    const interval = setInterval(() => setIndex(prev => (prev + 1) % words.length), Math.max(1000, duration));
    return () => clearInterval(interval);
  }, [words.length, duration, reducedMotion]);

  if (!words.length) return null;
  const activeIndex = index % words.length;
  return (
    <span className={cn("relative inline-grid overflow-hidden min-w-[2ch] align-bottom text-black dark:text-white", className)} style={{ verticalAlign: "bottom", ...style }} {...props}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait">
        <motion.span key={activeIndex} aria-hidden="true"
          initial={reducedMotion ? false : { y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ y: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, filter: { duration: 0.2 } }}
          className="absolute inset-0 inline-block">
          <motion.span className="inline-block bg-clip-text pb-1"
            style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, currentColor 50%, var(--red, #ec3939) 75%, var(--red, #ec3939))", backgroundSize: "250% 100%" }}
            initial={{ backgroundPosition: reducedMotion ? "0% 0%" : "100% 0%" }}
            animate={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeInOut", delay: reducedMotion ? 0 : 0.1 }}>
            {words[activeIndex]}
          </motion.span>
        </motion.span>
      </AnimatePresence>
      {words.map((word, position) => <span key={position} className="invisible col-start-1 row-start-1 pb-1" aria-hidden="true">{word}</span>)}
    </span>
  );
}

export default DiaText;
