import { EXPERIMENT_CATALOG } from './catalog.generated';
import type { ExperimentSummary } from './experiment';
import { REVIEWED_EXPERIMENT_OVERRIDES } from './reviewed-overrides';

export const experimentCatalog: readonly ExperimentSummary[] = EXPERIMENT_CATALOG.map(
  (experiment) => {
    const override = REVIEWED_EXPERIMENT_OVERRIDES[experiment.id];
    return override ? { ...experiment, ...override } : experiment;
  }
);

export const catalogById: ReadonlyMap<string, ExperimentSummary> = new Map(
  experimentCatalog.map((experiment) => [experiment.id, experiment])
);

export const categories = Array.from(
  new Set(experimentCatalog.map((experiment) => experiment.category))
).toSorted((left, right) => left.localeCompare(right, 'zh-CN'));
