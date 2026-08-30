import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { fibonacciNumbers } from '../math';
import type { NativeExperiment } from '../types';

function SequenceStage() {
  const [count, setCount] = useState(12);
  const values = fibonacciNumbers(count);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">采用统一下标 F₀=0、F₁=1；从 F₂ 开始，每一项都等于前两项之和。</p>
      <label className="control-label">显示项数：{count}<input max="30" min="3" onChange={(event) => setCount(event.target.valueAsNumber)} type="range" value={count} /></label>
      <ol className="sequence-cards" start={0}>{values.map((value, index) => <li key={index}><span>F<sub>{index}</sub></span><strong>{value.toString()}</strong>{index >= 2 && <small>{values[index - 2]?.toString()} + {values[index - 1]?.toString()}</small>}</li>)}</ol>
      <aside className="evidence-note">不同教材有时从 1,1 开始编号。先声明 F₀、F₁，就能避免“第几项”与“数值多少”混淆。</aside>
    </div>
  );
}

function RabbitStage() {
  const [month, setMonth] = useState(1);
  const values = fibonacciNumbers(month + 2);
  const total = values[month + 1] ?? 1n;
  const newborn = values[Math.max(0, month - 1)] ?? 0n;
  return (
    <div className="experiment-stack">
      <p className="stage-lead">《计算之书》的兔子题是理想化计数模型：从一对兔子开始；成熟后每月生一对；兔子永不死亡。它不是现实种群预测。</p>
      <label className="control-label">经过月份：{month}<input max="12" min="0" onChange={(event) => setMonth(event.target.valueAsNumber)} type="range" value={month} /></label>
      <div className="metric-grid"><div><span>兔子对总数</span><strong>{total.toString()}</strong></div><div><span>本月新生对数</span><strong>{newborn.toString()}</strong></div><div><span>递推关系</span><strong>旧有 + 新生</strong></div></div>
      <div className="rabbit-field" aria-label={`第 ${month} 个月的 ${total} 对理想化兔子`} role="img">{Array.from({ length: Math.min(Number(total), 144) }, (_, index) => <span aria-hidden="true" key={index}>🐇</span>)}</div>
      <aside className="correction-note"><strong>旧版纠错：</strong>模型从一对兔子开始，不是“起始两对”；不同时间点计数会产生 1,1,2… 或 1,2,3… 的表面差异。</aside>
    </div>
  );
}

function tilings(length: number): readonly string[] {
  if (length === 0) return [''];
  const result: string[] = [];
  for (const rest of tilings(length - 1)) result.push(`S${rest}`);
  if (length >= 2) for (const rest of tilings(length - 2)) result.push(`D${rest}`);
  return result;
}

function TilingStage() {
  const [length, setLength] = useState(5);
  const patterns = useMemo(() => tilings(length), [length]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">用长度 1 的小方砖和长度 2 的多米诺铺满 1×n 长条。最后一块若是方砖，前面有 a(n−1) 种；若是多米诺，前面有 a(n−2) 种。</p>
      <label className="control-label">长条长度 n：{length}<input max="8" min="1" onChange={(event) => setLength(event.target.valueAsNumber)} type="range" value={length} /></label>
      <div className="tiling-list" aria-label={`长度 ${length} 的 ${patterns.length} 种铺法`} role="list" tabIndex={0}>{patterns.map((pattern, patternIndex) => <div key={`${pattern}-${patternIndex}`} role="listitem"><span className="visually-hidden">铺法 {patternIndex + 1}：{[...pattern].map((tile) => tile === 'D' ? '双格砖' : '单格砖').join('、')}</span>{[...pattern].map((tile, index) => <i className={tile === 'D' ? 'domino' : 'square'} key={index} />)}</div>)}</div>
      <output className="result-good">a({length}) = {patterns.length} = F<sub>{length + 1}</sub></output>
    </div>
  );
}

function IdentityStage() {
  const [index, setIndex] = useState(8);
  const values = fibonacciNumbers(index + 3);
  const left = values[index - 1]! * values[index + 1]! - values[index]! ** 2n;
  const sum = values.slice(1, index + 1).reduce((total, value) => total + value, 0n);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">用具体下标检验两个恒等式。计算实例不是一般证明，但能帮助发现符号与下标规律。</p>
      <label className="control-label">n：{index}<input max="25" min="2" onChange={(event) => setIndex(event.target.valueAsNumber)} type="range" value={index} /></label>
      <div className="formula-card"><b>Fₙ₋₁Fₙ₊₁ − Fₙ² = (−1)ⁿ</b><span>{values[index - 1]?.toString()}×{values[index + 1]?.toString()}−{values[index]?.toString()}² = {left.toString()}</span></div>
      <div className="formula-card"><b>F₁+⋯+Fₙ = Fₙ₊₂−1</b><span>{sum.toString()} = {values[index + 2]?.toString()}−1</span></div>
      <aside className="correction-note"><strong>旧版纠错：</strong>“Fₘ 整除 Fₙ 当且仅当 m 整除 n”若不加低索引条件会失败，例如 F₂=1 整除所有整数。这里不把缺少条件的版本当作定理。</aside>
    </div>
  );
}

function NatureStage() {
  const [points, setPoints] = useState(120);
  const seeds = Array.from({ length: points }, (_, index) => {
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const radius = 7.4 * Math.sqrt(index);
    return { x: 150 + radius * Math.cos(angle), y: 150 + radius * Math.sin(angle) };
  });
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">按约 137.5° 的黄金角依次放点，会形成两组可见螺旋。某些植物的螺旋数常接近相邻斐波那契数，但实际生长由局部生物机制决定，并非“万物都服从斐波那契”。</p>
        <label className="control-label">模拟种子数：{points}<input max="300" min="30" onChange={(event) => setPoints(event.target.valueAsNumber)} step="10" type="range" value={points} /></label>
        <ol className="history-timeline"><li><b>早于 1202</b><span>南亚韵律计数中已出现同一递推数列。</span></li><li><b>1202</b><span>Leonardo of Pisa 在《计算之书》中写下兔子问题。</span></li><li><b>现代</b><span>数列用于组合计数、算法分析与数学模型；具体模型需逐项验证。</span></li></ol>
      </div>
      <svg aria-label={`${points} 个按黄金角排列的模拟种子`} className="sunflower-svg" role="img" viewBox="0 0 300 300">{seeds.map(({ x, y }, index) => <circle cx={x} cy={y} fill={index % 2 ? '#e5a11a' : '#7b4ab1'} key={index} r="3.2" />)}</svg>
    </div>
  );
}

export const FIBONACCI_EXPERIMENT: NativeExperiment = {
  id: 'SQ01',
  stages: [
    { emoji: '🔁', title: '每项从前两项长出来', shortLabel: '递推', Component: SequenceStage },
    { emoji: '🐇', title: '兔子题是理想化计数模型', shortLabel: '兔子', Component: RabbitStage },
    { emoji: '🧱', title: '铺砖为什么也得到同一数列', shortLabel: '铺砖', Component: TilingStage },
    { emoji: '🧮', title: '用数值检验经典恒等式', shortLabel: '恒等式', Component: IdentityStage },
    { emoji: '🌻', title: '自然例子与模型边界', shortLabel: '自然', Component: NatureStage }
  ]
};

export default function FibonacciExperiment() {
  return <StageShell experimentId={FIBONACCI_EXPERIMENT.id} stages={FIBONACCI_EXPERIMENT.stages} />;
}
