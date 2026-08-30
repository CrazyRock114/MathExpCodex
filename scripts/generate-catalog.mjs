import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');
const metadataPath = resolve(repositoryRoot, 'experiments_meta.json');
const legacyAppPath = resolve(repositoryRoot, 'index.html');
const outputPath = resolve(repositoryRoot, 'app/src/data/catalog.generated.ts');

const KIND_PATTERN = /\bid:\s*['"]([A-Z0-9_]+)['"],\s*type:\s*['"]([^'"]+)['"]/g;
const VALID_KINDS = new Set(['axiom_theorem', 'conjecture_open', 'conjecture_proven']);

const PREREQUISITES_BY_CATEGORY = {
  数论: ['四则运算', '整数、因数与倍数'],
  序列: ['四则运算', '观察和描述规律'],
  'π·e': ['分数与小数', '平面图形基础'],
  几何: ['平面图形', '长度、角度与面积'],
  图论: ['集合与关系', '逻辑推理'],
  概率: ['分数与比例', '数据统计基础'],
  算法: ['四则运算', '分步骤解决问题'],
  分形: ['平面图形', '重复与缩放'],
  其他: ['四则运算', '观察和提出猜想'],
  前沿: ['代数与函数', '几何或概率基础'],
  已证: ['代数与函数', '理解定理与猜想的区别']
};

function recommendedGradeBands(experiment) {
  if (experiment.id.startsWith('EX') || experiment.cat === '前沿' || experiment.cat === '已证') {
    return ['high'];
  }
  if (['算法', '图论', '分形'].includes(experiment.cat)) {
    return ['middle', 'high'];
  }
  if (experiment.id.startsWith('PR')) {
    return ['middle', 'high'];
  }
  return ['primary', 'middle'];
}

function learningObjectives(experiment) {
  return [
    `通过可视化和操作描述“${experiment.title}”中的核心现象`,
    '比较不同输入或参数下的结果，并用自己的语言解释观察到的规律'
  ];
}

function searchAliases(experiment) {
  const aliases = [];
  if (/Fibonacci/i.test(`${experiment.title} ${experiment.intro}`)) aliases.push('斐波那契');
  if (/Collatz/i.test(`${experiment.title} ${experiment.intro}`)) aliases.push('科拉茨', '冰雹猜想');
  return aliases;
}

const [metadataText, legacyApp] = await Promise.all([
  readFile(metadataPath, 'utf8'),
  readFile(legacyAppPath, 'utf8')
]);

const metadata = JSON.parse(metadataText);
const kindById = new Map(
  Array.from(legacyApp.matchAll(KIND_PATTERN), ([, id, kind]) => [id, kind])
);

if (metadata.length !== 148) {
  throw new Error(`期望 148 个实验元数据，实际得到 ${metadata.length}`);
}

const ids = new Set();
const catalog = metadata.map((experiment) => {
  if (ids.has(experiment.id)) throw new Error(`重复实验 ID：${experiment.id}`);
  ids.add(experiment.id);

  const kind = kindById.get(experiment.id);
  if (!VALID_KINDS.has(kind)) throw new Error(`实验 ${experiment.id} 缺少有效 type`);
  if (!Array.isArray(experiment.stages) || experiment.stages.length !== 5) {
    throw new Error(`实验 ${experiment.id} 必须具有 5 个阶段`);
  }

  return {
    id: experiment.id,
    title: experiment.title,
    intro: experiment.intro,
    category: experiment.cat,
    kind,
    searchAliases: searchAliases(experiment),
    stageCount: experiment.stages.length,
    legacyPath: `./pages/${experiment.id}.html`,
    education: {
      gradeBands: recommendedGradeBands(experiment),
      learningObjectives: learningObjectives(experiment),
      prerequisites: PREREQUISITES_BY_CATEGORY[experiment.cat] ?? ['四则运算'],
      sources: [],
      reviewStatus: 'unreviewed',
      lastReviewedAt: null
    }
  };
});

const output = `/* 此文件由 scripts/generate-catalog.mjs 生成，请勿手工修改。 */
import type { ExperimentSummary } from './experiment';

export const EXPERIMENT_CATALOG = ${JSON.stringify(catalog, null, 2)} as const satisfies readonly ExperimentSummary[];
`;

await writeFile(outputPath, output, 'utf8');
console.log(`已生成 ${catalog.length} 个类型化实验摘要：${outputPath}`);
