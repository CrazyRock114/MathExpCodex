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
