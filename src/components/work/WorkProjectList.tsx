"use client";

import { useMemo, useState } from "react";
import { CaseStudyBlock } from "@/components/work/CaseStudyBlock";
import { cn } from "@/lib/utils";
import type { ProjectCategory, WorkProject } from "@/types/content";

export function WorkProjectList({ projects }: { projects: WorkProject[] }) {
  const categories = useMemo(() => {
    const set = new Set<ProjectCategory>();
    for (const p of projects) set.add(p.category);
    return ["All", ...Array.from(set)] as const;
  }, [projects]);

  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter case studies"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition",
              active === cat
                ? "border-text-accent bg-text-accent/10 text-text-accent"
                : "border-white/15 text-text-secondary hover:border-white/30 hover:text-text-primary",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mb-8 text-sm text-text-secondary">
        Showing {filtered.length} of {projects.length} case studies
      </p>

      {filtered.map((project, index) => (
        <CaseStudyBlock key={project._id} project={project} index={index} />
      ))}
    </>
  );
}
