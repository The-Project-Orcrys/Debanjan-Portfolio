import { defineField, defineType } from "sanity";

export const workProject = defineType({
  name: "workProject",
  title: "Work Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "liveUrl", type: "url" }),
    defineField({ name: "challenge", type: "text" }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "role", type: "text" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "coverImage", type: "image" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "type", type: "string", options: { list: ["image", "video"] } },
            { name: "image", type: "image" },
            { name: "videoUrl", type: "url" },
            { name: "alt", type: "string" },
            { name: "span", type: "string" },
          ],
        },
      ],
    }),
  ],
});
