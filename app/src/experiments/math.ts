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
