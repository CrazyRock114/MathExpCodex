# 静态发布契约

核验日期：2026-08-31

## 构建与目录

唯一生产构建命令是：

```bash
npm ci
npm run build
```

`vercel.json` 将构建命令固定为 `npm run build`，将输出目录固定为 `dist`。Vercel 只会发布输出目录中的内容，因此仓库根目录的旧版 `index.html` 不再被误当作生产主入口。配置依据见 Vercel 官方的 [Project Configuration](https://vercel.com/docs/project-configuration/vercel-json) 与 [Configure a Build](https://vercel.com/docs/builds/configure-a-build)。

发布包结构：

- `dist/index.html`：React 主应用。
- `dist/assets/`：Vite 生成的按需加载模块与样式。
- `dist/pages/{ID}.html`：148 个历史 URL 入口。
- `dist/legacy.html`：所有尚未迁移实验共用的旧版互动壳。
- `dist/knowledge.html`、`dist/vendor/`：旧版学习路径和固定版本 Chart.js。
- `dist/audio/`：仅文字稿和资产说明，不包含 MP3、WAV、M4A 或 OGG。
- `dist/release-manifest.json`：入口数、文件数、总字节数和音频二进制计数。

`scripts/assemble-site.mjs` 会在构建期间验证 148 个发布入口都指向共享旧壳，并在发现任何音频二进制时失败。源码 `pages/` 和发布包 `dist/pages/` 分别指向开发旧壳与发布旧壳，二者都由同一个 `gen_pages.py` 生成。

## 兼容性与回滚

- 新链接使用 `#/experiment/{ID}`。
- 旧根入口 `#{ID}` 会由 React 路由解析到同一实验详情。
- `/pages/{ID}.html` 保持不变，随后进入 `legacy.html#{ID}`。
- 旧壳是单一文件，不再复制 148 份；回滚时只需回退发布提交或把别名指回上一份已验证部署。

## 发布权限边界

仓库当前把 `git.deploymentEnabled` 设为 `false`，以符合“未经确认不部署生产环境”的约束。该设置是 Vercel 官方支持的关闭自动 Git 部署方式，见 [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration)。

负责人确认发布后，仍需在单独变更中完成以下动作：

1. 确认 Vercel 项目、团队、域名和生产分支归属。
2. 在干净克隆中运行 `npm ci && npm test && npm run build`。
3. 预览 `dist/`，验证 React 根入口、一个原生实验、一个未迁移实验和一个旧深链接。
4. 明确恢复自动部署还是执行一次性人工部署；不要在功能提交中隐式开启。
5. 发布后记录不可变部署 URL、提交 SHA、构建日志和回滚目标。

本仓库配置和测试只证明发布包可构建、可静态托管；它们不代表已经执行生产部署。
