import { defineField, defineType } from "sanity";

export const contactChannel = defineType({
  name: "contactChannel",
  title: "Contact Channel",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "value", type: "string", title: "Value / URL" }),
    defineField({
      name: "channelType",
      type: "string",
      options: {
        list: ["email", "linkedin", "twitter", "behance", "other"],
      },
    }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "showInNav", type: "boolean", initialValue: true }),
  ],
});
