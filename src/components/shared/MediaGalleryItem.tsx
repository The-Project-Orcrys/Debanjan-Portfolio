"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import {
  PORTRAIT_OBJECT_POSITION,
  serviceImageObjectPosition,
} from "@/lib/images";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

export function MediaGalleryItem({
  item,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className,
  portraitFocus = false,
}: {
  item: GalleryItem;
  sizes?: string;
  className?: string;
  /** Bias crop toward upper third (faces in portrait photos). */
  portraitFocus?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-bg-secondary ring-1 ring-transparent transition-[box-shadow,ring-color] duration-500 hover:ring-border/40 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {item.type === "video" && item.videoUrl ? (
        <VideoLoop src={item.videoUrl} className="h-full w-full" />
      ) : item.imageUrl ? (
        <PortfolioImage
          src={item.imageUrl}
          alt={item.alt}
          sizes={sizes}
          objectPosition={
            portraitFocus && item.imageUrl?.includes("/services/")
              ? serviceImageObjectPosition(item.imageUrl)
              : portraitFocus
                ? PORTRAIT_OBJECT_POSITION
                : "center"
          }
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
    </div>
  );
}
