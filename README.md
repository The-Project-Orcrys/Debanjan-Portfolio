# Debanjan Sandhaki — Executive Portfolio

Production-ready portfolio for a **founder / CEO profile**: product leadership, venture building (Orcrys, Mewayz, PhantomX, Edquate), case studies, and contact.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · GSAP · Lenis · Framer Motion · Sanity (optional) · Resend · PostHog · Sentry

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Sanity, content loads from `src/lib/data/defaults.ts`.

## Project structure

```
src/
├── app/              # Routes, API, metadata
├── components/       # UI by feature (home, work, about, contact, layout)
├── config/           # Nav, founder copy, inquiry types (site.ts)
├── lib/
│   ├── data/         # Defaults, products, contact, fetch
│   └── seo/          # Metadata, keywords, JSON-LD
├── styles/           # globals.css, tokens
└── types/            # Content models
docs/ARCHITECTURE.md    # Deeper technical overview
scripts/                # Sanity seed, image import
public/images/          # Portfolio photography & OG
```

## Customize

| What | Where |
|------|--------|
| Bio, services, work | `src/lib/data/defaults.ts` |
| Venture URLs & blurbs | `src/lib/data/products.ts` |
| Email, phone, office | `src/lib/data/contact.ts` |
| Nav & section labels | `src/config/site.ts` |
| Photos | `assests/` → `npm run images:import` |

## Environment

See `.env.example` — Sanity, Resend (`CONTACT_EMAIL=ceo@orcrys.com`), PostHog, Sentry, `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_CALENDAR_URL` for embedded scheduling on `/contact`.

## Deploy (Vercel)

1. Import the GitHub repo and set **Root Directory** to the project root.
2. Environment variables: `NEXT_PUBLIC_SITE_URL` (production URL), `CONTACT_EMAIL`, `RESEND_API_KEY`, `FROM_EMAIL` (verified domain).
3. Run `npm run images:import` locally before push if you add photos under `assests/`; commit the generated `public/images/*.jpg` and `public/resume/*.pdf`.
4. Optional: `NEXT_PUBLIC_CALENDAR_URL` (Calendly), `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, PostHog, Sentry.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run seed:sanity` | Push defaults to Sanity |
| `npm run images:import` | Copy photos from `assests/` to `public/images/` + résumé PDF |
| `npm run resume:copy` | Copy `Profile.pdf` to `public/resume/` |

## Sanity CMS

1. Create a project at [sanity.io](https://www.sanity.io)
2. Configure `.env.local` and open `/studio`
3. `npm run seed:sanity` then upload images in Studio
4. Webhook: `POST /api/revalidate` with `x-sanity-secret`

## Deploy checklist

Before going live:

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://debanjansandhaki.com`).
2. Configure Resend: `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` — test `/contact`.
3. Run `npm run images:import` whenever you replace photos in `assests/`.
4. Run `npm run build` and fix any errors.
5. Optional Sanity: set `NEXT_PUBLIC_SANITY_PROJECT_ID`, run `npm run seed:sanity`, add webhook to `POST /api/revalidate`.

## SEO

Per-route metadata, OG image (`/images/og.jpg` after import, or `/opengraph-image`), JSON-LD (`Person`, `WebSite`, `ProfessionalService`, case studies), sitemap, and `robots.txt` (blocks `/studio`, `/api`).

Optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for Search Console.
