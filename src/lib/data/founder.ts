import { CONTACT } from "@/lib/data/contact";
import type { InquiryType } from "@/config/site";

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
  monogram: string;
  duration: string;
  recommended?: boolean;
};

export type ExecutiveQuote = {
  id: string;
  quote: string;
  attribution: string;
  context?: string;
  title?: string;
  photoUrl?: string;
  companyLogo?: string;
};

export type VenturePartner = {
  name: string;
  href: string;
  logoUrl?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const leadershipTimeline: TimelineEntry[] = [
  {
    id: "mewayz",
    period: "2025 — Present",
    title: "Chief Product Officer",
    org: "Mewayz",
    description:
      "Product vision for a unified no-code business OS — CRM, HR, payments, marketplace, and 150+ modules in one platform.",
    href: "https://mewayz.com/",
  },
  {
    id: "phantomx",
    period: "2025 — Present",
    title: "Co-founder & CEO",
    org: "PhantomX",
    description:
      "Gamified cyber readiness — AI defense, human-firewall training, and mobile security at national scale.",
    href: "https://www.phantomx.tech/",
  },
  {
    id: "orcrys",
    period: "2024 — Present",
    title: "Founder",
    org: "Orcrys",
    description:
      "Venture studio building AI-native products across education, creator economy, and digital infrastructure.",
    href: "https://orcrys.com/",
  },
  {
    id: "veerangana",
    period: "2024 — Present",
    title: "Founder",
    org: "Veerangana",
    description:
      "AI-powered women's safety wearable — SOS, GPS, biometrics, and threat-aware hardware prototyping.",
  },
  {
    id: "ngsaa",
    period: "2025",
    title: "Chief Marketing Officer",
    org: "NGSAA — AI Nation",
    description:
      "Brand narrative, global outreach, and citizen acquisition for a sovereign AI nation initiative.",
  },
];

export const engagementOfferings: EngagementOffering[] = [
  {
    id: "product",
    title: "Product leadership",
    description:
      "Interim or full-time CPO scope — roadmap, team build-out, and shipping category-defining platforms.",
    inquiryType: "Product Leadership",
    monogram: "PL",
    duration: "3–12 months · full-time or fractional",
    recommended: true,
    highlights: ["0→1 and scale-up", "Cross-functional alignment", "Metrics-led delivery"],
  },
  {
    id: "venture",
    title: "Venture & GTM partnership",
    description:
      "Co-build with Orcrys portfolio companies or advise founders on product, brand, and growth systems.",
    inquiryType: "Venture Partnership",
    monogram: "VP",
    duration: "6–18 months · advisory or co-build",
    highlights: ["Platform strategy", "Fundraising narrative", "Go-to-market design"],
  },
  {
    id: "advisory",
    title: "Speaking & advisory",
    description:
      "Keynotes, panels, and executive workshops on product, cybersecurity movements, and AI sovereignty.",
    inquiryType: "Speaking & Advisory",
    monogram: "SA",
    duration: "1 day – multi-week programs",
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
      "I aim to reply within 1–2 business days. For urgent matters, call or message using the phone number on this page.",
  },
  {
    id: "f4",
    question: "Where are you based?",
    answer: `Primary office: ${CONTACT.officeAddress}. I work with teams globally — remote-first with on-site visits when it accelerates outcomes.`,
  },
  {
    id: "f5",
    question: "Can investors or press reach out through this form?",
    answer:
      "Yes. Select “Venture Partnership” or “General Inquiry” and note press/investment in your message — we'll route it appropriately.",
  },
  {
    id: "f6",
    question: "Do you speak at conferences or run workshops?",
    answer:
      "Yes — keynotes and executive workshops on product leadership, platform strategy, cybersecurity movements, and AI ventures. Share event date, audience, and format via the contact form under “Speaking & Advisory”.",
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
      "Absolutely. Use the scheduling link on the contact page or email directly — a 20-minute intro call is usually the fastest path to alignment.",
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
      "Stakeholder interviews, market signals, and metric baselines — clarity on the problem worth solving.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Narrative, roadmap, and experience architecture — prototypes and alignment before heavy build.",
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "Ship in measurable increments — GTM, community, and iteration tied to outcomes investors and users care about.",
  },
] as const;

export const speakingTopics = [
  {
    id: "s1",
    title: "Building movements, not just products",
    description:
      "How cybersecurity, AI sovereignty, and community-led growth turn users into defenders and advocates.",
    format: "Keynote · 45–60 min",
  },
  {
    id: "s2",
    title: "The unified business OS",
    description:
      "Replacing SaaS sprawl with modular platforms — lessons from scaling Mewayz across 150+ modules.",
    format: "Workshop · Half-day",
  },
  {
    id: "s3",
    title: "Founder-grade product leadership",
    description:
      "CPO patterns for 0→1 and scale-up — narrative, metrics, and cross-functional velocity.",
    format: "Panel · Fireside",
  },
  {
    id: "s4",
    title: "AI, safety, and social impact",
    description:
      "Hardware + software ventures (Veerangana, NGSAA) — building trust at national scale.",
    format: "University · Startup forum",
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

export const venturePartners: VenturePartner[] = [
  { name: "Mewayz", href: "https://mewayz.com/", logoUrl: "/images/logos/mewayz.svg" },
  { name: "PhantomX", href: "https://www.phantomx.tech/", logoUrl: "/images/logos/phantomx.svg" },
  { name: "Orcrys", href: "https://orcrys.com/", logoUrl: "/images/logos/orcrys.svg" },
  { name: "Edquate", href: "https://edquate.com/", logoUrl: "/images/logos/edquate.svg" },
  { name: "Veerangana", href: "#products", logoUrl: "/images/logos/veerangana.svg" },
  { name: "NGSAA", href: "#products", logoUrl: "/images/logos/ngsaa.svg" },
];

export const executiveQuotes: ExecutiveQuote[] = [
  {
    id: "q1",
    quote:
      "Debanjan brings product soul and execution velocity — he doesn't separate strategy from shipping.",
    attribution: "Growth lead",
    title: "SaaS platform partner",
    context: "Mewayz ecosystem",
    companyLogo: "/images/logos/mewayz.svg",
  },
  {
    id: "q2",
    quote:
      "Rare blend of narrative, systems thinking, and hands-on leadership across security and community movements.",
    attribution: "Security advisor",
    title: "Cyber readiness initiative",
    context: "PhantomX launch",
    companyLogo: "/images/logos/phantomx.svg",
  },
  {
    id: "q3",
    quote:
      "He frames ventures as movements, not slide decks — and still owns the roadmap Monday morning.",
    attribution: "Studio founder",
    title: "Venture studio collaborator",
    context: "Orcrys portfolio",
    companyLogo: "/images/logos/orcrys.svg",
  },
];
