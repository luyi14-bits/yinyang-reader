# Tasks — Outlook 伪装模式

## Task 1: Outlook 三栏布局 UI

- [ ] 1.1 创建 Outlook 网页版风格的整体容器，三栏 flex 布局（左导航 200px / 中邮件列表 1fr / 右预览 1fr）
- [ ] 1.2 顶部工具栏：Outlook 蓝色主题色标题栏（含"Outlook 网页版"logo、搜索框占位、设置/帮助图标）
- [ ] 1.3 左侧导航栏 HTML+CSS：含"收件箱 (12)"、"已发送"、"草稿 (2)"、"垃圾邮件"、"已删除"、"归档" 六个菜单项
- [ ] 1.4 "收件箱"默认高亮选中态（蓝色背景/白色文字），其余未选中态（灰色背景）
- [ ] 1.5 中间邮件列表 HTML+CSS：邮件卡片包含发件人头像圆形占位、发件人姓名、邮件主题、时间、未读标记（蓝色圆点）
- [ ] 1.6 邮件列表至少 12 封，mix 已读/未读状态，模拟真实收件箱拥挤感
- [ ] 1.7 右侧预览窗格：选中邮件后显示邮件详情（发件人、收件人、主题、正文），正文为工作类内容
- [ ] 1.8 右侧预览窗格支持纵向滚动（邮件正文可能较长）

**涉及文件**: `reader.html`

## Task 2: Outlook 交互逻辑

- [ ] 2.1 鼠标悬停邮件列表项：背景色变化（浅蓝/灰色），指针变手型
- [ ] 2.2 点击邮件列表项：右侧预览窗格切换显示对应邮件详情，列表项高亮（浅蓝背景）
- [ ] 2.3 点击左侧导航栏菜单：筛选邮件列表（如点击"草稿"只显示草稿邮件），选中项高亮切换
- [ ] 2.4 搜索框纯装饰（输入无实际效果，避免复杂度）
- [ ] 2.5 所有 Outlook 交互均为纯前端模拟，无真实网络请求

**涉及文件**: `reader.html`

## Task 3: 伪装切换逻辑

- [ ] 3.1 Esc 键监听：在阅读模式下按 Esc → Outlook 显示；在 Outlook 模式下按 Esc → 恢复故事
- [ ] 3.2 双击切换：在故事阅读区 `dblclick` → 切换 Outlook；在 Outlook 区域 `dblclick` → 恢复故事
- [ ] 3.3 阅读位置保存/恢复：切换前记录 `window.scrollY`，恢复后 `window.scrollTo(0, savedY)`
- [ ] 3.4 页面标题切换：伪装时 `document.title = "Outlook 网页版"`；恢复时 `document.title = "阴阳先生手记"`
- [ ] 3.5 创建 `sneakConfig` 配置对象：包含 `senders`（发件人名字数组）、`subjects`（邮件主题数组）、`title`（页面标题），支持 localStorage 持久化

**涉及文件**: `reader.html`

---

# Task Dependencies

- Task 1（UI 布局）必须先于 Task 2（交互逻辑）完成
- Task 3（切换逻辑）可独立于 Task 1/2 开发（只需在 reader.html 中操作 `display: none/block`）
- 本 Spec 无外部依赖，可并行于其他 Spec

# 工时估算

| Task | 子任务数 | 估算人天 |
|------|---------|---------|
| Task 1: Outlook 三栏布局 UI | 8 | 1.5 |
| Task 2: Outlook 交互逻辑 | 5 | 1.0 |
| Task 3: 伪装切换逻辑 | 5 | 0.5 |
| **合计** | **18** | **3.0** |

---
*SPDX-FileCopyrightText: 2026 阴阳先生手记*
*SPDX-License-Identifier: AGPL-3.0-only*
