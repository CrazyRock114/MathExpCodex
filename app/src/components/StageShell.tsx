import { useId, useState } from 'react';
import type { ExperimentStage } from '../experiments/types';

interface StageShellProps {
  readonly experimentId: string;
  readonly stages: readonly ExperimentStage[];
}

export function StageShell({ experimentId, stages }: StageShellProps) {
  const [activeStage, setActiveStage] = useState(0);
  const instanceId = useId().replaceAll(':', '');

  return (
    <section className="stage-shell" aria-labelledby={`${instanceId}-stage-heading`}>
      <div className="stage-shell-heading">
        <div>
          <p className="eyebrow">原生互动 · {experimentId}</p>
          <h2 id={`${instanceId}-stage-heading`}>五步实验</h2>
        </div>
        <p aria-live="polite">第 {activeStage + 1} / {stages.length} 步</p>
      </div>

      <div className="stage-tabs" role="tablist" aria-label={`${experimentId} 实验步骤`}>
        {stages.map((stage, index) => (
          <button
            aria-controls={`${instanceId}-panel-${index}`}
            aria-selected={activeStage === index}
            className={activeStage === index ? 'stage-tab active' : 'stage-tab'}
            id={`${instanceId}-tab-${index}`}
            key={stage.title}
            onClick={() => setActiveStage(index)}
            onKeyDown={(event) => {
              const keyOffsets: Readonly<Record<string, number>> = { ArrowLeft: -1, ArrowRight: 1 };
              let nextIndex = index;
              if (event.key === 'Home') nextIndex = 0;
              else if (event.key === 'End') nextIndex = stages.length - 1;
              else if (event.key in keyOffsets) nextIndex = (index + (keyOffsets[event.key] ?? 0) + stages.length) % stages.length;
              else return;
              event.preventDefault();
              setActiveStage(nextIndex);
              const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
              buttons?.[nextIndex]?.focus();
            }}
            role="tab"
            tabIndex={activeStage === index ? 0 : -1}
            type="button"
          >
            <span aria-hidden="true">{stage.emoji}</span>
            <span><b>{index + 1}</b> {stage.shortLabel}</span>
          </button>
        ))}
      </div>

      {stages.map(({ Component, title }, index) => (
        <div
          aria-labelledby={`${instanceId}-tab-${index}`}
          className="stage-panel"
          hidden={activeStage !== index}
          id={`${instanceId}-panel-${index}`}
          key={title}
          role="tabpanel"
          tabIndex={0}
        >
          <h3>{stages[index]?.emoji} {title}</h3>
          <Component />
          <div className="stage-navigation" aria-label="步骤导航">
            <button
              disabled={index === 0}
              onClick={() => setActiveStage(index - 1)}
              type="button"
            >
              ← 上一步
            </button>
            <button
              disabled={index === stages.length - 1}
              onClick={() => setActiveStage(index + 1)}
              type="button"
            >
              下一步 →
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
