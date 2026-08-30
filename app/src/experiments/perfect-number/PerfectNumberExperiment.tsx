import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { classifyByProperDivisorSum, euclidEulerCandidate, perfectNumbersThrough, properDivisors } from '../math';
import type { NativeExperiment } from '../types';

const CLASSIFICATION_LABELS = { deficient: '亏数', perfect: '完全数', abundant: '盈数' } as const;
const EXPONENTS = [2, 3, 5, 7, 11, 13] as const;

function DivisorStage() {
  const [value, setValue] = useState(28);
  const divisors = properDivisors(value);
  const sum = divisors.reduce((total, divisor) => total + divisor, 0);
  const classification = classifyByProperDivisorSum(value);
  return <div className="experiment-stack"><p className="stage-lead">一个正整数若恰好等于全部真因数（小于它的正因数）之和，就叫完全数。</p><label className="control-label">待检验数：{value}<input min="2" max="200" type="range" value={value} onChange={(event) => setValue(event.target.valueAsNumber)} /></label><ul className="number-pair-list" aria-label={`${value} 的真因数`}>{divisors.map((divisor) => <li key={divisor}>{divisor}</li>)}</ul><output className={classification === 'perfect' ? 'result-good' : 'result-neutral'}>{divisors.join(' + ')} = {sum}，所以 {value} 是{CLASSIFICATION_LABELS[classification]}</output></div>;
}

function SearchStage() {
  const [limit, setLimit] = useState(1_000);
  const values = useMemo(() => perfectNumbersThrough(limit), [limit]);
  return <div className="experiment-stack"><p className="stage-lead">给每个倍数累加它的真因数，可以一次扫描一段范围。搜索结果只证明这段有限范围内的结论。</p><div className="button-row">{[100, 1_000, 10_000].map((choice) => <button className={limit === choice ? 'primary' : 'ghost'} key={choice} onClick={() => setLimit(choice)} type="button">到 {choice.toLocaleString()}</button>)}</div><ul className="number-pair-list" aria-label={`${limit} 以内的完全数`}>{values.map((item) => <li key={item}>{item.toLocaleString()}</li>)}</ul><output className="result-good">1 到 {limit.toLocaleString()} 共有 {values.length} 个：{values.join('、')}</output><aside className="correction-note"><strong>旧版纠错：</strong>1 到 1,000 只有 6、28、496 三个完全数；第四个 8,128 要把上限扩大到 10,000 才会出现。</aside></div>;
}

function ConstructionStage() {
  const [exponent, setExponent] = useState(5);
  const result = euclidEulerCandidate(exponent);
  return <div className="experiment-stack"><p className="stage-lead">先算梅森数 Mₚ=2ᵖ−1。只有当 Mₚ 是素数时，2ᵖ⁻¹Mₚ 才由欧几里得构造成为完全数。</p><div className="button-row">{EXPONENTS.map((choice) => <button className={exponent === choice ? 'primary' : 'ghost'} key={choice} onClick={() => setExponent(choice)} type="button">p={choice}</button>)}</div><div className="metric-grid"><div><span>Mₚ</span><strong>{result.mersenne.toString()}</strong></div><div><span>是否为素数</span><strong>{result.mersenneIsPrime ? '是' : '否'}</strong></div><div><span>乘积候选</span><strong>{result.perfectCandidate.toLocaleString()}</strong></div></div><output className={result.mersenneIsPrime ? 'result-good' : 'result-neutral'}>{result.mersenneIsPrime ? `${result.perfectCandidate.toLocaleString()} 是偶完全数` : `${result.mersenne}=${exponent === 11 ? '23×89' : '合数'}，乘积不是完全数`}</output><aside className="evidence-note">若 2ᵖ−1 是素数，则 p 必须是素数；反过来不成立，例如 p=11 是素数，但 2¹¹−1=2047=23×89。</aside></div>;
}

function TheoremStage() {
  return <div className="experiment-stack"><p className="stage-lead">“欧几里得—欧拉定理”包含两个方向，历史贡献不能混成一句。</p><ol className="proof-steps"><li className="revealed"><b>1</b><span><strong>欧几里得：</strong>若 2ᵖ−1 是素数，则 2ᵖ⁻¹(2ᵖ−1) 是完全数。</span></li><li className="revealed"><b>2</b><span><strong>欧拉：</strong>每一个偶完全数都必须具有这个形式。</span></li><li className="revealed"><b>3</b><span>因此，寻找<strong>偶</strong>完全数等价于寻找梅森素数；这并没有解决奇完全数是否存在。</span></li></ol><aside className="correction-note"><strong>旧版纠错：</strong>不能说“欧几里得发现了所有偶完全数”；构造方向属于欧几里得，穷尽性方向由欧拉证明。</aside></div>;
}

function FrontierStage() {
  return <div className="experiment-stack"><p className="stage-lead">完全数问题仍有两条不同的开放前沿：梅森素数是否有无穷多个，以及奇完全数是否存在。</p><div className="status-card-grid"><article><span className="status-proven">当前记录 · 2026-08-30 核验</span><h4>52 个已知梅森素数</h4><p>GIMPS 列表最新一项是 2¹³⁶²⁷⁹⁸⁴¹−1，含 41,024,320 位，发现于 2024 年。</p></article><article><span className="status-open">仍未解决</span><h4>奇完全数是否存在</h4><p>若存在，它必须大于 10¹⁵⁰⁰；这是数学下界定理，不是把此前每个奇数逐个暴力测试。</p></article></div><aside className="correction-note"><strong>旧版纠错：</strong>删除“已知 51 个、最大约 5,000 万位”和“超级计算机检查到 10¹⁵⁰⁰”等过时或误述内容，也不替数学界声称多数人相信哪一种答案。</aside><aside className="evidence-note">已知数量会随新发现改变，所以这里同时标注来源和核验日期；开放问题的状态不能由有限搜索替代。</aside></div>;
}

export const PERFECT_NUMBER_EXPERIMENT: NativeExperiment = { id: 'NT01', stages: [
  { emoji: '➗', title: '把真因数全部加起来', shortLabel: '定义', Component: DivisorStage },
  { emoji: '🔎', title: '扫描有限范围里的完全数', shortLabel: '搜索', Component: SearchStage },
  { emoji: '🏭', title: '用梅森素数构造偶完全数', shortLabel: '构造', Component: ConstructionStage },
  { emoji: '📜', title: '分清欧几里得与欧拉的方向', shortLabel: '定理', Component: TheoremStage },
  { emoji: '🧭', title: '已知记录与未解问题', shortLabel: '前沿', Component: FrontierStage }
] };

export default function PerfectNumberExperiment() { return <StageShell experimentId={PERFECT_NUMBER_EXPERIMENT.id} stages={PERFECT_NUMBER_EXPERIMENT.stages} />; }
