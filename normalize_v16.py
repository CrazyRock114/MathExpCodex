#!/usr/bin/env python3
"""统一 EX_PROVEN_05-20 的函数名/ID 到 EX_PROVEN_XX 格式"""
import os, re

# 命名映射：每种风格 → 统一风格
for i in range(5, 21):
    eid = f'EX_PROVEN_{i:02d}'
    eid_old_patterns = [
        # 05-08 用的 `initStage_05` 风格
        (rf'\bgetStages0{i%10 if i<10 else i}\b', f'getStages{eid}'),
        (rf'\binitStage_0{i%10 if i<10 else i}(_s\d+)?\b', lambda m, eid=eid: f'initStage_{eid}{m.group(1) or ""}'),
        (rf'\binitStage_0{i%10 if i<10 else i}_initAll\b', f'initStage_{eid}_initAll'),
        # 09-16 用的 `initStage_ExprovXX` 风格
        (rf'\bgetStagesExprov0?{i}\b', f'getStages{eid}'),
        (rf'\binitStage_Exprov0?{i}(_s\d+)?\b', lambda m, eid=eid: f'initStage_{eid}{m.group(1) or ""}'),
        (rf'\binitStage_Exprov0?{i}_initAll\b', f'initStage_{eid}_initAll'),
        # 17-20 用的 `initStage_XX` 风格 (无前缀)
        (rf'\bgetStages{i}\b', f'getStages{eid}'),
        (rf'\binitStage_{i}(_s\d+)?\b', lambda m, eid=eid: f'initStage_{eid}{m.group(1) or ""}'),
        (rf'\binitStage_{i}_initAll\b', f'initStage_{eid}_initAll'),
    ]
    path = f'/tmp/ex_proven_{i:02d}/stages.js'
    if not os.path.exists(path):
        print(f'WARN: {path} 不存在')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    orig = text
    for pat, repl in eid_old_patterns:
        text = re.sub(pat, repl, text)
    # 还要把 exprovXX (小写) 替换成 exprovXX (eid 小写)
    text = re.sub(rf'\bexprov0?{i}\b', f'exprov{i:02d}', text)
    text = re.sub(rf'\bexprov_{i}\b', f'exprov{i:02d}', text)
    text = re.sub(rf'\bexprov{i}\b', f'exprov{i:02d}', text)
    if text != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)
        # 检查结果
        n_get = text.count(f'function getStages{eid}')
        n_init_s = len(re.findall(rf'function initStage_{eid}_s\d', text))
        n_main = text.count(f'function initStage_{eid}()')
        n_all = text.count(f'function initStage_{eid}_initAll')
        print(f'  EX_PROVEN_{i:02d}: getStages={n_get}, s1-5={n_init_s}, main={n_main}, initAll={n_all}')

print('Done')
