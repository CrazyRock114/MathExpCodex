import type { ComponentType } from 'react';

export interface ExperimentStage {
  readonly emoji: string;
  readonly title: string;
  readonly shortLabel: string;
  readonly Component: ComponentType;
}

export interface NativeExperiment {
  readonly id: string;
  readonly stages: readonly ExperimentStage[];
}
