"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { workCoverObjectPosition } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { WorkProject } from "@/types/content";

function hoverImage(project: WorkProject): string | null {
  const fromGallery = project.gallery.find(
    (item) => item.type === "image" && item.imageUrl,
  );
  if (fromGallery?.imageUrl && fromGallery.imageUrl !== project.coverImageUrl) {
    return fromGallery.imageUrl;
  }
  const second = project.gallery.find(
    (item, i) => i > 0 && item.type === "image" && item.imageUrl,
  );
  return second?.imageUrl ?? null;
}

export function FeaturedWorkCard({
  project,
  className,
}: {
  project: WorkProject;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const altImage = hoverImage(project);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;
    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const img = card.querySelector(".featured-work-card__cover");
      if (!img) return;
      ctx = gsap.context(() => {
        gsap.to(img, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }, card);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <article ref={cardRef} className={cn("group flex min-w-0 w-full", className)}>
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/15 bg-bg-secondary shadow-[0_12px_40px_-16px_rgba(0,0,0,0.65)] ring-1 ring-white/10 transition hover:border-text-accent/45 hover:shadow-[var(--shadow-glow)]"
        data-cursor="pointer"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]">
          <div className="featured-work-card__cover absolute inset-0">
            <PortfolioImage
              src={project.coverImageUrl}
              alt={project.title}
              objectPosition={workCoverObjectPosition(project.slug)}
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          {altImage ? (
            <PortfolioImage
              src={altImage}
              alt=""
              objectPosition={workCoverObjectPosition(project.slug)}
              className="object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent opacity-80 transition group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 z-[1] translate-y-2 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
            <p className="text-xs uppercase tracking-widest text-text-accent">
              {project.role}
            </p>
            {project.outcomes?.[0] ? (
              <p className="mt-1 text-sm font-medium text-text-primary">
                {project.outcomes[0].value} {project.outcomes[0].label.toLowerCase()}
              </p>
            ) : null}
          </div>
          <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/75 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-text-primary shadow-sm backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
            {project.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col border-t border-white/10 bg-bg-elevated p-4 sm:p-5">
          <p className="text-xs tabular-nums text-[#a8a8a8]">{project.year}</p>
          <h3 className="text-display mt-1 text-base leading-snug text-text-primary sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-snug text-[#c8c4bc]">
            {project.challenge}
          </p>
          {project.outcomes?.[0] ? (
            <p className="mt-2 text-sm font-medium text-[#d8ccff] group-hover:hidden">
              {project.outcomes[0].value}{" "}
              {project.outcomes[0].label.toLowerCase()}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
