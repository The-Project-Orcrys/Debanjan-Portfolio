import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { WorkHero } from "@/components/work/WorkHero";
import { SidebarNav } from "@/components/work/SidebarNav";
import { WorkMobileNav } from "@/components/work/WorkMobileNav";
import { WorkProjectList } from "@/components/work/WorkProjectList";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings, getWorkProjects } from "@/lib/data/fetch";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  buildWorkListSchema,
} from "@/lib/seo/jsonld";
import { keywordsForWork } from "@/lib/seo/keywords";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/config";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const projects = await getWorkProjects();

  return buildPageMetadata({
    title: `Work — ${settings.siteTitle}`,
    description: `Explore ${projects.length} venture and leadership case studies by ${settings.siteTitle} — product, security, and growth at scale.`,
    path: "/work",
    keywords: keywordsForWork(settings),
  });
}

export default async function WorkPage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getWorkProjects(),
  ]);

  const siteUrl = getSiteUrl();
  const schema = [
    buildWebPageSchema({
      name: `Work — ${settings.siteTitle}`,
      description: `Portfolio case studies by ${settings.siteTitle}`,
      path: "/work",
    }),
    buildWorkListSchema(projects, siteUrl),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Work" },
        ]}
      />
      <WorkHero settings={settings} />
      <div className="section-padding grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
        <SidebarNav projects={projects} />
        <div className="min-w-0">
          <WorkMobileNav projects={projects} />
          <WorkProjectList projects={projects} />
        </div>
      </div>
      <section className="section-padding border-t border-white/10">
        <h2 className="text-display text-h1 max-w-3xl">
          If you&apos;re still here is for a good reason
        </h2>
        <p className="mt-4 text-text-secondary">
          I help make your vision clear, scalable, and impossible to ignore.
        </p>
      </section>
      <ContactCTA settings={settings} />
    </>
  );
}
