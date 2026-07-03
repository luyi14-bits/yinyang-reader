# 阴阳先生志怪短篇阅读器 — 管线看板

> 更新日期：2026-07-03  
> 管线状态：📝 规划中（Spec 完成，待开发启动）

---

## 🚦 管线总览

| Spec | 优先级 | 状态 | 工时 | 进度 |
|------|--------|------|------|------|
| feat-core-reader | 🔴 P0 | 📝 规划中 | 3.0 人天 | 0% |
| feat-pwa-support | 🟡 P1 | 📝 规划中 | 2.0 人天 | 0% |
| feat-sneak-mode | 🟡 P1 ⬆️ | 📝 规划中 | 3.0 人天 ⬆️ | 0% |
| **合计** | — | — | **8.0 人天** ⬆️ | — |

> ⬆️ 标记变更项：feat-sneak-mode 从 P2(0.5d) 升级为 P1(3.0d)，伪装内容从 Excel 表格变更为 Outlook 三栏布局

## 📋 Spec 清单

| Spec | 状态 | 关键产出 |
|------|------|---------|
| [feat-core-reader](feat-core-reader/spec.md) | 📝 规划中 | spec.md · tasks.md · checklist.md |
| [feat-pwa-support](feat-pwa-support/spec.md) | 📝 规划中 | spec.md · tasks.md · checklist.md |
| [feat-sneak-mode](feat-sneak-mode/spec.md) ⬆️ | 📝 规划中 | spec.md · tasks.md · checklist.md |

### 变更记录（2026-07-03，PRD v1.0 更新）

| 变更项 | 旧值 | 新值 | 原因 |
|--------|------|------|------|
| feat-sneak-mode 优先级 | P2（Could） | P1（Should） | 老板拍板，RICE Impact 4→5 |
| 伪装内容 | Excel 伪文档表格 | Outlook 邮件列表三栏布局 | PRD FR-10 重新定义 |
| 工时估算 | 0.5 人天 | 3.0 人天 | 复杂度大幅提升（三栏+交互） |
| Could 列 | — | 清空（原功能全部升级） | 所有 V1 功能明确 |

## 📊 状态流

```
💡 想法池 → 📝 规划中(当前) → 🔨 开发中 → ✅ 验收中 → 🚀 已发布
```

### 当前阶段：📝 规划中

- ✅ PRD 已完成（`docs/prd-yinyang-reader.md` v1.0）
- ✅ 老板决策已完成（5 个问题全部拍板）
- ✅ Spec 已拆分（3 个 Spec，共 8.0 人天）
- ✅ Tasks 已拆解（共 52 个子任务）
- ✅ Checklist 已编写（共 40 条验收项）
- ⏳ **待开发启动**（选择前端框架 → 分配任务 → 进入开发中）

## 🚧 已知依赖

```
P0 feat-core-reader (3d)    P1 feat-pwa-support (2d)  P1 feat-sneak-mode (3.0d) ⬆️
┌──────────────────────┐   ┌──────────────────────┐  ┌──────────────────────────┐
│ 故事数据解耦         │   │ Web Manifest + 图标   │  │ Outlook 三栏布局 UI      │
│ 随机推荐核心体验     │ ← │ Service Worker 缓存   │  │ Outlook 交互逻辑         │
│ 题材筛选(8标签)      │   │ 构建配置 + 响应式     │  │ 伪装切换逻辑(Esc/双击)   │
│ 阅读完成率埋点       │   │                      │  │ 阅读位置保留+sneakConfig │
└──────────────────────┘   └──────────────────────┘  └──────────────────────────┘
      ↑ 必须先做                   ↑ 依赖左边                      ↑ 独立
```

## 🎯 下一步行动

| 行动 | 负责人 | 条件 |
|------|--------|------|
| 前端框架选型（React/Vue/原生） | 开发团队 | — |
| 确认 feat-core-reader 开发排期 | 管线工程师 + 开发 | 框架选型完成后 |
| 进入 🔨 开发中 | 开发团队 | 框架选型 + 任务分配完成 |

---

> 管线看板由 Luyi14-spec-pipeline 维护 · 状态变更请通知管线工程师
