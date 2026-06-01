import { AboutHero } from "@/components/about/AboutHero";
import { AwardsBoard } from "@/components/about/AwardsBoard";
import { BioSection } from "@/components/about/BioSection";
import { SkillsStrip } from "@/components/about/SkillsStrip";
import { UpdatesSection } from "@/components/about/UpdatesSection";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAbout,
  getRecognitions,
  getSiteSettings,
  getUpdates,
} from "@/lib/data/fetch";
import { CONTACT } from "@/lib/data/contact";
import { keywordsForAbout } from "@/lib/seo/keywords";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const [settings, about] = await Promise.all([
    getSiteSettings(),
    getAbout(),
  ]);

  const description = [about.whoIAm[0], `Based in ${CONTACT.officeShort}.`]
    .filter(Boolean)
    .join(" ");

  return buildPageMetadata({
    title: `About ${settings.firstName} ${settings.lastName}`,
    description: description.slice(0, 160),
    path: "/about",
    keywords: keywordsForAbout(settings),
  });
}

export default async function AboutPage() {
  const [settings, about, recognitions, updates] = await Promise.all([
    getSiteSettings(),
    getAbout(),
    getRecognitions(),
    getUpdates(),
  ]);

  const schema = [
    buildWebPageSchema({
      name: `About ${settings.siteTitle}`,
      description: settings.metaDescription,
      path: "/about",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <AboutHero settings={settings} location={about.location} />
      <BioSection about={about} />
      <SkillsStrip settings={settings} />
      <AwardsBoard items={recognitions} />
      <UpdatesSection items={updates} />
      <ContactCTA settings={settings} />
    </>
  );
}
