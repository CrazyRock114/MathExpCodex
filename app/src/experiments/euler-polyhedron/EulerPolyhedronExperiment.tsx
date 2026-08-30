import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { eulerCharacteristic, orientableSurfaceCharacteristic } from '../math';
import type { NativeExperiment } from '../types';

const POLYHEDRA = [
  { name: '四面体', vertices: 4, edges: 6, faces: 4 },
  { name: '立方体', vertices: 8, edges: 12, faces: 6 },
  { name: '八面体', vertices: 6, edges: 12, faces: 8 },
  { name: '十二面体', vertices: 20, edges: 30, faces: 12 }
] as const;
const PLANAR_STEPS = [
  { label: '树', vertices: 4, edges: 3, faces: 1 },
  { label: '补一条边，切出新面', vertices: 4, edges: 4, faces: 2 },
  { label: '再补一条边', vertices: 4, edges: 5, faces: 3 },
  { label: '成为 K₄ 的平面嵌入', vertices: 4, edges: 6, faces: 4 }
] as const;

function PolyhedronStage() {
  const [choice, setChoice] = useState(1);
  const solid = POLYHEDRA[choice]!;
  return <div className="experiment-stack"><p className="stage-lead">对凸多面体，数清顶点 V、棱 E 和面 F，总会得到 V−E+F=2。</p><div className="button-row">{POLYHEDRA.map((item, index) => <button className={choice === index ? 'primary' : 'ghost'} key={item.name} onClick={() => setChoice(index)} type="button">{item.name}</button>)}</div><div className="metric-grid"><div><span>顶点 V</span><strong>{solid.vertices}</strong></div><div><span>棱 E</span><strong>{solid.edges}</strong></div><div><span>面 F</span><strong>{solid.faces}</strong></div><div><span>V−E+F</span><strong>{eulerCharacteristic(solid.vertices, solid.edges, solid.faces)}</strong></div></div></div>;
}

function PlanarStage() {
  const [step, setStep] = useState(0);
  const graph = PLANAR_STEPS[step]!;
  return <div className="experiment-stack"><p className="stage-lead">把凸多面体的一面打开并投影到平面，可转成连通平面图。这里的 F 必须把最外侧区域也算作一个面。</p><label className="control-label">加边步骤：{step}<input min="0" max="3" type="range" value={step} onChange={(event) => setStep(event.target.valueAsNumber)} /></label><div className="formula-card"><b>{graph.label}</b><span>{graph.vertices}−{graph.edges}+{graph.faces}=2</span></div><aside className="evidence-note">在同一面内加一条不交叉的新边时，E 与 F 同时加 1，因此 V−E+F 不变。</aside></div>;
}

function SurfaceStage() {
  const [genus, setGenus] = useState(1);
  return <div className="experiment-stack"><p className="stage-lead">更一般地，连通闭可定向曲面的胞腔分解满足 χ=V−E+F=2−2g，其中 g 是“把手”数。</p><label className="control-label">把手数 g：{genus}<input min="0" max="4" type="range" value={genus} onChange={(event) => setGenus(event.target.valueAsNumber)} /></label><div className="factory-output"><span>欧拉示性数</span><strong>χ = {orientableSurfaceCharacteristic(genus)}</strong><p>2−2×{genus}</p></div><aside className="correction-note"><strong>旧版纠错：</strong>标准环面胞腔分解可记作 V=1、E=2、F=1，所以 χ=0；旧稿的 V=0、E=1、F=1 不是这里采用的合法计数。</aside></div>;
}

function ScopeStage() {
  const [view, setView] = useState<'solid' | 'graph' | 'surface'>('solid');
  const content = view === 'solid' ? ['凸多面体', 'V−E+F=2'] : view === 'graph' ? ['连通平面图（含外面）', 'V−E+F=2'] : ['连通闭可定向曲面的胞腔分解', 'V−E+F=2−2g'];
  return <div className="experiment-stack"><p className="stage-lead">相同符号在不同对象上需要不同前提。只写“有几个洞”而不说明曲面、连通性和分解方式，会把公式用错。</p><div className="button-row"><button className={view === 'solid' ? 'primary' : 'ghost'} onClick={() => setView('solid')} type="button">多面体</button><button className={view === 'graph' ? 'primary' : 'ghost'} onClick={() => setView('graph')} type="button">平面图</button><button className={view === 'surface' ? 'primary' : 'ghost'} onClick={() => setView('surface')} type="button">曲面</button></div><div className="formula-card"><b>{content[0]}</b><span>{content[1]}</span></div></div>;
}

function InvarianceStage() {
  return <div className="experiment-stack"><p className="stage-lead">欧拉示性数重要之处不只是一个算式，而是换一种足够好的剖分后，V、E、F 各自会变，组合 V−E+F 却保持不变。</p><ol className="proof-steps"><li className="revealed"><b>1</b><span>从连通平面图的一棵生成树开始：E=V−1、F=1，因此 V−E+F=2。</span></li><li className="revealed"><b>2</b><span>每补一条能切开某个面的边，E 与 F 同时增加 1。</span></li><li className="revealed"><b>3</b><span>反复补回所有边，差值始终为 2。</span></li></ol><aside className="correction-note"><strong>旧版纠错：</strong>删除未经支撑的“阿基米德首先研究、Euler 在 1750 年证明”等简化历史叙述；本实验聚焦可核验的数学命题。</aside></div>;
}

export const EULER_POLYHEDRON_EXPERIMENT: NativeExperiment = { id: 'GM07', stages: [
  { emoji: '🧊', title: '给凸多面体数 V、E、F', shortLabel: '多面体', Component: PolyhedronStage },
  { emoji: '🗺️', title: '投影为平面图并计入外面', shortLabel: '平面图', Component: PlanarStage },
  { emoji: '🍩', title: '把手改变欧拉示性数', shortLabel: '曲面', Component: SurfaceStage },
  { emoji: '📐', title: '先检查公式的适用前提', shortLabel: '前提', Component: ScopeStage },
  { emoji: '🔒', title: '为什么加边不改变差值', shortLabel: '不变量', Component: InvarianceStage }
] };

export default function EulerPolyhedronExperiment() { return <StageShell experimentId={EULER_POLYHEDRON_EXPERIMENT.id} stages={EULER_POLYHEDRON_EXPERIMENT.stages} />; }
