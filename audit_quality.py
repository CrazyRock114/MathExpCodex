#!/usr/bin/env python3
"""深度审计：每个 stage 的 content 长度，init 函数非空，DOM 元素存在"""
import os, json, re

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('experiments_meta.json', 'r', encoding='utf-8') as f:
    exps = json.load(f)

def get_func_body(name):
    """提取 function NAME(...) { ... } 函数体"""
    m = re.search(rf'function\s+{re.escape(name)}\s*\([^)]*\)\s*\{{([\s\S]*?)\n\}}', html)
    if not m:
        return None
    return m.group(1)

results = []
for e in exps:
    eid = e['id']
    stages = e.get('stages', [])

    # stage content 长度
    stage_lens = [len(s.get('content', '')) for s in stages]

    # init 函数非空性
    s1_body = get_func_body(f'initStage_{eid}_s1') or ''
    s2_body = get_func_body(f'initStage_{eid}_s2') or ''
    s3_body = get_func_body(f'initStage_{eid}_s3') or ''
    s4_body = get_func_body(f'initStage_{eid}_s4') or ''
    s5_body = get_func_body(f'initStage_{eid}_s5') or ''

    s1_len = len(s1_body.strip())
    s2_len = len(s2_body.strip())
    s3_len = len(s3_body.strip())
    s4_len = len(s4_body.strip())
    s5_len = len(s5_body.strip())

    s1_meaningful = s1_len > 5  # 不是空 function initStage_XX_s1() {}
    s2_meaningful = s2_len > 30  # s2 通常是交互验算，应该有内容
    s3_meaningful = s3_len > 30
    s4_meaningful = s4_len > 30
    s5_meaningful = s5_len > 30

    results.append({
        'id': eid,
        'stage_lens': stage_lens,
        's1': s1_len, 's2': s2_len, 's3': s3_len, 's4': s4_len, 's5': s5_len,
        's1_m': s1_meaningful, 's2_m': s2_meaningful, 's3_m': s3_meaningful, 's4_m': s4_meaningful, 's5_m': s5_meaningful,
    })

# 统计
print(f'共 {len(results)} 个实验')
print()
print(f'各 stage content 长度统计:')
for i, s in enumerate(['s1', 's2', 's3', 's4', 's5'], 1):
    lens = [r[f's{i}'] for r in results]
    print(f'  {s}: min={min(lens):4d} max={max(lens):5d} avg={sum(lens)/len(lens):.0f}  empty(<=5)={sum(1 for l in lens if l<=5)}')

# 找出 s2-s5 短于 30 字符的（可能空实现）
print()
print('s2-s5 短于 30 字符的 init 函数:')
for r in results:
    for s in ['s2','s3','s4','s5']:
        if r[f'{s}'] < 30:
            print(f"  {r['id']} {s} = {r[s]} chars")

# stage content 长度
print()
print('Stage content 长度统计:')
for i in range(5):
    lens = [r['stage_lens'][i] for r in results]
    print(f'  s{i+1}: min={min(lens):5d} max={max(lens):6d} avg={sum(lens)/len(lens):.0f}')

# Stage 短于 200 字符的
print()
print('Stage content 短于 200 字符的（可能太简略）:')
for r in results:
    for i, l in enumerate(r['stage_lens']):
        if l < 200:
            print(f"  {r['id']} s{i+1} = {l} chars")

# 总评
all_init_meaningful = all(r['s2_m'] and r['s3_m'] and r['s4_m'] and r['s5_m'] for r in results)
print()
print(f'所有 s2-s5 都有实质内容 (>30 chars): {sum(1 for r in results if r["s2_m"] and r["s3_m"] and r["s4_m"] and r["s5_m"])}/{len(results)}')
print(f'所有 stage content > 200 chars: {sum(1 for r in results if all(l > 200 for l in r["stage_lens"]))}/{len(results)}')
