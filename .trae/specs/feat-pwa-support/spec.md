# 阴阳先生志怪阅读器 — PWA 离线与安装支持 Spec

## Why

当前 `reader.html` 是标准的静态 HTML 页面，无任何 PWA 能力：

1. **无离线支持**：用户断网后完全无法阅读。PRD FR-06 要求 Service Worker 缓存静态资源 + 最近 N 篇故事，支持离线阅读。
2. **无可安装性**：无法添加到主屏幕，用户每次使用需手动打开浏览器输入地址，不符合"随手打开"的摸鱼场景。PRD FR-07 要求 Web Manifest。
3. **无构建流程**：当前是单 HTML 文件，PRD 8.2 要求内容流水线（新故事 → Git 提交 → 自动构建 → 部署），需要有构建配置支持。

## Meta

- **优先级**: P1
- **估算工时**: 2 人天
- **影响 Spec**: 依赖 feat-core-reader（数据格式确定后才可编写 SW 缓存策略）

## What Changes

- 新增 `manifest.json` — PWA 安装清单（名称、图标、主题色、display: standalone）
- 新增 `sw.js` — Service Worker 脚本，缓存策略：
  - 静态资源（HTML/CSS/JS/字体）：Cache-First
  - 故事 JSON 数据：Network-First（在线更新缓存，离线读缓存）
  - 缓存最近 10 篇故事（PRD 要求至少 5 篇）
- 在 `reader.html` 中注册 Service Worker（`navigator.serviceWorker.register`）
- 在 `reader.html` 中添加 `<link rel="manifest">` 和 `<meta name="theme-color">`
- 新增 PWA 应用图标（SVG 或 PNG，至少 192x192 和 512x512）
- 新增 `package.json` + 轻量构建脚本（用于生成 PWA 资源 + 本地开发）
- 新增 `.gitignore` 补充（dist/ 等构建输出目录）
- 新增响应式 breadkpoint 适配桌面端兜底（PRD FR-08 补充完善）

## Impact

- Affected specs: feat-core-reader（数据格式决定 SW 缓存路径）
- Affected code:
  - `reader.html` — 新增 SW 注册、Manifest 链接、主题色 meta
  - 新增 `manifest.json` — PWA 清单
  - 新增 `sw.js` — Service Worker
  - 新增 `icons/` — PWA 图标资源
  - 新增 `package.json` — 项目元数据 & 构建脚本

---

## ADDED Requirements

### Requirement: PWA-01
The system SHALL provide a Web Manifest to enable "Add to Home Screen".

#### Scenario: Manifest is accessible
- **WHEN** the browser requests `/manifest.json`
- **THEN** the manifest SHALL be served with correct MIME type `application/json`
- **AND** contain: `name`, `short_name`, `description`, `start_url`, `display: standalone`, `background_color`, `theme_color`, `icons` (192x192 + 512x512)

#### Scenario: App opens in standalone mode
- **WHEN** the user opens the app from the home screen icon
- **THEN** the app SHALL open in a standalone window without browser chrome (no address bar, no toolbar)

### Requirement: PWA-02
The system SHALL provide a Service Worker for offline access.

#### Scenario: Offline access to cached stories
- **WHEN** the user is offline and opens the PWA
- **THEN** the app SHALL display the cached version of the page
- **AND** the user SHALL be able to read all cached stories
- **AND** at least the most recent 5 stories SHALL be cached for offline reading

#### Scenario: Service Worker updates
- **WHEN** a new version of the SW is available
- **THEN** the SW SHALL install in the background
- **AND** SHALL wait for all tabs to close before activating (standard SW lifecycle)

### Requirement: PWA-03
The system SHALL support responsive layouts for mobile and desktop.

#### Scenario: Mobile portrait (375-428px)
- **WHEN** the viewport width is between 375px and 428px
- **THEN** the layout SHALL use single-column, max-width 520px reading area
- **AND** the reading area SHALL be centered with appropriate margins

#### Scenario: Desktop fallback (> 768px)
- **WHEN** the viewport width is larger than 768px
- **THEN** the reading area SHALL be centered and max-width constrained (520px)
- **AND** the background SHALL show a subtle repeating pattern or solid color
- **AND** the overall experience SHALL remain usable (no layout breakage)

### Requirement: PWA-04
The system SHALL support a build pipeline for automated deployment.

#### Scenario: Build script exists
- **WHEN** `npm run build` is executed
- **THEN** the build script SHALL validate PWA assets exist (manifest, icons, SW)
- **AND** output a ready-to-deploy `dist/` directory (or equivalent)

## MODIFIED Requirements

无

## REMOVED Requirements

无
