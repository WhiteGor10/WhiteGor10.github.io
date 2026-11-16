# WhiteGor10 游戏作品集

基于 Vite、React 和 TypeScript 构建的静态个人游戏作品集。游戏信息统一维护在 `src/data/games.json`，支持名称搜索、分类筛选和发布日期排序；无需后端或内容管理系统。

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

构建静态网站并在本地预览：

```bash
npm run build
npm run preview
```

## 新增游戏

1. 将封面图片放到 `public/images/games/`，推荐使用压缩后的 WebP 图片。
2. 在 `src/data/games.json` 数组中追加一个游戏对象。
3. 图片路径填写相对于 `public/` 的路径（例如 `images/games/my-game.webp`），不要以 `/` 开头。
4. 若有介绍视频，填写 `videoUrl`；没有时可省略、设为 `null` 或空字符串。
5. 运行 `npm run dev` 检查，再提交并推送到 `main` 分支。

示例：

```json
{
  "id": "my-game",
  "title": "My Game",
  "description": "简短介绍游戏内容。",
  "releaseDate": "2026-01-30",
  "categories": ["Puzzle", "Casual"],
  "image": "images/games/my-game.webp",
  "downloadUrl": "https://example.com/download/my-game",
  "videoUrl": "https://www.youtube.com/watch?v=example"
}
```

## 游戏字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 唯一 ID，建议使用 URL 友好的 slug。 |
| `title` | string | 是 | 游戏名称；搜索只匹配此字段。 |
| `description` | string | 是 | 简短游戏介绍。 |
| `releaseDate` | string | 是 | ISO 日期，格式为 `YYYY-MM-DD`。 |
| `categories` | string[] | 是 | 分类标签；筛选选项会根据所有游戏自动生成。 |
| `image` | string | 是 | 相对于 `public/` 的封面路径，例如 `images/games/my-game.webp`。 |
| `downloadUrl` | string | 是 | 下载地址；有效的 HTTP(S) 地址才会显示为可用链接。 |
| `videoUrl` | string \| null | 否 | 介绍视频的外部链接；省略、`null` 或空字符串时不显示视频链接。 |
| `featured` | boolean | 否 | 是否显示“精选作品”标记。 |
| `status` | string | 否 | 可选的游戏状态，例如 `released` 或 `prototype`。 |

## GitHub Pages 部署

仓库已配置 `.github/workflows/deploy.yml`。推送到 `main` 后，GitHub Actions 会安装依赖、构建 `dist` 并部署到 GitHub Pages；也可以在 Actions 页面手动运行工作流。Vite 使用根路径 `base: '/'`，适用于 `WhiteGor10.github.io` 用户/组织站点。请在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
