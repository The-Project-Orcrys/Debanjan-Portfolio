import * as Sentry from "@sentry/nextjs";
import { initSentry } from "./src/lib/sentry/init";

export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" ||
    process.env.NEXT_RUNTIME === "edge"
  ) {
    initSentry();
  }
}

export const onRequestError = Sentry.captureRequestError;
