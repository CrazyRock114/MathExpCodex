import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { completeGraphEdges, countMonochromaticTriangles, ramseyAvoidingColoringCount } from '../math';
import type { NativeExperiment } from '../types';

type EdgeColor = 0 | 1 | null;
const EDGE_NAMES = ['红', '蓝'] as const;

function vertexPositions(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = index * 2 * Math.PI / count - Math.PI / 2;
    return [180 + 135 * Math.cos(angle), 155 + 125 * Math.sin(angle)] as const;
  });
}

function RamseyGraph({ vertexCount, colors, label }: { readonly vertexCount: number; readonly colors: readonly EdgeColor[]; readonly label: string }) {
  const edges = completeGraphEdges(vertexCount);
  const positions = vertexPositions(vertexCount);
  return (
    <svg aria-label={label} className="ramsey-svg" role="img" viewBox="0 0 360 310">
      {edges.map((edge, index) => <line className={colors[index] === 0 ? 'red' : colors[index] === 1 ? 'blue' : 'empty'} key={`${edge.left}-${edge.right}`} x1={positions[edge.left]?.[0]} x2={positions[edge.right]?.[0]} y1={positions[edge.left]?.[1]} y2={positions[edge.right]?.[1]} />)}
      {positions.map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r="22" /><text textAnchor="middle" x={x} y={y + 5}>{index + 1}</text></g>)}
    </svg>
  );
}

function PartyStage() {
  const edges = useMemo(() => completeGraphEdges(6), []);
  const [colors, setColors] = useState<readonly EdgeColor[]>(() => edges.map(() => null));
  const triangles = countMonochromaticTriangles(6, colors);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">六个人两两之间都有一种关系：红色表示认识，蓝色表示不认识。依次点击关系按钮，在“未定、红、蓝”之间切换。</p>
        <div className="edge-button-grid" role="group" aria-label="给十五条关系边染色">
          {edges.map((edge, index) => (
            <button
              className={colors[index] === 0 ? 'edge-red' : colors[index] === 1 ? 'edge-blue' : ''}
              key={`${edge.left}-${edge.right}`}
              onClick={() => setColors((current) => current.with(index, current[index] === null ? 0 : current[index] === 0 ? 1 : null))}
              type="button"
            >
              {edge.left + 1}–{edge.right + 1}：{colors[index] === null ? '未定' : EDGE_NAMES[colors[index]]}
            </button>
          ))}
        </div>
        <output className={triangles ? 'result-good' : 'result-neutral'}>当前单色三角形：{triangles} 个{colors.some((color) => color === null) ? '（还有边未染色）' : '。六个顶点全部染完时不可能为 0。'}</output>
      </div>
      <RamseyGraph colors={colors} label={`六人关系图，当前有 ${triangles} 个单色三角形`} vertexCount={6} />
    </div>
  );
}

function ProofStage() {
  const [step, setStep] = useState(0);
  const steps = [
    '任选一个人 V，他与另外 5 个人之间共有 5 条边。',
    '边只有红、蓝两色。由鸽巢原理，至少 3 条同色；不妨设 V–A、V–B、V–C 都是红色。',
    '检查 A、B、C 之间的三条边：若其中任一条为红，就和 V 组成红色三角形。',
    '若三条都不是红，它们便全是蓝，于是 A、B、C 本身组成蓝色三角形。'
  ] as const;
  return (
    <div className="experiment-stack">
      <p className="stage-lead">证明只需盯住一个顶点，再做一次两分法。</p>
      <ol className="proof-steps">
        {steps.map((text, index) => <li className={index <= step ? 'revealed' : ''} key={text}><b>{index + 1}</b><span>{index <= step ? text : '继续推理后显示'}</span></li>)}
      </ol>
      <div className="preset-row"><button disabled={step === 0} onClick={() => setStep((current) => current - 1)} type="button">上一步</button><button disabled={step === steps.length - 1} onClick={() => setStep((current) => current + 1)} type="button">下一步</button></div>
    </div>
  );
}

function FiveVertexStage() {
  const edges = useMemo(() => completeGraphEdges(5), []);
  const colors = edges.map(({ left, right }) => ((right - left === 1 || left === 0 && right === 4) ? 0 : 1) as 0 | 1);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">要证明 6 是“最小”的，还要展示五个人时可以避开单色三角形。把五边形外圈染红、五条对角线染蓝即可。</p>
        <div className="metric-grid"><div><span>顶点数</span><strong>5</strong></div><div><span>单色三角形</span><strong>{countMonochromaticTriangles(5, colors)}</strong></div></div>
        <aside className="evidence-note">所以五个人不一定出现目标三人组，而六个人一定出现，合起来才得到 R(3,3)=6。</aside>
      </div>
      <RamseyGraph colors={colors} label="五边形反例：红色外圈和蓝色对角线，没有单色三角形" vertexCount={5} />
    </div>
  );
}

const ENUMERATION = [3, 4, 5, 6].map((vertices) => ({ vertices, ...ramseyAvoidingColoringCount(vertices) }));

function EnumerationStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">把每一条边的红蓝选择全部枚举，精确统计“没有单色三角形”的染色。顶点增加时，这个比例快速下降，而不是上升。</p>
      <div className="table-scroll"><table><caption>完整枚举结果</caption><thead><tr><th>顶点</th><th>全部染色</th><th>可避开</th><th>比例</th></tr></thead><tbody>{ENUMERATION.map(({ vertices, total, avoiding }) => <tr key={vertices}><td>K<sub>{vertices}</sub></td><td>{total.toLocaleString('zh-CN')}</td><td>{avoiding.toLocaleString('zh-CN')}</td><td>{(avoiding / total * 100).toFixed(4)}%</td></tr>)}</tbody></table></div>
      <aside className="correction-note"><strong>旧版纠错：</strong>K₄ 有 18/64≈28.13% 的染色能避开，K₅ 只有 12/1024≈1.17%，K₆ 则是 0/32768。</aside>
    </div>
  );
}

function RandomStage() {
  const edges = useMemo(() => completeGraphEdges(6), []);
  const [counts, setCounts] = useState<readonly number[]>([]);
  function run() {
    setCounts(Array.from({ length: 1_000 }, () => countMonochromaticTriangles(6, edges.map(() => Math.random() < .5 ? 0 : 1))));
  }
  const distribution = Array.from(new Set(counts)).toSorted((left, right) => left - right).map((value) => [value, counts.filter((count) => count === value).length] as const);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">随机试验能帮助观察“常见情况”，但 R(3,3)=6 要求覆盖全部 32,768 种染色，不能只靠抽样。</p>
      <div className="preset-row"><button onClick={run} type="button">随机生成 1,000 个 K₆</button></div>
      {counts.length ? <><div className="metric-grid"><div><span>最少单色三角形</span><strong>{Math.min(...counts)}</strong></div><div><span>最多单色三角形</span><strong>{Math.max(...counts)}</strong></div><div><span>出现 0 个</span><strong>{counts.filter((count) => count === 0).length}</strong></div></div><div className="bar-list" aria-label="单色三角形数量分布">{distribution.map(([value, frequency]) => <div key={value}><span>{value} 个</span><i style={{ width: `${frequency / counts.length * 100}%` }} /><b>{frequency}</b></div>)}</div></> : <p className="evidence-note">运行后查看分布；无论随机得到哪一种完整染色，定理保证至少有一个单色三角形。</p>}
    </div>
  );
}

export const RAMSEY_EXPERIMENT: NativeExperiment = {
  id: 'PR05',
  stages: [
    { emoji: '🤝', title: '给六个人的关系染色', shortLabel: '聚会', Component: PartyStage },
    { emoji: '🕊️', title: '一个顶点加鸽巢原理', shortLabel: '证明', Component: ProofStage },
    { emoji: '5️⃣', title: '五个人为什么还不够', shortLabel: '最小性', Component: FiveVertexStage },
    { emoji: '🔢', title: '把所有染色完整枚举', shortLabel: '枚举', Component: EnumerationStage },
    { emoji: '🎲', title: '抽样与证明有什么不同', shortLabel: '随机', Component: RandomStage }
  ]
};

export default function RamseyExperiment() {
  return <StageShell experimentId={RAMSEY_EXPERIMENT.id} stages={RAMSEY_EXPERIMENT.stages} />;
}
