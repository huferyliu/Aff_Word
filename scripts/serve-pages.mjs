import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("pages-dist");
const port = Number(process.env.PAGES_PORT || 4174);
const rawBase = process.env.PAGES_BASE_PATH || "/Aff_Word";
const base = `/${rawBase.split("/").filter(Boolean).join("/")}`;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png" };

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  if (pathname === base || pathname === `${base}/`) {
    response.writeHead(302, { Location: `${base}/index.html` });
    response.end();
    return;
  }
  if (!pathname.startsWith(`${base}/`)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  const file = path.resolve(root, pathname.slice(base.length + 1));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Pages preview running at http://127.0.0.1:${port}${base}/`));

