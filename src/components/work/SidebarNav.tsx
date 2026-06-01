"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { WorkProject } from "@/types/content";

export function SidebarNav({ projects }: { projects: WorkProject[] }) {
  const [activeId, setActiveId] = useState<string | null>(projects[0]?.slug ?? null);

  useEffect(() => {
    const sections = document.querySelectorAll(".case-study");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <nav
      className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block"
      aria-label="Project navigation"
    >
      <ul className="space-y-3 text-sm">
        {projects.map((p) => (
          <li key={p.slug}>
            <a
              href={`#${p.slug}`}
              className={cn(
                "transition hover:text-text-accent",
                activeId === p.slug
                  ? "text-text-accent"
                  : "text-text-secondary",
              )}
            >
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
