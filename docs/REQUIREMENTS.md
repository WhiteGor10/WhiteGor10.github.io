# 个人游戏作品集网站 需求规格说明书

## 1. 功能需求

### FR-01 游戏列表
- 页面加载后读取 `src/data/games.json`。
- 展示所有有效游戏数据。
- 默认按发布日期降序排列，即最新发布的游戏在前。
- 游戏数量应显示在列表附近，例如“共 12 个游戏”。

### FR-02 游戏卡片
每个游戏卡片必须展示：
- 游戏图片
- 游戏名称
- 游戏描述
- 发布日期
- 下载链接
- 分类标签
- 可选的“观看介绍视频”链接（仅当 `videoUrl` 存在时显示）

下载链接要求：
- 使用 `<a>` 标签。
- 外部链接使用 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 按钮文案建议为“下载游戏”。

视频链接要求：
- 使用 `<a>` 标签，文案“观看介绍视频”。
- 外部链接使用 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 当 `videoUrl` 缺失、为空字符串或 null 时，不渲染该按钮。
- 视频链接与下载按钮在视觉上有区分（例如次要按钮样式）。

图片要求：
- 使用 `alt`，内容为“游戏名称 + 封面”。
- 使用 `loading="lazy"`。
- 图片加载失败时显示占位图或替代背景。

### FR-03 按名称搜索
- 输入框 placeholder：`搜索游戏名称`。
- 仅按游戏名称搜索，不搜索描述。
- 大小写不敏感。
- 输入时实时过滤。
- 搜索词前后空格应被忽略。
- 无匹配结果时显示空状态。

### FR-04 分类筛选
- 分类选项从所有游戏的 `categories` 字段中自动汇总生成。
- 下拉框第一项为“全部分类”。
- 选择某个分类后，只显示包含该分类的游戏。
- 分类排序建议按字母顺序。
- 新增分类不需要改代码。

### FR-05 按发布日期排序
- 默认：最新发布优先。
- 可选：最早发布优先。
- 日期使用 ISO 格式 `YYYY-MM-DD` 存储。
- 排序时解析为日期比较。
- 同日期时可按名称排序，保证顺序稳定。

### FR-06 组合筛选
- 搜索、分类、排序可同时生效。
- 推荐处理顺序：分类筛选 -> 名称搜索 -> 日期排序。
- 无结果时显示：“没有找到符合条件的游戏。请尝试更换搜索词或分类。”

### FR-07 数据驱动新增游戏
- 所有游戏数据必须集中在 `src/data/games.json`。
- 新增游戏只需添加图片和 JSON 对象，不需要修改组件。
- 页面分类选项必须根据数据自动更新。
- 建议提供 TypeScript 类型 `Game`。
- 建议对缺失必填字段的数据进行过滤或控制台警告，避免整页崩溃。
- `videoUrl` 为可选字段，缺失时正常渲染卡片但不显示视频按钮。

### FR-08 个人介绍预留
- 页面保留 `<section id="about">`。
- 本阶段不显示个人介绍正文。
- 可保留 TODO 注释，例如：`{/* TODO: 个人介绍待补充 */}`。
- 导航中暂不添加 About 链接，避免跳到空区域。

### FR-09 响应式布局
- 移动端：1 列卡片。
- 平板：2 列卡片。
- 桌面：3 列卡片。
- 工具栏在窄屏下纵向排列。
- 不允许出现横向滚动。

### FR-10 下载链接
- 每个游戏必须有下载链接。
- 若链接为空或无效，按钮显示为禁用状态，文案“暂无下载链接”。
- 下载链接不应触发页面跳转错误。

## 2. 数据规格

### 2.1 数据文件
路径：`src/data/games.json`

### 2.2 游戏对象字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| id | string | 是 | 唯一标识，建议使用 URL 友好的 slug，例如 `space-puzzle` |
| title | string | 是 | 游戏名称 |
| description | string | 是 | 一段简短描述，建议 1-3 句话 |
| releaseDate | string | 是 | 发布日期，格式 `YYYY-MM-DD` |
| categories | string[] | 是 | 分类数组，至少一个分类 |
| image | string | 是 | 图片路径，例如 `images/games/space-puzzle.webp` |
| downloadUrl | string | 是 | 下载链接 |
| videoUrl | string \| null | 否 | 介绍视频链接；没有视频则省略或设为 null |
| featured | boolean | 否 | 是否精选，预留字段 |
| status | string | 否 | 游戏状态，如 `released`、`prototype`，预留字段 |

### 2.3 示例数据

```json
[
  {
    "id": "space-puzzle",
    "title": "Space Puzzle",
    "description": "一款以太空为背景的轻松解谜游戏，包含 30 个关卡。",
    "releaseDate": "2024-08-15",
    "categories": ["Puzzle", "Casual"],
    "image": "images/games/space-puzzle.webp",
    "downloadUrl": "https://example.com/download/space-puzzle",
    "videoUrl": "https://www.youtube.com/watch?v=xxxxxxxx"
  },
  {
    "id": "tiny-knight",
    "title": "Tiny Knight",
    "description": "短流程动作冒险游戏，玩家扮演一名迷你骑士探索地下城。",
    "releaseDate": "2023-11-02",
    "categories": ["Action", "Adventure"],
    "image": "images/games/tiny-knight.webp",
    "downloadUrl": "https://example.com/download/tiny-knight"
  }
]
```

### 2.4 图片规范
- 存放目录：`public/images/games/`
- 推荐格式：WebP
- 推荐比例：16:9 或 4:3
- 推荐单张大小：小于 300KB
- JSON 中的图片路径不要以 `/` 开头，避免 GitHub Pages 子路径问题。
- 渲染时使用 `import.meta.env.BASE_URL` 拼接图片路径。

### 2.5 视频链接规范
- 支持任意视频平台链接（YouTube、Bilibili 等）。
- 只做跳转，不内嵌播放器。
- 不校验链接域名。
- 空字符串、null、缺失三种情况都视为“无视频”。

## 3. UI / UX 要求
- 风格简洁，以游戏封面和名称为视觉重点。
- 卡片包含图片、标题、分类标签、发布日期、描述、下载按钮，以及可选的视频链接。
- 描述建议最多显示 3 行，超出省略；完整描述可在后续详情页展示。
- 搜索框、分类下拉框、排序下拉框需有明确 label 或 aria-label。
- 空状态应清晰友好。
- 所有交互元素可通过键盘访问。
- 颜色对比度满足基本可访问性要求。

## 4. 非功能需求

### 4.1 性能
- 图片懒加载。
- 构建产物为静态文件。
- 首屏不应因图片过大明显变慢。
- 建议 Lighthouse Performance / Accessibility 分数达到 90 分以上。

### 4.2 可访问性
- 图片有 alt。
- 表单控件有 label 或 aria-label。
- 下载链接和视频链接有明确文本。
- 空状态使用可读文本。
- 不使用仅靠颜色表达状态的设计。

### 4.3 SEO
- `index.html` 设置合理 title 和 meta description。
- 可选添加 Open Graph 标签。
- 页面主标题使用语义化 `h1`。
- 游戏名称使用 `h2` 或 `h3`。

### 4.4 兼容性
- 支持最新版 Chrome、Edge、Firefox、Safari。
- 支持移动端常见浏览器。

### 4.5 可维护性
- 游戏数据与 UI 分离。
- 类型定义清晰。
- 筛选逻辑可提取到 `utils/gameFilters.ts`。
- README 包含新增游戏步骤。
- 不建议把游戏数据硬编码在组件中。

## 5. GitHub Pages 部署要求
- 使用 Vite 构建。
- `vite.config.ts` 中配置 `base`：
  - 项目页：`base: '/<仓库名>/'`
  - 自定义域名或用户主页：`base: '/'`
- 使用 GitHub Actions 自动部署 `dist`。
- 确保图片路径基于 `import.meta.env.BASE_URL`，避免子路径 404。
- README 写明本地开发和部署方式。

## 6. README 必须包含
- 项目简介。
- 本地开发命令：
  - `npm install`
  - `npm run dev`
  - `npm run build`
- 新增游戏步骤：
  1. 添加图片到 `public/images/games/`
  2. 在 `src/data/games.json` 追加对象
  3. 可选填写 `videoUrl`
  4. 本地验证
  5. 提交推送
- 数据字段说明（含 `videoUrl` 可选说明）。
- GitHub Pages 部署说明。

## 7. 验收标准
- [ ] 网站可通过 GitHub Pages 正常访问。
- [ ] 所有 `games.json` 中的游戏都能显示。
- [ ] 每个卡片显示图片、名称、描述、发布日期、分类、下载链接。
- [ ] 有 `videoUrl` 的游戏显示“观看介绍视频”链接。
- [ ] 无 `videoUrl` 的游戏不显示视频链接且不报错。
- [ ] 搜索框能按名称实时过滤，大小写不敏感。
- [ ] 分类下拉框自动生成，包含“全部分类”。
- [ ] 分类筛选生效。
- [ ] 排序支持最新优先和最早优先，默认最新优先。
- [ ] 搜索、分类、排序可组合使用。
- [ ] 无结果时显示空状态。
- [ ] 新增一个游戏只需添加图片和 JSON 数据，无需改组件代码。
- [ ] 个人介绍区域仅预留，不显示正文。
- [ ] 移动端、平板、桌面端布局正常，无横向滚动。
- [ ] 图片加载失败时有降级展示。
- [ ] `npm run build` 成功。
- [ ] README 包含新增游戏说明（含 videoUrl）。

## 8. 给 Copilot Agent 的实现约束
- 先实现 MVP，不要添加个人介绍正文。
- 不要引入后端、数据库、登录或 CMS。
- 游戏数据必须来自 `src/data/games.json`。
- 不要硬编码游戏列表。
- 不要添加游戏详情页、多语言、统计等非 MVP 功能，除非额外确认。
- `videoUrl` 必须作为可选字段处理，缺失时不渲染视频按钮。
- 完成后运行构建并逐条对照验收标准。