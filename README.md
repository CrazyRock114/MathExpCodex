# AI 数学课堂 · 100 个数学小实验

为小学数学竞赛老师打造的可交互数学实验集合。覆盖数论 / 序列 / π·e / 几何 / 图论 / 概率 / 算法 / 分形 8 大类，共 **100 个实验**。

## 在线访问

打开 `index.html` 即可使用（无后端，单文件 238KB）。

> **注**：原部署在 https://cc9xbn7w2yo4u.space.mcode.cn（platform 限制 URL 经常变；推荐本地开）。

## 功能

- **9 个 Tab**：投针 / Collatz / 勾股 / 四色 / 拉姆齐 R(3,3) / 哥德巴赫 / 孪生素数 / π 多算法 / 实验广场
- **100 个实验**：每个实验有核心陈述 + AI 切入点 + 小学生直观讲解 + 课堂活动
- **9 大分类**：数论 (20) / 序列 (15) / π·e (10) / 几何 (10) / 图论 (10) / 概率 (10) / 算法 (10) / 分形 (5) / 其他 (10)
- **课堂投屏模式**：黑底大字 + 顶部计时器，投影清晰
- **深色模式**：一键切换，localStorage 记住
- **PWA**：可添加到主屏幕
- **下载 PNG**：4 个核心 Tab 可导出当前结果
- **AI 讲解 prompt**：每个实验一键复制讲解 prompt 到剪贴板，老师粘到豆包/DeepSeek 即可获得 AI 讲解
- **Nim AI 对手**：AI 用标准异或策略，孩子可学"xor 决定胜负"
- **井字棋 3 难度**：简单/中等/困难，孩子感受 minimax 算法差异
- **TSP 暴力+贪心**：同一组数据对比，贪心比最优差多少
- **Voronoi 不规则地图**：让"3 色挑战"真正有效
- **移动端适配**：600px 断点 + 触屏 36px+ 点击区

## 包含文件

- `index.html` - 主程序（单文件 238KB，依赖 Chart.js CDN）
- `test_results.md` - 100 个实验的严格测试结果
- `optimization_report.md` - 下一步优化迭代方案
- `README.md` - 本文件
- `LICENSE` - MIT 许可

## 教学场景用法

1. **投屏演示**：点 📺 投屏模式 → 黑底大字 → 投到教室屏
2. **学生自玩**：发 URL → 学生手机扫码 → 触屏自动适配
3. **课堂练习**：4 色 / Nim / 井字棋让孩子当堂玩
4. **孪生素数扫射**：扫到 5000 约 1 秒，散点图实时出
5. **AI 讲解**：孩子卡住 → 老师复制 prompt → 豆包讲解 → 复述

## 技术栈

- 单文件 HTML（vanilla JS + CSS）
- 图表用 [Chart.js v4.4.1](https://www.chartjs.org/) 走 jsdelivr CDN
- SVG 用于 Voronoi / Ramsey / TicTacToe
- Canvas 用于 Buffon 投针 / 分形 / 生命游戏
- 没有后端，所有计算在前端

## 开发与扩展

参考 [`optimization_report.md`](./optimization_report.md) 了解下一步优化方向。

新增实验非常容易 — 往 `EXPERIMENTS` 数组里加一条就行：

```js
{
  id: 'NT21', cat: '数论', title: '...',
  intro: '...',
  render: (h) => {
    h.innerHTML = `<button>...</button>`;
    // 绑事件...
  }
}
```

## License

MIT
