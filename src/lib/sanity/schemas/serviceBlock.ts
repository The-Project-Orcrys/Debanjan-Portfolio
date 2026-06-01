import { defineField, defineType } from "sanity";

export const serviceBlock = defineType({
  name: "serviceBlock",
  title: "Service Block",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "featuredOnHome",
      type: "boolean",
      title: "Featured on home",
      initialValue: false,
    }),
    defineField({
      name: "mediaItems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "type", type: "string" },
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
