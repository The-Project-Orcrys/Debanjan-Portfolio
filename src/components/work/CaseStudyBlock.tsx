import Link from "next/link";
import { CaseStudyGallery } from "@/components/work/CaseStudyGallery";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
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
      className="case-study scroll-mt-32 border-t border-white/10 py-20"
      aria-labelledby={`case-study-${project.slug}-title`}
    >
      <ScrollReveal>
        <header>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              id={`case-study-${project.slug}-title`}
              className="text-h2 text-display"
            >
              <Link
                href={`/work/${project.slug}`}
                className="hover:text-text-accent"
              >
                {project.title}
              </Link>
            </h2>
            <span className="text-text-secondary">{project.year}</span>
          </div>
          <p className="mt-2 text-text-secondary">{project.category}</p>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-text-accent"
            >
              See it live ↗
            </Link>
          )}
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-text-secondary">
              Challenge
            </h3>
            <p className="mt-2">{project.challenge}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-text-secondary">
              Services
            </h3>
            <ul className="mt-2 list-inside list-disc">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-text-secondary">
              Role
            </h3>
            <p className="mt-2">{project.role}</p>
          </div>
        </div>

        <CaseStudyGallery items={project.gallery} />
      </ScrollReveal>
    </article>
  );
}
