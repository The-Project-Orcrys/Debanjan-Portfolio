import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "location", type: "string" }),
    defineField({ name: "photo", type: "image" }),
    defineField({ name: "whoIAm", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "approach", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "philosophy", type: "array", of: [{ type: "text" }] }),
  ],
});
