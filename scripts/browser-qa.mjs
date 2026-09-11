import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const modules = process.env.BUNDLED_NODE_MODULES;
if (!modules) throw new Error("BUNDLED_NODE_MODULES is required");
const { chromium } = require(path.join(modules, "playwright"));

const base = "http://127.0.0.1:4173";
const output = path.resolve(".qa", "browser");
fs.mkdirSync(output, { recursive: true });
const evidence = { desktop: {}, mobile: {}, consoleErrors: [] };

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const executablePath = process.env.BROWSER_EXECUTABLE || chromium.executablePath();
const browser = await chromium.launch({ headless: true, executablePath });

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
const page = await desktop.newPage();
page.on("console", (message) => { if (message.type() === "error") evidence.consoleErrors.push(message.text()); });
page.on("pageerror", (error) => evidence.consoleErrors.push(error.message));

await page.goto(`${base}/index.html`, { waitUntil: "networkidle" });
evidence.desktop.homeTitle = await page.locator("h1").textContent();
evidence.desktop.homeImageLoaded = await page.locator(".signal-image img").evaluate((image) => image.complete && image.naturalWidth > 0);
evidence.desktop.noHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
assert(evidence.desktop.homeTitle.includes("每次学习"), "首页主标题未显示");
assert(evidence.desktop.homeImageLoaded, "首页机器视觉图片未加载");
assert(evidence.desktop.noHorizontalOverflow, "桌面首页出现横向溢出");
await page.screenshot({ path: path.join(output, "home-desktop.png"), fullPage: true });

const requiredPages = [
  ["/pages/learn.html", "按知识路径"],
  ["/pages/notes.html", "把个人理解"],
  ["/pages/experiments.html", "记录真实操作"],
  ["/pages/projects.html", "把分散实验"],
  ["/pages/reference.html", "快速查到算子"]
];
evidence.desktop.pages = [];
for (const [url, expected] of requiredPages) {
  const response = await page.goto(`${base}${url}`, { waitUntil: "networkidle" });
  const heading = await page.locator("h1").textContent();
  evidence.desktop.pages.push({ url, status: response.status(), heading });
  assert(response.ok() && heading.includes(expected), `${url} 无法正常访问`);
}

await page.goto(`${base}/pages/learn.html`, { waitUntil: "networkidle" });
const routeLinks = await page.locator(".route-list a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
const codexLearningLink = page.locator('.learn-aside a[href="/articles/codex-app-learning-manual.html"]');
evidence.desktop.codexLearning = { href: await codexLearningLink.getAttribute("href") };
assert(await codexLearningLink.count() === 1, "学习页缺少 Codex 手册入口");
await codexLearningLink.click();
await page.waitForURL("**/articles/codex-app-learning-manual.html");
evidence.desktop.codexLearning.title = await page.locator("h1").textContent();
evidence.desktop.codexLearning.sourceLink = await page.locator('a[href*="BV1BVEs6LENZ"]').getAttribute("href");
evidence.desktop.codexLearning.sections = await page.locator(".article-content h2").allTextContents();
assert(evidence.desktop.codexLearning.title === "Codex App 从入门到进阶学习手册", "Codex 手册标题不正确");
assert(evidence.desktop.codexLearning.sourceLink.includes("BV1BVEs6LENZ"), "Codex 视频来源链接缺失");
assert(["八 记忆系统与 AGENTS.md", "十 Skills", "十一 MCP"].every((section) => evidence.desktop.codexLearning.sections.includes(section)), "Codex 手册关键章节不完整");
await page.goto(`${base}/pages/learn.html`, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(output, "halcon-routes-desktop.png"), fullPage: true });
evidence.desktop.halconRoutes = {
  total: await page.locator(".route-list li").count(),
  available: routeLinks.length,
  planned: await page.locator(".route-list small", { hasText: "规划中" }).count(),
  articles: []
};
assert(evidence.desktop.halconRoutes.total === 13, "HALCON 路线数量不是 13");
assert(evidence.desktop.halconRoutes.available === 13, "HALCON 路线仍有缺失入口");
assert(evidence.desktop.halconRoutes.planned === 0, "HALCON 路线仍显示规划中");
for (const href of routeLinks) {
  const response = await page.goto(`${base}${href}`, { waitUntil: "domcontentloaded" });
  const title = await page.locator("h1").textContent();
  const paragraphs = await page.locator(".article-content p").count();
  const codeBlocks = await page.locator(".code-block").count();
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  evidence.desktop.halconRoutes.articles.push({ href, status: response.status(), title, paragraphs, codeBlocks, noOverflow });
  assert(response.ok(), `${href} 无法访问`);
  assert(title?.trim(), `${href} 缺少文章标题`);
  assert(paragraphs >= 2, `${href} 正文内容不足`);
  assert(noOverflow, `${href} 桌面端出现横向溢出`);
  if (href.endsWith("halcon-shape-matching.html")) {
    await page.screenshot({ path: path.join(output, "shape-matching-desktop.png"), fullPage: true });
  }
}
const routeNavigationChecks = [
  { href: routeLinks[0], previous: 0, nextHref: routeLinks[1] },
  { href: routeLinks[9], previousHref: routeLinks[8], nextHref: routeLinks[10] },
  { href: routeLinks[12], previousHref: routeLinks[11], next: 0 }
];
evidence.desktop.routeNavigation = [];
for (const check of routeNavigationChecks) {
  await page.goto(`${base}${check.href}`, { waitUntil: "domcontentloaded" });
  const links = await page.locator(".prev-next a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  evidence.desktop.routeNavigation.push({ href: check.href, links });
  if (check.previous === 0) assert(links.length === 1 && links[0] === check.nextHref, "HALCON 首篇导航顺序错误");
  if (check.next === 0) assert(links.length === 1 && links[0] === check.previousHref, "HALCON 末篇导航顺序错误");
  if (check.previousHref && check.nextHref) assert(links[0] === check.previousHref && links[1] === check.nextHref, "HALCON 中间篇导航顺序错误");
}

const courseResponse = await page.goto(`${base}/articles/halcon-machine-vision-course-map.html`, { waitUntil: "networkidle" });
evidence.desktop.courseArticle = {
  status: courseResponse.status(),
  title: await page.locator("h1").textContent(),
  sections: await page.locator(".article-content h2").count(),
  sourceLink: await page.locator('a[href*="BV1ghtRzZEHu"]').first().getAttribute("href"),
  noHorizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
};
assert(courseResponse.ok(), "新增课程总览无法访问");
assert(evidence.desktop.courseArticle.title.includes("完整学习路线"), "新增课程标题不正确");
assert(evidence.desktop.courseArticle.sections >= 10, "课程总结章节不完整");
assert(evidence.desktop.courseArticle.sourceLink.includes("BV1ghtRzZEHu"), "视频来源链接缺失");
assert(evidence.desktop.courseArticle.noHorizontalOverflow, "课程总览桌面端出现横向溢出");
await page.screenshot({ path: path.join(output, "course-map-desktop.png"), fullPage: true });

const operatorGuideResponse = await page.goto(`${base}/articles/halcon-common-operator-guide.html`, { waitUntil: "networkidle" });
evidence.desktop.operatorGuide = {
  status: operatorGuideResponse.status(),
  title: await page.locator("h1").textContent(),
  operators: await page.locator(".article-content h3").allTextContents(),
  headingLinks: await page.locator(".operator-heading-link").count(),
  tocOperatorLinks: await page.locator("[data-operator-toc]").count(),
  searchLinks: await page.locator("[data-operator-name]").count(),
  tables: await page.locator(".article-content table").count(),
  noHorizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
};
assert(operatorGuideResponse.ok(), "HALCON 算子手册无法访问");
assert(evidence.desktop.operatorGuide.title.includes("常用算子介绍与选型手册"), "HALCON 算子手册标题不正确");
assert(evidence.desktop.operatorGuide.operators.length === 48, "HALCON 算子手册不是 48 个算子条目");
assert(evidence.desktop.operatorGuide.operators.includes("measure_pos"), "HALCON 算子手册缺少测量算子");
assert(evidence.desktop.operatorGuide.operators.includes("do_ocr_multi_class_mlp"), "HALCON 算子手册缺少 OCR 算子");
assert(evidence.desktop.operatorGuide.headingLinks === 48, "HALCON 算子正文标题未全部链接到独立参考页");
assert(evidence.desktop.operatorGuide.tocOperatorLinks === 48, "HALCON 算子目录未全部链接到独立参考页");
assert(evidence.desktop.operatorGuide.searchLinks === 48, "HALCON 算子搜索列表数量不正确");
assert(evidence.desktop.operatorGuide.tables >= 1, "HALCON 算子手册缺少参数选型速查表");
assert(evidence.desktop.operatorGuide.noHorizontalOverflow, "HALCON 算子手册桌面端出现横向溢出");
await page.screenshot({ path: path.join(output, "operator-guide-desktop.png"), fullPage: true });
await page.screenshot({ path: path.join(output, "operator-guide-search-desktop.png"), fullPage: false });

const operatorReferenceLinks = await page.locator("[data-operator-name]").evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
assert(operatorReferenceLinks.length === 48, `总手册中的独立算子链接不是 48 个，实际为 ${operatorReferenceLinks.length}`);
await page.locator("[data-operator-search-input]").fill("measure_pos");
evidence.desktop.operatorSearch = {
  summary: await page.locator("[data-operator-search-summary]").textContent(),
  visibleResults: await page.locator("[data-operator-name]:visible").count(),
  resultHref: await page.locator("[data-operator-name]:visible").first().getAttribute("href")
};
assert(evidence.desktop.operatorSearch.summary.includes("1"), "算子搜索结果数量提示不正确");
assert(evidence.desktop.operatorSearch.visibleResults === 1, "measure_pos 搜索没有精确筛选为一个结果");
assert(evidence.desktop.operatorSearch.resultHref === "/articles/reference-measure-pos.html", "measure_pos 搜索结果链接不正确");
await page.locator("[data-operator-name]:visible").click();
await page.waitForURL("**/articles/reference-measure-pos.html");
evidence.desktop.operatorSearch.openedTitle = await page.locator("h1").textContent();
evidence.desktop.operatorSearch.parentBreadcrumbHref = await page.locator('.breadcrumb a[href="/articles/halcon-common-operator-guide.html"]').getAttribute("href");
evidence.desktop.operatorSearch.parentBreadcrumbText = await page.locator('.breadcrumb a[href="/articles/halcon-common-operator-guide.html"]').textContent();
assert(evidence.desktop.operatorSearch.openedTitle === "measure_pos 算子参考", "点击算子搜索结果没有打开对应参考页");
assert(evidence.desktop.operatorSearch.parentBreadcrumbHref === "/articles/halcon-common-operator-guide.html", "算子页缺少返回总手册的上一级链接");
assert(evidence.desktop.operatorSearch.parentBreadcrumbText === "HALCON 常用算子介绍与选型手册", "算子页上一级标签文字不正确");
await page.screenshot({ path: path.join(output, "operator-reference-desktop.png"), fullPage: false });
await page.locator('.breadcrumb a[href="/articles/halcon-common-operator-guide.html"]').click();
await page.waitForURL("**/articles/halcon-common-operator-guide.html");
evidence.desktop.operatorSearch.returnedTitle = await page.locator("h1").textContent();
assert(evidence.desktop.operatorSearch.returnedTitle === "HALCON 常用算子介绍与选型手册", "点击上一级标签没有返回 HALCON 总手册");

await page.goto(`${base}/pages/reference.html`, { waitUntil: "networkidle" });
evidence.desktop.referenceListing = {
  cards: await page.locator(".content-card").count(),
  title: await page.locator(".content-card h3").first().textContent(),
  operatorCards: await page.locator('.content-card a[href^="/articles/reference-"]').count()
};
assert(evidence.desktop.referenceListing.cards === 1, "参考首页没有归并为一个总手册入口");
assert(evidence.desktop.referenceListing.title.includes("HALCON 常用算子介绍与选型手册"), "参考首页唯一入口不是 HALCON 总手册");
assert(evidence.desktop.referenceListing.operatorCards === 0, "参考首页仍平铺显示独立算子卡片");
evidence.desktop.operatorReferences = [];
for (const href of operatorReferenceLinks) {
  const response = await page.goto(`${base}${href}`, { waitUntil: "domcontentloaded" });
  const check = {
    href,
    status: response.status(),
    sections: await page.locator(".article-content h2").allTextContents(),
    parameterRows: await page.locator(".article-content table tbody tr").count(),
    codeBlocks: await page.locator(".code-block").count(),
    parentBreadcrumb: await page.locator('.breadcrumb a[href="/articles/halcon-common-operator-guide.html"]').count(),
    toc: await page.locator(".article-toc").count(),
    tocOperatorLinks: await page.locator('.article-toc a[href^="/articles/reference-"]').count(),
    currentTocItem: await page.locator('.article-toc a[aria-current="page"]').count(),
    ownSectionLinks: await page.locator('.article-toc a', { hasText: "算子签名" }).count(),
    noOverflow: await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  };
  evidence.desktop.operatorReferences.push(check);
  assert(response.ok(), `${href} 无法访问`);
  assert(["算子签名", "算子介绍", "参数", "参数设置", "最小示例", "适用场景", "常见组合", "注意事项"].every((section) => check.sections.includes(section)), `${href} 缺少统一模板章节`);
  assert(check.parameterRows >= 1, `${href} 参数表为空`);
  assert(check.codeBlocks >= 2, `${href} 缺少签名或最小示例代码块`);
  assert(check.parentBreadcrumb === 1, `${href} 缺少返回 HALCON 总手册的上一级标签`);
  assert(check.toc === 1, `${href} 没有保留 HALCON 总手册目录`);
  assert(check.tocOperatorLinks === 48, `${href} 的总手册目录算子数量不正确`);
  assert(check.currentTocItem === 1, `${href} 没有在总手册目录中高亮当前算子`);
  assert(check.ownSectionLinks === 0, `${href} 错误显示了算子自身章节目录`);
  assert(check.noOverflow, `${href} 桌面端出现横向溢出`);
}

await page.goto(`${base}/articles/halcon-threshold.html`, { waitUntil: "networkidle" });
evidence.desktop.articleColumns = await page.locator(".article-layout").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
evidence.desktop.codeLines = await page.locator(".code-line").count();
evidence.desktop.articleNoOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
assert(evidence.desktop.articleColumns === 3, "桌面教程不是三栏布局");
assert(evidence.desktop.codeLines >= 5, "代码行号结构未生成");
assert(evidence.desktop.articleNoOverflow, "桌面文章出现横向溢出");
await page.locator("[data-copy-code]").first().click();
evidence.desktop.copiedCode = await page.evaluate(() => navigator.clipboard.readText());
assert(evidence.desktop.copiedCode.includes("threshold"), "代码复制内容不正确");
await page.locator("[data-image-open]").first().click();
evidence.desktop.imageDialogOpened = await page.locator("[data-image-dialog]").isVisible();
assert(evidence.desktop.imageDialogOpened, "图片放大对话框未打开");
await page.keyboard.press("Escape");
evidence.desktop.imageDialogClosed = !(await page.locator("[data-image-dialog]").isVisible());
assert(evidence.desktop.imageDialogClosed, "图片放大对话框未关闭");
await page.screenshot({ path: path.join(output, "article-desktop.png"), fullPage: true });

await page.goto(`${base}/search.html?q=threshold`, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.querySelectorAll("[data-search-results] article").length > 0);
evidence.desktop.searchSummary = await page.locator("[data-search-summary]").textContent();
evidence.desktop.searchResults = await page.locator("[data-search-results] article").count();
evidence.desktop.searchTypes = await page.locator("[data-search-results] article > span").allTextContents();
assert(evidence.desktop.searchResults >= 2, "搜索未覆盖多个内容类型");
assert(evidence.desktop.searchTypes.includes("教程") && evidence.desktop.searchTypes.includes("参考"), "搜索类型覆盖不完整");
await page.screenshot({ path: path.join(output, "search-desktop.png"), fullPage: true });
await page.goto(`${base}/search.html?q=${encodeURIComponent("双目视觉")}`, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.querySelectorAll("[data-search-results] article").length > 0);
evidence.desktop.courseSearchTitle = await page.locator("[data-search-results] h2").first().textContent();
assert(evidence.desktop.courseSearchTitle.includes("完整学习路线"), "新增课程内容未进入搜索索引");
evidence.desktop.operatorGuideSearch = {};
for (const keyword of ["measure_pos", "OCR", "形态学", "参数设置"]) {
  await page.goto(`${base}/search.html?q=${encodeURIComponent(keyword)}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.querySelectorAll("[data-search-results] article").length > 0);
  const titles = await page.locator("[data-search-results] h2").allTextContents();
  evidence.desktop.operatorGuideSearch[keyword] = titles;
  assert(titles.some((title) => title.includes("常用算子介绍与选型手册")), `HALCON 算子手册无法通过 ${keyword} 检索`);
}
assert(evidence.desktop.operatorGuideSearch.measure_pos.some((title) => title === "measure_pos 算子参考"), "measure_pos 独立参考页未进入搜索索引");
await page.locator("#search-input").fill("不存在的测试词");
await page.locator("[data-search-form]").evaluate((form) => form.requestSubmit());
evidence.desktop.emptySearchShown = await page.locator(".empty-state").isVisible();
assert(evidence.desktop.emptySearchShown, "无结果搜索未显示空状态");

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["clipboard-read", "clipboard-write"] });
const mobilePage = await mobile.newPage();
mobilePage.on("console", (message) => { if (message.type() === "error") evidence.consoleErrors.push(`mobile: ${message.text()}`); });
await mobilePage.goto(`${base}/index.html`, { waitUntil: "networkidle" });
evidence.mobile.noHorizontalOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
await mobilePage.screenshot({ path: path.join(output, "home-mobile.png"), fullPage: true });
await mobilePage.locator("[data-menu-button]").click();
evidence.mobile.menuExpanded = await mobilePage.locator("[data-menu-button]").getAttribute("aria-expanded");
evidence.mobile.navVisible = await mobilePage.locator("[data-site-nav]").isVisible();
assert(evidence.mobile.noHorizontalOverflow, "手机首页出现横向溢出");
assert(evidence.mobile.menuExpanded === "true" && evidence.mobile.navVisible, "手机导航未展开");
await mobilePage.screenshot({ path: path.join(output, "menu-mobile.png"), fullPage: false });
await mobilePage.locator('[data-site-nav] a[href="/pages/learn.html"]').click();
await mobilePage.waitForURL("**/pages/learn.html");
evidence.mobile.menuNavigationHeading = await mobilePage.locator("h1").textContent();
assert(evidence.mobile.menuNavigationHeading.includes("按知识路径"), "手机菜单点击后未进入学习页");

evidence.mobile.halconRoutes = [];
for (const href of routeLinks) {
  const response = await mobilePage.goto(`${base}${href}`, { waitUntil: "domcontentloaded" });
  const noOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  const columns = await mobilePage.locator(".article-layout").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
  evidence.mobile.halconRoutes.push({ href, status: response.status(), noOverflow, columns });
  assert(response.ok(), `${href} 手机端无法访问`);
  assert(noOverflow, `${href} 手机端出现横向溢出`);
  assert(columns === 1, `${href} 手机端不是单栏`);
  if (href.endsWith("halcon-ocr.html")) {
    await mobilePage.screenshot({ path: path.join(output, "ocr-mobile.png"), fullPage: true });
  }
}

await mobilePage.goto(`${base}/articles/halcon-threshold.html`, { waitUntil: "networkidle" });
evidence.mobile.articleColumns = await mobilePage.locator(".article-layout").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
evidence.mobile.articleNoOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
evidence.mobile.codeScrollable = await mobilePage.locator(".code-block pre").first().evaluate((element) => getComputedStyle(element).overflowX === "auto");
assert(evidence.mobile.articleColumns === 1, "手机教程未切换为单栏");
assert(evidence.mobile.articleNoOverflow, "手机教程出现页面级横向溢出");
assert(evidence.mobile.codeScrollable, "手机代码块不能横向滚动");
await mobilePage.screenshot({ path: path.join(output, "article-mobile.png"), fullPage: true });

await mobilePage.goto(`${base}/articles/halcon-machine-vision-course-map.html`, { waitUntil: "networkidle" });
evidence.mobile.courseNoOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
evidence.mobile.courseTables = await mobilePage.locator(".article-content table").count();
assert(evidence.mobile.courseNoOverflow, "课程总览手机端出现横向溢出");
assert(evidence.mobile.courseTables >= 3, "课程总览表格未生成");
await mobilePage.screenshot({ path: path.join(output, "course-map-mobile.png"), fullPage: true });

await mobilePage.goto(`${base}/articles/halcon-common-operator-guide.html`, { waitUntil: "networkidle" });
evidence.mobile.operatorGuide = {
  noHorizontalOverflow: await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  columns: await mobilePage.locator(".article-layout").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length),
  tableOverflow: await mobilePage.locator(".article-content table").first().evaluate((table) => getComputedStyle(table).overflowX),
  searchVisible: await mobilePage.locator("[data-operator-search]").isVisible()
};
assert(evidence.mobile.operatorGuide.noHorizontalOverflow, "HALCON 算子手册手机端出现页面级横向溢出");
assert(evidence.mobile.operatorGuide.columns === 1, "HALCON 算子手册手机端不是单栏");
assert(["auto", "scroll"].includes(evidence.mobile.operatorGuide.tableOverflow), "HALCON 算子手册手机端表格不能横向滚动");
assert(evidence.mobile.operatorGuide.searchVisible, "HALCON 算子搜索框在手机端不可见");
await mobilePage.locator("[data-operator-search-input]").fill("ocr_class");
evidence.mobile.operatorSearchResults = await mobilePage.locator("[data-operator-name]:visible").count();
assert(evidence.mobile.operatorSearchResults === 2, "手机端算子搜索筛选结果不正确");
await mobilePage.screenshot({ path: path.join(output, "operator-guide-search-mobile.png"), fullPage: false });
await mobilePage.screenshot({ path: path.join(output, "operator-guide-mobile.png"), fullPage: true });

evidence.mobile.operatorReferences = [];
for (const href of operatorReferenceLinks) {
  const response = await mobilePage.goto(`${base}${href}`, { waitUntil: "domcontentloaded" });
  const check = {
    href,
    status: response.status(),
    columns: await mobilePage.locator(".article-layout").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length),
    noOverflow: await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    tableOverflow: await mobilePage.locator(".article-content table").first().evaluate((table) => getComputedStyle(table).overflowX),
    toc: await mobilePage.locator(".article-toc").count(),
    tocVisible: await mobilePage.locator(".article-toc").isVisible()
  };
  evidence.mobile.operatorReferences.push(check);
  assert(response.ok(), `${href} 手机端无法访问`);
  assert(check.columns === 1, `${href} 手机端不是单栏`);
  assert(check.noOverflow, `${href} 手机端出现页面级横向溢出`);
  assert(["auto", "scroll"].includes(check.tableOverflow), `${href} 手机端参数表不能横向滚动`);
  assert(check.toc === 1, `${href} 手机端 DOM 中缺少总手册目录`);
  assert(!check.tocVisible, `${href} 手机端侧栏没有按响应式规则隐藏`);
}
await mobilePage.goto(`${base}/articles/reference-create-shape-model.html`, { waitUntil: "networkidle" });
await mobilePage.screenshot({ path: path.join(output, "operator-reference-mobile.png"), fullPage: true });

await browser.close();
assert(evidence.consoleErrors.length === 0, `浏览器控制台错误: ${evidence.consoleErrors.join("; ")}`);
fs.writeFileSync(path.join(output, "evidence.json"), JSON.stringify(evidence, null, 2));
console.log(JSON.stringify(evidence, null, 2));
