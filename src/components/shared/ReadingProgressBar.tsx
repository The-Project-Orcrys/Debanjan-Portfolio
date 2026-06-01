"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
