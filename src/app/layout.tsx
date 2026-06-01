import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { AnalyticsWrapper } from "@/components/providers/AnalyticsWrapper";
import { MotionConfigProvider } from "@/components/motion/MotionConfig";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings, getWorkProjects } from "@/lib/data/fetch";
import {
  buildPersonSchema,
  buildProfessionalServiceSchema,
  buildWebSiteSchema,
  buildWorkListSchema,
} from "@/lib/seo/jsonld";
import { buildRootMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/config";
import "@/styles/globals.css";

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const projects = await getWorkProjects();
  const siteUrl = getSiteUrl();

  const globalSchema = [
    buildWebSiteSchema(settings, siteUrl),
    buildPersonSchema(settings, siteUrl),
    buildProfessionalServiceSchema(settings, siteUrl),
    buildWorkListSchema(projects, siteUrl),
  ];

  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full bg-bg-primary text-text-primary antialiased">
        <JsonLd data={globalSchema} />
        <AnalyticsWrapper>
          <MotionConfigProvider>{children}</MotionConfigProvider>
        </AnalyticsWrapper>
      </body>
    </html>
  );
}
