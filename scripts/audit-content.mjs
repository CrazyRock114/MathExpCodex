import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const workspace = process.cwd();
const sourceEntries = [
  'index.html',
  'knowledge.html',
  'experiments_meta.json',
  'audio',
  'app/src'
];
const textExtensions = new Set(['.html', '.json', '.md', '.txt', '.ts', '.tsx', '.js', '.mjs']);
const forbiddenTokens = [
  '普里姆e',
  'Chud诺夫斯基',
  '欧拉ian',
  '高斯帕',
  'LyChrel',
  '普里姆zahlen',
  '公元 2025 年',
  '高斯ian',
  '已发现 51 个',
  '目前只发现 51 个',
  '近 5000 万位',
  '接近 5000 万位',
  '验证到 10<sup>1500</sup>',
  '算到了 10 的 1500 次方',
  'RSA 加密里有时用大梅森素数当模数'
];

function collectTextFiles(entry) {
  const absolute = join(workspace, entry);
  if (!statSync(absolute).isDirectory()) return [absolute];

  return readdirSync(absolute, { withFileTypes: true }).flatMap((item) => {
    const child = join(absolute, item.name);
    if (item.isDirectory()) return collectTextFiles(relative(workspace, child));
    return textExtensions.has(extname(item.name)) ? [child] : [];
  });
}

const files = sourceEntries.flatMap(collectTextFiles);
const violations = [];

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const token of forbiddenTokens) {
      if (line.includes(token)) {
        violations.push(`${relative(workspace, file)}:${index + 1} 包含污染词 ${JSON.stringify(token)}`);
      }
    }
  });
}

if (violations.length > 0) {
  throw new Error(`内容污染审计失败：\n${violations.join('\n')}`);
}

console.log(JSON.stringify({ scannedFiles: files.length, forbiddenTokens: forbiddenTokens.length }, null, 2));
