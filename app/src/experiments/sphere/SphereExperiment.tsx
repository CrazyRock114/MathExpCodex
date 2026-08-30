import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { sphereMeasures, sphereSliceApproximation } from '../math';
import type { NativeExperiment } from '../types';

function SpherePicture({ radius = 1 }: { radius?: number }) {
  const visualRadius = 35 + radius * 8;
  return <svg className="sphere-svg" viewBox="0 0 260 210" role="img" aria-label={`半径 ${radius} 的球示意图`}>
    <circle cx="130" cy="100" r={visualRadius} /><ellipse cx="130" cy="100" rx={visualRadius} ry={visualRadius / 3} /><line x1="130" y1="100" x2={130 + visualRadius} y2="100" /><text x="155" y="91">r={radius}</text>
  </svg>;
}

function ScalingStage() {
  const [radius, setRadius] = useState(2);
  const measures = sphereMeasures(radius);
  return <div className="split-experiment"><div className="experiment-stack">
    <p className="stage-lead">球面面积按 r² 缩放，球体积按 r³ 缩放；半径翻倍时，它们分别变为 4 倍和 8 倍。</p>
    <label className="control-label">半径 r：{radius.toFixed(1)}<input min=".5" max="5" step=".5" type="range" value={radius} onChange={(event) => setRadius(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>表面积 4πr²</span><strong>{measures.surfaceArea.toFixed(2)}</strong></div><div><span>体积 4πr³/3</span><strong>{measures.volume.toFixed(2)}</strong></div></div>
  </div><SpherePicture radius={radius} /></div>;
}

function CylinderStage() {
  const [radius, setRadius] = useState(2);
  const sphere = sphereMeasures(radius);
  const cylinderVolume = Math.PI * radius ** 2 * 2 * radius;
  const cylinderSurface = 2 * Math.PI * radius * 2 * radius + 2 * Math.PI * radius ** 2;
  return <div className="experiment-stack">
    <p className="stage-lead">把球放进半径 r、高 2r 的外接圆柱。阿基米德证明球的体积和表面积都等于对应圆柱（含两底）的 2/3。</p>
    <label className="control-label">半径 r：{radius}<input min="1" max="6" type="range" value={radius} onChange={(event) => setRadius(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>球 / 圆柱体积</span><strong>{(sphere.volume / cylinderVolume).toFixed(3)}</strong></div><div><span>球面 / 圆柱总面积</span><strong>{(sphere.surfaceArea / cylinderSurface).toFixed(3)}</strong></div><div><span>共同比值</span><strong>2/3</strong></div></div>
  </div>;
}

function SlicesStage() {
  const [slices, setSlices] = useState(12);
  const radius = 3;
  const approximation = sphereSliceApproximation(radius, slices);
  const exact = sphereMeasures(radius).volume;
  return <div className="experiment-stack">
    <p className="stage-lead">现代微积分可把球看成许多薄圆盘。这里用每片中点的截面积乘厚度，观察有限和逼近体积。</p>
    <label className="control-label">圆盘数：{slices}<input min="2" max="200" type="range" value={slices} onChange={(event) => setSlices(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>切片近似</span><strong>{approximation.toFixed(5)}</strong></div><div><span>公式值</span><strong>{exact.toFixed(5)}</strong></div><div><span>绝对误差</span><strong>{Math.abs(approximation - exact).toFixed(5)}</strong></div></div>
    <aside className="evidence-note">这是现代数值积分解释，不应倒写成阿基米德“把球切成无穷多薄片”的原始证明。</aside>
  </div>;
}

function ShellStage() {
  const [radius, setRadius] = useState(2);
  const [delta, setDelta] = useState(.5);
  const current = sphereMeasures(radius);
  const next = sphereMeasures(radius + delta);
  const quotient = (next.volume - current.volume) / delta;
  return <div className="experiment-stack">
    <p className="stage-lead">体积对半径的导数是 4πr²。有限厚度 Δr 的体积差商不是表面积，但当 Δr 变小时会趋近表面积。</p>
    <div className="edge-builder"><label>r：{radius}<input min="1" max="5" step=".5" type="range" value={radius} onChange={(event) => setRadius(event.target.valueAsNumber)} /></label><label>Δr：{delta.toFixed(2)}<input min=".01" max="1" step=".01" type="range" value={delta} onChange={(event) => setDelta(event.target.valueAsNumber)} /></label></div>
    <div className="metric-grid"><div><span>差商 ΔV/Δr</span><strong>{quotient.toFixed(4)}</strong></div><div><span>球面面积</span><strong>{current.surfaceArea.toFixed(4)}</strong></div></div>
  </div>;
}

function CorrectionsStage() {
  const [radius, setRadius] = useState(3);
  return <div className="experiment-stack">
    <p className="stage-lead">公式之外，还要给比较条件与几何对象准确命名。</p>
    <label className="control-label">外接球半径 r：{radius}<input min="1" max="8" type="range" value={radius} onChange={(event) => setRadius(event.target.valueAsNumber)} /></label>
    <div className="formula-card"><b>球内接正方体边长 = 2r/√3</b><span>r={radius} 时边长约 {(2 * radius / Math.sqrt(3)).toFixed(4)}，不是 r√2；r√2 是球内接正八面体的边长。</span></div>
    <aside className="correction-note"><strong>旧版纠错：</strong>“球最省材料”必须表述为三维等周不等式：固定体积时球的表面积最小，等价地固定表面积时球的体积最大。</aside>
  </div>;
}

export const SPHERE_EXPERIMENT: NativeExperiment = { id: 'GM04', stages: [
  { emoji: '🌐', title: '面积按平方、体积按立方缩放', shortLabel: '缩放', Component: ScalingStage },
  { emoji: '🏺', title: '球与外接圆柱的 2/3', shortLabel: '圆柱', Component: CylinderStage },
  { emoji: '🥞', title: '薄圆盘近似球体积', shortLabel: '切片', Component: SlicesStage },
  { emoji: '🔬', title: '体积导数为什么是球面面积', shortLabel: '导数', Component: ShellStage },
  { emoji: '📐', title: '修正内接立体与最优条件', shortLabel: '纠错', Component: CorrectionsStage }
] };

export default function SphereExperiment() { return <StageShell experimentId={SPHERE_EXPERIMENT.id} stages={SPHERE_EXPERIMENT.stages} />; }
