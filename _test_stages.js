// 直接 eval EXPERIMENTS 数组，看 stages
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
const m = html.match(/const EXPERIMENTS = \[(.+?)\];\s*\/\/\s*EXPERIMENTS 结束/s);
if (!m) { console.error('no match'); process.exit(1); }
// 抽 getStagesPR01 函数
const fnRegex = /function\s+(getStages\w+)\s*\([^)]*\)\s*{[\s\S]*?^}/gm;
let match;
const fnDefs = [];
while ((match = fnRegex.exec(html)) !== null) fnDefs.push(match[0]);
const expSrc = '[' + m[1] + ']';
const EXPERIMENTS = eval(fnDefs.join('\n\n') + '\n' + expSrc);
const pr01 = EXPERIMENTS.find(e => e.id === 'PR01');
console.log('PR01.stages:', pr01.stages ? pr01.stages.length : 'null');
if (pr01.stages) {
  pr01.stages.forEach((s, i) => {
    console.log(`Stage ${i + 1}: title="${s.title}", content length=${s.content ? s.content.length : 'null'}`);
  });
}
