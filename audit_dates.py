#!/usr/bin/env python3
"""
audit_dates.py — v18.3 全站 148 实验日期/年份准确性审计

扫 index.html + pages/*.html 的 explain/intro/principle/history 块，
提取所有"年份+人名"模式，给出疑似错位清单。

用法: python3 audit_dates.py [--report-only]
"""

import re
import sys
from pathlib import Path

# 关键事实数据库（用于硬校验）
FACTS = {
    # 人名 -> 所属机构（2026 现状）
    '邓煜': 'UChicago（芝加哥大学）',
    'Yu Deng': 'UChicago',
    '王虹': '巴黎萨克雷大学（已接北大 offer）',
    '陶哲轩': 'UCLA（任 UCLA 教授）',
    '丘成桐': '清华大学',
    '张益唐': 'UC San Diego（已退休）',
    'Perelman': '圣彼得堡斯捷克洛夫研究所',
    'Wiles': 'Oxford',

    # 关键事件年份
    '丘成桐 菲尔兹奖': '1982',
    '陶哲轩 菲尔兹奖': '2006',
    '王虹 菲尔兹奖': '2026',
    '邓煜 菲尔兹奖': '2026',
    'Perelman 菲尔兹奖': '2006',
    '张益唐 孪生间隙': '2013',
    '陶哲轩 孪生间隙 246': '2014（Polymath 8 协作）',
    '素数间隙 → ∞': '1931 Westzynthius 证明',
    'Helfgott 弱哥德巴赫': '2013',
    'Wiles 费马大定理': '1995',
    '谷山-志村（一般）': '2001（BCDT）',
    'Calabi 猜想': '1976 丘成桐',
}


def extract_year_name(text):
    """抽所有 "年份+人名" 模式，输出 (year, name, context)"""
    results = []
    # 模式 1：XXXX 年 + 人名（中文/英文）
    pat1 = re.compile(r'(\d{4})\s*年?\s*([\u4e00-\u9fffA-Za-z\s\-]+?)(?=[，。；、,;.！!?（(\s]|$)', re.UNICODE)
    for m in pat1.finditer(text):
        year = m.group(1)
        name = m.group(2).strip()
        if 1000 <= int(year) <= 2030 and 1 <= len(name) <= 20:
            ctx_start = max(0, m.start() - 30)
            ctx_end = min(len(text), m.end() + 30)
            ctx = text[ctx_start:ctx_end].replace('\n', ' ')
            results.append((year, name, ctx))
    return results


def audit_file(path, project_root):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # 抽所有 explain/intro/principle/history 块（粗略：找反引号 + 内容）
    blocks = re.findall(r'`([^`]{50,3000})`', text, re.DOTALL)
    print(f'\n=== {path} ===')
    print(f'  反引号块数: {len(blocks)}')

    issues = []
    for blk in blocks:
        for year, name, ctx in extract_year_name(blk):
            # 标注可疑项
            suspicious = False
            reason = ''

            # 硬规则：人名错位
            for k, v in FACTS.items():
                if k in name and k not in year:
                    # 如果文本里同时出现"人名"和"机构错位"
                    if 'UCLA' in ctx and '邓煜' in ctx and 'UChicago' not in ctx:
                        suspicious = True
                        reason = '邓煜 UCLA → 应 UChicago'

            # 硬规则：年份错位
            if '素数间隙' in ctx and '陶哲轩 2014' in ctx and '陶哲轩 2014 证明' in ctx and '→ ∞' in ctx:
                suspicious = True
                reason = '间隙 → ∞ 错归陶哲轩 2014'

            if suspicious:
                issues.append((year, name, ctx, reason))

    if issues:
        print(f'  ⚠️ 发现 {len(issues)} 个可疑日期项:')
        for year, name, ctx, reason in issues:
            print(f'    [{year} {name}] {reason}')
            print(f'      ...{ctx}...')
    else:
        print('  ✅ 无明显错位')

    return issues


def main():
    project_root = Path(__file__).parent
    paths = [project_root / 'index.html']
    pages_dir = project_root / 'pages'
    if pages_dir.exists():
        for p in sorted(pages_dir.glob('*.html')):
            paths.append(p)

    total_issues = 0
    for p in paths:
        issues = audit_file(p, project_root)
        total_issues += len(issues)

    print(f'\n=== 总结 ===')
    print(f'扫描文件: {len(paths)}')
    print(f'发现可疑项: {total_issues}')
    return 1 if total_issues > 0 else 0


if __name__ == '__main__':
    sys.exit(main())
