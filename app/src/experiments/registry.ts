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
  ['PR08', lazy(() => import('./pi-algorithms/PiAlgorithmsExperiment'))],
  ['SQ01', lazy(() => import('./fibonacci/FibonacciExperiment'))],
  ['GM01', lazy(() => import('./polygon-angles/PolygonAnglesExperiment'))],
  ['GR01', lazy(() => import('./euler-trail/EulerTrailExperiment'))],
  ['PB01', lazy(() => import('./birthday/BirthdayExperiment'))],
  ['AL04', lazy(() => import('./hanoi/HanoiExperiment'))]
]);
