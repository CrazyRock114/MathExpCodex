import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { binomialDistribution, simulateBinomial } from '../math';
import type { NativeExperiment } from '../types';

function DistributionBars({ values, counts }: { values: readonly number[]; counts?: boolean }) {
  const maximum = Math.max(...values, 1e-12);
  return <div className="bar-list" aria-label={counts ? '模拟频数' : '二项分布概率'}>{values.map((value, index) => <div key={index}><span>{index} 次成功</span><i style={{ width: `${value / maximum * 100}%` }} /><b>{counts ? value.toString() : `${(value * 100).toFixed(1)}%`}</b></div>)}</div>;
}

function ConditionsStage() {
  return <div className="experiment-stack"><p className="stage-lead">X 统计 n 次试验中的成功次数。二项模型要求：次数固定、每次只有成功/失败、各次独立且成功概率 p 保持不变。</p><div className="formula-card"><b>P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ</b><span>C(n,k) 选择哪 k 次成功，后面的乘积给每一种结果序列的概率。</span></div><aside className="correction-note">抽取后不放回通常会改变下一次成功概率，不能未经说明就套用二项分布。</aside></div>;
}

function ShapeStage() {
  const [trials, setTrials] = useState(12);
  const [probability, setProbability] = useState(.5);
  const distribution = binomialDistribution(trials, probability);
  return <div className="experiment-stack"><p className="stage-lead">移动 n 和 p，观察对称、偏斜和峰值位置；所有柱子的概率总和应为 1。</p><div className="edge-builder"><label>n：{trials}<input min="2" max="30" type="range" value={trials} onChange={(event) => setTrials(event.target.valueAsNumber)} /></label><label>p：{probability.toFixed(2)}<input min=".05" max=".95" step=".05" type="range" value={probability} onChange={(event) => setProbability(event.target.valueAsNumber)} /></label></div><DistributionBars values={distribution} /><output className="result-good">概率和 {distribution.reduce((sum, value) => sum + value, 0).toFixed(12)}</output></div>;
}

function SimulationStage() {
  const trials = 10;
  const probability = .5;
  const [repetitions, setRepetitions] = useState(200);
  const [counts, setCounts] = useState(() => simulateBinomial(trials, probability, repetitions));
  const run = () => setCounts(simulateBinomial(trials, probability, repetitions));
  return <div className="experiment-stack"><p className="stage-lead">一次“重复”包含 10 次公平抛币，并记录正面次数。增加重复次数，频数形状通常更接近理论分布，但不会逐点单调靠近。</p><label className="control-label">重复组数：{repetitions}<input min="100" max="5000" step="100" type="range" value={repetitions} onChange={(event) => setRepetitions(event.target.valueAsNumber)} /></label><button className="primary" type="button" onClick={run}>重新模拟</button><DistributionBars values={counts} counts /><output className="result-neutral">当前共记录 {counts.reduce((sum, value) => sum + value, 0)} 组</output></div>;
}

function MomentsStage() {
  const [n, setN] = useState(20);
  const [p, setP] = useState(.3);
  const mean = n * p;
  const variance = n * p * (1 - p);
  return <div className="experiment-stack"><p className="stage-lead">成功次数可写成 n 个 0/1 指示变量之和。期望相加得 np；独立时方差相加得 np(1−p)。</p><div className="edge-builder"><label>n：{n}<input min="1" max="60" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label><label>p：{p.toFixed(2)}<input min=".05" max=".95" step=".05" type="range" value={p} onChange={(event) => setP(event.target.valueAsNumber)} /></label></div><div className="metric-grid"><div><span>均值 μ=np</span><strong>{mean.toFixed(2)}</strong></div><div><span>方差 σ²</span><strong>{variance.toFixed(2)}</strong></div><div><span>标准差 σ</span><strong>{Math.sqrt(variance).toFixed(2)}</strong></div></div></div>;
}

function ApproximationStage() {
  const [n, setN] = useState(30);
  const [p, setP] = useState(.2);
  const left = n * p;
  const right = n * (1 - p);
  return <div className="experiment-stack"><p className="stage-lead">“n 大就像正态”太含糊。常用经验检查会同时看 np 与 n(1−p) 是否足够大；p 很小而 np 保持适中时，泊松近似可能更合适。</p><div className="edge-builder"><label>n：{n}<input min="5" max="60" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label><label>p：{p.toFixed(2)}<input min=".02" max=".98" step=".02" type="range" value={p} onChange={(event) => setP(event.target.valueAsNumber)} /></label></div><div className="metric-grid"><div><span>np</span><strong>{left.toFixed(2)}</strong></div><div><span>n(1−p)</span><strong>{right.toFixed(2)}</strong></div><div><span>形状提示</span><strong>{Math.min(left, right) >= 10 ? '较接近钟形' : '可能明显偏斜'}</strong></div></div><aside className="evidence-note">经验阈值不是误差定理；实际近似质量还取决于所求概率、连续性修正和允许误差。</aside></div>;
}

export const BINOMIAL_EXPERIMENT: NativeExperiment = { id: 'PB03', stages: [
  { emoji: '🎯', title: '先检查二项模型四个条件', shortLabel: '条件', Component: ConditionsStage },
  { emoji: '📊', title: '改变 n 与 p 观察分布形状', shortLabel: '分布', Component: ShapeStage },
  { emoji: '🪙', title: '模拟频数与理论概率比较', shortLabel: '模拟', Component: SimulationStage },
  { emoji: '🧮', title: '均值、方差与标准差', shortLabel: '统计量', Component: MomentsStage },
  { emoji: '🔬', title: '正态与泊松近似的前提', shortLabel: '近似', Component: ApproximationStage }
] };

export default function BinomialExperiment() { return <StageShell experimentId={BINOMIAL_EXPERIMENT.id} stages={BINOMIAL_EXPERIMENT.stages} />; }
