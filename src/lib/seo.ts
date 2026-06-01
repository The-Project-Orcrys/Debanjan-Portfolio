/** Site URL helpers, SEO keywords, and JSON-LD schemas. */
import { FOUNDER } from "@/config/site";
import { defaultProducts } from "@/lib/data/static";
import type { SiteSettings, WorkProject } from "@/types/content";

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export function buildCanonical(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${getSiteUrl()}${normalized}`;
}

export const DEFAULT_OG_SIZE = { width: 1200, height: 630 } as const;

const BASE_KEYWORDS = [
  "founder",
  "CEO",
  "chief product officer",
  "product leadership",
  "venture builder",
  "growth strategy",
  "cybersecurity",
  "AI platforms",
] as const;

export function keywordsForHome(settings: SiteSettings): string[] {
  return [
    ...BASE_KEYWORDS,
    settings.siteTitle,
    settings.company ?? FOUNDER.company,
    "Mewayz",
    "PhantomX",
    "Edquate",
    settings.location,
  ].filter(Boolean) as string[];
}

export function keywordsForAbout(settings: SiteSettings): string[] {
  return [
    ...BASE_KEYWORDS,
    "about",
    "executive bio",
    "leadership philosophy",
    settings.role,
    settings.siteTitle,
  ];
}

export function keywordsForWork(settings: SiteSettings): string[] {
  return [
    ...BASE_KEYWORDS,
    "case studies",
    "portfolio",
    "product strategy",
    "brand consulting",
    settings.siteTitle,
  ];
}

export function keywordsForContact(settings: SiteSettings): string[] {
  return [
    ...BASE_KEYWORDS,
    "contact",
    "hire CEO",
    "advisory",
    settings.email,
    "Kolkata",
  ];
}

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
    sameAs: [
      ...new Set([
        ...settings.socialLinks.map((s) => s.url).filter(Boolean),
        ...defaultProducts.map((p) => p.url),
      ]),
    ],
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

export function buildFaqPageSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

/** @deprecated Use buildWorkListSchema */
export function buildCreativeWorkListSchema(
  projects: WorkProject[],
  siteUrl: string,
) {
  return buildWorkListSchema(projects, siteUrl);
}
