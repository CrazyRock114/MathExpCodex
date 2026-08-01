#!/usr/bin/env python3
"""
classify_experiments.py — v18.3 全站 148 实验分类审计

读 index.html 的 EXPERIMENTS 数组，输出:
  - 三类分布
  - conjecture_open / conjecture_proven 完整名单
  - axiom_theorem 数量
  - 与"硬规则"对比，给出疑似错位（PR06/PR07/EX14/EX19 这类边界）

用法: python3 classify_experiments.py
"""

import re
import sys
from collections import Counter

# 硬规则：这些 ID 必须是 conjecture_open
MUST_BE_OPEN = {
    'PR02': 'Collatz 猜想未证',
    'PR06': '强哥德巴赫未证',
    'PR07': '孪生素数未证',
    'NT16': '素数间隙增长率猜想未解',
    'NT19': '梅森素数无穷未证',
    'NT20': '哥德巴赫拆分对数渐近未解',
    'EX08': 'ECDLP 密码学困难性（边界）',
    'EX11': '黎曼猜想未证',
    'EX15': '谷山-志村已被 BCDT 2001 证明完整版，主体是定理（边界）',
}

# 硬规则：这些 ID 必须是 axiom_theorem
MUST_BE_AXIOM = {
    'EX14': 'Girko 圆定律是定理',
    'EX19': '基本群结构是定理',
}

# 硬规则：这些 ID 必须是 conjecture_proven
MUST_BE_PROVEN = {f'EX_PROVEN_{i:02d}': f'王虹/邓煜/陶哲轩/张益唐/丘成桐/Perelman/Wiles/Helfgott 等 20 个已证猜想' for i in range(1, 21)}


def main(path='index.html'):
    with open(path, 'r') as f:
        html = f.read()

    start = html.find('const EXPERIMENTS = [')
    end = html.find('\n];', start)
    arr_text = html[start:end+2]

    matches = re.findall(
        r"id:\s*'([^']+)',\s*type:\s*'([^']+)',\s*cat:\s*'([^']+)',\s*title:\s*'([^']+)'",
        arr_text,
    )

    print(f'=== {path} EXPERIMENTS 审计 ===\n')
    print(f'总实验数: {len(matches)}\n')

    types = Counter(m[1] for m in matches)
    print('类型分布:')
    for t, n in sorted(types.items(), key=lambda x: -x[1]):
        emoji = {'axiom_theorem': '📘', 'conjecture_open': '🔍', 'conjecture_proven': '🏆'}.get(t, '❓')
        print(f'  {emoji} {t}: {n}')

    print('\n=== 详细名单 ===')
    for t in ['conjecture_open', 'conjecture_proven']:
        print(f'\n【{t}】({types.get(t, 0)} 个)')
        for i, ty, cat, title in matches:
            if ty == t:
                print(f'  {i:14s} | {cat:6s} | {title}')

    # 校验硬规则
    print('\n=== 硬规则校验 ===')
    wrong = []
    for i, ty, cat, title in matches:
        if i in MUST_BE_OPEN and ty != 'conjecture_open':
            wrong.append((i, ty, f'应是 conjecture_open ({MUST_BE_OPEN[i]})'))
        if i in MUST_BE_AXIOM and ty != 'axiom_theorem':
            wrong.append((i, ty, f'应是 axiom_theorem ({MUST_BE_AXIOM[i]})'))
        if i in MUST_BE_PROVEN and ty != 'conjecture_proven':
            wrong.append((i, ty, f'应是 conjecture_proven'))

    if wrong:
        print(f'❌ 发现 {len(wrong)} 个错位:')
        for i, ty, reason in wrong:
            print(f'  {i:14s} 当前 type={ty:20s} → {reason}')
        return 1
    else:
        print('✅ 全部硬规则通过')
        return 0


if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
    sys.exit(main(path))
