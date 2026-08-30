import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { exactTravelingSalesmanTour, nearestNeighborTour, symmetricTourCount, type Point2D, type TourResult } from '../math';
import type { NativeExperiment } from '../types';

const POINTS: readonly Point2D[] = [{ x: 28, y: 38 }, { x: 205, y: 30 }, { x: 242, y: 128 }, { x: 172, y: 190 }, { x: 78, y: 172 }, { x: 112, y: 94 }, { x: 210, y: 78 }];

function TourMap({ points, tour, label }: { points: readonly Point2D[]; tour: TourResult; label: string }) {
  return <svg className="tsp-svg" viewBox="0 0 280 225" role="img" aria-label={`${label}，路线长度 ${tour.length.toFixed(2)}`}>
    <polyline points={tour.order.map((index) => `${points[index]!.x},${points[index]!.y}`).join(' ')} />
    {points.map((point, index) => <g key={index}><circle cx={point.x} cy={point.y} r="12" /><text x={point.x} y={point.y + 4}>{index + 1}</text></g>)}
  </svg>;
}

function ProblemStage() {
  const points = POINTS.slice(0, 5);
  const tour = nearestNeighborTour(points);
  return <div className="split-experiment"><div className="experiment-stack"><p className="stage-lead">旅行商问题要从起点出发，每座城市恰访问一次，最后回到起点，并让总路程最短。</p><div className="rule-grid"><div><b>输入</b><span>城市和两两距离</span></div><div><b>约束</b><span>每城一次并闭环</span></div><div><b>目标</b><span>总长度最小</span></div></div><aside className="evidence-note">图上的直线距离满足三角不等式，是欧几里得旅行商问题。</aside></div><TourMap points={points} tour={tour} label="一条可行闭合路线" /></div>;
}

function ExactStage() {
  const [cities, setCities] = useState(7);
  const points = POINTS.slice(0, cities);
  const exact = useMemo(() => exactTravelingSalesmanTour(points), [cities]);
  return <div className="experiment-stack"><p className="stage-lead">固定 1 号城为起点，枚举其余城市的排列，并把反向重复路线合并，就能在小规模上得到可核验的最优解。</p><label className="control-label">城市数：{cities}<input min="4" max="7" type="range" value={cities} onChange={(event) => setCities(event.target.valueAsNumber)} /></label><TourMap points={points} tour={exact} label="精确最短路线" /><output className="result-good">最短长度 {exact.length.toFixed(2)}；不同无向闭环候选 {symmetricTourCount(cities).toString()} 条</output></div>;
}

function GreedyStage() {
  const [cities, setCities] = useState(7);
  const points = POINTS.slice(0, cities);
  const exact = useMemo(() => exactTravelingSalesmanTour(points), [cities]);
  const greedy = useMemo(() => nearestNeighborTour(points), [cities]);
  return <div className="experiment-stack"><p className="stage-lead">最近邻每一步都去最近的未访问城市，速度快却只作启发式选择；局部最近不保证全局最短。</p><label className="control-label">城市数：{cities}<input min="4" max="7" type="range" value={cities} onChange={(event) => setCities(event.target.valueAsNumber)} /></label><div className="split-experiment"><TourMap points={points} tour={exact} label="精确路线" /><TourMap points={points} tour={greedy} label="最近邻路线" /></div><div className="metric-grid"><div><span>精确</span><strong>{exact.length.toFixed(2)}</strong></div><div><span>最近邻</span><strong>{greedy.length.toFixed(2)}</strong></div><div><span>多走</span><strong>{((greedy.length / exact.length - 1) * 100).toFixed(1)}%</strong></div></div></div>;
}

function StartStage() {
  const [start, setStart] = useState(0);
  const tour = nearestNeighborTour(POINTS, start);
  const lengths = POINTS.map((_, index) => nearestNeighborTour(POINTS, index).length);
  return <div className="experiment-stack"><p className="stage-lead">同一组城市只改变最近邻的起点，就可能得到不同路线。这是启发式算法需要披露的选择依赖。</p><div className="button-row">{POINTS.map((_, index) => <button className={start === index ? 'primary' : 'ghost'} type="button" key={index} onClick={() => setStart(index)}>{index + 1} 号城</button>)}</div><TourMap points={POINTS} tour={tour} label={`从 ${start + 1} 号城开始的最近邻路线`} /><output className="result-neutral">七个起点所得长度范围：{Math.min(...lengths).toFixed(2)}–{Math.max(...lengths).toFixed(2)}</output></div>;
}

function GrowthStage() {
  return <div className="experiment-stack"><p className="stage-lead">精确暴力枚举的候选数按阶乘增长，所以本实验只对小图求全局最优；“跑得慢”与复杂度分类要分开表达。</p><div className="bar-list">{[4, 6, 8, 10, 12].map((cities) => { const count = symmetricTourCount(cities); return <div key={cities}><span>{cities} 城市</span><i style={{ width: `${Math.max(2, Math.log10(Number(count)) / 8 * 100)}%` }} /><b>{count.toString()} 条</b></div>; })}</div><aside className="correction-note"><strong>旧版纠错：</strong>对称距离下固定起点并合并反向路线，候选是 (n−1)!/2，不是含大量旋转、反向重复的 n!；最近邻也不是“快速近似最优”的保证。</aside></div>;
}

export const TSP_EXPERIMENT: NativeExperiment = { id: 'GR02', stages: [
  { emoji: '🗺️', title: '定义一条合法旅行路线', shortLabel: '问题', Component: ProblemStage },
  { emoji: '✅', title: '小规模穷举得到精确最优', shortLabel: '精确', Component: ExactStage },
  { emoji: '⚡', title: '最近邻不保证全局最短', shortLabel: '贪心', Component: GreedyStage },
  { emoji: '📍', title: '贪心结果依赖起点', shortLabel: '起点', Component: StartStage },
  { emoji: '📈', title: '候选路线按阶乘增长', shortLabel: '规模', Component: GrowthStage }
] };

export default function TspExperiment() { return <StageShell experimentId={TSP_EXPERIMENT.id} stages={TSP_EXPERIMENT.stages} />; }
