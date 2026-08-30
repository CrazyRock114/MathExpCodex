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
  },
  SQ01: {
    title: '从递推规则长出斐波那契数列',
    intro:
      '从 F₀=0、F₁=1 开始，让每一项等于前两项之和。用兔子模型、铺砖计数和恒等式观察同一递推规则怎样出现在不同问题中。',
    education: {
      gradeBands: ['primary', 'middle', 'high'],
      learningObjectives: [
        '按递推定义准确生成斐波那契数并区分项值与下标',
        '用 1×n 铺砖问题解释为什么会出现相邻两项相加',
        '检验卡西尼恒等式与相邻项比值，同时说明自然界例子不是普遍定律'
      ],
      prerequisites: ['整数加法', '数列与下标', '平方与比（进阶阶段）'],
      sources: [
        {
          label: 'NIST DLMF：Fibonacci and Lucas Numbers',
          url: 'https://dlmf.nist.gov/24.15#iv',
          kind: 'reference'
        },
        {
          label: 'OEIS A000045：Fibonacci numbers',
          url: 'https://oeis.org/A000045',
          kind: 'reference'
        },
        {
          label: 'Mathematical Association of America：Liber Abaci 手稿中的兔子问题',
          url: 'https://old.maa.org/press/periodicals/convergence/mathematical-treasure-liber-abaci-of-leonardo-of-pisa',
          kind: 'primary'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  GM01: {
    title: '把多边形切成三角形（内角和）',
    intro:
      '简单 n 边形的内角和是 (n−2)×180°。先从凸多边形的一个顶点画对角线，再比较凹多边形与自交图形的适用边界。',
    education: {
      gradeBands: ['primary', 'middle'],
      learningObjectives: [
        '用三角形分割推导凸 n 边形的内角和公式',
        '区分内角和与正多边形单个内角',
        '说明公式适用于简单多边形，但不能直接套给自交多边形'
      ],
      prerequisites: ['角与度数', '三角形内角和', '多边形与对角线'],
      sources: [
        {
          label: 'Euclid’s Elements, Book I, Proposition 32',
          url: 'https://mathcs.clarku.edu/~djoyce/elements/bookI/propI32.html',
          kind: 'primary'
        },
        {
          label: 'OpenStax Contemporary Mathematics：Polygons',
          url: 'https://openstax.org/books/contemporary-mathematics/pages/10-4-polygons-perimeter-and-circumference',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  GR01: {
    title: '一笔走完所有边（欧拉路径）',
    intro:
      '在所有有边的顶点连成一片的无向图中，奇度顶点为 0 个时有欧拉回路，为 2 个时有欧拉路径；其他情况都不能一笔走完每条边。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '把桥梁问题抽象成顶点、边和顶点度数',
        '同时检查连通性与奇度顶点数，判定欧拉路径或回路',
        '构造一条欧拉路线，并区分“每条边一次”和“每个顶点一次”'
      ],
      prerequisites: ['无向图、顶点与边', '奇数与偶数', '路径与连通'],
      sources: [
        {
          label: 'Euler：Solutio problematis ad geometriam situs pertinentis',
          url: 'https://scholarlycommons.pacific.edu/euler-works/53/',
          kind: 'primary'
        },
        {
          label: 'MIT Mathematics for Computer Science：Graph Theory',
          url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/f471f7b7034fabe8bbba5507df7d307f_MIT6_042JF10_chap05.pdf',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PB01: {
    title: '为什么 23 人就容易同生日（生日问题）',
    intro:
      '在“365 天等可能、每个人生日相互独立且忽略闰日”的模型中，23 人里至少两人同生日的概率约为 50.73%。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: [
        '用补事件计算至少一对同生日的概率',
        '解释人数增加时比较对数 n(n−1)/2 为什么增长很快',
        '区分理想化模型、随机模拟与真实世界生日分布'
      ],
      prerequisites: ['分数与百分数', '乘法原理', '补事件与独立性'],
      sources: [
        {
          label: 'OpenStax Contemporary Mathematics：Birthday Problem',
          url: 'https://openstax.org/books/contemporary-mathematics/pages/7-9-conditional-probability-and-the-multiplication-rule',
          kind: 'reference'
        },
        {
          label: 'MIT OpenCourseWare 6.041：The birthday problem',
          url: 'https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/9c3a88be11cf2a35a34f127e6d51274a_MIT6_041SCF13_rec04.pdf',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  AL04: {
    title: '递归搬盘子（汉诺塔）',
    intro:
      '把 n 个大小不同的圆盘从起点柱移到目标柱，每次只动一个且大盘不能压小盘。三柱最少需要 2ⁿ−1 步。',
    education: {
      gradeBands: ['primary', 'middle', 'high'],
      learningObjectives: [
        '遵守两条移动规则完成小规模汉诺塔',
        '把 n 盘任务分解为两个 n−1 盘任务和一次最大盘移动',
        '由递推式 T(n)=2T(n−1)+1 推导并检验最少步数 2ⁿ−1'
      ],
      prerequisites: ['整数与幂', '有序比较', '递推或递归（进阶阶段）'],
      sources: [
        {
          label: 'MIT Mathematics for Computer Science：Tower of Hanoi recurrence',
          url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf',
          kind: 'reference'
        },
        {
          label: 'Carnegie Mellon：Recursion—Towers of Hanoi',
          url: 'https://www.cs.cmu.edu/~cburch/survey/recurse/hanoitime.html',
          kind: 'reference'
        }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  SQ07: {
    title: '杨辉三角里的组合与奇偶图案',
    intro: '从第 0 行开始，每项由左上、右上两项相加得到。它同时记录二项式系数、组合数、2 的幂与模 2 的自相似图案。',
    education: {
      gradeBands: ['primary', 'middle', 'high'],
      learningObjectives: ['按递推规则生成杨辉三角并统一从 0 开始的行号', '把 C(n,k) 连接到选取方法数和二项式展开系数', '正确使用第 n 行奇数项个数 2^popcount(n)，并从数值图案区分观察与证明'],
      prerequisites: ['整数加法', '乘方', '组合数与二进制（进阶阶段）'],
      sources: [
        { label: 'NIST DLMF：Lattice Paths—Binomial Coefficients', url: 'https://dlmf.nist.gov/26.3', kind: 'reference' },
        { label: 'MacTutor：Yang Hui', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Yang_Hui/', kind: 'reference' },
        { label: 'Lucas’ theorem: generalizations, extensions and applications', url: 'https://arxiv.org/abs/1409.3820', kind: 'primary' }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  GM03: {
    title: '只知道三边怎样求面积（海伦公式）',
    intro: '三边满足严格三角不等式时，用半周长 s=(a+b+c)/2 和 A=√[s(s−a)(s−b)(s−c)] 求面积，并核对固定周长与退化边界。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: ['先检验严格三角不等式，再用海伦公式计算面积', '用余弦定理核对海伦公式与 ½ab·sin(C) 的一致性', '说明等边三角形面积最大必须以周长固定为前提'],
      prerequisites: ['三角形与面积', '平方根', '三角不等式与正弦（进阶阶段）'],
      sources: [
        { label: 'OpenStax Contemporary Mathematics：Heron’s formula', url: 'https://openstax.org/books/contemporary-mathematics/pages/10-6-area', kind: 'reference' },
        { label: 'Hero of Alexandria：Metrica I（选段）', url: 'https://web.calstatela.edu/faculty/hmendel/Ancient%20Mathematics/HeroAlexandrinus/Metrica.i.1-9/Metrica.I.1-9.html', kind: 'primary' },
        { label: 'University of Georgia：Problem Solving with Heron’s Formula', url: 'https://jwilson.coe.uga.edu/EMT725/Heron/Heron.html', kind: 'reference' }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  GR07: {
    title: '为什么“抽屉不够”必然产生重复（鸽巢原理）',
    intro: 'm 个物品分入 n 个抽屉时，至少一个抽屉含有 ⌈m/n⌉ 个物品。把确定性保证与均匀独立模型下的碰撞概率分开。',
    education: {
      gradeBands: ['primary', 'middle', 'high'],
      learningObjectives: ['识别应用问题中的物品和抽屉', '用总容量反证推广形式 ⌈m/n⌉', '区分鸽巢原理的必然保证与哈希、生日模型中的碰撞概率'],
      prerequisites: ['整数除法与向上取整', '分类', '概率与补事件（进阶阶段）'],
      sources: [
        { label: 'MIT 18.200：Pigeonhole Principle', url: 'https://ocw.mit.edu/courses/18-200-principles-of-discrete-applied-mathematics-spring-2024/resources/mit18_200_s24_lec01_pdf/', kind: 'reference' },
        { label: 'MIT Mathematics for Computer Science：Counting Principles', url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2005/11747cdb1edcb40420e61d0b03becb0d_cp9f.pdf', kind: 'reference' }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  PB02: {
    title: '换门为什么把胜率从 1/3 变成 2/3（Monty Hall）',
    intro: '在主持人知情、必开未选羊门、必提供换门机会的标准协议下，不换胜率为 1/3，换门胜率为 2/3；改变主持人协议会改变答案。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: ['完整声明标准主持人协议并枚举三个奖品位置', '用模拟比较不换与换门策略，同时区分频率和理论概率', '解释为什么不同主持人协议会产生不同条件概率'],
      prerequisites: ['等可能结果', '分数与百分数', '条件概率（进阶阶段）'],
      sources: [
        { label: 'Selvin：A Problem in Probability（1975）', url: 'https://www.tandfonline.com/doi/abs/10.1080/00031305.1975.10479121', kind: 'primary' },
        { label: 'Gill：The Monty Hall problem is not a probability puzzle', url: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1467-9574.2010.00474.x', kind: 'primary' }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  },
  AL07: {
    title: '每次排除一半（二分搜索）',
    intro: '在按非降序排列的数组中比较区间中点，每次排除一半，直到命中目标或区间为空；最坏比较次数随 log₂n 增长。',
    education: {
      gradeBands: ['middle', 'high'],
      learningObjectives: ['逐步维护 low、high 和 middle，解释每次排除哪一半', '区分 O(log n) 增长量级与具体最坏比较次数', '识别有序前提、重复值语义和安全中点写法'],
      prerequisites: ['有序数列与下标', '不等式', '以 2 为底的对数（进阶阶段）'],
      sources: [
        { label: 'NIST Dictionary of Algorithms and Data Structures：binary search', url: 'https://xlinux.nist.gov/dads/HTML/binarySearch.html', kind: 'reference' },
        { label: 'MIT Press：Introduction to Algorithms, Fourth Edition', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/', kind: 'reference' }
      ],
      reviewStatus: 'verified',
      lastReviewedAt: '2026-08-30'
    }
  }
};
