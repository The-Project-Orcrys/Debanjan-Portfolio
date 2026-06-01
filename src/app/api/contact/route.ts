import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ success: true, tracked: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
