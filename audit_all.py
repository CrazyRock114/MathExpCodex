#!/usr/bin/env python3
"""全 128 实验审计：5 步讲解、音频、函数、DOM 元素全部齐全"""
import os, json, re, glob

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('experiments_meta.json', 'r', encoding='utf-8') as f:
    exps = json.load(f)

# 音频文件
audio_mp3 = set()
audio_txt = set()
for f in glob.glob('audio/*_explain.mp3'):
    audio_mp3.add(os.path.basename(f).replace('_explain.mp3', ''))
for f in glob.glob('audio/*_explain.txt'):
    audio_txt.add(os.path.basename(f).replace('_explain.txt', ''))

# 函数定义
def has_func(name):
    return f'function {name}(' in html

# DOM 元素：检查 getStages 的 content 字符串里有没有 {id}s1 之类的
# 简化：找 initStage_XX_s2 之类的有 id 引用

results = []
for e in exps:
    eid = e['id']
    cat = e.get('cat', '?')
    stages = e.get('stages', [])
    audio = e.get('audioUrl', '')
    audio_id = audio.replace('audio/', '').replace('_explain.mp3', '') if audio else ''
    has_mp3 = audio_id in audio_mp3
    has_txt = audio_id in audio_txt
    has_getstages = has_func(f'getStages{eid}')
    has_initmain = has_func(f'initStage_{eid}')
    has_initall = has_func(f'initStage_{eid}_initAll')
    init_subs = sum(1 for s in ['s1','s2','s3','s4','s5'] if has_func(f'initStage_{eid}_{s}'))

    results.append({
        'id': eid, 'cat': cat, 'title': e['title'],
        'stages': len(stages),
        'audio_id': audio_id,
        'has_mp3': has_mp3, 'has_txt': has_txt,
        'getStages': has_getstages,
        'initStage_XX': has_initmain,
        'initAll': has_initall,
        'init_subs': init_subs,
    })

# 打印
print(f'共 {len(results)} 个实验')
print()
print(f"{'ID':6s} {'类':4s} {'标题':30s} {'stages':6s} {'mp3':4s} {'txt':4s} {'getSt':5s} {'init':4s} {'all':3s} {'subs':4s}")
fails = []
for r in results:
    flags = []
    if r['stages'] != 5: flags.append(f"stages={r['stages']}")
    if not r['has_mp3']: flags.append('NO_MP3')
    if not r['has_txt']: flags.append('NO_TXT')
    if not r['getStages']: flags.append('NO_getStages')
    if not r['initStage_XX']: flags.append('NO_init')
    if not r['initAll']: flags.append('NO_initAll')
    if r['init_subs'] < 5: flags.append(f"subs={r['init_subs']}")
    if flags:
        fails.append((r['id'], r['title'], flags))
    star = '✓' if not flags else '✗'
    print(f"{r['id']:6s} {r['cat']:4s} {r['title'][:30]:30s} {r['stages']:6d} {('Y' if r['has_mp3'] else 'N'):4s} {('Y' if r['has_txt'] else 'N'):4s} {('Y' if r['getStages'] else 'N'):5s} {('Y' if r['initStage_XX'] else 'N'):4s} {('Y' if r['initAll'] else 'N'):3s} {r['init_subs']:4d}  {star}")

print()
print(f'不通过: {len(fails)} / {len(results)}')
for fid, title, flags in fails:
    print(f'  {fid} ({title[:30]}): {", ".join(flags)}')

# 统计
mp3_total = sum(1 for r in results if r['has_mp3'])
txt_total = sum(1 for r in results if r['has_txt'])
gs_total = sum(1 for r in results if r['getStages'])
im_total = sum(1 for r in results if r['initStage_XX'])
ia_total = sum(1 for r in results if r['initAll'])
print()
print(f'mp3: {mp3_total}/{len(results)}')
print(f'txt: {txt_total}/{len(results)}')
print(f'getStages: {gs_total}/{len(results)}')
print(f'initStage: {im_total}/{len(results)}')
print(f'initAll: {ia_total}/{len(results)}')
print(f'all 5 stages: {sum(1 for r in results if r["stages"]==5)}/{len(results)}')
print(f'all 5 init subs: {sum(1 for r in results if r["init_subs"]==5)}/{len(results)}')
