import type { SiteSettings, WorkProject } from "@/types/content";
import { buildCanonical, getSiteUrl } from "@/lib/seo/config";

export function buildPersonSchema(settings: SiteSettings, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: settings.siteTitle,
    givenName: settings.firstName,
    familyName: settings.lastName,
    jobTitle: settings.role,
    worksFor: settings.company
      ? { "@type": "Organization", name: settings.company }
      : undefined,
    description: settings.metaDescription,
    url: siteUrl,
    email: settings.email,
    ...(settings.phone
      ? { telephone: settings.phone.replace(/\s/g, "") }
      : {}),
    ...(settings.officeAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.officeAddress,
            addressLocality: "Newtown, Kolkata",
            addressRegion: "West Bengal",
            postalCode: "700160",
            addressCountry: "IN",
          },
        }
      : {}),
    knowsAbout: [
      "Product Management",
      "Brand Consulting",
      "Growth Marketing",
      "Cybersecurity",
      "Strategic Planning",
    ],
    sameAs: settings.socialLinks.map((s) => s.url).filter(Boolean),
  };
}

export function buildWebSiteSchema(settings: SiteSettings, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: settings.siteTitle,
    description: settings.metaDescription,
    url: siteUrl,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#person` },
  };
}

export function buildProfessionalServiceSchema(
  settings: SiteSettings,
  siteUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.studioName || settings.siteTitle,
    description: settings.metaDescription,
    url: siteUrl,
    email: settings.email,
    ...(settings.phone
      ? { telephone: settings.phone.replace(/\s/g, "") }
      : {}),
    ...(settings.officeAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.officeAddress,
            addressLocality: "Newtown, Kolkata",
            addressRegion: "West Bengal",
            postalCode: "700160",
            addressCountry: "IN",
          },
        }
      : {}),
    areaServed: "Worldwide",
    serviceType: [
      "Brand Consulting",
      "Management Consulting",
      "Marketing Consulting",
      "Project Management",
      "Growth Marketing",
      "Business Consulting",
    ],
    provider: { "@id": `${siteUrl}/#person` },
  };
}

export function buildWorkListSchema(projects: WorkProject[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio projects",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/work/${p.slug}`,
      name: p.title,
    })),
  };
}

export function buildCreativeWorkSchema(project: WorkProject, siteUrl: string) {
  const pageUrl = `${siteUrl}/work/${project.slug}`;
  const image = project.coverImageUrl || project.gallery[0]?.imageUrl;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#creativework`,
    name: project.title,
    headline: project.title,
    description: project.challenge,
    url: pageUrl,
    dateCreated: `${project.year}-01-01`,
    creator: { "@id": `${siteUrl}/#person` },
    genre: project.category,
    keywords: project.services.join(", "),
    ...(project.liveUrl ? { isAccessibleForFree: true, url: project.liveUrl } : {}),
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: image,
            caption: `${project.title} portfolio preview`,
          },
        }
      : {}),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: buildCanonical(item.path),
    })),
  };
}

export function buildWebPageSchema(options: {
  name: string;
  description: string;
  path: string;
}) {
  const siteUrl = getSiteUrl();
  const url = buildCanonical(options.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: options.name,
    description: options.description,
    url,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
  };
}

export function buildContactPageSchema(settings: SiteSettings) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${settings.siteTitle}`,
    description: `Contact ${settings.siteTitle} at ${settings.email} — ${settings.phone ?? ""}. Office: ${settings.officeAddress ?? ""}`,
    url: buildCanonical("/contact"),
    mainEntity: { "@id": `${siteUrl}/#person` },
  };
}

/** @deprecated Use buildWorkListSchema — kept for layout compat */
export function buildCreativeWorkListSchema(
  projects: WorkProject[],
  siteUrl: string,
) {
  return buildWorkListSchema(projects, siteUrl);
}
