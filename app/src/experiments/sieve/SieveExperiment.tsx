import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { primeCount, primeSieve, sieveTrace } from '../math';
import type { NativeExperiment } from '../types';

const KNOWN_COUNTS = [[10, 4], [100, 25], [1_000, 168], [1_000_000, 78_498], [1_000_000_000, 50_847_534]] as const;

function GridStage() {
  const [limit, setLimit] = useState(30);
  const primes = primeSieve(limit);
  return <div className="experiment-stack"><p className="stage-lead">先写出 2 到 N。保留最小未划掉的数 p，并划掉它的倍数；最后没被划掉的数就是素数。</p><label className="control-label">上限 N：{limit}<input min="10" max="100" step="10" type="range" value={limit} onChange={(event) => setLimit(event.target.valueAsNumber)} /></label><div className="prime-grid" role="img" aria-label={`2 到 ${limit} 中的素数以深色显示`}>{Array.from({ length: limit - 1 }, (_, index) => index + 2).map((value) => <span className={primes[value] ? 'prime' : ''} key={value}>{value}</span>)}</div><output className="result-good">不超过 {limit} 的素数有 {primeCount(limit)} 个</output></div>;
}

function TraceStage() {
  const limit = 50;
  const steps = sieveTrace(limit);
  const [step, setStep] = useState(0);
  const marked = new Set(steps.slice(0, step + 1).flatMap(({ newlyMarked }) => newlyMarked));
  const active = steps[step]!;
  return <div className="experiment-stack"><p className="stage-lead">轮到素数 p 时，可以从 p² 开始；更小的 p 的倍数已经含有更小素因子，早先就被划掉了。</p><label className="control-label">第 {step + 1} 轮：p={active.prime}<input min="0" max={steps.length - 1} type="range" value={step} onChange={(event) => setStep(event.target.valueAsNumber)} /></label><div className="prime-grid" role="img" aria-label={`筛到素数 ${active.prime} 后的结果`}>{Array.from({ length: limit - 1 }, (_, index) => index + 2).map((value) => <span className={!marked.has(value) ? 'prime' : ''} key={value}>{value}</span>)}</div><div className="formula-card"><b>从 {active.prime}²={active.prime ** 2} 开始</b><span>本轮新划掉：{active.newlyMarked.join('、') || '没有新数'}</span></div></div>;
}

function StopStage() {
  const [limit, setLimit] = useState(100);
  const root = Math.floor(Math.sqrt(limit));
  const steps = sieveTrace(limit);
  return <div className="experiment-stack"><p className="stage-lead">若合数 n=ab，那么至少一个因子不超过 √n。因此只需让筛选素数满足 p²≤N。</p><label className="control-label">N：{limit}<input min="20" max="400" step="10" type="range" value={limit} onChange={(event) => setLimit(event.target.valueAsNumber)} /></label><div className="metric-grid"><div><span>⌊√N⌋</span><strong>{root}</strong></div><div><span>实际筛选轮数</span><strong>{steps.length}</strong></div><div><span>最后筛选素数</span><strong>{steps.at(-1)?.prime}</strong></div></div><aside className="correction-note"><strong>旧版纠错：</strong>优化算法不从 2p 开始重复划线，也不会在 p²&gt;N 后继续筛 11、13……。</aside></div>;
}

function CountStage() {
  const [power, setPower] = useState(4);
  const limit = 10 ** power;
  const count = useMemo(() => primeCount(limit), [limit]);
  const approximation = limit / Math.log(limit);
  return <div className="experiment-stack"><p className="stage-lead">π(N) 表示不超过 N 的素数个数。N/ln N 描述长期增长趋势，但在有限 N 上不是精确答案。</p><label className="control-label">N=10^{power}<input min="2" max="6" type="range" value={power} onChange={(event) => setPower(event.target.valueAsNumber)} /></label><div className="metric-grid"><div><span>精确筛法 π(N)</span><strong>{count.toLocaleString()}</strong></div><div><span>N/ln N</span><strong>{Math.round(approximation).toLocaleString()}</strong></div><div><span>相对差</span><strong>{(Math.abs(count - approximation) / count * 100).toFixed(1)}%</strong></div></div></div>;
}

function ComplexityStage() {
  return <div className="experiment-stack"><p className="stage-lead">普通布尔数组实现通常使用 O(N) 空间，时间复杂度为 O(N log log N)；更大范围常用分段筛来降低工作内存。</p><div className="table-scroll"><table><caption>已核验的 π(10ᵏ) 数值</caption><thead><tr><th>N</th><th>素数个数</th></tr></thead><tbody>{KNOWN_COUNTS.map(([limit, count]) => <tr key={limit}><td>{limit.toLocaleString()}</td><td>{count.toLocaleString()}</td></tr>)}</tbody></table></div><aside className="correction-note"><strong>旧版纠错：</strong>10⁹ 以内有 50,847,534 个素数，不是 50,847,478；删除“约两百万次操作”“快 5000 倍”等缺少实现与测量条件的说法。</aside><aside className="evidence-note">线性筛是另一种 O(N) 算法，但是否更合适取决于常数、内存、是否需要最小素因子及范围，不等于“数越大必然越好”。</aside></div>;
}

export const SIEVE_EXPERIMENT: NativeExperiment = { id: 'AL10', stages: [
  { emoji: '🔢', title: '从 2 到 N 划掉合数', shortLabel: '筛选', Component: GridStage },
  { emoji: '✏️', title: '每一轮从 p² 开始', shortLabel: '步骤', Component: TraceStage },
  { emoji: '🛑', title: '超过 √N 就可以停止', shortLabel: '停止', Component: StopStage },
  { emoji: '📈', title: '比较精确计数与渐近趋势', shortLabel: '计数', Component: CountStage },
  { emoji: '💾', title: '复杂度取决于实现与范围', shortLabel: '复杂度', Component: ComplexityStage }
] };

export default function SieveExperiment() { return <StageShell experimentId={SIEVE_EXPERIMENT.id} stages={SIEVE_EXPERIMENT.stages} />; }
