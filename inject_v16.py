#!/usr/bin/env python3
"""
v16.1 注入：把 20 个 EX_PROVEN_01-20 实验加到 index.html
1. 读 20 个 stages.js 合并
2. 把 EXP_PROVEN_01-20 加到 EXPERIMENTS 数组（EX01-20 之后）
3. 把函数定义插到对应位置（EX01-20 initStage 之后）
4. 更新 EXPERIMENT_KPS
"""
import os, json, re

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

# 1. 读 20 个 stages.js
all_stages_js = []
all_meta = []
for i in range(1, 21):
    eid = f'EX_PROVEN_{i:02d}'
    path = f'/tmp/ex_proven_{i:02d}/stages.js'
    if not os.path.exists(path):
        print(f'WARN: {path} missing')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    all_stages_js.append(f'\n// ========== {eid} 5 步 ==========\n{text}')
    # meta
    meta_path = f'/tmp/ex_proven_{i:02d}/meta.json'
    if os.path.exists(meta_path):
        with open(meta_path, 'r', encoding='utf-8') as f:
            all_meta.append(json.load(f))

print(f'Loaded {len(all_stages_js)} stages.js and {len(all_meta)} meta.json')

# 2. 读 index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 3. 找 EX20 之后的 EXPERIMENTS 块结束位置
ex20_start = html.find("id: 'EX20'")
if ex20_start < 0:
    print("Can't find EX20 in EXPERIMENTS")
    exit(1)
# 找 "]; // EXPERIMENTS 结束" 标记位置
end_marker = ']; // EXPERIMENTS 结束'
end_idx = html.find(end_marker)
if end_idx < 0:
    print("Can't find EXPERIMENTS 结束")
    exit(1)
print(f'EX20 in EXPERIMENTS: {ex20_start}, EXPERIMENTS end marker at: {end_idx}')

# 4. 构造 20 个新 EXPERIMENTS 块
new_exps = []
for i, meta in enumerate(all_meta, 1):
    eid = f'EX_PROVEN_{i:02d}'
    title = meta.get('title', '').replace("'", "\\'")
    intro = meta.get('intro', '').replace("'", "\\'").replace('\n', ' ')
    cat = meta.get('cat', '已证')
    new_exps.append(f"""  {{
  id: '{eid}', cat: '{cat}', title: '{title}',
  intro: '{intro}',
  stages: getStages{eid}(),
  render: (h) => setupExprov{i:02d}(h)
}},""")

new_exp_block = '\n'.join(new_exps)
print(f'New EXPERIMENTS block: {len(new_exp_block)} chars')

# 5. 找到 EXPERIMENTS 数组结束位置
end_marker = '// EXPERIMENTS 结束'
ex20_end_search = html.find(end_marker)
if ex20_end_search < 0:
    print("Can't find EXPERIMENTS 结束")
    exit(1)
# 在 "]; " 之前插入
# ex20_end_search 之前应该是 "]; "
semi = html.rfind('];', 0, ex20_end_search)
insert_point = semi  # 在 "]; " 之前插入
print(f'Insert point at "]; // EXPERIMENTS 结束" position {insert_point}')

# 检查 EX20 块最后是不是逗号
prev_2 = html[insert_point-3:insert_point].strip()
# 找 EX20 块结束 - 最后一个 "}" 紧贴 "];"
# 实际 EX20 块结尾是 "  }\n},"
# 在 ex20 块的 "}" 后需要确认是 "}," 不是 "}"
# 从 insert_point 往前找最近的 "  }"
obj_close = html.rfind('  }', 0, insert_point)
if html[obj_close+3:obj_close+5] == '},':
    # 已经逗号结尾
    pass
else:
    # 在 "  }" 后加 ","
    html = html[:obj_close+3] + ',' + html[obj_close+3:]
    insert_point = html.find(end_marker)
    semi = html.rfind('];', 0, insert_point)
    insert_point = semi

# 插入新块
html = html[:insert_point] + '\n' + new_exp_block + '\n' + html[insert_point:]
print('Inserted new EXPERIMENTS block')

# 6. 插入所有 initStage 函数
# 在 PE10_initAll 之后插入（PE10 是 EX 系列最后）
# 找 PE10_initAll
pe10_initall_end = html.find("function initStage_PE10_initAll() { initStage_PE10(); }")
if pe10_initall_end < 0:
    # 用 OT10
    pe10_initall_end = html.find("function initStage_OT10_initAll() { initStage_OT10(); }")
if pe10_initall_end < 0:
    print("Can't find PE10/OT10 initAll to anchor insertion")
    exit(1)
pe10_initall_end = html.find("\n", pe10_initall_end) + 1  # move to end of line

all_stages_combined = '\n'.join(all_stages_js)
# 在 PE10_initAll 之后插入（在 "}\n\n" 之前）
# 找到 PE10_initAll 函数的结束 "}"
pe10_initall_match = re.search(r'function initStage_PE10_initAll\(\) \{ initStage_PE10\(\); \}', html)
if pe10_initall_match:
    # 在 } 后找下一个空行
    after = pe10_initall_match.end()
    # 跳过紧跟的换行
    while after < len(html) and html[after] in '\n':
        after += 1
    # 找到下一个函数的开始或块结束
    # 实际：在 EX01-20 initStage 后
    # 简单：在第一个 "};" 之前
    next_func = html.find('function ', after)
    if next_func > 0:
        # 在 "function " 前插入
        insert_at = html.rfind('\n\n', 0, next_func) + 1
        if insert_at <= 0:
            insert_at = next_func
        html = html[:insert_at] + all_stages_combined + '\n' + html[insert_at:]
        print(f'Inserted {len(all_stages_js)} stages.js')
    else:
        html = html[:after] + all_stages_combined + '\n' + html[after:]
        print('Inserted (fallback)')
else:
    print("WARN: PE10_initAll not found")

# 7. 更新 EXPERIMENT_KPS
# 在 EXPERIMENT_KPS 中 EX20 之后插入 EX_PROVEN_01-20
ex20_in_ekp = html.find("  \"EX20\":")
if ex20_in_ekp > 0:
    ex20_ekp_end = html.find("\n", ex20_in_ekp) + 1
    new_ekp_lines = []
    for i, meta in enumerate(all_meta, 1):
        eid = f'EX_PROVEN_{i:02d}'
        kps = meta.get('kps', [])
        new_ekp_lines.append(f'  "{eid}": {kps},')
    html = html[:ex20_ekp_end] + '\n'.join(new_ekp_lines) + '\n' + html[ex20_ekp_end:]
    print(f'Inserted {len(new_ekp_lines)} EXPERIMENT_KPS entries')

# 8. 写回
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Wrote index.html ({len(html)} bytes)')

# 9. 复制 audio scripts 到 audio/
os.makedirs('audio', exist_ok=True)
for i in range(1, 21):
    eid = f'EX_PROVEN_{i:02d}'
    src = f'/tmp/ex_proven_{i:02d}/audio_script.txt'
    dst = f'audio/{eid}_explain.txt'
    if os.path.exists(src):
        with open(src, 'r', encoding='utf-8') as f:
            text = f.read()
        with open(dst, 'w', encoding='utf-8') as f:
            f.write(text)
print('Copied audio scripts')
