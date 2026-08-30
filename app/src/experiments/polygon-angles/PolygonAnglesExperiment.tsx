import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { polygonInteriorAngleSum } from '../math';
import type { NativeExperiment } from '../types';

function regularPoints(sides: number, radius = 110) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = index * 2 * Math.PI / sides - Math.PI / 2;
    return [150 + radius * Math.cos(angle), 150 + radius * Math.sin(angle)] as const;
  });
}

function FormulaStage() {
  const [sides, setSides] = useState(5);
  const sum = polygonInteriorAngleSum(sides);
  const each = sum / sides;
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">简单 n 边形可分成 n−2 个三角形，所以内角和是 (n−2)×180°。正多边形的每个内角还要再除以 n。</p>
        <label className="control-label">边数 n：{sides}<input max="12" min="3" onChange={(event) => setSides(event.target.valueAsNumber)} type="range" value={sides} /></label>
        <div className="metric-grid"><div><span>三角形数</span><strong>{sides - 2}</strong></div><div><span>内角和</span><strong>{sum}°</strong></div><div><span>正多边形每角</span><strong>{Number.isInteger(each) ? each : each.toFixed(2)}°</strong></div></div>
      </div>
      <svg aria-label={`正 ${sides} 边形`} className="polygon-angle-svg" role="img" viewBox="0 0 300 300"><polygon points={regularPoints(sides).map((point) => point.join(',')).join(' ')} /></svg>
    </div>
  );
}

function TriangulationStage() {
  const [sides, setSides] = useState(6);
  const points = regularPoints(sides);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">凸多边形中，从一个顶点连向所有不相邻顶点，线段都留在图形内部，恰好切成 n−2 个不重叠三角形。</p>
        <div className="preset-row">{[3, 4, 5, 6, 8, 10].map((value) => <button aria-pressed={sides === value} key={value} onClick={() => setSides(value)} type="button">{value} 边</button>)}</div>
        <div className="formula-card"><b>{sides - 2} × 180° = {polygonInteriorAngleSum(sides)}°</b><span>对角线数 {Math.max(0, sides - 3)}，三角形数 {sides - 2}</span></div>
      </div>
      <svg aria-label={`${sides} 边形从一个顶点分成 ${sides - 2} 个三角形`} className="polygon-angle-svg" role="img" viewBox="0 0 300 300"><polygon points={points.map((point) => point.join(',')).join(' ')} />{points.slice(2, -1).map(([x, y], index) => <line key={index} x1={points[0]?.[0]} x2={x} y1={points[0]?.[1]} y2={y} />)}</svg>
    </div>
  );
}

function ConcaveStage() {
  const points = [[35, 45], [265, 45], [265, 245], [150, 150], [35, 245]] as const;
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">凹多边形也满足公式，但“从任意一个顶点向外扇形切”可能跑到图形外。要选择留在内部的对角线，或使用一般的多边形三角剖分。</p>
        <div className="metric-grid"><div><span>边数</span><strong>5</strong></div><div><span>三角形</span><strong>3</strong></div><div><span>内角和</span><strong>540°</strong></div></div>
        <aside className="correction-note"><strong>适用边界：</strong>旧版把“从一个顶点切成 n−2 个三角形”直接画给所有多边形；这个简单扇形构造只对凸多边形自动成立。</aside>
      </div>
      <svg aria-label="凹五边形被内部对角线切成三个三角形" className="polygon-angle-svg" role="img" viewBox="0 0 300 290"><polygon points={points.map((point) => point.join(',')).join(' ')} /><line x1="35" x2="150" y1="45" y2="150" /><line x1="265" x2="150" y1="45" y2="150" /></svg>
    </div>
  );
}

function AngleCheckStage() {
  const [sides, setSides] = useState(4);
  const [measured, setMeasured] = useState(360);
  const expected = polygonInteriorAngleSum(sides);
  const difference = measured - expected;
  return (
    <div className="experiment-stack">
      <p className="stage-lead">测量图形各内角再相加，并与公式比较。纸笔或屏幕测量会有舍入误差，公式值是理想几何模型中的精确结果。</p>
      <label className="control-label">边数 n：{sides}<input max="12" min="3" onChange={(event) => { setSides(event.target.valueAsNumber); setMeasured(polygonInteriorAngleSum(event.target.valueAsNumber)); }} type="range" value={sides} /></label>
      <label className="control-label">测得角度总和<input min="0" onChange={(event) => setMeasured(event.target.valueAsNumber)} type="number" value={measured} /></label>
      <div className="metric-grid"><div><span>公式值</span><strong>{expected}°</strong></div><div><span>测量值</span><strong>{measured}°</strong></div><div><span>测量差</span><strong>{difference > 0 ? '+' : ''}{difference}°</strong></div></div>
    </div>
  );
}

function ScopeStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">公式中的“多边形”有明确条件。图形一旦自交，交点是否算顶点、内角沿哪一侧量，都需要重新定义。</p>
      <div className="status-card-grid">
        <article><span className="status-proven">可以直接使用</span><h4>简单多边形</h4><p>边只在相邻端点相交；凸或凹都满足 (n−2)×180°。</p></article>
        <article><span className="status-open">不能直接套用</span><h4>自交星形</h4><p>需要先说明采用哪些顶点和哪种有向角/绕数定义。</p></article>
      </div>
      <div className="rule-grid"><div><b>欧几里得 I.32</b><span>证明三角形内角和等于两个直角。</span></div><div><b>多边形推导</b><span>把简单多边形三角剖分，再把所有三角形角度相加。</span></div></div>
    </div>
  );
}

export const POLYGON_ANGLES_EXPERIMENT: NativeExperiment = {
  id: 'GM01',
  stages: [
    { emoji: '📐', title: '内角和与单个内角', shortLabel: '公式', Component: FormulaStage },
    { emoji: '✂️', title: '凸多边形的扇形三角剖分', shortLabel: '切三角', Component: TriangulationStage },
    { emoji: '↩️', title: '凹多边形需要选对对角线', shortLabel: '凹多边形', Component: ConcaveStage },
    { emoji: '📏', title: '测量值与公式值比较', shortLabel: '测量', Component: AngleCheckStage },
    { emoji: '⚠️', title: '自交图形为什么要另作定义', shortLabel: '边界', Component: ScopeStage }
  ]
};

export default function PolygonAnglesExperiment() {
  return <StageShell experimentId={POLYGON_ANGLES_EXPERIMENT.id} stages={POLYGON_ANGLES_EXPERIMENT.stages} />;
}
