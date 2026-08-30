import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const workspace = process.cwd();
const packageJson = JSON.parse(readFileSync(join(workspace, 'package.json'), 'utf8'));
const vercel = JSON.parse(readFileSync(join(workspace, 'vercel.json'), 'utf8'));
const vercelIgnore = readFileSync(join(workspace, '.vercelignore'), 'utf8').split(/\r?\n/);

const expected = {
  framework: 'vite',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  automaticGitDeployments: false,
  packageBuild: 'npm run build:site'
};

if (vercel.framework !== expected.framework) throw new Error('Vercel framework 不是 vite');
if (vercel.buildCommand !== expected.buildCommand) throw new Error('Vercel buildCommand 与标准构建入口不一致');
if (vercel.outputDirectory !== expected.outputDirectory) throw new Error('Vercel outputDirectory 不是 dist');
if (vercel.git?.deploymentEnabled !== expected.automaticGitDeployments) {
  throw new Error('未经确认不得启用 Vercel 自动 Git 部署');
}
if (packageJson.scripts?.build !== expected.packageBuild) throw new Error('package.json build 入口与发布契约不一致');
if (!vercelIgnore.includes('audio/v13_partial/')) throw new Error('Vercel 上传未排除归档音频');

console.log(JSON.stringify(expected, null, 2));
