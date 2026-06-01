import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

const PLACEHOLDER_IDS = new Set([
  "",
  "placeholder",
  "your-project-id",
  "your_project_id",
]);

/** True only when a real Sanity project ID is configured. */
export const isSanityConfigured = Boolean(
  projectId && !PLACEHOLDER_IDS.has(projectId.toLowerCase()),
);

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});
