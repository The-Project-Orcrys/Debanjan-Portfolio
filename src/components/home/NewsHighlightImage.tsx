"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";

export function NewsHighlightImage({ src }: { src: string }) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-t-[var(--radius-card)]">
      <PortfolioImage
        src={src}
        alt=""
        objectPosition={PORTRAIT_OBJECT_POSITION}
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
