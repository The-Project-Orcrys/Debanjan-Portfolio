"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME_SECTION_ANCHORS } from "@/config/site";
import { cn } from "@/lib/utils";

export function HomeSectionNav() {
  const [active, setActive] = useState<string>(HOME_SECTION_ANCHORS[0]?.id ?? "");

  useEffect(() => {
    const sections = HOME_SECTION_ANCHORS.map((a) =>
      document.getElementById(a.id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="border-b border-white/10 bg-bg-primary/80 backdrop-blur-md"
      aria-label="On this page"
    >
      <ul className="section-padding-compact flex list-none gap-2 overflow-x-auto p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HOME_SECTION_ANCHORS.map((item) => (
          <li key={item.id} className="shrink-0">
            <Link
              href={item.href}
              className={cn(
                "block rounded-full px-4 py-2 text-xs uppercase tracking-widest transition",
                active === item.id
                  ? "bg-white/10 text-text-accent"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
