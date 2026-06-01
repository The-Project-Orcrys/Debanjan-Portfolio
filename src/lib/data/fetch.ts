import { unstable_cache } from "next/cache";
import { mergeSiteSettingsContact } from "@/lib/data/contact";
import {
  defaultAbout,
  defaultRecognitions,
  defaultServices,
  defaultSiteSettings,
  defaultUpdates,
  defaultWorkProjects,
} from "@/lib/data/defaults";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import {
  ABOUT_QUERY,
  RECOGNITIONS_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  UPDATES_QUERY,
  WORK_PROJECTS_QUERY,
  WORK_PROJECT_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";
import type {
  AboutSection,
  RecognitionItem,
  ServiceBlock,
  SiteSettings,
  UpdateItem,
  WorkProject,
} from "@/types/content";

/** Reject legacy demo CMS data (e.g. Alex Rivera) so defaults.ts is used. */
function isStaleSanitySiteSettings(data: SiteSettings | null | undefined): boolean {
  if (!data?.firstName) return true;
  const first = data.firstName.toLowerCase();
  const last = (data.lastName ?? "").toLowerCase();
  if (first === "alex" && last === "rivera") return true;
  if (data.siteTitle?.toLowerCase().includes("alex rivera")) return true;
  return false;
}

function isEmptyArray<T>(data: T[] | null | undefined): boolean {
  return !data || data.length === 0;
}

async function fetchSanity<T>(query: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const data = await sanityClient.fetch<T>(query);
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export const getSiteSettings = unstable_cache(
  async () => {
    const data = await fetchSanity<SiteSettings>(
      SITE_SETTINGS_QUERY,
      defaultSiteSettings,
    );
    if (isStaleSanitySiteSettings(data)) return defaultSiteSettings;
    return mergeSiteSettingsContact(data);
  },
  ["site-settings"],
  { tags: ["global"] },
);

export const getServices = unstable_cache(
  async () => {
    const data = await fetchSanity<ServiceBlock[]>(
      SERVICES_QUERY,
      defaultServices,
    );
    if (isEmptyArray(data)) return defaultServices;
    return data;
  },
  ["services"],
  { tags: ["home"] },
);

export function getFeaturedServices(services: ServiceBlock[]): ServiceBlock[] {
  const featured = services.filter((s) => s.featuredOnHome);
  if (featured.length > 0) return featured;
  return [...services].sort((a, b) => a.order - b.order).slice(0, 6);
}

export const getWorkProjects = unstable_cache(
  async () => {
    const data = await fetchSanity<WorkProject[]>(
      WORK_PROJECTS_QUERY,
      defaultWorkProjects,
    );
    if (isEmptyArray(data)) return defaultWorkProjects;
    return data;
  },
  ["work-projects"],
  { tags: ["work"] },
);

export const getAbout = unstable_cache(
  async () => {
    const data = await fetchSanity<AboutSection>(ABOUT_QUERY, defaultAbout);
    if (!data?.whoIAm?.length) return defaultAbout;
    return {
      ...data,
      photoUrl: data.photoUrl?.trim() || defaultAbout.photoUrl,
    };
  },
  ["about"],
  { tags: ["about"] },
);

export const getRecognitions = unstable_cache(
  async () => {
    const data = await fetchSanity<RecognitionItem[]>(
      RECOGNITIONS_QUERY,
      defaultRecognitions,
    );
    if (isEmptyArray(data)) return defaultRecognitions;
    return data;
  },
  ["recognitions"],
  { tags: ["about"] },
);

export const getUpdates = unstable_cache(
  async () => {
    const data = await fetchSanity<UpdateItem[]>(UPDATES_QUERY, defaultUpdates);
    if (isEmptyArray(data)) return defaultUpdates;
    return data;
  },
  ["updates"],
  { tags: ["about"] },
);

export async function getWorkProjectBySlug(slug: string) {
  const projects = await getWorkProjects();
  const local = projects.find((p) => p.slug === slug);
  if (!isSanityConfigured) return local ?? null;

  try {
    const remote = await sanityClient.fetch<WorkProject | null>(
      WORK_PROJECT_BY_SLUG_QUERY,
      { slug },
    );
    return remote ?? local ?? null;
  } catch {
    return local ?? null;
  }
}
