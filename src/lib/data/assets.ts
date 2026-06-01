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
} as const;
