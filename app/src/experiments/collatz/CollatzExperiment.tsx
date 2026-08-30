import { useId, useMemo, useState } from 'react';
import { collatzSequence } from '../math';
import type { NativeExperiment } from '../types';

const COLORS = ['#3157d5', '#d1495b', '#0d8a6a', '#8b5cf6', '#c46a0a'];

function boundedStart(value: number) {
  return Math.max(1, Math.min(10_000, Math.round(value || 1)));
}

interface OrbitPlotProps {
  readonly starts: readonly number[];
  readonly logarithmic?: boolean;
}

function OrbitPlot({ starts, logarithmic = false }: OrbitPlotProps) {
  const titleId = useId();
  const paths = starts.map((start) => collatzSequence(start));
  const transformed = paths.map((path) => path.map((value) => logarithmic ? Math.log2(value) : value));
  const maxStep = Math.max(1, ...paths.map((path) => path.length - 1));
  const maxValue = Math.max(1, ...transformed.flat());
  const points = transformed.map((path) => path.map((value, index) => {
    const x = 32 + index / maxStep * 576;
    const y = 212 - value / maxValue * 180;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' '));

  return (
    <figure className="plot-card">
      <svg aria-labelledby={titleId} className="responsive-plot" role="img" viewBox="0 0 640 240">
        <title id={titleId}>{starts.join('、')} 的科拉茨轨道{logarithmic ? '，纵轴为 log₂(n)' : ''}</title>
        <line x1="32" x2="608" y1="212" y2="212" className="plot-axis" />
        <line x1="32" x2="32" y1="32" y2="212" className="plot-axis" />
        {points.map((pathPoints, index) => (
          <polyline
            fill="none"
            key={starts[index]}
            points={pathPoints}
            stroke={COLORS[index % COLORS.length]}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        ))}
        <text x="608" y="232" textAnchor="end">步数</text>
        <text x="38" y="46">{logarithmic ? 'log₂(n)' : 'n'}</text>
      </svg>
      <figcaption className="legend-row">
        {starts.map((start, index) => (
          <span key={start}><i style={{ background: COLORS[index % COLORS.length] }} />起点 {start}</span>
        ))}
      </figcaption>
    </figure>
  );
}

function RulesStage() {
  const [start, setStart] = useState(6);
  const path = useMemo(() => collatzSequence(start), [start]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">每一步只看当前数的奇偶性。这个规则很容易执行，但对所有正整数是否都到达 1，仍未被证明。</p>
      <div className="rule-grid">
        <div><b>偶数</b><span>n → n ÷ 2</span></div>
        <div><b>奇数</b><span>n → 3n + 1</span></div>
      </div>
      <label className="control-label">选择起点 n（1–10,000）
        <input aria-label="科拉茨起点" max="10000" min="1" onChange={(event) => setStart(boundedStart(event.target.valueAsNumber))} type="number" value={start} />
      </label>
      <output className="number-sequence" aria-live="polite" tabIndex={0}>{path.join(' → ')}</output>
      <div className="metric-grid">
        <div><span>总步数</span><strong>{path.length - 1}</strong></div>
        <div><span>轨道峰值</span><strong>{Math.max(...path).toLocaleString('zh-CN')}</strong></div>
        <div><span>本次终点</span><strong>{path.at(-1)}</strong></div>
      </div>
    </div>
  );
}

function ShapeStage() {
  const [start, setStart] = useState(27);
  const path = useMemo(() => collatzSequence(start), [start]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">把每一步画出来。起点 27 要经过 111 次变换（共 112 个序列项），并先升到 9,232，才到达 1。</p>
      <div className="preset-row" aria-label="选择示例起点">
        {[6, 11, 27, 54, 871].map((value) => <button aria-pressed={start === value} key={value} onClick={() => setStart(value)} type="button">{value}</button>)}
      </div>
      <OrbitPlot starts={[start]} />
      <p className="evidence-note">这里显示的是一个具体起点的完整计算，不代表对所有正整数的证明。当前轨道：{path.length - 1} 步，峰值 {Math.max(...path).toLocaleString('zh-CN')}。</p>
    </div>
  );
}

function CompareStage() {
  const [starts, setStarts] = useState<readonly number[]>([3, 6, 7, 9, 27]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">纵轴改用 log₂(n)，就能同时看清小轨道和大峰值。五条线到达 1，只说明这五个例子成立。</p>
      <div className="preset-row">
        <button onClick={() => setStarts([3, 6, 7, 9, 27])} type="button">短轨道组</button>
        <button onClick={() => setStarts([27, 54, 73, 97, 871])} type="button">高峰值组</button>
      </div>
      <OrbitPlot logarithmic starts={starts} />
      <div className="metric-grid">
        {starts.map((start) => {
          const path = collatzSequence(start);
          return <div key={start}><span>n={start}</span><strong>{path.length - 1} 步</strong></div>;
        })}
      </div>
    </div>
  );
}

function ParityStage() {
  const [start, setStart] = useState(5);
  const path = useMemo(() => collatzSequence(start).slice(0, 24), [start]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">奇数执行 3n+1 后一定变成偶数；但随后除以 2 一次，结果可能仍比原数大。因此这条观察不能推出长期必下降。</p>
      <label className="control-label">试一个起点
        <input max="999" min="1" onChange={(event) => setStart(boundedStart(event.target.valueAsNumber))} type="number" value={start} />
      </label>
      <div className="parity-path" aria-label={`起点 ${start} 的前 ${path.length} 项`}>
        {path.map((value, index) => (
          <span className={value === 1 ? 'terminal' : value % 2 === 0 ? 'even' : 'odd'} key={`${index}-${value}`}>{value}</span>
        ))}
      </div>
      <aside className="correction-note">
        <strong>关键边界：</strong>“奇数下一步必为偶数”是定理；“长期平均会下降”是有用的概率直觉；“每个起点最终到 1”仍是猜想。三者不能混为一谈。
      </aside>
    </div>
  );
}

function reverseLevels(depth: number) {
  const seen = new Set([1]);
  const levels: number[][] = [[1]];
  for (let index = 1; index <= depth; index += 1) {
    const next: number[] = [];
    for (const value of levels[index - 1] ?? []) {
      const candidates = [value * 2];
      const oddCandidate = (value - 1) / 3;
      if (Number.isInteger(oddCandidate) && oddCandidate > 0 && oddCandidate % 2 === 1) candidates.push(oddCandidate);
      for (const candidate of candidates) {
        if (!seen.has(candidate)) {
          seen.add(candidate);
          next.push(candidate);
        }
      }
    }
    levels.push(next.toSorted((a, b) => a - b));
  }
  return levels;
}

function ReverseStage() {
  const [depth, setDepth] = useState(8);
  const levels = useMemo(() => reverseLevels(depth), [depth]);
  const count = levels.reduce((total, level) => total + level.length, 0);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">从 1 反向找“谁下一步会到这里”，可以画出一棵已知前驱树。树里出现的数都能到达 1；没有出现的数不能据此判定。</p>
      <label className="control-label">反推深度：{depth} 层
        <input max="14" min="3" onChange={(event) => setDepth(event.target.valueAsNumber)} type="range" value={depth} />
      </label>
      <div className="reverse-tree" aria-label={`反向科拉茨树，共 ${count} 个不同整数`} tabIndex={0}>
        {levels.map((level, index) => (
          <div key={index}><b>第 {index} 层</b><span>{level.length ? level.join('、') : '暂无新节点'}</span></div>
        ))}
      </div>
      <aside className="correction-note">
        <strong>计算证据不是证明：</strong>2025 年同行评审论文报告已验证所有 n &lt; 2⁷¹；这仍只覆盖有限范围。证明“反向树最终包含每个正整数”正是猜想本身。
      </aside>
    </div>
  );
}

export const COLLATZ_EXPERIMENT: NativeExperiment = {
  id: 'PR02',
  stages: [
    { emoji: '🔁', title: '两条迭代规则', shortLabel: '规则', Component: RulesStage },
    { emoji: '📈', title: '一条轨道的形状', shortLabel: '轨道', Component: ShapeStage },
    { emoji: '🧵', title: '比较五个起点', shortLabel: '比较', Component: CompareStage },
    { emoji: '⚖️', title: '奇偶直觉的边界', shortLabel: '奇偶', Component: ParityStage },
    { emoji: '🌳', title: '从 1 反向生长', shortLabel: '反推', Component: ReverseStage }
  ]
};
