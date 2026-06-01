declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
    NEXT_PUBLIC_SANITY_DATASET?: string;
    SANITY_API_TOKEN?: string;
    SANITY_REVALIDATE_SECRET?: string;
    RESEND_API_KEY?: string;
    CONTACT_EMAIL?: string;
    FROM_EMAIL?: string;
    NEXT_PUBLIC_POSTHOG_KEY?: string;
    NEXT_PUBLIC_POSTHOG_HOST?: string;
    NEXT_PUBLIC_RESUME_URL?: string;
    NEXT_PUBLIC_CALENDAR_URL?: string;
    NEXT_PUBLIC_CALENDAR_EMBED_URL?: string;
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
    SENTRY_DSN?: string;
  }
}
