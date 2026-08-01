#!/usr/bin/env python3
"""v18: 把 4 段式模板（mavisIntroSection + 改造 stagesSection + expPackSection）批量加到 7 个 HTML
- 输入：NT06.html（已改的范本）
- 输出：PR02 OT01 PB01 PE01 NT01 PR06 NT03 7 个 HTML
"""
import re
from pathlib import Path

ROOT = Path('pages')

# 从 NT06.html 抓取模板段
with open(ROOT / 'NT06.html', encoding='utf-8') as f:
    nt06 = f.read()

# 找 mavisIntroSection 定义起点
m1 = re.search(r'  // 🤖 Mavis 总介绍折叠卡', nt06)
m2 = re.search(r"  // 🎯 拓展实验包", nt06)
m3 = re.search(r"  const principleSection", nt06)
if not (m1 and m2 and m3):
    raise SystemExit('NT06.html 模板标记没找到')

# 模板段：从 m1 到 m3 之前
template = nt06[m1.start():m2.start()]

print(f'模板段长度 {len(template)} 字符')

# 提取 plazaDetail.innerHTML 模板插值改动
# 原：${stagesSection}\n${principleSection}
# 新：${mavisIntroSection}\n${stagesSection}\n${expPackSection}\n${principleSection}
old_render = "    ${stagesSection}\n    ${principleSection}"
new_render = "    ${mavisIntroSection}\n    ${stagesSection}\n    ${expPackSection}\n    ${principleSection}"

# 7 个文件批量改
target_files = ['PR02.html', 'OT01.html', 'PB01.html', 'PE01.html', 'NT01.html', 'PR06.html', 'NT03.html']

for fname in target_files:
    fpath = ROOT / fname
    html = fpath.read_text(encoding='utf-8')
    if 'mavisIntroSection' in html:
        print(f'{fname}: 已含 mavisIntroSection，跳过')
        continue
    # 1) 替换 stagesSection 块
    # 旧块起点："  // 4 区布局：有 principle/history/tryit 的（精选 8 个）显示完整 4 区"
    # 旧块终点：紧接 "  const principleSection"
    old_block_start = "  // 4 区布局：有 principle/history/tryit 的（精选 8 个）显示完整 4 区"
    if old_block_start not in html:
        print(f'{fname}: 找不到 4 区布局标记，跳过')
        continue
    # 找到从 block_start 到 "  const principleSection" 前的一段
    idx_start = html.index(old_block_start)
    idx_end = html.index("  const principleSection", idx_start)
    new_html = html[:idx_start] + template + html[idx_end:]
    # 2) 替换 plazaDetail.innerHTML 模板插值
    new_html = new_html.replace(old_render, new_render)
    fpath.write_text(new_html, encoding='utf-8')
    print(f'{fname}: ✅ 模板已改')

# 验证语法
import subprocess
for fname in ['NT06.html', 'PR02.html', 'OT01.html', 'PB01.html', 'PE01.html', 'NT01.html', 'PR06.html', 'NT03.html']:
    fpath = ROOT / fname
    html = fpath.read_text(encoding='utf-8')
    m = re.search(r'<script>([\s\S]*?)</script>', html)
    if not m:
        print(f'{fname}: 无 <script>')
        continue
    try:
        compile(m[1], fname, 'exec')
        print(f'{fname}: ✅ 语法 OK')
    except SyntaxError as e:
        print(f'{fname}: ❌ 语法错误: {e}')
