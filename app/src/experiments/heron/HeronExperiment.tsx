import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { heronArea, maximumTriangleAreaForPerimeter } from '../math';
import type { NativeExperiment } from '../types';

function TrianglePicture({ a, b, c }: { a: number; b: number; c: number }) {
  const x = (b * b + c * c - a * a) / (2 * c);
  const height = Math.sqrt(Math.max(0, b * b - x * x));
  const minimumX = Math.min(0, x);
  const maximumX = Math.max(c, x);
  const scale = Math.min(240 / Math.max(1, maximumX - minimumX), 140 / Math.max(1, height));
  const startX = 30 - minimumX * scale;
  const endX = startX + c * scale;
  const cx = startX + x * scale;
  const cy = 175 - height * scale;
  return <svg className="heron-svg" role="img" aria-label={`边长 ${a.toFixed(1)}、${b.toFixed(1)}、${c.toFixed(1)} 的三角形`} viewBox="0 0 300 205">
    <polygon points={`${startX},175 ${endX},175 ${cx},${cy}`} />
    <text x={(startX + endX) / 2} y="199">c = {c.toFixed(1)}</text><text x={(startX + cx) / 2 - 14} y={(175 + cy) / 2}>b = {b.toFixed(1)}</text><text x={(endX + cx) / 2 + 8} y={(175 + cy) / 2}>a = {a.toFixed(1)}</text>
  </svg>;
}

function FormulaStage() {
  const [preset, setPreset] = useState<'345' | '678'>('345');
  const [a, b, c] = preset === '345' ? [3, 4, 5] : [6, 7, 8];
  const s = (a + b + c) / 2;
  return <div className="split-experiment"><div className="experiment-stack">
    <p className="stage-lead">知道三边 a、b、c 且它们能组成非退化三角形时，先算半周长 s=(a+b+c)/2，再算面积。</p>
    <div className="button-row"><button className={preset === '345' ? 'primary' : 'ghost'} onClick={() => setPreset('345')} type="button">3–4–5</button><button className={preset === '678' ? 'primary' : 'ghost'} onClick={() => setPreset('678')} type="button">6–7–8</button></div>
    <div className="formula-card"><b>A = √[s(s−a)(s−b)(s−c)]</b><span>s = {s}，A = {heronArea(a, b, c).toFixed(4)} 平方单位</span></div>
  </div><TrianglePicture a={a} b={b} c={c} /></div>;
}

function SidesStage() {
  const [sides, setSides] = useState([5, 6, 7]);
  const update = (index: number, value: number) => setSides((current) => current.map((side, sideIndex) => sideIndex === index ? value : side));
  let area: number | null = null;
  try { area = heronArea(sides[0]!, sides[1]!, sides[2]!); } catch { area = null; }
  return <div className="experiment-stack">
    <p className="stage-lead">三边必须满足任意两边之和严格大于第三边；等号对应压成一条线，面积为 0，不是非退化三角形。</p>
    <div className="edge-builder">{sides.map((side, index) => <label key={index}>{['a', 'b', 'c'][index]}：{side.toFixed(1)}<input min="1" max="15" step="0.5" type="range" value={side} onChange={(event) => update(index, event.target.valueAsNumber)} /></label>)}</div>
    {area === null ? <output className="result-warning">不能组成非退化三角形：请让任意两边之和都大于第三边。</output> : <><TrianglePicture a={sides[0]!} b={sides[1]!} c={sides[2]!} /><output className="result-good">面积 = {area.toFixed(4)} 平方单位</output></>}
  </div>;
}

function FixedPerimeterStage() {
  const [perimeter, setPerimeter] = useState(18);
  const [imbalance, setImbalance] = useState(0);
  const base = perimeter / 3;
  const a = base * (1 + imbalance / 200);
  const b = (perimeter - a) / 2;
  const area = heronArea(a, b, b);
  const maximum = maximumTriangleAreaForPerimeter(perimeter);
  return <div className="experiment-stack">
    <p className="stage-lead">“等边面积最大”只有在周长固定时才成立。这里保持 a+b+c 不变，只把边长分配得更均匀或更不均匀。</p>
    <label className="control-label">固定周长：{perimeter}<input min="12" max="36" type="range" value={perimeter} onChange={(event) => setPerimeter(event.target.valueAsNumber)} /></label>
    <label className="control-label">偏离等边：{imbalance}%<input min="-80" max="80" type="range" value={imbalance} onChange={(event) => setImbalance(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>边长</span><strong>{a.toFixed(2)}, {b.toFixed(2)}, {b.toFixed(2)}</strong></div><div><span>当前面积</span><strong>{area.toFixed(3)}</strong></div><div><span>等边最大面积</span><strong>{maximum.toFixed(3)}</strong></div></div>
    <aside className="correction-note"><strong>旧版纠错：</strong>比较任意不同周长的三角形时，等边三角形并不自动面积最大；必须明确“固定周长”。</aside>
  </div>;
}

function EquivalentStage() {
  const [a, setA] = useState(7);
  const [b, setB] = useState(9);
  const [angle, setAngle] = useState(60);
  const radians = angle * Math.PI / 180;
  const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(radians));
  const trigArea = .5 * a * b * Math.sin(radians);
  const area = heronArea(a, b, c);
  return <div className="experiment-stack">
    <p className="stage-lead">给两边及夹角时，余弦定理先求第三边；海伦公式与 ½ab·sin(C) 应得到同一面积。</p>
    <div className="edge-builder"><label>a：{a}<input min="2" max="15" type="range" value={a} onChange={(event) => setA(event.target.valueAsNumber)} /></label><label>b：{b}<input min="2" max="15" type="range" value={b} onChange={(event) => setB(event.target.valueAsNumber)} /></label><label>夹角：{angle}°<input min="5" max="175" type="range" value={angle} onChange={(event) => setAngle(event.target.valueAsNumber)} /></label></div>
    <div className="metric-grid"><div><span>余弦定理得 c</span><strong>{c.toFixed(5)}</strong></div><div><span>海伦公式</span><strong>{area.toFixed(5)}</strong></div><div><span>½ab·sin(C)</span><strong>{trigArea.toFixed(5)}</strong></div></div>
  </div>;
}

function BoundaryStage() {
  const [gap, setGap] = useState(2);
  const a = 5;
  const b = 5;
  const c = 10 - gap;
  const area = heronArea(a, b, c);
  return <div className="experiment-stack">
    <p className="stage-lead">当一边越来越接近另外两边之和，三角形会变扁，面积趋近 0。公式的适用条件和数值精度都应一起说明。</p>
    <label className="control-label">距退化边界的差：{gap.toFixed(2)}<input min="0.05" max="5" step="0.05" type="range" value={gap} onChange={(event) => setGap(event.target.valueAsNumber)} /></label>
    <TrianglePicture a={a} b={b} c={c} />
    <output className="result-good">5 + 5 − {c.toFixed(2)} = {gap.toFixed(2)}；面积 {area.toFixed(5)}</output>
    <aside className="evidence-note">Heron 的《Metrica》保存了这一公式的古代论证。项目不再采用“阿基米德已知但未发表”这类难以直接核验的时间线断言。</aside>
  </div>;
}

export const HERON_EXPERIMENT: NativeExperiment = { id: 'GM03', stages: [
  { emoji: '📐', title: '只用三边计算面积', shortLabel: '公式', Component: FormulaStage },
  { emoji: '📏', title: '先检查严格三角不等式', shortLabel: '三边', Component: SidesStage },
  { emoji: '⚖️', title: '固定周长才谈最大面积', shortLabel: '最大值', Component: FixedPerimeterStage },
  { emoji: '🧮', title: '与正弦面积公式互相核对', shortLabel: '等价', Component: EquivalentStage },
  { emoji: '🔬', title: '接近退化时面积趋近零', shortLabel: '边界', Component: BoundaryStage }
] };

export default function HeronExperiment() { return <StageShell experimentId={HERON_EXPERIMENT.id} stages={HERON_EXPERIMENT.stages} />; }
