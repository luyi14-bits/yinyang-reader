# 管线看板

> 更新于 2026-07-03 · 📚 20 篇 · 📦 v0.4.0

---

## 🚦 管线总览

| 列 | 数量 | 说明 |
|----|------|------|
| 💡 想法池 | 2 | 待评估的新方向 |
| 📝 规划中 | 0 | Spec 就绪，待开发排期 |
| 🔨 开发中 | 1 | 当前 Sprint |
| ✅ 验收中 | 1 | 开发完成，待 QA 终验 |
| 🚀 已发布 | 1 | 已交付上线 |
| ❌ 废弃 | 0 | — |

---

## 🔨 开发中

| Spec | 优先级 | 工时 | 进度 | Task 完成 |
|------|--------|------|------|-----------|
| [feat-core-reader](feat-core-reader/spec.md) | 🔴 P0 | 3.0d | 30% | Task 1 数据解耦 ✅ · Task 2 随机推荐 🔨 · Task 3 视觉优化 🔨 |

> **Task 1（数据解耦）已完成** — JSON 格式定义、存量故事提取、STORIES 硬编码移除、fetch 加载均就绪。  
> **Task 2-3 待启动** — 随机推荐/题材筛选/阅读埋点/过渡动画。

---

## ✅ 验收中

| Spec | 优先级 | 工时 | 状态 | QA 入口 |
|------|--------|------|------|----------|
| [feat-pwa-support](feat-pwa-support/spec.md) | 🟡 P1 | 2.0d | 提交验收，待终验 | [checklist](feat-pwa-support/checklist.md) |

> **产出已就绪** — manifest.json / sw.js / icons / build.mjs / package.json / dist/ 均已就位。  
> **待 QA 终验通过** → 上线 🚀

---

## 📝 规划中

| Spec | 优先级 | 工时 | 依赖 |
|------|--------|------|------|
| [feat-sneak-mode](feat-sneak-mode/spec.md) | 🟡 P1 | 3.0d | 无 |

> Outlook 伪装模式（Esc 键 / 双击切换三栏邮件界面），Spec + Tasks + Checklist 已就绪，待排期。

---

## 💡 想法池

| # | 想法 | 来源 | 说明 |
|---|------|------|------|
| 1 | 内容管线升级：故事会恐怖方向 | 甲方反馈 | 已创建 [luyi14-horror-story-writer](../skills/luyi14-horror-story-writer/SKILL.md) Skill |
| 2 | 新故事扩写 | 管线规划 | 冷启动内容池 20-30 篇，当前 20 篇已达标，继续扩写中 |

---

## 📊 规格总表

| Spec | 优先级 | 状态 | 工时 | 进度 | 关键产出 |
|------|--------|------|------|------|---------|
| feat-core-reader | 🔴 P0 | 🔨 开发中 | 3.0d | 30% | 随机推荐 · 题材筛选 · 埋点 |
| feat-pwa-support | 🟡 P1 | ✅ 验收中 | 2.0d | 100% | PWA · 离线 · 安装 |
| feat-sneak-mode | 🟡 P1 | 📝 规划中 | 3.0d | 0% | Outlook 伪装 |

> **合计**: 8.0 人天 · 3 Specs

---

## 🔗 依赖图

```
P0 feat-core-reader (3d) ✅ 30%     P1 feat-pwa-support (2d) ✅ 100%
┌──────────────────────────────┐   ┌─────────────────────────────┐
│ [✓] Task 1 · 数据解耦       │   │ [✓] Task 1 · manifest + 图标  │
│ [ ] Task 2 · 随机+筛选      │ ← │ [✓] Task 2 · Service Worker  │
│ [ ] Task 3 · 动效+埋点      │   │ [✓] Task 3 · 构建+响应式     │
└──────────────────────────────┘   └─────────────────────────────┘
           ↑ 必须先完成                         ↑ 已上线（待终验）

P1 feat-sneak-mode (3d) 📝 0%
┌──────────────────────────────┐
│ Outlook 三栏 + Esc/双击切换  │
└──────────────────────────────┘
           ↑ 独立，无依赖
```

---

## 🚀 已发布

| 版本 | 日期 | 内容 |
|------|------|------|
| **v0.4.0** | 2026-07-03 | AGPL-3.0 协议 + GitHub Pages 部署 + .github/ 标准化 |
| **v0.3.0** | 2026-07-03 | PWA 支持；故事 JSON 数据解耦；桌面端响应式适配；20 篇故事 |
| **v0.2.0** | 2026-07-03 | 新增《夜行客》；项目结构重整 |
| **v0.1.0** | 2026-07-03 | 首篇《纸人》；在线阅读器首发 |

---

## ⏭️ 下一步行动

| # | 行动 | 负责人 | 前置条件 |
|---|------|--------|----------|
| 1 | QA 终验 feat-pwa-support | QA | — |
| 2 | feat-pwa-support → 🚀 发布 v0.5.0 | 管线 | QA PASS |
| 3 | 继续 feat-core-reader Task 2-3 开发 | 开发 | — |
| 4 | 安排 feat-sneak-mode 开发排期 | PM + 开发 | core-reader 完成后 |
| 5 | 启动 luyi14-horror-story-writer 继续产出 | 写手 Skill | — |

---

> 管线看板由项目秘书维护 · 状态变更及时更新

---

*SPDX-FileCopyrightText: 2026 阴阳先生手记*  
*SPDX-License-Identifier: AGPL-3.0-only*
