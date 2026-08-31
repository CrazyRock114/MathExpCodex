import { useDeferredValue, useMemo, useState } from 'react';
import { categories, experimentCatalog } from '../data/catalog';
import {
  EXPERIMENT_KIND_LABELS,
  GRADE_BAND_LABELS,
  type ExperimentKind
} from '../data/experiment';

const ALL_KINDS = 'all';
const ALL_CATEGORIES = 'all';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<ExperimentKind | typeof ALL_KINDS>(ALL_KINDS);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('zh-CN'));

  const filteredExperiments = useMemo(
    () =>
      experimentCatalog.filter((experiment) => {
        if (kind !== ALL_KINDS && experiment.kind !== kind) return false;
        if (category !== ALL_CATEGORIES && experiment.category !== category) return false;
        if (!deferredQuery) return true;
        const searchable = `${experiment.id} ${experiment.title} ${experiment.intro} ${experiment.category} ${experiment.searchAliases.join(' ')}`;
        return searchable.toLocaleLowerCase('zh-CN').includes(deferredQuery);
      }),
    [category, deferredQuery, kind]
  );

  return (
    <div className="page-shell">
      <section className="hero" aria-labelledby="catalog-heading">
        <p className="eyebrow">K12 交互式数学实验</p>
        <h1 id="catalog-heading">148 个实验，一条由浅入深的探索路径</h1>
        <p>
          先观察，再动手，最后用语言和符号解释。当前目录明确标出内容状态与审阅状态，避免把研究问题误当成已证事实。
        </p>
        <dl className="summary-grid">
          <div><dt>全部</dt><dd>148</dd></div>
          <div><dt>基础内容</dt><dd>119</dd></div>
          <div><dt>未解猜想</dt><dd>9</dd></div>
          <div><dt>已证猜想</dt><dd>20</dd></div>
        </dl>
      </section>

      <section className="catalog-controls" aria-label="筛选数学实验">
        <label>
          <span>搜索</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入实验名称、ID 或关键词"
          />
        </label>
        <label>
          <span>内容状态</span>
          <select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
            <option value={ALL_KINDS}>全部状态</option>
            {Object.entries(EXPERIMENT_KIND_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>主题</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value={ALL_CATEGORIES}>全部主题</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </section>

      <p className="result-count" aria-live="polite">
        找到 {filteredExperiments.length} 个实验
      </p>

      <section className="experiment-grid" aria-label="实验目录">
        {filteredExperiments.map((experiment) => (
          <article className="experiment-card" key={experiment.id}>
            <div className="card-meta">
              <span>{experiment.category}</span>
              <span>{experiment.id}</span>
            </div>
            <h2><a href={experiment.pagePath}>{experiment.title}</a></h2>
            <p>{experiment.intro}</p>
            <div className="chip-row" aria-label="推荐学段">
              {experiment.education.gradeBands.map((band) => (
                <span className="chip" key={band}>{GRADE_BAND_LABELS[band]}</span>
              ))}
              <span className="chip chip-muted">{experiment.stageCount} 步</span>
            </div>
            <p className={`review-status review-${experiment.education.reviewStatus}`}>
              内容状态：{EXPERIMENT_KIND_LABELS[experiment.kind]} · 教学审阅：
              {experiment.education.reviewStatus === 'verified' ? '已核验' : '待核验'}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
