import posthog from "posthog-js";

export const ANALYTICS_CONSENT_KEY = "portfolio-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("analytics-consent", { detail: value }));
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === "granted";
}

export function trackContactSubmitted() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture("contact_submitted");
}
