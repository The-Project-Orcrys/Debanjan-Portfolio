import { FOUNDER } from "@/config/site";
import type { SiteSettings } from "@/types/content";

const BASE = [
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
    ...BASE,
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
    ...BASE,
    "about",
    "executive bio",
    "leadership philosophy",
    settings.role,
    settings.siteTitle,
  ];
}

export function keywordsForWork(settings: SiteSettings): string[] {
  return [
    ...BASE,
    "case studies",
    "portfolio",
    "product strategy",
    "brand consulting",
    settings.siteTitle,
  ];
}

export function keywordsForContact(settings: SiteSettings): string[] {
  return [
    ...BASE,
    "contact",
    "hire CEO",
    "advisory",
    settings.email,
    "Kolkata",
  ];
}
