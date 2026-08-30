/* 此文件由 scripts/generate-catalog.mjs 生成，请勿手工修改。 */
import type { ExperimentSummary } from './experiment';

export const EXPERIMENT_CATALOG = [
  {
    "id": "PR01",
    "title": "投针算 π (Buffon 1733)",
    "intro": "把长度为 L 的针扔到画着等距平行线（间距 d）的纸上，针跨线概率 P = 2L/(πd)，反推 π。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR01.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“投针算 π (Buffon 1733)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR02",
    "title": "冰雹蹦跳 (Collatz 猜想)",
    "intro": "选一个正整数 n：偶数就除 2，奇数就 ×3+1，一直蹦下去，最后必到 1。",
    "category": "数论",
    "kind": "conjecture_open",
    "searchAliases": [
      "科拉茨",
      "冰雹猜想"
    ],
    "stageCount": 5,
    "legacyPath": "../../pages/PR02.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“冰雹蹦跳 (Collatz 猜想)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR03",
    "title": "猜勾股数 (Euclid 公式)",
    "intro": "本原勾股数 (a, b, c) 满足 a² + b² = c²。Euclid 公式：所有本原勾股数都长 (m²−n², 2mn, m²+n²)。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR03.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“猜勾股数 (Euclid 公式)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR04",
    "title": "四色定理 (Appel-Haken 1976)",
    "intro": "任何平面地图只用 4 种颜色，就能让相邻区域不同色。第一个必须靠计算机证明的著名定理。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR04.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“四色定理 (Appel-Haken 1976)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR05",
    "title": "拉姆齐 R(3,3) = 6",
    "intro": "6 个人聚会，必有 3 人互相认识或 3 人互不认识。等价于 K₆ 的红蓝着色必含单色三角形。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR05.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“拉姆齐 R(3,3) = 6”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR06",
    "title": "哥德巴赫配糖 (Goldbach 1742)",
    "intro": "任何大于 2 的偶数都能写成两个素数之和。强版至今未证，弱版（Helfgott 2013）已证。",
    "category": "数论",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR06.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“哥德巴赫配糖 (Goldbach 1742)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR07",
    "title": "孪生素数 (Twin Primes)",
    "intro": "相差 2 的素数对：(3,5)、(5,7)、(11,13)、(17,19)、(29,31)... 张益唐 2013 年里程碑证明。",
    "category": "数论",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR07.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“孪生素数 (Twin Primes)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PR08",
    "title": "π 的多算法对比（4 种并行）",
    "intro": "阿基米德割圆 / Leibniz / Machin / Chudnovsky——同一目标 π，4 种完全不同的算法，差距 6 个数量级。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PR08.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“π 的多算法对比（4 种并行）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT01",
    "title": "完美数搜索",
    "intro": "若 n 的真因子之和等于 n，则 n 是完美数。6 = 1+2+3、28 = 1+2+4+7+14...",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT01.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“完美数搜索”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT02",
    "title": "亲和数对搜索",
    "intro": "若 a 的真因子之和 = b 且 b 的真因子之和 = a，(a, b) 是亲和数。最小对：(220, 284)。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT02.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“亲和数对搜索”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT03",
    "title": "过剩 / 完美 / 亏数",
    "intro": "比较 σ(n) - n 与 n：< 亏数，= 完美数，> 过剩数。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT03.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“过剩 / 完美 / 亏数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT04",
    "title": "自恋数（阿姆斯特朗数）",
    "intro": "若 n 等于其各位数字的 k 次方之和（k = 位数），则 n 是自恋数。153 = 1³+5³+3³。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT04.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“自恋数（阿姆斯特朗数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT05",
    "title": "快乐数",
    "intro": "把一个数的各位数字平方求和，迭代：最终到 1 → 快乐；进入循环 → 不快乐。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT05.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“快乐数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT06",
    "title": "Harshad 数（Niven 数）",
    "intro": "若 n 能被其各位数字之和整除，则 n 是 Harshad 数。例：12 ÷ (1+2) = 4 ✓",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT06.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Harshad 数（Niven 数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT07",
    "title": "Kaprekar 变换",
    "intro": "把 n 各位排序（大-小组成大数 - 小-大组成小数），迭代到固定点 6174（4 位数）。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT07.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Kaprekar 变换”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT08",
    "title": "回文数（迭代到回文）",
    "intro": "n + reverse(n)，迭代：最终得到回文数。例：87 + 78 = 165 → 561 + 165 = 726 → ...",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT08.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“回文数（迭代到回文）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT09",
    "title": "Carmichael 数（绝对伪素数）",
    "intro": "合数 n 若对所有与 n 互素的 b 都满足 b^(n-1) ≡ 1 (mod n)，则是 Carmichael 数。最小的 3 个：561、1105、1729。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT09.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Carmichael 数（绝对伪素数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT10",
    "title": "Smith 数",
    "intro": "合数 n 若其各位数字之和 = 其所有素因子（带重数）的各位数字之和，则 n 是 Smith 数。例：4 = 2×2 → 4 = 2+2 ✓",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT10.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Smith 数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT11",
    "title": "吸血鬼数",
    "intro": "若 n = a × b（a, b 都含 n 的一半位数，且都非 0 结尾），且 n 的位是 a + b 的位重排，则 n 是吸血鬼数。例：1260 = 21 × 60。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT11.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“吸血鬼数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT12",
    "title": "三角形数",
    "intro": "T_n = n(n+1)/2：1, 3, 6, 10, 15, 21, 28, 36, 45, 55...",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT12.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“三角形数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT13",
    "title": "四面体数",
    "intro": "Tetra_n = n(n+1)(n+2)/6：1, 4, 10, 20, 35, 56, 84...",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT13.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“四面体数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT14",
    "title": "数字根（Digital Root）",
    "intro": "反复求各位数字之和直到 1 位数。例：38 → 3+8 = 11 → 1+1 = 2。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT14.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“数字根（Digital Root）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT15",
    "title": "回文素数",
    "intro": "既是素数又是回文数的数：2, 3, 5, 7, 11, 101, 131, 151, 181, 191, 313, 353, 373, 383...",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT15.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“回文素数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT16",
    "title": "素数间隙（Prime Gaps）",
    "intro": "相邻素数的差。例：7-5=2、11-7=4、13-11=2。最大间隙随 N 增长。",
    "category": "数论",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT16.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“素数间隙（Prime Gaps）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT17",
    "title": "模运算可视化",
    "intro": "看 n mod m 在不同 n 下的余数。例：mod 7：1, 2, 3, 4, 5, 6, 0, 1, 2, ...",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT17.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“模运算可视化”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT18",
    "title": "欧拉 φ 函数",
    "intro": "φ(n) = 与 n 互素且 ≤ n 的正整数个数。例：φ(10) = 4（1, 3, 7, 9）。",
    "category": "数论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT18.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“欧拉 φ 函数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT19",
    "title": "梅森素数（部分）",
    "intro": "形如 2^p - 1 的素数（p 也必须是素数）。已知 51 个。例：3, 7, 31, 127, 8191, 131071...",
    "category": "数论",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT19.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“梅森素数（部分）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "NT20",
    "title": "哥德巴赫拆分可视化",
    "intro": "每个偶数 = 两素数之和的分解对数。100 = 3+97, 11+89, 17+83...",
    "category": "数论",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/NT20.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“哥德巴赫拆分可视化”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "整数、因数与倍数"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ01",
    "title": "Fibonacci 数列",
    "intro": "F_1=F_2=1, F_n = F_{n-1} + F_{n-2}。1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [
      "斐波那契"
    ],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ01.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Fibonacci 数列”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ02",
    "title": "Fibonacci 与黄金比例",
    "intro": "F_{n+1} / F_n → φ = 1.618... 越来越准。φ = (1+√5)/2。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [
      "斐波那契"
    ],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ02.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Fibonacci 与黄金比例”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ03",
    "title": "Lucas 数列",
    "intro": "L_1=1, L_2=3, L_n = L_{n-1} + L_{n-2}。1, 3, 4, 7, 11, 18, 29, 47, 76, 123...",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ03.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Lucas 数列”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ04",
    "title": "Catalan 数",
    "intro": "C_n = C(2n, n) / (n+1)。1, 1, 2, 5, 14, 42, 132, 429, 1430...",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ04.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Catalan 数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ05",
    "title": "Bell 数（集合划分数）",
    "intro": "B_n = n 个元素的集合的划分数。1, 1, 2, 5, 15, 52, 203, 877, 4140...",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ05.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Bell 数（集合划分数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ06",
    "title": "错排（Derangement）",
    "intro": "D_n = n 个元素的排列中没有元素在原位的数目。1, 0, 1, 2, 9, 44, 265, 1854...",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ06.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“错排（Derangement）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ07",
    "title": "帕斯卡三角与二项式",
    "intro": "(x+y)^n = Σ C(n,k) x^k y^(n-k)。帕斯卡三角每行是二项式系数。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ07.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“帕斯卡三角与二项式”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ08",
    "title": "整数分拆 p(n)",
    "intro": "把 n 写成若干正整数之和的方法数。p(5) = 7：5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ08.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“整数分拆 p(n)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ09",
    "title": "三角数 + 三角数 = 平方数",
    "intro": "两个连续三角数之和 = 平方数：T_n + T_{n+1} = (n+1)²。例：3 + 6 = 9。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ09.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“三角数 + 三角数 = 平方数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ10",
    "title": "斐波那契词（Fibonacci word）",
    "intro": "S(0) = \"0\", S(1) = \"01\", S(n) = S(n-1) + S(n-2)。生成二进制字符串。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [
      "斐波那契"
    ],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ10.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“斐波那契词（Fibonacci word）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ11",
    "title": "三角数 T_n = n(n+1)/2 检验",
    "intro": "判断 N 是否是三角数（即存在 n 使 T_n = N）。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ11.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“三角数 T_n = n(n+1)/2 检验”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ12",
    "title": "Eulerian 数（排列的上升数）",
    "intro": "⟨n, k⟩ = n 个元素的排列中恰有 k 个\"上升\"位置的数目。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ12.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Eulerian 数（排列的上升数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ13",
    "title": "Stirling 数（第二类）",
    "intro": "S(n, k) = n 个元素的集合分到 k 个非空子集的方法数。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ13.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Stirling 数（第二类）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ14",
    "title": "幸运数（lucky numbers）",
    "intro": "由\"筛法\"生成：1, 3, 7, 9, 13, 15, 21, 25, 31, 33, 37, 43, 49... 与素数筛类似但更神奇。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ14.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“幸运数（lucky numbers）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "SQ15",
    "title": "回文数与 Lychrel 数",
    "intro": "LyChrel 猜想：有些数（如 196）可能永远迭代不到回文数。",
    "category": "序列",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/SQ15.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“回文数与 Lychrel 数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和描述规律"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE01",
    "title": "Wallis 乘积",
    "intro": "π/2 = 2·2·4·4·6·6.../1·3·3·5·5·7... 收敛慢但优雅。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE01.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Wallis 乘积”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE02",
    "title": "Nilakantha 级数",
    "intro": "π = 3 + 4/(2·3·4) - 4/(4·5·6) + 4/(6·7·8) - ... 比 Leibniz 收敛快。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE02.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Nilakantha 级数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE03",
    "title": "Ramanujan π 公式",
    "intro": "1910 年拉马努金发现：1/π = (2√2/9801) Σ (4k)!(1103+26390k) / ((k!)^4 · 396^(4k))",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE03.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Ramanujan π 公式”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE04",
    "title": "BBP 算法（十六进制 π 位）",
    "intro": "1995 年贝尔曼公式，可直接算 π 的第 n 位十六进制，无需算前 n-1 位。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE04.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“BBP 算法（十六进制 π 位）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE05",
    "title": "蒙特卡洛 π（圆面积法）",
    "intro": "在 1×1 正方形内随机撒点，统计落在 1/4 圆内的比例 × 4 = π。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE05.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“蒙特卡洛 π（圆面积法）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE06",
    "title": "e 的泰勒展开",
    "intro": "e^x = Σ x^n / n!。令 x=1：e = 1 + 1 + 1/2 + 1/6 + 1/24 + ...",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE06.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“e 的泰勒展开”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE07",
    "title": "复利极限 = e",
    "intro": "(1 + 1/n)^n 随 n 增大趋近 e：n=10→2.59, n=100→2.70, n=1000→2.717。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE07.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“复利极限 = e”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE08",
    "title": "φ（黄金比例）的连分数",
    "intro": "φ = 1 + 1/(1 + 1/(1 + 1/(1 + ...)))。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE08.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“φ（黄金比例）的连分数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE09",
    "title": "欧拉-马斯刻若尼常数 γ",
    "intro": "γ = lim(1 + 1/2 + 1/3 + ... + 1/n - ln n) ≈ 0.5772。",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE09.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“欧拉-马斯刻若尼常数 γ”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PE10",
    "title": "圆周率日（3/14 课堂演示）",
    "intro": "3 月 14 日是国际数学日（π Day）。π = 3.1415926...",
    "category": "π·e",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PE10.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“圆周率日（3/14 课堂演示）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与小数",
        "平面图形基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM01",
    "title": "多边形内角和",
    "intro": "n 边形内角和 = (n-2) × 180°。三角形 180°、四边形 360°、五边形 540°...",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM01.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“多边形内角和”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM02",
    "title": "多边形外角和 = 360°",
    "intro": "任何凸多边形的外角和恒等于 360°。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM02.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“多边形外角和 = 360°”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM03",
    "title": "海伦公式（三角形面积）",
    "intro": "S = √(s(s-a)(s-b)(s-c))，其中 s = (a+b+c)/2。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM03.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“海伦公式（三角形面积）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM04",
    "title": "球体积与表面积",
    "intro": "V = (4/3)πr³，A = 4πr²。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM04.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“球体积与表面积”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM05",
    "title": "圆柱表面积与体积",
    "intro": "V = πr²h，A = 2πr² + 2πrh（含上下底）。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM05.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“圆柱表面积与体积”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM06",
    "title": "柏拉图立体（5 种正多面体）",
    "intro": "正四面体、立方体、正八面体、正十二面体、正二十面体。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM06.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“柏拉图立体（5 种正多面体）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM07",
    "title": "欧拉多面体公式 V - E + F = 2",
    "intro": "验证：对凸多面体，V - E + F = 2。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM07.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“欧拉多面体公式 V - E + F = 2”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM08",
    "title": "黄金三角形（等腰 36-72-72）",
    "intro": "等腰三角形底与腰之比 = 1/φ 的三角形。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM08.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“黄金三角形（等腰 36-72-72）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM09",
    "title": "正五角星与黄金比例",
    "intro": "正五角星的对角线与边之比 = φ。",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM09.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“正五角星与黄金比例”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GM10",
    "title": "正多边形对角线数",
    "intro": "n 边形的对角线数 = n(n-3)/2。三角形 0、四边形 2、五边形 5...",
    "category": "几何",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GM10.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“正多边形对角线数”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "长度、角度与面积"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR01",
    "title": "欧拉路径（Königsberg 七桥）",
    "intro": "若图所有顶点度为偶数 → 欧拉回路；恰 2 个奇度 → 欧拉路径；否则不存在。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR01.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“欧拉路径（Königsberg 七桥）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR02",
    "title": "旅行商（TSP）暴力 / 贪心",
    "intro": "n 个城市间两两距离，求访问每个城市恰好一次回到起点的最短路径。暴力 = 精确；贪心 = 快速近似。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR02.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“旅行商（TSP）暴力 / 贪心”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR03",
    "title": "图连通性检验",
    "intro": "判断无向图是否连通（任意两顶点都有路径）。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR03.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“图连通性检验”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR04",
    "title": "二叉树遍历（先序 / 中序 / 后序）",
    "intro": "先序：根-左-右；中序：左-根-右；后序：左-右-根。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR04.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“二叉树遍历（先序 / 中序 / 后序）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR05",
    "title": "二项式 (x+y)^n 展开",
    "intro": "(x+y)^n = Σ C(n,k) x^k y^(n-k)。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR05.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“二项式 (x+y)^n 展开”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR06",
    "title": "容斥原理 |A∪B∪C|",
    "intro": "|A∪B∪C| = Σ|Ai| - Σ|Ai∩Aj| + |A∩B∩C|。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR06.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“容斥原理 |A∪B∪C|”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR07",
    "title": "抽屉原理演示",
    "intro": "n+1 个物品放 n 个抽屉，必有 1 抽屉装 ≥ 2 个。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR07.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“抽屉原理演示”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR08",
    "title": "多项式乘法卷积",
    "intro": "(1 + 2x + 3x²) × (4 + 5x) = 4 + 13x + 22x² + 15x³。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR08.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“多项式乘法卷积”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR09",
    "title": "握手引理：Σ 度 = 2|E|",
    "intro": "所有顶点度之和 = 2 倍边数（每条边贡献 2 个端点）。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR09.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“握手引理：Σ 度 = 2|E|”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "GR10",
    "title": "树的边数 = 顶点数 - 1",
    "intro": "连通无环图（树）的边数恒等于顶点数减 1。",
    "category": "图论",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/GR10.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“树的边数 = 顶点数 - 1”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "集合与关系",
        "逻辑推理"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB01",
    "title": "生日悖论",
    "intro": "23 人中至少 2 人同生日的概率 > 50%。鸽巢原理的变种。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB01.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“生日悖论”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB02",
    "title": "Monty Hall 三门问题",
    "intro": "选一扇门，主持人开一扇无奖的门。改选 vs 不改，胜率 2/3 vs 1/3。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB02.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Monty Hall 三门问题”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB03",
    "title": "二项分布（抛硬币 n 次正面次数）",
    "intro": "P(X=k) = C(n,k) p^k (1-p)^(n-k)。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB03.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“二项分布（抛硬币 n 次正面次数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB04",
    "title": "几何分布（首次成功）",
    "intro": "P(X=k) = (1-p)^(k-1) p。期望 E(X) = 1/p。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB04.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“几何分布（首次成功）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB05",
    "title": "中心极限定理演示",
    "intro": "n 个独立同分布随机变量之和趋近正态。例：36 次骰子点数之和近似 N(126, 105)。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB05.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“中心极限定理演示”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB06",
    "title": "大数定律演示",
    "intro": "n 次独立试验的样本均值趋近期望。例：抛 10000 次硬币，正面比例趋近 0.5。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB06.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“大数定律演示”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB07",
    "title": "赌徒破产（随机游走）",
    "intro": "赌徒有 A 元，每次以 p 概率赢 1 元，q=1-p 概率输 1 元，输到 0 或赢到 B 元停。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB07.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“赌徒破产（随机游走）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB08",
    "title": "条件概率：贝叶斯公式",
    "intro": "P(A|B) = P(B|A) · P(A) / P(B)。医学检测示例。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB08.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“条件概率：贝叶斯公式”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB09",
    "title": "Bertrand 悖论（圆内随机弦）",
    "intro": "\"随机弦\"有 3 种定义，得出不同答案。揭示\"随机\"需要明确定义。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB09.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Bertrand 悖论（圆内随机弦）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "PB10",
    "title": "Poisson 分布（稀有事件）",
    "intro": "P(X=k) = λ^k e^(-λ) / k!。λ 是单位时间平均事件数。",
    "category": "概率",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/PB10.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Poisson 分布（稀有事件）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "分数与比例",
        "数据统计基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL01",
    "title": "24 点游戏",
    "intro": "用 4 个数字（1-13）和 + - × ÷ 算出 24。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL01.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“24 点游戏”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL02",
    "title": "Nim 游戏（人机对战）",
    "intro": "n 堆石子，你和 AI 轮流选一堆取任意个。取完最后一颗者胜。AI 用标准 Nim 异或策略。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL02.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Nim 游戏（人机对战）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL03",
    "title": "约瑟夫问题（环形淘汰）",
    "intro": "n 人围成一圈，每数到 k 的人被淘汰，最后剩的是谁？",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL03.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“约瑟夫问题（环形淘汰）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL04",
    "title": "汉诺塔递归",
    "intro": "n 个盘从 A 移到 C，借助 B。最少 2^n - 1 步。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL04.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“汉诺塔递归”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL05",
    "title": "八皇后（8 皇后问题）",
    "intro": "8×8 棋盘放 8 个皇后互不攻击。所有 92 个解。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL05.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“八皇后（8 皇后问题）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL06",
    "title": "数独求解（4×4 简单版）",
    "intro": "4×4 数独：每行/列/宫有 1-4 各一个。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL06.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“数独求解（4×4 简单版）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL07",
    "title": "二分搜索（有序数组）",
    "intro": "O(log n) 时间找到目标。每次范围减半。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL07.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“二分搜索（有序数组）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL08",
    "title": "冒泡排序可视化",
    "intro": "每次遍历把最大元素\"冒\"到末尾。O(n²)。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL08.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“冒泡排序可视化”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL09",
    "title": "快速排序（分治）",
    "intro": "选 pivot，小的放左大的放右，递归。平均 O(n log n)。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL09.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“快速排序（分治）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "AL10",
    "title": "素数筛（埃拉托斯特尼）",
    "intro": "从 2 开始，把每个素数的倍数标记为合数。O(n log log n)。",
    "category": "算法",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/AL10.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“素数筛（埃拉托斯特尼）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "分步骤解决问题"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "FR01",
    "title": "曼德博集合",
    "intro": "复数 c：迭代 z = z² + c，若不发散则 c ∈ Mandelbrot 集。",
    "category": "分形",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/FR01.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“曼德博集合”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "重复与缩放"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "FR02",
    "title": "谢尔宾斯基三角",
    "intro": "递归：等边三角形挖中间小三角形。",
    "category": "分形",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/FR02.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“谢尔宾斯基三角”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "重复与缩放"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "FR03",
    "title": "Koch 雪花",
    "intro": "每条边三等分，中间一段替换成两条等长边（凸出）。",
    "category": "分形",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/FR03.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Koch 雪花”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "重复与缩放"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "FR04",
    "title": "分形树（递归）",
    "intro": "每根枝干分两根小枝，角度 ±30°，长度 0.7×。",
    "category": "分形",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/FR04.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“分形树（递归）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "重复与缩放"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "FR05",
    "title": "Julia 集（z² + c 迭代）",
    "intro": "固定 c = -0.8 + 0.156i，看哪些 z 不发散。",
    "category": "分形",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/FR05.html",
    "education": {
      "gradeBands": [
        "middle",
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Julia 集（z² + c 迭代）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "平面图形",
        "重复与缩放"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT01",
    "title": "幻方（Lo Shu 3×3 魔方）",
    "intro": "3×3 幻方：每行/列/对角线之和 = 15。使用 1-9 各一次。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT01.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“幻方（Lo Shu 3×3 魔方）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT02",
    "title": "河内塔（递归）",
    "intro": "同 AL04 但用 SVG 演示。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT02.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“河内塔（递归）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT03",
    "title": "阿基米德螺旋",
    "intro": "r = a + b·θ。等距螺旋。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT03.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“阿基米德螺旋”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT04",
    "title": "数字根（九宫格）",
    "intro": "n 的数字根 = n mod 9（n > 0），特例 9 的根是 9。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT04.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“数字根（九宫格）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT05",
    "title": "棋盘多米诺铺瓦",
    "intro": "m × n 棋盘（m, n 都偶）一定能被多米诺骨牌铺满；m, n 都奇不能。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT05.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“棋盘多米诺铺瓦”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT06",
    "title": "螺旋矩阵（顺时针）",
    "intro": "n × n 矩阵按顺时针填 1, 2, ..., n²。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT06.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“螺旋矩阵（顺时针）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT07",
    "title": "幻方 4×4（Dürer）",
    "intro": "丢勒 1514 年画的 4×4 幻方，底部两格是 15、14 即创作年份。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT07.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“幻方 4×4（Dürer）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT08",
    "title": "Tic-Tac-Toe（井字棋 AI）",
    "intro": "3×3 井字棋。AI 用极小化极大算法。难度可选。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT08.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Tic-Tac-Toe（井字棋 AI）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT09",
    "title": "3 个杯子猜球（贝叶斯）",
    "intro": "3 杯 1 球，主持人（知道球在哪）给你提示——展示条件概率。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT09.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“3 个杯子猜球（贝叶斯）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "OT10",
    "title": "生命游戏（Conway）",
    "intro": "细胞自动机：活细胞 2-3 邻居活下来；死细胞 3 邻居复活。",
    "category": "其他",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/OT10.html",
    "education": {
      "gradeBands": [
        "primary",
        "middle"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“生命游戏（Conway）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "四则运算",
        "观察和提出猜想"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX01",
    "title": "莱洛三角形（等宽曲线）",
    "intro": "三段等长直线组成的\"最像圆的三角形\"，等宽曲线。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX01.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“莱洛三角形（等宽曲线）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX02",
    "title": "莫比乌斯带（拓扑入门）",
    "intro": "把纸条拧 180° 再粘起来，只有一面。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX02.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“莫比乌斯带（拓扑入门）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX03",
    "title": "克莱因瓶（不可定向曲面）",
    "intro": "没有内外之分的瓶——莫比乌斯带升级版。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX03.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“克莱因瓶（不可定向曲面）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX04",
    "title": "彭罗斯铺瓦（非周期）",
    "intro": "两种菱形铺满平面，不重复的图案。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX04.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“彭罗斯铺瓦（非周期）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX05",
    "title": "欧拉线（重心-垂心-外心共线）",
    "intro": "三角形三个心共线——欧拉 1765 年发现。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX05.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“欧拉线（重心-垂心-外心共线）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX06",
    "title": "复数可视化（高斯平面）",
    "intro": "用 (a, bi) 表示复数，加减乘都变几何变换。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX06.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“复数可视化（高斯平面）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX07",
    "title": "四元数（3D 旋转）",
    "intro": "复数 3D 版：i² + j² + k² = ijk = -1。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX07.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“四元数（3D 旋转）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX08",
    "title": "椭圆曲线 y² = x³ + ax + b",
    "intro": "y² 等于 x³ 加 ax 加 b，密码学核心。",
    "category": "前沿",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX08.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“椭圆曲线 y² = x³ + ax + b”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX09",
    "title": "庞加莱圆盘（双曲几何）",
    "intro": "把无穷远点挤进单位圆内——非欧几何。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX09.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“庞加莱圆盘（双曲几何）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX10",
    "title": "莫比乌斯变换（保角映射）",
    "intro": "复平面的\"分数线性变换\"，把圆映到圆。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX10.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“莫比乌斯变换（保角映射）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX11",
    "title": "黎曼 ζ 函数可视化",
    "intro": "Σ 1/n^s，s=1 时发散；s=2 时等于 π²/6。",
    "category": "前沿",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX11.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“黎曼 ζ 函数可视化”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX12",
    "title": "高斯素数（高斯整数环）",
    "intro": "复数 a+bi 中的素数——a²+b² 形式分解。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX12.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“高斯素数（高斯整数环）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX13",
    "title": "切比雪夫多项式",
    "intro": "T_n(cos θ) = cos(nθ)，最小化最大误差的多项式。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX13.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“切比雪夫多项式”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX14",
    "title": "随机矩阵特征值分布",
    "intro": "N×N 随机矩阵特征值在复平面上形成圆形分布。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX14.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“随机矩阵特征值分布”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX15",
    "title": "模形式（双周期函数）",
    "intro": "f(z) = f(z+1) = f(z+i)——双周期解析函数。",
    "category": "前沿",
    "kind": "conjecture_open",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX15.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“模形式（双周期函数）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX16",
    "title": "椭圆曲线上的同源（ECC 密码学）",
    "intro": "ECC 加密核心：y² = x³ + 7 上的点构成阿贝尔群——Bitcoin / TLS 1.3 都用它。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX16.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“椭圆曲线上的同源（ECC 密码学）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX17",
    "title": "量子谐振子波函数 ψ_n(x)",
    "intro": "ψ_n(x) ∝ H_n(x) e^(-x²/2)——量子态，分子振动、晶格声子、量子光场都用。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX17.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“量子谐振子波函数 ψ_n(x)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX18",
    "title": "马尔可夫链与转移矩阵",
    "intro": "状态转移矩阵 P^n → 稳态分布——天气、PageRank、MCMC 全用这个模型。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX18.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“马尔可夫链与转移矩阵”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX19",
    "title": "同伦群示意（基本群 π₁）",
    "intro": "π₁(Sⁿ) = 0 vs π₁(S¹) = ℤ——拓扑不变量，连续形变不改变。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX19.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“同伦群示意（基本群 π₁）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX20",
    "title": "高斯积分 ∫e^(-x²)dx = √π",
    "intro": "用极坐标算 e^(-x²) 的积分——正态分布、概率论、量子场论的基础。",
    "category": "前沿",
    "kind": "axiom_theorem",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX20.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“高斯积分 ∫e^(-x²)dx = √π”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "几何或概率基础"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_01",
    "title": "挂谷集的几何构造（Kakeya 1928 → Besicovitch）",
    "intro": "1917 年日本数学家挂谷宗一提出\"小厕所转棒\"问题；1928 年 Besicovitch 构造出面积可任意小的挂谷集——用佩龙树\"劈-叠\"。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_01.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“挂谷集的几何构造（Kakeya 1928 → Besicovitch）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_02",
    "title": "2D 挂谷猜想证明（Davies 1971）",
    "intro": "1971 年英国数学家 R.O. Davies 完整证明：二维平面中挂谷集的 Hausdorff 维数 = 2。用\"夹\"法：上界 ≤ 2，下界 ≥ 2。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_02.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“2D 挂谷猜想证明（Davies 1971）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_03",
    "title": "2D 黏性挂谷集（王虹 2022 简化）",
    "intro": "黏性 Kakeya 集：所有方向的针\"黏\"成细管。Wolff 1999 首次形式化，王虹 2022 给出 6 页简化证明。关键结论：dim 仍 = 2。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_03.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“2D 黏性挂谷集（王虹 2022 简化）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_04",
    "title": "3D 挂谷猜想 Wolff 下界（1999）",
    "intro": "Thomas Wolff 1999 证明：3D 空间中挂谷集的 Hausdorff 维数 ≥ 2.5。核心工具是\"烧饼估计\"（platter estimate），开启了后续 26 年的 3D 攻坚。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_04.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“3D 挂谷猜想 Wolff 下界（1999）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_05",
    "title": "3D 黏性 Kakeya 证明 (王虹+Zahl 2022)",
    "intro": "2022 年王虹 (Hong Wang) 与 Joshua Zahl 证明：3D 中「黏性 Kakeya 集」（方向相似细管抱团）的 Hausdorff 维数 = 3。这是攻克百年挂谷猜想的关键第一步。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_05.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“3D 黏性 Kakeya 证明 (王虹+Zahl 2022)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_06",
    "title": "3D 挂谷 Assouad 维数 (王虹+Zahl 2024)",
    "intro": "2024 年王虹 (Hong Wang) 与 Joshua Zahl 进一步证明：3D Kakeya 集的 Assouad 维数（比 Minkowski 维数更强的局部放大指标）也 = 3。这是黏性 Kakeya 之后的第二步里程碑。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_06.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“3D 挂谷 Assouad 维数 (王虹+Zahl 2024)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_07",
    "title": "3D 挂谷猜想完整证明 (王虹+Zahl 2025) ★最重磅★",
    "intro": "公元 2025 年 2 月，王虹 (Hong Wang) 与 Joshua Zahl 发表 127 页论文 (arXiv:2502.17655)，完整证明 3D Kakeya 猜想的 Hausdorff 维数 + Minkowski 维数都 = 3，结束了这个 1917 年悬而未决的百年问题。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_07.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“3D 挂谷猜想完整证明 (王虹+Zahl 2025) ★最重磅★”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_08",
    "title": "Falconer 距离集 2D 突破 (王虹+Guth+Du 2024)",
    "intro": "2024 年王虹 (Hong Wang) 与 Larry Guth (MIT)、Du (杜亚楠) 合作证明 2D 情形下 Falconer 距离猜想的关键临界指数下界，将这个 1985 年悬而未决的猜想推进了一大步。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_08.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Falconer 距离集 2D 突破 (王虹+Guth+Du 2024)”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_09",
    "title": "Furstenberg 集合猜想完整证明（王虹 2024）",
    "intro": "1970 Furstenberg 提出：自然数中上密度正的子集 A，其加法表 A+A 必含任意长等差数列。54 年悬案，2024 王虹与合作者用动力系统 + 加法组合完整解决。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_09.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Furstenberg 集合猜想完整证明（王虹 2024）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_10",
    "title": "调和分析猜想之塔（Fefferman-王虹）",
    "intro": "调和分析有四层互相联系的猜想：挂谷（底）→ 限制 → Bochner-Riesz → 局部光滑化（顶）。王虹 + Guth + Zahl 2025 完整证明挂谷猜想，相当于夯实了整座塔的地基。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_10.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“调和分析猜想之塔（Fefferman-王虹）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_11",
    "title": "希尔伯特第六问题（狭义）—— 邓煜+马骁+Hani 2025",
    "intro": "1900 年希尔伯特在 23 个问题中第 6 个：流体力学公理化。125 年后，邓煜+马骁+Zaher Hani 2025 用硬球系统 + 玻尔兹曼方程 + Navier-Stokes 推导链，完整解决狭义版本。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_11.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“希尔伯特第六问题（狭义）—— 邓煜+马骁+Hani 2025”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_12",
    "title": "硬球系统 → 玻尔兹曼方程推导（邓煜+马骁+Hani 2025）",
    "intro": "1 升气体 = 3×10²² 个分子。邓煜+马骁+Hani 2025 严格证明：硬球系统在低密度极限下，宏观必然满足 Boltzmann 方程。从微观到宏观的桥梁，153 年悬案落地。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_12.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“硬球系统 → 玻尔兹曼方程推导（邓煜+马骁+Hani 2025）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_13",
    "title": "Boltzmann → Navier-Stokes 推导链（邓煜+马骁+Hani 2025）",
    "intro": "1872 年 Boltzmann 分子动力学方程 → 2025 年邓煜+马骁+Hani 严格推导出可压缩 Navier-Stokes 方程。两百年的跨尺度推导链，把 10²⁵ 个分子和连续流体连起来。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_13.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Boltzmann → Navier-Stokes 推导链（邓煜+马骁+Hani 2025）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_14",
    "title": "庞加莱猜想证明（Perelman 2003）",
    "intro": "1904 年庞加莱提出 3 维球面是唯一封闭 3-流形，2003 年俄裔数学家 Grigori Perelman 用 Ricci flow + 手术给出证明，2006 年拒领菲尔兹奖 + 千禧百万奖金。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_14.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“庞加莱猜想证明（Perelman 2003）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_15",
    "title": "Ricci flow 几何演化方程（Hamilton 1982, Perelman 2003 改进）",
    "intro": "1982 年 Hamilton 引入，2003 年 Perelman 用 Ricci flow + 手术 (surgery) 证明庞加莱猜想；2006 年朱熹平/曹怀东给出 500+ 页完整补充。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_15.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Ricci flow 几何演化方程（Hamilton 1982, Perelman 2003 改进）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_16",
    "title": "费马大定理证明（Wiles 1995 + Taylor-Wiles）",
    "intro": "1637 年费马在《算术》页边写下 xⁿ+yⁿ=zⁿ 无正整数解的猜想，1995 年 Andrew Wiles 用椭圆曲线 + 模形式给出 109 页完整证明。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_16.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“费马大定理证明（Wiles 1995 + Taylor-Wiles）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_17",
    "title": "谷山-志村猜想的部分证明（Wiles）",
    "intro": "1955 年日本数学家谷山丰提出\"每条椭圆曲线都对应一个模形式\"，Wiles 1995 年证明半稳定情形（间接证明费马大定理）。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_17.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“谷山-志村猜想的部分证明（Wiles）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_18",
    "title": "孪生素数有界间隙（张益唐 2013）",
    "intro": "孪生素数（差 2 的素数对）猜想：张益唐 2013 年证明存在无穷多对、间隙有界 < 7000 万，论文引发数学界轰动。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_18.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“孪生素数有界间隙（张益唐 2013）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_19",
    "title": "弱哥德巴赫证明（Helfgott 2013）",
    "intro": "1742 年 Goldbach 提出\"每个奇数 = 三个素数之和\"。Helfgott 2013 用圆法完整证明——从 Vinogradov 1937 的\"足够大\"到 2013 的\"每个都成立\"，走了 76 年。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_19.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“弱哥德巴赫证明（Helfgott 2013）”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  },
  {
    "id": "EX_PROVEN_20",
    "title": "Calabi 猜想证明（丘成桐 1976）—— 首位华人菲尔兹奖",
    "intro": "Calabi 1954 猜测\"封闭 Kähler 流形上的 Ricci 形式有唯一 Kähler 形式满足它\"。丘成桐 1976 年用偏微分方程完整证明，1982 年获菲尔兹奖——首位华人菲尔兹奖得主。",
    "category": "已证",
    "kind": "conjecture_proven",
    "searchAliases": [],
    "stageCount": 5,
    "legacyPath": "../../pages/EX_PROVEN_20.html",
    "education": {
      "gradeBands": [
        "high"
      ],
      "learningObjectives": [
        "通过可视化和操作描述“Calabi 猜想证明（丘成桐 1976）—— 首位华人菲尔兹奖”中的核心现象",
        "比较不同输入或参数下的结果，并用自己的语言解释观察到的规律"
      ],
      "prerequisites": [
        "代数与函数",
        "理解定理与猜想的区别"
      ],
      "sources": [],
      "reviewStatus": "unreviewed",
      "lastReviewedAt": null
    }
  }
] as const satisfies readonly ExperimentSummary[];
