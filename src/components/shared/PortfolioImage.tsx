"use client";

import Image from "next/image";
import { useState } from "react";
import { imageFallbackSrc } from "@/lib/images";
import { cn } from "@/lib/utils";

export function PortfolioImage({
  src,
  alt,
  fill = true,
  sizes,
  className,
  priority,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (failed) return;
    const fallback = imageFallbackSrc(src);
    if (fallback !== currentSrc) {
      setCurrentSrc(fallback);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-bg-secondary text-xs text-text-secondary",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={handleError}
    />
  );
}
