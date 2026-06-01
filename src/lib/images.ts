/**
 * Default object-position for portrait photography in cover crops.
 * Anchors slightly below the top so eyes and facial structure stay in frame.
 */
export const PORTRAIT_OBJECT_POSITION = "50% 28%";

/** Per-file focal points for `/images/services/*` (subject placement in source photo). */
const SERVICE_IMAGE_POSITIONS: Record<string, string> = {
  "marketing-consulting": "76% 32%",
  "brand-consulting": "52% 24%",
  "management-consulting": "50% 26%",
  "project-management": "50% 52%",
  "growth-marketing": "54% 28%",
  "strategic-planning": "50% 26%",
};

/** Resolve object-position for a service card image from its URL path. */
export function serviceImageObjectPosition(src: string): string {
  const filename = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  return SERVICE_IMAGE_POSITIONS[filename] ?? "50% center";
}

/** Per-project cover crops for work cards (slug → object-position). */
const WORK_COVER_POSITIONS: Record<string, string> = {
  mewayz: "50% 34%",
  phantomx: "50% 22%",
  "ngsaa-ai-nation": "50% 24%",
  edquate: "55% 28%",
  orcrys: "50% 26%",
  veerangana: "50% 24%",
};

export function workCoverObjectPosition(slug: string): string {
  return WORK_COVER_POSITIONS[slug] ?? PORTRAIT_OBJECT_POSITION;
}

/** Swap .jpg/.jpeg/.webp to .svg stub path for graceful fallback. */
export function imageFallbackSrc(src: string): string {
  return src.replace(/\.(jpe?g|webp|png)$/i, ".svg");
}

export function isLocalImage(src: string): boolean {
  return src.startsWith("/");
}
