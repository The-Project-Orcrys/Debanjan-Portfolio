/** Optional founder actions — set in env or place PDF under `public/resume/`. */

const DEFAULT_RESUME_PATH = "/resume/debanjan-sandhaki-resume.pdf";

export function getResumeUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_RESUME_PATH;
}

export function getCalendarUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_CALENDAR_URL?.trim();
  return url || null;
}
