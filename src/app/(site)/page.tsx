import { AboutTeaser } from "@/components/home/AboutTeaser";
import { EngagementSection } from "@/components/home/EngagementSection";
import { FolderCTA } from "@/components/home/FolderCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeSectionNav } from "@/components/home/HomeSectionNav";
import { ImpactMetricsStrip } from "@/components/home/ImpactMetricsStrip";
import { LeadershipTimeline } from "@/components/home/LeadershipTimeline";
import { NewsHighlights } from "@/components/home/NewsHighlights";
import { PhotoCollage } from "@/components/home/PhotoCollage";
import { ProductsSection } from "@/components/home/ProductsSection";
import { RecognitionStrip } from "@/components/home/RecognitionStrip";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
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
  getUpdates,
  getWorkProjects,
} from "@/lib/data/fetch";
import { keywordsForHome } from "@/lib/seo/keywords";
import { buildWebPageSchema } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCalendarUrl } from "@/lib/site/calendar";
import { getResumeUrl } from "@/lib/site/resume.server";
import { getSiteUrl } from "@/lib/seo/config";

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
  const [settings, allServices, about, projects, updates] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAbout(),
    getWorkProjects(),
    getUpdates(),
  ]);
  const services = getFeaturedServices(allServices);
  const [resumeUrl, calendarUrl] = [getResumeUrl(), getCalendarUrl()];
  const siteUrl = getSiteUrl();

  const webPageSchema = buildWebPageSchema({
    name: `${settings.siteTitle} — Home`,
    description: settings.metaDescription,
    path: "/",
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <HeroSection
        settings={settings}
        shapes={defaultShapes}
        resumeUrl={resumeUrl}
        calendarUrl={calendarUrl}
        shareUrl={siteUrl}
      />
      <HomeSectionNav />
      <ImpactMetricsStrip />
      <EngagementSection />
      <ServicesSection services={services} />
      <ProductsSection />
      <FolderCTA projects={projects} />
      <LeadershipTimeline />
      <AboutTeaser photoUrl={about.photoUrl} />
      <ValueProps items={defaultValueProps} />
      <NewsHighlights updates={updates} />
      <RecognitionStrip />
      <TestimonialsStrip />
      <PhotoCollage items={[...collageItems]} />
      <ContactCTA settings={settings} />
    </>
  );
}
