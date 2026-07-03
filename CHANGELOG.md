# 更新日志

## [v0.5.0] — 2026-07-03

### PWA 体验对齐天问
- manifest.json：新增 `orientation: portrait` + `purpose: any maskable`
- sw.js：简化 Cache-First 策略，版本号升至 v5
- reader.html：新增 PWA 安装提示横幅（beforeinstallprompt 事件 + 安装/关闭按钮）
- .nojekyll：跳过 GitHub Pages Jekyll 构建

### 工程
- 体验对标顶目天问：手机打开 → 点安装 → 桌面出现「阴阳」图标 → 摸鱼

## [v0.4.0] — 2026-07-03

### 协议
- LICENSE 从 MIT 替换为 AGPL-3.0，所有源文件追加 SPDX 协议头

### 部署
- GitHub Actions 自动部署到 GitHub Pages
- .github/ 标准化（CODEOWNERS / Issue Template / PR Template）

### README
- 对标高星项目重构，管线看板归入 .trae/specs/

## [v0.3.0] — 2026-07-03

### 新增
- PWA 支持：manifest.json + Service Worker + 图标，可添加到主屏幕离线阅读
- 故事 JSON 数据解耦：INDEX.json 索引 + 独立 JSON 文件，移除 reader.html 硬编码
- 构建脚本 `npm run build`：自动打包到 dist/
- 桌面端响应式适配（viewport > 768px）

### 工程化
- 3 个 Spec 拆分（core-reader / pwa-support / sneak-mode），共 8.0 人天
- 创建 luyi14-horror-story-writer Skill（故事会风格恐怖短篇写手）

## [v0.2.0] — 2026-07-03

### 新增
- 《夜行客》：第二篇志怪短篇。湘西赶尸穿村而过，女人认出死人的手——但那具尸体的手指却是齐全的。
- 项目结构重整：`stories/` 目录 + `INDEX.md` 索引 + `docs/` 补充文档

### 变更
- 根目录只保留标准文件，故事正文全部移入 `stories/`

## [v0.1.0] — 2026-07-03

### 新增
- 《纸人》：首篇志怪短篇。年轻学徒腊月回乡，桥头遇百年纸人，师父三枚铜钱镇祟。
- 在线阅读器 reader.html（暗色模式 + 滑动翻页 + 日夜间切换）

---
*SPDX-FileCopyrightText: 2026 阴阳先生手记*
*SPDX-License-Identifier: AGPL-3.0-only*
