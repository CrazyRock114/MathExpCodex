#!/usr/bin/env python3
"""
v18.2.5 NT06 Harshad 数终极史实修复（用户二次反馈）
OEIS A005349 实证：
  - Kaprekar 1955 年命名（不是 1962 也不是 1963）
  - Cooper-Kennedy 1984 年 College Math. J. 15(4) 证闭合定理
  - Cooper-Kennedy 1985 年 Int. J. Math. Math. Sci. 8(3) 算 0.314
"""
import re
from pathlib import Path

ROOT = Path("/Users/paulshi/Documents/MiniMax/π/mathexperiment")

# 全文统一修复
FIXES = [
    # ============== 闭合定理（核心） ==============
    # pages/NT06.html 行 7205 残留 "闭合定理（库珀和肯尼迪，一千九百九十三年）"
    ("闭合定理</strong>（库珀和肯尼迪，一千九百九十三年）",
     "闭合定理</strong>（库珀和肯尼迪，1984 年）"),

    # 其他可能的 "闭合定理（库珀, 肯尼迪 1984）" - 已经是正确的，不动
]

# NT06 特殊文案
NT06_INTROINTRO_NEW = (
    "同学们好！我是 Mavis。今天玩 Harshad 数——一种\"友好\"的数，能被自己各位数字之和整除。"
    "比如 12：1 加 2 等于 3，12 除以 3 整除，所以 12 就是 Harshad 数。"
    "这种数 1955 年印度数学家卡普雷卡命名。点开卡片玩起来！"
)

NT06_OPEN_QUESTION_NEW = (
    "👉 <strong>开放问题</strong>：Harshad 密度为什么和 π 这么接近？"
    "数学家 1985 年算出 0.314 但没证明为什么——这是 5b 里的未解之谜。"
)

INDEX_HTML_7291_NEW = (
    '<li><strong>为什么接近 π？</strong> 数学家库珀-肯尼迪在 1985 年算出 0.314 这个数字，'
    '但没证明为什么这么接近圆周率（3.14159...）！</li>'
)

INDEX_QUICKSORT_NEW = (
    "快速排序的发明：1960 年 托尼·霍尔 提出。至今仍是最快的通用排序算法。"
)

# 统计
stats = {"files_modified": 0, "replacements": 0, "details": []}

def apply(text, old, new, label):
    count = text.count(old)
    if count > 0:
        text = text.replace(old, new)
        stats["replacements"] += count
        stats["details"].append(f"  ✓ {label}: {count} 处")
    return text

def fix_file(path, fixes):
    if not path.exists():
        return
    text = path.read_text(encoding='utf-8')
    original = text
    for old, new in fixes:
        text = apply(text, old, new, f"{path.name} :: {old[:50]}...")
    if text != original:
        path.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# ============== 修复 pages/NT06.html ==============
nt06_path = ROOT / "pages" / "NT06.html"
text = nt06_path.read_text(encoding='utf-8')
original = text

# 1. 闭合定理残留（v18.2.4 漏改的"一千九百九十三年"）
text = apply(text,
             "闭合定理</strong>（库珀和肯尼迪，一千九百九十三年）",
             "闭合定理</strong>（库珀和肯尼迪，1984 年）",
             "闭合定理 1993→1984")

# 2. introIntro 1962 年
text = apply(text,
             "这种数 1962 年印度数学家 Kaprekar 命名",
             "这种数 1955 年印度数学家卡普雷卡命名",
             "introIntro 1962→1955")

# 3. NT06 开放问题 2010 年
text = apply(text,
             "数学家 2010 年算出 0.314 但没证明为什么",
             "数学家 1985 年算出 0.314 但没证明为什么",
             "NT06 开放问题 2010→1985")

if text != original:
    nt06_path.write_text(text, encoding='utf-8')
    stats["files_modified"] += 1

# ============== 修复 index.html ==============
idx_path = ROOT / "index.html"
text = idx_path.read_text(encoding='utf-8')
original = text

# 1. introIntro 一九六二年
text = apply(text,
             "这种数 一九六二年印度数学家 卡普雷卡 命名",
             "这种数 1955 年印度数学家卡普雷卡 命名",
             "index introIntro 一九六二→1955")

# 2. NT06 开放问题 2010
text = apply(text,
             "数学家 2010 年算出 0.314 但没证明为什么",
             "数学家 1985 年算出 0.314 但没证明为什么",
             "index 开放问题 2010→1985")

# 3. NT06 5b 段 "德波诺在 2010 年算出 0.314"
text = apply(text,
             "数学家德波诺在 2010 年算出 0.314 这个数字",
             "数学家库珀-肯尼迪在 1985 年算出 0.314 这个数字",
             "index NT06 5b 德波诺 2010→库珀-肯尼迪 1985")

# 4. 快速排序 1962 错位（Hoare 1960 发明 quicksort）
text = apply(text,
             "快速排序的发明：一九六二年 托尼·霍尔 提出。至今仍是最快的通用排序算法。",
             "快速排序的发明：1960 年 托尼·霍尔 提出。至今仍是最快的通用排序算法。",
             "index quicksort 一九六二→1960")

if text != original:
    idx_path.write_text(text, encoding='utf-8')
    stats["files_modified"] += 1

# ============== 修复 audio/NT06_intro.txt ==============
intro_txt = ROOT / "audio" / "NT06_intro.txt"
if intro_txt.exists():
    text = intro_txt.read_text(encoding='utf-8')
    original = text
    # 1962 改 1955
    text = apply(text, "1962 年", "1955 年", "NT06_intro.txt 1962→1955")
    if text != original:
        intro_txt.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# ============== 修复 audio/NT06_s5.txt 残留 ==============
s5_txt = ROOT / "audio" / "NT06_s5.txt"
if s5_txt.exists():
    text = s5_txt.read_text(encoding='utf-8')
    original = text
    # 2010 改 1985
    text = apply(text, "2010 年", "1985 年", "NT06_s5.txt 2010→1985")
    # 1962 改 1955
    text = apply(text, "1962 年", "1955 年", "NT06_s5.txt 1962→1955")
    # 1993 改 1984
    text = apply(text, "1993 年", "1984 年", "NT06_s5.txt 1993→1984")
    if text != original:
        s5_txt.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# ============== 修复 audio/NT06_s5a.txt ==============
s5a_txt = ROOT / "audio" / "NT06_s5a.txt"
if s5a_txt.exists():
    text = s5a_txt.read_text(encoding='utf-8')
    original = text
    text = apply(text, "1962 年", "1955 年", "NT06_s5a.txt 1962→1955")
    text = apply(text, "1993 年", "1984 年", "NT06_s5a.txt 1993→1984")
    text = apply(text, "2010 年", "1985 年", "NT06_s5a.txt 2010→1985")
    if text != original:
        s5a_txt.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# ============== 修复 audio/NT06_s5a_p2.txt（1984 闭合定理论文） ==============
s5a_p2_txt = ROOT / "audio" / "NT06_s5a_p2.txt"
if s5a_p2_txt.exists():
    text = s5a_p2_txt.read_text(encoding='utf-8')
    original = text
    text = apply(text, "1993 年", "1984 年", "NT06_s5a_p2.txt 1993→1984")
    if text != original:
        s5a_p2_txt.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# ============== 修复 audio/NT06_s5b.txt ==============
s5b_txt = ROOT / "audio" / "NT06_s5b.txt"
if s5b_txt.exists():
    text = s5b_txt.read_text(encoding='utf-8')
    original = text
    text = apply(text, "2010 年", "1985 年", "NT06_s5b.txt 2010→1985")
    text = apply(text, "德波诺", "库珀-肯尼迪", "NT06_s5b.txt 德波诺→库珀-肯尼迪")
    if text != original:
        s5b_txt.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# ============== 修复 audio/NT06_s5b_p2.txt ==============
s5b_p2_txt = ROOT / "audio" / "NT06_s5b_p2.txt"
if s5b_p2_txt.exists():
    text = s5b_p2_txt.read_text(encoding='utf-8')
    original = text
    text = apply(text, "2010 年", "1985 年", "NT06_s5b_p2.txt 2010→1985")
    if text != original:
        s5b_p2_txt.write_text(text, encoding='utf-8')
        stats["files_modified"] += 1

# 输出报告
print(f"\n=== v18.2.5 NT06 终极史实修复 ===")
print(f"修改文件: {stats['files_modified']} 个")
print(f"替换处数: {stats['replacements']} 处\n")
for d in stats["details"]:
    print(d)
print("\nOEIS A005349 实证:")
print("  • Kaprekar 1955 年命名 Harshad")
print("  • Cooper-Kennedy 1984 年 College Math. J. 15(4) 证闭合定理")
print("  • Cooper-Kennedy 1985 年 IJMMS 8(3) 算 0.314")
print("  • Hoare 1960 年发明 quicksort")
