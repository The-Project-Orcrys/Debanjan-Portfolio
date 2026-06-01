"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { MediaGalleryItem } from "@/components/shared/MediaGalleryItem";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

function uniqueMediaItems(items: GalleryItem[]): GalleryItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const url = item.imageUrl?.trim();
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

export function ServiceTab({
  active,
  mediaItems,
  className,
}: {
  active: boolean;
  mediaItems: GalleryItem[];
  className?: string;
}) {
  const items = uniqueMediaItems(mediaItems);

  useEffect(() => {
    if (active) {
      const t = setTimeout(async () => {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        ScrollTrigger.refresh();
      }, 450);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          onAnimationComplete={async () => {
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            ScrollTrigger.refresh();
          }}
        >
          <div
            className={cn(
              "grid gap-4 py-6",
              items.length === 1
                ? "max-w-xl grid-cols-1"
                : items.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3",
              className,
            )}
          >
            {items.map((item) => (
              <MediaGalleryItem
                key={item._key}
                item={item}
                className={cn(
                  item.span === "full" &&
                    items.length > 1 &&
                    "sm:col-span-2 lg:col-span-3",
                )}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
