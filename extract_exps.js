// 从 index.html 中提取 EXPERIMENTS 数组，把每个实验的字段 + render 源码存为 JSON
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf-8');
// 从 // EXPERIMENTS 结束 标记往前找 EXPERIMENTS 数组结束
const expEndIdx = html.indexOf('// EXPERIMENTS 结束');
if (expEndIdx === -1) { console.error('找不到 EXPERIMENTS 结束标记'); process.exit(1); }
// 找 // EXPERIMENTS 结束 之前最近的 "  },\n// EXPERIMENTS 结束"
// 实际上找 EXPERIMENTS 数组末尾的 '},' + '\n\n// EXPERIMENTS 结束'
const beforeEnd = html.lastIndexOf('},', expEndIdx);
const expStartIdx = html.indexOf('const EXPERIMENTS = [');
if (expStartIdx === -1) { console.error('找不到 EXPERIMENTS = ['); process.exit(1); }
// 数组内容 = 从 'const EXPERIMENTS = [' 后到 beforeEnd+2
const arrayContent = html.substring(expStartIdx + 'const EXPERIMENTS = ['.length, beforeEnd + 2);
const m = ['EXPERIMENTS 数组', arrayContent, arrayContent];

// 收集所有依赖的 getStagesXxx() 函数：从 EXPERIMENTS 数组中匹配
const expSrc = '[' + m[1] + ']';
const depMatches = [...m[1].matchAll(/getStages(\w+)\s*\(\s*\)/g)];
const depFns = [...new Set(depMatches.map(x => `getStages${x[1]}`))];
// 从 index.html 中抽取这些函数定义
const fnDefs = depFns.map(fnName => {
  const fnRegex = new RegExp(`function\\s+${fnName}\\s*\\([^)]*\\)\\s*{[\\s\\S]*?^}`, 'm');
  const fnMatch = html.match(fnRegex);
  return fnMatch ? fnMatch[0] : `function ${fnName}() { return []; }`;
}).join('\n\n');

// 把函数定义和 EXPERIMENTS 一起 eval
const EXPERIMENTS = eval(fnDefs + '\n[' + m[1] + ']');

const out = EXPERIMENTS.map(e => ({
  id: e.id, cat: e.cat, title: e.title, intro: e.intro,
  principle: e.principle || '', history: e.history || '',
  tryit: e.tryit || '', svgDemo: e.svgDemo || '',
  explain: e.explain || '', audioUrl: e.audioUrl || '',
  // 5 步直观讲解 stages（数组：[{emoji, title, content}, ...]）
  stages: e.stages || [],
  // render 函数体（去掉箭头函数语法，直接保留函数体）
  // 实际上要把 "(h) => ..." 转成 "function(h) { ... }" 才能嵌入到 <script>
  // 简化处理：把整个 render 表达式转字符串
  renderSrc: e.render.toString()
}));

fs.writeFileSync('experiments_meta.json', JSON.stringify(out, null, 2));
console.log(`提取 ${out.length} 个实验到 experiments_meta.json`);
console.log('前 3 个 ID:', out.slice(0, 3).map(e => e.id).join(', '));
console.log('render 样例（前 200 字符）:', out[0].renderSrc.substring(0, 200));
