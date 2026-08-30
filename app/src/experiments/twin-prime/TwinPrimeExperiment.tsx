import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { twinPrimePairs } from '../math';
import type { NativeExperiment } from '../types';

function PairList({ pairs }: { readonly pairs: readonly (readonly [number, number])[] }) {
  return <ul className="number-pair-list" aria-label="孪生素数对">{pairs.map(([left, right]) => <li key={left}>({left}, {right})</li>)}</ul>;
}

function DiscoverStage() {
  const [limit, setLimit] = useState(100);
  const pairs = twinPrimePairs(limit);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">一对素数相差 2，就叫孪生素数。3 和 5、5 和 7 共享数字 5，但仍是两对不同的孪生素数。</p>
      <label className="control-label">搜索上限：{limit}<input max="500" min="20" onChange={(event) => setLimit(event.target.valueAsNumber)} step="10" type="range" value={limit} /></label>
      <div className="metric-grid"><div><span>找到的对数</span><strong>{pairs.length}</strong></div><div><span>最后一对</span><strong>{pairs.at(-1)?.join('、') ?? '—'}</strong></div></div>
      <PairList pairs={pairs} />
    </div>
  );
}

const COUNT_LIMITS = [100, 1_000, 10_000] as const;
const COUNTS = COUNT_LIMITS.map((limit) => ({ limit, count: twinPrimePairs(limit).length }));

function CountStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">累计对数会继续增加，但任何有限上限都只给出有限证据。要证明猜想，必须证明无论上限多大，后面总还能找到新的一对。</p>
      <div className="metric-grid">{COUNTS.map(({ limit, count }) => <div key={limit}><span>不超过 {limit.toLocaleString('zh-CN')}</span><strong>{count} 对</strong></div>)}</div>
      <div className="bar-list" aria-label="不同上限内的孪生素数累计对数">{COUNTS.map(({ limit, count }) => <div key={limit}><span>{limit.toLocaleString('zh-CN')}</span><i style={{ width: `${count / COUNTS.at(-1)!.count * 100}%` }} /><b>{count}</b></div>)}</div>
      <aside className="correction-note"><strong>旧版纠错：</strong>不超过 10,000 的孪生素数有 205 对，不是 122 对。</aside>
    </div>
  );
}

function BoundedGapStage() {
  const milestones = [
    { bound: '70,000,000', label: 'Zhang 首次证明存在某个固定上界，并据此出现无穷多对有界间距素数。' },
    { bound: '4,680', label: 'Maynard–Tao 的新方法与早期改进把上界大幅降低。' },
    { bound: '600', label: 'Polymath 协作继续优化筛法与参数。' },
    { bound: '246', label: '公开论文给出的无条件上界；广义 Elliott–Halberstam 假设下可到 6。' }
  ] as const;
  return (
    <div className="experiment-stack">
      <p className="stage-lead">2013 年的突破证明：相邻素数间距会无穷多次地小于某个固定常数。之后上界被快速改进，但“246”仍不是“2”。</p>
      <ol className="bound-timeline">{milestones.map(({ bound, label }) => <li key={bound}><strong>≤ {bound}</strong><span>{label}</span></li>)}</ol>
      <aside className="correction-note"><strong>逻辑差别：</strong>“无穷多对间距 ≤246”允许间距是 4、6、10……；孪生素数猜想要求间距恰好是 2，所以仍未被证明。</aside>
    </div>
  );
}

function WindowStage() {
  const [start, setStart] = useState(1);
  const [width, setWidth] = useState(500);
  const allPairs = useMemo(() => twinPrimePairs(start + width), [start, width]);
  const pairs = allPairs.filter(([left, right]) => left >= start && right <= start + width);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">移动一个有限窗口，观察孪生素数出现得并不均匀：有时挤在一起，有时中间空一段。</p>
      <label className="control-label">窗口起点：{start.toLocaleString('zh-CN')}<input max="9500" min="1" onChange={(event) => setStart(event.target.valueAsNumber)} step="100" type="range" value={start} /></label>
      <label className="control-label">窗口宽度：{width}<input max="1000" min="100" onChange={(event) => setWidth(event.target.valueAsNumber)} step="100" type="range" value={width} /></label>
      <div className="metric-grid"><div><span>窗口</span><strong>{start}–{start + width}</strong></div><div><span>完整落入的对</span><strong>{pairs.length}</strong></div></div>
      {pairs.length ? <PairList pairs={pairs} /> : <p className="result-neutral">这个窗口没有完整的孪生素数对；移动窗口再试试。</p>}
    </div>
  );
}

function EvidenceStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">把三种陈述并排，检查它们各自能推出什么。</p>
      <div className="status-card-grid three-cards">
        <article><span className="status-proven">可直接计算</span><h4>有限范围计数</h4><p>例如不超过 10,000 有 205 对。它是精确事实，但只谈这个范围。</p></article>
        <article><span className="status-proven">已经证明</span><h4>有界素数间距</h4><p>存在无穷多对相邻素数，间距不超过 246。</p></article>
        <article><span className="status-open">仍是猜想</span><h4>孪生素数</h4><p>间距恰好为 2 的素数对有无穷多。</p></article>
      </div>
      <aside className="evidence-note">大量数据支持猜想，也能帮助发现模式；证明的任务是排除“从某个未知位置开始再也没有孪生素数”的可能性。</aside>
    </div>
  );
}

export const TWIN_PRIME_EXPERIMENT: NativeExperiment = {
  id: 'PR07',
  stages: [
    { emoji: '👯', title: '找出相差 2 的素数对', shortLabel: '发现', Component: DiscoverStage },
    { emoji: '🔢', title: '三个上限下的准确计数', shortLabel: '计数', Component: CountStage },
    { emoji: '📉', title: '从七千万到 246 的突破', shortLabel: '有界间距', Component: BoundedGapStage },
    { emoji: '🔭', title: '移动窗口观察疏密', shortLabel: '扫描', Component: WindowStage },
    { emoji: '🧠', title: '数据、定理与猜想', shortLabel: '证据', Component: EvidenceStage }
  ]
};

export default function TwinPrimeExperiment() {
  return <StageShell experimentId={TWIN_PRIME_EXPERIMENT.id} stages={TWIN_PRIME_EXPERIMENT.stages} />;
}
