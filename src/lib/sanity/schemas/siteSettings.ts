import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", title: "Site Title" }),
    defineField({ name: "firstName", type: "string" }),
    defineField({ name: "lastName", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "company",
      type: "string",
      title: "Company / studio brand",
      description: "e.g. Orcrys",
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "roleSecondary", type: "string" }),
    defineField({ name: "yearsExperience", type: "number" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({
      name: "officeAddress",
      type: "text",
      title: "Office address",
    }),
    defineField({ name: "metaDescription", type: "text" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "availabilityNote", type: "string" }),
    defineField({ name: "studioName", type: "string" }),
    defineField({ name: "studioNote", type: "string" }),
    defineField({
      name: "footerVideoUrl",
      type: "url",
      title: "Footer background video URL",
    }),
    defineField({ name: "ogImage", type: "image", title: "Open Graph image" }),
    defineField({
      name: "stackItems",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
            { name: "fullName", type: "string" },
          ],
        },
      ],
    }),
  ],
});
