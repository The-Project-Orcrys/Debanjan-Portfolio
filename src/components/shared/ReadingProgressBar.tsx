"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/motion/LenisProvider";

export function ReadingProgressBar() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateFromWindow = () => {
      const doc = document.documentElement;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (doc.scrollTop / height) * 100 : 0);
    };

    if (!lenis) {
      updateFromWindow();
      window.addEventListener("scroll", updateFromWindow, { passive: true });
      return () => window.removeEventListener("scroll", updateFromWindow);
    }

    const onScroll = () => {
      const limit = lenis.limit;
      const scroll = lenis.scroll;
      setProgress(limit > 0 ? (scroll / limit) * 100 : 0);
    };

    onScroll();
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  if (progress <= 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-shape-blue via-text-accent to-shape-blue transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
