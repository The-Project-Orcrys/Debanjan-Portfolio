import "server-only";
import { existsSync } from "fs";
import path from "path";

const SCROLL_HINT_LOTTIE = "/animations/scroll-hint.lottie";
const FOOTER_VIDEO = "/videos/footer-texture.mp4";

function publicFileExists(urlPath: string): boolean {
  const clean = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
  return existsSync(path.join(process.cwd(), "public", clean));
}

/** Resolve optional `public/` assets only when the file exists (avoids 404s in dev). */
export function resolveOptionalMedia() {
  return {
    scrollHintLottie: publicFileExists(SCROLL_HINT_LOTTIE)
      ? SCROLL_HINT_LOTTIE
      : undefined,
    footerVideo: publicFileExists(FOOTER_VIDEO) ? FOOTER_VIDEO : undefined,
  };
}
