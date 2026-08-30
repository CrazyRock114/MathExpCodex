import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { catalanNumber, generateBalancedParentheses } from '../math';
import type { NativeExperiment } from '../types';

const INTERPRETATIONS = [
  ['合法括号串', 'n 对括号，任意前缀里右括号都不多于左括号'],
  ['Dyck 路径', 'n 次上升、n 次下降，途中不跌到起点水平线下'],
  ['凸多边形三角剖分', '给 n+2 边形添加互不相交的对角线'],
  ['满二叉树形状', '恰有 n 个内部节点，每个内部节点有两个孩子']
] as const;

function CountStage() {
  const [n, setN] = useState(4);
  const values = Array.from({ length: n + 1 }, (_, index) => catalanNumber(index));
  return <div className="experiment-stack"><p className="stage-lead">卡特兰数从 C₀=1 开始；同一个数字会反复出现在多种“不能越界”的计数问题中。</p><label className="control-label">n：{n}<input min="0" max="15" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label><div className="factory-output"><span>第 n 个卡特兰数</span><strong>C{n} = {catalanNumber(n).toString()}</strong><p>Cₙ = (2n)! / [n!(n+1)!]</p></div><div className="number-sequence">{values.map((value, index) => `C${index}=${value}`).join(' · ')}</div></div>;
}

function ParenthesesStage() {
  const [pairs, setPairs] = useState(3);
  const words = generateBalancedParentheses(pairs);
  return <div className="experiment-stack"><p className="stage-lead">生成时只在“已关闭数量小于已打开数量”时放右括号，便不会出现先关闭后打开的非法前缀。</p><label className="control-label">括号对数：{pairs}<input min="1" max="5" type="range" value={pairs} onChange={(event) => setPairs(event.target.valueAsNumber)} /></label><ul className="number-pair-list" aria-label={`${pairs} 对括号的全部合法串`}>{words.map((word) => <li key={word}>{word}</li>)}</ul><output className="result-good">共 {words.length} 个 = C{pairs}</output><aside className="correction-note"><strong>旧版纠错：</strong>3 对括号的五个结果是 ((()))、(()())、(())()、()(())、()()()；旧稿漏写了一个右括号。</aside></div>;
}

function DyckStage() {
  const [pairs, setPairs] = useState(4);
  const words = generateBalancedParentheses(pairs);
  const [choice, setChoice] = useState(0);
  const safeChoice = Math.min(choice, words.length - 1);
  const word = words[safeChoice]!;
  let height = 0;
  const points = [`10,${20 + pairs * 18}`];
  [...word].forEach((symbol, index) => { height += symbol === '(' ? 1 : -1; points.push(`${10 + (index + 1) * 22},${20 + (pairs - height) * 18}`); });
  return <div className="experiment-stack"><p className="stage-lead">把左括号看作上升一步、右括号看作下降一步。合法括号串恰好对应从不跌破水平线的 Dyck 路径。</p><div className="edge-builder"><label>括号对：{pairs}<input min="2" max="5" type="range" value={pairs} onChange={(event) => { setPairs(event.target.valueAsNumber); setChoice(0); }} /></label><label>第 {safeChoice + 1} 条 / {words.length}<input min="0" max={words.length - 1} type="range" value={safeChoice} onChange={(event) => setChoice(event.target.valueAsNumber)} /></label></div><svg className="catalan-path" viewBox={`0 0 ${30 + pairs * 44} ${45 + pairs * 18}`} role="img" aria-label={`${word} 对应的 Dyck 路径`}><line x1="10" y1={20 + pairs * 18} x2={10 + pairs * 44} y2={20 + pairs * 18} /><polyline points={points.join(' ')} /></svg><output className="result-neutral">{word}</output></div>;
}

function InterpretStage() {
  const [n, setN] = useState(4);
  return <div className="experiment-stack"><p className="stage-lead">这些对象并非只是“碰巧同数”：可以用一一对应或共同递推，把一个对象无损转换成另一个。</p><label className="control-label">规模 n：{n}<input min="1" max="8" type="range" value={n} onChange={(event) => setN(event.target.valueAsNumber)} /></label><div className="status-card-grid">{INTERPRETATIONS.map(([title, text]) => <article key={title}><span className="status-proven">都是 C{n}={catalanNumber(n).toString()}</span><h4>{title}</h4><p>{text}</p></article>)}</div><div className="formula-card"><b>Cₙ₊₁ = Σ CᵢCₙ₋ᵢ</b><span>按“第一个返回点”或“根节点左右子树大小”拆分。</span></div></div>;
}

function BoundaryStage() {
  return <div className="experiment-stack"><p className="stage-lead">计数结论必须连同对象定义一起说清。改变“有序”“满二叉”或“不越界”等条件，答案就会改变。</p><div className="rule-grid"><div><b>二叉树</b><span>n 个内部节点的有序满二叉树形状</span></div><div><b>多边形</b><span>凸 n+2 边形的三角剖分</span></div><div><b>配对</b><span>圆周上 2n 个点的不交叉完美匹配</span></div></div><aside className="correction-note"><strong>旧版纠错：</strong>删去“1838 年首次系统研究”和“至少 200 个问题”等易误导的优先权、数量说法；这组数在 Catalan 之前已有更早研究。</aside><aside className="evidence-note">有限列举可以核对小规模；闭式公式和递推式需要组合证明，不能由 1,1,2,5,14 的前几项直接推出。</aside></div>;
}

export const CATALAN_EXPERIMENT: NativeExperiment = { id: 'SQ04', stages: [
  { emoji: '🔢', title: '从 1, 1, 2, 5, 14 开始', shortLabel: '数列', Component: CountStage },
  { emoji: '()', title: '生成所有合法括号串', shortLabel: '括号', Component: ParenthesesStage },
  { emoji: '📈', title: '括号串变成不越界路径', shortLabel: '路径', Component: DyckStage },
  { emoji: '🔁', title: '四类对象共享同一计数', shortLabel: '对应', Component: InterpretStage },
  { emoji: '🧭', title: '对象定义决定计数答案', shortLabel: '边界', Component: BoundaryStage }
] };

export default function CatalanExperiment() { return <StageShell experimentId={CATALAN_EXPERIMENT.id} stages={CATALAN_EXPERIMENT.stages} />; }
