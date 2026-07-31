#!/usr/bin/env python3
"""把 98 个 txt 讲稿分成 10 批，输出 JSON 文件方便逐批生成 mp3"""
import os, json, glob

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

# 收集所有还没生成 mp3 的 txt
txts = sorted(glob.glob('audio/*_explain.txt'))
todo = [t for t in txts if not os.path.exists(t.replace('.txt', '.mp3'))]
print(f'待生成: {len(todo)} 个')

# 每 10 个一批
batches = [todo[i:i+10] for i in range(0, len(todo), 10)]
print(f'共 {len(batches)} 批')

# 写每批到 JSON 文件
for i, batch in enumerate(batches, 1):
    requests = []
    for txt_path in batch:
        with open(txt_path, 'r', encoding='utf-8') as f:
            text = f.read().strip()
        eid = os.path.basename(txt_path).replace('_explain.txt', '')
        requests.append({
            'text': text,
            'output_file_path': f'audio/{eid}_explain.mp3',
            'voice_id': 'Chinese (Mandarin)_Gentle_Youth',
            'speed': 0.95
        })
    with open(f'/tmp/batch_{i:02d}.json', 'w', encoding='utf-8') as f:
        json.dump(requests, f, ensure_ascii=False, indent=2)
    print(f'批 {i}: {[os.path.basename(t) for t in batch]}')
    # 写一个 read_batch.py 脚本
print('Done.')
