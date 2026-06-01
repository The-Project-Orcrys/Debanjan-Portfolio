"use client";

import { useLayoutEffect, useRef } from "react";
import { MediaGalleryItem } from "@/components/shared/MediaGalleryItem";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

export function CaseStudyGallery({ items }: { items: GalleryItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      const cells = grid.querySelectorAll(".gallery-reveal");
      ctx = gsap.context(() => {
        gsap.from(cells, {
          opacity: 0,
          y: 48,
          scale: 0.96,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            once: true,
          },
        });
      }, grid);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [items]);

  return (
    <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
      {items.map((item) => (
        <MediaGalleryItem
          key={item._key}
          item={item}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "gallery-reveal aspect-[16/10]",
            item.span === "full" && "sm:col-span-2",
          )}
        />
      ))}
    </div>
  );
}
