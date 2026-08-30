import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { bayesNaturalFrequencies, bayesPositivePredictiveValue } from '../math';
import type { NativeExperiment } from '../types';

const POPULATION = 10_000;

function FormulaStage() {
  const [prevalence, setPrevalence] = useState(1);
  const [sensitivity, setSensitivity] = useState(99);
  const [specificity, setSpecificity] = useState(95);
  const posterior = bayesPositivePredictiveValue(prevalence / 100, sensitivity / 100, 1 - specificity / 100)!;
  return <div className="experiment-stack"><p className="stage-lead">已知“有条件时测出阳性”的概率，不能直接倒过来当成“阳性后确有条件”的概率；还要加入基准率和假阳性。</p><div className="edge-builder"><label>基准率：{prevalence}%<input min="1" max="20" type="range" value={prevalence} onChange={(event) => setPrevalence(event.target.valueAsNumber)} /></label><label>灵敏度：{sensitivity}%<input min="50" max="100" type="range" value={sensitivity} onChange={(event) => setSensitivity(event.target.valueAsNumber)} /></label><label>特异度：{specificity}%<input min="80" max="100" type="range" value={specificity} onChange={(event) => setSpecificity(event.target.valueAsNumber)} /></label></div><div className="factory-output"><span>阳性预测值 P(条件成立 | 阳性)</span><strong>{(posterior * 100).toFixed(2)}%</strong><p>假阳性率 = {(100 - specificity).toFixed(0)}%</p></div></div>;
}

function FrequencyStage() {
  const values = bayesNaturalFrequencies(POPULATION, .01, .99, .05);
  return <div className="experiment-stack"><p className="stage-lead">把百分比换成 10,000 人的自然频数，更容易看见阳性结果由哪两部分组成。</p><div className="metric-grid"><div><span>条件成立者</span><strong>100 人</strong></div><div><span>真阳性</span><strong>{values.conditionPositive} 人</strong></div><div><span>条件不成立者</span><strong>9,900 人</strong></div><div><span>假阳性</span><strong>{values.conditionNegative} 人</strong></div></div><div className="formula-card"><b>99 / (99 + 495) = 1/6</b><span>594 个阳性结果中，99 个来自条件成立者，所以阳性预测值约 16.67%。</span></div><aside className="correction-note"><strong>旧版纠错：</strong>这里的 99% 是灵敏度 P(+|条件成立)，不是笼统的“准确率”；5% 是假阳性率，不是错误率的全部。</aside></div>;
}

function DirectionStage() {
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  return <div className="experiment-stack"><p className="stage-lead">条件概率有方向。交换竖线两侧的事件，通常会得到完全不同的问题和数值。</p><div className="button-row"><button className={direction === 'forward' ? 'primary' : 'ghost'} onClick={() => setDirection('forward')} type="button">P(阳性 | 条件成立)</button><button className={direction === 'reverse' ? 'primary' : 'ghost'} onClick={() => setDirection('reverse')} type="button">P(条件成立 | 阳性)</button></div>{direction === 'forward' ? <div className="formula-card"><b>灵敏度：99%</b><span>只看条件已成立的人，其中多少会测出阳性。</span></div> : <div className="formula-card"><b>阳性预测值：16.67%</b><span>只看已经测出阳性的人，其中多少确实条件成立。</span></div>}<aside className="evidence-note">Bayes 定理用基准率把第一个方向转换为第二个方向。</aside></div>;
}

function BaseRateStage() {
  const [sensitivity, setSensitivity] = useState(90);
  const [specificity, setSpecificity] = useState(95);
  const rates = [1, 5, 10, 25, 50];
  return <div className="experiment-stack"><p className="stage-lead">即使测试性质不变，换一个基准率不同的人群，阳性预测值也会变化。</p><div className="edge-builder"><label>灵敏度：{sensitivity}%<input min="60" max="100" type="range" value={sensitivity} onChange={(event) => setSensitivity(event.target.valueAsNumber)} /></label><label>特异度：{specificity}%<input min="80" max="100" type="range" value={specificity} onChange={(event) => setSpecificity(event.target.valueAsNumber)} /></label></div><div className="bar-list">{rates.map((rate) => { const value = bayesPositivePredictiveValue(rate / 100, sensitivity / 100, 1 - specificity / 100)! * 100; return <div key={rate}><span>基准率 {rate}%</span><i style={{ width: `${value}%` }} /><b>{value.toFixed(1)}%</b></div>; })}</div></div>;
}

function LimitsStage() {
  return <div className="experiment-stack"><p className="stage-lead">这个实验演示一个理想化二分类模型。真实筛查还会涉及样本选择、阈值、重复测试相关性、损失权衡和专业判断。</p><div className="rule-grid"><div><b>灵敏度</b><span>P(+|条件成立)</span></div><div><b>特异度</b><span>P(−|条件不成立)</span></div><div><b>阳性预测值</b><span>P(条件成立|+)</span></div></div><aside className="correction-note"><strong>旧版纠错：</strong>删除“频率学派与贝叶斯学派”的失真对立，也不由这个玩具模型直接给出“必须二次确认”等医疗建议。</aside><aside className="evidence-note">本页面只用于概率教育，不用于诊断或医疗决策；真实结果应结合具体检测说明与专业人员解释。</aside></div>;
}

export const BAYES_EXPERIMENT: NativeExperiment = { id: 'PB08', stages: [
  { emoji: '🔄', title: '用 Bayes 定理反转条件方向', shortLabel: '公式', Component: FormulaStage },
  { emoji: '👥', title: '把百分比换成自然频数', shortLabel: '频数', Component: FrequencyStage },
  { emoji: '↔️', title: 'P(A|B) 不等于 P(B|A)', shortLabel: '方向', Component: DirectionStage },
  { emoji: '📊', title: '基准率会改变阳性预测值', shortLabel: '基准率', Component: BaseRateStage },
  { emoji: '🩺', title: '数学模型不是医疗建议', shortLabel: '边界', Component: LimitsStage }
] };

export default function BayesExperiment() { return <StageShell experimentId={BAYES_EXPERIMENT.id} stages={BAYES_EXPERIMENT.stages} />; }
