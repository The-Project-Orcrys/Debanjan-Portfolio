import { HomeSectionNav } from "@/components/home/HomeSectionNav";
import { ImpactMetricsStrip } from "@/components/home/ImpactMetricsStrip";
import { VenturePartnersStrip } from "@/components/home/VenturePartnersStrip";

/** Chapter nav + impact metrics + venture ticker — matches ceodebanjan.vercel.app band. */
export function HomeChapterStack() {
  return (
    <div className="home-chapter-stack w-full bg-bg-primary">
      <HomeSectionNav />
      <ImpactMetricsStrip />
      <VenturePartnersStrip />
    </div>
  );
}
