# 阴阳先生手记 — Bug 深度审计报告

> 审计日期：2026-07-03
> 审计人：铁三角测试专家组（Kent Beck / Brian Okken / Simon Stewart）
> 审计基准：编程八荣八耻 · PWA Spec · 验收方法论
> 结论：❌ FAIL — 不可发布

---

## 一、严重 Bug（🔴 必须立即修复）

### Bug #1 — PWA 图标引用 404

| 项目 | 内容 |
|------|------|
| **类型** | 资源路径错误 / 安全红线第九条 |
| **所在文件** | [manifest.json](../manifest.json#L10-L18) + [reader.html](../reader.html#L11) |
| **问题描述** | `manifest.json` 声明了 `icon-192.png` 和 `icon-512.png`，`reader.html` 引用了 `/icons/icon-192.png`，但 `icons/` 目录下只有一个 `icon.svg`，PNG 文件根本不存在 |
| **复现步骤** | 1. 打开 Chrome DevTools → Application → Manifest → Icons → 显示黄色警告<br>2. 检查 `icons/` 目录 → 只有 `icon.svg` |
| **根因分析** | 编写了 manifest 配置但没有生成对应的 PNG 图标文件 |
| **影响范围** | ❌ PWA 安装弹窗永不出现 — 整个 PWA 功能不可用。浏览器要求至少一个 192x192 PNG 图标才触发安装提示 |
| **修复方案** | 用 `icon.svg` 导出为 192x192 和 512x512 PNG，放入 `icons/`；或将 manifest 中的引用改为 `icon.svg` |

---

### Bug #2 — `loadStoryContent()` 无异常处理

| 项目 | 内容 |
|------|------|
| **类型** | 第八耻：异常直抛不降级 / 第九耻：静默吞异常 |
| **所在文件** | [reader.html](../reader.html#L1034-L1043) |
| **问题描述** | `loadStoryContent()` 中 `fetch` 之后没有检查 `resp.ok`，也没有 try-catch。如果 JSON 文件丢失（404）或网络错误，`resp.json()` 抛出未捕获异常，`isLoading` 永久卡在 `true` |
| **代码证据** |
```javascript
async function loadStoryContent(storyId) {
  if (storyCache[storyId]) return storyCache[storyId];
  const meta = allStories.find(s => s.id === storyId);
  if (!meta) return null;
  const filename = String(storyId).padStart(3, '0') + '-' + meta.title + '.json';
  const resp = await fetch('stories/' + encodeURIComponent(filename));
  const data = await resp.json();   // ← 没有检查 resp.ok，404 时抛异常
  storyCache[storyId] = data;
  return data;
}
```
| **影响范围** | 故事读取失败时应用白屏死锁，无任何错误提示。`isLoading` 标志永远无法释放 |
| **修复方案** | 添加 try-catch + `if (!resp.ok)` 检查 + fail-safe 路径 |

---

### Bug #3 — PWA 离线时 Service Worker 自身不可用

| 项目 | 内容 |
|------|------|
| **类型** | 缓存策略缺陷 |
| **所在文件** | [sw.js](../sw.js#L5-L10) + [sw.js](../sw.js#L45-L52) |
| **问题描述** | `STATIC_ASSETS` 数组未包含 `/sw.js`，虽然 `isStaticAsset()` 将 `/sw.js` 标记为静态资源，但 install 阶段不会预缓存 SW 自身。`/dist/` 路径规则是死代码 |
| **代码证据** |
```javascript
const STATIC_ASSETS = [
  '/reader.html',       // ✅
  '/index.html',        // ✅
  '/manifest.json',     // ✅
  '/icons/icon.svg'     // ← icon-192.png 和 icon-512.png 也不在列表中
];

function isStaticAsset(url) {
  const path = url.pathname;
  // ...
  if (path.startsWith('/dist/')) return true;  // ← 死代码：部署时无 /dist/ 前缀
}
```
| **影响范围** | 离线时浏览器的 fetch 事件路由到 SW，但 SW 自身未被缓存。`/dist/` 条件永远不匹配 |
| **修复方案** | `STATIC_ASSETS` 添加 `/sw.js`；删除死代码 `/dist/` 条件 |

---

### Bug #4 — 分类过滤下 prev/next 按钮假死

| 项目 | 内容 |
|------|------|
| **类型** | 导航逻辑缺陷 |
| **所在文件** | [reader.html](../reader.html#L1134-L1152) |
| **问题描述** | 当 `currentCategory` 不为 null 时，`prevStory()` 和 `nextStory()` 按 `allStories` 全局索引导航，若前/后一篇分类不匹配，直接 `return` 不做任何操作。按钮不 disabled、不报错、不跳转 |
| **代码证据** |
```javascript
function prevStory() {
  if (currentStoryId === null) return;
  const idx = allStories.findIndex(s => s.id === currentStoryId);
  if (idx > 0) {
    const prev = allStories[idx - 1];
    if (currentCategory && prev.category !== currentCategory) return;  // ← 静默假死
    openStoryById(prev.id);
  }
}
```
| **影响范围** | 用户反复点击"上一篇"时机概无响应，以为按钮坏了。核心交互功能异常 |
| **修复方案** | 在分类模式下应在过滤池 `getFilteredPool()` 内导航，而非 `allStories` |

---

## 二、中等 Bug（🟠 近期修复）

### Bug #5 — `filterByCategory()` 后单分类导航全量失效

| 项目 | 内容 |
|------|------|
| **类型** | 状态管理缺陷 |
| **所在文件** | [reader.html](../reader.html#L1177-L1186) |
| **问题描述** | `filterByCategory()` 调用 `viewedIds.clear()` 后立即 `openRandomStory()`。当某分类只有 1 篇故事时，prev/next 全部失效，但按钮未 disabled |
| **影响范围** | 分类过滤后只有 1 篇故事 → 上下篇按钮可见但全部无效 |

### Bug #6 — `visibleEmails()` 文件夹过滤条件错误

| 项目 | 内容 |
|------|------|
| **类型** | 逻辑错误 |
| **所在文件** | [reader.html](../reader.html#L1309-L1314) |
| **问题描述** | inbox 过滤条件重复写了两遍；spam/deleted/archive 文件夹全部返回所有邮件（不按文件夹过滤） |
| **代码证据** |
```javascript
function visibleEmails() {
  if (currentFolder === 'inbox') return mockEmails.filter(e => e.folder === 'inbox' || e.folder === 'inbox');
  //                                                          相同条件重复 ──^                 ──^
```
| **影响范围** | 功能上不影响结果，但代码质量差；非收件箱文件夹不按 folder 过滤 |

### Bug #7 — 构建日志 `(6 files)` 数据不准确

| 项目 | 内容 |
|------|------|
| **类型** | 日志误导 |
| **所在文件** | [build.mjs](../scripts/build.mjs#L45-L51) |
| **问题描述** | `readdirSync` 返回 6 个文件（含 3 个 `.md`），`.md` 不进入过滤条件但日志仍显示 `(6 files)`。实际只复制了 3 个文件 |
| **验证** | `npm run build` 输出 `✓ stories (6 files)`，但 `dist/stories/` 只看到 INDEX.json + 2 个故事 JSON |
| **修复方案** | 日志应显示实际复制的文件数，而非目录总文件数 |

### Bug #8 — Google Fonts CDN 在中国不可用

| 项目 | 内容 |
|------|------|
| **类型** | 外部资源可用性 |
| **所在文件** | [reader.html](../reader.html#L13-L15) |
| **问题描述** | Google Fonts CDN 在中国大陆经常无法访问。Noto Serif SC 字体包 ~15MB，加载失败或延迟会导致 FOUT 和布局抖动 |
| **修复方案** | 添加自部署的字体 fallback 或使用国内 CDN 镜像 |

---

## 三、轻微 Bug（🟡 择机优化）

### Bug #9 — `filterByCategory` 后返回 Library 不重置标签栏

| 项目 | 内容 |
|------|------|
| **类型** | UI 状态不一致 |
| **所在文件** | [reader.html](../reader.html#L1209-L1213) |
| **问题描述** | 用户在 Reader 中筛选分类后点"返回目录"，Library 显示全部故事，但标签选中的分类残留未重置 |

### Bug #10 — Story 文件名 `encodeURIComponent` 导致中文编码不匹配

| 项目 | 内容 |
|------|------|
| **类型** | 文件路径兼容性 |
| **所在文件** | [reader.html](../reader.html#L1038) |
| **问题描述** | `encodeURIComponent(filename)` 会将中文（如"纸人"）编码为百分号格式，但本地文件系统保存的是原文字符名。在部分 HTTP 服务器配置下可能找不到文件 |

---

## 四、测试覆盖率统计

| 类型 | 状态 | 说明 |
|------|------|------|
| 单元测试 | ❌ 零覆盖 | 核心函数：loadStoryContent, pickRandomStory, prev/nextStory, visibleEmails, updateProgress 均无测试 |
| 集成测试 | ❌ 零覆盖 | 无端到端测试 |
| E2E 测试 | ❌ 零覆盖 | 无 Playwright/浏览器自动化测试 |

**核心函数待测清单：**

| 函数 | 需要覆盖的场景 |
|------|--------------|
| `loadStoryContent()` | 404 降级、网络错误、缓存命中、特殊字符文件名 |
| `pickRandomStory()` | 过滤后池为空、全部已读、单篇情况 |
| `prevStory()` / `nextStory()` | 分类过滤模式、边界（第一篇/最后一篇）、单分类独篇 |
| `visibleEmails()` | 每个文件夹的过滤结果、空文件夹 |
| `updateProgress()` | 阅读进度计算边界（0%/90%/100%） |

---

## 五、八荣八耻合规评分

| 规范 | 状态 | 涉及 Bug |
|------|------|----------|
| 第二荣：异常处理全覆盖 | ❌ | Bug #2 — fetch 无 try-catch |
| 第九荣：日志全面覆盖 | ✅ | 所有已有 catch 均写日志 |
| 第十二耻：硬编码资源路径 | ❌ | Bug #1 — 引用不存在的 PNG 文件 |
| 第十二耻：文件系统路径检查 | ❌ | Bug #1 — `File.Exists()` 类检查缺失 |
| 安全红线 #8：`except: pass` | ✅ | 无此问题 |
| 安全红线 #9：硬编码路径 | ❌ | Bug #1 |

---

## 六、建议修复优先级

| 优先级 | Bug | 估时 | 说明 |
|--------|-----|------|------|
| **P0** | Bug #1 — PWA 图标缺失 | 0.5h | 阻塞 PWA 功能 |
| **P0** | Bug #2 — fetch 异常处理 | 0.5h | 阻塞核心阅读流 |
| **P0** | Bug #4 — 分类导航假死 | 1.0h | 阻塞核心交互 |
| **P1** | Bug #3 — SW 自缓存缺陷 | 0.5h | 影响离线体验 |
| **P1** | Bug #5 — 单分类全失效 | 0.5h | 影响分类功能 |
| **P1** | Bug #6 — 文件夹过滤 | 0.5h | 影响 sneak mode |
| **P2** | Bug #7 — 构建日志 | 0.2h | 运维体验 |

---

*—— 报告生成于 2026-07-03 · 铁三角测试专家组*
