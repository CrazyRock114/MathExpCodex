#!/usr/bin/env python3
"""
audit_year_tts.py — v18.3 全站讲稿年份读音准确性检查 v2

扫 audio/*.txt 全部讲稿，找出"YYYY 年"这种用阿拉伯数字直接写年份的情况。
TTS 系统对"1993"可能读"一千九百九十三"或"一九九三"，我们要求按位读"一九九三"，
所以讲稿应该写"一九九三年"而不是"1993年"。

也检测英文人名残留（应已被中文译名替换）。

用法: python3 audit_year_tts.py [--report report.md]
"""

import re
import sys
from pathlib import Path
from collections import defaultdict

# 已知非年份的数字模式（应被忽略）
NON_YEAR_PATTERNS = [
    re.compile(r'10[\^⁰-⁹¹ⁿ]+'),  # 10^n 科学记数法
    re.compile(r'[1-9]\d*[\.\-][\d.]+'),   # 10.5, 1-2
    re.compile(r'\d+[\.\-]\d+'),
    re.compile(r'约\s*\d+|≈\s*\d+'),  # 约 X / ≈ X
    re.compile(r'[1-9]\d*万'),  # X 万
    re.compile(r'[1-9]\d*亿'),  # X 亿
    re.compile(r'NT\d{2}|PR\d{2}|EX\d{2}|FR\d{2}|AL\d{2}|GM\d{2}|GR\d{2}|PB\d{2}|OT\d{2}|PE\d{2}|SQ\d{2}|EX_PROVEN_\d{2}'),
    re.compile(r'n\s*=\s*\d+'),  # n=1000
    re.compile(r'\d+\s*倍|\d+\s*位|\d+\s*步|\d+\s*次|\d+\s*种|\d+\s*个|\d+\s*层|\d+\s*人|\d+\s*倍|\d+\s*毫秒|\d+\s*秒'),
    re.compile(r'第\s*\d+'),
    re.compile(r'级\s*\d+|公元\s*\d+|公元前'),
    re.compile(r'≤\s*\d+|<=\s*\d+|≥\s*\d+|>=\s*\d+'),
    re.compile(r'\d+/\d+'),  # 分数
    re.compile(r'\d+\s*色'),  # 4 色
    re.compile(r'\d+\s*维'),  # 5 维
    re.compile(r'\d+°'),  # 度
    re.compile(r'\d+π'),
    re.compile(r'x\s*=\s*\d+|y\s*=\s*\d+'),
    re.compile(r'^to\s*\d+', re.IGNORECASE),  # to N
]

# 已知英文人名（应已被中文译名替换）
ENGLISH_NAMES = [
    'Kaprekar', 'Cooper', 'Kennedy', 'De Bono', 'Westzynthius',
    'Erdős', 'Rankin', 'Pythagoras',
    'Eisenstein', 'Ramanujan', 'Pisot', 'Vijayaraghavan',
    'Koblitz', 'Miller', 'Tate', 'Weil', 'Shanks', 'Tonelli',
]


def is_year_context(text, pos, num):
    """判断 4 位数字在文本中是否可能是年份上下文"""
    pre = text[max(0, pos - 30):pos]
    post = text[pos + len(num):pos + len(num) + 30]
    ctx = pre + '<' + num + '>' + post

    for pat in NON_YEAR_PATTERNS:
        if pat.search(ctx):
            return False

    # 必须 1000-2200 范围
    if not (1000 <= int(num) <= 2200):
        return False

    # 必须后跟 "年" 字符（中文，允许中间有空格）
    after = text[pos + len(num):pos + len(num) + 3]
    if not re.match(r'\s*年', after):
        return False

    return True


def audit_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    issues = []

    # 1) 4 位数 + "年"
    for m in re.finditer(r'(?<!\d)(\d{4})(?!\d)', text):
        num = m.group(1)
        if is_year_context(text, m.start(), num):
            pre = text[max(0, m.start() - 25):m.start()]
            post = text[m.end():m.end() + 25]
            ctx = (pre + '【' + num + '】' + post).replace('\n', ' ').strip()
            issues.append(('year_arabic', num, ctx))

    # 2) 英文人名残留
    for name in ENGLISH_NAMES:
        if name in text:
            for m in re.finditer(re.escape(name), text):
                s = max(0, m.start() - 20)
                e = min(len(text), m.end() + 20)
                ctx = text[s:e].replace('\n', ' ').strip()
                issues.append(('name_english', name, ctx))

    return issues


def main():
    project_root = Path(__file__).parent
    audio_dir = project_root / 'audio'
    if not audio_dir.exists():
        print('No audio dir')
        return 1

    total_files = 0
    total_issues = 0
    by_file = defaultdict(list)

    for p in sorted(audio_dir.glob('*.txt')):
        total_files += 1
        issues = audit_file(p)
        if issues:
            by_file[p.name] = issues
            total_issues += len(issues)

    print(f'=== 扫了 {total_files} 个讲稿 .txt 文件 ===')
    print(f'发现 {total_issues} 个年份/人名可疑项')
    print()

    by_kind = defaultdict(int)
    for issues in by_file.values():
        for kind, _, _ in issues:
            by_kind[kind] += 1
    print('按类型:')
    for k, n in sorted(by_kind.items(), key=lambda x: -x[1]):
        print(f'  {k}: {n}')

    # 输出 Top 30 有问题的文件
    sorted_files = sorted(by_file.items(), key=lambda x: -len(x[1]))
    print(f'\nTop {min(20, len(sorted_files))} 有问题的文件:')
    for fname, issues in sorted_files[:20]:
        print(f'  {fname}: {len(issues)} 项')
        for kind, val, ctx in issues[:2]:
            print(f'    [{kind}] {val} | ...{ctx[:80]}...')

    if total_issues > 0:
        with open(project_root / 'audit_year_tts_report.md', 'w', encoding='utf-8') as f:
            f.write(f'# v18.3 年份/人名读音审计报告\n\n')
            f.write(f'扫了 {total_files} 个 .txt 讲稿\n\n')
            f.write(f'发现 **{total_issues}** 个可疑项\n\n')
            f.write(f'## 按类型\n\n')
            for k, n in sorted(by_kind.items(), key=lambda x: -x[1]):
                f.write(f'- {k}: {n}\n')
            f.write(f'\n## 详细清单\n\n')
            for fname in sorted(by_file.keys()):
                f.write(f'### {fname}\n\n')
                for kind, val, ctx in by_file[fname]:
                    f.write(f'- [{kind}] `{val}` — {ctx[:120]}\n')
                f.write('\n')
        print(f'\n报告写到: audit_year_tts_report.md')

    return 0


if __name__ == '__main__':
    sys.exit(main())
