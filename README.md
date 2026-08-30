# MathExpCodex

面向 K12 学习者的交互式可视化数学实验平台。项目当前收录 148 个实验，通过五个渐进步骤、Canvas、SVG 和图表帮助学生从直觉、操作与观察进入数学概念。

> 当前状态：稳定化与架构重构阶段。现有实验已经建立浏览器冒烟测试，但数学内容、学段标注、无障碍和工程架构仍在持续审阅，不应把所有页面视为已经完成教学审核的正式课程。

## 实验构成

按内容状态分：

- 119 个基础公理、定理、算法或数学对象实验
- 9 个未解决问题实验
- 20 个已证明猜想及相关研究实验

主题覆盖数论、序列、π 与 e、几何、图论、概率、算法、分形、其他、前沿和已证明成果。

每个实验都有独立地址：`pages/{ID}.html`，例如 `pages/PR01.html`。

## 本地运行

要求：Node.js 24+、npm、Python 3。

```bash
git clone https://github.com/CrazyRock114/MathExpCodex.git
cd MathExpCodex
npm install
npx playwright install chromium
npm run dev:app
```

打开 <http://127.0.0.1:5173/> 查看新的 React 目录与详情路由。

旧版基线仍可运行：

```bash
npm run dev
```

打开 <http://127.0.0.1:4173/index.html>。新旧入口并行存在，直到实验互动组件迁移完成。

## 质量检查

```bash
npm test
```

当前质量入口会依次运行目录生成、TypeScript、Vitest、Vite 生产构建和 172 项 Playwright 检查：

- 独立实验页面数量必须为 148
- 每页能够加载且没有破坏交互的 JavaScript 错误
- 每页具有五个阶段入口
- 互动区域不能无提示地留白
- 首页数据数量与类型统计一致
- 首页在 360px、390px、768px 视口没有横向溢出
- 新 React 目录包含 148 个类型化实验，并支持搜索、筛选和详情路由
- PR01–PR08 已具有 React 原生五阶段互动与算法单元测试
- 八个原生实验的全部 40 个阶段在 360px、390px、768px 无横向溢出
- 新目录与八个原生实验的全部阶段没有 axe `critical` 或 `serious` 无障碍问题

GitHub Actions 使用稀疏检出跳过大型 MP3，避免无关媒体拖慢页面逻辑测试。

## 渐进迁移架构

新的共享应用层已经建立：

- Vite 8、TypeScript 7、React 19
- 148 条类型化实验摘要与模块级 ID 索引
- Hash 详情路由、搜索别名、状态与主题筛选
- 小学 / 初中 / 高中学段草案、学习目标、前置知识和审阅状态字段
- PR01–PR08 的 React 原生五阶段实验，覆盖概率、数论、图论和数值算法
- 8 项已完成来源与数学内容核验，140 项仍明确标记为 `unreviewed`
- 实验组件按路由动态加载；入口 JavaScript 约 81.4KB gzip，单个实验块约 2.5–3.3KB gzip
- Vitest、Playwright、移动端和 axe 门禁

旧实验运行层仍为：

- 静态 HTML、CSS 和原生 JavaScript
- Chart.js 4.4.1（当前通过 jsDelivr CDN 加载）
- Canvas、SVG 和少量 SMIL 动画
- 148 个生成的独立 HTML 页面
- 无后端、无账户和用户数据存储

现有 `index.html` 和独立页面仍包含大量重复代码。前八个旗舰实验已迁入共享实验壳；其余详情页仍链接旧互动页面，迁移期间保留旧页作为对照。

## 重要目录

- `index.html`：当前主应用
- `app/`：新的 React 应用、组件、样式和类型化目录
- `scripts/generate-catalog.mjs`：从旧元数据生成受 TypeScript 约束的目录
- `pages/`：148 个独立实验页面
- `experiments_meta.json`：旧版实验元数据快照，后续将迁移为有类型约束的数据源
- `audio/`：讲解音频及文字稿；音频将迁移到对象存储/CDN
- `tests/`：Playwright 浏览器冒烟测试
- `docs/PROGRESS.md`：当前 Goal、里程碑、测试证据和后续工作
- `gen_pages.py`：旧版独立页面生成器

## 当前迭代优先级

1. 沿用共享阶段壳迁移下一批旗舰实验，同时保持 148 页回归基线。
2. 把当前自动生成的学段与学习目标草案升级为逐项审阅内容。
3. 为全部实验补充权威来源，并把 `unreviewed` 逐步变为 `verified`。
4. 修复数学事实、术语翻译和自动 TTS 文案污染。
5. 建立单元测试、无障碍、性能和移动端质量门禁。
6. 将大型音频和重复备份与源代码仓库解耦。

详细进度见 [docs/PROGRESS.md](./docs/PROGRESS.md)。

## 内容与贡献原则

- 不以“5 岁都能懂”作为所有主题的统一标准；内容按学段和前置知识分层。
- 新增或修改数学事实必须附权威来源。
- “猜想”“定理”“算法”“数学对象”和“研究进展”应明确区分。
- 互动需要有可观察结果、重置方式和自动化测试。
- 大型媒体、生成文件与源码应分离管理。

## License

MIT
