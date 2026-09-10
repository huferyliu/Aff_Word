# Aff Tech Lab

Aff Tech Lab 是一个由 Markdown 构建的静态技术知识库，包含 HALCON、机器视觉和 Codex 学习内容。

## 本地运行

```powershell
pnpm install
pnpm build
pnpm verify
pnpm serve
```

访问 `http://127.0.0.1:4173/`。

## GitHub Pages

推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动构建并发布站点。项目仓库为 `huferyliu/Aff_Word` 时，网站地址是：

`https://huferyliu.github.io/Aff_Word/`

本地预览 GitHub Pages 子路径：

```powershell
pnpm build
$env:PAGES_BASE_PATH = "/Aff_Word"
pnpm pages:prepare
pnpm pages:verify
pnpm pages:serve
```

访问 `http://127.0.0.1:4174/Aff_Word/`。
