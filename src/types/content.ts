export interface SocialLink {
  label: string;
  url: string;
  fullName: string;
}

export interface SiteSettings {
  siteTitle: string;
  firstName: string;
  lastName: string;
  /** Short positioning line (e.g. Founder · CPO · CEO) */
  tagline: string;
  role: string;
  roleSecondary: string;
  /** Parent company or studio brand */
  company?: string;
  yearsExperience: number;
  email: string;
  phone?: string;
  officeAddress?: string;
  metaDescription: string;
  socialLinks: SocialLink[];
  availabilityNote: string;
  stackItems: string[];
  studioName: string;
  studioNote: string;
  location: string;
  ogImageUrl?: string;
  footerVideoUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  imageUrl?: string;
  order: number;
}

export type ProjectCategory =
  | "Product Leadership"
  | "Brand & Marketing"
  | "Cybersecurity"
  | "Social Impact"
  | "Business Consulting"
  | "Growth & Sales"
  | "Academic Project";

export interface GalleryItem {
  _key: string;
  type: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  alt: string;
  span?: "full" | "half" | "third";
}

export type ProjectOutcome = {
  label: string;
  value: string;
};

export interface WorkProject {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  year: number;
  featured: boolean;
  liveUrl?: string;
  challenge: string;
  services: string[];
  role: string;
  order: number;
  coverImageUrl: string;
  gallery: GalleryItem[];
  outcomes?: ProjectOutcome[];
}

export interface ServiceBlock {
  _id: string;
  title: string;
  description: string;
  order: number;
  featuredOnHome: boolean;
  mediaItems: GalleryItem[];
}

export interface AboutSection {
  whoIAm: string[];
  approach: string[];
  philosophy: string[];
  location: string;
  photoUrl: string;
}

export interface RecognitionItem {
  award: string;
  count: number;
}

export interface UpdateItem {
  _id: string;
  number: number;
  title: string;
  description: string;
  externalUrl?: string;
  imageUrls: string[];
  /** Display period e.g. "2025 · Present" */
  period?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface ValueProp {
  title: string;
  text: string;
}

export interface ShapeConfig {
  id: string;
  type: "pill" | "circle" | "hexagon" | "square";
  color: "grey" | "blue";
  size: number;
  top: string;
  left: string;
  parallaxSpeed: number;
  rotationOffset: number;
}
