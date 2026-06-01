import { notFound } from "next/navigation";
import { WorkCaseStudyDetail } from "@/components/work/WorkCaseStudyDetail";
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
} from "@/lib/seo";
import { getSiteUrl } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo-metadata";

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
  const project = await getWorkProjectBySlug(slug);

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
      <WorkCaseStudyDetail project={project} />
      <ContactCTA settings={settings} />
    </>
  );
}
