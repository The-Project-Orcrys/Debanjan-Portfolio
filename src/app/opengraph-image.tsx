import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/data/fetch";

export const runtime = "edge";
export const alt = "Debanjan Sandhaki — Founder · CPO · CEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #0a0a0c 0%, #141418 50%, #0d0d10 100%)",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
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
          <p
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              margin: 0,
              fontWeight: 400,
            }}
          >
            {settings.firstName} {settings.lastName}
          </p>
          <p style={{ fontSize: 32, margin: 0, color: "#a1a1aa" }}>
            {settings.role}
          </p>
        </div>
        <p style={{ fontSize: 24, margin: 0, color: "#71717a" }}>
          {settings.email} · Orcrys
        </p>
      </div>
    ),
    { ...size },
  );
}
