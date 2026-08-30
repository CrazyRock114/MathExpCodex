import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { completeGraphEdges, oddDegreeVertices, undirectedDegrees, type UndirectedEdge } from '../math';
import type { NativeExperiment } from '../types';

const LABELS = ['A', 'B', 'C', 'D', 'E'] as const;
const POSSIBLE_EDGES = completeGraphEdges(LABELS.length);

function EdgeBuilder({ edges, onChange }: { edges: readonly UndirectedEdge[]; onChange: (edges: readonly UndirectedEdge[]) => void }) {
  return <div className="edge-button-grid">{POSSIBLE_EDGES.map((edge) => { const active = edges.some(({ left, right }) => left === edge.left && right === edge.right); return <button aria-pressed={active} className={active ? 'edge-blue' : ''} key={`${edge.left}-${edge.right}`} onClick={() => onChange(active ? edges.filter((item) => item.left !== edge.left || item.right !== edge.right) : [...edges, edge])} type="button">{LABELS[edge.left]}—{LABELS[edge.right]}</button>; })}</div>;
}

function BuildStage() {
  const [edges, setEdges] = useState<readonly UndirectedEdge[]>([{ left: 0, right: 1 }, { left: 1, right: 2 }, { left: 2, right: 0 }]);
  const degrees = undirectedDegrees(LABELS.length, edges);
  return <div className="experiment-stack"><p className="stage-lead">每次握手连接两个人，所以在无向图里是一条有两个端点的边。点按钮添加或删除握手。</p><EdgeBuilder edges={edges} onChange={setEdges} /><div className="metric-grid">{degrees.map((degree, index) => <div key={LABELS[index]}><span>{LABELS[index]} 的次数</span><strong>{degree}</strong></div>)}</div><output className="result-good">度数总和 {degrees.reduce((sum, degree) => sum + degree, 0)} = 2×{edges.length}</output></div>;
}

function ProofStage() {
  const [edges, setEdges] = useState<readonly UndirectedEdge[]>([{ left: 0, right: 1 }]);
  const sum = undirectedDegrees(LABELS.length, edges).reduce((total, degree) => total + degree, 0);
  return <div className="experiment-stack"><p className="stage-lead">从“边”来双重计数：每条边给左端点贡献 1，也给右端点贡献 1，因此总贡献必为 2。</p><EdgeBuilder edges={edges} onChange={setEdges} /><div className="formula-card"><b>Σ deg(v) = 2|E|</b><span>{sum} = 2×{edges.length}</span></div><aside className="evidence-note">这不是概率规律；对每一张有限无向图都成立。</aside></div>;
}

function OddStage() {
  const [edges, setEdges] = useState<readonly UndirectedEdge[]>([{ left: 0, right: 1 }, { left: 1, right: 2 }]);
  const degrees = undirectedDegrees(LABELS.length, edges);
  const odd = oddDegreeVertices(LABELS.length, edges);
  return <div className="experiment-stack"><p className="stage-lead">总度数是偶数；偶度顶点贡献偶数，所以奇度顶点的个数只能是偶数。</p><EdgeBuilder edges={edges} onChange={setEdges} /><ul className="sequence-cards">{degrees.map((degree, index) => <li key={LABELS[index]}><span>顶点 {LABELS[index]}</span><strong>{degree}（{degree % 2 ? '奇' : '偶'}）</strong></li>)}</ul><output className="result-good">奇度顶点：{odd.length ? odd.map((index) => LABELS[index]).join('、') : '无'}；共 {odd.length} 个</output><aside className="correction-note"><strong>旧版纠错：</strong>不是“奇度顶点不能是 1 或 3 个”，而是不能为任何奇数个：1、3、5……都不可能。</aside></div>;
}

function LoopStage() {
  const [loop, setLoop] = useState(false);
  const edges = loop ? [{ left: 0, right: 0 }] : [];
  return <div className="experiment-stack"><p className="stage-lead">自环的两个端点落在同一顶点，因此仍给总度数贡献 2。对于有向图，则分别统计入度与出度。</p><button className={loop ? 'primary' : 'ghost'} onClick={() => setLoop((value) => !value)} type="button">{loop ? '移除 A 的自环' : '给 A 添加自环'}</button><div className="metric-grid"><div><span>A 的度数</span><strong>{undirectedDegrees(1, edges)[0]}</strong></div><div><span>无向边数</span><strong>{edges.length}</strong></div><div><span>总度数</span><strong>{undirectedDegrees(1, edges)[0]}</strong></div></div><div className="formula-card"><b>有向图：Σ入度 = Σ出度 = |E|</b><span>每条有向边恰有一个起点和一个终点。</span></div></div>;
}

function ConsequenceStage() {
  return <div className="experiment-stack"><p className="stage-lead">握手定理能快速排除不可能的度数序列，也能推出“一笔画”中奇度顶点只能是 0 或 2 个。</p><div className="rule-grid"><div><b>(2,2,1)</b><span>总和 5 为奇数，不可能</span></div><div><b>(3,3,2,2)</b><span>总和 10，未被定理排除</span></div><div><b>欧拉路径</b><span>0 或 2 个奇度顶点只是度数条件</span></div></div><aside className="correction-note"><strong>旧版纠错：</strong>删去“奇度区域邻接至少需要三色”的错误推论；一笔画还必须检查所有有边顶点是否连通，0 或 2 个奇度顶点并非单独充分。</aside></div>;
}

export const HANDSHAKE_EXPERIMENT: NativeExperiment = { id: 'GR09', stages: [
  { emoji: '🤝', title: '把每次握手画成一条边', shortLabel: '建图', Component: BuildStage },
  { emoji: '🧮', title: '每条边被端点数了两次', shortLabel: '定理', Component: ProofStage },
  { emoji: '⚖️', title: '奇度顶点总是偶数个', shortLabel: '奇偶', Component: OddStage },
  { emoji: '↩️', title: '自环与有向边怎样计数', shortLabel: '扩展', Component: LoopStage },
  { emoji: '🧩', title: '能推出什么，不能推出什么', shortLabel: '推论', Component: ConsequenceStage }
] };

export default function HandshakeExperiment() { return <StageShell experimentId={HANDSHAKE_EXPERIMENT.id} stages={HANDSHAKE_EXPERIMENT.stages} />; }
