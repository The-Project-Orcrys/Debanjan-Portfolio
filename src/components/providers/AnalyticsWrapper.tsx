"use client";

import { Suspense } from "react";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <PostHogProvider>
        {children}
        <CookieConsent />
      </PostHogProvider>
    </Suspense>
  );
}
