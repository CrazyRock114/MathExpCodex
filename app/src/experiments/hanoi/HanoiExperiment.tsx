import { useMemo, useState, type CSSProperties } from 'react';
import { StageShell } from '../../components/StageShell';
import { hanoiMinimumMoves, hanoiMoves } from '../math';
import type { NativeExperiment } from '../types';

type PegName = 'A' | 'B' | 'C';
type Pegs = Readonly<Record<PegName, readonly number[]>>;
const PEG_NAMES: readonly PegName[] = ['A', 'B', 'C'];

function initialPegs(disks: number): Pegs {
  return { A: Array.from({ length: disks }, (_, index) => disks - index), B: [], C: [] };
}

function HanoiBoard({ pegs, selected, onPeg }: { readonly pegs: Pegs; readonly selected?: PegName; readonly onPeg?: (peg: PegName) => void }) {
  const maxDisk = Math.max(1, ...PEG_NAMES.flatMap((peg) => pegs[peg]));
  return <div className="hanoi-board" role="group" aria-label="三柱汉诺塔">{PEG_NAMES.map((peg) => <button aria-pressed={selected === peg} disabled={!onPeg} key={peg} onClick={() => onPeg?.(peg)} type="button"><span className="peg-label">{peg}</span><i className="peg-pole" />{pegs[peg].map((disk) => <i className="hanoi-disk" key={disk} style={{ '--disk-width': `${25 + disk / maxDisk * 70}%` } as CSSProperties}><span className="visually-hidden">盘 {disk}</span></i>)}</button>)}</div>;
}

function ManualStage() {
  const disks = 4;
  const [pegs, setPegs] = useState<Pegs>(() => initialPegs(disks));
  const [selected, setSelected] = useState<PegName>();
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState('先选有圆盘的柱，再选目标柱。');
  function choose(peg: PegName) {
    if (!selected) {
      if (!pegs[peg].length) setMessage(`${peg} 柱没有圆盘。`);
      else { setSelected(peg); setMessage(`已选 ${peg} 柱顶盘。`); }
      return;
    }
    if (selected === peg) { setSelected(undefined); setMessage('已取消选择。'); return; }
    const disk = pegs[selected].at(-1)!;
    const targetTop = pegs[peg].at(-1);
    if (targetTop !== undefined && targetTop < disk) {
      setMessage('不合法：大盘不能压在小盘上。');
      setSelected(undefined);
      return;
    }
    setPegs((current) => ({ ...current, [selected]: current[selected].slice(0, -1), [peg]: [...current[peg], disk] }));
    setMoves((current) => current + 1);
    setSelected(undefined);
    setMessage(peg === 'C' && pegs.C.length === disks - 1 ? `完成！最少步数是 ${hanoiMinimumMoves(disks)}。` : `把盘 ${disk} 移到 ${peg}。`);
  }
  return (
    <div className="experiment-stack">
      <p className="stage-lead">目标：把全部圆盘从 A 移到 C。每次只能移动一个柱顶圆盘，而且大盘不能放在小盘上。</p>
      <HanoiBoard onPeg={choose} pegs={pegs} selected={selected} />
      <div className="metric-grid"><div><span>已走步数</span><strong>{moves}</strong></div><div><span>四盘理论最少</span><strong>15</strong></div></div>
      <output className="result-neutral">{message}</output>
      <div className="preset-row"><button onClick={() => { setPegs(initialPegs(disks)); setMoves(0); setSelected(undefined); setMessage('先选有圆盘的柱，再选目标柱。'); }} type="button">重置</button></div>
    </div>
  );
}

function RecurrenceStage() {
  const [disks, setDisks] = useState(5);
  const previous = hanoiMinimumMoves(disks - 1);
  const total = hanoiMinimumMoves(disks);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">要移动最大盘，必须先把上面的 n−1 盘整体挪开；移动最大盘一次；再把 n−1 盘整体搬回来。这三段都无法省略。</p>
      <label className="control-label">盘数 n：{disks}<input max="15" min="1" onChange={(event) => setDisks(event.target.valueAsNumber)} type="range" value={disks} /></label>
      <div className="recursion-flow"><div><b>① 搬走 n−1 盘</b><span>{previous.toString()} 步</span></div><i>+</i><div><b>② 移最大盘</b><span>1 步</span></div><i>+</i><div><b>③ 搬回 n−1 盘</b><span>{previous.toString()} 步</span></div></div>
      <div className="formula-card"><b>T({disks}) = 2T({disks - 1}) + 1 = {total.toString()}</b><span>由数学归纳法可得 T(n)=2ⁿ−1。</span></div>
    </div>
  );
}

function pegsAfter(disks: number, step: number): Pegs {
  const mutable: Record<PegName, number[]> = { A: [...initialPegs(disks).A], B: [], C: [] };
  for (const { disk, from, to } of hanoiMoves(disks).slice(0, step)) {
    mutable[from as PegName].pop();
    mutable[to as PegName].push(disk);
  }
  return mutable;
}

function PlaybackStage() {
  const [disks, setDisks] = useState(4);
  const [step, setStep] = useState(0);
  const moves = useMemo(() => hanoiMoves(disks), [disks]);
  const pegs = pegsAfter(disks, step);
  const current = moves[step - 1];
  return (
    <div className="experiment-stack">
      <p className="stage-lead">沿最短递归方案逐步播放；任意一步后，每根柱上的圆盘仍从下到上由大到小。</p>
      <div className="preset-row">{[3, 4, 5, 6].map((value) => <button aria-pressed={disks === value} key={value} onClick={() => { setDisks(value); setStep(0); }} type="button">{value} 盘</button>)}</div>
      <HanoiBoard pegs={pegs} />
      <label className="control-label">步骤：{step}/{moves.length}<input max={moves.length} min="0" onChange={(event) => setStep(event.target.valueAsNumber)} type="range" value={step} /></label>
      <output className="result-good">{current ? `第 ${step} 步：盘 ${current.disk}，${current.from} → ${current.to}` : '尚未移动'}</output>
    </div>
  );
}

function BinaryStage() {
  const [disks, setDisks] = useState(4);
  const moves = hanoiMoves(disks);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">最短方案第 k 步移动的盘号，等于 k 的二进制末尾“最低位 1”所在位置：奇数步总移动最小盘。</p>
      <label className="control-label">盘数：{disks}<input max="6" min="2" onChange={(event) => setDisks(event.target.valueAsNumber)} type="range" value={disks} /></label>
      <div className="binary-move-grid"><span><b>步</b><b>二进制</b><b>移动盘</b></span>{moves.map((move, index) => <span key={index}><i>{index + 1}</i><code>{(index + 1).toString(2).padStart(disks, '0')}</code><strong>{move.disk}</strong></span>)}</div>
      <aside className="evidence-note">最低位 1 决定“哪一个盘”，但从哪根柱移向哪根柱还取决于盘数奇偶和方案方向。</aside>
    </div>
  );
}

function ScaleStage() {
  const moves = hanoiMinimumMoves(64);
  const years = Number(moves / 31_557_600n);
  return (
    <div className="experiment-stack">
      <p className="stage-lead">指数增长很快：每增加一个盘，最少步数几乎翻倍。</p>
      <div className="table-scroll"><table><caption>一秒一步时的规模</caption><thead><tr><th>盘数</th><th>最少步数</th><th>连续耗时</th></tr></thead><tbody><tr><td>10</td><td>{hanoiMinimumMoves(10).toString()}</td><td>约 17 分钟</td></tr><tr><td>20</td><td>{hanoiMinimumMoves(20).toLocaleString('zh-CN')}</td><td>约 12 天</td></tr><tr><td>30</td><td>{hanoiMinimumMoves(30).toLocaleString('zh-CN')}</td><td>约 34 年</td></tr><tr><td>64</td><td>{moves.toLocaleString('zh-CN')}</td><td>约 {(years / 1e8).toFixed(0)} 亿年</td></tr></tbody></table></div>
      <aside className="correction-note"><strong>旧版纠错：</strong>64 盘约需 5,845 亿年，约为 138 亿年宇宙年龄的 42 倍，不是 4.35 倍。传说是故事背景；2⁶⁴−1 才是由规则推出的数学结论。</aside>
    </div>
  );
}

export const HANOI_EXPERIMENT: NativeExperiment = {
  id: 'AL04',
  stages: [
    { emoji: '🗼', title: '亲手遵守两条移动规则', shortLabel: '挑战', Component: ManualStage },
    { emoji: '🪆', title: '把 n 盘拆成两个 n−1 盘', shortLabel: '递归', Component: RecurrenceStage },
    { emoji: '▶️', title: '逐步播放最短方案', shortLabel: '播放', Component: PlaybackStage },
    { emoji: '0️⃣', title: '移动盘号里的二进制规律', shortLabel: '二进制', Component: BinaryStage },
    { emoji: '⏳', title: '2ⁿ−1 的指数尺度', shortLabel: '规模', Component: ScaleStage }
  ]
};

export default function HanoiExperiment() {
  return <StageShell experimentId={HANOI_EXPERIMENT.id} stages={HANOI_EXPERIMENT.stages} />;
}
