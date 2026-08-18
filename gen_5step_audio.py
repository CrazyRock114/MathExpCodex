#!/usr/bin/env python3
"""
v18.2.8 修正版：清理短版/详版的 HTML 残留
- 过滤掉单字/数字/token 残留
- 保留完整中文句子
"""
import re
from pathlib import Path
from html import unescape
import json

ROOT = Path("/Users/paulshi/Documents/MiniMax/π/mathexperiment")
PAGES = ROOT / "pages"
AUDIO = ROOT / "audio"

EXPS = ['NT01', 'NT03', 'PB01', 'PE01', 'PR06', 'OT01']

def extract_content(text_block):
    plain = re.sub(r"<[^>]+>", " ", text_block)
    plain = re.sub(r"\s+", " ", plain).strip()
    return unescape(plain)

def is_valid_sentence(s):
    """过滤太短/纯数字/纯符号的句子"""
    s = s.strip()
    if len(s) < 8:
        return False
    if re.match(r'^[\d\s\.\+\-\*/=×÷∑π√%]+$', s):
        return False
    # 至少含 1 个中文字符
    if not re.search(r'[\u4e00-\u9fff]', s):
        return False
    return True

def get_good_sentences(text, max_n=10):
    """从文本中抽取有意义的句子"""
    # 多种分句
    sents = re.split(r'[。！？!?\n]', text)
    sents = [s.strip() for s in sents if s.strip()]
    good = [s for s in sents if is_valid_sentence(s)]
    return good[:max_n]

def parse_stages_js(block, count=5):
    sm = re.search(r'stages:\s*\[', block)
    if not sm: return []
    i = sm.end()
    n = len(block)
    depth = 0
    in_str = None
    escape = False
    stages = []
    stage_start = None
    while i < n:
        c = block[i]
        if escape:
            escape = False
            i += 1
            continue
        if c == '\\':
            escape = True
            i += 1
            continue
        if in_str:
            if c == in_str:
                in_str = None
            i += 1
            continue
        if c in ('"', "'", '`'):
            in_str = c
            i += 1
            continue
        if c == '{':
            if depth == 0:
                stage_start = i
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                stages.append(block[stage_start:i+1])
                if len(stages) >= count:
                    break
                while i < n and block[i] not in '{[':
                    i += 1
                continue
        elif c == ']' and depth == 0:
            break
        i += 1
    return stages

def extract_field(stage_text, field):
    m = re.search(rf'"{field}":\s*"((?:[^"\\]|\\.)*)"', stage_text, re.DOTALL)
    return unescape(m.group(1)) if m else ""

def make_short(stage_data):
    """短版：1-2 句完整中文（30-60 字，5-8 秒）"""
    sents = stage_data['good_sents']
    title = stage_data['title']
    if not sents:
        return title + '。'
    # 短版：1-2 句
    if len(sents) >= 2:
        short = sents[0] + '。' + sents[1] + '。'
    else:
        short = sents[0] + '。'
    # 截到 100 字内
    if len(short) > 100:
        short = short[:100] + '...'
    return short

def make_long(stage_data):
    """详版：3-5 句完整中文（100-250 字，30 秒）"""
    sents = stage_data['good_sents']
    if not sents:
        return stage_data['title'] + '。'
    # 详版：取前 5 句
    long_sents = sents[:5]
    long_text = '。'.join(long_sents) + '。'
    if len(long_text) > 280:
        long_text = long_text[:280] + '...'
    return long_text

# 抽数据
all_scripts = {}
for exp in EXPS:
    p = PAGES / f"{exp}.html"
    text = p.read_text(encoding='utf-8')
    start = text.find(f'id: "{exp}"')
    end = text.find('render:', start)
    block = text[start:end]
    stages = parse_stages_js(block, count=5)
    all_scripts[exp] = []
    for i, st in enumerate(stages, 1):
        content = extract_field(st, 'content')
        plain = extract_content(content)
        good = get_good_sentences(plain, max_n=10)
        all_scripts[exp].append({
            'i': i,
            'emoji': extract_field(st, 'emoji'),
            'title': extract_field(st, 'title'),
            'good_sents': good,
        })

# 写 .txt
for exp, stages in all_scripts.items():
    for s in stages:
        (AUDIO / f"{exp}_s{s['i']}_short.txt").write_text(make_short(s), encoding='utf-8')
        (AUDIO / f"{exp}_s{s['i']}.txt").write_text(make_long(s), encoding='utf-8')

print("=== 短版预览（清理后）===")
for exp, stages in all_scripts.items():
    print(f"\n--- {exp} ---")
    for s in stages:
        print(f"  s{s['i']} {s['emoji']} {s['title']}")
        print(f"    short: {make_short(s)}")
        print(f"    long:  {make_long(s)[:100]}...")

# 输出 JSON 给 TTS 工具
out = []
for exp, stages in all_scripts.items():
    for s in stages:
        out.append({
            'name': f"{exp}_s{s['i']}_short",
            'text': make_short(s),
            'out': str(AUDIO / f"{exp}_s{s['i']}_short.mp3"),
        })
        out.append({
            'name': f"{exp}_s{s['i']}",
            'text': make_long(s),
            'out': str(AUDIO / f"{exp}_s{s['i']}.mp3"),
        })
(AUDIO / "_5step_scripts.json").write_text(
    json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8'
)
print(f"\n=== 共 {len(out)} 段，输出：{AUDIO / '_5step_scripts.json'} ===")
