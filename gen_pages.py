#!/usr/bin/env python3
"""为 148 个历史页面 URL 生成轻量入口，统一复用根目录旧版应用。"""

import argparse
import html
import json
import re
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parent
PAGES_DIR = WORKSPACE / 'pages'
ID_PATTERN = re.compile(r'^[A-Z0-9_]+$')


def page_source(experiment_id: str, title: str, app_target: str = '../index.html') -> str:
    target = f'{app_target}#{experiment_id}'
    safe_title = html.escape(title)
    safe_target = html.escape(target, quote=True)
    script_target = json.dumps(target)
    return f'''<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url={safe_target}">
  <title>{safe_title}（{experiment_id}）</title>
  <link rel="canonical" href="{safe_target}">
</head>
<body>
  <p>正在打开“{safe_title}”… <a href="{safe_target}">若未自动跳转，请点这里</a>。</p>
  <script>location.replace({script_target});</script>
</body>
</html>
'''


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        '--output-dir',
        type=Path,
        default=PAGES_DIR,
        help='生成目录；默认写入源码 pages/'
    )
    parser.add_argument(
        '--app-target',
        default='../index.html',
        help='入口相对目标；发布包使用 ../legacy.html'
    )
    args = parser.parse_args()
    output_dir = args.output_dir if args.output_dir.is_absolute() else WORKSPACE / args.output_dir

    experiments = json.loads((WORKSPACE / 'experiments_meta.json').read_text(encoding='utf-8'))
    output_dir.mkdir(parents=True, exist_ok=True)
    expected_files: set[str] = set()
    for experiment in experiments:
        experiment_id = experiment['id']
        if not ID_PATTERN.fullmatch(experiment_id):
            raise ValueError(f'非法实验 ID：{experiment_id!r}')
        filename = f'{experiment_id}.html'
        expected_files.add(filename)
        (output_dir / filename).write_text(
            page_source(experiment_id, experiment['title'], args.app_target),
            encoding='utf-8'
        )

    stale_files = sorted(path.name for path in output_dir.glob('*.html') if path.name not in expected_files)
    if stale_files:
        raise RuntimeError(f'{output_dir} 存在未纳入目录的旧入口：{", ".join(stale_files)}')
    total_size = sum((output_dir / filename).stat().st_size for filename in expected_files)
    print(f'已生成 {len(expected_files)} 个轻量历史入口，共 {total_size:,} 字节')


if __name__ == '__main__':
    main()
