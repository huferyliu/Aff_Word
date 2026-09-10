const menuButton = document.querySelector("[data-menu-button]");
const siteNav = document.querySelector("[data-site-nav]");

const operatorSearch = document.querySelector("[data-operator-search]");
const operatorSearchInput = operatorSearch?.querySelector("[data-operator-search-input]");
const operatorSearchClear = operatorSearch?.querySelector("[data-operator-search-clear]");
const operatorSearchSummary = operatorSearch?.querySelector("[data-operator-search-summary]");
const operatorSearchItems = [...(operatorSearch?.querySelectorAll("[data-operator-name]") || [])];

function updateOperatorSearch() {
  const query = operatorSearchInput?.value.trim().toLowerCase() || "";
  let matches = 0;
  operatorSearchItems.forEach((item) => {
    const visible = !query || item.dataset.operatorName.includes(query);
    item.hidden = !visible;
    if (visible) matches += 1;
  });
  document.querySelectorAll("[data-operator-toc]").forEach((item) => {
    item.hidden = Boolean(query) && !item.dataset.operatorToc.includes(query);
  });
  if (operatorSearchSummary) operatorSearchSummary.textContent = query ? `找到 ${matches} 个算子` : `共 ${matches} 个常用算子`;
  if (operatorSearchClear) operatorSearchClear.hidden = !query;
}

operatorSearchInput?.addEventListener("input", updateOperatorSearch);
operatorSearchClear?.addEventListener("click", () => {
  operatorSearchInput.value = "";
  updateOperatorSearch();
  operatorSearchInput.focus();
});

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "打开导航" : "关闭导航");
  siteNav?.toggleAttribute("data-open", !open);
});

document.addEventListener("click", async (event) => {
  const copyButton = event.target.closest("[data-copy-code]");
  if (copyButton) {
    const code = copyButton.closest(".code-block")?.querySelector("code")?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      copyButton.textContent = "已复制";
      setTimeout(() => { copyButton.textContent = "复制"; }, 1600);
    } catch {
      copyButton.textContent = "复制失败";
    }
  }

  const imageTrigger = event.target.closest("[data-image-open]");
  if (imageTrigger) {
    const dialog = document.querySelector("[data-image-dialog]");
    const image = dialog?.querySelector("[data-dialog-image]");
    const source = imageTrigger.dataset.imageOpen || imageTrigger.closest("[data-image-open]")?.dataset.imageOpen;
    if (dialog && image && source) {
      image.src = source;
      image.alt = imageTrigger.querySelector?.("img")?.alt || "放大图片";
      dialog.hidden = false;
      document.body.classList.add("dialog-open");
      dialog.querySelector("[data-dialog-close]")?.focus();
    }
  }

  if (event.target.closest("[data-dialog-close]") || event.target.matches("[data-image-dialog]")) {
    const dialog = document.querySelector("[data-image-dialog]");
    if (dialog) dialog.hidden = true;
    document.body.classList.remove("dialog-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
    event.preventDefault();
    location.href = "/search.html";
  }
  if (event.key === "Escape") {
    const dialog = document.querySelector("[data-image-dialog]");
    if (dialog && !dialog.hidden) {
      dialog.hidden = true;
      document.body.classList.remove("dialog-open");
    }
  }
});
