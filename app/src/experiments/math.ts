export interface BuffonTrial {
  readonly angle: number;
  readonly distanceToLine: number;
  readonly crosses: boolean;
}

export function buffonCrossingProbability(needleLength: number, lineSpacing: number) {
  if (!(needleLength > 0) || !(lineSpacing > 0) || needleLength > lineSpacing) {
    throw new RangeError('布丰短针公式要求 0 < L ≤ d');
  }
  return (2 * needleLength) / (Math.PI * lineSpacing);
}

export function createBuffonTrial(
  needleLength: number,
  lineSpacing: number,
  random: () => number = Math.random
): BuffonTrial {
  buffonCrossingProbability(needleLength, lineSpacing);
  const angle = random() * Math.PI;
  const distanceToLine = random() * lineSpacing / 2;
  return {
    angle,
    distanceToLine,
    crosses: distanceToLine <= Math.abs(Math.sin(angle)) * needleLength / 2
  };
}

export function estimatePi(total: number, hits: number, needleLength = 1, lineSpacing = 1) {
  if (total <= 0 || hits <= 0) return null;
  return (2 * needleLength * total) / (hits * lineSpacing);
}

export function collatzSequence(start: number, maxSteps = 10_000): readonly number[] {
  if (!Number.isSafeInteger(start) || start < 1) {
    throw new RangeError('起点必须是正安全整数');
  }
  const sequence = [start];
  let current = start;
  for (let step = 0; current !== 1 && step < maxSteps; step += 1) {
    current = current % 2 === 0 ? current / 2 : current * 3 + 1;
    if (!Number.isSafeInteger(current)) throw new RangeError('轨道超出安全整数范围');
    sequence.push(current);
  }
  return sequence;
}

export function greatestCommonDivisor(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

export interface PythagoreanTriple {
  readonly a: number;
  readonly b: number;
  readonly c: number;
  readonly m: number;
  readonly n: number;
  readonly primitive: boolean;
}

export function createPythagoreanTriple(m: number, n: number): PythagoreanTriple {
  if (!Number.isInteger(m) || !Number.isInteger(n) || m <= n || n < 1) {
    throw new RangeError('参数必须是满足 m > n ≥ 1 的整数');
  }
  const first = m * m - n * n;
  const second = 2 * m * n;
  return {
    a: Math.min(first, second),
    b: Math.max(first, second),
    c: m * m + n * n,
    m,
    n,
    primitive: greatestCommonDivisor(m, n) === 1 && (m - n) % 2 === 1
  };
}

export function primitiveTriplesThrough(maxHypotenuse: number): readonly PythagoreanTriple[] {
  const triples: PythagoreanTriple[] = [];
  for (let m = 2; m * m + 1 <= maxHypotenuse; m += 1) {
    for (let n = 1; n < m; n += 1) {
      const triple = createPythagoreanTriple(m, n);
      if (triple.primitive && triple.c <= maxHypotenuse) triples.push(triple);
    }
  }
  return triples.toSorted((left, right) => left.c - right.c || left.a - right.a);
}

export function primeSieve(limit: number): readonly boolean[] {
  const size = Math.max(1, Math.floor(limit));
  const prime = Array.from({ length: size + 1 }, () => true);
  prime[0] = false;
  prime[1] = false;
  for (let candidate = 2; candidate * candidate <= size; candidate += 1) {
    if (!prime[candidate]) continue;
    for (let composite = candidate * candidate; composite <= size; composite += candidate) prime[composite] = false;
  }
  return prime;
}

export interface SieveStep {
  readonly prime: number;
  readonly newlyMarked: readonly number[];
}

export function sieveTrace(limit: number): readonly SieveStep[] {
  if (!Number.isInteger(limit) || limit < 2) throw new RangeError('筛法上限必须是不小于 2 的整数');
  const prime = Array.from({ length: limit + 1 }, () => true);
  prime[0] = false;
  prime[1] = false;
  const steps: SieveStep[] = [];
  for (let candidate = 2; candidate * candidate <= limit; candidate += 1) {
    if (!prime[candidate]) continue;
    const newlyMarked: number[] = [];
    for (let composite = candidate * candidate; composite <= limit; composite += candidate) {
      if (prime[composite]) newlyMarked.push(composite);
      prime[composite] = false;
    }
    steps.push({ prime: candidate, newlyMarked });
  }
  return steps;
}

export function primeCount(limit: number) {
  return primeSieve(limit).filter(Boolean).length;
}

export function catalanNumber(index: number) {
  if (!Number.isInteger(index) || index < 0) throw new RangeError('卡特兰数下标必须是非负整数');
  let value = 1n;
  for (let current = 0; current < index; current += 1) {
    value = value * 2n * BigInt(2 * current + 1) / BigInt(current + 2);
  }
  return value;
}

export function generateBalancedParentheses(pairs: number): readonly string[] {
  if (!Number.isInteger(pairs) || pairs < 0 || pairs > 9) {
    throw new RangeError('括号对数必须是 0–9 的整数');
  }
  const results: string[] = [];
  const visit = (prefix: string, opened: number, closed: number) => {
    if (closed === pairs) {
      results.push(prefix);
      return;
    }
    if (opened < pairs) visit(`${prefix}(`, opened + 1, closed);
    if (closed < opened) visit(`${prefix})`, opened, closed + 1);
  };
  visit('', 0, 0);
  return results;
}

function assertProbability(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new RangeError(`${label} 必须在 0–1 之间`);
}

export function bayesPositivePredictiveValue(
  prevalence: number,
  sensitivity: number,
  falsePositiveRate: number
) {
  assertProbability(prevalence, '基准率');
  assertProbability(sensitivity, '灵敏度');
  assertProbability(falsePositiveRate, '假阳性率');
  const truePositiveRate = prevalence * sensitivity;
  const falsePositiveShare = (1 - prevalence) * falsePositiveRate;
  const positiveRate = truePositiveRate + falsePositiveShare;
  if (positiveRate === 0) return null;
  return truePositiveRate / positiveRate;
}

export function bayesNaturalFrequencies(
  population: number,
  prevalence: number,
  sensitivity: number,
  falsePositiveRate: number
) {
  if (!Number.isInteger(population) || population < 1) throw new RangeError('人数必须是正整数');
  const posterior = bayesPositivePredictiveValue(prevalence, sensitivity, falsePositiveRate);
  const conditionPositive = population * prevalence * sensitivity;
  const conditionNegative = population * (1 - prevalence) * falsePositiveRate;
  return {
    conditionPositive,
    conditionNegative,
    positive: conditionPositive + conditionNegative,
    posterior
  };
}

export function eulerCharacteristic(vertices: number, edges: number, faces: number) {
  if (![vertices, edges, faces].every((value) => Number.isInteger(value) && value >= 0)) {
    throw new RangeError('顶点、边、面数量必须是非负整数');
  }
  return vertices - edges + faces;
}

export function orientableSurfaceCharacteristic(genus: number) {
  if (!Number.isInteger(genus) || genus < 0) throw new RangeError('亏格必须是非负整数');
  return 2 - 2 * genus;
}

export function goldbachPartitions(even: number): readonly (readonly [number, number])[] {
  if (!Number.isInteger(even) || even < 4 || even % 2 !== 0) {
    throw new RangeError('请输入不小于 4 的偶数');
  }
  const prime = primeSieve(even);
  const pairs: [number, number][] = [];
  for (let left = 2; left <= even / 2; left += 1) {
    if (prime[left] && prime[even - left]) pairs.push([left, even - left]);
  }
  return pairs;
}

export function twinPrimePairs(limit: number): readonly (readonly [number, number])[] {
  const prime = primeSieve(limit);
  const pairs: [number, number][] = [];
  for (let left = 2; left + 2 <= limit; left += 1) {
    if (prime[left] && prime[left + 2]) pairs.push([left, left + 2]);
  }
  return pairs;
}

export interface GraphEdge {
  readonly left: number;
  readonly right: number;
}

export function completeGraphEdges(vertexCount: number): readonly GraphEdge[] {
  const edges: GraphEdge[] = [];
  for (let left = 0; left < vertexCount; left += 1) {
    for (let right = left + 1; right < vertexCount; right += 1) edges.push({ left, right });
  }
  return edges;
}

export function countMonochromaticTriangles(
  vertexCount: number,
  colors: readonly (0 | 1 | null)[]
) {
  const edges = completeGraphEdges(vertexCount);
  const colorByEdge = new Map(edges.map((edge, index) => [`${edge.left}-${edge.right}`, colors[index] ?? null]));
  let count = 0;
  for (let a = 0; a < vertexCount; a += 1) {
    for (let b = a + 1; b < vertexCount; b += 1) {
      for (let c = b + 1; c < vertexCount; c += 1) {
        const ab = colorByEdge.get(`${a}-${b}`);
        const ac = colorByEdge.get(`${a}-${c}`);
        const bc = colorByEdge.get(`${b}-${c}`);
        if (ab !== null && ab !== undefined && ab === ac && ac === bc) count += 1;
      }
    }
  }
  return count;
}

export function ramseyAvoidingColoringCount(vertexCount: number) {
  const edgeCount = completeGraphEdges(vertexCount).length;
  if (edgeCount > 20) throw new RangeError('精确枚举仅用于小图');
  let avoiding = 0;
  const total = 2 ** edgeCount;
  for (let mask = 0; mask < total; mask += 1) {
    const colors = Array.from({ length: edgeCount }, (_, index) => (mask >> index & 1) as 0 | 1);
    if (countMonochromaticTriangles(vertexCount, colors) === 0) avoiding += 1;
  }
  return { avoiding, total };
}

export function archimedesPiBounds(sides: number) {
  if (!Number.isInteger(sides) || sides < 3) throw new RangeError('多边形至少需要 3 条边');
  return {
    lower: sides * Math.sin(Math.PI / sides),
    upper: sides * Math.tan(Math.PI / sides)
  };
}

export function leibnizPi(terms: number) {
  let sum = 0;
  for (let index = 0; index < terms; index += 1) sum += (index % 2 === 0 ? 1 : -1) / (2 * index + 1);
  return 4 * sum;
}

export function arctangentSeries(value: number, terms: number) {
  let sum = 0;
  let power = value;
  const square = value * value;
  for (let index = 0; index < terms; index += 1) {
    sum += (index % 2 === 0 ? 1 : -1) * power / (2 * index + 1);
    power *= square;
  }
  return sum;
}

export function machinPi(terms: number) {
  return 16 * arctangentSeries(1 / 5, terms) - 4 * arctangentSeries(1 / 239, terms);
}

function factorial(value: number) {
  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) result *= factor;
  return result;
}

export function chudnovskyPi(terms: number) {
  let sum = 0;
  for (let k = 0; k < terms; k += 1) {
    const numerator = factorial(6 * k) * (13_591_409 + 545_140_134 * k) * (k % 2 === 0 ? 1 : -1);
    const denominator = factorial(3 * k) * factorial(k) ** 3 * 640_320 ** (3 * k + 1.5);
    sum += numerator / denominator;
  }
  return 1 / (12 * sum);
}

export function fibonacciNumbers(count: number): readonly bigint[] {
  if (!Number.isInteger(count) || count < 1) throw new RangeError('项数必须是正整数');
  const values = [0n];
  if (count === 1) return values;
  values.push(1n);
  while (values.length < count) values.push(values.at(-1)! + values.at(-2)!);
  return values;
}

export function polygonInteriorAngleSum(sides: number) {
  if (!Number.isInteger(sides) || sides < 3) throw new RangeError('简单多边形至少有 3 条边');
  return (sides - 2) * 180;
}

export interface UndirectedEdge {
  readonly left: number;
  readonly right: number;
}

export function undirectedDegrees(vertexCount: number, edges: readonly UndirectedEdge[]) {
  if (!Number.isInteger(vertexCount) || vertexCount < 1) throw new RangeError('顶点数必须是正整数');
  const degrees = Array.from({ length: vertexCount }, () => 0);
  for (const { left, right } of edges) {
    if (!Number.isInteger(left) || !Number.isInteger(right) || left < 0 || right < 0 || left >= vertexCount || right >= vertexCount) {
      throw new RangeError('边的端点必须是有效顶点');
    }
    degrees[left] = (degrees[left] ?? 0) + 1;
    degrees[right] = (degrees[right] ?? 0) + 1;
  }
  return degrees;
}

export function oddDegreeVertices(vertexCount: number, edges: readonly UndirectedEdge[]) {
  return undirectedDegrees(vertexCount, edges).flatMap((degree, vertex) => degree % 2 ? [vertex] : []);
}

export type EulerTrailType = 'circuit' | 'path' | 'none';

export function analyzeEulerTrail(vertexCount: number, edges: readonly UndirectedEdge[]) {
  if (!Number.isInteger(vertexCount) || vertexCount < 1) throw new RangeError('顶点数必须是正整数');
  const adjacency = Array.from({ length: vertexCount }, () => [] as { readonly vertex: number; readonly edge: number }[]);
  edges.forEach(({ left, right }, edge) => {
    if (!Number.isInteger(left) || !Number.isInteger(right) || left < 0 || right < 0 || left >= vertexCount || right >= vertexCount || left === right) {
      throw new RangeError('边的端点必须是不同的有效顶点');
    }
    adjacency[left]!.push({ vertex: right, edge });
    adjacency[right]!.push({ vertex: left, edge });
  });
  const activeVertices = adjacency.map((neighbors, vertex) => ({ neighbors, vertex })).filter(({ neighbors }) => neighbors.length > 0);
  const visited = new Set<number>();
  const pending = activeVertices.length ? [activeVertices[0]!.vertex] : [0];
  while (pending.length) {
    const vertex = pending.pop()!;
    if (visited.has(vertex)) continue;
    visited.add(vertex);
    for (const neighbor of adjacency[vertex] ?? []) pending.push(neighbor.vertex);
  }
  const connected = activeVertices.every(({ vertex }) => visited.has(vertex));
  const oddVertices = adjacency.flatMap((neighbors, vertex) => neighbors.length % 2 ? [vertex] : []);
  const type: EulerTrailType = !connected || oddVertices.length > 2
    ? 'none'
    : oddVertices.length === 2 ? 'path' : 'circuit';
  if (type === 'none') return { connected, degrees: adjacency.map((neighbors) => neighbors.length), oddVertices, trail: [] as readonly number[], type };

  const used = new Set<number>();
  const cursor = adjacency.map(() => 0);
  const stack = [oddVertices[0] ?? activeVertices[0]?.vertex ?? 0];
  const reversedTrail: number[] = [];
  while (stack.length) {
    const vertex = stack.at(-1)!;
    while (cursor[vertex]! < adjacency[vertex]!.length && used.has(adjacency[vertex]![cursor[vertex]!]!.edge)) cursor[vertex]! += 1;
    const next = adjacency[vertex]![cursor[vertex]!];
    if (next) {
      used.add(next.edge);
      cursor[vertex]! += 1;
      stack.push(next.vertex);
    } else {
      reversedTrail.push(stack.pop()!);
    }
  }
  return { connected, degrees: adjacency.map((neighbors) => neighbors.length), oddVertices, trail: reversedTrail.reverse(), type };
}

export function birthdayMatchProbability(people: number, days = 365) {
  if (!Number.isInteger(people) || people < 0 || !Number.isInteger(days) || days < 1) throw new RangeError('人数和日期数必须是有效整数');
  if (people > days) return 1;
  let distinct = 1;
  for (let index = 0; index < people; index += 1) distinct *= (days - index) / days;
  return 1 - distinct;
}

export interface HanoiMove {
  readonly disk: number;
  readonly from: string;
  readonly to: string;
}

export function hanoiMinimumMoves(disks: number) {
  if (!Number.isInteger(disks) || disks < 0) throw new RangeError('盘数必须是非负整数');
  return 2n ** BigInt(disks) - 1n;
}

export function hanoiMoves(disks: number, from = 'A', to = 'C', spare = 'B'): readonly HanoiMove[] {
  if (!Number.isInteger(disks) || disks < 0 || disks > 15) throw new RangeError('可展开的盘数必须在 0 到 15 之间');
  const moves: HanoiMove[] = [];
  function move(count: number, source: string, target: string, auxiliary: string) {
    if (count === 0) return;
    move(count - 1, source, auxiliary, target);
    moves.push({ disk: count, from: source, to: target });
    move(count - 1, auxiliary, target, source);
  }
  move(disks, from, to, spare);
  return moves;
}

export function pascalRows(lastRow: number): readonly (readonly bigint[])[] {
  if (!Number.isInteger(lastRow) || lastRow < 0 || lastRow > 60) throw new RangeError('行号必须是 0 到 60 的整数');
  const rows: bigint[][] = [[1n]];
  for (let row = 1; row <= lastRow; row += 1) {
    const previous = rows[row - 1]!;
    rows.push(Array.from({ length: row + 1 }, (_, column) =>
      (previous[column - 1] ?? 0n) + (previous[column] ?? 0n)));
  }
  return rows;
}

export function binomialCoefficient(n: number, k: number) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) throw new RangeError('需要满足 0 ≤ k ≤ n');
  return pascalRows(n)[n]![k]!;
}

export function oddPascalEntryCount(row: number) {
  if (!Number.isInteger(row) || row < 0) throw new RangeError('行号必须是非负整数');
  let value = row;
  let setBits = 0;
  while (value > 0) {
    setBits += value % 2;
    value = Math.floor(value / 2);
  }
  return 2 ** setBits;
}

export function heronArea(a: number, b: number, c: number) {
  if (![a, b, c].every((side) => Number.isFinite(side) && side > 0)) throw new RangeError('三条边都必须是正数');
  if (a + b <= c || a + c <= b || b + c <= a) throw new RangeError('三条边必须满足严格三角不等式');
  const semiperimeter = (a + b + c) / 2;
  return Math.sqrt(semiperimeter * (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c));
}

export function maximumTriangleAreaForPerimeter(perimeter: number) {
  if (!Number.isFinite(perimeter) || perimeter <= 0) throw new RangeError('周长必须是正数');
  return perimeter ** 2 / (12 * Math.sqrt(3));
}

export function pigeonholeLowerBound(objects: number, boxes: number) {
  if (!Number.isInteger(objects) || objects < 0 || !Number.isInteger(boxes) || boxes < 1) throw new RangeError('物品数必须非负且抽屉数必须为正整数');
  return Math.ceil(objects / boxes);
}

export function collisionProbability(draws: number, buckets: number) {
  return birthdayMatchProbability(draws, buckets);
}

export function montyHallTheoreticalRates(doors = 3) {
  if (!Number.isInteger(doors) || doors < 3) throw new RangeError('至少需要三扇门');
  return { stay: 1 / doors, switch: (doors - 1) / doors };
}

export function simulateMontyHall(trials: number, random: () => number = Math.random) {
  if (!Number.isInteger(trials) || trials < 1) throw new RangeError('模拟次数必须是正整数');
  let stayWins = 0;
  for (let trial = 0; trial < trials; trial += 1) {
    const prize = Math.floor(random() * 3);
    const pick = Math.floor(random() * 3);
    if (pick === prize) stayWins += 1;
  }
  return { stayWins, switchWins: trials - stayWins, trials };
}

export interface BinarySearchStep {
  readonly high: number;
  readonly low: number;
  readonly middle: number;
  readonly value: number;
}

export function binarySearchTrace(values: readonly number[], target: number) {
  if (!Number.isFinite(target) || values.some((value) => !Number.isFinite(value))) throw new RangeError('数组和目标必须是有限数字');
  if (values.some((value, index) => index > 0 && value < values[index - 1]!)) throw new RangeError('二分搜索要求数组按非降序排列');
  const steps: BinarySearchStep[] = [];
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const value = values[middle]!;
    steps.push({ high, low, middle, value });
    if (value === target) return { index: middle, steps };
    if (value < target) low = middle + 1;
    else high = middle - 1;
  }
  return { index: -1, steps };
}

export function binarySearchWorstCaseComparisons(length: number) {
  if (!Number.isInteger(length) || length < 0) throw new RangeError('数组长度必须是非负整数');
  return length === 0 ? 0 : Math.ceil(Math.log2(length + 1));
}

export function triangularNumber(index: number) {
  if (!Number.isInteger(index) || index < 0) throw new RangeError('三角数下标必须是非负整数');
  return index * (index + 1) / 2;
}

export function sphereMeasures(radius: number) {
  if (!Number.isFinite(radius) || radius <= 0) throw new RangeError('半径必须是正数');
  return {
    surfaceArea: 4 * Math.PI * radius ** 2,
    volume: 4 / 3 * Math.PI * radius ** 3
  };
}

export function sphereSliceApproximation(radius: number, slices: number) {
  sphereMeasures(radius);
  if (!Number.isInteger(slices) || slices < 1) throw new RangeError('切片数必须是正整数');
  const width = 2 * radius / slices;
  let volume = 0;
  for (let index = 0; index < slices; index += 1) {
    const x = -radius + (index + .5) * width;
    volume += Math.PI * (radius ** 2 - x ** 2) * width;
  }
  return volume;
}

export interface Point2D {
  readonly x: number;
  readonly y: number;
}

export interface TourResult {
  readonly length: number;
  readonly order: readonly number[];
}

function pointDistance(left: Point2D, right: Point2D) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function closedTourLength(points: readonly Point2D[], order: readonly number[]) {
  let length = 0;
  for (let index = 1; index < order.length; index += 1) {
    length += pointDistance(points[order[index - 1]!]!, points[order[index]!]!);
  }
  return length;
}

function validateTourPoints(points: readonly Point2D[]) {
  if (points.length < 3 || points.length > 9 || points.some(({ x, y }) => !Number.isFinite(x) || !Number.isFinite(y))) {
    throw new RangeError('精确旅行商演示需要 3 到 9 个有限坐标点');
  }
}

export function exactTravelingSalesmanTour(points: readonly Point2D[]): TourResult {
  validateTourPoints(points);
  const remaining = Array.from({ length: points.length - 1 }, (_, index) => index + 1);
  let bestLength = Number.POSITIVE_INFINITY;
  let bestOrder: number[] = [];
  function visit(position: number) {
    if (position === remaining.length) {
      const order = [0, ...remaining, 0];
      const length = closedTourLength(points, order);
      if (length < bestLength) {
        bestLength = length;
        bestOrder = [...order];
      }
      return;
    }
    for (let index = position; index < remaining.length; index += 1) {
      [remaining[position], remaining[index]] = [remaining[index]!, remaining[position]!];
      visit(position + 1);
      [remaining[position], remaining[index]] = [remaining[index]!, remaining[position]!];
    }
  }
  visit(0);
  return { length: bestLength, order: bestOrder };
}

export function nearestNeighborTour(points: readonly Point2D[], start = 0): TourResult {
  validateTourPoints(points);
  if (!Number.isInteger(start) || start < 0 || start >= points.length) throw new RangeError('起点必须是有效城市编号');
  const unvisited = new Set(Array.from({ length: points.length }, (_, index) => index));
  unvisited.delete(start);
  const order = [start];
  while (unvisited.size) {
    const current = order.at(-1)!;
    const next = [...unvisited].toSorted((left, right) =>
      pointDistance(points[current]!, points[left]!) - pointDistance(points[current]!, points[right]!) || left - right)[0]!;
    order.push(next);
    unvisited.delete(next);
  }
  order.push(start);
  return { length: closedTourLength(points, order), order };
}

export function symmetricTourCount(cities: number) {
  if (!Number.isInteger(cities) || cities < 3) throw new RangeError('城市数必须是不小于 3 的整数');
  let permutations = 1n;
  for (let factor = 2n; factor < BigInt(cities); factor += 1n) permutations *= factor;
  return permutations / 2n;
}

export function binomialDistribution(trials: number, probability: number) {
  if (!Number.isInteger(trials) || trials < 0 || trials > 60 || !Number.isFinite(probability) || probability < 0 || probability > 1) {
    throw new RangeError('需要 0 到 60 次试验且 0 ≤ p ≤ 1');
  }
  return Array.from({ length: trials + 1 }, (_, successes) =>
    Number(binomialCoefficient(trials, successes)) * probability ** successes * (1 - probability) ** (trials - successes));
}

export function simulateBinomial(
  trials: number,
  probability: number,
  repetitions: number,
  random: () => number = Math.random
) {
  binomialDistribution(trials, probability);
  if (!Number.isInteger(repetitions) || repetitions < 1) throw new RangeError('重复次数必须是正整数');
  const counts = Array.from({ length: trials + 1 }, () => 0);
  for (let repetition = 0; repetition < repetitions; repetition += 1) {
    let successes = 0;
    for (let trial = 0; trial < trials; trial += 1) if (random() < probability) successes += 1;
    counts[successes]! += 1;
  }
  return counts;
}

interface RationalExpression {
  readonly denominator: bigint;
  readonly expression: string;
  readonly numerator: bigint;
}

function bigintGcd(left: bigint, right: bigint) {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b) [a, b] = [b, a % b];
  return a;
}

function rational(numerator: bigint, denominator: bigint, expression: string): RationalExpression {
  if (denominator === 0n) throw new RangeError('不能除以零');
  const sign = denominator < 0n ? -1n : 1n;
  const divisor = bigintGcd(numerator, denominator);
  return { numerator: sign * numerator / divisor, denominator: sign * denominator / divisor, expression };
}

export function solveTwentyFour(cards: readonly number[], target = 24) {
  if (cards.length !== 4 || cards.some((card) => !Number.isInteger(card) || card < 1 || card > 13) || !Number.isInteger(target)) {
    throw new RangeError('请输入四个 1 到 13 的整数和整数目标');
  }
  const seen = new Set<string>();
  let statesExplored = 0;
  function search(values: readonly RationalExpression[]): string | null {
    const key = values.map(({ numerator, denominator }) => `${numerator}/${denominator}`).toSorted().join('|');
    if (seen.has(key)) return null;
    seen.add(key);
    statesExplored += 1;
    if (values.length === 1) return values[0]!.numerator === BigInt(target) * values[0]!.denominator ? values[0]!.expression : null;
    for (let left = 0; left < values.length; left += 1) {
      for (let right = left + 1; right < values.length; right += 1) {
        const a = values[left]!;
        const b = values[right]!;
        const rest = values.filter((_, index) => index !== left && index !== right);
        const candidates = [
          rational(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator, `(${a.expression} + ${b.expression})`),
          rational(a.numerator * b.numerator, a.denominator * b.denominator, `(${a.expression} × ${b.expression})`),
          rational(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator, `(${a.expression} − ${b.expression})`),
          rational(b.numerator * a.denominator - a.numerator * b.denominator, a.denominator * b.denominator, `(${b.expression} − ${a.expression})`),
          ...(b.numerator === 0n ? [] : [rational(a.numerator * b.denominator, a.denominator * b.numerator, `(${a.expression} ÷ ${b.expression})`)]),
          ...(a.numerator === 0n ? [] : [rational(b.numerator * a.denominator, b.denominator * a.numerator, `(${b.expression} ÷ ${a.expression})`)])
        ];
        const unique = new Map(candidates.map((candidate) => [`${candidate.numerator}/${candidate.denominator}`, candidate]));
        for (const candidate of unique.values()) {
          const solution = search([...rest, candidate]);
          if (solution) return solution;
        }
      }
    }
    return null;
  }
  const expression = search(cards.map((card) => rational(BigInt(card), 1n, String(card))));
  return { expression, statesExplored };
}
