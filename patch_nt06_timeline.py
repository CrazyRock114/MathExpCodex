#!/usr/bin/env python3
"""
patch_nt06_timeline.py — v18.2.4 终极修复 NT06 时间线 1962/1993/2010 错位
"""
import re
from pathlib import Path

patterns = [
    # 1962 Kaprekar 命名 Harshad
    (re.compile(r"\{ year: '1962', text: '[^']*Harshad[^']*'[^}]*\}"),
     "{ year: '1955', text: '卡普雷卡 命名 \"Harshad\"（OEIS A005349 实证）', color: '#7c3aed' }"),
    # 1993 Cooper-Kennedy 证明
    (re.compile(r"\{ year: '1993', text: '[^']*(Cooper|库珀)[^']*Harshad[^']*'[^}]*\}"),
     "{ year: '1984', text: '库珀-肯尼迪 证明\"每个 n 的倍数里有 Harshad\" + 渐近密度 = 0', color: '#10b981' }"),
    # 2010 de Bono 0.314
    (re.compile(r"\{ year: '2010', text: '[^']*de Bono[^']*0\.314[^']*'[^}]*\}"),
     "{ year: '1985', text: '库珀-肯尼迪 计算渐近密度 0.314...（接近 π/10）', color: '#a855f7' }"),
    # 1993 Wayland Smith
    (re.compile(r"\{ year: '1993', text: '[^']*Wayland[^']*'[^}]*\}"),
     "{ year: '1983', text: 'Wayland & Oltikar 构造无穷多 Smith 数', color: '#a855f7' }"),
]

# 修 "闭合定理" 错位（按值读法残留）
closed_theorem_pat = re.compile(r"闭合定理</strong>[^<]*（[^）]*1993[^）]*）")
closed_theorem_repl = re.compile(r"闭合定理</strong>[^<]*（[^）]*1993[^）]*）")
# 简单做法：找所有 "闭合定理" 块并修

# 修 渐近密度 de Bono 2010 残留
dens_pat = re.compile(r"（de Bono 2010）")
dens_repl = r"（库珀-肯尼迪 1985）"

# 修 Harshad 数 1962 年（intro 段落）
intro_pat = re.compile(r"Harshad 数 1962 年由[^<]{0,80}命名")
intro_repl = re.compile(r"Harshad 数 1955 年由[^<]{0,80}命名")

total_pages = 0
for p in sorted(Path('pages').glob('*.html')):
    text = p.read_text(encoding='utf-8', errors='ignore')
    orig = text

    # 修 4 个时间线错位
    for pat, repl in patterns:
        text = pat.sub(repl, text)

    # 修闭合定理 1993
    text = closed_theorem_pat.sub(
        lambda m: m.group(0).replace('1993', '1984').replace('一千九百九十三', '1984'),
        text,
    )

    # 修 渐近密度
    text = dens_pat.sub(dens_repl, text)

    # 修 intro 段落 1962
    text = intro_pat.sub(lambda m: m.group(0).replace('1962', '1955'), text)
    text = intro_pat.sub(lambda m: m.group(0).replace('1963', '1955'), text)

    if text != orig:
        p.write_text(text, encoding='utf-8')
        total_pages += 1

# 修 index.html
p = Path('index.html')
text = p.read_text(encoding='utf-8', errors='ignore')
orig = text
for pat, repl in patterns:
    text = pat.sub(repl, text)
text = closed_theorem_pat.sub(
    lambda m: m.group(0).replace('1993', '1984').replace('一千九百九十三', '1984'),
    text,
)
text = dens_pat.sub(dens_repl, text)
text = intro_pat.sub(lambda m: m.group(0).replace('1962', '1955'), text)
if text != orig:
    p.write_text(text, encoding='utf-8')
    print(f'  ✅ index.html')

print(f'总修改 pages: {total_pages}')
