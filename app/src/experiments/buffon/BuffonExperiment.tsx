import { useId, useMemo, useState } from 'react';
import {
  buffonCrossingProbability,
  createBuffonTrial,
  estimatePi,
  type BuffonTrial
} from '../math';
import type { NativeExperiment } from '../types';

function CircleStage() {
  const [diameter, setDiameter] = useState(100);
  const circumference = Math.PI * diameter;
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">π 是圆周长与直径的固定比值。改变圆的大小，这个比值不会改变。</p>
        <label className="control-label">直径：{diameter}
          <input max="200" min="20" onChange={(event) => setDiameter(event.target.valueAsNumber)} type="range" value={diameter} />
        </label>
        <div className="formula-card"><b>周长 = π × 直径</b><span>{circumference.toFixed(2)} = π × {diameter}</span><span>周长 ÷ 直径 = {Math.PI.toFixed(5)}</span></div>
      </div>
      <figure className="circle-demo">
        <svg aria-label={`直径为 ${diameter} 的圆`} role="img" viewBox="0 0 220 220">
          <circle cx="110" cy="110" fill="#e7edff" r={diameter / 2} stroke="#3157d5" strokeWidth="4" />
          <line x1={110 - diameter / 2} x2={110 + diameter / 2} y1="110" y2="110" />
          <text x="110" y="100" textAnchor="middle">d={diameter}</text>
        </svg>
        <figcaption>圆大小改变，周长与直径同时按比例改变。</figcaption>
      </figure>
    </div>
  );
}

function NeedleConditionStage() {
  const [angle, setAngle] = useState(60);
  const [distance, setDistance] = useState(20);
  const length = 80;
  const spacing = 100;
  const projection = Math.abs(Math.sin(angle * Math.PI / 180)) * length / 2;
  const crosses = distance <= projection;
  const centerY = 20 + distance * 1.6;
  const halfX = Math.cos(angle * Math.PI / 180) * length * 1.6 / 2;
  const halfY = Math.sin(angle * Math.PI / 180) * length * 1.6 / 2;
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">只看针中心到最近平行线的距离 y，与半根针的垂直投影 (L/2)|sinθ|。投影够到线就跨线。</p>
        <label className="control-label">角度 θ：{angle}°
          <input max="180" min="0" onChange={(event) => setAngle(event.target.valueAsNumber)} type="range" value={angle} />
        </label>
        <label className="control-label">中心到最近线距离 y：{distance}
          <input max="50" min="0" onChange={(event) => setDistance(event.target.valueAsNumber)} type="range" value={distance} />
        </label>
        <output className={crosses ? 'result-good' : 'result-neutral'}>
          投影 {projection.toFixed(1)} {crosses ? '≥' : '<'} 距离 {distance}：{crosses ? '跨线' : '不跨线'}
        </output>
      </div>
      <figure className="needle-card">
        <svg aria-label={crosses ? '针跨过平行线' : '针没有跨过平行线'} role="img" viewBox="0 0 320 200">
          {[20, 180].map((y) => <line className="paper-line" key={y} x1="0" x2="320" y1={y} y2={y} />)}
          <line className={crosses ? 'needle hit' : 'needle'} x1={160 - halfX} x2={160 + halfX} y1={centerY + halfY} y2={centerY - halfY} />
          <circle cx="160" cy={centerY} r="5" />
          <line className="distance-guide" x1="160" x2="160" y1="20" y2={centerY} />
        </svg>
        <figcaption>本图固定 L=80、d=100，因此满足短针条件 L≤d。</figcaption>
      </figure>
    </div>
  );
}

interface DisplayTrial extends BuffonTrial { readonly x: number; }

function TrialBoard({ trials }: { readonly trials: readonly DisplayTrial[] }) {
  return (
    <svg aria-label={`最近 ${trials.length} 根针，其中 ${trials.filter((trial) => trial.crosses).length} 根跨线`} className="needle-board" role="img" viewBox="0 0 520 240">
      {[20, 120, 220].map((y) => <line className="paper-line" key={y} x1="0" x2="520" y1={y} y2={y} />)}
      {trials.slice(-80).map((trial, index) => {
        const x = 12 + trial.x * 496;
        const baseLine = index % 2 === 0 ? 20 : 120;
        const centerY = baseLine + trial.distanceToLine / .5 * 50;
        const halfX = Math.cos(trial.angle) * 50;
        const halfY = Math.sin(trial.angle) * 50;
        return <line className={trial.crosses ? 'needle hit' : 'needle'} key={index} x1={x - halfX} x2={x + halfX} y1={centerY - halfY} y2={centerY + halfY} />;
      })}
    </svg>
  );
}

function FrequencyStage() {
  const [trials, setTrials] = useState<readonly DisplayTrial[]>([]);
  const hits = trials.filter((trial) => trial.crosses).length;
  function addTrials(count: number) {
    setTrials((current) => [...current, ...Array.from({ length: count }, () => ({ ...createBuffonTrial(1, 1), x: Math.random() }))]);
  }
  return (
    <div className="experiment-stack">
      <p className="stage-lead">单次结果没有“接近 64%”的说法；积累许多独立投掷后，跨线频率才通常接近理论概率 2/π≈63.66%。</p>
      <div className="preset-row"><button onClick={() => addTrials(10)} type="button">+10 根</button><button onClick={() => addTrials(100)} type="button">+100 根</button><button onClick={() => setTrials([])} type="button">重置</button></div>
      <TrialBoard trials={trials} />
      <div className="metric-grid">
        <div><span>总针数</span><strong>{trials.length}</strong></div>
        <div><span>跨线数</span><strong>{hits}</strong></div>
        <div><span>实验频率</span><strong>{trials.length ? `${(hits / trials.length * 100).toFixed(1)}%` : '—'}</strong></div>
        <div><span>理论概率</span><strong>{(2 / Math.PI * 100).toFixed(2)}%</strong></div>
      </div>
    </div>
  );
}

function FormulaStage() {
  const [length, setLength] = useState(60);
  const [spacing, setSpacing] = useState(100);
  const probability = buffonCrossingProbability(length, spacing);
  return (
    <div className="experiment-stack split-experiment">
      <div>
        <p className="stage-lead">角度在 0 到 π 之间均匀，中心到最近线的距离在 0 到 d/2 之间均匀。把所有会跨线的 (θ,y) 情况加起来，就得到短针公式。</p>
        <label className="control-label">针长 L：{length}
          <input max={spacing} min="10" onChange={(event) => setLength(event.target.valueAsNumber)} type="range" value={length} />
        </label>
        <label className="control-label">线距 d：{spacing}
          <input max="150" min={Math.max(40, length)} onChange={(event) => setSpacing(event.target.valueAsNumber)} type="range" value={spacing} />
        </label>
      </div>
      <div className="factory-output">
        <span>理论跨线概率</span><strong>{(probability * 100).toFixed(2)}%</strong><p>P = 2L/(πd)</p>
      </div>
      <aside className="correction-note full-span"><strong>适用条件：</strong>这里始终限制 0&lt;L≤d。旧实验中“L=100、d=80 仍直接套短针公式”的玩法不成立；长针情形需要另一条公式。</aside>
    </div>
  );
}

interface EstimateState {
  readonly total: number;
  readonly hits: number;
  readonly history: readonly { readonly total: number; readonly estimate: number }[];
}

function EstimatePlot({ history }: { readonly history: EstimateState['history'] }) {
  const titleId = useId();
  const maxTotal = Math.max(1, history.at(-1)?.total ?? 1);
  const points = history.map((point) => {
    const x = 35 + point.total / maxTotal * 560;
    const y = 115 - Math.max(-1, Math.min(1, point.estimate - Math.PI)) * 70;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg aria-labelledby={titleId} className="responsive-plot" role="img" viewBox="0 0 630 230">
      <title id={titleId}>随着投针次数增加的 π 估计值</title>
      <line className="target-line" x1="35" x2="595" y1="115" y2="115" />
      <text x="40" y="108">π</text>
      <polyline fill="none" points={points} stroke="#d1495b" strokeWidth="3" />
    </svg>
  );
}

function EstimateStage() {
  const [state, setState] = useState<EstimateState>({ total: 0, hits: 0, history: [] });
  function runBatch(count: number) {
    setState((current) => {
      let hits = current.hits;
      const history = [...current.history];
      for (let index = 1; index <= count; index += 1) {
        if (createBuffonTrial(1, 1).crosses) hits += 1;
        const total = current.total + index;
        if (index === count || index % Math.max(10, count / 20) === 0) {
          const estimate = estimatePi(total, hits);
          if (estimate !== null) history.push({ total, estimate });
        }
      }
      return { total: current.total + count, hits, history: history.slice(-120) };
    });
  }
  const piEstimate = estimatePi(state.total, state.hits);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">把 P≈命中数/总数代回 π=2LN/(nd)。样本更多时误差通常缩小，但随机波动可能让某一批之后暂时更不准。</p>
      <div className="preset-row"><button onClick={() => runBatch(100)} type="button">+100 根</button><button onClick={() => runBatch(1_000)} type="button">+1,000 根</button><button onClick={() => setState({ total: 0, hits: 0, history: [] })} type="button">重置</button></div>
      <EstimatePlot history={state.history} />
      <div className="metric-grid">
        <div><span>总针数 N</span><strong>{state.total.toLocaleString('zh-CN')}</strong></div>
        <div><span>跨线数 n</span><strong>{state.hits.toLocaleString('zh-CN')}</strong></div>
        <div><span>π 估值</span><strong>{piEstimate?.toFixed(5) ?? '—'}</strong></div>
        <div><span>绝对误差</span><strong>{piEstimate === null ? '—' : Math.abs(piEstimate - Math.PI).toFixed(5)}</strong></div>
      </div>
    </div>
  );
}

export const BUFFON_EXPERIMENT: NativeExperiment = {
  id: 'PR01',
  stages: [
    { emoji: '⭕', title: 'π 是圆的固定比值', shortLabel: '认识 π', Component: CircleStage },
    { emoji: '📍', title: '一根针何时跨线', shortLabel: '跨线', Component: NeedleConditionStage },
    { emoji: '🎲', title: '从随机结果到频率', shortLabel: '频率', Component: FrequencyStage },
    { emoji: '🧮', title: '短针公式与适用条件', shortLabel: '公式', Component: FormulaStage },
    { emoji: '🎯', title: '用频率反推 π', shortLabel: '估算', Component: EstimateStage }
  ]
};
