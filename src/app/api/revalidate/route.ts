import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const tagMap: Record<string, string> = {
  workProject: "work",
  serviceBlock: "home",
  siteSettings: "global",
  aboutSection: "about",
  recognitionItem: "about",
  updateItem: "about",
  contactChannel: "global",
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sanity-secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const docType = body._type as string;
  revalidateTag(tagMap[docType] ?? "all", "max");

  return NextResponse.json({ revalidated: true, tag: tagMap[docType] ?? "all" });
}
