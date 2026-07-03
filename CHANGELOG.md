# 更新日志

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
