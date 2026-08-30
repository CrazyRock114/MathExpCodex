import { describe, expect, it } from 'vitest';
import {
  buffonCrossingProbability,
  collatzSequence,
  createBuffonTrial,
  createPythagoreanTriple,
  estimatePi,
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
