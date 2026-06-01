# Agent / contributor notes

Read **`docs/ARCHITECTURE.md`** for project structure, content flow, and spacing conventions.

## Quick rules

- **Founder positioning:** CEO / Founder / CPO — not freelance designer copy.
- **Contact:** `src/lib/data/contact.ts` is canonical (`ceo@orcrys.com`, etc.).
- **Ventures:** Edit `src/lib/data/products.ts` only; hero chips use `ventureQuickLinks`.
- **Nav / labels:** `src/config/site.ts`.
- **Do not** combine `section-padding-compact-top` and `section-padding-tight-bottom` on one element.
- **Commits:** Only when the user asks.

## Next.js

This repo uses Next.js 16. Check `node_modules/next/dist/docs/` when APIs differ from older versions.
