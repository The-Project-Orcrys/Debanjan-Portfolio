"use server";

import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { contactSchema } from "@/lib/validation";

export async function submitContactForm(data: unknown) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  if (parsed.data.website) {
    return { success: true as const };
  }

  try {
    await sendContactEmail(parsed.data);
    return { success: true as const };
  } catch (err) {
    console.error(err);
    return { error: { formErrors: ["Email failed to send"] } };
  }
}
