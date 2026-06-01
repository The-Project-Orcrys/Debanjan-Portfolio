"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/motion/LenisProvider";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = 480;
    const onScroll = (y: number) => setVisible(y > threshold);

    onScroll(lenis?.scroll ?? window.scrollY);

    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => onScroll(scroll);
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    }

    const onWindowScroll = () => onScroll(window.scrollY);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-bg-elevated/90 text-sm text-text-primary shadow-lg backdrop-blur-md transition",
        "hover:border-text-accent/40 hover:text-text-accent",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-accent",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
