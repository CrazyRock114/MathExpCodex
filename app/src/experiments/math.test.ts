import { describe, expect, it } from 'vitest';
import {
  analyzeEulerTrail,
  archimedesPiBounds,
  bayesNaturalFrequencies,
  bayesPositivePredictiveValue,
  birthdayMatchProbability,
  binarySearchTrace,
  binarySearchWorstCaseComparisons,
  binomialDistribution,
  binomialCoefficient,
  buffonCrossingProbability,
  catalanNumber,
  chudnovskyPi,
  collatzSequence,
  completeGraphEdges,
  collisionProbability,
  countMonochromaticTriangles,
  createBuffonTrial,
  createPythagoreanTriple,
  estimatePi,
  eulerCharacteristic,
  exactTravelingSalesmanTour,
  fibonacciNumbers,
  generateBalancedParentheses,
  goldbachPartitions,
  hanoiMinimumMoves,
  hanoiMoves,
  heronArea,
  leibnizPi,
  machinPi,
  maximumTriangleAreaForPerimeter,
  montyHallTheoreticalRates,
  nearestNeighborTour,
  oddDegreeVertices,
  oddPascalEntryCount,
  pascalRows,
  pigeonholeLowerBound,
  polygonInteriorAngleSum,
  primeCount,
  ramseyAvoidingColoringCount,
  twinPrimePairs,
  primitiveTriplesThrough,
  simulateBinomial,
  solveTwentyFour,
  sphereMeasures,
  sphereSliceApproximation,
  symmetricTourCount,
  sieveTrace,
  triangularNumber,
  undirectedDegrees,
  orientableSurfaceCharacteristic
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

describe('第五批旗舰实验算法', () => {
  it('用代数和点阵恒等式连接连续三角数与平方数', () => {
    expect(triangularNumber(10)).toBe(55);
    expect(triangularNumber(10) + triangularNumber(11)).toBe(11 ** 2);
    expect(() => triangularNumber(-1)).toThrow(/非负整数/);
  });

  it('球面积按 r²、体积按 r³ 缩放且切片逼近正确体积', () => {
    const unit = sphereMeasures(1);
    const doubled = sphereMeasures(2);
    expect(doubled.surfaceArea / unit.surfaceArea).toBe(4);
    expect(doubled.volume / unit.volume).toBe(8);
    expect(sphereSliceApproximation(3, 2_000)).toBeCloseTo(sphereMeasures(3).volume, 4);
  });

  it('旅行商精确枚举优于或等于最近邻，并按对称路线计数', () => {
    const points = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 3 }, { x: 1, y: 5 }, { x: 2, y: 2 }];
    const exact = exactTravelingSalesmanTour(points);
    const greedy = nearestNeighborTour(points);
    expect(exact.order).toHaveLength(points.length + 1);
    expect(exact.length).toBeLessThanOrEqual(greedy.length);
    expect(symmetricTourCount(10)).toBe(181_440n);
  });

  it('二项分布概率和为 1，均值附近最大且模拟次数守恒', () => {
    const distribution = binomialDistribution(10, .5);
    expect(distribution.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1, 12);
    expect(distribution[5]).toBeCloseTo(252 / 1_024, 12);
    const simulated = simulateBinomial(3, .5, 4, () => .25);
    expect(simulated.reduce((sum, value) => sum + value, 0)).toBe(4);
    expect(simulated[3]).toBe(4);
  });

  it('24 点用精确有理数覆盖分数解并证明固定规则下无解', () => {
    expect(solveTwentyFour([1, 5, 5, 5]).expression).not.toBeNull();
    expect(solveTwentyFour([3, 3, 8, 8]).expression).not.toBeNull();
    expect(solveTwentyFour([1, 1, 1, 1]).expression).toBeNull();
  });
});

describe('第六批旗舰实验算法', () => {
  it('按递推公式生成卡特兰数与全部合法括号串', () => {
    expect([0, 1, 2, 3, 4, 5].map(catalanNumber)).toEqual([1n, 1n, 2n, 5n, 14n, 42n]);
    expect(catalanNumber(20)).toBe(6_564_120_420n);
    expect(generateBalancedParentheses(3)).toEqual(['((()))', '(()())', '(())()', '()(())', '()()()']);
  });

  it('欧拉示性数区分球面与有把手的闭可定向曲面', () => {
    expect(eulerCharacteristic(8, 12, 6)).toBe(2);
    expect(eulerCharacteristic(1, 2, 1)).toBe(0);
    expect(orientableSurfaceCharacteristic(0)).toBe(2);
    expect(orientableSurfaceCharacteristic(2)).toBe(-2);
  });

  it('握手定理把自环计作两次并保证奇度顶点成偶数个', () => {
    const edges = [{ left: 0, right: 1 }, { left: 1, right: 2 }, { left: 2, right: 0 }, { left: 3, right: 3 }];
    expect(undirectedDegrees(4, edges)).toEqual([2, 2, 2, 2]);
    expect(undirectedDegrees(4, [{ left: 0, right: 1 }, { left: 1, right: 2 }])).toEqual([1, 2, 1, 0]);
    expect(oddDegreeVertices(4, [{ left: 0, right: 1 }, { left: 1, right: 2 }])).toEqual([0, 2]);
  });

  it('贝叶斯公式正确连接基准率、灵敏度、假阳性率与阳性预测值', () => {
    expect(bayesPositivePredictiveValue(.01, .99, .05)).toBeCloseTo(1 / 6, 12);
    expect(bayesNaturalFrequencies(10_000, .01, .99, .05)).toMatchObject({
      conditionPositive: 99,
      conditionNegative: 495,
      positive: 594
    });
    expect(bayesPositivePredictiveValue(0, 0, 0)).toBeNull();
  });

  it('埃氏筛从 p² 开始标记并给出正确素数计数', () => {
    expect(sieveTrace(30)).toEqual([
      { prime: 2, newlyMarked: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30] },
      { prime: 3, newlyMarked: [9, 15, 21, 27] },
      { prime: 5, newlyMarked: [25] }
    ]);
    expect(primeCount(100)).toBe(25);
    expect(primeCount(1_000_000)).toBe(78_498);
  });
});
