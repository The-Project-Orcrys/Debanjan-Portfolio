/**
 * Site-wide constants — single source for navigation, founder positioning, and UI copy.
 * Content overrides still come from Sanity via `src/lib/data/fetch.ts` when configured.
 */

export const ROUTES = {
  home: "/",
  about: "/about",
  work: "/work",
  contact: "/contact",
  products: "/#products",
  studio: "/studio",
} as const;

export const NAV_LINKS = [
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.work, label: "Work" },
  { href: ROUTES.contact, label: "Contact" },
] as const;

export const FOUNDER = {
  brand: "Debanjan Sandhaki",
  headline: "Founder · CPO · CEO",
  company: "Orcrys",
  ventures: ["Mewayz", "PhantomX", "Edquate", "Veerangana"],
} as const;

export const HERO = {
  cycleWords: ["build", "scale", "lead"] as const,
  stats: {
    yearsLabel: "Years leading product",
    venturesLabel: "Live ventures",
    reachLabel: "Remote & on-site",
  },
} as const;

/** Contact form — executive / partnership inquiry types */
export const INQUIRY_TYPES = [
  "Product Leadership",
  "Venture Partnership",
  "Brand & Marketing",
  "Cybersecurity",
  "Social Impact",
  "Business Consulting",
  "Growth & Sales",
  "Speaking & Advisory",
  "General Inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const SECTION_COPY = {
  services: {
    eyebrow: "Executive focus",
    title: "How I partner with founders and enterprises",
  },
  products: {
    eyebrow: "Products & ventures",
    title: "Platforms I build and lead",
  },
  work: {
    scrollHint: "Or keep scrolling for more",
    browse: "Browse case studies",
  },
} as const;
