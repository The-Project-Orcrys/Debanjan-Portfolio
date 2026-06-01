/** Swap .jpg/.jpeg/.webp to .svg stub path for graceful fallback. */
export function imageFallbackSrc(src: string): string {
  return src.replace(/\.(jpe?g|webp|png)$/i, ".svg");
}

export function isLocalImage(src: string): boolean {
  return src.startsWith("/");
}
