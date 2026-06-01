import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/data/fetch";
import { portraitImagePath } from "@/lib/site.server";

export const runtime = "nodejs";
export const alt = "Debanjan Sandhaki — Founder · CPO · CEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function portraitDataUrl(): string | null {
  const rel = portraitImagePath();
  if (!rel) return null;
  try {
    const filePath = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    const buf = readFileSync(filePath);
    const mime = rel.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const settings = await getSiteSettings();
  const portrait = portraitDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(145deg, #0a0a0c 0%, #141418 50%, #0d0d10 100%)",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {portrait ? (
          <div
            style={{
              width: "42%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt=""
              style={{
                height: "100%",
                width: "auto",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </div>
        ) : null}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 72,
          }}
        >
          <p
            style={{
              fontSize: 22,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#c9a962",
              margin: 0,
            }}
          >
            {settings.tagline}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: portrait ? 56 : 72, lineHeight: 1.05, margin: 0 }}>
              {settings.firstName} {settings.lastName}
            </p>
            <p style={{ fontSize: 28, margin: 0, color: "#a1a1aa" }}>{settings.role}</p>
          </div>
          <p style={{ fontSize: 22, margin: 0, color: "#71717a" }}>
            {settings.email} · Orcrys
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
