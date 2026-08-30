import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type NativeExperimentView = LazyExoticComponent<ComponentType>;

export const nativeExperimentById: ReadonlyMap<string, NativeExperimentView> = new Map([
  ['PR01', lazy(() => import('./buffon/BuffonExperiment'))],
  ['PR02', lazy(() => import('./collatz/CollatzExperiment'))],
  ['PR03', lazy(() => import('./pythagorean/PythagoreanExperiment'))],
  ['PR04', lazy(() => import('./four-color/FourColorExperiment'))],
  ['PR05', lazy(() => import('./ramsey/RamseyExperiment'))],
  ['PR06', lazy(() => import('./goldbach/GoldbachExperiment'))],
  ['PR07', lazy(() => import('./twin-prime/TwinPrimeExperiment'))],
  ['PR08', lazy(() => import('./pi-algorithms/PiAlgorithmsExperiment'))]
]);
