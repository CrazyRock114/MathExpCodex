import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { binarySearchTrace, binarySearchWorstCaseComparisons } from '../math';
import type { NativeExperiment } from '../types';

const VALUES = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];

function TraceList({ target, visibleSteps }: { target: number; visibleSteps?: number }) {
  const result = binarySearchTrace(VALUES, target);
  const steps = visibleSteps === undefined ? result.steps : result.steps.slice(0, visibleSteps);
  const current = steps.at(-1);
  return <><div className="binary-array" role="img" aria-label={`在有序数组中查找 ${target}`}>{VALUES.map((value, index) => <span className={index === current?.middle ? 'middle' : index >= (current?.low ?? 0) && index <= (current?.high ?? VALUES.length - 1) ? 'active' : 'discarded'} key={value}>{value}</span>)}</div><ol className="search-trace">{steps.map((step, index) => <li key={index}><b>第 {index + 1} 次</b><span>[{step.low}, {step.high}] → 中点 {step.middle}，值 {step.value}</span></li>)}</ol></>;
}

function ConceptStage() {
  const [target, setTarget] = useState(21);
  const result = binarySearchTrace(VALUES, target);
  return <div className="experiment-stack">
    <p className="stage-lead">二分搜索的前提是数组已经按非降序排列。比较中点后，可以一次排除不可能包含目标的一半。</p>
    <label className="control-label">目标：{target}<input min="1" max="29" step="2" type="range" value={target} onChange={(event) => setTarget(event.target.valueAsNumber)} /></label>
    <TraceList target={target} />
    <output className="result-good">下标 {result.index}，共比较 {result.steps.length} 次。</output>
  </div>;
}

function StepStage() {
  const [target, setTarget] = useState(18);
  const trace = binarySearchTrace(VALUES, target);
  const [visible, setVisible] = useState(1);
  const shown = Math.min(visible, trace.steps.length);
  const complete = shown === trace.steps.length;
  return <div className="experiment-stack">
    <p className="stage-lead">目标不在数组中时，区间会继续缩小，直到 low &gt; high；“没找到”也是算法需要明确返回的结果。</p>
    <div className="button-row"><button className="ghost" onClick={() => { setTarget(18); setVisible(1); }} type="button">查 18（不存在）</button><button className="ghost" onClick={() => { setTarget(23); setVisible(1); }} type="button">查 23（存在）</button><button className="primary" disabled={complete} onClick={() => setVisible((count) => count + 1)} type="button">下一步</button></div>
    <TraceList target={target} visibleSteps={shown} />
    {complete && <output className={trace.index >= 0 ? 'result-good' : 'result-warning'}>{trace.index >= 0 ? `找到：下标 ${trace.index}` : '区间已空，返回 −1。'}</output>}
  </div>;
}

function ComplexityStage() {
  const [exponent, setExponent] = useState(6);
  const length = 10 ** exponent;
  const binary = binarySearchWorstCaseComparisons(length);
  return <div className="experiment-stack">
    <p className="stage-lead">对长度 n 的数组，这个实现最坏比较次数是 ⌈log₂(n+1)⌉；O(log n) 描述增长量级，不代表所有输入恰好比较 log₂n 次。</p>
    <label className="control-label">n = 10^{exponent} = {length.toLocaleString()}<input min="1" max="9" type="range" value={exponent} onChange={(event) => setExponent(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>二分最坏比较</span><strong>{binary}</strong></div><div><span>顺序最坏比较</span><strong>{length.toLocaleString()}</strong></div><div><span>比较次数比</span><strong>约 {(length / binary).toLocaleString(undefined, { maximumFractionDigits: 0 })}×</strong></div></div>
    <aside className="correction-note"><strong>旧版纠错：</strong>4 亿个元素最坏约 29 次比较，不是 32 次；2³² 约为 42.95 亿，也不是 4 亿。</aside>
  </div>;
}

function PreconditionsStage() {
  const [mode, setMode] = useState<'sorted' | 'unsorted' | 'duplicates'>('sorted');
  const values = mode === 'sorted' ? [1, 4, 7, 9, 12] : mode === 'unsorted' ? [9, 1, 12, 4, 7] : [1, 4, 4, 4, 9];
  let message = '';
  try {
    const result = binarySearchTrace(values, mode === 'duplicates' ? 4 : 7);
    message = mode === 'duplicates' ? `命中下标 ${result.index}；普通二分只保证找到某一个 4，不保证第一个。` : `命中下标 ${result.index}。`;
  } catch (error) { message = error instanceof Error ? error.message : '输入无效'; }
  return <div className="experiment-stack">
    <p className="stage-lead">“有序”不是性能建议，而是正确性前提。含重复值时还要先约定要任意一个、最左一个还是最右一个。</p>
    <div className="button-row"><button className={mode === 'sorted' ? 'primary' : 'ghost'} onClick={() => setMode('sorted')} type="button">有序唯一值</button><button className={mode === 'unsorted' ? 'primary' : 'ghost'} onClick={() => setMode('unsorted')} type="button">无序输入</button><button className={mode === 'duplicates' ? 'primary' : 'ghost'} onClick={() => setMode('duplicates')} type="button">有序重复值</button></div>
    <div className="binary-array">{values.map((value, index) => <span key={`${value}-${index}`}>{value}</span>)}</div>
    <output className={mode === 'unsorted' ? 'result-warning' : 'result-good'}>{message}</output>
  </div>;
}

function MidpointStage() {
  const [low, setLow] = useState(3_000_000_000);
  const high = low + 100;
  const unsafe = (low + high) >>> 1;
  const safe = low + Math.floor((high - low) / 2);
  return <div className="experiment-stack">
    <p className="stage-lead">JavaScript 的位运算会先把数字转换为 32 位整数，所以 `(low+high) &gt;&gt;&gt; 1` 只适合受限范围，不能作为通用“防溢出”写法。</p>
    <label className="control-label">low：{low.toLocaleString()}<input min={2_200_000_000} max={4_000_000_000} step={100_000_000} type="range" value={low} onChange={(event) => setLow(event.target.valueAsNumber)} /></label>
    <div className="formula-card"><b>位运算中点</b><span>({low.toLocaleString()} + {high.toLocaleString()}) &gt;&gt;&gt; 1 = {unsafe.toLocaleString()} ❌</span></div>
    <div className="formula-card"><b>差值中点</b><span>low + floor((high−low)/2) = {safe.toLocaleString()} ✓</span></div>
    <aside className="evidence-note">NIST 的算法词典同样推荐 low + (high−low)/2 来避免固定宽度整数中的求和溢出。</aside>
  </div>;
}

export const BINARY_SEARCH_EXPERIMENT: NativeExperiment = { id: 'AL07', stages: [
  { emoji: '🎯', title: '有序数组每次排除一半', shortLabel: '搜索', Component: ConceptStage },
  { emoji: '👣', title: '逐步走到命中或空区间', shortLabel: '单步', Component: StepStage },
  { emoji: '📈', title: '精确比较次数与 O(log n)', shortLabel: '复杂度', Component: ComplexityStage },
  { emoji: '⚠️', title: '有序前提与重复值语义', shortLabel: '前提', Component: PreconditionsStage },
  { emoji: '🧮', title: '中点写法也有边界', shortLabel: '中点', Component: MidpointStage }
] };

export default function BinarySearchExperiment() { return <StageShell experimentId={BINARY_SEARCH_EXPERIMENT.id} stages={BINARY_SEARCH_EXPERIMENT.stages} />; }
