#!/usr/bin/env python3
"""把 /tmp/ex*_audio.txt 替换到 index.html 对应 EX 块的 explain 字段"""
import re

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
import os
os.chdir(WORK)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 用 // EXPERIMENTS 结束 标记找数组末尾
end_marker = html.find('// EXPERIMENTS 结束')
before_end = html.rfind('},', end_marker)
arr_start = html.find('const EXPERIMENTS = [')
arr_text = html[arr_start:before_end + 2]

# 找所有 EX 块的边界
new_arr = arr_text
for i in range(1, 21):
    eid = f'EX{i:02d}'
    # 找 EX01 块
    needle = f"id: '{eid}'"
    pos = new_arr.find(needle)
    if pos < 0:
        print(f'SKIP: {eid} not found')
        continue
    # 读 txt
    with open(f'/tmp/ex{i:02d}_audio.txt', 'r', encoding='utf-8') as f:
        text = f.read().strip()
    # 转义：\ → \\, ` → \`, $ → \$
    text_esc = text.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
    # 找 explain 字段
    explain_marker = 'explain: `'
    explain_start = new_arr.find(explain_marker, pos)
    if explain_start < 0:
        print(f'SKIP: {eid} no explain field')
        continue
    # 找结束的反引号（不在转义里）
    # 简化：从 explain_start 往后找第一个未转义的 ` + ,
    j = explain_start + len(explain_marker)
    while j < len(new_arr):
        c = new_arr[j]
        if c == '\\':
            j += 2
            continue
        if c == '`':
            # 检查后面是不是 ', 或 '\n  (字段结束)
            j += 1
            if j < len(new_arr) and new_arr[j] == ',':
                break
        j += 1
    explain_end = j  # 反引号 + 逗号 之后
    # 替换
    new_arr = new_arr[:explain_start] + explain_marker + text_esc + new_arr[explain_end - 1:]

# 写回
new_html = html[:arr_start] + new_arr + html[before_end + 2:]
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
print(f'Updated EX01-20 explain fields')
