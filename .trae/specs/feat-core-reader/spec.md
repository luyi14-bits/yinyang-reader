# 阴阳先生志怪阅读器 — 核心阅读体验 Spec

## Why

现有 `reader.html` 已实现基础阅读功能（故事列表、上一篇/下一篇、暗色/亮色切换），但存在 4 个关键差距：

1. **无随机推荐**：用户打开页面看到的是故事列表（Library View），而非 PRD 定义的"打开即读一篇随机故事"。核心摸鱼体验未实现。
2. **无题材筛选**：8 大题材分类数据已定义，但前端无筛选交互，用户只能按 id 顺序阅读。
3. **数据格式耦合**：故事数据硬编码在 `reader.html` 的 JS 数组中，无法独立维护；人员字数用 `body.length * 18` 估算，不准确。
4. **无"换一篇"随机按钮**：仅有上一篇/下一篇导航，缺少 PRD FR-03 定义的"换一篇"随机切换入口。

## Meta

- **优先级**: P0
- **估算工时**: 3 人天
- **影响 Spec**: feat-pwa-support（依赖此 Spec 完成后接续）、feat-sneak-mode（独立）

## What Changes

- **BREAKING** 移除 `reader.html` 中硬编码的 `STORIES` 数组，改为从外部 `stories/*.json` 或 `stories/INDEX.json` 读取
- 新增 `stories/` 目录下的统一数据格式（JSON），每篇故事包含 id/title/category/content/wordCount/createdAt
- 重构首页（Library View）为默认随机展示模式：打开即读随机故事
- 新增"换一篇"按钮（页面底部 + 顶部快捷入口），点击后随机选取下一篇
- 新增题材筛选：8 个标签横排，单选模式，点击取消
- 随机算法避免连续两篇同题材
- 新增首页入口（从阅读器回到筛选页）
- 切换故事过渡动画 < 300ms
- 新增阅读完成率埋点（滚动到底部触发）

## Impact

- Affected specs: feat-pwa-support（数据加载方式依赖本 Spec 的数据格式）、feat-sneak-mode（无直接依赖）
- Affected code:
  - `reader.html` — 大幅重构（数据加载、UI 交互、导航逻辑）
  - `stories/` — 新增 JSON 数据文件及 INDEX 索引
  - 新增 `stories/INDEX.json` — 故事池统一索引（清单 + 元数据）

---

## ADDED Requirements

### Requirement: CR-01
The system SHALL present a random story immediately upon page load (no intermediate landing page).

#### Scenario: First visit lands on a random story
- **WHEN** a user opens the PWA for the first time
- **THEN** the system directly displays a complete short story from the story pool
- **AND** no library/landing page is shown on first load

### Requirement: CR-02
The system SHALL provide a "next random story" button accessible from both top and bottom of the reading view.

#### Scenario: User requests a new story
- **WHEN** the user taps the "换一篇" button
- **THEN** the system transitions (animation < 300ms) to a randomly selected story
- **AND** the selected story is from a different category than the current story when possible

#### Scenario: Continuous random recommendation
- **WHEN** the user taps "换一篇" multiple times
- **THEN** the system SHALL NOT repeat a story already shown in the current session (unless the pool is exhausted)
- **AND** the system SHALL avoid recommending the same category twice in a row

### Requirement: CR-03
The system SHALL provide category filtering with 8 topic tags.

#### Scenario: Filter by category
- **WHEN** the user taps a category tag (e.g., "赶尸")
- **THEN** the system SHALL filter the story pool to only that category
- **AND** the tag SHALL be visually highlighted
- **AND** the system SHALL display a random story from the filtered pool

#### Scenario: Cancel category filter
- **WHEN** the user taps an already-selected category tag
- **THEN** the system SHALL clear the filter
- **AND** restore full random mode from the complete story pool

#### Scenario: All 8 categories available
- **WHEN** the user opens the category filter bar
- **THEN** all 8 categories SHALL be visible: 夜路遇祟、赶尸、风水局、算命摊、捉鬼驱邪、扎纸/纸活、收魂/喊魂、过阴/走阴

### Requirement: CR-04
The system SHALL decouple story data from presentation code.

#### Scenario: Story data loaded from external source
- **WHEN** the application starts
- **THEN** story data SHALL be loaded from `stories/INDEX.json` (index) and `stories/*.json` (individual stories)
- **AND** each story SHALL contain: `id`, `title`, `category`, `content`, `wordCount`, `createdAt`
- **AND** `wordCount` SHALL reflect the actual character count, not an estimate

### Requirement: CR-05
The system SHALL track story reading completion via scroll events.

#### Scenario: Reading completion event fires
- **WHEN** the user scrolls to the bottom 90% of a story
- **THEN** the system SHALL fire a completion event (console log in V1, extensible to analytics API)

## MODIFIED Requirements

无（本项目为新项目，无先前 Spec）

## REMOVED Requirements

无

---
*SPDX-FileCopyrightText: 2026 阴阳先生手记*
*SPDX-License-Identifier: AGPL-3.0-only*
