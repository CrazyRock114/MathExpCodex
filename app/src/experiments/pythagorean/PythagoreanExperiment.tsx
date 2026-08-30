import { useId, useMemo, useState } from 'react';
import {
  createPythagoreanTriple,
  greatestCommonDivisor,
  primitiveTriplesThrough
} from '../math';
import type { NativeExperiment } from '../types';

const PRIMITIVE_TRIPLES = primitiveTriplesThrough(1_000);

function boundedInteger(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value || min)));
}

function DefinitionStage() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a * a + b * b);
  const isInteger = Number.isInteger(c);
  const scale = 145 / Math.max(a, b, c);
  const width = a * scale;
  const height = b * scale;
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">当三个正整数满足 a²+b²=c²，它们就是一组勾股数。改变两条直角边，检查斜边是否恰好为整数。</p>
        <label className="control-label">直角边 a：{a}
          <input max="50" min="1" onChange={(event) => setA(boundedInteger(event.target.valueAsNumber, 1, 50))} type="range" value={a} />
        </label>
        <label className="control-label">直角边 b：{b}
          <input max="50" min="1" onChange={(event) => setB(boundedInteger(event.target.valueAsNumber, 1, 50))} type="range" value={b} />
        </label>
        <div className="preset-row">
          {[[3, 4], [5, 12], [8, 15], [7, 24], [2, 3]].map(([nextA, nextB]) => (
            <button key={`${nextA}-${nextB}`} onClick={() => { setA(nextA ?? 1); setB(nextB ?? 1); }} type="button">({nextA},{nextB})</button>
          ))}
        </div>
      </div>
      <figure className="triangle-card">
        <svg aria-label={`直角边 ${a}、${b}，斜边 ${c.toFixed(3)} 的直角三角形`} role="img" viewBox="0 0 200 200">
          <polygon points={`24,176 ${24 + width},176 24,${176 - height}`} />
          <path d="M24 164 H36 V176" />
          <text x={24 + width / 2} y="194" textAnchor="middle">a={a}</text>
          <text x="8" y={176 - height / 2} dominantBaseline="middle">b={b}</text>
        </svg>
        <figcaption className={isInteger ? 'result-good' : 'result-neutral'}>
          {a}² + {b}² = {a * a + b * b}，c = {c.toFixed(isInteger ? 0 : 3)}；{isInteger ? '是勾股数' : '斜边不是整数'}
        </figcaption>
      </figure>
    </div>
  );
}

function FormulaStage() {
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);
  const triple = createPythagoreanTriple(m, n);
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">取整数 m&gt;n≥1，下面三个式子一定满足 a²+b²=c²；但还需要额外条件，才能保证得到本原勾股数。</p>
        <div className="formula-card"><b>a = m² − n²</b><b>b = 2mn</b><b>c = m² + n²</b></div>
        <label className="control-label">m：{m}
          <input max="30" min="2" onChange={(event) => { const next = boundedInteger(event.target.valueAsNumber, 2, 30); setM(next); setN((old) => Math.min(old, next - 1)); }} type="range" value={m} />
        </label>
        <label className="control-label">n：{n}
          <input max={m - 1} min="1" onChange={(event) => setN(boundedInteger(event.target.valueAsNumber, 1, m - 1))} type="range" value={n} />
        </label>
      </div>
      <div className="factory-output" aria-live="polite">
        <span>造出来</span>
        <strong>({triple.a}, {triple.b}, {triple.c})</strong>
        <p>{triple.a}² + {triple.b}² = {triple.c}² = {triple.c * triple.c}</p>
      </div>
    </div>
  );
}

const CONDITION_EXAMPLES = [[3, 2], [4, 2], [3, 1], [5, 3], [5, 4]] as const;

function PrimitiveStage() {
  const rows = CONDITION_EXAMPLES.map(([m, n]) => createPythagoreanTriple(m, n));
  return (
    <div className="experiment-stack">
      <p className="stage-lead">若 m、n 互素并且一奇一偶，公式给出本原勾股数；否则三边会有大于 1 的公因数。</p>
      <div className="table-scroll" tabIndex={0}>
        <table>
          <caption>参数条件与构造结果</caption>
          <thead><tr><th>m,n</th><th>gcd</th><th>一奇一偶</th><th>三元组</th><th>本原</th></tr></thead>
          <tbody>{rows.map((triple) => (
            <tr key={`${triple.m}-${triple.n}`}>
              <td>{triple.m}, {triple.n}</td>
              <td>{greatestCommonDivisor(triple.m, triple.n)}</td>
              <td>{(triple.m - triple.n) % 2 === 1 ? '是' : '否'}</td>
              <td>({triple.a}, {triple.b}, {triple.c})</td>
              <td>{triple.primitive ? '✓' : '—'}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <aside className="evidence-note">“互素 + 一奇一偶”是得到本原三元组的必要条件；交换 a、b 不会产生新的一组。</aside>
    </div>
  );
}

function SurveyStage() {
  const titleId = useId();
  const visible = PRIMITIVE_TRIPLES.slice(0, 30);
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">枚举所有满足条件的 m、n，并去掉 c&gt;1000 的结果，可以复现 158 这个精确计数。</p>
        <div className="factory-output compact"><span>本原勾股数</span><strong>158 组</strong><p>限定：斜边 c ≤ 1000</p></div>
        <ol className="triple-list">{visible.slice(0, 12).map((triple) => <li key={`${triple.a}-${triple.b}`}>({triple.a}, {triple.b}, {triple.c})</li>)}</ol>
      </div>
      <figure className="plot-card">
        <svg aria-labelledby={titleId} className="responsive-plot" role="img" viewBox="0 0 420 320">
          <title id={titleId}>斜边不超过 1000 的 158 组本原勾股数散点图</title>
          <line className="plot-axis" x1="35" x2="400" y1="285" y2="285" />
          <line className="plot-axis" x1="35" x2="35" y1="20" y2="285" />
          {PRIMITIVE_TRIPLES.map((triple) => <circle cx={35 + triple.a / 1_000 * 350} cy={285 - triple.b / 1_000 * 255} fill="#3157d5" key={`${triple.a}-${triple.b}`} r="3" />)}
          <text x="395" y="307" textAnchor="end">a</text><text x="43" y="35">b</text>
        </svg>
        <figcaption>每个点代表一组 (a,b,c)，这里统一令 a≤b。</figcaption>
      </figure>
    </div>
  );
}

function ChallengeStage() {
  const [targetIndex, setTargetIndex] = useState(42);
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);
  const [attempts, setAttempts] = useState(0);
  const target = PRIMITIVE_TRIPLES[targetIndex] ?? PRIMITIVE_TRIPLES[0]!;
  const guess = m > n ? createPythagoreanTriple(m, n) : null;
  const solved = guess?.a === target.a && guess.b === target.b && guess.c === target.c;
  function newTarget() {
    setTargetIndex(Math.floor(Math.random() * PRIMITIVE_TRIPLES.length));
    setAttempts(0);
  }
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">根据目标三元组反推 m、n。每次试验都会即时检查公式和本原条件。</p>
        <div className="target-card"><span>目标</span><strong>({target.a}, {target.b}, {target.c})</strong><small>提示：m+n = {target.m + target.n}</small></div>
        <button onClick={newTarget} type="button">换一题</button>
      </div>
      <div className="challenge-controls">
        <label className="control-label">m
          <input min="2" onChange={(event) => setM(boundedInteger(event.target.valueAsNumber, 2, 50))} type="number" value={m} />
        </label>
        <label className="control-label">n
          <input min="1" onChange={(event) => setN(boundedInteger(event.target.valueAsNumber, 1, 49))} type="number" value={n} />
        </label>
        <button disabled={!guess} onClick={() => setAttempts((count) => count + 1)} type="button">检查这组参数</button>
        <output className={solved ? 'result-good' : 'result-neutral'} aria-live="polite">
          {attempts === 0 ? '输入 m、n 后检查' : solved ? `答对了！共检查 ${attempts} 次。` : guess ? `得到 (${guess.a}, ${guess.b}, ${guess.c})，继续调整。` : '需要 m > n ≥ 1。'}
        </output>
      </div>
      <aside className="evidence-note full-span">158 个候选至少需要 ⌈log₂158⌉=8 位二进制信息才能区分；只有每个问题都接近对半分割时，8 个“是/否”答案才可能足够，并非任意 8 个问题都保证成功。</aside>
    </div>
  );
}

export const PYTHAGOREAN_EXPERIMENT: NativeExperiment = {
  id: 'PR03',
  stages: [
    { emoji: '📐', title: '什么是勾股数', shortLabel: '定义', Component: DefinitionStage },
    { emoji: '✨', title: '欧几里得参数公式', shortLabel: '公式', Component: FormulaStage },
    { emoji: '🔎', title: '什么时候是本原三元组', shortLabel: '本原', Component: PrimitiveStage },
    { emoji: '🔭', title: '数出 c≤1000 的全部结果', shortLabel: '枚举', Component: SurveyStage },
    { emoji: '🏭', title: '反推参数挑战', shortLabel: '挑战', Component: ChallengeStage }
  ]
};
