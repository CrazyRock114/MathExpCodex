import type { ExperimentSummary } from './experiment';

type ReviewedOverride = Pick<ExperimentSummary, 'title' | 'intro' | 'education'>;

export const REVIEWED_EXPERIMENT_OVERRIDES: Readonly<Record<string, ReviewedOverride>> = {
  PR01: {
    title: '投针估算 π（布丰投针）',
    intro:
      '当针长 L 不超过平行线间距 d 时，跨线概率为 2L/(πd)。用重复随机试验观察频率如何逼近概率，并由此估算 π。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '区分单次随机结果、实验频率与理论概率',
        '用几何投影解释跨线条件，并在 L ≤ d 的前提下使用公式',
        '观察样本量增大时估计值通常更稳定，但不保证单调变准'
      ],
      prerequisites: ['圆周率与比', '百分数', '直角三角形中的正弦（推导阶段）'],
      sources: [
        {
          label: '布丰《道德算术论》（1777 年原始出版物）',
          url: 'https://books.google.com/books?id=ERkOAAAAQAAJ',
          kind: 'primary'
        },
        {
          label: '耶鲁大学统计课程：Buffon’s needle',
          url: 'https://www.stat.yale.edu/~yw562/teaching/241/lec19.pdf',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR02: {
    title: '冰雹蹦跳（科拉茨猜想）',
    intro:
      '对正整数反复执行“偶数除以 2、奇数乘 3 加 1”。所有起点是否最终到达 1，至今仍是未解决的猜想。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '准确执行科拉茨迭代并记录轨道、总步数与峰值',
        '区分有限范围的计算验证、支持猜想的直觉与一般性证明',
        '从奇偶性和反向前驱图观察规律，同时说明这些观察不能证明猜想'
      ],
      prerequisites: ['正整数与奇偶性', '函数迭代', '坐标图的基本阅读'],
      sources: [
        {
          label: 'Lagarias：The 3x+1 Problem: An Overview',
          url: 'https://arxiv.org/abs/2111.02635',
          kind: 'reference'
        },
        {
          label: 'Tao：Almost all orbits of the Collatz map attain almost bounded values',
          url: 'https://doi.org/10.1017/fmp.2022.8',
          kind: 'primary'
        },
        {
          label: 'Barina：Improved verification limit for the convergence of the Collatz conjecture',
          url: 'https://doi.org/10.1007/s11227-025-07337-0',
          kind: 'primary'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR03: {
    title: '勾股数工厂（欧几里得公式）',
    intro:
      '用 a=m²−n²、b=2mn、c=m²+n² 构造勾股数；再由互素和奇偶条件判断它是否为本原勾股数。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '验证整数三元组是否满足 a²+b²=c²',
        '用欧几里得参数公式构造勾股数',
        '用最大公因数与一奇一偶条件识别本原勾股数'
      ],
      prerequisites: ['平方与平方根', '勾股定理', '最大公因数与奇偶性'],
      sources: [
        {
          label: 'Clay Mathematics Institute：Euclid’s Elements 数字手稿',
          url: 'https://www.claymath.org/online-resources/euclids-elements/',
          kind: 'primary'
        },
        {
          label: 'Clark University：Elements, Book X, Proposition 29',
          url: 'https://mathcs.clarku.edu/~djoyce/elements/bookX/propX29.html',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR04: {
    title: '地图为什么四种颜色够用（四色定理）',
    intro:
      '只把共享一段边界的区域视为相邻时，任何平面地图都能用至多四种颜色染色，使相邻区域不同色；只在一点接触不算相邻。',
    education: {
      gradeBands: ['primary', 'middle', 'high'],
      learningObjectives: [
        '把地图染色问题转化为平面图的顶点染色问题',
        '用具体例子区分“至多四种颜色”与“每张地图都恰好需要四种颜色”',
        '说明相邻定义为什么必须排除只在一点接触的区域'
      ],
      prerequisites: ['相邻与分类', '简单图与顶点（进阶阶段）', '反例的基本含义'],
      sources: [
        {
          label: 'Appel 与 Haken：Every planar map is four colorable, Part I',
          url: 'https://projecteuclid.org/journals/illinois-journal-of-mathematics/volume-21/issue-3/Every-planar-map-is-four-colorable-Part-I-Discharging/10.1215/ijm/1256049011.full',
          kind: 'primary'
        },
        {
          label: 'Gonthier：Formal Proof—The Four-Color Theorem',
          url: 'https://www.ams.org/notices/200811/tx081101382p.pdf',
          kind: 'primary'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR05: {
    title: '六人聚会必有“三人组”（R(3,3)=6）',
    intro:
      '任意六个人中，必有三人彼此认识，或三人彼此不认识。把每对人的关系染成红、蓝两色，就得到最小拉姆齐数 R(3,3)=6。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '把“认识或不认识”表示为完全图的两种边颜色',
        '用鸽巢原理解释六个顶点为什么必出现单色三角形',
        '用五边形反例与精确枚举理解数字 6 的最小性'
      ],
      prerequisites: ['组合与分类', '完全图与三角形', '鸽巢原理'],
      sources: [
        {
          label: 'Ramsey：On a Problem of Formal Logic（1930）',
          url: 'https://londmathsoc.onlinelibrary.wiley.com/doi/10.1112/plms/s2-30.1.264',
          kind: 'primary'
        },
        {
          label: 'Ohio State Ximera：Ramsey Theory',
          url: 'https://ximera.osu.edu/math/combinatorics/combinatoricsBook/combinatoricsBook/combinatorics/ramseyTheory/ramseyTheory',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR06: {
    title: '偶数拆成两个素数（哥德巴赫猜想）',
    intro:
      '强哥德巴赫猜想断言：每个不小于 4 的偶数都能写成两个素数之和。计算能检查有限范围，但尚没有覆盖所有偶数的证明。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '准确列出一个偶数的不重复素数分拆',
        '观察分拆数量随偶数变化并识别它不单调',
        '区分仍未解决的强猜想、已证明的弱猜想与有限范围验证'
      ],
      prerequisites: ['素数与偶数', '加法分拆', '函数图像的基本阅读'],
      sources: [
        {
          label: 'Helfgott：The ternary Goldbach conjecture is true',
          url: 'https://arxiv.org/abs/1312.7748',
          kind: 'primary'
        },
        {
          label: 'Oliveira e Silva、Herzog 与 Pardi：验证至 4×10¹⁸',
          url: 'https://www.ams.org/mcom/2014-83-288/S0025-5718-2013-02787-1/',
          kind: 'primary'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR07: {
    title: '相差 2 的素数会有无穷多对吗（孪生素数猜想）',
    intro:
      '像 (11,13) 这样相差 2 的素数叫孪生素数。人们猜想它们有无穷多对；已证明的是存在无穷多对相邻素数，其间距不超过 246。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '用筛法找出给定范围内的孪生素数对',
        '比较不同上限内的累计对数并避免把有限数据当作证明',
        '区分“间距不超过 246”与“间距恰好为 2”'
      ],
      prerequisites: ['素数', '数轴与差', '无穷与有限验证的区别'],
      sources: [
        {
          label: 'Zhang：Bounded gaps between primes',
          url: 'https://annals.math.princeton.edu/2014/179-3/p07',
          kind: 'primary'
        },
        {
          label: 'Polymath：Variants of the Selberg sieve, and bounded intervals containing many primes',
          url: 'https://arxiv.org/abs/1407.4897',
          kind: 'primary'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PR08: {
    title: '不同算法怎样逼近 π',
    intro:
      '从内接、外切多边形到无穷级数，不同算法都能逼近 π，但速度相差巨大。比较误差时还要留意浏览器浮点数的精度上限。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '用正多边形周长给 π 建立上下界',
        '比较莱布尼茨级数、马钦公式与丘德诺夫斯基公式的收敛速度',
        '说明算法理论速度与 JavaScript 双精度显示极限是两件事'
      ],
      prerequisites: ['圆周率与正多边形', '绝对误差', '无穷级数（进阶阶段）'],
      sources: [
        {
          label: 'Archimedes：Measurement of a Circle',
          url: 'https://legacy-www.math.harvard.edu/archive/archimedes09/pdf/Measurement.of.the.Circle.pdf',
          kind: 'primary'
        },
        {
          label: 'NIST Digital Library of Mathematical Functions：π',
          url: 'https://dlmf.nist.gov/3.12',
          kind: 'reference'
        },
        {
          label: 'Chudnovsky-type formulae for non-compact arithmetic triangle groups',
          url: 'https://arxiv.org/abs/1609.05778',
          kind: 'primary'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  }
};
