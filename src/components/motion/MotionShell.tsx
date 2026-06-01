"use client";

import { useEffect, useState } from "react";

const PRELOADER_SEEN_KEY = "portfolio-motion-intro-seen";

/**
 * Root motion wrapper: optional first-visit intro overlay, then exposes page content.
 * Lenis + cursor live in `(site)/layout`; this runs for all routes including /studio.
 */
export function MotionShell({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";

    const finish = () => {
      sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
      document.documentElement.dataset.motionReady = "true";
      document.documentElement.style.overflow = "";
      setIntroDone(true);
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    };

    if (reduced || seen) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const timeout = window.setTimeout(finish, 720);
    return () => {
      window.clearTimeout(timeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      {!introDone ? (
        <div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-3 bg-bg-primary"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <p className="text-display text-xl tracking-tight text-text-primary sm:text-2xl">
            Debanjan Sandhaki
          </p>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-text-accent to-transparent" />
        </div>
      ) : null}
      {children}
    </>
  );
}
