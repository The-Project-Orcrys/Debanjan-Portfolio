import "server-only";
import { existsSync } from "fs";
import path from "path";
import { assets } from "@/lib/data/assets";

const OG_FALLBACK = "/opengraph-image";

/** Prefer static OG photo when present; otherwise Next.js dynamic OG route. */
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
  const clean = relativePath.startsWith("/")
    ? relativePath.slice(1)
    : relativePath;
  return existsSync(path.join(process.cwd(), "public", clean));
}
