import type { NativeExperiment } from './types';
import { BUFFON_EXPERIMENT } from './buffon/BuffonExperiment';
import { COLLATZ_EXPERIMENT } from './collatz/CollatzExperiment';
import { PYTHAGOREAN_EXPERIMENT } from './pythagorean/PythagoreanExperiment';

const nativeExperiments: readonly NativeExperiment[] = [
  BUFFON_EXPERIMENT,
  COLLATZ_EXPERIMENT,
  PYTHAGOREAN_EXPERIMENT
];

export const nativeExperimentById: ReadonlyMap<string, NativeExperiment> = new Map(
  nativeExperiments.map((experiment) => [experiment.id, experiment])
);
