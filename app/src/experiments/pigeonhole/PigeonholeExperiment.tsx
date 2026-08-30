import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { collisionProbability, pigeonholeLowerBound } from '../math';
import type { NativeExperiment } from '../types';

function Boxes({ counts }: { counts: readonly number[] }) {
  const maximum = Math.max(1, ...counts);
  return <div className="pigeon-boxes" role="img" aria-label={`各抽屉物品数：${counts.join('、')}`}>{counts.map((count, index) => <div key={index}><span style={{ height: `${Math.max(8, count / maximum * 100)}%` }}>{count}</span><b>抽屉 {index + 1}</b></div>)}</div>;
}

function BasicStage() {
  const [objects, setObjects] = useState(7);
  const boxes = 6;
  const counts = Array.from({ length: boxes }, (_, index) => Math.floor(objects / boxes) + (index < objects % boxes ? 1 : 0));
  return <div className="experiment-stack">
    <p className="stage-lead">把多于 n 个物品放进 n 个抽屉，不论怎么放，至少两个物品会落入同一抽屉。</p>
    <label className="control-label">物品数：{objects}<input min="1" max="18" type="range" value={objects} onChange={(event) => setObjects(event.target.valueAsNumber)} /></label>
    <Boxes counts={counts} />
    <output className={objects > boxes ? 'result-good' : 'result-warning'}>{objects > boxes ? `${objects} > ${boxes}，重复不可避免。` : `${objects} ≤ ${boxes}，仍可能每个抽屉至多放一个。`}</output>
  </div>;
}

function GeneralStage() {
  const [objects, setObjects] = useState(15);
  const [boxes, setBoxes] = useState(6);
  const lower = pigeonholeLowerBound(objects, boxes);
  const counts = Array.from({ length: boxes }, (_, index) => Math.floor(objects / boxes) + (index < objects % boxes ? 1 : 0));
  return <div className="experiment-stack">
    <p className="stage-lead">推广形式：m 个物品放入 n 个非空编号抽屉，至少一个抽屉含有 ⌈m/n⌉ 个物品。</p>
    <div className="edge-builder"><label>m：{objects}<input min="1" max="40" type="range" value={objects} onChange={(event) => setObjects(event.target.valueAsNumber)} /></label><label>n：{boxes}<input min="1" max="12" type="range" value={boxes} onChange={(event) => setBoxes(event.target.valueAsNumber)} /></label></div>
    <Boxes counts={counts} />
    <output className="result-good">⌈{objects}/{boxes}⌉ = {lower}，即使尽量均匀，也至少有一格达到 {lower}。</output>
  </div>;
}

function CollisionStage() {
  const [buckets, setBuckets] = useState(100);
  const [draws, setDraws] = useState(12);
  const safeDraws = Math.min(draws, buckets + 1);
  const probability = collisionProbability(safeDraws, buckets);
  return <div className="experiment-stack">
    <p className="stage-lead">鸽巢原理只在抽取数超过桶数时保证碰撞；在此之前，可以在“每次独立且各桶等可能”的模型下计算碰撞概率。</p>
    <div className="edge-builder"><label>桶数：{buckets}<input min="20" max="200" step="10" type="range" value={buckets} onChange={(event) => setBuckets(event.target.valueAsNumber)} /></label><label>键数：{safeDraws}<input min="2" max={Math.min(50, buckets + 1)} type="range" value={safeDraws} onChange={(event) => setDraws(event.target.valueAsNumber)} /></label></div>
    <div className="probability-meter"><i style={{ width: `${probability * 100}%` }} /><span>{(probability * 100).toFixed(2)}%</span></div>
    <output className="result-good">{buckets} 个桶、{safeDraws} 个独立均匀键：至少一次碰撞概率 {(probability * 100).toFixed(2)}%</output>
    <aside className="correction-note"><strong>旧版纠错：</strong>原模拟在一次循环里“检查一个随机桶、写入另一个随机桶”，统计对象不一致；这里直接用精确补事件公式。</aside>
  </div>;
}

function ApplicationsStage() {
  const [example, setExample] = useState<'month' | 'day'>('month');
  const data = example === 'month' ? { objects: 13, boxes: 12, unit: '月份', conclusion: '至少两人在同一个出生月' } : { objects: 367, boxes: 366, unit: '可能日期（含 2 月 29 日）', conclusion: '至少两人在同一个生日' };
  return <div className="experiment-stack">
    <p className="stage-lead">应用抽屉原理前，要先明确什么是物品、什么是抽屉。它给出确定性保证，不需要假设生日均匀分布。</p>
    <div className="button-row"><button className={example === 'month' ? 'primary' : 'ghost'} onClick={() => setExample('month')} type="button">13 人 / 12 月</button><button className={example === 'day' ? 'primary' : 'ghost'} onClick={() => setExample('day')} type="button">367 人 / 366 日</button></div>
    <div className="metric-grid"><div><span>物品</span><strong>{data.objects} 人</strong></div><div><span>抽屉</span><strong>{data.boxes} 个{data.unit}</strong></div><div><span>保证</span><strong>{data.conclusion}</strong></div></div>
    <aside className="evidence-note">这与“23 人同生日概率超过 50%”不是同一个结论：一个是 367 人时的必然保证，一个是特定概率模型下的过半概率。</aside>
  </div>;
}

function ProofStage() {
  const [objects, setObjects] = useState(22);
  const [boxes, setBoxes] = useState(7);
  const lower = pigeonholeLowerBound(objects, boxes);
  const assumedMaximum = lower - 1;
  const capacity = boxes * assumedMaximum;
  return <div className="experiment-stack">
    <p className="stage-lead">反证思路：假设每个抽屉都少于 ⌈m/n⌉ 个，那么所有抽屉合计最多能装多少？</p>
    <div className="edge-builder"><label>m：{objects}<input min="2" max="50" type="range" value={objects} onChange={(event) => setObjects(event.target.valueAsNumber)} /></label><label>n：{boxes}<input min="1" max="12" type="range" value={boxes} onChange={(event) => setBoxes(event.target.valueAsNumber)} /></label></div>
    <div className="formula-card"><b>假设每格至多 {assumedMaximum}</b><span>总容量至多 {boxes}×{assumedMaximum}={capacity}，但需要放入 {objects} 个物品。</span></div>
    <output className="result-good">{capacity < objects ? `${capacity} < ${objects}，假设矛盾，所以至少一格有 ${lower} 个。` : `这个参数正好整除；“少于 ${lower}”应理解为至多 ${assumedMaximum}，仍会导出矛盾。`}</output>
  </div>;
}

export const PIGEONHOLE_EXPERIMENT: NativeExperiment = { id: 'GR07', stages: [
  { emoji: '🕊️', title: '物品比抽屉多就必有重复', shortLabel: '基础', Component: BasicStage },
  { emoji: '🗄️', title: '推广到至少 ⌈m/n⌉ 个', shortLabel: '推广', Component: GeneralStage },
  { emoji: '💥', title: '概率碰撞不是确定性保证', shortLabel: '碰撞', Component: CollisionStage },
  { emoji: '🗓️', title: '先识别物品与抽屉', shortLabel: '应用', Component: ApplicationsStage },
  { emoji: '🔍', title: '用总容量导出矛盾', shortLabel: '证明', Component: ProofStage }
] };

export default function PigeonholeExperiment() { return <StageShell experimentId={PIGEONHOLE_EXPERIMENT.id} stages={PIGEONHOLE_EXPERIMENT.stages} />; }
