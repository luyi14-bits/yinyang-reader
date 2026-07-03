# Checklist — PWA 离线与安装支持

## PWA 清单与图标

| # | 验收项 | 通过条件 | 代码证据 |
|---|-------|---------|---------|
| 1.1 | manifest.json 存在且合法 | 文件有效 JSON，可被浏览器 PWA 检测到 | DevTools Application > Manifest |
| 1.2 | display: standalone 生效 | 添加到主屏幕后打开无浏览器地址栏 | 手动测试 |
| 1.3 | 图标 192x192 + 512x512 | 图标文件存在于 `icons/` 目录，manifest 中正确引用 | `icons/` 目录文件检查 |
| 1.4 | theme-color meta 存在 | `<meta name="theme-color">` 值为 `#1a1614` | 查看 `reader.html` head |
| 1.5 | Apple 适配 meta | `apple-touch-icon`、`mobile-web-app-capable` 等 meta 标签存在 | 查看 `reader.html` head |

## Service Worker

| # | 验收项 | 通过条件 | 代码证据 |
|---|-------|---------|---------|
| 2.1 | Service Worker 注册成功 | console 输出 "SW registered" 或类似确认信息 | DevTools Console |
| 2.2 | 静态资源离线可访问 | 断网后刷新页面，HTML/CSS/JS 正常加载 | DevTools > Offline 测试 |
| 2.3 | 故事数据离线可读 | 断网后至少能阅读 5 篇已缓存故事 | 手动测试 |
| 2.4 | SW 更新机制正常 | 修改 sw.js 后重新加载，新版本 install 等待激活 | DevTools Application > SW |

## 构建配置与响应式

| # | 验收项 | 通过条件 | 代码证据 |
|---|-------|---------|---------|
| 3.1 | package.json 存在 | 文件包含 name、version、scripts | `package.json` |
| 3.2 | npm run build 成功 | 命令执行无错误，dist/ 目录生成 | 运行 `npm run build` |
| 3.3 | 桌面端布局可用 | >768px 宽度下居中显示，内容可读 | 浏览器 resize 测试 |
| 3.4 | .gitignore 包含 dist/ | `dist/`、`node_modules/` 已被忽略 | 检查 `.gitignore` |
