import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/fetch";
import { buildCanonical, getSiteUrl } from "@/lib/seo/config";
import { resolveOgImagePath } from "@/lib/site/og-image";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Relative path or absolute URL for OG/Twitter image */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
}

function resolveImageUrl(image?: string, siteUrl?: string) {
  const path = resolveOgImagePath(image);
  if (!siteUrl) return path;
  if (path === "/opengraph-image") return `${siteUrl}/opengraph-image`;
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function buildPageMetadata(
  options: PageMetadataOptions,
): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();
  const canonical = buildCanonical(options.path);
  const ogImage = resolveImageUrl(options.image ?? settings.ogImageUrl, siteUrl);
  const keywords = [
    ...(options.keywords ?? []),
    settings.role,
    settings.tagline,
    settings.firstName,
    settings.lastName,
    "founder portfolio",
    "CEO profile",
    "product leadership",
    "venture builder",
    "cybersecurity",
  ].filter(Boolean);

  const robots = options.noIndex
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      };

  return {
    title: options.title,
    description: options.description,
    keywords,
    authors: [{ name: settings.siteTitle, url: siteUrl }],
    creator: settings.siteTitle,
    publisher: settings.siteTitle,
    metadataBase: new URL(siteUrl),
    alternates: { canonical },
    robots,
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonical,
      siteName: settings.siteTitle,
      locale: "en_US",
      type: options.type ?? "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: options.imageAlt ?? `${settings.siteTitle} — ${options.title}`,
        },
      ],
      ...(options.publishedTime && options.type === "article"
        ? { publishedTime: options.publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [ogImage],
    },
    category: "technology",
  };
}

export async function buildRootMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();
  const ogImage = resolveImageUrl(settings.ogImageUrl, siteUrl);

  return {
    title: {
      default: `${settings.siteTitle} — ${settings.tagline}`,
      template: `%s | ${settings.siteTitle}`,
    },
    description: settings.metaDescription,
    applicationName: settings.siteTitle,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: siteUrl },
    authors: [{ name: settings.siteTitle, url: siteUrl }],
    creator: settings.siteTitle,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: `${settings.siteTitle} — ${settings.tagline}`,
      description: settings.metaDescription,
      url: siteUrl,
      siteName: settings.siteTitle,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${settings.siteTitle} portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteTitle,
      description: settings.metaDescription,
      images: [ogImage],
    },
    verification: {
      // Set in .env when available: google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
    },
  };
}
