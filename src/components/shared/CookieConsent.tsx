"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if (getAnalyticsConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-20 left-3 right-3 z-[60] mx-auto max-w-lg rounded-2xl border border-white/15 bg-bg-primary/95 p-4 shadow-[var(--shadow-card)] backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto md:max-w-md"
    >
      <p className="text-sm leading-relaxed text-text-secondary">
        We use privacy-friendly analytics to understand how visitors use this
        site. No ads.{" "}
        <Link href="/contact" className="text-text-accent underline-offset-2 hover:underline">
          Questions?
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="hero-cta-primary py-2.5 text-xs"
          onClick={() => {
            setAnalyticsConsent("granted");
            setVisible(false);
          }}
        >
          Accept
        </button>
        <button
          type="button"
          className="hero-cta-secondary py-2.5 text-xs"
          onClick={() => {
            setAnalyticsConsent("denied");
            setVisible(false);
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
