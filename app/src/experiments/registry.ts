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
  ['SQ07', lazy(() => import('./pascal/PascalExperiment'))],
  ['SQ09', lazy(() => import('./triangular-square/TriangularSquareExperiment'))],
  ['GM01', lazy(() => import('./polygon-angles/PolygonAnglesExperiment'))],
  ['GM03', lazy(() => import('./heron/HeronExperiment'))],
  ['GM04', lazy(() => import('./sphere/SphereExperiment'))],
  ['GR01', lazy(() => import('./euler-trail/EulerTrailExperiment'))],
  ['GR02', lazy(() => import('./tsp/TspExperiment'))],
  ['GR07', lazy(() => import('./pigeonhole/PigeonholeExperiment'))],
  ['PB01', lazy(() => import('./birthday/BirthdayExperiment'))],
  ['PB02', lazy(() => import('./monty-hall/MontyHallExperiment'))],
  ['PB03', lazy(() => import('./binomial/BinomialExperiment'))],
  ['AL01', lazy(() => import('./twenty-four/TwentyFourExperiment'))],
  ['AL04', lazy(() => import('./hanoi/HanoiExperiment'))],
  ['AL07', lazy(() => import('./binary-search/BinarySearchExperiment'))]
]);
