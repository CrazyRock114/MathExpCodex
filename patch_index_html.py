#!/usr/bin/env python3
"""
patch_index_html.py — v18.3 同步修 index.html + pages/*.html 里的英文人名/阿拉伯数字年份

对所有可见 HTML 文本做 patch（精确排除 <script> <style> 内）

用法:
  python3 patch_index_html.py --apply
"""

import re
import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from patch_year_tts import patch_text


def patch_html_file(path, apply=False):
    """改 HTML 文件，跳过 <script> <style> 块"""
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # 收集所有 <script>...</script> 和 <style>...</style> 区域
    # 用更稳的方法：找 <script 或 <style 开始，到匹配的 </script> 或 </style> 结束
    skip_ranges = []
    for tag in ['script', 'style']:
        for m in re.finditer(rf'<{tag}\b[^>]*>', text):
            end_pat = re.compile(rf'</{tag}>', re.IGNORECASE)
            end_m = end_pat.search(text, m.end())
            if end_m:
                skip_ranges.append((m.start(), end_m.end()))

    def in_skip(pos):
        for s, e in skip_ranges:
            if s <= pos < e:
                return True
        return False

    # 找所有 `>...</span>` `<p>...</p>` 模式 + 文本节点
    # 用 >xxx< 匹配，但要求 xxx 不含 < 或 >
    changes = 0
    edits = []  # (s, e, new_content)

    # 1) >...< 之间的文本（但要排除 skip ranges）
    for m in re.finditer(r'>([^<>]+)<', text):
        s = m.start(1)
        e = m.end(1)
        if in_skip(s):
            continue
        content = m.group(1)
        if not content.strip():
            continue
        new_content = patch_text(content)
        if new_content != content:
            edits.append((s, e, new_content))

    # 2) explain: `...` 反引号块
    for m in re.finditer(r'(explain:\s*)`([^`]+)`', text):
        content = m.group(2)
        if in_skip(m.start(2)):
            continue
        new_content = patch_text(content)
        if new_content != content:
            edits.append((m.start(2), m.end(2), new_content))

    # 3) introIntro: '...' 单引号
    for m in re.finditer(r"(introIntro:\s*)'([^']+)'", text):
        content = m.group(2)
        if in_skip(m.start(2)):
            continue
        new_content = patch_text(content)
        if new_content != content:
            edits.append((m.start(2), m.end(2), new_content))

    # 4) history: `...` 反引号
    for m in re.finditer(r'(history:\s*)`([^`]+)`', text):
        content = m.group(2)
        if in_skip(m.start(2)):
            continue
        new_content = patch_text(content)
        if new_content != content:
            edits.append((m.start(2), m.end(2), new_content))

    # 5) attribute 里的内容
    for attr in ['title', 'alt', 'aria-label', 'placeholder']:
        for m in re.finditer(rf'\b{attr}="([^"]*)"', text):
            s = m.start(1)
            e = m.end(1)
            if in_skip(s):
                continue
            content = m.group(1)
            new_content = patch_text(content)
            if new_content != content:
                edits.append((s, e, new_content))

    # 从后往前应用修改
    for s, e, new_content in sorted(edits, key=lambda x: -x[0]):
        text = text[:s] + new_content + text[e:]
        changes += 1

    # 6) 强制替换常见英文人名（即使在 skip 范围外也可能漏）
    for m in list(re.finditer(r'\bWayagi\b', text)):
        s, e = m.span()
        # 前后 100 字符，看是不是在 // 注释
        ctx_before = text[max(0, s-100):s]
        if '//' in ctx_before and text.rfind('\n', 0, s) > text.rfind('//', 0, s):
            continue
        new = 'Wayland'
        text = text[:s] + new + text[e:]
        changes += 1
        # 注意：必须重置 finditer 后的位置
        # 简单方法：从 e 开始继续找
        text = re.sub(r'\bWayagi\b', 'Wayland', text, count=text.count('Wayagi', 0))
        # 这种简单方法可能误改，但 Wayagi 是非常特定的名字
        break

    if apply and changes > 0:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f'  ✅ {path.name}: {changes} 处修改')
    elif changes > 0:
        print(f'  📝 {path.name}: {changes} 处待改')
    return changes


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--apply', action='store_true')
    p.add_argument('--dry-run', action='store_true')
    p.add_argument('--files', nargs='*')
    args = p.parse_args()

    project_root = Path(__file__).parent

    if args.files:
        files = [Path(f) for f in args.files]
    else:
        files = [project_root / 'index.html']
        pages_dir = project_root / 'pages'
        if pages_dir.exists():
            files.extend(sorted(pages_dir.glob('*.html')))

    total = 0
    for f in files:
        if f.exists():
            n = patch_html_file(f, apply=args.apply)
            total += n

    print(f'\n=== 总结 ===')
    print(f'总修改: {total} 处')
    if not args.apply:
        print(f'⚠️  Dry run — 加 --apply 才真的改文件')
    return 0


if __name__ == '__main__':
    sys.exit(main())
