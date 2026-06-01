"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className={cn(
        "product-card-touch group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/15 bg-bg-secondary shadow-[0_12px_40px_-16px_rgba(0,0,0,0.65)] ring-1 ring-white/10 transition hover:border-text-accent/45 hover:shadow-[var(--shadow-glow)]",
      )}
    >
      {product.imageUrl ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg-secondary sm:aspect-[5/3]">
          <PortfolioImage
            src={product.imageUrl}
            alt={`${product.name} — ${product.tagline}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            objectPosition={
              product.imageObjectPosition ?? PORTRAIT_OBJECT_POSITION
            }
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/75 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-text-primary shadow-sm backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
            {product.category}
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col border-t border-white/10 bg-bg-elevated p-4 sm:p-5">
        {!product.imageUrl ? (
          <span className="text-xs font-medium uppercase tracking-widest text-text-primary/80">
            {product.category}
          </span>
        ) : null}
        <h3 className="text-display text-lg leading-tight text-text-primary sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-[#d8ccff]">{product.tagline}</p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#c8c4bc]">
          {product.description}
        </p>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-widest text-text-primary underline-offset-4 transition hover:text-text-accent hover:underline sm:text-sm"
          aria-label={`Know more about ${product.name}`}
        >
          Know more
          <span
            className="inline-block transition-transform group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}
