# 阴阳先生志怪阅读器 — Outlook 伪装模式 Spec

## Why

新版 PRD 将伪装模式升级为 V1 **Should** 级需求，老板已拍板。核心变化：

1. **伪装内容变更**：从之前的"类 Excel 表格"改为 **Outlook 邮件列表三栏布局**。Outlook 是办公室场景最自然的界面，摸鱼时切换毫无违和感。
2. **优先级升级**：P2（Could）→ P1（Should），RICE Impact 评分从 4 提升到 5（直接决定用户敢不敢在工位阅读）。
3. **产品定义对齐**：PRD FR-09/FR-10 重新定义为：左侧导航栏（收件箱/已发送/草稿等）、中间邮件列表（含真实感邮件标题/发件人/时间）、右侧预览窗格。

## Meta

- **优先级**: P1
- **估算工时**: 3.0 人天
- **影响 Spec**: 无（独立功能，不阻塞其他 Spec）

## What Changes

- 按 `Esc` 键或双击页面触发：阅读器界面隐藏，切换为 **Outlook 网页版风格**的三栏界面
- **左侧导航栏**：收件箱（未读数 12）、已发送、草稿（2）、垃圾邮件、已删除、归档
- **中间邮件列表**：10+ 封模拟邮件，含发件人（同事名/领导名/系统通知）、主题（工作相关）、时间（今日/昨日/本周）
- **右侧预览窗格**：选中邮件后展示"邮件正文"，内容为工作类文字
- 再次按 `Esc` 或双击：恢复故事阅读，保留阅读位置
- 整个 Outlook 界面为**纯静态 HTML/CSS 模拟**，不连接真实邮箱，鼠标悬停/点击有反馈但不触发真实导航
- 页面标题从"阴阳先生手记"切换为"Outlook 网页版"
- 伪装内容通过 `sneakConfig` 可配置（发件人名称列表、邮件主题模板等）

## Impact

- Affected specs: 无
- Affected code:
  - `reader.html` — 新增 Outlook 三栏界面 HTML/CSS/JS + 切换逻辑

---

## ADDED Requirements

### Requirement: SNK-01
The system SHALL toggle Outlook disguise mode when the user presses the Escape key.

#### Scenario: Enter disguise mode via Esc
- **WHEN** the user is reading a story and presses the `Esc` key
- **THEN** the story content SHALL be hidden
- **AND** an Outlook Web App-style three-panel layout SHALL be displayed
- **AND** the page title SHALL change to "Outlook 网页版"

#### Scenario: Exit disguise mode via Esc
- **WHEN** the user is in disguise mode and presses the `Esc` key
- **THEN** the Outlook fake UI SHALL be hidden
- **AND** the story content SHALL be restored to its previous scroll position
- **AND** the page title SHALL restore to "阴阳先生手记"

### Requirement: SNK-02
The system SHALL toggle disguise mode on double-tap of the reading area.

#### Scenario: Double-tap toggles disguise (touch devices)
- **WHEN** the user double-taps the story reading area
- **THEN** the disguise mode SHALL toggle (enter if reading, exit if disguised)
- **AND** the behavior SHALL be identical to pressing `Esc`

### Requirement: SNK-03
The system SHALL present a three-panel Outlook layout in disguise mode.

#### Scenario: Left navigation panel
- **WHEN** the user enters disguise mode
- **THEN** the left panel SHALL display: 收件箱 (12), 已发送, 草稿 (2), 垃圾邮件, 已删除, 归档
- **AND** the selected folder SHALL be "收件箱" by default with visual highlight

#### Scenario: Middle mail list panel
- **WHEN** the user enters disguise mode
- **THEN** the middle panel SHALL display a list of 10+ mock emails
- **AND** each email SHALL show: sender name, subject, time, read/unread indicator
- **AND** sender names SHALL be work-realistic (e.g., "张经理", "HR系统", "王小明", "IT服务中心")
- **AND** email subjects SHALL be work-related (e.g., "关于下周部门会议的通知", "第三季度绩效考核结果")
- **AND** the first email SHALL be selected by default

#### Scenario: Right preview panel
- **WHEN** the user clicks an email in the middle list
- **THEN** the right panel SHALL show the full email body
- **AND** the email body SHALL contain realistic-looking work content (meeting notes, notices, etc.)
- **AND** the selected email SHALL have a blue highlight in the list

### Requirement: SNK-04
The Outlook UI SHALL feel interactive but NOT connect to a real email service.

#### Scenario: Visual feedback on interaction
- **WHEN** the user hovers over a folder or email item
- **THEN** the item SHALL show a hover state (background change)
- **AND** clicking a folder SHALL NOT actually navigate — it SHALL filter the mock email list (purely cosmetic)

### Requirement: SNK-05
The system SHALL retain the reading position across disguise toggles.

#### Scenario: Reading position preserved
- **WHEN** the user enters disguise mode and then exits it
- **THEN** the system SHALL restore the scroll position to exactly where the user was reading
- **AND** no content SHALL be reloaded

### Requirement: SNK-06
The fake Outlook content SHALL be configurable via a `sneakConfig` object.

#### Scenario: Default Outlook content
- **WHEN** the user enters disguise mode for the first time
- **THEN** the default mock emails SHALL be generated from built-in templates
- **AND** the content SHALL look like a typical enterprise Outlook mailbox

#### Scenario: Outlook content customization
- **WHEN** the developer modifies `sneakConfig.senders` or `sneakConfig.subjects`
- **THEN** the mock email list SHALL reflect the customized names and subjects
- **AND** customization SHALL persist via `localStorage` when configured

## MODIFIED Requirements

无（全新重写，替代旧版 Excel 伪装方案）

## REMOVED Requirements

- ~~SNK-01 (旧版): 伪装为 Excel 表格~~ → 替换为 Outlook 三栏布局
- ~~SNK-04 (旧版): 伪文档内容可配置~~ → 替换为 SNK-06 (Outlook 内容可配置)
