import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { UpdateItem } from "@/types/content";

export function UpdatesSection({ items }: { items: UpdateItem[] }) {
  return (
    <section className="section-padding border-t border-white/10">
      <ScrollReveal>
        <h2 className="text-h2 text-display">News & Updates</h2>
      </ScrollReveal>

      <ul className="mt-16 space-y-20">
        {items.map((item) => (
          <ScrollReveal key={item._id}>
            <li className="grid gap-8 lg:grid-cols-12">
              <span className="text-display text-[clamp(3rem,8vw,6rem)] leading-none text-text-accent lg:col-span-2">
                {item.number}
              </span>
              <div className="lg:col-span-6">
                <h3 className="text-h3 text-display">{item.title}</h3>
                <p className="mt-4 text-text-secondary">{item.description}</p>
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm underline hover:text-text-accent"
                >
                  Learn more ↗
                </a>
              </div>
              <div className="flex flex-wrap gap-4 lg:col-span-4">
                {item.imageUrls.map((url) => (
                  <div
                    key={url}
                    className="relative h-32 w-40 overflow-hidden rounded-[var(--radius-card)] bg-bg-secondary"
                  >
                    <PortfolioImage
                      src={url}
                      alt=""
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                ))}
              </div>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
