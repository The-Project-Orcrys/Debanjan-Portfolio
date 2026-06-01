/**
 * Copies photos from assests/ into public/images/
 * Usage: node scripts/import-assets.mjs
 */
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const srcDir = join(root, "assests");
const imgRoot = join(root, "public", "images");

const known = [
  { file: "WhatsApp Image 2026-06-01 at 5.27.38 PM.jpeg", key: "photo-1" },
  { file: "WhatsApp Image 2026-06-01 at 5.27.38 PM (1).jpeg", key: "photo-2" },
  { file: "WhatsApp Image 2026-06-01 at 5.27.39 PM.jpeg", key: "photo-3" },
  { file: "WhatsApp Image 2026-06-01 at 5.27.39 PM (1).jpeg", key: "photo-4" },
];

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function cp(from, to) {
  ensureDir(join(to, ".."));
  copyFileSync(from, to);
}

if (!existsSync(srcDir)) {
  console.error("Missing assests/ folder at project root");
  process.exit(1);
}

const sourceDir = join(imgRoot, "source");
ensureDir(sourceDir);

for (const { file, key } of known) {
  const from = join(srcDir, file);
  if (!existsSync(from)) {
    console.warn(`Skip missing: ${file}`);
    continue;
  }
  cp(from, join(sourceDir, `${key}.jpg`));
}

const p = (n) => join(sourceDir, n);
cp(p("photo-1.jpg"), join(imgRoot, "about", "portrait.jpg"));
cp(p("photo-1.jpg"), join(imgRoot, "og.jpg"));
cp(p("photo-3.jpg"), join(imgRoot, "home", "collage-1.jpg"));
cp(p("photo-2.jpg"), join(imgRoot, "home", "collage-2.jpg"));
cp(p("photo-4.jpg"), join(imgRoot, "home", "collage-3.jpg"));

const serviceKeys = [
  "brand-consulting",
  "management-consulting",
  "marketing-consulting",
  "project-management",
  "growth-marketing",
  "strategic-planning",
];
serviceKeys.forEach((name, i) => {
  cp(p(`photo-${(i % 4) + 1}.jpg`), join(imgRoot, "services", `${name}.jpg`));
});

const updates = {
  mewayz: "photo-1",
  product: "photo-3",
  phantomx: "photo-2",
  veerangana: "photo-4",
  prototype: "photo-1",
};
for (const [k, ph] of Object.entries(updates)) {
  cp(p(`${ph}.jpg`), join(imgRoot, "updates", `${k}.jpg`));
}

const productsDir = join(imgRoot, "products");
ensureDir(productsDir);

/** One unique source photo per venture card */
const ventureProducts = {
  orcrys: "photo-4",
  mewayz: "photo-1",
  "mewayz-india": "photo-2",
  edquate: "photo-3",
  phantomx: "photo-2",
};
for (const [id, ph] of Object.entries(ventureProducts)) {
  cp(p(`${ph}.jpg`), join(productsDir, `${id}.jpg`));
}

const slugs = [
  "mewayz",
  "phantomx",
  "ngsaa-ai-nation",
  "edquate",
  "orcrys",
  "veerangana",
  "qnet",
  "veerangana-initiative",
  "encryption-tool",
  "art-of-living",
];
const galleryCounts = {
  mewayz: 6,
  phantomx: 5,
  "ngsaa-ai-nation": 4,
  edquate: 3,
  orcrys: 3,
  veerangana: 7,
  qnet: 3,
  "veerangana-initiative": 5,
  "encryption-tool": 3,
  "art-of-living": 3,
};

slugs.forEach((slug, si) => {
  const dir = join(imgRoot, "work", slug);
  ensureDir(dir);
  cp(p(`photo-${(si % 4) + 1}.jpg`), join(dir, "cover.jpg"));
  const count = galleryCounts[slug];
  for (let g = 1; g <= count; g++) {
    const gPhoto = `photo-${((si + g) % 4) + 1}.jpg`;
    cp(p(gPhoto), join(dir, `gallery-${String(g).padStart(2, "0")}.jpg`));
  }
});

// Case-study covers match venture product photography
ensureDir(join(imgRoot, "work", "edquate"));
ensureDir(join(imgRoot, "work", "orcrys"));
cp(join(productsDir, "edquate.jpg"), join(imgRoot, "work", "edquate", "cover.jpg"));
cp(join(productsDir, "orcrys.jpg"), join(imgRoot, "work", "orcrys", "cover.jpg"));

const resumeSources = [
  join(root, "Profile.pdf"),
  join(srcDir, "Profile.pdf"),
];
const resumeOut = join(root, "public", "resume", "debanjan-sandhaki-resume.pdf");
ensureDir(join(root, "public", "resume"));
const resumeSrc = resumeSources.find((p) => existsSync(p));
if (resumeSrc) {
  cp(resumeSrc, resumeOut);
  console.log("Copied Profile.pdf to public/resume/debanjan-sandhaki-resume.pdf");
}

console.log("Imported images from assests/ to public/images/");
