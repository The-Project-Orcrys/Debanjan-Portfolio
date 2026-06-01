import { defineField, defineType } from "sanity";

export const updateItem = defineType({
  name: "updateItem",
  title: "Update Item",
  type: "document",
  fields: [
    defineField({ name: "number", type: "number" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "externalUrl", type: "url" }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
