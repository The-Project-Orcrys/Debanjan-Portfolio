import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import type { ContactSchema } from "@/lib/validation";

function contactPayload(data: ContactSchema) {
  const { website: _honeypot, ...payload } = data;
  return payload;
}

export async function sendContactEmail(data: ContactSchema) {
  const payload = contactPayload(data);

  if (!process.env.RESEND_API_KEY) {
    console.info("[contact] Resend not configured — mock send:", payload);
    return { id: "mock" };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const from = process.env.FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL;

  if (!to) {
    throw new Error("CONTACT_EMAIL is not configured");
  }

  return resend.emails.send({
    from,
    to,
    subject: `New inquiry from ${payload.name}`,
    react: ContactEmailTemplate(payload),
  });
}
