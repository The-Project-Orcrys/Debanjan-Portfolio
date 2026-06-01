import "server-only";
import { existsSync } from "fs";
import path from "path";
import { assets } from "@/lib/data/static";

export const RESUME_FILENAME = "debanjan-sandhaki-resume.pdf";
export const RESUME_PUBLIC_PATH = `/resume/${RESUME_FILENAME}`;

export function resumeFileOnDisk(): boolean {
  return existsSync(
    path.join(process.cwd(), "public", "resume", RESUME_FILENAME),
  );
}

export function getResumeUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (fromEnv) return fromEnv;
  if (resumeFileOnDisk()) return RESUME_PUBLIC_PATH;
  return null;
}

export function getResumeDownloadName(): string {
  return RESUME_FILENAME;
}

const OG_FALLBACK = "/opengraph-image";

export function resolveOgImagePath(settingsOg?: string): string {
  if (settingsOg && settingsOg !== assets.og && fileExistsPublic(settingsOg)) {
    return settingsOg;
  }
  if (fileExistsPublic(assets.og)) return assets.og;
  return OG_FALLBACK;
}

export function portraitImagePath(): string | null {
  if (fileExistsPublic(assets.about.portrait)) return assets.about.portrait;
  return null;
}

function fileExistsPublic(relativePath: string): boolean {
  const clean = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  return existsSync(path.join(process.cwd(), "public", clean));
}
