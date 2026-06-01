"use client";

import Link from "next/link";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { workCoverObjectPosition } from "@/lib/images";
import type { WorkProject } from "@/types/content";

export function CaseStudyBlock({
  project,
}: {
  project: WorkProject;
  index: number;
}) {
  return (
    <article
      id={project.slug}
      className="case-study scroll-mt-32 border-t border-white/10 py-12"
      aria-labelledby={`case-study-${project.slug}-title`}
    >
      <GlassPanel bordered className="overflow-hidden transition hover:border-text-accent/25">
        <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] lg:items-stretch">
          <Link
            href={`/work/${project.slug}`}
            className="group relative block min-h-[12rem] overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r"
            data-cursor="pointer"
          >
            <PortfolioImage
              src={project.coverImageUrl}
              alt={project.title}
              objectPosition={workCoverObjectPosition(project.slug)}
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 to-transparent lg:bg-gradient-to-r" />
            <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur-md">
              {project.category}
            </span>
          </Link>

          <div className="p-6 sm:p-8">
            <header>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2
                  id={`case-study-${project.slug}-title`}
                  className="text-h2 text-display"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-text-accent"
                    data-cursor="pointer"
                  >
                    {project.title}
                  </Link>
                </h2>
                <span className="text-text-secondary">{project.year}</span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{project.role}</p>

              {project.outcomes && project.outcomes.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {project.outcomes.map((o) => (
                    <li
                      key={o.label}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <span className="block text-lg font-medium tabular-nums text-text-accent">
                        {o.value}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-text-secondary">
                        {o.label}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </header>

            <p className="mt-6 line-clamp-3 text-text-secondary">{project.challenge}</p>

            <Link
              href={`/work/${project.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-text-accent transition hover:gap-3"
              data-cursor="pointer"
            >
              View case study
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </GlassPanel>
    </article>
  );
}
