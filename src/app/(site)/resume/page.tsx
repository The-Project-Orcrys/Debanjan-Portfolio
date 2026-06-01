import { ResumePageSection } from "@/components/resume/ResumePageSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/data/fetch";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getResumeUrl } from "@/lib/site/resume.server";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const resumeUrl = getResumeUrl();

  return buildPageMetadata({
    title: `Résumé — ${settings.firstName} ${settings.lastName}`,
    description: `Download the résumé of ${settings.siteTitle}, ${settings.role}. Product leadership, venture building, and growth.`,
    path: "/resume",
    ...(resumeUrl ? { image: settings.ogImageUrl } : {}),
  });
}

export default async function ResumePage() {
  const settings = await getSiteSettings();

  const schema = [
    buildWebPageSchema({
      name: `Résumé — ${settings.siteTitle}`,
      description: settings.metaDescription,
      path: "/resume",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Résumé", path: "/resume" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <ResumePageSection settings={settings} />
    </>
  );
}
