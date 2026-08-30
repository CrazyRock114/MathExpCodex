import { useState } from 'react';
import { StageShell } from '../../components/StageShell';
import { montyHallTheoreticalRates, simulateMontyHall } from '../math';
import type { NativeExperiment } from '../types';

function RulesStage() {
  const [car, setCar] = useState(() => Math.floor(Math.random() * 3));
  const [choice, setChoice] = useState<number | null>(null);
  const [opened, setOpened] = useState<number | null>(null);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const choose = (door: number) => {
    const candidates = [0, 1, 2].filter((candidate) => candidate !== door && candidate !== car);
    setChoice(door); setOpened(candidates[Math.floor(Math.random() * candidates.length)]!); setFinalChoice(null);
  };
  const reset = () => { setCar(Math.floor(Math.random() * 3)); setChoice(null); setOpened(null); setFinalChoice(null); };
  const switched = choice !== null && opened !== null ? [0, 1, 2].find((door) => door !== choice && door !== opened)! : null;
  return <div className="experiment-stack">
    <p className="stage-lead">标准规则必须完整：汽车等可能放置；主持人知道位置；总开一扇未选的羊门；总让你换；有两扇可开时随机选择。</p>
    <div className="monty-doors">{[0, 1, 2].map((door) => <button aria-label={`选择 ${door + 1} 号门`} disabled={choice !== null} key={door} onClick={() => choose(door)} type="button"><span>{opened === door ? '🐐' : finalChoice !== null && car === door ? '🚗' : '🚪'}</span><b>{door + 1} 号门</b>{choice === door && <small>最初选择</small>}</button>)}</div>
    {choice === null ? <output className="result-warning">先选一扇门。</output> : finalChoice === null ? <div className="button-row"><button type="button" className="ghost" onClick={() => setFinalChoice(choice)}>不换</button><button type="button" className="primary" onClick={() => setFinalChoice(switched)}>换到 {Number(switched) + 1} 号门</button></div> : <><output className={finalChoice === car ? 'result-good' : 'result-warning'}>{finalChoice === car ? '赢得汽车！' : '这局选到羊。'} 策略概率要看很多局，而不是由这一局决定。</output><button className="ghost" onClick={reset} type="button">再玩一局</button></>}
  </div>;
}

function CasesStage() {
  const [initialDoor, setInitialDoor] = useState(1);
  return <div className="experiment-stack">
    <p className="stage-lead">固定最初选择后，汽车有三个等可能位置。换门只在最初就选中汽车的那一种情况输，其余两种都赢。</p>
    <div className="button-row">{[1, 2, 3].map((door) => <button className={initialDoor === door ? 'primary' : 'ghost'} key={door} onClick={() => setInitialDoor(door)} type="button">先选 {door} 号</button>)}</div>
    <table className="data-table"><thead><tr><th>汽车位置</th><th>不换</th><th>换门</th></tr></thead><tbody>{[1, 2, 3].map((car) => <tr key={car}><td>{car} 号门</td><td>{car === initialDoor ? '赢' : '输'}</td><td>{car === initialDoor ? '输' : '赢'}</td></tr>)}</tbody></table>
    <div className="metric-grid"><div><span>不换</span><strong>1/3</strong></div><div><span>换门</span><strong>2/3</strong></div><div><span>原因</span><strong>最初选错的 2 种情况被转成胜利</strong></div></div>
  </div>;
}

function SimulationStage() {
  const [trials, setTrials] = useState(1_000);
  const [result, setResult] = useState(() => simulateMontyHall(1_000));
  const run = (count = trials) => { setTrials(count); setResult(simulateMontyHall(count)); };
  return <div className="experiment-stack">
    <p className="stage-lead">在同一批随机游戏上同时比较“不换”和“换门”。两种策略在每一局恰好一赢一输。</p>
    <label className="control-label">模拟次数：{trials}<input min="100" max="20_000" step="100" type="range" value={trials} onChange={(event) => setTrials(event.target.valueAsNumber)} /></label>
    <div className="button-row"><button className="primary" onClick={() => run()} type="button">重新模拟</button><button className="ghost" onClick={() => run(10_000)} type="button">跑 10,000 局</button></div>
    <div className="metric-grid"><div><span>不换胜率</span><strong>{(result.stayWins / result.trials * 100).toFixed(2)}%</strong></div><div><span>换门胜率</span><strong>{(result.switchWins / result.trials * 100).toFixed(2)}%</strong></div><div><span>理论值</span><strong>33.33% / 66.67%</strong></div></div>
  </div>;
}

function ManyDoorsStage() {
  const [doors, setDoors] = useState(100);
  const rates = montyHallTheoreticalRates(doors);
  return <div className="experiment-stack">
    <p className="stage-lead">推广为 N 扇门：你先选一扇；主持人按同样规则打开 N−2 扇羊门，只留下你的门和另一扇门。</p>
    <label className="control-label">门数 N：{doors}<input min="3" max="100" type="range" value={doors} onChange={(event) => setDoors(event.target.valueAsNumber)} /></label>
    <div className="metric-grid"><div><span>最初选对 / 不换胜率</span><strong>{(rates.stay * 100).toFixed(2)}%</strong></div><div><span>最初选错 / 换门胜率</span><strong>{(rates.switch * 100).toFixed(2)}%</strong></div><div><span>主持人打开</span><strong>{doors - 2} 扇羊门</strong></div></div>
    <div className="probability-meter"><i style={{ width: `${rates.switch * 100}%` }} /><span>换门 {(rates.switch * 100).toFixed(2)}%</span></div>
  </div>;
}

function ProtocolStage() {
  const [protocol, setProtocol] = useState<'standard' | 'uninformed'>('standard');
  return <div className="experiment-stack">
    <p className="stage-lead">看到一扇羊门本身还不够；主持人是“必定如此行动”，还是“不知情地随机开门后碰巧开到羊”，会改变条件概率。</p>
    <div className="button-row"><button className={protocol === 'standard' ? 'primary' : 'ghost'} onClick={() => setProtocol('standard')} type="button">知情且必开羊门</button><button className={protocol === 'uninformed' ? 'primary' : 'ghost'} onClick={() => setProtocol('uninformed')} type="button">不知情随机开门</button></div>
    {protocol === 'standard' ? <div className="formula-card"><b>标准协议：换门 2/3</b><span>主持人的动作是规则的一部分；最初选错的全部 2/3 情况都会把你导向汽车。</span></div> : <div className="formula-card"><b>已知随机主持人碰巧开到羊：换门 1/2</b><span>最初选对并开羊、最初选错且碰巧开羊这两类条件化后的权重相同；若他开出汽车，游戏不会到换门这一步。</span></div>}
    <aside className="correction-note"><strong>旧版纠错：</strong>原来的 “P(汽车｜另一门)=1×(2/3)/1” 不是完整的贝叶斯计算。先写清协议，再用样本空间或条件概率表推导。</aside>
  </div>;
}

export const MONTY_HALL_EXPERIMENT: NativeExperiment = { id: 'PB02', stages: [
  { emoji: '🚪', title: '先把主持人规则说完整', shortLabel: '规则', Component: RulesStage },
  { emoji: '🌳', title: '枚举三个等可能位置', shortLabel: '枚举', Component: CasesStage },
  { emoji: '🎲', title: '用同一批游戏比较策略', shortLabel: '模拟', Component: SimulationStage },
  { emoji: '💯', title: '推广到 N 扇门', shortLabel: '推广', Component: ManyDoorsStage },
  { emoji: '🧠', title: '协议不同，条件概率不同', shortLabel: '协议', Component: ProtocolStage }
] };

export default function MontyHallExperiment() { return <StageShell experimentId={MONTY_HALL_EXPERIMENT.id} stages={MONTY_HALL_EXPERIMENT.stages} />; }
