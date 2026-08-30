import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const workspace = process.cwd();
const audioRoot = join(workspace, 'audio');
const pagesRoot = join(workspace, 'pages');
const binaryExtensions = new Set(['.m4a', '.mp3', '.ogg', '.wav']);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function extension(path) {
  const dot = path.lastIndexOf('.');
  return dot < 0 ? '' : path.slice(dot).toLowerCase();
}

const experiments = JSON.parse(readFileSync(join(workspace, 'experiments_meta.json'), 'utf8'));
const pageFiles = readdirSync(pagesRoot).filter((name) => name.endsWith('.html'));
const experimentIds = experiments.map(({ id }) => id).sort();
const pageIds = pageFiles.map((name) => name.slice(0, -'.html'.length)).sort();
const pageSizes = pageFiles.map((name) => statSync(join(pagesRoot, name)).size);
const audioFiles = walk(audioRoot);
const binaryFiles = audioFiles.filter((path) => binaryExtensions.has(extension(path)));
const activeBinaryFiles = binaryFiles.filter((path) => !relative(audioRoot, path).startsWith('v13_partial/'));
const configuredAudio = experiments.filter(({ audioUrl }) => Boolean(audioUrl));
const binaryBytes = binaryFiles.reduce((sum, path) => sum + statSync(path).size, 0);

const summary = {
  experiments: experiments.length,
  generatedPages: pageFiles.length,
  generatedPageBytes: pageSizes.reduce((sum, size) => sum + size, 0),
  largestGeneratedPageBytes: Math.max(...pageSizes),
  transcriptAndScriptFiles: audioFiles.length - binaryFiles.length,
  configuredRuntimeAudioUrls: configuredAudio.length,
  archivedBinaryFiles: binaryFiles.length,
  archivedBinaryBytes: binaryBytes,
  archivedBinarySha256: Object.fromEntries(binaryFiles.map((path) => [
    relative(workspace, path),
    createHash('sha256').update(readFileSync(path)).digest('hex')
  ]))
};

if (experiments.length !== 148 || pageFiles.length !== 148) throw new Error('实验或历史入口数量不是 148');
if (new Set(experimentIds).size !== experimentIds.length) throw new Error('实验目录包含重复 ID');
if (JSON.stringify(experimentIds) !== JSON.stringify(pageIds)) {
  throw new Error('实验目录与历史入口 ID 不一致');
}
if (summary.generatedPageBytes > 200_000 || summary.largestGeneratedPageBytes > 2_000) {
  throw new Error('历史入口重新膨胀；共享壳可能又被复制进 pages/');
}
if (configuredAudio.length) throw new Error('元数据声明了未纳入受管媒体清单的运行时音频');
if (activeBinaryFiles.length) throw new Error(`发现活动目录音频二进制：${activeBinaryFiles.join(', ')}`);

console.log(JSON.stringify(summary, null, 2));
