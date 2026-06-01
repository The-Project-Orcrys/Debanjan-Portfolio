"use client";

import { cn } from "@/lib/utils";
import type { WorkProject } from "@/types/content";

export function WorkMobileNav({ projects }: { projects: WorkProject[] }) {
  return (
    <nav
      className="work-mobile-nav -mx-[var(--section-x)] mb-10 lg:hidden"
      aria-label="Jump to project"
    >
      <div className="flex gap-2 overflow-x-auto px-[var(--section-x)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            className={cn(
              "shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm",
              "transition active:scale-[0.98] hover:border-text-accent/40 hover:text-text-accent",
            )}
          >
            {p.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
