import { describe, expect, it } from 'vitest';
import { experimentCatalog } from './catalog';

describe('类型化实验目录', () => {
  it('保留全部 148 个唯一 ID', () => {
    expect(experimentCatalog).toHaveLength(148);
    expect(new Set(experimentCatalog.map((experiment) => experiment.id)).size).toBe(148);
  });

  it('保留 119 / 9 / 20 的内容状态构成', () => {
    const counts = { axiom_theorem: 0, conjecture_open: 0, conjecture_proven: 0 };
    for (const experiment of experimentCatalog) counts[experiment.kind] += 1;
    expect(counts).toEqual({ axiom_theorem: 119, conjecture_open: 9, conjecture_proven: 20 });
  });

  it('为每个实验提供迁移所需的结构化教育元数据', () => {
    for (const experiment of experimentCatalog) {
      expect(experiment.stageCount, experiment.id).toBe(5);
      expect(experiment.legacyPath, experiment.id).toBe(`../pages/${experiment.id}.html`);
      expect(experiment.education.gradeBands.length, experiment.id).toBeGreaterThan(0);
      expect(experiment.education.learningObjectives.length, experiment.id).toBeGreaterThan(0);
      expect(experiment.education.prerequisites.length, experiment.id).toBeGreaterThan(0);
      expect(Array.isArray(experiment.searchAliases), experiment.id).toBe(true);
      expect(['unreviewed', 'verified']).toContain(experiment.education.reviewStatus);
    }
  });

  it('仅把已经逐项核验的首批实验标记为已核验', () => {
    const verified = experimentCatalog
      .filter((experiment) => experiment.education.reviewStatus === 'verified')
      .map((experiment) => experiment.id);
    expect(verified).toEqual(['PR01', 'PR02', 'PR03']);
    expect(experimentCatalog.filter((experiment) => experiment.education.reviewStatus === 'unreviewed')).toHaveLength(145);
  });
});
