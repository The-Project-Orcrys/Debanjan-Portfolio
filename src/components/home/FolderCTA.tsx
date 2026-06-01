"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import { SECTION_COPY } from "@/config/site";
import type { WorkProject } from "@/types/content";

const folderFrontVariants = {
  rest: { rotateX: 0, y: 0 },
  hover: {
    rotateX: -22,
    y: -16,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const folderContentsVariants = {
  rest: { y: 0 },
  hover: { y: -14, transition: { duration: 0.35, delay: 0.04 } },
};

function pickFeaturedProjects(projects: WorkProject[], count = 3) {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  if (featured.length >= count) return featured.slice(0, count);

  const rest = projects
    .filter((p) => !featured.some((f) => f.slug === p.slug))
    .sort((a, b) => a.order - b.order);

  return [...featured, ...rest].slice(0, count);
}

export function FolderCTA({ projects }: { projects: WorkProject[] }) {
  const tabs = pickFeaturedProjects(projects, 3);

  return (
    <section
      className="section-padding-tight-bottom border-t border-white/10"
      aria-labelledby="work-folder-heading"
    >
      <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.25em] text-text-secondary">
            Selected work
          </p>
          <h2
            id="work-folder-heading"
            className="text-display mt-4 text-h2 leading-[1.08]"
          >
            Curious? Check out my{" "}
            <Link
              href="/work"
              className="text-text-accent underline decoration-text-accent/40 underline-offset-[0.2em]"
            >
              work
            </Link>
            .
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">
            Case studies across product leadership, cybersecurity, brand growth,
            and social impact — from Mewayz and PhantomX to Veerangana and beyond.
          </p>

          <ul className="mt-8 hidden flex-col gap-3 sm:flex">
            {tabs.map((project) => (
              <li key={project._id}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-3 transition hover:border-text-accent/40"
                >
                  <span className="text-sm text-text-primary transition group-hover:text-text-accent">
                    {project.title}
                  </span>
                  <span className="shrink-0 text-xs text-text-secondary">
                    {project.year} · {project.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/work"
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.15em] transition hover:border-text-accent hover:bg-text-accent/10"
          >
            View all projects
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </ScrollReveal>

        <div className="flex w-full justify-center lg:justify-end">
          <Link
            href="/work"
            className="group block w-full max-w-lg"
            aria-label="View portfolio work"
          >
            <motion.div
              className="relative mx-auto aspect-[5/4] w-full max-w-[min(100%,20rem)] [perspective:1200px] sm:max-w-md md:max-w-lg"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Folder back panel */}
              <div className="absolute inset-0 rounded-2xl bg-bg-elevated shadow-[var(--shadow-card)]" />

              {/* Folder tab */}
              <div className="absolute -top-3 left-8 z-10 h-8 w-28 rounded-t-lg border border-b-0 border-white/10 bg-bg-secondary px-4 pt-1.5 text-xs uppercase tracking-[0.2em] text-text-secondary">
                Work
              </div>

              {/* Project previews */}
              <motion.div
                variants={folderContentsVariants}
                className="absolute inset-x-5 top-10 z-[1] flex gap-3 sm:inset-x-6 sm:top-12 sm:gap-4"
              >
                {tabs.map((project, index) => (
                  <div
                    key={project._id}
                    className={cn(
                      "relative min-h-0 flex-1 overflow-hidden rounded-lg border border-white/10 bg-bg-primary shadow-lg",
                      "aspect-[3/4] sm:aspect-[4/5]",
                    )}
                    style={{
                      transform: `rotate(${(index - 1) * 3}deg) translateY(${index === 1 ? -4 : 0}px)`,
                    }}
                  >
                    <PortfolioImage
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 28vw, 180px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent p-3 pt-10">
                      <p className="line-clamp-2 text-xs font-medium leading-snug text-text-primary sm:text-sm">
                        {project.title}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Folder front flap */}
              <motion.div
                variants={folderFrontVariants}
                className="absolute inset-0 z-[2] origin-bottom rounded-2xl border border-white/10 bg-gradient-to-b from-bg-secondary/95 to-bg-secondary/70 backdrop-blur-[2px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-x-0 bottom-6 flex justify-center">
                  <span className="rounded-full border border-white/10 bg-bg-primary/80 px-4 py-2 text-xs uppercase tracking-widest text-text-secondary transition group-hover:border-text-accent/50 group-hover:text-text-accent">
                    Open folder
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary lg:text-left">
        {SECTION_COPY.work.scrollHint} ·{" "}
        <Link href="/work" className="underline underline-offset-4 hover:text-text-accent">
          {SECTION_COPY.work.browse}
        </Link>
      </p>
    </section>
  );
}
