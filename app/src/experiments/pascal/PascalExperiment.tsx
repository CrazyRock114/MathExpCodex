import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { binomialCoefficient, fibonacciNumbers, oddPascalEntryCount, pascalRows } from '../math';
import type { NativeExperiment } from '../types';

function TriangleStage() {
  const [lastRow, setLastRow] = useState(7);
  const rows = pascalRows(lastRow);
  return <div className="experiment-stack">
    <p className="stage-lead">把顶行编号为第 0 行。两侧补作 0 后，每个数都是左上与右上之和，因此第 n 行第 k 项是 C(n,k)。</p>
    <label className="control-label">画到第 {lastRow} 行<input min="1" max="14" type="range" value={lastRow} onChange={(event) => setLastRow(event.target.valueAsNumber)} /></label>
    <div className="pascal-triangle" role="list" aria-label={`杨辉三角第 0 到 ${lastRow} 行`} tabIndex={0}>{rows.map((row, index) => <div key={index} role="listitem" aria-label={`第 ${index} 行：${row.join('、')}`}>{row.map((value, column) => <span key={column}>{value.toString()}</span>)}</div>)}</div>
    <aside className="evidence-note">“第几行”有两种常见编号约定。本实验固定从 0 开始，避免把 1,4,6,4,1 误叫成不同的行。</aside>
  </div>;
}

function CombinationStage() {
  const [n, setN] = useState(8);
  const [k, setK] = useState(3);
  const safeK = Math.min(k, n);
  const row = pascalRows(n)[n]!;
  const sum = row.reduce((total, value) => total + value, 0n);
  return <div className="experiment-stack">
    <p className="stage-lead">C(n,k) 既是从 n 个不同物品中选 k 个的方法数，也是 (x+y)ⁿ 中 xⁿ⁻ᵏyᵏ 的系数。</p>
    <div className="edge-builder"><label>n：{n}<input min="1" max="25" type="range" value={n} onChange={(event) => { const next = event.target.valueAsNumber; setN(next); setK((current) => Math.min(current, next)); }} /></label><label>k：{safeK}<input min="0" max={n} type="range" value={safeK} onChange={(event) => setK(event.target.valueAsNumber)} /></label></div>
    <div className="metric-grid"><div><span>C({n},{safeK})</span><strong>{binomialCoefficient(n, safeK).toString()}</strong></div><div><span>对称项 C({n},{n - safeK})</span><strong>{binomialCoefficient(n, n - safeK).toString()}</strong></div><div><span>本行总和</span><strong>{sum.toString()} = 2^{n}</strong></div></div>
  </div>;
}

function ParityStage() {
  const [lastRow, setLastRow] = useState(15);
  const rows = useMemo(() => pascalRows(lastRow), [lastRow]);
  return <div className="experiment-stack">
    <p className="stage-lead">只保留奇偶性：奇数涂深色，偶数留白，逐层出现谢尔宾斯基三角形的自相似图案。</p>
    <label className="control-label">画到第 {lastRow} 行<input min="3" max="31" type="range" value={lastRow} onChange={(event) => setLastRow(event.target.valueAsNumber)} /></label>
    <div className="pascal-parity" role="img" aria-label={`杨辉三角前 ${lastRow + 1} 行的奇偶图案`}>{rows.map((row, index) => <div key={index}>{row.map((value, column) => <i className={value % 2n ? 'odd' : ''} key={column} />)}</div>)}</div>
    <output className="result-good">第 {lastRow} 行有 {oddPascalEntryCount(lastRow)} 个奇数，因为 {lastRow} 的二进制 {lastRow.toString(2)} 含 {lastRow.toString(2).replaceAll('0', '').length} 个 1；正确公式是 2 的 popcount(n) 次方。</output>
    <aside className="correction-note"><strong>旧版纠错：</strong>奇数项个数不是“2 的 n 的二进制 1 的个数”，而是 2 的 popcount(n) 次方。</aside>
  </div>;
}

function IdentitiesStage() {
  const [n, setN] = useState(9);
  const row = pascalRows(n)[n]!;
  const diagonalTerms = Array.from({ length: Math.floor(n / 2) + 1 }, (_, k) => binomialCoefficient(n - k, k));
  const diagonalSum = diagonalTerms.reduce((total, value) => total + value, 0n);
  const fibonacci = fibonacciNumbers(n + 2)[n + 1]!;
  return <div className="experiment-stack">
    <p className="stage-lead">同一张数表能编码多个计数问题。移动 n，直接核对行和、对称性与浅对角线和。</p>
    <label className="control-label">n：{n}<input min="2" max="22" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label>
    <div className="formula-card"><b>Σ C(n,k) = 2ⁿ</b><span>{row.join(' + ')} = {2n ** BigInt(n)}</span></div>
    <div className="formula-card"><b>Σ C(n−k,k) = Fₙ₊₁</b><span>{diagonalTerms.join(' + ')} = {diagonalSum} = {fibonacci}</span></div>
    <aside className="evidence-note">这些数值核对帮助发现规律；一般性结论仍需要组合解释或代数证明。</aside>
  </div>;
}

function NamingStage() {
  const [view, setView] = useState<'china' | 'europe'>('china');
  return <div className="experiment-stack">
    <p className="stage-lead">同一结构在多个数学传统中独立发展，因此中文常称“杨辉三角”，英语常称 “Pascal’s triangle”。名称不是发现优先权的完整历史。</p>
    <div className="button-row"><button type="button" className={view === 'china' ? 'primary' : 'ghost'} onClick={() => setView('china')}>中国材料</button><button type="button" className={view === 'europe' ? 'primary' : 'ghost'} onClick={() => setView('europe')}>欧洲材料</button></div>
    {view === 'china' ? <div className="formula-card"><b>1261 年《详解九章算法》</b><span>杨辉著作保存了这一数表，并把方法归于更早的贾宪。这里不再写含义不清的“印度 200 年前”。</span></div> : <div className="formula-card"><b>17 世纪的 Pascal</b><span>Pascal 系统研究算术三角及其组合性质；DLMF 使用现代二项式系数记号统一表达。</span></div>}
    <aside className="evidence-note">数学事实与历史归属分开核验：前者由递推和组合解释支持，后者需要文献证据。</aside>
  </div>;
}

export const PASCAL_EXPERIMENT: NativeExperiment = { id: 'SQ07', stages: [
  { emoji: '🔺', title: '从相邻两数生成每一行', shortLabel: '生成', Component: TriangleStage },
  { emoji: '🧮', title: '二项式系数也是组合数', shortLabel: '组合', Component: CombinationStage },
  { emoji: '◩', title: '奇偶图案与正确计数公式', shortLabel: '奇偶', Component: ParityStage },
  { emoji: '🔬', title: '行和与浅对角线恒等式', shortLabel: '恒等式', Component: IdentitiesStage },
  { emoji: '📚', title: '杨辉三角与 Pascal 三角', shortLabel: '命名', Component: NamingStage }
] };

export default function PascalExperiment() { return <StageShell experimentId={PASCAL_EXPERIMENT.id} stages={PASCAL_EXPERIMENT.stages} />; }
