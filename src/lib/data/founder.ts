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
    highlights: ["0→1 and scale-up", "Cross-functional alignment", "Metrics-led delivery"],
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
];

export const executiveQuotes = [
  {
    id: "q1",
    quote:
      "Debanjan brings product soul and execution velocity — he doesn't separate strategy from shipping.",
    attribution: "Growth lead · SaaS platform partner",
    context: "Mewayz ecosystem",
  },
  {
    id: "q2",
    quote:
      "Rare blend of narrative, systems thinking, and hands-on leadership across security and community movements.",
    attribution: "Advisor · Cyber readiness initiative",
    context: "PhantomX launch",
  },
  {
    id: "q3",
    quote:
      "He frames ventures as movements, not slide decks — and still owns the roadmap Monday morning.",
    attribution: "Founder · Venture studio collaborator",
    context: "Orcrys portfolio",
  },
] as const;
