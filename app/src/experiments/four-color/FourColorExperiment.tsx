import { useMemo, useState, type CSSProperties } from 'react';
import { StageShell } from '../../components/StageShell';
import type { NativeExperiment } from '../types';

const COLORS = ['#dbe3ef', '#e85d75', '#3157d5', '#e5a11a', '#138a72'] as const;
const COLOR_NAMES = ['未染色', '红', '蓝', '黄', '绿'] as const;

function ColorButtons({ selected, onSelect }: { readonly selected: number; readonly onSelect: (color: number) => void }) {
  return (
    <div aria-label="选择颜色" className="color-palette" role="group">
      {COLOR_NAMES.slice(1).map((name, index) => (
        <button
          aria-pressed={selected === index + 1}
          key={name}
          onClick={() => onSelect(index + 1)}
          style={{ '--swatch': COLORS[index + 1] } as CSSProperties}
          type="button"
        >
          <span aria-hidden="true" />{name}
        </button>
      ))}
    </div>
  );
}

function GridStage() {
  const [selected, setSelected] = useState(1);
  const [cells, setCells] = useState(() => Array.from(
    { length: 24 },
    (_, index) => (Math.floor(index / 6) + index % 6) % 2 + 1
  ));
  const conflicts = useMemo(() => {
    const found = new Set<number>();
    for (let index = 0; index < cells.length; index += 1) {
      for (const neighbor of [index + 1, index + 6]) {
        if (neighbor >= cells.length || (neighbor === index + 1 && index % 6 === 5)) continue;
        if (cells[index] !== 0 && cells[index] === cells[neighbor]) {
          found.add(index);
          found.add(neighbor);
        }
      }
    }
    return found;
  }, [cells]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">先给规则网格染色：上下左右共享边才相邻，对角相碰不算。这个例子两色就够，说明定理说的是“至多四种”，不是每张地图都需要四种。</p>
      <ColorButtons onSelect={setSelected} selected={selected} />
      <div className="map-grid" role="group" aria-label="可染色的四行六列地图">
        {cells.map((color, index) => (
          <button
            aria-label={`第 ${Math.floor(index / 6) + 1} 行第 ${index % 6 + 1} 列，${COLOR_NAMES[color]}`}
            className={conflicts.has(index) ? 'map-cell conflict' : 'map-cell'}
            key={index}
            onClick={() => setCells((current) => current.with(index, selected))}
            style={{ background: COLORS[color] }}
            type="button"
          />
        ))}
      </div>
      <output className={conflicts.size ? 'result-neutral' : 'result-good'}>{conflicts.size ? `有 ${conflicts.size} 个格子与邻居同色` : '没有相邻同色；当前只用了两种颜色。'}</output>
    </div>
  );
}

interface ColoringGraphProps {
  readonly colors: readonly number[];
  readonly edges: readonly (readonly [number, number])[];
  readonly positions: readonly (readonly [number, number])[];
  readonly label: string;
}

function ColoringGraph({ colors, edges, positions, label }: ColoringGraphProps) {
  return (
    <svg aria-label={label} className="graph-svg" role="img" viewBox="0 0 360 270">
      {edges.map(([left, right]) => <line key={`${left}-${right}`} x1={positions[left]?.[0]} x2={positions[right]?.[0]} y1={positions[left]?.[1]} y2={positions[right]?.[1]} />)}
      {positions.map(([x, y], index) => (
        <g key={index}><circle cx={x} cy={y} fill={COLORS[colors[index] ?? 0]} r="25" /><text textAnchor="middle" x={x} y={y + 5}>{index + 1}</text></g>
      ))}
    </svg>
  );
}

function GraphChallenge({
  edges,
  positions,
  explanation
}: {
  readonly edges: readonly (readonly [number, number])[];
  readonly positions: readonly (readonly [number, number])[];
  readonly explanation: string;
}) {
  const [selected, setSelected] = useState(1);
  const [colors, setColors] = useState(() => positions.map(() => 0));
  const conflicts = edges.filter(([left, right]) => colors[left] !== 0 && colors[left] === colors[right]).length;
  const finished = colors.every(Boolean) && conflicts === 0;
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">{explanation}</p>
        <ColorButtons onSelect={setSelected} selected={selected} />
        <div className="vertex-buttons" role="group" aria-label="选择要染色的顶点">
          {colors.map((color, index) => <button key={index} onClick={() => setColors((current) => current.with(index, selected))} type="button">顶点 {index + 1}：{COLOR_NAMES[color]}</button>)}
        </div>
        <output className={finished ? 'result-good' : 'result-neutral'}>{finished ? `完成：使用 ${new Set(colors).size} 种颜色。` : colors.every(Boolean) ? `还有 ${conflicts} 条边两端同色。` : '给每个顶点选择一种颜色。'}</output>
      </div>
      <ColoringGraph colors={colors} edges={edges} label={`平面图，${conflicts} 条边存在颜色冲突`} positions={positions} />
    </div>
  );
}

const K4_EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]] as const;
const K4_POSITIONS = [[180, 35], [55, 225], [305, 225], [180, 150]] as const;

function K4Stage() {
  return <GraphChallenge edges={K4_EDGES} explanation="这是真正的 K₄：四个顶点两两相连，但仍可在平面上画成不交叉的图。任何两个顶点都相邻，所以它确实需要四种颜色。" positions={K4_POSITIONS} />;
}

const WHEEL_EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4]] as const;
const WHEEL_POSITIONS = [[180, 28], [326, 125], [270, 235], [90, 235], [34, 125], [180, 140]] as const;

function MapGraphStage() {
  return <GraphChallenge edges={WHEEL_EDGES} explanation="五边形外圈是奇环，至少要三色；中心又与外圈每个顶点相邻，所以还要第四色。把每个地图区域缩成顶点、共享边界连成边，就得到这种平面图模型。" positions={WHEEL_POSITIONS} />;
}

function PointContactStage() {
  const [regions, setRegions] = useState(6);
  return (
    <div className="split-experiment">
      <div className="experiment-stack">
        <p className="stage-lead">让许多扇形区域只在圆心这一点相遇。按四色定理的标准定义，它们并不因此相邻；如果把“碰到一个点”也算相邻，那么任意两块都相邻。</p>
        <label className="control-label">在一点相遇的区域数：{regions}<input max="12" min="3" onChange={(event) => setRegions(event.target.valueAsNumber)} type="range" value={regions} /></label>
        <div className="metric-grid"><div><span>标准定义所需颜色</span><strong>2</strong></div><div><span>若点接触也算相邻</span><strong>{regions}</strong></div></div>
        <aside className="correction-note"><strong>旧版纠错：</strong>点接触若算相邻，不是“最多五色”，而是能让所需颜色数任意大，因此不存在固定上限。</aside>
      </div>
      <svg aria-label={`${regions} 个只在圆心接触的扇形区域`} className="graph-svg wedge-svg" role="img" viewBox="0 0 300 300">
        {Array.from({ length: regions }, (_, index) => {
          const start = index * 2 * Math.PI / regions - Math.PI / 2;
          const end = (index + 1) * 2 * Math.PI / regions - Math.PI / 2;
          const point = (angle: number) => `${150 + 130 * Math.cos(angle)},${150 + 130 * Math.sin(angle)}`;
          return <path d={`M150,150 L${point(start)} A130,130 0 0 1 ${point(end)} Z`} fill={COLORS[index % 2 + 1]} key={index} />;
        })}
      </svg>
    </div>
  );
}

function ProofStage() {
  return (
    <div className="experiment-stack">
      <p className="stage-lead">四色问题从一道容易描述的地图题，变成了计算机辅助证明与形式化验证的里程碑。</p>
      <ol className="history-timeline">
        <li><b>1852</b><span>Francis Guthrie 提出地图四色问题。</span></li>
        <li><b>1976</b><span>Appel 与 Haken 宣布计算机辅助证明；论文随后正式发表。</span></li>
        <li><b>2005</b><span>Gonthier 团队在 Coq 中完成形式化证明，让逻辑步骤可由证明助手逐项检查。</span></li>
      </ol>
      <aside className="evidence-note">本实验展示例子与定义，不复现完整证明。完整证明需要把无限多地图归约到有限的不可避免构形集合，再逐一验证可约性。</aside>
    </div>
  );
}

export const FOUR_COLOR_EXPERIMENT: NativeExperiment = {
  id: 'PR04',
  stages: [
    { emoji: '🗺️', title: '共享边界才算相邻', shortLabel: '地图', Component: GridStage },
    { emoji: '4️⃣', title: '确实需要四种颜色的 K₄', shortLabel: 'K₄', Component: K4Stage },
    { emoji: '🕸️', title: '从地图变成平面图', shortLabel: '平面图', Component: MapGraphStage },
    { emoji: '📍', title: '为什么点接触必须排除', shortLabel: '相邻定义', Component: PointContactStage },
    { emoji: '✅', title: '从猜想到机器核验的证明', shortLabel: '证明', Component: ProofStage }
  ]
};

export default function FourColorExperiment() {
  return <StageShell experimentId={FOUR_COLOR_EXPERIMENT.id} stages={FOUR_COLOR_EXPERIMENT.stages} />;
}
