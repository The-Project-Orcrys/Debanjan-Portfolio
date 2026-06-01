"use client";

import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GalleryLightbox } from "@/components/work/GalleryLightbox";
import type { WorkProject } from "@/types/content";

export function WorkCaseStudyDetail({ project }: { project: WorkProject }) {
  return (
    <article className="section-padding pt-28">
      <nav aria-label="Breadcrumb">
        <Link
          href="/work"
          className="text-sm text-text-secondary hover:text-text-accent"
          data-cursor="pointer"
        >
          ← All work
        </Link>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <header>
            <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
              {project.category}
            </p>
            <h1 className="text-h1 text-display mt-3">{project.title}</h1>
            <p className="prose-editorial mt-6 text-lg leading-relaxed text-text-secondary">
              {project.challenge}
            </p>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-text-accent"
                data-cursor="pointer"
              >
                See it live ↗
              </a>
            ) : null}
          </header>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-text-secondary">
                Services
              </h2>
              <ul className="mt-3 space-y-2 text-text-primary">
                {project.services.map((s) => (
                  <li key={s} className="flex gap-2 text-sm">
                    <span className="text-text-accent" aria-hidden>
                      —
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest text-text-secondary">
                Role
              </h2>
              <p className="mt-3 text-text-primary">{project.role}</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xs uppercase tracking-widest text-text-secondary">
              Gallery
            </h2>
            <GalleryLightbox items={project.gallery} className="mt-4" />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <GlassPanel strong bordered className="p-6">
            <p className="text-xs uppercase tracking-widest text-text-accent">
              At a glance
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-text-secondary">Year</dt>
                <dd className="mt-1 text-text-primary">{project.year}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Category</dt>
                <dd className="mt-1 text-text-primary">{project.category}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Role</dt>
                <dd className="mt-1 text-text-primary">{project.role}</dd>
              </div>
              {project.outcomes?.map((o) => (
                <div key={o.label}>
                  <dt className="text-text-secondary">{o.label}</dt>
                  <dd className="mt-1 text-lg font-medium tabular-nums text-text-accent">
                    {o.value}
                  </dd>
                </div>
              ))}
            </dl>
          </GlassPanel>
        </aside>
      </div>
    </article>
  );
}
