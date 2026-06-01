import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { getSiteSettings } from "@/lib/data/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <LenisProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar settings={settings} />
      <PageTransition>
        <main id="main" className="flex flex-col">
          {children}
        </main>
      </PageTransition>
      <Footer settings={settings} />
    </LenisProvider>
  );
}
