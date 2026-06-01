/**
 * Seeds Sanity with Debanjan Sandhaki portfolio documents (text content).
 * Upload images in Studio or replace files under public/images/ when not using CMS.
 *
 * Usage: npm run seed:sanity
 */
import { createClient } from "@sanity/client";
import { CONTACT } from "./contact-data.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "placeholder" || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
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
    "Debanjan Sandhaki — Founder and executive leader at Orcrys. CPO at Mewayz, CEO at PhantomX, founder of Veerangana. Product strategy, venture building, and growth leadership.",
  location: "Ecospace, Newtown, Kolkata · working globally (Remote)",
  studioName: "Orcrys Technologies",
  studioNote: "Building intelligent ventures",
  footerVideoUrl: "/videos/footer-texture.mp4",
  stackItems: [
    "Product Strategy",
    "GTM & Growth",
    "AI Platforms",
    "Cybersecurity",
    "No-Code SaaS",
    "Community Building",
  ],
  socialLinks: [
    {
      label: "in",
      url: CONTACT.linkedinUrl,
      fullName: "LinkedIn",
    },
    {
      label: "x",
      url: "https://x.com/debanjansandhaki",
      fullName: "X",
    },
  ],
};

const services = [
  {
    title: "Brand Consulting",
    description:
      "Positioning, narrative, and identity systems that make your brand impossible to ignore.",
    featuredOnHome: true,
  },
  {
    title: "Management Consulting",
    description:
      "Operating models, team alignment, and execution frameworks for scaling organizations.",
    featuredOnHome: true,
  },
  {
    title: "Marketing Consulting",
    description:
      "Go-to-market strategy, funnel design, and campaigns that convert attention into revenue.",
    featuredOnHome: true,
  },
  {
    title: "Project Management",
    description:
      "End-to-end delivery leadership — from roadmap to launch with clarity and velocity.",
    featuredOnHome: true,
  },
  {
    title: "Growth Marketing",
    description:
      "Acquisition loops, referral engines, and community-led growth for B2B and B2C products.",
    featuredOnHome: true,
  },
  {
    title: "Strategic Planning",
    description:
      "Long-range vision, OKRs, and strategic narratives that align teams and investors.",
    featuredOnHome: true,
  },
  {
    title: "Executive Administrative Assistance",
    description:
      "High-trust support for founders and executives — calendars, stakeholders, and priorities handled.",
    featuredOnHome: false,
  },
  {
    title: "Business Consulting",
    description:
      "Business model design, partnerships, and GTM for startups and growth-stage companies.",
    featuredOnHome: false,
  },
  {
    title: "Human Resources (HR)",
    description:
      "Talent strategy, culture programs, and people operations for fast-moving teams.",
    featuredOnHome: false,
  },
  {
    title: "Customer Service",
    description:
      "Support systems, playbooks, and experience design that turn users into advocates.",
    featuredOnHome: false,
  },
];

const aboutSection = {
  _id: "aboutSection",
  _type: "aboutSection",
  location: siteSettings.location,
  whoIAm: [
    "I'm Debanjan Sandhaki — a product and growth leader building category-defining platforms at the intersection of AI, security, and human potential.",
    "As CPO at Mewayz Global Corporation, I lead product vision for a unified no-code business OS. As CEO of PhantomX, I'm scaling a gamified mobile security movement for 800M+ users. I've also founded Veerangana, an AI-powered women's safety wearable, and served as CMO for NGSAA's AI Nation initiative.",
  ],
  approach: [
    "I start with the user: behavior, friction, and emotional loyalty. Every feature should feel magical, personal, and scalable.",
  ],
  philosophy: [
    "Build companies with soul, speed, and scale. Products should replace scattered tools and make business radically easier.",
    "Technology must serve human betterment — whether empowering entrepreneurs, protecting women, or democratizing AI sovereignty.",
  ],
};

const recognitions = [
  { award: "Essay Writing Competition — 3rd Place (UEM)", count: 1 },
  { award: "X-Mind Coding Competition Certification (UEM)", count: 1 },
  { award: "Innovation & Entrepreneurship Cell — Core Member", count: 1 },
  { award: "Art of Living — Director of Volunteers (9+ years)", count: 1 },
];

const updates = [
  {
    number: 1,
    title: "Chief Product Officer at Mewayz",
    description:
      "Leading product vision for a category-defining no-code business OS.",
    externalUrl: CONTACT.linkedinUrl,
  },
  {
    number: 2,
    title: "PhantomX — The Rise of Human Firewalls",
    description:
      "Gamified mobile security movement for 800M+ users in India.",
    externalUrl: CONTACT.linkedinUrl,
  },
  {
    number: 3,
    title: "Veerangana Alpha Prototype",
    description: "AI-powered SafetySmart Ring — hardware prototyping in progress.",
    externalUrl: CONTACT.linkedinUrl,
  },
];

const workProjects = [
  {
    title: "Mewayz Global Corporation",
    slug: "mewayz",
    category: "Product Leadership",
    year: 2025,
    featured: true,
    order: 0,
    challenge:
      "Unify scattered business tools into a single no-code command center for entrepreneurs and service businesses.",
    services: ["Product Strategy", "UX Leadership", "Positioning & Narrative"],
    role: "Chief Product Officer · Full-time · Remote (Delaware, US)",
  },
  {
    title: "PhantomX",
    slug: "phantomx",
    category: "Cybersecurity",
    year: 2025,
    featured: true,
    order: 1,
    challenge:
      "Protect 800M+ mobile users with real-time AI defense and a gamified human-firewall movement.",
    services: ["CEO Leadership", "Product Vision", "GTM & Community"],
    role: "Co-founder & CEO · Remote (Indore, India)",
  },
  {
    title: "NGSAA — AI Nation",
    slug: "ngsaa-ai-nation",
    category: "Brand & Marketing",
    year: 2025,
    featured: true,
    order: 2,
    challenge: "Position a sovereign AI Nation brand with global outreach and partnerships.",
    services: ["Brand & Narrative", "Global Outreach", "Growth & Engagement"],
    role: "Chief Marketing Officer · Remote (London, UK)",
  },
  {
    title: "Veerangana",
    slug: "veerangana",
    category: "Social Impact",
    year: 2024,
    featured: true,
    order: 3,
    challenge:
      "Revolutionize women's safety with AI-powered wearables and biometric threat detection.",
    services: ["Founder Leadership", "Product Strategy", "Hardware Prototyping"],
    role: "Founder & CEO · Kolkata, India",
  },
  {
    title: "QNET Ltd",
    slug: "qnet",
    category: "Growth & Sales",
    year: 2024,
    featured: false,
    order: 4,
    challenge: "Drive direct sales growth through relationship-led outreach and pipeline management.",
    services: ["Sales Management", "Growth Hacking"],
    role: "Independent Sales Representative · Kolkata, India",
  },
  {
    title: "Veerangana Initiative",
    slug: "veerangana-initiative",
    category: "Academic Project",
    year: 2024,
    featured: false,
    order: 5,
    challenge: "Smart wearable for women's safety with IoT and AI threat analysis.",
    services: ["Project Planning", "IoT Collaboration", "Patent Strategy"],
    role: "Project Lead · UEM, Kolkata",
  },
  {
    title: "Encryption & Decryption",
    slug: "encryption-tool",
    category: "Academic Project",
    year: 2024,
    featured: false,
    order: 6,
    challenge: "Python cryptographic toolkit with AES, RSA, and SHA-256.",
    services: ["Cryptography", "Python Development"],
    role: "Lead Developer · UEM, Kolkata",
  },
  {
    title: "Art of Living — Volunteer Leadership",
    slug: "art-of-living",
    category: "Social Impact",
    year: 2017,
    featured: false,
    order: 7,
    challenge: "Wellness and social impact programs reaching 1,500+ individuals.",
    services: ["Volunteer Management", "Event Leadership"],
    role: "Director of Volunteers · Art of Living Foundation",
  },
];

async function deleteByType(type) {
  const ids = await client.fetch(`*[_type == $type]._id`, { type });
  if (!ids.length) return;
  console.log(`Removing ${ids.length} old ${type} document(s)…`);
  const tx = client.transaction();
  for (const id of ids) tx.delete(id);
  await tx.commit();
}

async function seed() {
  console.log("Seeding Debanjan Sandhaki portfolio…\n");

  await client.createOrReplace(siteSettings);
  console.log("✓ siteSettings");

  await client.createOrReplace(aboutSection);
  console.log("✓ aboutSection");

  await deleteByType("serviceBlock");
  for (const [index, svc] of services.entries()) {
    await client.create({
      _type: "serviceBlock",
      title: svc.title,
      description: svc.description,
      order: index,
      featuredOnHome: svc.featuredOnHome,
    });
  }
  console.log(`✓ ${services.length} serviceBlock documents`);

  await deleteByType("recognitionItem");
  for (const rec of recognitions) {
    await client.create({ _type: "recognitionItem", ...rec });
  }
  console.log(`✓ ${recognitions.length} recognitionItem documents`);

  await deleteByType("updateItem");
  for (const upd of updates) {
    await client.create({ _type: "updateItem", ...upd });
  }
  console.log(`✓ ${updates.length} updateItem documents`);

  await deleteByType("workProject");
  for (const project of workProjects) {
    await client.create({
      _type: "workProject",
      ...project,
      slug: { _type: "slug", current: project.slug },
    });
  }
  console.log(`✓ ${workProjects.length} workProject documents`);

  console.log(
    "\nDone. Upload cover images and gallery media in Sanity Studio (/studio).",
  );
  console.log(
    "Or use local files: see public/images/README.md and run npm run images:placeholders to regenerate SVG stubs.",
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
