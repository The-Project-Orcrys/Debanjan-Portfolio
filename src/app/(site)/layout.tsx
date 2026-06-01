import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { BackToTop } from "@/components/shared/BackToTop";
import { ReadingProgressBar } from "@/components/shared/ReadingProgressBar";
import { StickyMobileContact } from "@/components/shared/StickyMobileContact";
import { getSiteSettings } from "@/lib/data/fetch";
import { getResumeUrl } from "@/lib/site/resume.server";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const resumeUrl = getResumeUrl();

  return (
    <LenisProvider>
      <ReadingProgressBar />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar settings={settings} resumeUrl={resumeUrl} />
      <PageTransition>
        <main id="main" className="flex flex-col pb-[4.5rem] md:pb-0">
          {children}
        </main>
      </PageTransition>
      <Footer settings={settings} />
      <StickyMobileContact email={settings.email} />
      <BackToTop />
    </LenisProvider>
  );
}
