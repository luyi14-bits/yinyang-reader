# Tasks — PWA 离线与安装支持

## Task 1: PWA 清单与图标

- [ ] 1.1 创建 `manifest.json`：`name: "阴阳先生手记"`, `short_name: "阴阳"`, `display: "standalone"`, `theme_color: "#1a1614"`, `background_color: "#1a1614"`
- [ ] 1.2 生成 PWA 图标：SVG 生成 + 导出 192x192 和 512x512 PNG
- [ ] 1.3 在 `reader.html` 的 `<head>` 中添加：`<link rel="manifest" href="/manifest.json">` + `<meta name="theme-color" content="#1a1614">`
- [ ] 1.4 在 `reader.html` 中添加浏览器适配 meta（如 Apple 的 `apple-touch-icon`、`mobile-web-app-capable`）

**涉及文件**: `manifest.json`(新建), `icons/`(新建目录), `reader.html`

## Task 2: Service Worker 缓存策略

- [ ] 2.1 创建 `sw.js`，实现 Cache-First 策略缓存静态资源（HTML + JS + CSS + 字体）
- [ ] 2.2 实现 Network-First 策略缓存故事 JSON 数据：在线时从网络获取并更新缓存，离线时读缓存
- [ ] 2.3 缓存最近 10 篇故事数据（PRD 要求至少 5 篇）
- [ ] 2.4 在 `reader.html` 中注册 Service Worker：`navigator.serviceWorker.register('/sw.js')`
- [ ] 2.5 处理 SW 更新：新版本 install 后等待激活，更新缓存

**涉及文件**: `sw.js`(新建), `reader.html`

## Task 3: 构建配置与响应式完善

- [ ] 3.1 创建 `package.json`：项目名称、版本、scripts（build/dev）
- [ ] 3.2 创建轻量构建脚本：复制静态资源到 dist/，确保 PWA 资产完整
- [ ] 3.3 补充桌面端响应式样式（viewport > 768px）：居中布局 + 背景装饰
- [ ] 3.4 补充 `.gitignore`：添加 `dist/`、`node_modules/` 等构建产出目录

**涉及文件**: `package.json`(新建), `dist/`(新建), `.gitignore`, `reader.html`

---

# Task Dependencies

- 所有 Task 均依赖 feat-core-reader 的数据解耦完成（故事 JSON 文件路径确定后才可设置 SW 缓存路径）
- Task 1（清单 + 图标）和 Task 2（SW 缓存）可并行开发
- Task 3（构建配置）需在 Task 1 和 Task 2 完成后进行（构建脚本需要包含 manifest 和 SW）

# 工时估算

| Task | 子任务数 | 估算人天 |
|------|---------|---------|
| Task 1: PWA 清单与图标 | 4 | 0.5 |
| Task 2: Service Worker 缓存策略 | 5 | 1.0 |
| Task 3: 构建配置与响应式完善 | 4 | 0.5 |
| **合计** | **13** | **2.0** |
