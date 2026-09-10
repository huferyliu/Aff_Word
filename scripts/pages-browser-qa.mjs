import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const modules = process.env.BUNDLED_NODE_MODULES;
if (!modules) throw new Error("BUNDLED_NODE_MODULES is required");
const { chromium } = require(path.join(modules, "playwright"));

const base = process.env.PAGES_PREVIEW_URL || "http://127.0.0.1:4174/Aff_Word";
const output = path.resolve(".qa", "pages");
fs.mkdirSync(output, { recursive: true });
const evidence = { desktop: {}, mobile: {}, consoleErrors: [] };
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || chromium.executablePath() });
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await desktop.newPage();
page.on("console", (message) => { if (message.type() === "error") evidence.consoleErrors.push(message.text()); });
page.on("pageerror", (error) => evidence.consoleErrors.push(error.message));

const homeResponse = await page.goto(`${base}/index.html`, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => {
  const image = document.querySelector(".signal-image img");
  return image?.complete && image.naturalWidth > 0;
});
evidence.desktop.home = {
  status: homeResponse.status(),
  title: await page.locator("h1").textContent(),
  imageLoaded: await page.locator(".signal-image img").evaluate((image) => image.complete && image.naturalWidth > 0),
  stylesheetLoaded: await page.locator(".site-header").evaluate((element) => getComputedStyle(element).position === "sticky"),
  prefixedLinks: await page.locator('a[href^="/Aff_Word/"]').count(),
  noOverflow: await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
};
assert(homeResponse.ok(), "Pages 子路径首页无法访问");
assert(evidence.desktop.home.imageLoaded, "Pages 子路径首页图片未加载");
assert(evidence.desktop.home.stylesheetLoaded, "Pages 子路径样式未加载");
assert(evidence.desktop.home.prefixedLinks > 0, "Pages 页面链接没有子路径前缀");
assert(evidence.desktop.home.noOverflow, "Pages 桌面首页横向溢出");

const referenceResponse = await page.goto(`${base}/pages/reference.html`, { waitUntil: "domcontentloaded" });
evidence.desktop.reference = {
  status: referenceResponse.status(),
  cards: await page.locator(".content-card").count(),
  guideHref: await page.locator(".content-card h3 a").getAttribute("href")
};
assert(referenceResponse.ok() && evidence.desktop.reference.cards === 1, "Pages 参考首页归并结构错误");
assert(evidence.desktop.reference.guideHref === "/Aff_Word/articles/halcon-common-operator-guide.html", "Pages 总手册链接缺少子路径");

await page.locator(".content-card h3 a").click();
await page.waitForURL("**/Aff_Word/articles/halcon-common-operator-guide.html");
await page.locator("[data-operator-search-input]").fill("measure_pos");
evidence.desktop.operatorSearch = {
  visible: await page.locator("[data-operator-name]:visible").count(),
  href: await page.locator("[data-operator-name]:visible").getAttribute("href")
};
assert(evidence.desktop.operatorSearch.visible === 1, "Pages 算子搜索筛选错误");
assert(evidence.desktop.operatorSearch.href === "/Aff_Word/articles/reference-measure-pos.html", "Pages 算子链接缺少子路径");
await page.locator("[data-operator-name]:visible").click();
await page.waitForURL("**/Aff_Word/articles/reference-measure-pos.html");
evidence.desktop.operatorPage = {
  title: await page.locator("h1").textContent(),
  directoryLinks: await page.locator('.article-toc a[href^="/Aff_Word/articles/reference-"]').count(),
  current: await page.locator('.article-toc a[aria-current="page"]').count()
};
assert(evidence.desktop.operatorPage.title === "measure_pos 算子参考", "Pages 算子页面打开错误");
assert(evidence.desktop.operatorPage.directoryLinks === 48 && evidence.desktop.operatorPage.current === 1, "Pages 算子目录回归");
await page.screenshot({ path: path.join(output, "operator-desktop.png"), fullPage: false });

await page.goto(`${base}/search.html?q=measure_pos`, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => document.querySelectorAll("[data-search-results] article").length > 0);
evidence.desktop.search = {
  results: await page.locator("[data-search-results] article").count(),
  prefixedResult: await page.locator('[data-search-results] a[href^="/Aff_Word/articles/"]').count()
};
assert(evidence.desktop.search.results > 0 && evidence.desktop.search.prefixedResult > 0, "Pages 搜索索引或结果链接不可用");

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobile.newPage();
mobilePage.on("console", (message) => { if (message.type() === "error") evidence.consoleErrors.push(`mobile: ${message.text()}`); });
await mobilePage.goto(`${base}/articles/halcon-common-operator-guide.html`, { waitUntil: "domcontentloaded" });
evidence.mobile = {
  searchVisible: await mobilePage.locator("[data-operator-search]").isVisible(),
  noOverflow: await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
};
assert(evidence.mobile.searchVisible && evidence.mobile.noOverflow, "Pages 手机端总手册布局错误");
await mobilePage.screenshot({ path: path.join(output, "guide-mobile.png"), fullPage: false });

await browser.close();
assert(evidence.consoleErrors.length === 0, `Pages 浏览器控制台错误: ${evidence.consoleErrors.join("; ")}`);
fs.writeFileSync(path.join(output, "evidence.json"), JSON.stringify(evidence, null, 2));
console.log(JSON.stringify(evidence, null, 2));
