#!/usr/bin/env python3
"""
v18.2.6 NT06 TTS 数字读音修复（用户要求"全部数字改成中文写法"）
- 6 段含年份的 .txt：1955/1984/1985 → 一九五五/一九八四/一九八五
- 11 段不含年份的不动
- 删 NT06_s5b_p2.txt 里的 "(说成 一千九百八十五 年)" 注释
"""
from pathlib import Path
import re

ROOT = Path("/Users/paulshi/Documents/MiniMax/π/mathexperiment")
AUDIO_DIR = ROOT / "audio"

# 6 个含年份的 .txt
files = [
    "NT06_intro.txt",
    "NT06_s5.txt",
    "NT06_s5_short.txt",
    "NT06_s5a.txt",
    "NT06_s5a_p2.txt",
    "NT06_s5b_p2.txt",
]

# 阿拉伯数字年份 → 中文大写
year_map = {
    "1955 年": "一九五五年",
    "1984 年": "一九八四年",
    "1985 年": "一九八五年",
    "1955年": "一九五五年",  # 紧贴无空格
    "1984年": "一九八四年",
    "1985年": "一九八五年",
    # 括号里的 "一千九百八十五" 也改
    "（说成 一千九百八十五 年）": "",
    "(说成 一千九百八十五 年)": "",
    "（一千九百八十五 年）": "",
    "(一千九百八十五 年)": "",
}

stats = {"files": 0, "replacements": 0}
for fname in files:
    f = AUDIO_DIR / fname
    if not f.exists():
        print(f"⚠️ {fname} 不存在，跳过")
        continue
    text = f.read_text(encoding='utf-8')
    original = text
    for old, new in year_map.items():
        if old in text:
            count = text.count(old)
            text = text.replace(old, new)
            stats["replacements"] += count
            print(f"  ✓ {fname} :: {old!r} → {new!r} ({count} 处)")
    if text != original:
        f.write_text(text, encoding='utf-8')
        stats["files"] += 1

print(f"\n=== v18.2.6 NT06 中文写法修复 ===")
print(f"修改文件: {stats['files']} 个")
print(f"替换处数: {stats['replacements']} 处\n")
print("各文件最终内容:")
for fname in files:
    f = AUDIO_DIR / fname
    print(f"\n--- {fname} ---")
    print(f.read_text(encoding='utf-8'))
