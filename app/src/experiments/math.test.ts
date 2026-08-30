import { describe, expect, it } from 'vitest';
import {
  analyzeEulerTrail,
  archimedesPiBounds,
  birthdayMatchProbability,
  binarySearchTrace,
  binarySearchWorstCaseComparisons,
  binomialCoefficient,
  buffonCrossingProbability,
  chudnovskyPi,
  collatzSequence,
  completeGraphEdges,
  collisionProbability,
  countMonochromaticTriangles,
  createBuffonTrial,
  createPythagoreanTriple,
  estimatePi,
  fibonacciNumbers,
  goldbachPartitions,
  hanoiMinimumMoves,
  hanoiMoves,
  heronArea,
  leibnizPi,
  machinPi,
  maximumTriangleAreaForPerimeter,
  montyHallTheoreticalRates,
  oddPascalEntryCount,
  pascalRows,
  pigeonholeLowerBound,
  polygonInteriorAngleSum,
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

describe('第三批旗舰实验算法', () => {
  it('按 F0=0、F1=1 生成斐波那契数', () => {
    expect(fibonacciNumbers(11)).toEqual([0n, 1n, 1n, 2n, 3n, 5n, 8n, 13n, 21n, 34n, 55n]);
  });

  it('计算简单多边形内角和', () => {
    expect(polygonInteriorAngleSum(3)).toBe(180);
    expect(polygonInteriorAngleSum(8)).toBe(1080);
  });

  it('欧拉路径判定同时检查连通性和奇度顶点', () => {
    const cycle = analyzeEulerTrail(4, [{ left: 0, right: 1 }, { left: 1, right: 2 }, { left: 2, right: 3 }, { left: 3, right: 0 }]);
    expect(cycle.type).toBe('circuit');
    expect(cycle.trail).toHaveLength(5);
    const disconnected = analyzeEulerTrail(6, [{ left: 0, right: 1 }, { left: 1, right: 2 }, { left: 2, right: 0 }, { left: 3, right: 4 }, { left: 4, right: 5 }, { left: 5, right: 3 }]);
    expect(disconnected.type).toBe('none');
    expect(disconnected.connected).toBe(false);
  });

  it('生日问题在均匀独立 365 日模型下于 23 人越过一半', () => {
    expect(birthdayMatchProbability(22)).toBeLessThan(.5);
    expect(birthdayMatchProbability(23)).toBeCloseTo(.507297, 5);
  });

  it('汉诺塔递归生成最短合法步数', () => {
    expect(hanoiMinimumMoves(64)).toBe(18_446_744_073_709_551_615n);
    expect(hanoiMoves(3)).toHaveLength(7);
    expect(hanoiMoves(3).map(({ disk }) => disk)).toEqual([1, 2, 1, 3, 1, 2, 1]);
  });
});

describe('第四批旗舰实验算法', () => {
  it('生成杨辉三角并正确计算每行奇数个数', () => {
    expect(pascalRows(5)[5]).toEqual([1n, 5n, 10n, 10n, 5n, 1n]);
    expect(binomialCoefficient(10, 3)).toBe(120n);
    expect(oddPascalEntryCount(0)).toBe(1);
    expect(oddPascalEntryCount(7)).toBe(8);
    expect(oddPascalEntryCount(10)).toBe(4);
  });

  it('海伦公式拒绝退化边长且固定周长最大值属于等边三角形', () => {
    expect(heronArea(3, 4, 5)).toBe(6);
    expect(() => heronArea(1, 2, 3)).toThrow(/严格三角不等式/);
    expect(maximumTriangleAreaForPerimeter(12)).toBeCloseTo(4 * Math.sqrt(3), 12);
  });

  it('推广鸽巢下界并准确计算碰撞概率', () => {
    expect(pigeonholeLowerBound(15, 6)).toBe(3);
    expect(collisionProbability(12, 100)).toBeCloseTo(0.496846, 5);
    expect(collisionProbability(20, 100)).toBeCloseTo(0.8696, 3);
  });

  it('标准 Monty Hall 规则给出不换 1/3 与换门 2/3', () => {
    expect(montyHallTheoreticalRates()).toEqual({ stay: 1 / 3, switch: 2 / 3 });
    expect(montyHallTheoreticalRates(100)).toEqual({ stay: .01, switch: .99 });
  });

  it('二分搜索记录安全中点、未命中路径和精确最坏比较上界', () => {
    const values = [1, 3, 5, 7, 9, 11, 13, 15];
    const found = binarySearchTrace(values, 11);
    expect(found.index).toBe(5);
    expect(found.steps[0]).toMatchObject({ low: 0, high: 7, middle: 3 });
    expect(binarySearchTrace(values, 6).index).toBe(-1);
    expect(() => binarySearchTrace([3, 1, 2], 1)).toThrow(/非降序/);
    expect(binarySearchWorstCaseComparisons(1_000_000)).toBe(20);
    expect(binarySearchWorstCaseComparisons(400_000_000)).toBe(29);
  });
});
