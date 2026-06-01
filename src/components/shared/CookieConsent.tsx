"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics/consent";

function subscribeConsent(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("analytics-consent", handler);
  return () => window.removeEventListener("analytics-consent", handler);
}

function readCookieConsentVisible(): boolean {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return false;
  return getAnalyticsConsent() === null;
}

export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribeConsent,
    readCookieConsentVisible,
    () => false,
  );

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
          className="rounded-full bg-text-accent px-4 py-2 text-sm font-medium text-bg-primary"
          onClick={() => setAnalyticsConsent("granted")}
        >
          Accept
        </button>
        <button
          type="button"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          onClick={() => setAnalyticsConsent("denied")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
