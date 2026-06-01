/**
 * Optional public assets under `public/`.
 * Client components: use props from `resolveOptionalMedia()` (server) when possible.
 *
 * @see public/animations/README.md
 * @see public/videos/README.md
 */
export const OPTIONAL_MEDIA = {
  scrollHintLottie: undefined as string | undefined,
  footerVideo: "/videos/footer-texture.mp4",
} as const;
