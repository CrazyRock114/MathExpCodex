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
  }
};
