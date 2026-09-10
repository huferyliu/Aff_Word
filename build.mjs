import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

const root = process.cwd();
const out = path.join(root, "dist");
const contentRoot = path.join(root, "content");

const typeNames = {
  tutorial: "教程",
  note: "笔记",
  experiment: "实验",
  project: "项目",
  reference: "参考"
};

const typePages = {
  tutorial: "learn",
  note: "notes",
  experiment: "experiments",
  project: "projects",
  reference: "reference"
};

const navItems = [
  ["首页", "/index.html", "home"],
  ["学习", "/pages/learn.html", "learn"],
  ["笔记", "/pages/notes.html", "notes"],
  ["实验", "/pages/experiments.html", "experiments"],
  ["项目", "/pages/projects.html", "projects"],
  ["参考", "/pages/reference.html", "reference"]
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? escapeHtml(value)
    : new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function nav(active) {
  return navItems
    .map(([label, href, key]) => `<a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("");
}

function shell({ title, description, active, body, article = false }) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <title>${escapeHtml(title)} | Aff Tech Lab</title>
  <link rel="icon" href="/assets/images/favicon.png" type="image/png">
  <link rel="stylesheet" href="/assets/css/main.css">
  ${article ? '<link rel="stylesheet" href="/assets/css/article.css">' : ""}
  <script src="/assets/js/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">跳到正文</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/index.html" aria-label="Aff Tech Lab 首页"><span class="brand-mark">A</span><span>Aff Tech Lab</span></a>
      <button class="menu-button icon-button" type="button" aria-label="打开导航" aria-expanded="false" data-menu-button>☰</button>
      <nav class="site-nav" aria-label="主导航" data-site-nav>${nav(active)}</nav>
      <a class="search-link" href="/search.html">搜索 <kbd>/</kbd></a>
    </div>
  </header>
  <main id="main">${body}</main>
  <footer class="site-footer">
    <div><strong>Aff Tech Lab</strong><span>个人技术学习与知识库</span></div>
    <p>教程用于学习，笔记用于理解，实验用于实践。</p>
    <small>© 2026 Aff Tech Lab</small>
  </footer>
  <div class="image-dialog" role="dialog" aria-modal="true" aria-label="图片预览" hidden data-image-dialog>
    <button class="dialog-close icon-button" type="button" aria-label="关闭图片预览" data-dialog-close>×</button>
    <img alt="" data-dialog-image>
  </div>
</body>
</html>`;
}

function card(article) {
  return `<article class="content-card">
    <div class="card-meta"><span>${typeNames[article.type]}</span><time datetime="${article.date}">${formatDate(article.date)}</time></div>
    <h3><a href="${article.url}">${escapeHtml(article.title)}</a></h3>
    <p>${escapeHtml(article.description)}</p>
    <div class="tag-row">${article.tags.slice(0, 3).map((tag) => `<a href="/tags/${slugify(tag)}.html">#${escapeHtml(tag)}</a>`).join("")}</div>
  </article>`;
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugify(tokens.map((token) => token.raw).join(""));
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    },
    image({ href, title, text }) {
      const caption = title || text;
      return `<figure class="article-figure"><button type="button" class="image-open" data-image-open="${href}" aria-label="放大图片：${escapeHtml(text)}"><img src="${href}" alt="${escapeHtml(text)}" loading="lazy"></button>${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}</figure>`;
    },
    code({ text, lang }) {
      const language = lang === "halcon" ? "plaintext" : lang;
      const highlighted = language && hljs.getLanguage(language)
        ? hljs.highlight(text, { language }).value
        : escapeHtml(text);
      const lines = highlighted.split("\n").map((line) => `<span class="code-line">${line || " "}</span>`).join("");
      return `<div class="code-block"><div class="code-toolbar"><span>${escapeHtml(lang || "text")}</span><button type="button" data-copy-code>复制</button></div><pre><code class="hljs language-${escapeHtml(lang || "text")}">${lines}</code></pre></div>`;
    }
  }
});

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync(path.join(root, "assets"), path.join(out, "assets"), { recursive: true });

const articles = walk(contentRoot)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const parsed = matter(fs.readFileSync(file, "utf8"));
    const slug = parsed.data.slug || path.basename(file, ".md");
    return {
      ...parsed.data,
      tags: parsed.data.tags || [],
      slug,
      url: `/articles/${slug}.html`,
      content: parsed.content
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

function extractHeadings(html) {
  return [...html.matchAll(/<h([23]) id="([^"]+)">(.+?)<\/h\1>/g)].map((match) => ({
    level: match[1],
    id: match[2],
    text: match[3].replace(/<[^>]+>/g, "")
  }));
}

const operatorGuideArticle = articles.find((article) => article.slug === "halcon-common-operator-guide");
const operatorGuideHeadings = operatorGuideArticle
  ? extractHeadings(marked.parse(operatorGuideArticle.content))
  : [];

function heroStat(value, label) {
  return `<div><strong>${value}</strong><span>${label}</span></div>`;
}

const homeBody = `
<section class="home-intro page-width">
  <div class="intro-copy">
    <p class="eyebrow">个人技术知识库</p>
    <h1>让每次学习，都能成为下一次实践的起点。</h1>
    <p>围绕机器视觉、HALCON、Python、AI 与 Codex，持续整理教程、实验记录和项目方法。</p>
    <form class="hero-search" action="/search.html">
      <label class="sr-only" for="home-search">搜索知识库</label>
      <input id="home-search" name="q" type="search" placeholder="搜索 threshold、连通域、Codex…">
      <button type="submit">搜索</button>
    </form>
  </div>
  <div class="signal-panel" aria-label="知识库概况">
    <div class="signal-image"><img src="/assets/images/vision-overview.png" alt="齿轮机器视觉分析结果示意图"></div>
    <div class="signal-stats">${heroStat(articles.length, "篇内容")}${heroStat(6, "个主题")}${heroStat(13, "段 HALCON 路线")}</div>
  </div>
</section>
<section class="section page-width">
  <div class="section-heading"><div><p class="eyebrow">学习中心</p><h2>从路线进入，而不是迷失在文章流里</h2></div><a href="/pages/learn.html">查看全部路线</a></div>
  <div class="category-grid">
    ${[
      ["HALCON / 机器视觉", "13 段路线", "从图像基础到 OCR 与综合案例", "halcon"],
      ["Python", "基础入门", "变量、流程控制、函数与数据结构", "python"],
      ["Codex", "实践工作流", "从基本使用到真实项目协作", "codex"],
      ["AI", "概念与应用", "模型、提示词与工程落地", "ai"]
    ].map(([name, count, desc, key], i) => `<a class="category-item" href="/pages/learn.html#${key}"><span>0${i + 1}</span><div><h3>${name}</h3><p>${desc}</p></div><strong>${count}</strong></a>`).join("")}
  </div>
</section>
<section class="section section-band">
  <div class="page-width">
    <div class="section-heading"><div><p class="eyebrow">最近更新</p><h2>刚刚整理进知识库</h2></div></div>
    <div class="card-grid">${articles.slice(0, 6).map(card).join("")}</div>
  </div>
</section>
<section class="section page-width experiment-feature">
  <div class="feature-image"><img src="/assets/images/gear-process.png" alt="齿轮边缘处理的三阶段图像" data-image-open="/assets/images/gear-process.png"></div>
  <div><p class="eyebrow">实验案例</p><h2>齿轮边缘毛刺去除</h2><p>从原始图像、阈值分割到形态学清理，保留每次尝试和关键参数，而不只展示最终答案。</p><a class="text-link" href="/articles/gear-burr-removal.html">查看完整实验</a></div>
</section>`;

fs.writeFileSync(path.join(out, "index.html"), shell({ title: "首页", description: "Aff Tech Lab 个人技术学习与知识库", active: "home", body: homeBody }));

const routes = ["图像处理基础", "HALCON 基础", "图像读取与显示", "灰度图像处理", "阈值分割", "区域与连通域", "形态学", "边缘检测", "Blob 分析", "模板匹配", "几何测量", "OCR", "综合案例"];
const routeLinks = [
  "machine-vision-basics",
  "halcon-machine-vision-course-map",
  "halcon-image-io-display",
  "halcon-gray-processing",
  "halcon-threshold",
  "halcon-regions-connectivity",
  "halcon-morphology",
  "halcon-edge-detection",
  "halcon-blob-analysis",
  "halcon-shape-matching",
  "halcon-geometric-measurement",
  "halcon-ocr",
  "halcon-project-workflow"
];
const learnBody = `<div class="page-header page-width"><p class="eyebrow">学习中心</p><h1>按知识路径稳步推进</h1><p>课程按技术领域组织。HALCON 路线从视觉基础延伸到完整案例，其他主题持续补充。</p></div>
<section class="page-width learn-layout" id="halcon"><div><div class="section-heading"><div><h2>HALCON / 机器视觉</h2><p>从基础概念到工业视觉应用</p></div><span class="status">13 个章节</span></div><ol class="route-list">${routes.map((name, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><div><strong>${name}</strong><small>${routeLinks[i] ? "已有内容" : "规划中"}</small></div>${routeLinks[i] ? `<a href="/articles/${routeLinks[i]}.html">开始学习</a>` : ""}</li>`).join("")}</ol></div><aside class="learn-aside"><h2>其他学习主题</h2>${[["python", "Python", "2 篇"], ["codex", "Codex", "1 篇"], ["ai", "AI", "1 篇"], ["opencv", "OpenCV", "规划中"]].map(([id, name, value]) => `<div id="${id}"><strong>${name}</strong><span>${value}</span></div>`).join("")}</aside></section>`;

function listingPage(type, title, intro, active) {
  const items = articles.filter((article) => article.type === type && article.listed !== false);
  return shell({ title, description: intro, active, body: `<div class="page-header page-width"><p class="eyebrow">${title}</p><h1>${intro}</h1><p>共 ${items.length} 篇内容，按最近更新时间排列。</p></div><section class="page-width section"><div class="card-grid">${items.map(card).join("")}</div></section>` });
}

fs.mkdirSync(path.join(out, "pages"), { recursive: true });
fs.writeFileSync(path.join(out, "pages", "learn.html"), shell({ title: "学习", description: "HALCON、Python、AI 与 Codex 学习路线", active: "learn", body: learnBody }));
fs.writeFileSync(path.join(out, "pages", "notes.html"), listingPage("note", "我的笔记", "把个人理解、参数经验和踩坑记录留下来", "notes"));
fs.writeFileSync(path.join(out, "pages", "experiments.html"), listingPage("experiment", "实验中心", "记录真实操作过程和每一次关键尝试", "experiments"));
fs.writeFileSync(path.join(out, "pages", "projects.html"), listingPage("project", "项目中心", "把分散实验组织成可复用的完整系统", "projects"));
fs.writeFileSync(path.join(out, "pages", "reference.html"), listingPage("reference", "参考手册", "快速查到算子、参数和最小可用示例", "reference"));

fs.mkdirSync(path.join(out, "articles"), { recursive: true });
articles.forEach((article, index) => {
  let html = marked.parse(article.content);
  const isOperatorGuide = article.slug === "halcon-common-operator-guide";
  const isOperatorReference = article.type === "reference" && article.slug.startsWith("reference-");
  if (isOperatorGuide) {
    html = html.replace(/<h3 id="([^"]+)">([^<]+)<\/h3>/g, (_match, id, name) => {
      const href = `/articles/reference-${name.trim().replaceAll("_", "-")}.html`;
      return `<h3 id="${id}"><a class="operator-heading-link" href="${href}">${name}</a></h3>`;
    });
  }
  const headings = extractHeadings(html);
  const operatorHeadings = isOperatorGuide ? headings.filter((heading) => heading.level === "3") : [];
  const operatorSearch = isOperatorGuide ? `<section class="operator-search" data-operator-search><label for="operator-search-input">搜索算子</label><div class="operator-search-control"><input id="operator-search-input" type="search" placeholder="输入算子名称，例如 measure_pos" autocomplete="off" data-operator-search-input><button type="button" aria-label="清空算子搜索" title="清空" data-operator-search-clear hidden>×</button></div><p class="operator-search-summary" aria-live="polite" data-operator-search-summary>共 ${operatorHeadings.length} 个常用算子</p><div class="operator-search-results" data-operator-search-results>${operatorHeadings.map((heading) => `<a href="/articles/reference-${heading.text.replaceAll("_", "-")}.html" data-operator-name="${heading.text.toLowerCase()}">${heading.text}</a>`).join("")}</div></section>` : "";
  const routeIndex = routeLinks.indexOf(article.slug);
  const previous = routeIndex >= 0
    ? articles.find((item) => item.slug === routeLinks[routeIndex - 1])
    : articles[index + 1];
  const next = routeIndex >= 0
    ? articles.find((item) => item.slug === routeLinks[routeIndex + 1])
    : articles[index - 1];
  const breadcrumb = `<div class="breadcrumb page-width"><a href="/index.html">首页</a><span>/</span><a href="/pages/${typePages[article.type]}.html">${typeNames[article.type]}</a>${isOperatorReference ? '<span>/</span><a href="/articles/halcon-common-operator-guide.html">HALCON 常用算子介绍与选型手册</a>' : ""}<span>/</span><span>${escapeHtml(article.title)}</span></div>`;
  const tocHeadings = isOperatorReference ? operatorGuideHeadings : headings;
  const toc = `<aside class="article-toc${isOperatorReference ? " operator-guide-toc" : ""}"><strong>${isOperatorReference ? "HALCON 算子目录" : "本页目录"}</strong><nav>${tocHeadings.map((heading) => {
    const operatorHref = `/articles/reference-${heading.text.replaceAll("_", "-")}.html`;
    const href = heading.level === "3" && (isOperatorGuide || isOperatorReference)
      ? operatorHref
      : `${isOperatorReference ? "/articles/halcon-common-operator-guide.html" : ""}#${heading.id}`;
    const current = isOperatorReference && href === article.url ? ' aria-current="page"' : "";
    const operatorData = heading.level === "3" && isOperatorGuide ? ` data-operator-toc="${heading.text.toLowerCase()}"` : "";
    return `<a class="level-${heading.level}"${operatorData} href="${href}"${current}>${escapeHtml(heading.text)}</a>`;
  }).join("")}</nav></aside>`;
  const body = `${breadcrumb}
  <div class="article-layout page-width">
    ${toc}
    <article class="article-main"><header><div class="article-meta"><span>${typeNames[article.type]}</span><span>${escapeHtml(article.category)}</span><time datetime="${article.date}">${formatDate(article.date)}</time></div><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.description)}</p></header>${operatorSearch}<div class="article-content">${html}</div><nav class="prev-next" aria-label="文章导航">${previous ? `<a href="${previous.url}"><small>上一篇</small><strong>${escapeHtml(previous.title)}</strong></a>` : "<span></span>"}${next ? `<a href="${next.url}"><small>下一篇</small><strong>${escapeHtml(next.title)}</strong></a>` : ""}</nav></article>
    <aside class="article-info"><div><strong>内容信息</strong><dl><dt>难度</dt><dd>${escapeHtml(article.level || "基础")}</dd><dt>分类</dt><dd>${escapeHtml(article.category)}</dd><dt>更新</dt><dd>${formatDate(article.date)}</dd></dl></div><div><strong>相关标签</strong><div class="tag-row">${article.tags.map((tag) => `<a href="/tags/${slugify(tag)}.html">#${escapeHtml(tag)}</a>`).join("")}</div></div></aside>
  </div>`;
  fs.writeFileSync(path.join(out, "articles", `${article.slug}.html`), shell({ title: article.title, description: article.description, active: typePages[article.type], body, article: true }));
});

const allTags = [...new Set(articles.flatMap((article) => article.tags))];
fs.mkdirSync(path.join(out, "tags"), { recursive: true });
allTags.forEach((tag) => {
  const related = articles.filter((article) => article.tags.includes(tag));
  const body = `<div class="page-header page-width"><p class="eyebrow">标签</p><h1>#${escapeHtml(tag)}</h1><p>找到 ${related.length} 篇关联内容。</p></div><section class="page-width section"><div class="card-grid">${related.map(card).join("")}</div></section>`;
  fs.writeFileSync(path.join(out, "tags", `${slugify(tag)}.html`), shell({ title: `#${tag}`, description: `${tag} 相关内容`, body }));
});

const searchBody = `<div class="page-header page-width"><p class="eyebrow">全局搜索</p><h1>从整个知识库中找到答案</h1><p>搜索教程、笔记、实验、项目和参考手册。</p></div><section class="search-page page-width"><form data-search-form><label for="search-input">关键词</label><div><input id="search-input" type="search" placeholder="输入标题、标签或关键词" autocomplete="off"><button type="submit">搜索</button></div></form><div class="search-summary" aria-live="polite" data-search-summary>输入关键词开始搜索</div><div class="search-results" data-search-results></div></section><script src="/assets/js/search.js" defer></script>`;
fs.writeFileSync(path.join(out, "search.html"), shell({ title: "搜索", description: "搜索 Aff Tech Lab 全部内容", body: searchBody }));

fs.mkdirSync(path.join(out, "data"), { recursive: true });
fs.writeFileSync(path.join(out, "data", "articles.json"), JSON.stringify(articles.map(({ content, ...article }) => article), null, 2));
fs.writeFileSync(path.join(out, "data", "search-index.json"), JSON.stringify(articles.map(({ content, ...article }) => ({ ...article, keywords: `${article.title} ${article.description} ${article.category} ${article.tags.join(" ")} ${content.replace(/[#*`\[\]()]/g, " ")}` })), null, 2));
fs.writeFileSync(path.join(out, "data", "tags.json"), JSON.stringify(allTags, null, 2));

console.log(`Built ${articles.length} articles and ${allTags.length} tag pages into ${out}`);
