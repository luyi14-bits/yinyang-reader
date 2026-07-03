# 阴阳先生手记 — 项目摘要

> 更新于 2026-07-03 · v0.5.1 · 📚 20 篇志怪短篇

---

## 一句话

专为上班摸鱼设计的 PWA 志怪短篇阅读器——每次打开随机推送一篇高质量阴阳先生/民俗恐怖故事，5 分钟读完，带 Outlook 伪装模式。

---

## 当前状态

| 维度 | 状态 |
|------|------|
| **产品** | ✅ 在线阅读器 + 题材筛选 + 日夜间切换 + 滑动翻页 + Outlook 伪装 |
| **内容** | ✅ 20 篇原创志怪短篇，8 个题材分类 |
| **PWA** | ✅ 离线阅读 + 添加到主屏幕 + 安装横幅 |
| **部署** | ✅ GitHub Pages 自动 CI/CD（push main → 构建 → 部署） |
| **安全** | ✅ 已完成深度审查并修复（CSP + innerHTML XSS + console strip） |
| **协议** | AGPL-3.0 |

---

## 技术架构

```
纯静态 PWA · 零后端 · 零运行时依赖

📁 stories/*.json        ← 故事数据（构建时打包到 dist/）
📄 reader.html            ← 单页应用（全部 UI + 逻辑内嵌）
📄 sw.js                  ← Service Worker（Cache-First + Network-First 混合）
📄 manifest.json          ← PWA 安装清单
📁 scripts/build.mjs      ← 构建脚本（生产构建 strip console）
📁 .github/workflows/     ← CI/CD（checkout@v6, setup-node@v6, deploy-pages@v5）
```

**关键决策**：
- 选型原因为纯静态，无框架依赖，HTML/CSS/JS 内嵌在一个文件中
- 故事 JSON 格式：`{ id, title, subtitle, category, wordCount, content[], license }`
- SW 策略：核心资源 Cache-First，故事 JSON Network-First（最多缓存 10 篇）
- 部署平台：GitHub Pages（免费、零运维）

---

## 功能矩阵

| 功能 | 状态 | 说明 |
|------|------|------|
| 随机推荐 | ✅ | 避免连续同题材，阅过优先未读 |
| 题材筛选 | ✅ | 8 个标签单选，再次点击取消 |
| 滑动翻页 | ✅ | 左右滑切故事 + ← → 键盘导航 |
| 日间/夜间模式 | ✅ | 按钮切换，localStorage 记忆 |
| 阅读进度条 | ✅ | 顶部 2px vermillion 条 |
| 离线阅读 | ✅ | SW 缓存最近 10 篇故事 |
| 添加到主屏幕 | ✅ | manifest + beforeinstallprompt 横幅 |
| Outlook 伪装 | ✅ | Esc/双击 → 三栏邮件界面，可交互滚动 |
| PWA 自动更新 | ✅ | SW 检测新版本 → 自动刷新 |

---

## 安全加固（2026-07-03）

基于 Luyi14-security-academy 三专家矩阵审查后实施：

| 修复项 | 说明 |
|--------|------|
| CSP meta 标签 | `script-src 'self' 'unsafe-inline'`, `frame-ancestors 'none'`, 限制所有外部来源 |
| X-Content-Type-Options | `nosniff` 防止 MIME 嗅探 |
| DOM XSS 消除 | 6 处 `innerHTML` → `textContent`/`createElement` 安全 DOM 构建 |
| console 信息泄露 | build.mjs 生产构建自动 strip 全部 console 调用 |
| SW 回滚窗口 | 移除 `self.skipWaiting()`，用户关闭标签页即可回滚 |
| CI/CD Actions 升级 | v4→v6（checkout, setup-node）, v3→v5（upload-pages-artifact）, v4→v5（deploy-pages） |

详见 [`SECURITY-AUDIT-2026-07-03.html`](./SECURITY-AUDIT-2026-07-03.html)

---

## 目录结构

```
yinyang-reader/
├── stories/              # 📖 20 篇故事（MD + JSON）
├── reader.html           # 📱 在线阅读器（单文件）
├── index.html            # 🚪 入口（重定向到 reader.html）
├── sw.js                 # ⚡ Service Worker
├── manifest.json         # 📲 PWA 清单
├── icons/                # 🎨 图标
├── scripts/build.mjs     # 🏗️ 构建
├── dist/                 # 📦 构建输出
├── docs/                 # 📋 PRD / 写法规范 / 素材库
├── .trae/                # 🛠️ Spec 管线 + 写手 Skill
├── .github/              # 🤝 CI/CD + Issue/PR 模板
├── CHANGELOG.md          # 📝 版本日志
├── SECURITY-AUDIT.html   # 🔐 安全审查报告
└── SUMMARY.md            # 📌 本文件
```

---

## 版本历程

| 版本 | 要点 |
|------|------|
| v0.1.0 | 首篇《纸人》+ 阅读器首发 |
| v0.2.0 | 新增《夜行客》，项目结构重整 |
| v0.3.0 | PWA 支持 + JSON 数据解耦 + 桌面端适配 + 20 篇故事 |
| v0.4.0 | AGPL-3.0 + GitHub Pages CI/CD |
| v0.5.0 | PWA 安装横幅 + manifest 增强 + SW 策略优化 |
| v0.5.1 | 安全加固（CSP + XSS + console strip）+ CI 版本升级 |

---

## 路线图

| 优先级 | 方向 | 说明 |
|--------|------|------|
| 🔴 P0 | 核心阅读体验打磨 | 过渡动画、触摸反馈优化 |
| 🟡 P1 | 内容管线扩充 | 写手 Skill 持续产出新故事 |
| 🟡 P1 | Google Fonts 自托管 | 消除第三方 IP 泄露（见安全报告 F-04） |
| 🟢 P2 | 阅读进度联动 | 首页标记"上次读到哪了" |
| 🟢 P3 | 自定义摸鱼皮肤 | 用户可切换伪装界面风格 |

---

## 链接

- 📱 在线阅读：https://luyi14-bits.github.io/yinyang-reader/
- 📦 仓库：https://github.com/luyi14-bits/yinyang-reader
- 📖 故事索引：[stories/INDEX.md](./stories/INDEX.md)

---

*SPDX-FileCopyrightText: 2026 阴阳先生手记*
*SPDX-License-Identifier: AGPL-3.0-only*
