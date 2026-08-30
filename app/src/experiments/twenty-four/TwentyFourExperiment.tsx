import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { solveTwentyFour } from '../math';
import type { NativeExperiment } from '../types';

const PRESETS = [[1, 2, 3, 4], [1, 5, 5, 5], [3, 3, 8, 8], [1, 1, 1, 1]] as const;

function RulesStage() {
  return <div className="experiment-stack"><p className="stage-lead">本实验固定一套可检验规则：四个 1–13 的整数都必须恰用一次，只准 +、−、×、÷ 和括号，中间结果允许分数，最终结果必须精确等于 24。</p><div className="rule-grid"><div><b>每数一次</b><span>不能遗漏、重复或拼接数字</span></div><div><b>四则运算</b><span>不加入乘方、阶乘或开方</span></div><div><b>精确相等</b><span>不靠小数四舍五入命中</span></div></div></div>;
}

function SolverStage() {
  const [cards, setCards] = useState<readonly number[]>(PRESETS[1]);
  const result = useMemo(() => solveTwentyFour(cards), [cards]);
  const update = (index: number, value: number) => setCards((current) => current.map((card, cardIndex) => cardIndex === index ? value : card));
  return <div className="experiment-stack"><p className="stage-lead">求解器每次合并一对数，把问题从 4 个数缩成 3、2、1 个数；这自然覆盖各种括号结构。</p><div className="button-row">{PRESETS.map((preset) => <button className={preset.every((value, index) => value === cards[index]) ? 'primary' : 'ghost'} type="button" key={preset.join('-')} onClick={() => setCards(preset)}>{preset.join('、')}</button>)}</div><div className="twenty-four-inputs">{cards.map((card, index) => <label key={index}>第 {index + 1} 个数<input type="number" min="1" max="13" value={card} onChange={(event) => update(index, Math.max(1, Math.min(13, event.target.valueAsNumber || 1)))} /></label>)}</div>{result.expression ? <output className="result-good">{result.expression} = 24</output> : <output className="result-warning">在当前固定规则下无解。</output>}<small>搜索了 {result.statesExplored} 个去重后的有理数状态。</small></div>;
}

function FractionStage() {
  const result = solveTwentyFour([3, 3, 8, 8]);
  return <div className="experiment-stack"><p className="stage-lead">3、3、8、8 是检验求解器是否完整的好例子：必须允许中间分数，单纯只保留整数会错误地报告无解。</p><div className="factory-output"><span>精确有理数解</span><strong>{result.expression}</strong><p>= 24</p></div><aside className="evidence-note">内部用约分后的整数分子/分母表示每个值，因此判断相等不依赖浮点误差容忍值。</aside></div>;
}

function SearchStage() {
  const [cards, setCards] = useState<readonly number[]>(PRESETS[0]);
  const result = useMemo(() => solveTwentyFour(cards), [cards]);
  return <div className="experiment-stack"><p className="stage-lead">按“24 种排列 × 4³ 种运算符 × 5 种二叉括号形状”直接列语法式共有 7,680 个候选，但交换律和重复数字会制造许多等价式。</p><div className="button-row">{PRESETS.map((preset) => <button type="button" key={preset.join(':')} onClick={() => setCards(preset)}>{preset.join('、')}</button>)}</div><div className="metric-grid"><div><span>朴素语法候选</span><strong>7,680</strong></div><div><span>当前去重状态</span><strong>{result.statesExplored}</strong></div><div><span>结论</span><strong>{result.expression ? '有解' : '无解'}</strong></div></div><aside className="correction-note"><strong>旧版纠错：</strong>7,680 已经包含 4³ 个运算符选择，不能再乘一次 4³ 写成“约百万次”；“约 79% 有解”也依赖抽牌空间和规则，未核验前不作通用结论。</aside></div>;
}

function ProofStage() {
  const impossible = solveTwentyFour([1, 1, 1, 1]);
  return <div className="experiment-stack"><p className="stage-lead">“我暂时没想到”不等于无解。只有搜索覆盖全部允许运算、括号和排列，并用精确算术逐一排除，才能对这一个固定输入给出无解证书式结论。</p><div className="formula-card"><b>1、1、1、1：{impossible.expression ? '有解' : '无解'}</b><span>穷尽 {impossible.statesExplored} 个去重状态后，没有得到 24。</span></div><aside className="evidence-note">这只证明这一组牌在本实验规则下无解；改变目标数或允许乘方、阶乘后，问题会变成另一个游戏。</aside></div>;
}

export const TWENTY_FOUR_EXPERIMENT: NativeExperiment = { id: 'AL01', stages: [
  { emoji: '🃏', title: '先固定 24 点的完整规则', shortLabel: '规则', Component: RulesStage },
  { emoji: '🧩', title: '递归合并数对寻找解', shortLabel: '求解', Component: SolverStage },
  { emoji: '➗', title: '分数中间值不能丢弃', shortLabel: '分数', Component: FractionStage },
  { emoji: '🌳', title: '比较朴素枚举与状态去重', shortLabel: '搜索', Component: SearchStage },
  { emoji: '✅', title: '穷尽搜索才能说明无解', shortLabel: '无解', Component: ProofStage }
] };

export default function TwentyFourExperiment() { return <StageShell experimentId={TWENTY_FOUR_EXPERIMENT.id} stages={TWENTY_FOUR_EXPERIMENT.stages} />; }
