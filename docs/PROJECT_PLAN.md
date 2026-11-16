# 个人游戏作品集网站 项目策划

## 1. 项目概述
创建一个可托管在 GitHub Pages 上的静态个人游戏作品集网站。网站主要用于展示开发者做过的所有游戏，并支持用户按游戏名称搜索、按分类筛选、按发布日期排序。个人介绍区域先预留位置，暂不填充内容。

## 2. 核心目标
- 展示全部游戏作品。
- 每个游戏展示：图片、名称、描述、发布日期、分类、下载链接、可选的介绍视频链接。
- 支持按游戏名称搜索。
- 支持按分类筛选。
- 支持按发布日期排序，默认最新发布在前。
- 开发者新增游戏时，只需添加图片和修改数据文件，不需要改页面代码。
- 使用纯静态方案，可部署到 GitHub Pages。
- 页面在桌面端和移动端均可正常使用。

## 3. MVP 范围

### 3.1 本阶段包含
- 单页网站结构。
- 游戏列表区域。
- 游戏卡片展示。
- 搜索框：按游戏名称实时搜索，大小写不敏感。
- 分类筛选：从游戏数据中自动生成分类选项，包含“全部分类”。
- 排序：按发布日期“最新优先 / 最早优先”，默认最新优先。
- 搜索、分类、排序可组合使用。
- 无结果空状态提示。
- 可选视频链接：有视频的游戏显示“观看介绍视频”按钮，没有则隐藏。
- 个人介绍区域仅预留 `<section id="about">` 占位，不显示介绍正文。
- GitHub Pages 部署配置。
- README 中写明新增游戏步骤。

### 3.2 本阶段不包含
- 个人介绍正文内容。
- 登录、后台管理、数据库、评论、支付。
- 游戏详情页。
- 多语言。
- 下载统计。
- CMS 内容管理系统。
- 服务端搜索或服务端排序。
- 视频内嵌播放器（只提供跳转链接）。

## 4. 页面结构
建议采用单页结构：

1. Header
   - 网站名称 / Logo 文本
   - 导航：Games
   - About 导航暂不加入，避免跳到空内容

2. 游戏展示区
   - 区域标题
   - 工具栏：搜索框、分类筛选、排序选择
   - 结果数量提示
   - 游戏卡片网格
   - 空状态提示

3. 个人介绍预留区
   - `<section id="about">`
   - 内部仅保留 TODO 注释，不展示任何介绍文案

4. Footer
   - 版权信息
   - 可选社交链接占位

## 5. 技术方案建议
推荐方案：
- Vite
- React
- TypeScript
- 原生 CSS 或 CSS Modules
- 游戏数据存放在 `src/data/games.json`
- 图片存放在 `public/images/games/`
- GitHub Actions 自动构建并部署到 GitHub Pages

选择理由：
- 组件化清晰，适合 Copilot Agent 生成和维护。
- 数据驱动，新增游戏只需修改 JSON。
- 构建产物为纯静态文件，适合 GitHub Pages。
- TypeScript 可减少数据结构错误。

备选方案：
- 纯 HTML + CSS + JavaScript + JSON。也适合静态托管，但后续扩展详情页、筛选器、数据校验时维护成本更高。

## 6. 建议目录结构

```text
/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ docs/
│  ├─ PROJECT_PLAN.md
│  └─ REQUIREMENTS.md
├─ public/
│  └─ images/
│     └─ games/
│        ├─ game-one.webp
│        └─ game-two.webp
├─ src/
│  ├─ components/
│  │  ├─ GameCard.tsx
│  │  ├─ GameFilters.tsx
│  │  └─ GameGrid.tsx
│  ├─ data/
│  │  └─ games.json
│  ├─ types/
│  │  └─ game.ts
│  ├─ utils/
│  │  └─ gameFilters.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## 7. 数据维护流程
新增游戏流程：
1. 将游戏封面图片放入 `public/images/games/`。
2. 在 `src/data/games.json` 中追加一个游戏对象。
3. 如新增分类，直接写入 `categories` 数组，页面会自动生成分类选项。
4. 如有介绍视频，填写 `videoUrl`；没有则不填或设为 null。
5. 本地运行 `npm run dev` 检查展示效果。
6. 提交并推送到 GitHub，GitHub Actions 自动部署。

要求：新增游戏不需要修改 React 组件代码。

## 8. 里程碑
- M1：初始化项目、建立数据结构、完成游戏卡片和列表渲染。
- M2：完成搜索、分类筛选、发布日期排序。
- M3：完成响应式样式、空状态、图片加载失败占位、可选视频按钮。
- M4：配置 GitHub Pages 部署、补充 README、完成验收。

## 9. 风险与对策
- GitHub Pages 子路径导致资源 404：Vite 配置正确的 `base`，图片路径使用 `import.meta.env.BASE_URL` 拼接。
- JSON 数据格式错误：定义 TypeScript 类型，并在开发时校验必填字段。
- 图片过大影响加载：建议使用 WebP，单张控制在 300KB 以内，卡片图使用懒加载。
- 新增游戏漏填字段：README 明确字段说明，组件对缺失图片或下载链接做降级展示。
- 视频链接缺失：`videoUrl` 为可选字段，缺失时不渲染视频按钮，不要报错。