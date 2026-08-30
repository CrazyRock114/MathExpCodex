import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { kochCurvePoints, kochSnowflakeMeasures, type Point2D } from '../math';
import type { NativeExperiment } from '../types';

const TRIANGLE: readonly Point2D[] = [
  { x: 42, y: 190 },
  { x: 160, y: 28 },
  { x: 278, y: 190 }
];

function snowflakePoints(depth: number) {
  const points: Point2D[] = [];
  for (let index = 0; index < TRIANGLE.length; index += 1) {
    const edge = kochCurvePoints(TRIANGLE[index]!, TRIANGLE[(index + 1) % TRIANGLE.length]!, depth);
    points.push(...edge.slice(0, -1));
  }
  points.push(points[0]!);
  return points.map(({ x, y }) => `${x},${y}`).join(' ');
}

function ConstructionStage() {
  const [depth, setDepth] = useState(2);
  const points = useMemo(() => snowflakePoints(depth), [depth]);
  const measures = kochSnowflakeMeasures(1, depth);
  return <div className="experiment-stack"><p className="stage-lead">从等边三角形开始：把每条线段三等分，用朝外的两条边替换中间一段。每轮每段都会变成 4 段。</p><label className="control-label">迭代次数 n：{depth}<input min="0" max="5" type="range" value={depth} onChange={(event) => setDepth(event.target.valueAsNumber)} /></label><svg className="koch-svg" viewBox="0 0 320 280" role="img" aria-label={`科赫雪花第 ${depth} 次迭代，共 ${measures.segmentCount} 条边`}><polyline points={points} /></svg><output className="result-good">3×4^{depth} = {measures.segmentCount.toLocaleString()} 条边</output></div>;
}

function PerimeterStage() {
  const [depth, setDepth] = useState(4);
  const measures = kochSnowflakeMeasures(1, depth);
  return <div className="experiment-stack"><p className="stage-lead">边数每轮乘 4，每段长度每轮除以 3，所以总周长每轮乘 4/3。</p><label className="control-label">迭代次数 n：{depth}<input min="0" max="10" type="range" value={depth} onChange={(event) => setDepth(event.target.valueAsNumber)} /></label><div className="metric-grid"><div><span>边数</span><strong>{measures.segmentCount.toLocaleString()}</strong></div><div><span>每段长度（L=1）</span><strong>{measures.segmentLength.toPrecision(4)}</strong></div><div><span>周长</span><strong>{measures.perimeter.toFixed(4)}</strong></div></div><div className="formula-card"><b>Pₙ = 3L(4/3)ⁿ</b><span>n 趋向无穷时，(4/3)ⁿ 无界增长，所以极限边界长度无限。</span></div></div>;
}

function AreaStage() {
  const [depth, setDepth] = useState(3);
  const measures = kochSnowflakeMeasures(1, depth);
  return <div className="experiment-stack"><p className="stage-lead">新增小三角形的总面积按 4/9 的比例形成几何级数，因此面积会收敛，而不是随周长一起变成无限。</p><label className="control-label">迭代次数 n：{depth}<input min="0" max="10" type="range" value={depth} onChange={(event) => setDepth(event.target.valueAsNumber)} /></label><div className="factory-output"><span>相对初始三角形面积</span><strong>{measures.areaRatio.toFixed(6)} A₀</strong><p>极限为 8/5 A₀ = 1.6 A₀</p></div><div className="formula-card"><b>Aₙ/A₀ = 8/5 − (3/5)(4/9)ⁿ</b><span>n=0 时仍是初始等边三角形；第一次迭代后为 4/3 A₀。</span></div></div>;
}

function DimensionStage() {
  const dimension = kochSnowflakeMeasures(1, 0).dimension;
  return <div className="experiment-stack"><p className="stage-lead">一条科赫曲线由 4 个缩小到原来 1/3 的相似副本组成。令 4×(1/3)ᴰ=1，可得到相似维数。</p><div className="factory-output"><span>相似维数</span><strong>D = log 4 / log 3</strong><p>≈ {dimension.toFixed(6)}，介于线的 1 维与平面的 2 维之间</p></div><div className="rule-grid"><div><b>边界</b><span>自相似、长度无限，维数约 1.2619</span></div><div><b>内部区域</b><span>面积有限且为正；它不是这四份边界的同类自相似集合</span></div></div></div>;
}

function ScopeStage() {
  return <div className="experiment-stack"><p className="stage-lead">1904 年，Helge von Koch 用几何构造给出连续但处处无切线的曲线。雪花边界可演示“测量尺度越细，测得长度越长”，但真实海岸不是精确的科赫曲线。</p><aside className="correction-note"><strong>旧版纠错：</strong>科赫雪花被包含在某个有限区域内，不等于“包络是圆”，边界也不会“填满整个圆”。它的边界面积为 0；有限正面积说的是边界围成的雪花区域。</aside><aside className="correction-note"><strong>证据边界：</strong>分形几何确实用于某些天线设计，但删除“现代手机天线标配”这一无来源的概括；具体产品是否采用要看工程设计和证据。</aside><aside className="evidence-note">有限迭代的图像只能展示趋向；无限周长、有限面积与相似维数来自公式和极限论证。</aside></div>;
}

export const KOCH_EXPERIMENT: NativeExperiment = { id: 'FR03', stages: [
  { emoji: '❄️', title: '把每条边替换成四小段', shortLabel: '构造', Component: ConstructionStage },
  { emoji: '📏', title: '周长每轮乘以 4/3', shortLabel: '周长', Component: PerimeterStage },
  { emoji: '🔺', title: '新增面积形成收敛级数', shortLabel: '面积', Component: AreaStage },
  { emoji: '🔍', title: '四个三分之一副本决定维数', shortLabel: '维数', Component: DimensionStage },
  { emoji: '🧭', title: '区分边界、区域与现实模型', shortLabel: '边界', Component: ScopeStage }
] };

export default function KochExperiment() { return <StageShell experimentId={KOCH_EXPERIMENT.id} stages={KOCH_EXPERIMENT.stages} />; }
