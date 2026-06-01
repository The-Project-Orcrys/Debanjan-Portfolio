"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { WorkProject } from "@/types/content";

export function FeaturedWorkStrip({ projects }: { projects: WorkProject[] }) {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section
      id="work-preview"
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="work-preview-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
            Case studies
          </p>
          <h2 id="work-preview-heading" className="text-display mt-4 text-h2">
            Selected work
          </h2>
        </ScrollReveal>
        <Link
          href="/work"
          className="text-sm uppercase tracking-widest text-text-secondary underline-offset-4 hover:text-text-accent hover:underline"
        >
          All projects →
        </Link>
      </div>

      <div className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {featured.map((project, i) => (
          <motion.article
            key={project._id}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            className="group w-[min(85vw,320px)] shrink-0 snap-start sm:w-[300px]"
          >
            <Link
              href={`/work/${project.slug}`}
              className="block overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/30 transition hover:border-text-accent/35 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.coverImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-bg-primary/70 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs tabular-nums text-text-secondary">
                  {project.year}
                </p>
                <h3 className="text-display mt-1 text-lg leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                  {project.challenge}
                </p>
                {project.outcomes && project.outcomes[0] ? (
                  <p className="mt-3 text-sm text-text-accent">
                    {project.outcomes[0].value} {project.outcomes[0].label.toLowerCase()}
                  </p>
                ) : null}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
