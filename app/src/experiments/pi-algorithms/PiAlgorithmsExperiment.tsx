import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { archimedesPiBounds, chudnovskyPi, leibnizPi, machinPi } from '../math';
import type { NativeExperiment } from '../types';

function scientific(value: number) {
  return value === 0 ? '< 5×10⁻¹⁶' : value.toExponential(3);
}

function polygonPoints(sides: number, radius: number) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = index * 2 * Math.PI / sides - Math.PI / 2;
    return `${150 + radius * Math.cos(angle)},${150 + radius * Math.sin(angle)}`;
  }).join(' ');
}

function PolygonStage() {
  const [sides, setSides] = useState(6);
  const bounds = archimedesPiBounds(sides);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">单位圆的半周长是 π。内接正多边形的半周长偏小，外切正多边形的半周长偏大，于是把 π 夹在两者之间。</p>
        <div className="preset-row">{[6, 12, 24, 48, 96].map((value) => <button aria-pressed={sides === value} key={value} onClick={() => setSides(value)} type="button">{value} 边</button>)}</div>
        <div className="formula-card"><span>{bounds.lower.toFixed(8)} &lt; π &lt; {bounds.upper.toFixed(8)}</span><b>区间宽度 {scientific(bounds.upper - bounds.lower)}</b></div>
        {sides === 96 && <aside className="evidence-note">96 边时得到 {bounds.lower.toFixed(6)} &lt; π &lt; {bounds.upper.toFixed(6)}。现代正弦、正切计算让这里能直接显示更精细的界；阿基米德原始论证使用几何不等式与分数界。</aside>}
      </div>
      <svg aria-label={`圆的 ${sides} 边内接和外切正多边形`} className="polygon-svg" role="img" viewBox="0 0 300 300"><polygon className="outer" points={polygonPoints(sides, 112 / Math.cos(Math.PI / sides))} /><circle cx="150" cy="150" r="112" /><polygon className="inner" points={polygonPoints(sides, 112)} /></svg>
    </div>
  );
}

function LeibnizStage() {
  const [terms, setTerms] = useState(10);
  const estimate = useMemo(() => leibnizPi(terms), [terms]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">π/4 = 1−1/3+1/5−1/7+⋯。公式很短，却收敛得极慢；多算十倍，误差大约才缩小十倍。</p>
      <div className="preset-row">{[10, 100, 1_000, 100_000].map((value) => <button aria-pressed={terms === value} key={value} onClick={() => setTerms(value)} type="button">{value.toLocaleString('zh-CN')} 项</button>)}</div>
      <div className="metric-grid"><div><span>π 估值</span><strong>{estimate.toFixed(10)}</strong></div><div><span>绝对误差</span><strong>{scientific(Math.abs(estimate - Math.PI))}</strong></div><div><span>最后一项量级</span><strong>{scientific(4 / (2 * terms - 1))}</strong></div></div>
      <aside className="evidence-note">交错级数的误差不超过下一项的绝对值；这给出可证明的误差上界，而不只是“看起来接近”。</aside>
    </div>
  );
}

function MachinStage() {
  const [terms, setTerms] = useState(1);
  const estimate = machinPi(terms);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">马钦公式 π = 16 arctan(1/5) − 4 arctan(1/239)。把 arctan 展成级数后，幂次很快变小，因此比直接用 arctan(1) 的莱布尼茨级数快得多。</p>
      <label className="control-label">每个 arctan 使用项数：{terms}<input max="10" min="1" onChange={(event) => setTerms(event.target.valueAsNumber)} type="range" value={terms} /></label>
      <div className="metric-grid"><div><span>π 估值</span><strong>{estimate.toFixed(14)}</strong></div><div><span>绝对误差</span><strong>{scientific(Math.abs(estimate - Math.PI))}</strong></div></div>
      <div className="bar-list" aria-label="莱布尼茨与马钦公式误差比较"><div><span>莱布尼茨 {terms} 项</span><i style={{ width: `${Math.min(100, Math.abs(leibnizPi(terms) - Math.PI) * 100)}%` }} /><b>{scientific(Math.abs(leibnizPi(terms) - Math.PI))}</b></div><div><span>马钦 {terms} 项</span><i style={{ width: `${Math.max(1, Math.min(100, Math.abs(estimate - Math.PI) * 100))}%` }} /><b>{scientific(Math.abs(estimate - Math.PI))}</b></div></div>
    </div>
  );
}

function ChudnovskyStage() {
  const [terms, setTerms] = useState(1);
  const estimate = chudnovskyPi(terms);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">丘德诺夫斯基公式每增加一项，理论上大约可增加 14 位十进制精度，是高精度计算 π 的核心方法之一。</p>
      <div className="preset-row">{[1, 2, 3].map((value) => <button aria-pressed={terms === value} key={value} onClick={() => setTerms(value)} type="button">{value} 项</button>)}</div>
      <div className="formula-card"><b>{estimate.toPrecision(16)}</b><span>浏览器与 Math.PI 的差：{scientific(Math.abs(estimate - Math.PI))}</span></div>
      <aside className="correction-note"><strong>数值精度边界：</strong>这里使用 JavaScript 的 64 位浮点数，通常只能可靠保留约 15–16 位有效数字。第 2 项后显示不再改善，不代表公式停止收敛；真正的高精度实现要使用任意精度整数或浮点数。</aside>
    </div>
  );
}

function ComparisonStage() {
  const rows = [
    { method: '正多边形夹逼', effort: '96 边', estimate: (archimedesPiBounds(96).lower + archimedesPiBounds(96).upper) / 2, note: '给出上下界' },
    { method: '莱布尼茨级数', effort: '100,000 项', estimate: leibnizPi(100_000), note: '慢但直观' },
    { method: '马钦公式', effort: '10+10 项', estimate: machinPi(10), note: '快速的反正切组合' },
    { method: '丘德诺夫斯基', effort: '2 项', estimate: chudnovskyPi(2), note: '已撞到本页浮点上限' }
  ] as const;
  return (
    <div className="experiment-stack">
      <p className="stage-lead">比较算法时要同时看计算量、误差、是否给出严格上下界，以及当前数值类型能表示多少位。</p>
      <div className="table-scroll"><table><caption>同一浏览器中的示例比较</caption><thead><tr><th>方法</th><th>工作量</th><th>绝对误差</th><th>特点</th></tr></thead><tbody>{rows.map((row) => <tr key={row.method}><td>{row.method}</td><td>{row.effort}</td><td>{scientific(Math.abs(row.estimate - Math.PI))}</td><td>{row.note}</td></tr>)}</tbody></table></div>
      <div className="rule-grid"><div><b>几何</b><span>看得见，而且能夹出严格区间。</span></div><div><b>级数</b><span>同一目标可有截然不同的收敛速度。</span></div><div><b>实现</b><span>理论公式再快，也受所用数字表示限制。</span></div></div>
    </div>
  );
}

export const PI_ALGORITHMS_EXPERIMENT: NativeExperiment = {
  id: 'PR08',
  stages: [
    { emoji: '⬡', title: '用正多边形把 π 夹住', shortLabel: '多边形', Component: PolygonStage },
    { emoji: '🐢', title: '简洁却缓慢的莱布尼茨级数', shortLabel: '莱布尼茨', Component: LeibnizStage },
    { emoji: '⚙️', title: '马钦公式为什么更快', shortLabel: '马钦', Component: MachinStage },
    { emoji: '🚀', title: '丘德诺夫斯基公式与精度墙', shortLabel: '丘德诺夫斯基', Component: ChudnovskyStage },
    { emoji: '📊', title: '公平比较四种方法', shortLabel: '比较', Component: ComparisonStage }
  ]
};

export default function PiAlgorithmsExperiment() {
  return <StageShell experimentId={PI_ALGORITHMS_EXPERIMENT.id} stages={PI_ALGORITHMS_EXPERIMENT.stages} />;
}
