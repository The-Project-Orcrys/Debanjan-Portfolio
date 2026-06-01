import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/data/fetch";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();

  return {
    name: `${settings.siteTitle} — ${settings.tagline}`,
    short_name: settings.firstName,
    description: settings.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "en",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "technology"],
  };
}
