import { useMemo, useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { birthdayMatchProbability } from '../math';
import type { NativeExperiment } from '../types';

function percent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function SurpriseStage() {
  const [people, setPeople] = useState(23);
  const pairs = people * (people - 1) / 2;
  const probability = birthdayMatchProbability(people);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">问题不是“有人和我的生日相同吗”，而是“任意两个人是否同生日”。n 个人之间共有 n(n−1)/2 对比较。</p>
      <label className="control-label">人数：{people}<input max="70" min="1" onChange={(event) => setPeople(event.target.valueAsNumber)} type="range" value={people} /></label>
      <div className="metric-grid"><div><span>人数</span><strong>{people}</strong></div><div><span>两人配对数</span><strong>{pairs}</strong></div><div><span>至少一对同生日</span><strong>{percent(probability)}</strong></div></div>
      {people === 23 && <output className="result-good">23 人时概率约 50.73%，第一次超过 50%。</output>}
    </div>
  );
}

function ComplementStage() {
  const [people, setPeople] = useState(5);
  const factors = Array.from({ length: people }, (_, index) => (365 - index) / 365);
  const allDifferent = factors.reduce((product, factor) => product * factor, 1);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">直接数“至少一次碰撞”会重复。先算所有人生日都不同，再用 1 减去它。</p>
      <label className="control-label">人数：{people}<input max="30" min="1" onChange={(event) => setPeople(event.target.valueAsNumber)} type="range" value={people} /></label>
      <div className="factor-chain" aria-label="生日互不相同的连乘因子">{factors.map((factor, index) => <span key={index}><b>{365 - index}/365</b><small>第 {index + 1} 人避开前 {index} 个日期</small></span>)}</div>
      <div className="formula-card"><b>P(至少一对相同) = 1 − P(全部不同)</b><span>1 − {allDifferent.toFixed(6)} = {percent(1 - allDifferent)}</span></div>
    </div>
  );
}

function CurveStage() {
  const values = Array.from({ length: 70 }, (_, index) => ({ people: index + 1, probability: birthdayMatchProbability(index + 1) }));
  const points = values.map(({ people, probability }) => `${35 + (people - 1) / 69 * 560},${220 - probability * 190}`).join(' ');
  return (
    <div className="experiment-stack">
      <p className="stage-lead">概率曲线先快速上升，再逐渐贴近 100%；23 是越过一半的最小整数人数。</p>
      <figure className="plot-card"><svg aria-label="1 到 70 人至少两人同生日的概率曲线" className="responsive-plot" role="img" viewBox="0 0 630 250"><line className="plot-axis" x1="35" x2="595" y1="220" y2="220" /><line className="target-line" x1="35" x2="595" y1="125" y2="125" /><polyline fill="none" points={points} stroke="#7b4ab1" strokeWidth="3" /><circle cx={35 + 22 / 69 * 560} cy={220 - birthdayMatchProbability(23) * 190} fill="#d1495b" r="5" /><text x="38" y="117">50%</text><text x="35" y="242">1 人</text><text textAnchor="end" x="595" y="242">70 人</text></svg><figcaption>23 人：{percent(birthdayMatchProbability(23))}；50 人：{percent(birthdayMatchProbability(50))}；70 人：{percent(birthdayMatchProbability(70))}。</figcaption></figure>
    </div>
  );
}

function oneGroupHasMatch(people: number) {
  const birthdays = Array.from({ length: people }, () => Math.floor(Math.random() * 365));
  return new Set(birthdays).size < birthdays.length;
}

function SimulationStage() {
  const [people, setPeople] = useState(23);
  const [runs, setRuns] = useState(0);
  const [matches, setMatches] = useState(0);
  function simulate(count: number) {
    let newMatches = 0;
    for (let index = 0; index < count; index += 1) if (oneGroupHasMatch(people)) newMatches += 1;
    setRuns((current) => current + count);
    setMatches((current) => current + newMatches);
  }
  return (
    <div className="experiment-stack">
      <p className="stage-lead">每轮随机生成一间教室。模拟频率会波动；理论概率由模型精确计算。</p>
      <label className="control-label">每间人数：{people}<input max="60" min="2" onChange={(event) => { setPeople(event.target.valueAsNumber); setRuns(0); setMatches(0); }} type="range" value={people} /></label>
      <div className="preset-row"><button onClick={() => simulate(100)} type="button">+100 间教室</button><button onClick={() => simulate(1_000)} type="button">+1,000 间教室</button><button onClick={() => { setRuns(0); setMatches(0); }} type="button">重置</button></div>
      <div className="metric-grid"><div><span>模拟教室</span><strong>{runs.toLocaleString('zh-CN')}</strong></div><div><span>发生同生日</span><strong>{matches.toLocaleString('zh-CN')}</strong></div><div><span>实验频率</span><strong>{runs ? percent(matches / runs) : '—'}</strong></div><div><span>理论概率</span><strong>{percent(birthdayMatchProbability(people))}</strong></div></div>
    </div>
  );
}

function AssumptionStage() {
  const [days, setDays] = useState(365);
  const probability = useMemo(() => birthdayMatchProbability(23, days), [days]);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">50.73% 来自一个清楚的理想模型，而不是对所有现实人群都精确不变的常数。</p>
      <div className="status-card-grid"><article><span className="status-proven">课堂模型</span><h4>均匀、独立、365 天</h4><p>忽略 2 月 29 日，每天同样可能，每个人的生日相互独立。</p></article><article><span className="status-open">现实数据</span><h4>季节与人口结构会改变分布</h4><p>真实出生日期并不完全均匀；双胞胎、年龄结构等还会破坏独立假设。</p></article></div>
      <label className="control-label">假想一年有 {days} 天<input max="500" min="100" onChange={(event) => setDays(event.target.valueAsNumber)} step="5" type="range" value={days} /></label>
      <output className="result-neutral">仍取 23 人时，模型概率变为 {percent(probability)}。</output>
      <aside className="correction-note"><strong>概念纠错：</strong>鸽巢原理要到 366 人才保证同生日；23 人只是概率超过一半，并不保证发生。</aside>
    </div>
  );
}

export const BIRTHDAY_EXPERIMENT: NativeExperiment = {
  id: 'PB01',
  stages: [
    { emoji: '🎂', title: '23 人为什么已经过半', shortLabel: '惊喜', Component: SurpriseStage },
    { emoji: '➖', title: '先算全部不同的补事件', shortLabel: '公式', Component: ComplementStage },
    { emoji: '📈', title: '概率怎样随人数增长', shortLabel: '曲线', Component: CurveStage },
    { emoji: '🎲', title: '模拟许多间教室', shortLabel: '模拟', Component: SimulationStage },
    { emoji: '🧪', title: '理想模型与真实生日', shortLabel: '假设', Component: AssumptionStage }
  ]
};

export default function BirthdayExperiment() {
  return <StageShell experimentId={BIRTHDAY_EXPERIMENT.id} stages={BIRTHDAY_EXPERIMENT.stages} />;
}
