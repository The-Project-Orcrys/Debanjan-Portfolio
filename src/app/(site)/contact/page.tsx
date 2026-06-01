import { ContactPageSection } from "@/components/contact/ContactPageSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT } from "@/lib/data/contact";
import { getSiteSettings } from "@/lib/data/fetch";
import { buildBreadcrumbSchema, buildContactPageSchema } from "@/lib/seo/jsonld";
import { keywordsForContact } from "@/lib/seo/keywords";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildPageMetadata({
    title: `Contact ${settings.firstName} ${settings.lastName}`,
    description: `Contact ${settings.siteTitle} at ${CONTACT.email} — ${settings.phone}. Office: ${CONTACT.officeShort}.`,
    path: "/contact",
    keywords: keywordsForContact(settings),
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const schema = [
    buildContactPageSchema(settings),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <ContactPageSection settings={settings} />
    </>
  );
}
