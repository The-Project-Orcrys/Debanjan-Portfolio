"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FeaturedWorkCard } from "@/components/home/FeaturedWorkCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import { motionPresets } from "@/lib/motionPresets";
import type { WorkProject } from "@/types/content";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionPresets.ease.out },
  },
};

function gridItemClass(index: number, count: number) {
  if (count !== 5) return "";
  if (index < 3) return "lg:col-span-4";
  if (index === 3) return "lg:col-span-4 lg:col-start-3";
  return "lg:col-span-4 lg:col-start-7";
}

export function FeaturedWorkStrip({ projects }: { projects: WorkProject[] }) {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 5);

  if (featured.length === 0) return null;

  const useThreeTwo = featured.length === 5;

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
          className="shrink-0 text-sm uppercase tracking-widest text-text-secondary underline-offset-4 hover:text-text-accent hover:underline"
          data-cursor="pointer"
        >
          All projects →
        </Link>
      </div>

      <motion.div
        className={cn(
          "featured-work-grid mt-8 grid w-full gap-5 sm:grid-cols-2 sm:gap-5",
          useThreeTwo ? "lg:grid-cols-12 lg:gap-6" : "lg:grid-cols-4 lg:gap-6",
        )}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
      >
        {featured.map((project, i) => (
          <motion.div
            key={project._id}
            variants={cardVariants}
            className={cn(
              useThreeTwo && gridItemClass(i, featured.length),
              featured.length === 5 &&
                i === 4 &&
                "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-4 lg:col-start-7 lg:max-w-none",
            )}
          >
            <FeaturedWorkCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
