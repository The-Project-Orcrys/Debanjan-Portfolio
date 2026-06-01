import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FolderCTA } from "@/components/home/FolderCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { PhotoCollage } from "@/components/home/PhotoCollage";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ValueProps } from "@/components/home/ValueProps";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  collageItems,
  defaultShapes,
  defaultValueProps,
} from "@/lib/data/defaults";
import {
  getAbout,
  getFeaturedServices,
  getServices,
  getSiteSettings,
  getWorkProjects,
} from "@/lib/data/fetch";
import { keywordsForHome } from "@/lib/seo/keywords";
import { buildWebPageSchema } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const meta = await buildPageMetadata({
    title: settings.siteTitle,
    description: settings.metaDescription,
    path: "/",
    keywords: keywordsForHome(settings),
    image: settings.ogImageUrl ?? "/images/og.jpg",
    imageAlt: `${settings.siteTitle} — ${settings.tagline}`,
  });

  return {
    ...meta,
    title: {
      absolute: `${settings.siteTitle} — ${settings.tagline}`,
    },
  };
}

export default async function HomePage() {
  const [settings, allServices, about, projects] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAbout(),
    getWorkProjects(),
  ]);
  const services = getFeaturedServices(allServices);

  const webPageSchema = buildWebPageSchema({
    name: `${settings.siteTitle} — Home`,
    description: settings.metaDescription,
    path: "/",
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <HeroSection settings={settings} shapes={defaultShapes} />
      <ServicesSection services={services} />
      <ProductsSection />
      <FolderCTA projects={projects} />
      <AboutTeaser photoUrl={about.photoUrl} />
      <ValueProps items={defaultValueProps} />
      <PhotoCollage items={[...collageItems]} />
      <ContactCTA settings={settings} />
    </>
  );
}
