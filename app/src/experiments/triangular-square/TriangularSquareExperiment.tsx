import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { triangularNumber } from '../math';
import type { NativeExperiment } from '../types';

function DotTriangle({ rows }: { rows: number }) {
  return <div className="triangle-dots" role="img" aria-label={`${rows} 行、共 ${triangularNumber(rows)} 个点的三角数点阵`}>
    {Array.from({ length: rows }, (_, row) => <div key={row}>{Array.from({ length: row + 1 }, (_, column) => <i key={column} />)}</div>)}
  </div>;
}

function BuildStage() {
  const [n, setN] = useState(6);
  return <div className="split-experiment"><div className="experiment-stack">
    <p className="stage-lead">第 n 个三角数是前 n 个正整数之和。每增加一行，就比上一个三角数多 n 个点。</p>
    <label className="control-label">行数 n：{n}<input min="1" max="15" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label>
    <div className="formula-card"><b>Tₙ = 1+2+⋯+n = n(n+1)/2</b><span>T{n} = {triangularNumber(n)}</span></div>
  </div><DotTriangle rows={n} /></div>;
}

function SquareStage() {
  const [n, setN] = useState(5);
  const size = n + 1;
  const first = triangularNumber(n);
  const second = triangularNumber(n + 1);
  return <div className="experiment-stack">
    <p className="stage-lead">把 Tₙ 个蓝格和 Tₙ₊₁ 个金格沿对角线拼在一起，恰好填满边长 n+1 的正方形。</p>
    <label className="control-label">n：{n}<input min="1" max="11" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label>
    <div className="triangular-square-grid" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }} role="img" aria-label={`${first} 个蓝格加 ${second} 个金格组成 ${size} 乘 ${size} 正方形`}>
      {Array.from({ length: size * size }, (_, index) => {
        const row = Math.floor(index / size);
        const column = index % size;
        return <i className={column < row ? 'first' : 'second'} key={index} />;
      })}
    </div>
    <output className="result-good">T{n} + T{n + 1} = {first} + {second} = {size ** 2} = {size}²</output>
  </div>;
}

function AlgebraStage() {
  const [n, setN] = useState(10);
  return <div className="experiment-stack">
    <p className="stage-lead">点阵给直觉，代数把规律证明给所有非负整数 n，而不只是屏幕上的有限例子。</p>
    <label className="control-label">代入 n：{n}<input min="0" max="30" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label>
    <ol className="proof-steps"><li className="revealed"><b>1</b><span>Tₙ + Tₙ₊₁ = n(n+1)/2 + (n+1)(n+2)/2</span></li><li className="revealed"><b>2</b><span>= (n+1)(n+n+2)/2</span></li><li className="revealed"><b>3</b><span>= (n+1)² = {(n + 1) ** 2}</span></li></ol>
  </div>;
}

function RecognitionStage() {
  const [n, setN] = useState(12);
  const value = triangularNumber(n);
  return <div className="experiment-stack">
    <p className="stage-lead">三角数还有一个方便的判别式：N=Tₙ 时，8N+1=(2n+1)²，一定是奇数的平方。</p>
    <label className="control-label">n：{n}<input min="0" max="40" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>N=Tₙ</span><strong>{value}</strong></div><div><span>8N+1</span><strong>{8 * value + 1}</strong></div><div><span>(2n+1)²</span><strong>{2 * n + 1}²</strong></div></div>
    <aside className="evidence-note">反过来，对非负整数 N，如果 8N+1 是奇数平方，就能解出整数 n，因此 N 是三角数。</aside>
  </div>;
}

function EvidenceStage() {
  return <div className="experiment-stack">
    <p className="stage-lead">实验、图形与证明各有角色：试算帮助发现规律，点阵解释结构，恒等变形覆盖所有 n。</p>
    <div className="rule-grid"><div><b>试算</b><span>能发现反例，不能单独证明无限多个情形。</span></div><div><b>点阵</b><span>把两块三角形重排成正方形。</span></div><div><b>代数</b><span>明确量词与下标后完成一般证明。</span></div></div>
    <aside className="correction-note"><strong>旧版纠错：</strong>移除“欧几里得已经证明此恒等式”的无来源归属，也不把前四个三角数之和这个单例写成一般规律。</aside>
  </div>;
}

export const TRIANGULAR_SQUARE_EXPERIMENT: NativeExperiment = { id: 'SQ09', stages: [
  { emoji: '🔺', title: '用点阵生成三角数', shortLabel: '三角数', Component: BuildStage },
  { emoji: '🟦', title: '两个连续三角数拼成平方', shortLabel: '拼图', Component: SquareStage },
  { emoji: '🧮', title: '代数证明覆盖所有 n', shortLabel: '证明', Component: AlgebraStage },
  { emoji: '🔍', title: '用 8N+1 识别三角数', shortLabel: '识别', Component: RecognitionStage },
  { emoji: '✅', title: '区分观察、解释与证明', shortLabel: '证据', Component: EvidenceStage }
] };

export default function TriangularSquareExperiment() { return <StageShell experimentId={TRIANGULAR_SQUARE_EXPERIMENT.id} stages={TRIANGULAR_SQUARE_EXPERIMENT.stages} />; }
