import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

walk(root);
const missing = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    const target = path.join(root, match[1].replace(/^\//, ""));
    if (!fs.existsSync(target)) missing.push(`${path.relative(root, file)} -> ${match[1]}`);
  }
}

const articles = JSON.parse(fs.readFileSync(path.join(root, "data", "articles.json"), "utf8"));
const searchIndex = JSON.parse(fs.readFileSync(path.join(root, "data", "search-index.json"), "utf8"));
const required = ["index.html", "pages/learn.html", "pages/notes.html", "pages/experiments.html", "pages/projects.html", "pages/reference.html", "search.html"];
const absentRequired = required.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length || absentRequired.length || articles.length !== searchIndex.length) {
  console.error(JSON.stringify({ missing, absentRequired, articleCount: articles.length, searchCount: searchIndex.length }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ htmlPages: htmlFiles.length, articles: articles.length, searchEntries: searchIndex.length, brokenInternalAssets: 0 }, null, 2));
