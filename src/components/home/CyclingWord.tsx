"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function CyclingWord({
  words,
  intervalMs = 2400,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const widthCh = useMemo(
    () => Math.max(...words.map((w) => w.length), 1),
    [words],
  );

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  const word = words[index] ?? words[0];

  return (
    <span
      className={cn("relative inline-block align-baseline", className)}
      style={{ width: `${widthCh}ch` }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">{word}</span>
      <span className="relative block h-[1.15em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            className="hero-cycle-word absolute inset-x-0 bottom-0 block text-center"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
