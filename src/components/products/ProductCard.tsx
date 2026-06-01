"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

export function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "product-card-touch group flex h-full overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/40 transition hover:border-text-accent/35 hover:shadow-[var(--shadow-glow)]",
        featured ? "flex-col md:flex-row" : "flex-col",
      )}
    >
      {product.imageUrl ? (
        <div
          className={cn(
            "relative overflow-hidden bg-bg-secondary",
            featured
              ? "aspect-[16/10] md:aspect-auto md:min-h-[260px] md:w-[42%] md:shrink-0"
              : "aspect-[16/10]",
          )}
        >
          <PortfolioImage
            src={product.imageUrl}
            alt={`${product.name} — ${product.tagline}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-bg-primary/60 px-3 py-1 text-xs uppercase tracking-widest text-text-secondary backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {!product.imageUrl ? (
          <span className="text-xs uppercase tracking-widest text-text-secondary">
            {product.category}
          </span>
        ) : null}
        <h3 className="text-display mt-2 text-2xl leading-tight">{product.name}</h3>
        <p className="mt-2 text-sm text-text-accent">{product.tagline}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
          {product.description}
        </p>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 text-sm uppercase tracking-widest text-text-primary transition group-hover:text-text-accent"
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
