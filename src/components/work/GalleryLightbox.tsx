"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

export function GalleryLightbox({
  items,
  className,
}: {
  items: GalleryItem[];
  className?: string;
}) {
  const images = items.filter((item) => item.type === "image" && item.imageUrl);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const active = openIndex !== null ? images[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? 0 : (i - 1 + images.length) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, images.length, openIndex]);

  if (images.length === 0) return null;

  return (
    <>
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:gap-5", className)}>
        {images.map((item, index) => (
          <button
            key={item._key}
            type="button"
            className={cn(
              "gallery-lightbox-trigger group relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-secondary text-left",
              item.span === "full" && "sm:col-span-2",
            )}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image: ${item.alt || "Gallery image"}`}
            data-cursor="pointer"
          >
            <div className="relative aspect-[16/10] w-full">
              <PortfolioImage
                src={item.imageUrl!}
                alt={item.alt || ""}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-bg-primary/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt || "Gallery image"}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-[1] rounded-full border border-white/20 px-3 py-2 text-sm uppercase tracking-widest text-text-secondary hover:text-text-primary"
              onClick={close}
            >
              Close
            </button>
            <motion.div
              className="relative h-[min(80vh,720px)] w-full max-w-5xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PortfolioImage
                src={active.imageUrl!}
                alt={active.alt || ""}
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
