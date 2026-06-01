import fs from "node:fs";
import path from "node:path";

const labels = {
  "about/portrait.svg": "Portrait",
  "home/collage-1.svg": "Leadership",
  "home/collage-2.svg": "Product",
  "home/collage-3.svg": "Community",
  "services/brand-consulting.svg": "Brand",
  "services/management-consulting.svg": "Management",
  "services/marketing-consulting.svg": "Marketing",
  "services/project-management.svg": "Projects",
  "services/growth-marketing.svg": "Growth",
  "services/strategic-planning.svg": "Strategy",
  "updates/mewayz.svg": "Mewayz",
  "updates/product.svg": "Product",
  "updates/phantomx.svg": "PhantomX",
  "updates/veerangana.svg": "Veerangana",
  "updates/prototype.svg": "Prototype",
};

const slugs = [
  "mewayz",
  "phantomx",
  "ngsaa-ai-nation",
  "veerangana",
  "qnet",
  "veerangana-initiative",
  "encryption-tool",
  "art-of-living",
];

const counts = {
  mewayz: 6,
  phantomx: 5,
  "ngsaa-ai-nation": 4,
  veerangana: 7,
  qnet: 3,
  "veerangana-initiative": 5,
  "encryption-tool": 3,
  "art-of-living": 3,
};

function svg(label, w = 1200, h = 800) {
  const t = label.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect fill="#111" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8a8a8a" font-family="system-ui,sans-serif" font-size="32">${t}</text></svg>`;
}

const root = path.join(process.cwd(), "public", "images");

for (const [p, l] of Object.entries(labels)) {
  const fp = path.join(root, p);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  const isPortrait = p.includes("portrait");
  const isCollage = p.includes("collage");
  fs.writeFileSync(
    fp,
    svg(l, isPortrait ? 600 : 800, isPortrait ? 800 : isCollage ? 650 : 600),
  );
}

for (const slug of slugs) {
  const title = slug
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");
  const cover = path.join(root, "work", slug, "cover.svg");
  fs.mkdirSync(path.dirname(cover), { recursive: true });
  fs.writeFileSync(cover, svg(title));
  const n = counts[slug] ?? 3;
  for (let i = 1; i <= n; i++) {
    const g = path.join(
      root,
      "work",
      slug,
      `gallery-${String(i).padStart(2, "0")}.svg`,
    );
    fs.writeFileSync(g, svg(`${title} ${i}`));
  }
}

console.log("Generated image placeholders in public/images/");
