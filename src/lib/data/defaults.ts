import { assets } from "@/lib/data/assets";
import { CONTACT } from "@/lib/data/contact";
import type {
  AboutSection,
  RecognitionItem,
  ServiceBlock,
  ShapeConfig,
  SiteSettings,
  UpdateItem,
  ValueProp,
  WorkProject,
} from "@/types/content";

const media = (
  key: string,
  imageUrl: string,
  alt: string,
  span: "half" | "full" | "third" = "half",
) => ({
  _key: key,
  type: "image" as const,
  imageUrl,
  alt,
  span,
});

export const defaultSiteSettings: SiteSettings = {
  siteTitle: "Debanjan Sandhaki",
  firstName: "Debanjan",
  lastName: "Sandhaki",
  tagline: "Founder · CPO · CEO",
  company: "Orcrys",
  role: "Chief Product Officer & Growth Leader",
  roleSecondary: "Platforms · Security · Movements",
  yearsExperience: 6,
  email: CONTACT.email,
  phone: CONTACT.phone,
  officeAddress: CONTACT.officeAddress,
  metaDescription:
    "Debanjan Sandhaki — Founder and executive leader at Orcrys. CPO at Mewayz, CEO at PhantomX, founder of Veerangana. Product strategy, venture building, and growth leadership for modern businesses.",
  socialLinks: [
    {
      label: "in",
      url: CONTACT.linkedinUrl,
      fullName: "LinkedIn",
    },
    { label: "x", url: "https://x.com/debanjansandhaki", fullName: "X" },
  ],
  availabilityNote: "Open to strategic partnerships & executive advisory",
  stackItems: [
    "Product Strategy",
    "GTM & Growth",
    "AI Platforms",
    "Cybersecurity",
    "No-Code SaaS",
    "Community Building",
  ],
  studioName: "Orcrys Technologies",
  studioNote: "Building intelligent ventures",
  location: `${CONTACT.officeShort} · working globally (Remote)`,
  footerVideoUrl: "/videos/footer-texture.mp4",
  ogImageUrl: "/images/og.jpg",
};

export const defaultShapes: ShapeConfig[] = [
  { id: "s1", type: "pill", color: "grey", size: 120, top: "12%", left: "8%", parallaxSpeed: 0.2, rotationOffset: 12 },
  { id: "s2", type: "circle", color: "blue", size: 80, top: "25%", left: "75%", parallaxSpeed: 0.5, rotationOffset: -8 },
  { id: "s3", type: "hexagon", color: "grey", size: 100, top: "55%", left: "15%", parallaxSpeed: 0.35, rotationOffset: 20 },
  { id: "s4", type: "square", color: "blue", size: 64, top: "70%", left: "82%", parallaxSpeed: 0.65, rotationOffset: 45 },
  { id: "s5", type: "circle", color: "grey", size: 48, top: "8%", left: "55%", parallaxSpeed: 0.3, rotationOffset: 0 },
  { id: "s6", type: "pill", color: "blue", size: 90, top: "45%", left: "88%", parallaxSpeed: 0.45, rotationOffset: -15 },
  { id: "s7", type: "square", color: "grey", size: 56, top: "78%", left: "42%", parallaxSpeed: 0.55, rotationOffset: 10 },
];

export const defaultServices: ServiceBlock[] = [
  {
    _id: "svc-1",
    title: "Brand Consulting",
    description:
      "Positioning, narrative, and identity systems that make your brand impossible to ignore.",
    order: 0,
    featuredOnHome: true,
    mediaItems: [
      media("m1", assets.services.brand, "Brand strategy"),
      media("m2", assets.work.cover("ngsaa-ai-nation"), "NGSAA — AI Nation brand"),
      media("m3", assets.work.cover("mewayz"), "Mewayz platform"),
    ],
  },
  {
    _id: "svc-2",
    title: "Management Consulting",
    description:
      "Operating models, team alignment, and execution frameworks for scaling organizations.",
    order: 1,
    featuredOnHome: true,
    mediaItems: [
      media("m4", assets.services.management, "Management consulting"),
      media("m5", assets.work.cover("phantomx"), "PhantomX operations"),
    ],
  },
  {
    _id: "svc-3",
    title: "Marketing Consulting",
    description:
      "Go-to-market strategy, funnel design, and campaigns that convert attention into revenue.",
    order: 2,
    featuredOnHome: true,
    mediaItems: [
      media("m6", assets.services.marketing, "Marketing consulting"),
      media("m7", assets.work.cover("ngsaa-ai-nation"), "Global outreach campaigns"),
    ],
  },
  {
    _id: "svc-4",
    title: "Project Management",
    description:
      "End-to-end delivery leadership — from roadmap to launch with clarity and velocity.",
    order: 3,
    featuredOnHome: true,
    mediaItems: [
      media("m8", assets.services.project, "Project management"),
      media("m9", assets.work.cover("veerangana"), "Veerangana product delivery"),
    ],
  },
  {
    _id: "svc-5",
    title: "Growth Marketing",
    description:
      "Acquisition loops, referral engines, and community-led growth for B2B and B2C products.",
    order: 4,
    featuredOnHome: true,
    mediaItems: [
      media("m10", assets.services.growth, "Growth marketing"),
      media("m11", assets.work.cover("phantomx"), "PhantomX community growth"),
    ],
  },
  {
    _id: "svc-6",
    title: "Strategic Planning",
    description:
      "Long-range vision, OKRs, and strategic narratives that align teams and investors.",
    order: 5,
    featuredOnHome: true,
    mediaItems: [
      media("m12", assets.services.strategic, "Strategic planning"),
      media("m13", assets.work.cover("mewayz"), "Mewayz product strategy"),
    ],
  },
  {
    _id: "svc-7",
    title: "Executive Administrative Assistance",
    description:
      "High-trust support for founders and executives — calendars, stakeholders, and priorities handled.",
    order: 6,
    featuredOnHome: false,
    mediaItems: [media("m11", assets.services.management, "Executive support")],
  },
  {
    _id: "svc-8",
    title: "Business Consulting",
    description:
      "Business model design, partnerships, and GTM for startups and growth-stage companies.",
    order: 7,
    featuredOnHome: false,
    mediaItems: [
      media("m14", assets.services.brand, "Business consulting"),
      media("m15", assets.services.strategic, "Consulting"),
    ],
  },
  {
    _id: "svc-9",
    title: "Human Resources (HR)",
    description:
      "Talent strategy, culture programs, and people operations for fast-moving teams.",
    order: 8,
    featuredOnHome: false,
    mediaItems: [
      media("m16", assets.services.management, "HR"),
      media("m17", assets.work.cover("art-of-living"), "Community & culture programs"),
    ],
  },
  {
    _id: "svc-10",
    title: "Customer Service",
    description:
      "Support systems, playbooks, and experience design that turn users into advocates.",
    order: 9,
    featuredOnHome: false,
    mediaItems: [
      media("m18", assets.services.marketing, "Customer success"),
      media("m19", assets.work.cover("qnet"), "Customer engagement"),
    ],
  },
];

export const defaultValueProps: ValueProp[] = [
  {
    title: "Product craft",
    text: "I architect product experiences driven by user psychology, behavioral science, and obsessive UI/UX craft.",
  },
  {
    title: "Radical simplicity",
    text: "I eliminate tech overwhelm with plug-and-play simplicity — whether for solo creators or scaling teams.",
  },
  {
    title: "Movements, not features",
    text: "I build movements, not just products — from cybersecurity armies to AI nations to safety tech for women.",
  },
  {
    title: "Strategy that scales",
    text: "I align strategy, narrative, and execution so your brand scales with soul, speed, and measurable impact.",
  },
];

export const defaultAbout: AboutSection = {
  location: defaultSiteSettings.location,
  photoUrl: assets.about.portrait,
  whoIAm: [
    "I'm Debanjan Sandhaki — a product and growth leader building category-defining platforms at the intersection of AI, security, and human potential.",
    "As CPO at Mewayz Global Corporation, I lead product vision for a unified no-code business OS. As CEO of PhantomX, I'm scaling a gamified mobile security movement for 800M+ users. I've also founded Veerangana, an AI-powered women's safety wearable, and served as CMO for NGSAA's AI Nation initiative.",
    "My background spans BCA at the University of Engineering & Management (Kolkata), chemistry honors at Maulana Azad College, and years of community leadership with the Art of Living Foundation — blending technical depth with purpose-driven execution.",
  ],
  approach: [
    "I start with the user: behavior, friction, and emotional loyalty. Every feature should feel magical, personal, and scalable. From rapid prototyping to narrative-led GTM, I lead teams through agile iteration obsessed with outcomes — not vanity metrics.",
  ],
  philosophy: [
    "Build companies with soul, speed, and scale. Products should replace scattered tools, destroy complexity, and make business radically easier.",
    "Security and trust are not features — they are movements. Education, gamification, and community turn passive users into active defenders.",
    "Technology must serve human betterment — whether empowering entrepreneurs, protecting women, or democratizing AI sovereignty.",
  ],
};

export const defaultRecognitions: RecognitionItem[] = [
  { award: "Essay Writing Competition — 3rd Place (UEM)", count: 1 },
  { award: "X-Mind Coding Competition Certification (UEM)", count: 1 },
  { award: "Innovation & Entrepreneurship Cell — Core Member", count: 1 },
  { award: "Art of Living — Director of Volunteers (9+ years)", count: 1 },
];

export const defaultUpdates: UpdateItem[] = [
  {
    _id: "u1",
    number: 1,
    title: "Chief Product Officer at Mewayz",
    description:
      "Leading product vision for a category-defining platform unifying CRM, social, payments, booking, marketplace, automation, and more into one no-code ecosystem for modern business owners.",
    externalUrl: CONTACT.linkedinUrl,
    imageUrls: [assets.updates.mewayz, assets.updates.product],
  },
  {
    _id: "u2",
    number: 2,
    title: "PhantomX — The Rise of Human Firewalls",
    description:
      "Co-founded PhantomX to redefine mobile security with AI, behavior analytics, and gamified threat awareness — building India's largest user army against spyware and cyber fraud.",
    externalUrl: CONTACT.linkedinUrl,
    imageUrls: [assets.updates.phantomx],
  },
  {
    _id: "u3",
    number: 3,
    title: "Veerangana Alpha Prototype",
    description:
      "AI-powered SafetySmart Ring with SOS, GPS, biometrics, and threat detection — empowering women with an always-on guardian. Hardware prototyping in progress with patent filing underway.",
    externalUrl: CONTACT.linkedinUrl,
    imageUrls: [assets.updates.veerangana, assets.updates.prototype],
  },
];

function project(
  partial: Omit<WorkProject, "gallery" | "coverImageUrl"> & {
    galleryCount: number;
  },
): WorkProject {
  const { slug, title, galleryCount } = partial;
  const gallery: WorkProject["gallery"] = Array.from(
    { length: galleryCount },
    (_, i) => ({
      _key: `${slug}-${i}`,
      type: "image" as const,
      imageUrl: assets.work.gallery(slug, i + 1),
      alt: `${title} — image ${i + 1}`,
      span: i % 3 === 0 ? "full" : "half",
    }),
  );
  return {
    ...partial,
    gallery,
    coverImageUrl: assets.work.cover(slug),
  };
}

export const defaultWorkProjects: WorkProject[] = [
  project({
    _id: "p1",
    title: "Mewayz Global Corporation",
    slug: "mewayz",
    category: "Product Leadership",
    year: 2025,
    featured: true,
    liveUrl: "https://mewayz.com/",
    challenge:
      "Unify scattered business tools into a single addictive, no-code command center for entrepreneurs, creators, and service businesses — replacing complexity with plug-and-play scale.",
    services: [
      "Product Strategy",
      "UX Leadership",
      "Positioning & Narrative",
      "Agile Product Delivery",
    ],
    role: "Chief Product Officer · Full-time · Remote (Delaware, US)",
    order: 0,
    galleryCount: 6,
  }),
  project({
    _id: "p2",
    title: "PhantomX",
    slug: "phantomx",
    category: "Cybersecurity",
    year: 2025,
    featured: true,
    liveUrl: "https://www.phantomx.tech/",
    challenge:
      "Protect 800M+ mobile users in India from rising cyber threats with real-time AI defense, military-grade encryption, and a gamified human-firewall movement.",
    services: [
      "CEO Leadership",
      "Product Vision",
      "GTM & Community",
      "Partnership Development",
    ],
    role: "Co-founder & Chief Executive Officer · Full-time · Remote (Indore, India)",
    order: 1,
    galleryCount: 5,
  }),
  project({
    _id: "p3",
    title: "NGSAA — AI Nation",
    slug: "ngsaa-ai-nation",
    category: "Brand & Marketing",
    year: 2025,
    featured: true,
    challenge:
      "Position a sovereign AI Nation brand that inspires citizens, partners, and institutions — scaling global outreach, diplomacy, and citizen acquisition funnels.",
    services: [
      "Brand & Narrative",
      "Global Outreach",
      "Growth & Engagement",
      "Partnerships",
    ],
    role: "Chief Marketing Officer · Full-time · Remote (London, UK)",
    order: 2,
    galleryCount: 4,
  }),
  project({
    _id: "p4",
    title: "Veerangana",
    slug: "veerangana",
    category: "Social Impact",
    year: 2024,
    featured: true,
    challenge:
      "Revolutionize women's safety with AI-powered wearables that blend security, wellness, and style — from SOS and GPS to biometric threat detection.",
    services: [
      "Founder Leadership",
      "Product Strategy",
      "Hardware Prototyping",
      "Investor Relations",
    ],
    role: "Founder & CEO · Full-time · Kolkata, India",
    order: 3,
    galleryCount: 7,
  }),
  project({
    _id: "p5",
    title: "QNET Ltd",
    slug: "qnet",
    category: "Growth & Sales",
    year: 2024,
    featured: false,
    challenge:
      "Drive direct sales growth through relationship-led outreach, pipeline management, and performance-focused customer engagement.",
    services: ["Sales Management", "Growth Hacking", "Customer Engagement"],
    role: "Independent Sales Representative · Full-time · Kolkata, India",
    order: 4,
    galleryCount: 3,
  }),
  project({
    _id: "p6",
    title: "Veerangana Initiative",
    slug: "veerangana-initiative",
    category: "Academic Project",
    year: 2024,
    featured: false,
    challenge:
      "Build India's most trusted smart wearable for women's safety — integrating IoT, AI threat analysis, and privacy-first architecture with national showcase momentum.",
    services: [
      "Project Planning",
      "IoT Collaboration",
      "Patent Strategy",
      "Hackathon Leadership",
    ],
    role: "Project Lead · UEM, Kolkata",
    order: 5,
    galleryCount: 5,
  }),
  project({
    _id: "p7",
    title: "Encryption & Decryption",
    slug: "encryption-tool",
    category: "Academic Project",
    year: 2024,
    featured: false,
    challenge:
      "Secure digital communication with a Python cryptographic toolkit implementing AES, RSA, and SHA-256 for real-world messaging and cloud use cases.",
    services: [
      "Cryptography",
      "Python Development",
      "Secure Key Exchange",
      "UI Design",
    ],
    role: "Lead Developer · UEM, Kolkata",
    order: 6,
    galleryCount: 3,
  }),
  project({
    _id: "p8",
    title: "Art of Living — Volunteer Leadership",
    slug: "art-of-living",
    category: "Social Impact",
    year: 2017,
    featured: false,
    challenge:
      "Organize wellness and social impact at scale — meditation workshops, cleanliness drives, and youth programs reaching 1,500+ individuals across age groups.",
    services: [
      "Volunteer Management",
      "Event Leadership",
      "Community Outreach",
    ],
    role: "Director of Volunteers · Art of Living Foundation",
    order: 7,
    galleryCount: 3,
  }),
];

export const collagePhotos = [...assets.home.collage];

export const collageItems = [
  {
    src: assets.home.collage[0],
    label: "Product leadership",
    caption: "Ecospace, Kolkata — building platforms at scale",
    href: "/about",
  },
  {
    src: assets.home.collage[1],
    label: "In conversation",
    caption: "Strategy, narrative, and teams that execute",
    href: "/about",
  },
  {
    src: assets.home.collage[2],
    label: "On the ground",
    caption: "From boardrooms to community impact",
    href: "/about",
  },
] as const;
