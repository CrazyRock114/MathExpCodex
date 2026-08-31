import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const workspace = process.cwd();
const outputRoot = resolve(workspace, 'dist');
const outputPages = join(outputRoot, 'pages');
const template = await readFile(join(outputRoot, 'index.html'), 'utf8');
const experiments = JSON.parse(await readFile(join(workspace, 'experiments_meta.json'), 'utf8'));
const idPattern = /^[A-Z0-9_]+$/;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function experimentPage(experiment) {
  const title = `${escapeHtml(experiment.title)}（${experiment.id}）· MathExpCodex`;
  const description = escapeHtml(experiment.intro);
  return template
    .replaceAll('src="./assets/', 'src="../assets/')
    .replaceAll('href="./assets/', 'href="../assets/')
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${description}$2`
    );
}

await rm(outputPages, { recursive: true, force: true });
await mkdir(outputPages, { recursive: true });

for (const experiment of experiments) {
  if (!idPattern.test(experiment.id)) throw new Error(`非法实验 ID：${experiment.id}`);
  await writeFile(
    join(outputPages, `${experiment.id}.html`),
    experimentPage(experiment),
    'utf8'
  );
}

const generated = (await readdir(outputPages)).filter((name) => name.endsWith('.html'));
if (generated.length !== 148) throw new Error(`独立实验页面不是 148 个：${generated.length}`);
console.log(`已生成 ${generated.length} 个独立 React 实验页面`);
