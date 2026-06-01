import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyGallery } from "@/components/work/CaseStudyGallery";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getSiteSettings,
  getWorkProjectBySlug,
  getWorkProjects,
} from "@/lib/data/fetch";
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
} from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/config";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  const projects = await getWorkProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([
    getSiteSettings(),
    getWorkProjectBySlug(slug),
  ]);

  if (!project) {
    return { title: "Project not found", robots: { index: false } };
  }

  const description = `${project.challenge} Services: ${project.services.join(", ")}.`;

  return buildPageMetadata({
    title: `${project.title} — ${project.category}`,
    description: description.slice(0, 160),
    path: `/work/${project.slug}`,
    image: project.coverImageUrl,
    imageAlt: `${project.title} — ${project.category} case study`,
    type: "article",
    publishedTime: `${project.year}-01-01`,
    keywords: [
      project.title,
      project.category,
      ...project.services,
      String(project.year),
    ],
  });
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([
    getSiteSettings(),
    getWorkProjectBySlug(slug),
  ]);

  if (!project) notFound();

  const schema = [
    buildCreativeWorkSchema(project, getSiteUrl()),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: project.title, path: `/work/${project.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <article className="section-padding pt-28">
        <nav aria-label="Breadcrumb">
          <Link
            href="/work"
            className="text-sm text-text-secondary hover:text-text-accent"
          >
            ← All work
          </Link>
        </nav>
        <header className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="text-h1 text-display">{project.title}</h1>
            <time
              className="text-text-secondary"
              dateTime={`${project.year}-01-01`}
            >
              {project.year}
            </time>
          </div>
          <p className="mt-2 text-text-secondary">{project.category}</p>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-text-accent"
            >
              See it live ↗
            </a>
          )}
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-text-secondary">
              Challenge
            </h2>
            <p className="mt-2">{project.challenge}</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest text-text-secondary">
              Services
            </h2>
            <ul className="mt-2 list-inside list-disc">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest text-text-secondary">
              Role
            </h2>
            <p className="mt-2">{project.role}</p>
          </div>
        </div>

        <CaseStudyGallery items={project.gallery} />
      </article>
      <ContactCTA settings={settings} />
    </>
  );
}
