const form = document.querySelector("[data-search-form]");
const input = document.querySelector("#search-input");
const results = document.querySelector("[data-search-results]");
const summary = document.querySelector("[data-search-summary]");
let index = [];

const typeNames = { tutorial: "教程", note: "笔记", experiment: "实验", project: "项目", reference: "参考" };
const escapeHtml = (value = "") => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function render(query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    results.innerHTML = "";
    summary.textContent = "输入关键词开始搜索";
    return;
  }
  const matches = index.filter((item) => terms.every((term) => item.keywords.toLowerCase().includes(term)));
  summary.textContent = `“${query}” 找到 ${matches.length} 条结果`;
  results.innerHTML = matches.length ? matches.map((item) => `<article><span>${typeNames[item.type]}</span><div><h2><a href="${item.url}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.description)}</p><small>${escapeHtml(item.category)} · ${item.tags.map((tag) => `#${escapeHtml(tag)}`).join(" ")}</small></div></article>`).join("") : `<div class="empty-state"><strong>没有找到匹配内容</strong><p>试试更短的关键词，或搜索分类名称。</p></div>`;
}

fetch("/data/search-index.json")
  .then((response) => {
    if (!response.ok) throw new Error("索引加载失败");
    return response.json();
  })
  .then((data) => {
    index = data;
    const query = new URLSearchParams(location.search).get("q") || "";
    input.value = query;
    if (query) render(query);
    input.focus();
  })
  .catch(() => { summary.textContent = "搜索索引加载失败，请刷新页面重试"; });

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value.trim();
  history.replaceState(null, "", query ? `?q=${encodeURIComponent(query)}` : location.pathname);
  render(query);
});
