# Portfolio images

Real photos are loaded from [`assests/`](../assests/) (project root) into this folder.

## Source files

| File | Used for |
|------|----------|
| `source/photo-1.jpg` | About portrait, OG image, Mewayz cover |
| `source/photo-2.jpg` | Collage 2, PhantomX, services rotation |
| `source/photo-3.jpg` | Collage 1, standing office shot |
| `source/photo-4.jpg` | Collage 3, Veerangana updates |

## Structure

| Path | Use |
|------|-----|
| `og.jpg` | Social share / SEO |
| `about/portrait.jpg` | About teaser portrait |
| `home/collage-1.jpg` … `collage-3.jpg` | Home photo collage |
| `services/*.jpg` | Service accordion media |
| `work/{slug}/cover.jpg` | Project cover |
| `work/{slug}/gallery-01.jpg` … | Case study galleries |
| `updates/*.jpg` | About page news cards |

## Replace photos

1. Add new JPGs to `assests/` at the project root.
2. Re-run: `npm run images:import` (or copy manually using the mapping in `scripts/import-assets.mjs`).

## Sanity CMS

When Studio is connected, uploaded images override these paths via CDN.
