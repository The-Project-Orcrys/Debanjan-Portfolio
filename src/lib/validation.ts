import { z } from "zod";
import { INQUIRY_TYPES } from "@/config/site";

const inquiryEnum = z.enum(INQUIRY_TYPES);

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  projectType: inquiryEnum,
  message: z.string().min(20, "Tell me more — at least 20 characters"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export { INQUIRY_TYPES };
