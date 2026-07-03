# Tasks — 核心阅读体验

## Task 1: 故事数据解耦

- [ ] 1.1 定义 `stories/INDEX.json` 索引文件格式（含所有故事的 id/title/category/wordCount/createdAt）
- [ ] 1.2 将现有 2 篇故事（纸人、夜行客）从 `reader.html` 中提取为独立 JSON 文件，存入 `stories/`
- [ ] 1.3 从现有 `.md` 故事文件中读取内容，转换为 JSON 格式，计算准确字数（非 `body.length * 18`）
- [ ] 1.4 移除 `reader.html` 中硬编码的 `STORIES` 数组
- [ ] 1.5 实现 `fetch('stories/INDEX.json')` 加载索引 + 按需加载单篇故事内容

**涉及文件**: `reader.html`, `stories/INDEX.json`(新建), `stories/001-纸人.json`(新建), `stories/002-夜行客.json`(新建)

## Task 2: 随机推荐核心体验（默认打开即读）

- [ ] 2.1 重构 `reader.html` 初始化逻辑：去掉 Library View 作为默认首页，改为直接进入随机故事
- [ ] 2.2 实现"换一篇"按钮（置于页面底部导航栏 + 右上角快捷入口）
- [ ] 2.3 实现随机算法：从故事池随机选一篇，避免连续两篇同题材，避免 session 内重复
- [ ] 2.4 实现阅读器顶部"题材"信息展示 + 全题材横排标签栏（8 个标签）
- [ ] 2.5 实现标签单选筛选：点击标签切换筛选，再次点击取消，选中标签高亮
- [ ] 2.6 保留 Library View 作为"全部故事"入口（可通过特定按钮进入，如标签栏左侧的"全部"）

**涉及文件**: `reader.html`

## Task 3: 视觉与交互优化

- [ ] 3.1 确保故事切换过渡动画 < 300ms（使用现有 fadeIn 动效）
- [ ] 3.2 题材标签 UI 设计：横排可滚动标签栏，选中态（朱砂红高亮），未选中态（金色边框）
- [ ] 3.3 阅读完成率埋点：监听滚动事件，到达 90% 时触发 `console.log('[Reading] completed:', storyId)`

**涉及文件**: `reader.html`

---

# Task Dependencies

- Task 1（数据解耦）必须先于 Task 2 和 Task 3 完成，因为随机推荐和筛选逻辑依赖外部数据加载方式
- Task 2 和 Task 3 可并行：Task 3 的 UI 设计可独立于数据加载逻辑开发

# 工时估算

| Task | 子任务数 | 估算人天 |
|------|---------|---------|
| Task 1: 故事数据解耦 | 5 | 0.5 |
| Task 2: 随机推荐核心体验 | 6 | 1.5 |
| Task 3: 视觉与交互优化 | 3 | 1.0 |
| **合计** | **14** | **3.0** |

---
*SPDX-FileCopyrightText: 2026 阴阳先生手记*
*SPDX-License-Identifier: AGPL-3.0-only*
