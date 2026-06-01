export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export function buildCanonical(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${getSiteUrl()}${normalized}`;
}

export const DEFAULT_OG_SIZE = { width: 1200, height: 630 } as const;
