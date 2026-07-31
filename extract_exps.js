// 从 index.html 中提取 EXPERIMENTS 数组，把每个实验的字段 + render 源码存为 JSON
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf-8');
const m = html.match(/const EXPERIMENTS = \[(.+?)\];\s*\/\/\s*EXPERIMENTS 结束/s);
if (!m) { console.error('找不到 EXPERIMENTS 数组'); process.exit(1); }

const expSrc = '[' + m[1] + ']';
// 调 eval
const EXPERIMENTS = eval(expSrc);

const out = EXPERIMENTS.map(e => ({
  id: e.id, cat: e.cat, title: e.title, intro: e.intro,
  principle: e.principle || '', history: e.history || '',
  tryit: e.tryit || '', svgDemo: e.svgDemo || '',
  explain: e.explain || '', audioUrl: e.audioUrl || '',
  // render 函数体（去掉箭头函数语法，直接保留函数体）
  // 实际上要把 "(h) => ..." 转成 "function(h) { ... }" 才能嵌入到 <script>
  // 简化处理：把整个 render 表达式转字符串
  renderSrc: e.render.toString()
}));

fs.writeFileSync('experiments_meta.json', JSON.stringify(out, null, 2));
console.log(`提取 ${out.length} 个实验到 experiments_meta.json`);
console.log('前 3 个 ID:', out.slice(0, 3).map(e => e.id).join(', '));
console.log('render 样例（前 200 字符）:', out[0].renderSrc.substring(0, 200));
