import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Studio",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 z-50">{children}</div>;
}
