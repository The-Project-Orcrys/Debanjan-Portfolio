import posthog from "posthog-js";

export function trackContactSubmitted() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture("contact_submitted");
}
