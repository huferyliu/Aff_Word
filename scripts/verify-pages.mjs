import fs from "node:fs";
import path from "node:path";

const root = path.resolve("pages-dist");
const rawBase = process.env.PAGES_BASE_PATH || "/Aff_Word";
const base = `/${rawBase.split("/").filter(Boolean).join("/")}`;
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

if (!fs.existsSync(root)) throw new Error("pages-dist does not exist; run pnpm pages:prepare first");

const files = walk(root);
for (const file of files.filter((item) => item.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src|data-image-open)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    const url = match[1];
    if (!url.startsWith(`${base}/`)) {
      failures.push(`${path.relative(root, file)} has unprefixed URL ${url}`);
      continue;
    }
    const relative = url.slice(base.length + 1);
    if (!fs.existsSync(path.join(root, relative))) failures.push(`${path.relative(root, file)} -> missing ${url}`);
  }
}

const searchScript = fs.readFileSync(path.join(root, "assets", "js", "search.js"), "utf8");
if (!searchScript.includes(`fetch("${base}/data/search-index.json")`)) failures.push("search index fetch path is not prefixed");
if (!fs.existsSync(path.join(root, ".nojekyll"))) failures.push(".nojekyll is missing");

if (failures.length) {
  console.error(JSON.stringify({ base, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ base, files: files.length, htmlPages: files.filter((file) => file.endsWith(".html")).length, brokenPagesAssets: 0 }, null, 2));

