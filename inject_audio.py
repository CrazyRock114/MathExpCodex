#!/usr/bin/env python3
"""把 audio/*_explain.txt 注入到 index.html EXPERIMENTS 数组的 explain 字段，并加 audioUrl"""
import os, re, json, glob

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

# 读所有 txt
audio_dir = 'audio'
txts = sorted(glob.glob(f'{audio_dir}/*_explain.txt'))
print(f'找到 {len(txts)} 个讲稿')

# 读 index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 找 EXPERIMENTS 数组开始和结束位置
# 数组开始: const EXPERIMENTS = [
start = html.find('const EXPERIMENTS = [')
if start < 0:
    print('找不到 EXPERIMENTS 数组')
    exit(1)

# 数组结束: 用 // EXPERIMENTS 结束 标记 + 往前找最近的 },
end_marker = html.find('// EXPERIMENTS 结束')
if end_marker < 0:
    print('找不到 EXPERIMENTS 结束标记')
    exit(1)
# 找 end_marker 之前最近的 },
before_end = html.rfind('},', end_marker)
arr_start = html.find('const EXPERIMENTS = [')
arr_end = before_end + 2  # 包含 '},'

if arr_end < 0:
    print('找不到数组结束')
    exit(1)

print(f'EXPERIMENTS 数组: char {arr_start}..{arr_end}, 长度 {arr_end - arr_start}')

# 解析数组里所有 { id: 'XX', ... } 块
arr_text = html[arr_start:arr_end]
# 找所有 "id: 'XX'"
ids = re.findall(r"id:\s*'([^']+)'", arr_text)
print(f'数组里 {len(ids)} 个 id')

# 给每个 id 找它对应的块范围（粗略：每个 { 开始到下一个 }）
# 不用解析整个 JS 对象，直接在字符串上做替换
# 策略：对每个 (id, txt_path)：
#   找到 "id: 'XX'" 第一次出现位置
#   在它前面找最近的 '{' (这是块的开始)
#   在它后面找最近的 ',' 或 '}' (这是块的结束)
#   检查块内是否已有 explain: / audioUrl: 字段

def find_block_bounds(arr_text, target_id):
    """找 id: 'target_id' 所在的对象块 (object literal) 的起止字符索引（在 arr_text 内的）"""
    needle = f"id: '{target_id}'"
    pos = arr_text.find(needle)
    if pos < 0:
        return None
    # 往前找最近的 '{'（不在字符串里）
    i = pos - 1
    while i >= 0:
        c = arr_text[i]
        if c == "'" or c == '"':
            # 检查是不是字符串里的引号
            # 简单做法：跳过单引号字符串
            quote = c
            i -= 1
            while i >= 0 and arr_text[i] != quote:
                if arr_text[i] == '\\':
                    i -= 1
                i -= 1
            continue
        if c == '{':
            block_start = i
            break
        i -= 1
    else:
        return None
    # 往后找匹配的 '}' (不在字符串里)
    depth = 0
    in_str = False
    str_quote = ''
    i = block_start
    while i < len(arr_text):
        c = arr_text[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == str_quote:
                in_str = False
        else:
            if c == "'" or c == '"':
                in_str = True
                str_quote = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return (block_start, i + 1)
        i += 1
    return None

# 测试一下
b = find_block_bounds(arr_text, 'PR01')
print(f'PR01 block: {b}')

# 对每个 id 找块、注入
new_arr = arr_text
injected = 0
skipped_have = 0
for txt in txts:
    eid = os.path.basename(txt).replace('_explain.txt', '')
    with open(txt, 'r', encoding='utf-8') as f:
        text = f.read().strip()
    # JS 字符串字面量：把 ' 替换为 \'
    text_js = text.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '')
    bounds = find_block_bounds(arr_text, eid)
    if not bounds:
        print(f'  SKIP: {eid} - 找不到块')
        continue
    bs, be = bounds
    block = arr_text[bs:be]
    # 检查是否已有 explain / audioUrl
    has_explain = 'explain:' in block or 'explain :' in block
    has_audio = 'audioUrl:' in block
    if has_explain and has_audio:
        skipped_have += 1
        continue
    # 找 inject 点：在 intro 字段后面 + cat/title 不动
    # 简单：在 '  intro: `...`,` 后注入 explain + audioUrl
    # 但 intro 可能是 '..' 也可能是 `..`（模板字符串）
    # 用更稳的方法：找 'render:' 之前注入
    inject_marker = '  render:'
    pos = block.find(inject_marker)
    if pos < 0:
        # 可能在 closing } 之前
        inject_marker = '},'
        pos = block.rfind(inject_marker)
    if pos < 0:
        print(f'  SKIP: {eid} - 找不到 render 或 close-brace')
        continue
    # 构造新字段
    new_fields = f"  explain: `{text}`,\n  audioUrl: 'audio/{eid}_explain.mp3',\n"
    # 检查 explain 是否已经存在但 audioUrl 缺
    if has_explain and not has_audio:
        # 只加 audioUrl
        new_fields = f"  audioUrl: 'audio/{eid}_explain.mp3',\n"
        new_block = block[:pos] + new_fields + block[pos:]
    else:
        new_block = block[:pos] + new_fields + block[pos:]
    new_arr = new_arr.replace(block, new_block, 1)
    injected += 1
    if injected % 20 == 0:
        print(f'  injected {injected}...')

print(f'注入 {injected} 个, 跳过已有 {skipped_have} 个')

# 写回
new_html = html[:arr_start] + new_arr + html[arr_end:]
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
print('Done.')
