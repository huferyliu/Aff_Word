import fs from "node:fs";
import path from "node:path";

const source = path.resolve("dist");
const output = path.resolve("pages-dist");
const rawBase = process.env.PAGES_BASE_PATH || "/Aff_Word";
const base = `/${rawBase.split("/").filter(Boolean).join("/")}`;

if (!fs.existsSync(source)) throw new Error("dist does not exist; run pnpm build first");

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(source, output, { recursive: true });

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

for (const file of walk(output)) {
  const extension = path.extname(file);
  if (![".html", ".js", ".json"].includes(extension)) continue;

  let content = fs.readFileSync(file, "utf8");
  if (extension === ".html") {
    content = content.replace(/([=])(["'])\/(?!\/)/g, `$1$2${base}/`);
  } else {
    content = content.replace(/(["'])\/(?!\/)/g, `$1${base}/`);
  }
  fs.writeFileSync(file, content, "utf8");
}

fs.writeFileSync(path.join(output, ".nojekyll"), "", "utf8");
console.log(`Prepared GitHub Pages output at ${output} with base path ${base}/`);

