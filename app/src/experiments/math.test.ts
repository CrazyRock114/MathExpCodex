import { describe, expect, it } from 'vitest';
import {
  archimedesPiBounds,
  buffonCrossingProbability,
  chudnovskyPi,
  collatzSequence,
  completeGraphEdges,
  countMonochromaticTriangles,
  createBuffonTrial,
  createPythagoreanTriple,
  estimatePi,
  goldbachPartitions,
  leibnizPi,
  machinPi,
  ramseyAvoidingColoringCount,
  twinPrimePairs,
  primitiveTriplesThrough
} from './math';

describe('布丰投针模型', () => {
  it('只在短针前提下使用 2L/(πd)', () => {
    expect(buffonCrossingProbability(1, 1)).toBeCloseTo(2 / Math.PI, 12);
    expect(() => buffonCrossingProbability(1.1, 1)).toThrow(/L ≤ d/);
  });

  it('用角度与最近线距离判断跨线', () => {
    const values = [0.5, 0.1];
    const trial = createBuffonTrial(1, 1, () => values.shift() ?? 0);
    expect(trial.angle).toBeCloseTo(Math.PI / 2);
    expect(trial.crosses).toBe(true);
    expect(estimatePi(1_000, 637)).toBeCloseTo(3.1397, 3);
  });
});

describe('拉姆齐图与素数实验', () => {
  it('精确复现 R(3,3)=6 的小图计数', () => {
    expect(completeGraphEdges(6)).toHaveLength(15);
    expect(countMonochromaticTriangles(3, [0, 0, 0])).toBe(1);
    expect(ramseyAvoidingColoringCount(4)).toEqual({ avoiding: 18, total: 64 });
    expect(ramseyAvoidingColoringCount(5)).toEqual({ avoiding: 12, total: 1_024 });
    expect(ramseyAvoidingColoringCount(6)).toEqual({ avoiding: 0, total: 32_768 });
  });

  it('复现哥德巴赫分拆数和孪生素数计数', () => {
    expect(goldbachPartitions(100)).toHaveLength(6);
    expect(goldbachPartitions(100)).toContainEqual([3, 97]);
    expect(twinPrimePairs(100)).toHaveLength(8);
    expect(twinPrimePairs(1_000)).toHaveLength(35);
    expect(twinPrimePairs(10_000)).toHaveLength(205);
  });
});

describe('π 算法', () => {
  it('阿基米德上下界夹住 π 并随边数收紧', () => {
    const bounds = archimedesPiBounds(96);
    expect(bounds.lower).toBeLessThan(Math.PI);
    expect(bounds.upper).toBeGreaterThan(Math.PI);
    expect(bounds.upper - bounds.lower).toBeLessThan(0.002);
  });

  it('Machin 和 Chudnovsky 比 Leibniz 更快达到双精度极限', () => {
    expect(Math.abs(leibnizPi(10_000) - Math.PI)).toBeGreaterThan(1e-5);
    expect(machinPi(10)).toBeCloseTo(Math.PI, 12);
    expect(chudnovskyPi(2)).toBeCloseTo(Math.PI, 13);
  });
});

describe('科拉茨轨道', () => {
  it('准确计算经典起点的总步数和峰值', () => {
    const path = collatzSequence(27);
    expect(path).toHaveLength(112);
    expect(path.length - 1).toBe(111);
    expect(Math.max(...path)).toBe(9_232);
    expect(path.at(-1)).toBe(1);
  });
});

describe('欧几里得勾股数公式', () => {
  it('构造并识别本原与非本原勾股数', () => {
    expect(createPythagoreanTriple(2, 1)).toMatchObject({ a: 3, b: 4, c: 5, primitive: true });
    expect(createPythagoreanTriple(4, 2)).toMatchObject({ a: 12, b: 16, c: 20, primitive: false });
  });

  it('c ≤ 1000 时共有 158 组本原勾股数', () => {
    const triples = primitiveTriplesThrough(1_000);
    expect(triples).toHaveLength(158);
    expect(triples[0]).toMatchObject({ a: 3, b: 4, c: 5 });
    expect(triples.at(-1)?.c).toBeLessThanOrEqual(1_000);
  });
});
