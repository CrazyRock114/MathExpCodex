import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { analyzeEulerTrail, type UndirectedEdge } from '../math';
import type { NativeExperiment } from '../types';

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const POSITIONS = [[180, 30], [315, 120], [265, 260], [95, 260], [45, 120], [180, 150]] as const;
const SEVEN_BRIDGES: readonly UndirectedEdge[] = [
  { left: 0, right: 1 }, { left: 0, right: 1 },
  { left: 0, right: 2 }, { left: 0, right: 2 },
  { left: 0, right: 3 }, { left: 1, right: 3 }, { left: 2, right: 3 }
];

function GraphView({ vertexCount, edges, activeEdges = edges.length }: { readonly vertexCount: number; readonly edges: readonly UndirectedEdge[]; readonly activeEdges?: number }) {
  const analysis = analyzeEulerTrail(vertexCount, edges);
  return (
    <svg aria-label={`${vertexCount} 个顶点、${edges.length} 条边的图`} className="euler-svg" role="img" viewBox="0 0 360 300">
      {edges.map(({ left, right }, index) => {
        const [x1, y1] = POSITIONS[left] ?? POSITIONS[0];
        const [x2, y2] = POSITIONS[right] ?? POSITIONS[0];
        const duplicateIndex = edges.slice(0, index).filter((edge) => edge.left === left && edge.right === right || edge.left === right && edge.right === left).length;
        const curve = duplicateIndex ? 30 * (duplicateIndex % 2 ? 1 : -1) : 0;
        return <path className={index < activeEdges ? 'walked' : ''} d={`M${x1},${y1} Q${(x1 + x2) / 2 + curve},${(y1 + y2) / 2 + curve} ${x2},${y2}`} key={index} />;
      })}
      {Array.from({ length: vertexCount }, (_, vertex) => {
        const [x, y] = POSITIONS[vertex] ?? POSITIONS[0];
        return <g key={vertex}><circle className={analysis.oddVertices.includes(vertex) ? 'odd' : ''} cx={x} cy={y} r="24" /><text textAnchor="middle" x={x} y={y + 5}>{LABELS[vertex]}:{analysis.degrees[vertex]}</text></g>;
      })}
    </svg>
  );
}

function BridgesStage() {
  const analysis = analyzeEulerTrail(4, SEVEN_BRIDGES);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">把四块陆地缩成顶点、七座桥缩成边。每次进入中途陆地都必须用另一座桥离开，所以中途顶点贡献成对的边。</p>
        <div className="metric-grid">{analysis.degrees.map((degree, index) => <div key={index}><span>陆地 {LABELS[index]}</span><strong>{degree}（奇）</strong></div>)}</div>
        <output className="result-neutral">4 个奇度顶点，因此不可能每座桥恰好走一次。</output>
      </div>
      <GraphView edges={SEVEN_BRIDGES} vertexCount={4} />
    </div>
  );
}

const PRESETS = {
  环: { vertexCount: 5, edges: [0, 1, 1, 2, 2, 3, 3, 4, 4, 0] },
  路径: { vertexCount: 5, edges: [0, 1, 1, 2, 2, 3, 3, 4] },
  'K₅': { vertexCount: 5, edges: [0, 1, 0, 2, 0, 3, 0, 4, 1, 2, 1, 3, 1, 4, 2, 3, 2, 4, 3, 4] },
  星形: { vertexCount: 5, edges: [0, 1, 0, 2, 0, 3, 0, 4] }
} as const;

function pairEdges(values: readonly number[]) {
  return Array.from({ length: values.length / 2 }, (_, index) => ({ left: values[index * 2]!, right: values[index * 2 + 1]! }));
}

function CriterionStage() {
  const [name, setName] = useState<keyof typeof PRESETS>('环');
  const preset = PRESETS[name];
  const edges = pairEdges(preset.edges);
  const result = analyzeEulerTrail(preset.vertexCount, edges);
  const labels = { circuit: '欧拉回路', path: '欧拉路径（不闭合）', none: '不存在欧拉路线' } as const;
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">判定要同时满足两件事：所有有边的顶点连成一片；奇度顶点数只能是 0 或 2。</p>
        <div className="preset-row">{Object.keys(PRESETS).map((key) => <button aria-pressed={name === key} key={key} onClick={() => setName(key as keyof typeof PRESETS)} type="button">{key}</button>)}</div>
        <div className="metric-grid"><div><span>连通</span><strong>{result.connected ? '是' : '否'}</strong></div><div><span>奇度顶点</span><strong>{result.oddVertices.length}</strong></div><div><span>结论</span><strong>{labels[result.type]}</strong></div></div>
        <aside className="correction-note"><strong>旧版纠错：</strong>K₅ 每个顶点度数是 4，所以有 0 个奇度顶点；“奇阶完全图全奇”把 n 与 n−1 的奇偶性写反了。五顶点星形有 4 个奇度叶子，也不是 2 个。</aside>
      </div>
      <GraphView edges={edges} vertexCount={preset.vertexCount} />
    </div>
  );
}

function BuilderStage() {
  const [vertexCount, setVertexCount] = useState(5);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);
  const [edges, setEdges] = useState<readonly UndirectedEdge[]>([{ left: 0, right: 1 }, { left: 1, right: 2 }, { left: 2, right: 0 }]);
  const result = analyzeEulerTrail(vertexCount, edges.filter((edge) => edge.left < vertexCount && edge.right < vertexCount));
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">自己加边，观察一次操作会让两个端点的度数各加 1，因此奇度顶点的总数总是偶数。</p>
        <label className="control-label">顶点数：{vertexCount}<input max="6" min="3" onChange={(event) => { setVertexCount(event.target.valueAsNumber); setEdges([]); }} type="range" value={vertexCount} /></label>
        <div className="edge-builder"><label>端点一<select onChange={(event) => setLeft(Number(event.target.value))} value={left}>{Array.from({ length: vertexCount }, (_, index) => <option key={index} value={index}>{LABELS[index]}</option>)}</select></label><label>端点二<select onChange={(event) => setRight(Number(event.target.value))} value={right}>{Array.from({ length: vertexCount }, (_, index) => <option key={index} value={index}>{LABELS[index]}</option>)}</select></label></div>
        <div className="preset-row"><button disabled={left === right} onClick={() => setEdges((current) => [...current, { left, right }])} type="button">添加边</button><button disabled={!edges.length} onClick={() => setEdges((current) => current.slice(0, -1))} type="button">撤销一条</button><button onClick={() => setEdges([])} type="button">清空</button></div>
        <output className={result.type === 'none' ? 'result-neutral' : 'result-good'}>连通：{result.connected ? '是' : '否'}；奇度顶点 {result.oddVertices.length} 个；{result.type === 'circuit' ? '有欧拉回路' : result.type === 'path' ? '有欧拉路径' : '不能一笔走完'}</output>
      </div>
      <GraphView edges={edges} vertexCount={vertexCount} />
    </div>
  );
}

function ConstructStage() {
  const edges = pairEdges(PRESETS['K₅'].edges);
  const result = analyzeEulerTrail(5, edges);
  const walkEdges = (() => {
    const remaining = [...edges];
    return result.trail.slice(1).map((vertex, index) => {
      const previous = result.trail[index]!;
      const edgeIndex = remaining.findIndex(({ left, right }) => left === previous && right === vertex || right === previous && left === vertex);
      return remaining.splice(edgeIndex, 1)[0]!;
    });
  })();
  const [step, setStep] = useState(0);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">K₅ 有欧拉回路。Hierholzer 方法沿未用边前进，形成回路；若还剩边，就从已有回路上的顶点插入另一段回路。</p>
        <label className="control-label">已走边数：{step}/{edges.length}<input max={edges.length} min="0" onChange={(event) => setStep(event.target.valueAsNumber)} type="range" value={step} /></label>
        <div className="number-sequence">{result.trail.slice(0, step + 1).map((vertex) => LABELS[vertex]).join(' → ') || '尚未出发'}</div>
      </div>
      <GraphView activeEdges={step} edges={walkEdges} vertexCount={5} />
    </div>
  );
}

function CompareStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">两个名字相似的问题，要求走完的对象不同。</p>
      <div className="status-card-grid"><article><span className="status-proven">线性时间可构造</span><h4>欧拉路线</h4><p>每条边恰好一次；连通性和奇度数给出完整判据，Hierholzer 算法可在 O(V+E) 时间完成。</p></article><article><span className="status-open">一般情形 NP-complete</span><h4>哈密顿路径</h4><p>每个顶点恰好一次；目前没有已知的通用多项式时间算法，“一定不存在”则会错误地预设 P≠NP。</p></article></div>
      <aside className="correction-note"><strong>旧版纠错：</strong>只数奇度顶点还不够；两个彼此分离的偶度环各自全偶，但整张图没有一条路线能覆盖两部分。</aside>
    </div>
  );
}

export const EULER_TRAIL_EXPERIMENT: NativeExperiment = {
  id: 'GR01',
  stages: [
    { emoji: '🌉', title: '七桥为什么不能一笔走完', shortLabel: '七桥', Component: BridgesStage },
    { emoji: '⚖️', title: '连通性加奇度数的完整判据', shortLabel: '判据', Component: CriterionStage },
    { emoji: '🧩', title: '加边并观察奇偶变化', shortLabel: '搭图', Component: BuilderStage },
    { emoji: '🧵', title: '构造一条欧拉回路', shortLabel: '构造', Component: ConstructStage },
    { emoji: '🔀', title: '欧拉路线与哈密顿路径', shortLabel: '比较', Component: CompareStage }
  ]
};

export default function EulerTrailExperiment() {
  return <StageShell experimentId={EULER_TRAIL_EXPERIMENT.id} stages={EULER_TRAIL_EXPERIMENT.stages} />;
}
