/**
 * Static portfolio data - paths, contact, ventures, page copy.
 */
import type { InquiryType } from "@/config/site";
import type { Product, SiteSettings, SocialLink } from "@/types/content";

/**
 * Local image paths under public/images/.
 * Source photos live in public/images/source/ (from assests/).
 */

const base = "/images";

export const assets = {
  og: `${base}/og.jpg`,
  about: {
    portrait: `${base}/about/portrait.jpg`,
  },
  home: {
    collage: [
      `${base}/home/collage-1.jpg`,
      `${base}/home/collage-2.jpg`,
      `${base}/home/collage-3.jpg`,
    ] as const,
  },
  services: {
    brand: `${base}/services/brand-consulting.jpg`,
    management: `${base}/services/management-consulting.jpg`,
    marketing: `${base}/services/marketing-consulting.jpg`,
    project: `${base}/services/project-management.jpg`,
    growth: `${base}/services/growth-marketing.jpg`,
    strategic: `${base}/services/strategic-planning.jpg`,
  },
  work: {
    cover: (slug: string) => `${base}/work/${slug}/cover.jpg`,
    gallery: (slug: string, index: number) =>
      `${base}/work/${slug}/gallery-${String(index).padStart(2, "0")}.jpg`,
  },
  updates: {
    mewayz: `${base}/updates/mewayz.jpg`,
    product: `${base}/updates/product.jpg`,
    phantomx: `${base}/updates/phantomx.jpg`,
    veerangana: `${base}/updates/veerangana.jpg`,
    prototype: `${base}/updates/prototype.jpg`,
  },
  products: {
    orcrys: `${base}/products/orcrys.jpg`,
    mewayz: `${base}/products/mewayz.jpg`,
    mewayzIndia: `${base}/products/mewayz-india.jpg`,
    edquate: `${base}/products/edquate.jpg`,
    phantomx: `${base}/products/phantomx.jpg`,
  },
} as const;

/** Canonical contact details - used across defaults, UI, SEO, and Sanity merge. */
export const CONTACT = {
  email: "ceo@orcrys.com",
  linkedinUrl: "https://www.linkedin.com/in/debanjan-sandhaki-a02a5532a/",
  phone: "+91 85973 31075",
  officeAddress:
    "Rajarhat, Ecospace, 4A, 5TH Floor, Premises, AA II, Newtown, Kolkata, Chakpachuria, West Bengal 700160",
  officeShort: "Ecospace, Newtown, Kolkata - West Bengal 700160",
} as const;

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** WhatsApp deep link (India +91 numbers supported). */
export function whatsappHref(phone: string, prefilledMessage?: string) {
  const digits = phone.replace(/\D/g, "");
  if (!prefilledMessage) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(prefilledMessage)}`;
}

export function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function ensureLinkedIn(links: SocialLink[]): SocialLink[] {
  const rest = (links ?? []).filter((l) => l?.url && !l.url.includes("linkedin.com"));
  const existing = (links ?? []).find((l) => l?.url?.includes("linkedin.com"));
  const linkedIn: SocialLink = {
    label: existing?.label ?? "in",
    url: CONTACT.linkedinUrl,
    fullName: existing?.fullName ?? "LinkedIn",
  };
  return [linkedIn, ...rest];
}

/** Fill missing or outdated contact fields (e.g. partial Sanity documents). */
export function mergeSiteSettingsContact(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    company: settings.company?.trim() || "Orcrys",
    email: CONTACT.email,
    phone: settings.phone?.trim() || CONTACT.phone,
    officeAddress: settings.officeAddress?.trim() || CONTACT.officeAddress,
    location:
      settings.location?.trim() ||
      `${CONTACT.officeShort} - working globally (Remote)`,
    socialLinks: ensureLinkedIn(settings.socialLinks ?? []),
  };
}

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  org: string;
  description: string;
  href?: string;
};

export type EngagementOffering = {
  id: string;
  title: string;
  description: string;
  inquiryType: InquiryType;
  highlights: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const leadershipTimeline: TimelineEntry[] = [
  {
    id: "mewayz",
    period: "2025 - Present",
    title: "Chief Product Officer",
    org: "Mewayz",
    description:
      "Product vision for a unified no-code business OS - CRM, HR, payments, marketplace, and 150+ modules in one platform.",
    href: "https://mewayz.com/",
  },
  {
    id: "phantomx",
    period: "2025 - Present",
    title: "Co-founder & CEO",
    org: "PhantomX",
    description:
      "Gamified cyber readiness - AI defense, human-firewall training, and mobile security at national scale.",
    href: "https://www.phantomx.tech/",
  },
  {
    id: "orcrys",
    period: "2024 - Present",
    title: "Founder",
    org: "Orcrys",
    description:
      "Venture studio building AI-native products across education, creator economy, and digital infrastructure.",
    href: "https://orcrys.com/",
  },
  {
    id: "veerangana",
    period: "2024 - Present",
    title: "Founder",
    org: "Veerangana",
    description:
      "AI-powered women's safety wearable - SOS, GPS, biometrics, and threat-aware hardware prototyping.",
  },
  {
    id: "ngsaa",
    period: "2025",
    title: "Chief Marketing Officer",
    org: "NGSAA - AI Nation",
    description:
      "Brand narrative, global outreach, and citizen acquisition for a sovereign AI nation initiative.",
  },
];

export const engagementOfferings: EngagementOffering[] = [
  {
    id: "product",
    title: "Product leadership",
    description:
      "Interim or full-time CPO scope - roadmap, team build-out, and shipping category-defining platforms.",
    inquiryType: "Product Leadership",
    highlights: ["0?1 and scale-up", "Cross-functional alignment", "Metrics-led delivery"],
  },
  {
    id: "venture",
    title: "Venture & GTM partnership",
    description:
      "Co-build with Orcrys portfolio companies or advise founders on product, brand, and growth systems.",
    inquiryType: "Venture Partnership",
    highlights: ["Platform strategy", "Fundraising narrative", "Go-to-market design"],
  },
  {
    id: "advisory",
    title: "Speaking & advisory",
    description:
      "Keynotes, panels, and executive workshops on product, cybersecurity movements, and AI sovereignty.",
    inquiryType: "Speaking & Advisory",
    highlights: ["Leadership offsites", "University & startup forums", "Board-ready briefings"],
  },
];

export const contactFaq: FaqItem[] = [
  {
    id: "f1",
    question: "What kinds of engagements do you take on?",
    answer:
      "Product leadership (CPO/Head of Product), venture partnerships with Orcrys and allied brands, consulting on brand and growth, and selective speaking or advisory roles. Use the form to share scope, timeline, and budget.",
  },
  {
    id: "f2",
    question: "Are you open to full-time roles or only advisory?",
    answer:
      "Both. I'm actively leading at Mewayz and PhantomX while remaining open to strategic full-time leadership and high-impact advisory mandates that align with building movements, not just features.",
  },
  {
    id: "f3",
    question: "What is your typical response time?",
    answer:
      "I aim to reply within 1-2 business days. For urgent matters, call or message using the phone number on this page.",
  },
  {
    id: "f4",
    question: "Where are you based?",
    answer: `Primary office: ${CONTACT.officeAddress}. I work with teams globally - remote-first with on-site visits when it accelerates outcomes.`,
  },
  {
    id: "f5",
    question: "Can investors or press reach out through this form?",
    answer:
      "Yes. Select -Venture Partnership- or -General Inquiry- and note press/investment in your message - we'll route it appropriately.",
  },
  {
    id: "f6",
    question: "Do you speak at conferences or run workshops?",
    answer:
      "Yes - keynotes and executive workshops on product leadership, platform strategy, cybersecurity movements, and AI ventures. Share event date, audience, and format via the contact form under -Speaking & Advisory-.",
  },
  {
    id: "f7",
    question: "What budget ranges do you typically work with?",
    answer:
      "Scope varies from advisory retainers to full-time leadership. Include timeline, team size, and budget range in your message so we can respond with a tailored engagement model.",
  },
  {
    id: "f8",
    question: "Can we schedule a call before a formal proposal?",
    answer:
      "Absolutely. Use the scheduling link on the contact page or email directly - a 20-minute intro call is usually the fastest path to alignment.",
  },
];

export const impactMetrics = [
  {
    value: "150+",
    label: "Platform modules",
    detail: "Unified Mewayz business OS scope",
  },
  {
    value: "800M+",
    label: "Users in mission",
    detail: "PhantomX mobile security addressable market",
  },
  {
    value: "4",
    label: "Active ventures",
    detail: "Mewayz · PhantomX · Edquate · Orcrys",
  },
  {
    value: "1–2d",
    label: "Reply window",
    detail: "Typical response for partnership inquiries",
  },
] as const;

export const workProcess = [
  {
    step: "01",
    title: "Discover",
    description:
      "Stakeholder interviews, market signals, and metric baselines - clarity on the problem worth solving.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Narrative, roadmap, and experience architecture - prototypes and alignment before heavy build.",
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "Ship in measurable increments - GTM, community, and iteration tied to outcomes investors and users care about.",
  },
] as const;

export const speakingTopics = [
  {
    id: "s1",
    title: "Building movements, not just products",
    description:
      "How cybersecurity, AI sovereignty, and community-led growth turn users into defenders and advocates.",
    format: "Keynote - 45-60 min",
  },
  {
    id: "s2",
    title: "The unified business OS",
    description:
      "Replacing SaaS sprawl with modular platforms - lessons from scaling Mewayz across 150+ modules.",
    format: "Workshop - Half-day",
  },
  {
    id: "s3",
    title: "Founder-grade product leadership",
    description:
      "CPO patterns for 0?1 and scale-up - narrative, metrics, and cross-functional velocity.",
    format: "Panel - Fireside",
  },
  {
    id: "s4",
    title: "AI, safety, and social impact",
    description:
      "Hardware + software ventures (Veerangana, NGSAA) - building trust at national scale.",
    format: "University - Startup forum",
  },
] as const;

export const techStackGroups = [
  {
    category: "Product & design",
    items: ["Figma", "Notion", "Miro", "Linear", "Amplitude"],
  },
  {
    category: "Engineering & data",
    items: ["Next.js", "React", "TypeScript", "Sanity CMS", "PostHog"],
  },
  {
    category: "Growth & ops",
    items: ["HubSpot-style funnels", "Community loops", "OKRs", "Agile delivery"],
  },
  {
    category: "AI & security",
    items: ["LLM product design", "Threat modeling", "Mobile security UX", "No-code platforms"],
  },
] as const;

export const venturePartners = [
  { name: "Mewayz", href: "https://mewayz.com/" },
  { name: "PhantomX", href: "https://www.phantomx.tech/" },
  { name: "Orcrys", href: "https://orcrys.com/" },
  { name: "Edquate", href: "https://edquate.com/" },
  { name: "Veerangana", href: "#products" },
  { name: "NGSAA", href: "#products" },
] as const;

export const executiveQuotes = [
  {
    id: "q1",
    quote:
      "Debanjan brings product soul and execution velocity - he doesn't separate strategy from shipping.",
    attribution: "Growth lead - SaaS platform partner",
    context: "Mewayz ecosystem",
  },
  {
    id: "q2",
    quote:
      "Rare blend of narrative, systems thinking, and hands-on leadership across security and community movements.",
    attribution: "Advisor - Cyber readiness initiative",
    context: "PhantomX launch",
  },
  {
    id: "q3",
    quote:
      "He frames ventures as movements, not slide decks - and still owns the roadmap Monday morning.",
    attribution: "Founder - Venture studio collaborator",
    context: "Orcrys portfolio",
  },
] as const;

export const defaultProducts: Product[] = [
  {
    id: "orcrys",
    name: "Orcrys",
    tagline: "Intelligent systems & venture ecosystem",
    description:
      "Parent technology company building AI-powered ventures across education, creator economy, and digital infrastructure - home to Edquate, Glyphatic, and future platforms.",
    url: "https://orcrys.com/",
    category: "Venture Studio",
    imageUrl: assets.updates.product,
    order: 0,
  },
  {
    id: "mewayz",
    name: "Mewayz",
    tagline: "One platform. Replace your tools.",
    description:
      "Unified business OS with CRM, HR, payroll, accounting, projects, support, and 150+ modules - one login and a fraction of the cost of a fragmented SaaS stack.",
    url: "https://mewayz.com/",
    category: "Business Platform",
    imageUrl: assets.work.cover("mewayz"),
    order: 1,
  },
  {
    id: "mewayz-india",
    name: "Mewayz India",
    tagline: "Regional platform experience",
    description:
      "India-focused Mewayz experience - localized access to the same modular business platform for teams scaling operations in the region.",
    url: "https://inda.mewayz.com/",
    category: "Business Platform",
    imageUrl: assets.work.cover("mewayz"),
    order: 2,
  },
  {
    id: "edquate",
    name: "Edquate",
    tagline: "Your personal tutor for everything you learn",
    description:
      "AI learning platform with synced whiteboard tutoring, adaptive roadmaps, practice & mock exams, code lab, and career intelligence - an agent-native learning OS by Orcrys.",
    url: "https://edquate.com/",
    category: "EdTech - AI",
    imageUrl: assets.updates.product,
    order: 3,
  },
  {
    id: "phantomx",
    name: "PhantomX",
    tagline: "Cyber Readiness OS",
    description:
      "Gamified cybersecurity platform unifying prevention, AI-powered detection, and human readiness - training teams from fundamentals to advanced red-team scenarios.",
    url: "https://www.phantomx.tech/",
    category: "Cybersecurity",
    imageUrl: assets.work.cover("phantomx"),
    order: 4,
  },
].sort((a, b) => a.order - b.order);

/** Hero / footer chips - excludes regional sub-brands */
export const ventureQuickLinks = defaultProducts
  .filter((p) => p.id !== "mewayz-india")
  .map((p) => ({ label: p.name, href: p.url }));

