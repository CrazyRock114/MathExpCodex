#!/usr/bin/env python3
"""
给 EXPERIMENTS 数组每个实验加 type 字段:
  - axiom_theorem: 常见基础公理/定理的可视化交互（绝大多数）
  - conjecture_open: 尚未被完全证明的猜想
  - conjecture_proven: 已经被完全证明的猜想（v16 EX_PROVEN_*）
"""
import re

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'

# 三类分类规则
# conjecture_proven: EX_PROVEN_* 全部
# conjecture_open: 列出来的几个开放猜想
CONJECTURE_OPEN = {
    'EX08',  # 椭圆曲线 - BSD 猜想未证
    'EX11',  # 黎曼 ζ - RH 假设未证
    'EX14',  # 随机矩阵 - 局部统计渐近有开放问题
    'EX15',  # 模形式 - Sato-Tate 猜想等
    'EX19',  # 同伦群 - 球面稳定同伦群未完全确定
    'NT16',  # 素数间隙 - 孪生素数无限性等
    'NT19',  # 梅森素数 - 无限性未证
    'NT20',  # 哥德巴赫 - 未证
}

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 找 EXPERIMENTS 数组
arr_start = html.find('const EXPERIMENTS = [')
end_marker = html.find('// EXPERIMENTS 结束')
arr_end = html.rfind('},', end_marker) + 2
arr_text = html[arr_start:arr_end]

# 找所有 id
ids = re.findall(r"id:\s*'([^']+)'", arr_text)
print(f'共 {len(ids)} 个 id')

# 给每个 id 决定 type
type_map = {}
for bid in ids:
    if bid.startswith('EX_PROVEN'):
        type_map[bid] = 'conjecture_proven'
    elif bid in CONJECTURE_OPEN:
        type_map[bid] = 'conjecture_open'
    else:
        type_map[bid] = 'axiom_theorem'

# 统计
from collections import Counter
print('分类统计:', Counter(type_map.values()))

# 给每个块插入 type 字段
# 策略：找到 "id: 'XX'," 在它后面插入 "type: 'YY',"
# 如果已经有 type: 字段就跳过
new_arr_text = arr_text
inserted = 0
skipped = 0
for bid, t in type_map.items():
    needle = f"id: '{bid}',"
    pos = new_arr_text.find(needle)
    if pos < 0:
        # 可能格式是 id: 'XX',\n  cat:
        needle2 = f"id: '{bid}',\n"
        pos = new_arr_text.find(needle2)
        if pos < 0:
            continue
        # 在 id 后面找 cat: 之前插入 type
        cat_pos = new_arr_text.find("cat:", pos)
        if cat_pos < 0:
            continue
        # 检查 type 是否已存在
        between = new_arr_text[pos:cat_pos]
        if 'type:' in between:
            skipped += 1
            continue
        insert_str = f"  type: '{t}',\n  "
        new_arr_text = new_arr_text[:pos] + f"id: '{bid}',\n  type: '{t}',\n  " + new_arr_text[pos + len(needle) + 1:]
        inserted += 1
    else:
        # 在 id 后面找 cat: 之前插入 type
        cat_pos = new_arr_text.find("cat:", pos)
        if cat_pos < 0:
            continue
        between = new_arr_text[pos:cat_pos]
        if 'type:' in between:
            skipped += 1
            continue
        new_arr_text = new_arr_text[:pos] + f"id: '{bid}', type: '{t}', " + new_arr_text[pos + len(needle):]
        inserted += 1

print(f'插入 {inserted} 个, 跳过 {skipped} 个')

# 替换回 html
new_html = html[:arr_start] + new_arr_text + html[arr_end:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('✅ 已写入 index.html')

# 验证
import subprocess
result = subprocess.run(['grep', '-c', "type: 'conjecture_proven'", 'index.html'], capture_output=True, text=True)
print(f'验证: conjecture_proven 字段数 = {result.stdout.strip()}')
result = subprocess.run(['grep', '-c', "type: 'conjecture_open'", 'index.html'], capture_output=True, text=True)
print(f'验证: conjecture_open 字段数 = {result.stdout.strip()}')
result = subprocess.run(['grep', '-c', "type: 'axiom_theorem'", 'index.html'], capture_output=True, text=True)
print(f'验证: axiom_theorem 字段数 = {result.stdout.strip()}')
