/**
 * Data layer public API — import from here in app routes when convenient.
 */
export { assets } from "@/lib/data/assets";
export { CONTACT, mergeSiteSettingsContact, mapsHref, phoneHref } from "@/lib/data/contact";
export {
  collageItems,
  defaultAbout,
  defaultRecognitions,
  defaultServices,
  defaultShapes,
  defaultSiteSettings,
  defaultUpdates,
  defaultValueProps,
  defaultWorkProjects,
} from "@/lib/data/defaults";
export {
  getAbout,
  getFeaturedServices,
  getRecognitions,
  getServices,
  getSiteSettings,
  getUpdates,
  getWorkProjectBySlug,
  getWorkProjects,
} from "@/lib/data/fetch";
export { defaultProducts, ventureQuickLinks } from "@/lib/data/products";
