import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { goldbachPartitions, primeSieve } from '../math';
import type { NativeExperiment } from '../types';

function PartitionStage() {
  const [value, setValue] = useState(100);
  const pairs = goldbachPartitions(value);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">每对只列一次，所以 3+97 与 97+3 不重复计数。选择一个偶数，逐项核对两个加数是否都是素数。</p>
      <div className="preset-row">{[20, 42, 100, 200].map((preset) => <button aria-pressed={value === preset} key={preset} onClick={() => setValue(preset)} type="button">{preset}</button>)}</div>
      <label className="control-label">偶数：{value}<input max="500" min="4" onChange={(event) => setValue(event.target.valueAsNumber + event.target.valueAsNumber % 2)} step="2" type="range" value={value} /></label>
      <div className="metric-grid"><div><span>不重复分拆数</span><strong>{pairs.length}</strong></div><div><span>最小左加数</span><strong>{pairs[0]?.[0] ?? '—'}</strong></div><div><span>最大左加数</span><strong>{pairs.at(-1)?.[0] ?? '—'}</strong></div></div>
      <ul className="number-pair-list" aria-label={`${value} 的素数分拆`}>{pairs.map(([left, right]) => <li key={left}>{left} + {right} = {value}</li>)}</ul>
      {value === 100 && <aside className="correction-note"><strong>旧版纠错：</strong>100 恰有 6 个不重复素数分拆，不是 8 个。</aside>}
    </div>
  );
}

function CountPlotStage() {
  const [limit, setLimit] = useState(200);
  const counts = useMemo(() => Array.from({ length: (limit - 2) / 2 }, (_, index) => {
    const even = 4 + index * 2;
    return { even, count: goldbachPartitions(even).length };
  }), [limit]);
  const maxCount = Math.max(...counts.map(({ count }) => count));
  const points = counts.map(({ even, count }) => `${30 + (even - 4) / (limit - 4) * 570},${220 - count / maxCount * 185}`).join(' ');
  const decreases = counts.slice(1).filter((point, index) => point.count < (counts[index]?.count ?? 0)).length;
  return (
    <div className="experiment-stack">
      <p className="stage-lead">分拆数大体会出现更高的峰值，但并不随偶数单调增加；局部下降很常见。</p>
      <div className="preset-row">{[100, 200, 500, 1_000].map((preset) => <button aria-pressed={limit === preset} key={preset} onClick={() => setLimit(preset)} type="button">到 {preset}</button>)}</div>
      <figure className="plot-card"><svg aria-label={`4 到 ${limit} 的哥德巴赫分拆数折线图`} className="responsive-plot" role="img" viewBox="0 0 630 250"><line className="plot-axis" x1="30" x2="600" y1="220" y2="220" /><polyline fill="none" points={points} stroke="#3157d5" strokeWidth="2" /><text x="30" y="242">4</text><text textAnchor="end" x="600" y="242">{limit}</text><text x="34" y="30">最多 {maxCount}</text></svg><figcaption>横轴是偶数，纵轴是不重复素数分拆数。</figcaption></figure>
      <div className="metric-grid"><div><span>检查的偶数</span><strong>{counts.length}</strong></div><div><span>相邻位置下降</span><strong>{decreases}</strong></div><div><span>零分拆</span><strong>{counts.filter(({ count }) => count === 0).length}</strong></div></div>
      <aside className="correction-note"><strong>旧版纠错：</strong>分拆数量不是简单的 N/log N，也不是单调增长；数论启发式还涉及约 N/log²N 的尺度和随 N 变化的局部因子，但启发式不是证明。</aside>
    </div>
  );
}

function PrimeTableStage() {
  const [value, setValue] = useState(50);
  const prime = useMemo(() => primeSieve(100), []);
  const partners = new Set(goldbachPartitions(value).flat());
  return (
    <div className="experiment-stack">
      <p className="stage-lead">固定偶数 N 后，从素数 p 出发检查 N−p。只有两者都是素数，才形成一组分拆。</p>
      <label className="control-label">N：{value}<input max="100" min="10" onChange={(event) => setValue(event.target.valueAsNumber + event.target.valueAsNumber % 2)} step="2" type="range" value={value} /></label>
      <div className="prime-grid" role="list" aria-label={`1 到 100 的数表，突出 ${value} 的素数分拆成员`}>
        {prime.slice(1).map((isPrime, index) => {
          const number = index + 1;
          return <span className={partners.has(number) ? 'partner' : isPrime ? 'prime' : ''} key={number} role="listitem">{number}</span>;
        })}
      </div>
      <p className="evidence-note">深色数字是素数；金色数字至少出现在一组 {value}=p+(N−p) 中。</p>
    </div>
  );
}

function StatusStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">“哥德巴赫猜想”常指两个不同但有关的问题，结论状态不能混在一起。</p>
      <div className="status-card-grid">
        <article><span className="status-open">尚未证明</span><h4>强（或二元）哥德巴赫猜想</h4><p>每个不小于 4 的偶数都是两个素数之和。</p></article>
        <article><span className="status-proven">已经证明</span><h4>弱（或三元）哥德巴赫猜想</h4><p>每个大于 5 的奇数都是三个奇素数之和；Helfgott 已给出证明。</p></article>
      </div>
      <aside className="evidence-note">针对强猜想，已有极大的有限范围计算验证，例如已发表的 4×10¹⁸ 范围；“检查到很大”依然不等于覆盖无限多个偶数。</aside>
    </div>
  );
}

function FiniteCheckStage() {
  const [limit, setLimit] = useState(1_000);
  const [result, setResult] = useState<{ readonly checked: number; readonly counterexample: number | null } | null>(null);
  function scan() {
    const prime = primeSieve(limit);
    let counterexample: number | null = null;
    for (let even = 4; even <= limit && counterexample === null; even += 2) {
      let found = false;
      for (let left = 2; left <= even / 2 && !found; left += 1) found = Boolean(prime[left] && prime[even - left]);
      if (!found) counterexample = even;
    }
    setResult({ checked: Math.floor((limit - 2) / 2), counterexample });
  }
  return (
    <div className="experiment-stack">
      <p className="stage-lead">自己运行一段可复现的有限检查。结果只能说明“这段范围内没找到反例”。</p>
      <label className="control-label">检查上限：{limit.toLocaleString('zh-CN')}<input max="10000" min="100" onChange={(event) => { setLimit(event.target.valueAsNumber); setResult(null); }} step="100" type="range" value={limit} /></label>
      <div className="preset-row"><button onClick={scan} type="button">开始有限检查</button></div>
      {result && <output className={result.counterexample === null ? 'result-good' : 'result-neutral'}>检查 {result.checked.toLocaleString('zh-CN')} 个偶数；{result.counterexample === null ? `4 到 ${limit.toLocaleString('zh-CN')} 未发现反例` : `发现反例 ${result.counterexample}`}</output>}
      <aside className="correction-note"><strong>推理边界：</strong>即使每台电脑都检查一段有限范围，仍不能自动推出“所有偶数”。证明必须给出适用于任意偶数的有限论证。</aside>
    </div>
  );
}

export const GOLDBACH_EXPERIMENT: NativeExperiment = {
  id: 'PR06',
  stages: [
    { emoji: '➕', title: '列出一个偶数的全部分拆', shortLabel: '分拆', Component: PartitionStage },
    { emoji: '📈', title: '分拆数量并不单调', shortLabel: '数量', Component: CountPlotStage },
    { emoji: '🔍', title: '在数表上找 p 与 N−p', shortLabel: '配对', Component: PrimeTableStage },
    { emoji: '📚', title: '强猜想仍开放，弱猜想已证明', shortLabel: '状态', Component: StatusStage },
    { emoji: '💻', title: '有限检查为什么不是证明', shortLabel: '验证', Component: FiniteCheckStage }
  ]
};

export default function GoldbachExperiment() {
  return <StageShell experimentId={GOLDBACH_EXPERIMENT.id} stages={GOLDBACH_EXPERIMENT.stages} />;
}
