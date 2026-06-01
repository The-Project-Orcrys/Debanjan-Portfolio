# Architecture

Executive portfolio for **Debanjan Sandhaki** (Founder · CPO · CEO). Built with Next.js App Router, optional Sanity CMS, and a static fallback data layer.

## Layers

| Layer | Path | Responsibility |
|--------|------|----------------|
| **Routes** | `src/app/` | Pages, API routes, metadata, JSON-LD |
| **UI** | `src/components/` | Feature components (`home/`, `work/`, `contact/`, `layout/`) |
| **Config** | `src/config/` | Navigation, founder positioning, inquiry types, section copy |
| **Data** | `src/lib/data/` | Defaults, products, contact, fetch + Sanity merge |
| **SEO** | `src/lib/seo/` | Metadata builders, keywords, JSON-LD, sitemap |
| **CMS** | `src/cms/`, `src/lib/sanity/` | Schemas, GROQ queries, Studio at `/studio` |
| **Types** | `src/types/content.ts` | Shared content models |

## Content flow

1. **No Sanity** → `defaultSiteSettings` and related arrays in `defaults.ts` (and `products.ts`).
2. **With Sanity** → `fetch.ts` loads documents; `mergeSiteSettingsContact()` enforces canonical email, phone, LinkedIn, and company.
3. **Revalidate** → `POST /api/revalidate` after CMS publishes.

## Single sources of truth

- **Contact** → `src/lib/data/contact.ts` (`ceo@orcrys.com`, phone, office, LinkedIn).
- **Ventures / products** → `src/lib/data/products.ts` (URLs + copy; `ventureQuickLinks` for hero chips).
- **Nav & routes** → `src/config/site.ts`.
- **Contact form types** → `INQUIRY_TYPES` in `src/config/site.ts` → `src/lib/validation.ts`.

## Conventions

- Server components for pages; `"use client"` only for motion, forms, and scroll.
- Section spacing: `section-padding` (default), `section-padding-compact`, `section-padding-tight-bottom` — **do not combine** `compact-top` + `tight-bottom` on the same element.
- Images under `public/images/`; run `npm run images:import` after updating `assests/`.

## Deploy checklist

1. Set `NEXT_PUBLIC_SITE_URL` to production domain.
2. Set `CONTACT_EMAIL` and `RESEND_API_KEY` for the contact form.
3. Run `npm run build` and verify Lighthouse / OG previews.
4. Optional: `npm run seed:sanity` then upload media in Studio.
