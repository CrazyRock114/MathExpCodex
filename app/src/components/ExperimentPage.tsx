import {
  EXPERIMENT_KIND_LABELS,
  GRADE_BAND_LABELS,
  type ExperimentSummary
} from '../data/experiment';
import { nativeExperimentById } from '../experiments/registry';
import { StageShell } from './StageShell';

interface ExperimentPageProps {
  readonly experiment: ExperimentSummary | undefined;
  readonly requestedId: string;
}

export function ExperimentPage({ experiment, requestedId }: ExperimentPageProps) {
  if (!experiment) {
    return (
      <div className="page-shell narrow-page">
        <a className="back-link" href="#/">← 返回实验目录</a>
        <h1>没有找到实验 {requestedId}</h1>
        <p>请检查链接，或从完整目录重新选择。</p>
      </div>
    );
  }

  const nativeExperiment = nativeExperimentById.get(experiment.id);

  return (
    <article className="page-shell narrow-page">
      <a className="back-link" href="#/">← 返回实验目录</a>
      <header className="experiment-header">
        <div className="card-meta"><span>{experiment.category}</span><span>{experiment.id}</span></div>
        <h1>{experiment.title}</h1>
        <p>{experiment.intro}</p>
      </header>

      {nativeExperiment ? (
        <StageShell experimentId={experiment.id} stages={nativeExperiment.stages} />
      ) : null}

      <section className="detail-section" aria-labelledby="learning-heading">
        <h2 id="learning-heading">学习设计</h2>
        <dl className="detail-list">
          <div><dt>推荐学段</dt><dd>{experiment.education.gradeBands.map((band) => GRADE_BAND_LABELS[band]).join('、')}</dd></div>
          <div><dt>内容状态</dt><dd>{EXPERIMENT_KIND_LABELS[experiment.kind]}</dd></div>
          <div><dt>前置知识</dt><dd>{experiment.education.prerequisites.join('、')}</dd></div>
          <div><dt>审阅状态</dt><dd>{experiment.education.reviewStatus === 'verified' ? '已核验' : '待核验'}</dd></div>
        </dl>
        <h3>学习目标</h3>
        <ul>{experiment.education.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
      </section>

      <section className="detail-section" aria-labelledby="sources-heading">
        <h2 id="sources-heading">来源与审阅</h2>
        {experiment.education.sources.length > 0 ? (
          <ul>
            {experiment.education.sources.map((source) => (
              <li key={source.url}><a href={source.url}>{source.label}</a></li>
            ))}
          </ul>
        ) : (
          <p className="review-warning">该实验尚未完成权威来源核验，当前内容仅用于迁移审查。</p>
        )}
      </section>

      <section className="legacy-launch" aria-labelledby="interactive-heading">
        <h2 id="interactive-heading">{nativeExperiment ? '旧版实验对照' : '开始互动实验'}</h2>
        <p>
          {nativeExperiment
            ? '上方是经过内容核验的 React 原生实验；旧页面暂时保留，便于迁移期间对照。'
            : '共享互动组件仍在迁移中；现阶段打开经过 148 页回归测试的旧版实验。'}
        </p>
        <a className="primary-link" href={experiment.legacyPath}>打开 {experiment.id} 旧版实验</a>
      </section>
    </article>
  );
}
