import { defineField, defineType } from "sanity";

export const recognitionItem = defineType({
  name: "recognitionItem",
  title: "Recognition",
  type: "document",
  fields: [
    defineField({ name: "award", type: "string" }),
    defineField({ name: "count", type: "number" }),
  ],
});
