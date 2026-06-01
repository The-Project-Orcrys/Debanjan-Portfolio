"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { workCoverObjectPosition } from "@/lib/images";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SECTION_COPY } from "@/config/site";
import type { WorkProject } from "@/types/content";

const FOLDER_PROJECT_SLUGS = [
  "mewayz",
  "phantomx",
  "ngsaa-ai-nation",
  "edquate",
  "orcrys",
] as const;

const FOLDER_IMAGE_FOCUS: Partial<
  Record<(typeof FOLDER_PROJECT_SLUGS)[number], string>
> = {
  mewayz: "50% 16%",
  phantomx: "62% 14%",
  "ngsaa-ai-nation": "50% 22%",
  edquate: "55% 32%",
  orcrys: "48% 18%",
};

/** Base fan rotation + extra spread on folder hover */
const CARD_TILT: Record<number, { rest: number; hover: number }> = {
  0: { rest: -5, hover: -10 },
  1: { rest: 0, hover: 0 },
  2: { rest: 5, hover: 10 },
  3: { rest: -4, hover: -8 },
  4: { rest: 4, hover: 8 },
};

function pickFolderProjects(projects: WorkProject[]) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  return FOLDER_PROJECT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is WorkProject => Boolean(p),
  );
}

function FolderWorkCard({
  project,
  cardIndex,
}: {
  project: WorkProject;
  cardIndex: number;
}) {
  const reducedMotion = useReducedMotion();
  const tilt = CARD_TILT[cardIndex] ?? { rest: 0, hover: 0 };
  const focus =
    FOLDER_IMAGE_FOCUS[
      project.slug as (typeof FOLDER_PROJECT_SLUGS)[number]
    ] ?? workCoverObjectPosition(project.slug);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="folder-work-card group/card block min-w-0"
      style={
        {
          "--card-tilt": `${tilt.rest}deg`,
          "--card-tilt-hover": `${tilt.hover}deg`,
        } as React.CSSProperties
      }
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={`View case study: ${project.title}`}
    >
      <motion.div
        className="folder-work-card__inner"
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        <div className="folder-work-card__media relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-bg-primary shadow-md">
          <PortfolioImage
            src={project.coverImageUrl}
            alt={project.title}
            objectPosition={focus}
            className="folder-work-card__img object-cover"
            sizes="(max-width: 768px) 28vw, 140px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-primary via-bg-primary/90 to-transparent px-2 pb-2 pt-7">
            <p className="line-clamp-2 text-[0.65rem] font-medium leading-snug text-text-primary sm:text-xs">
              {project.title}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

const folderFlapVariants = {
  rest: { rotateX: 0, y: 0, opacity: 1 },
  hover: {
    rotateX: -88,
    y: -6,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const folderContentsVariants = {
  rest: { y: 0 },
  hover: {
    y: -10,
    transition: { duration: 0.45, delay: 0.04, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function FolderCTA({ projects }: { projects: WorkProject[] }) {
  const tabs = pickFolderProjects(projects);
  const topRow = tabs.slice(0, 3);
  const bottomRow = tabs.slice(3, 5);

  return (
    <section
      className="section-padding-tight-bottom border-t border-white/10 !pt-[calc(var(--section-y-compact)+0.25rem)]"
      aria-labelledby="work-folder-heading"
    >
      <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
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
            and social impact — from Mewayz and PhantomX to Edquate, Orcrys,
            and beyond.
          </p>

          <ul className="mt-8 hidden flex-col gap-3 sm:flex">
            {tabs.map((project) => (
              <li key={project._id}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-3 transition hover:border-text-accent/40"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-sm text-text-primary transition group-hover:text-text-accent">
                      {project.title}
                    </span>
                    <span
                      className="inline-flex shrink-0 translate-x-[-4px] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-text-secondary transition group-hover:text-text-primary/80">
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

        <div className="-mt-2 flex w-full justify-center sm:-mt-4 lg:-mt-6 lg:justify-end">
          <motion.div
            className="folder-cta group/folder relative w-full max-w-md sm:max-w-lg lg:max-w-xl [perspective:1200px]"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <div className="folder-cta__shell relative overflow-hidden rounded-2xl border border-white/10">
              <div className="folder-cta__tab absolute -top-px left-6 z-20 sm:left-8">
                Work
              </div>

              <div className="folder-cta__pocket relative">
                <motion.div
                  variants={folderContentsVariants}
                  className="folder-cta__contents relative z-[1] px-3 pt-9 sm:px-4 sm:pt-10"
                >
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {topRow.map((project, i) => (
                      <FolderWorkCard
                        key={project._id}
                        project={project}
                        cardIndex={i}
                      />
                    ))}
                  </div>
                  <div className="mx-auto mt-2 grid max-w-[68%] grid-cols-2 gap-2 sm:mt-2.5 sm:gap-2.5">
                    {bottomRow.map((project, i) => (
                      <FolderWorkCard
                        key={project._id}
                        project={project}
                        cardIndex={i + 3}
                      />
                    ))}
                  </div>
                </motion.div>

                <div className="folder-cta__flap-zone relative z-[2] h-14 sm:h-16">
                  <motion.div
                    variants={folderFlapVariants}
                    className="folder-cta__flap pointer-events-none absolute inset-0 origin-bottom rounded-b-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                    aria-hidden
                  />
                  <Link
                    href="/work"
                    className="folder-cta__flap-label relative flex h-full items-center justify-center text-xs uppercase tracking-widest text-text-secondary transition hover:text-text-accent"
                    aria-label="View portfolio work"
                  >
                    <span className="relative grid place-items-center">
                      <span className="col-start-1 row-start-1 transition-opacity duration-300 group-hover/folder:opacity-0">
                        Open folder
                      </span>
                      <span
                        className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 group-hover/folder:opacity-100"
                        aria-hidden
                      >
                        Drop folder
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
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