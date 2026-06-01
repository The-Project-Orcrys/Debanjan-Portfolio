"use client";

import { buildVCard } from "@/lib/site/vcard";
import type { SiteSettings } from "@/types/content";

export function DownloadVCardButton({
  settings,
  className = "hero-cta-secondary",
}: {
  settings: SiteSettings;
  className?: string;
}) {
  const handleDownload = () => {
    const blob = new Blob([buildVCard(settings)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${settings.firstName}-${settings.lastName}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" className={className} onClick={handleDownload}>
      Save contact (.vcf)
    </button>
  );
}
