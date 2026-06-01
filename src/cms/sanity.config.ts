import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio CMS",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
