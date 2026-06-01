/**
 * Copies Profile.pdf into public/resume/ for download links.
 * Usage: node scripts/copy-resume.mjs
 */
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const outDir = join(root, "public", "resume");
const outFile = join(outDir, "debanjan-sandhaki-resume.pdf");

const sources = [
  join(root, "Profile.pdf"),
  join(root, "assests", "Profile.pdf"),
];

mkdirSync(outDir, { recursive: true });

const source = sources.find((p) => existsSync(p));
if (!source) {
  console.error("No Profile.pdf found at project root or assests/Profile.pdf");
  process.exit(1);
}

copyFileSync(source, outFile);
console.log(`Copied résumé to public/resume/debanjan-sandhaki-resume.pdf`);
