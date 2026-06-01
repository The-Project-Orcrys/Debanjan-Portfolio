import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ROUTES } from "@/config/site";
import type { UpdateItem } from "@/types/content";

export function NewsHighlights({ updates }: { updates: UpdateItem[] }) {
  const items = updates.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section
      id="highlights"
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="highlights-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
            In the news
          </p>
          <h2 id="highlights-heading" className="text-display mt-4 text-h2">
            Current focus
          </h2>
        </ScrollReveal>
        <Link
          href={ROUTES.about}
          className="text-sm uppercase tracking-widest text-text-secondary underline-offset-4 hover:text-text-accent hover:underline"
        >
          Full story →
        </Link>
      </div>

      <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((item, index) => {
          const image = item.imageUrls[0];
          const content = (
            <>
              {image ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-[var(--radius-card)]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs tabular-nums text-text-accent">
                  {String(item.number).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-display text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-text-secondary">
                  {item.description}
                </p>
                {item.externalUrl ? (
                  <span className="mt-4 text-xs uppercase tracking-widest text-text-accent">
                    Read more →
                  </span>
                ) : null}
              </div>
            </>
          );

          return (
            <li key={item._id}>
              <ScrollReveal>
                {item.externalUrl ? (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/20 transition hover:border-text-accent/30"
                  >
                    {content}
                  </a>
                ) : (
                  <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/20">
                    {content}
                  </article>
                )}
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
