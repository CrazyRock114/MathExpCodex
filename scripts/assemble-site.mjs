import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';

const workspace = process.cwd();
const outputRoot = resolve(workspace, 'dist');
const binaryExtensions = new Set(['.m4a', '.mp3', '.ogg', '.wav']);

async function copyTreeWithoutMedia(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyTreeWithoutMedia(sourcePath, destinationPath);
    } else if (!binaryExtensions.has(extname(entry.name).toLowerCase())) {
      await copyFile(sourcePath, destinationPath);
    }
  }
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

await stat(join(outputRoot, 'index.html'));
await Promise.all([
  copyFile(join(workspace, 'index.html'), join(outputRoot, 'legacy.html')),
  copyFile(join(workspace, 'knowledge.html'), join(outputRoot, 'knowledge.html')),
  copyTreeWithoutMedia(join(workspace, 'vendor'), join(outputRoot, 'vendor')),
  copyTreeWithoutMedia(join(workspace, 'audio'), join(outputRoot, 'audio'))
]);

const releaseFiles = await walk(outputRoot);
const historicalPages = releaseFiles.filter((path) =>
  dirname(path) === join(outputRoot, 'pages') && path.endsWith('.html')
);
const mediaBinaries = releaseFiles.filter((path) => binaryExtensions.has(extname(path).toLowerCase()));
const pageTargets = await Promise.all(historicalPages.map((path) => readFile(path, 'utf8')));

if (historicalPages.length !== 148) throw new Error(`发布包历史入口不是 148 个：${historicalPages.length}`);
if (pageTargets.some((source) => !source.includes('../legacy.html#'))) {
  throw new Error('发布包历史入口没有统一指向 legacy.html');
}
if (mediaBinaries.length) {
  throw new Error(`发布包意外包含音频二进制：${mediaBinaries.map((path) => relative(outputRoot, path)).join(', ')}`);
}

const manifest = {
  appEntry: 'index.html',
  legacyEntry: 'legacy.html',
  knowledgeEntry: 'knowledge.html',
  historicalPages: historicalPages.length,
  payloadFiles: releaseFiles.length,
  payloadBytes: (await Promise.all(releaseFiles.map(async (path) => (await stat(path)).size)))
    .reduce((sum, size) => sum + size, 0),
  audioBinaryFiles: mediaBinaries.length
};

await writeFile(join(outputRoot, 'release-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(manifest, null, 2));
