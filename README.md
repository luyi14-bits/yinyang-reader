<div align="center">

# 阴阳先生手记

**Original horror anthology in the style of traditional Chinese folklore storytelling**

[![license](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](LICENSE)
[![version](https://img.shields.io/github/v/release/luyi14-bits/yinyang-reader)](https://github.com/luyi14-bits/yinyang-reader/releases)
[![pages](https://img.shields.io/badge/Pages-live-brightgreen)](https://luyi14-bits.github.io/yinyang-reader/)
[![stories](https://img.shields.io/badge/stories-20-8A2BE2)](stories/INDEX.md)
[![stars](https://img.shields.io/github/stars/luyi14-bits/yinyang-reader?style=social)](https://github.com/luyi14-bits/yinyang-reader/)

志怪恐怖短篇集 · 故事会风格 · 每篇 5 分钟读完

-> **[在线阅读](https://luyi14-bits.github.io/yinyang-reader/)** <-

</div>

---

## 是什么

《阴阳先生手记》是一部原创志怪恐怖短篇合集。每篇独立成章，500-2000 字，手机翻两页的量——专为上班摸鱼、通勤路上、睡前刷手机的场景设计。

写作上追求三件事：

- **有活人感**：白话口语，不堆形容词，像老辈人给你讲故事
- **有逻辑感**：前因后果严丝合缝，结尾让你翻回去重看
- **有真实感**：民俗细节查证过，不是瞎编的

---

## 快速上手

| 方式 | 说明 |
|------|------|
| **在线阅读** | [luyi14-bits.github.io/yinyang-reader](https://luyi14-bits.github.io/yinyang-reader/) |
| **本地打开** | 直接双击项目根目录的 eader.html |
| **构建运行** | 
pm run build && npx serve dist/ |

---

## 故事列表

| # | 篇名 | 题材 | — | # | 篇名 | 题材 |
|---|------|------|—|---|------|------|
| 001 | [纸人](stories/001-纸人.md) | 夜路遇祟 | | 011 | [压岁钱](stories/011-压岁钱.md) | 出租车 |
| 002 | [夜行客](stories/002-夜行客.md) | 赶尸 | | 012 | [十三号病床](stories/012-十三号病床.md) | 医院 |
| 003 | [十三号乘客](stories/003-十三号乘客.md) | 末班车 | | 013 | [红砖楼](stories/013-红砖楼.md) | 拆迁区 |
| 004 | [纸活](stories/004-纸活.md) | 扎纸匠 | | 014 | [最后一个](stories/014-最后一个.md) | 学校 |
| 005 | [七楼](stories/005-七楼.md) | 电梯 | | 015 | [你身后](stories/015-你身后.md) | 老宅 |
| 006 | [合租室友](stories/006-合租室友.md) | 出租屋 | | 016 | [称骨](stories/016-称骨.md) | 算命 |
| 007 | [凌晨两点](stories/007-凌晨两点.md) | 便利店 | | 017 | [门槛](stories/017-门槛.md) | 老宅 |
| 008 | [别回头](stories/008-别回头.md) | 喊魂 | | 018 | [地基](stories/018-地基.md) | 工地 |
| 009 | [堂口](stories/009-堂口.md) | 出马 | | 019 | [镜子](stories/019-镜子.md) | 宾馆 |
| 010 | [对门](stories/010-对门.md) | 居民楼 | | 020 | [邻居](stories/020-邻居.md) | 居民楼 |

完整索引请见 [stories/INDEX.md](stories/INDEX.md)（含按题材分类）

---

## 项目结构

`
yinyang-reader/
  stories/              # 故事正文（MD + JSON）
  reader.html           # 在线阅读器（单页应用）
  sw.js                 # Service Worker（离线缓存）
  manifest.json         # PWA 安装清单
  scripts/build.mjs     # 构建脚本
  dist/                 # 构建输出（npm run build）
  docs/                 # 文档（PRD / 写法规范 / 简报）
  .trae/                # 工程 artifact
    specs/              #   Spec 与管线看板
    skills/             #   写手 Skill
  .github/              # 社区规范（Issue/PR 模板 + CI）
`

---

## 写作风格

如果你的目标是写一篇"让同事帮忙看一眼结果把手机抢过去读完了"的短篇——这个 Skill 能帮上忙：

-> **[luyi14-horror-story-writer](.trae/skills/luyi14-horror-story-writer/SKILL.md)**

它内化了以下规则：

| 规则 | 说明 |
|------|------|
| 开局即高能 | 第一句话钩住你，前三段进入恐怖 |
| 口语化 | 像在酒桌上讲故事，不是写作文 |
| 不抒情不议论 | 删掉所有"我感到""我明白" |
| 真实感 | 每篇至少一个查证过的真实民俗细节 |
| 结尾留白 | 不解释、不总结、不升华 |

---

## 贡献

详见 [CONTRIBUTING.md](CONTRIBUTING.md) 与 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

---

## 协议

[AGPL-3.0](LICENSE) (c) 2026 阴阳先生手记

所有故事内容与程序代码均以 AGPL-3.0 许可发布。