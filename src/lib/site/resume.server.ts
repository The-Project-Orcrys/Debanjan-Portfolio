import { existsSync } from "fs";
import path from "path";

export const RESUME_FILENAME = "debanjan-sandhaki-resume.pdf";
export const RESUME_PUBLIC_PATH = `/resume/${RESUME_FILENAME}`;

export function resumeFileOnDisk(): boolean {
  return existsSync(
    path.join(process.cwd(), "public", "resume", RESUME_FILENAME),
  );
}

/** Résumé URL when env override or PDF exists in `public/resume/`. */
export function getResumeUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (fromEnv) return fromEnv;
  if (resumeFileOnDisk()) return RESUME_PUBLIC_PATH;
  return null;
}

export function getResumeDownloadName(): string {
  return RESUME_FILENAME;
}
