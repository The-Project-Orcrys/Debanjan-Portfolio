import { assets } from "@/lib/data/assets";
import type { Product } from "@/types/content";

export const defaultProducts: Product[] = [
  {
    id: "orcrys",
    name: "Orcrys",
    tagline: "Intelligent systems & venture ecosystem",
    description:
      "Parent technology company building AI-powered ventures across education, creator economy, and digital infrastructure — home to Edquate, Glyphatic, and future platforms.",
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
      "Unified business OS with CRM, HR, payroll, accounting, projects, support, and 150+ modules — one login and a fraction of the cost of a fragmented SaaS stack.",
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
      "India-focused Mewayz experience — localized access to the same modular business platform for teams scaling operations in the region.",
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
      "AI learning platform with synced whiteboard tutoring, adaptive roadmaps, practice & mock exams, code lab, and career intelligence — an agent-native learning OS by Orcrys.",
    url: "https://edquate.com/",
    category: "EdTech · AI",
    imageUrl: assets.updates.product,
    order: 3,
  },
  {
    id: "phantomx",
    name: "PhantomX",
    tagline: "Cyber Readiness OS",
    description:
      "Gamified cybersecurity platform unifying prevention, AI-powered detection, and human readiness — training teams from fundamentals to advanced red-team scenarios.",
    url: "https://www.phantomx.tech/",
    category: "Cybersecurity",
    imageUrl: assets.work.cover("phantomx"),
    order: 4,
  },
].sort((a, b) => a.order - b.order);

/** Hero / footer chips — excludes regional sub-brands */
export const ventureQuickLinks = defaultProducts
  .filter((p) => p.id !== "mewayz-india")
  .map((p) => ({ label: p.name, href: p.url }));
