#!/usr/bin/env python3
"""
patch_year_tts.py — v18.3 全站讲稿"YYYY 年" 改成"YYYY年"按位读 + 英文人名 → 中文译名

用法:
  python3 patch_year_tts.py --dry-run   # 只报告，不改
  python3 patch_year_tts.py --apply     # 应用到所有 .txt
  python3 patch_year_tts.py --apply --files audio/EX01_explain.txt audio/EX02_explain.txt  # 指定文件
"""

import re
import sys
import argparse
from pathlib import Path

# 年份 → 按位读
def year_to_chinese(num):
    """1234 → 一二三 4 风格，TTS 按位读"""
    digits = {
        '0': '〇', '1': '一', '2': '二', '3': '三', '4': '四',
        '5': '五', '6': '六', '7': '七', '8': '八', '9': '九',
    }
    return ''.join(digits[d] for d in str(num))

# 英文人名 → 中文译名（已在 v18.1.4 全站统一，但讲稿可能残留）
NAME_MAP = [
    # 长串先匹配（避免被短串先吃掉）
    ('Cooper-Kennedy', '库珀-肯尼迪'),
    ('Cooper 和 Kennedy', '库珀和肯尼迪'),
    ('库珀肯尼迪', '库珀-肯尼迪'),  # 修 v18.1.4 漏的粘连
    ('Srinivasa Ramanujan', '斯里尼瓦瑟·拉马努金'),
    ('G. H. Hardy', 'G. H. 哈代'),
    ('G.H. Hardy', 'G. H. 哈代'),
    ('D. R. Kaprekar', 'D. R. 卡普雷卡'),
    # Kaprekar 复合词
    ('Kaprekar 变换', '卡普雷卡 变换'),
    ('Kaprekar 常数', '卡普雷卡 常数'),
    ('Kaprekar 旅程', '卡普雷卡 旅程'),
    ('Kaprekar 命名', '卡普雷卡 命名'),
    ('Kaprekar 发现', '卡普雷卡 发现'),
    ('Kaprekar', '卡普雷卡'),
    ('Westzynthius', '韦斯津修斯'),
    ('De Bono', '德波诺'),
    ('de Bono', '德波诺'),
    ('Wayagi', 'Wayland'),  # 错位人名修复（OEIS A006753 实证）
    ('Erdős', '埃尔德什'),
    ('Erdos', '埃尔德什'),
    ('Eisenstein', '艾森斯坦'),
    ('Ramanujan', '拉马努金'),
    ('Vijayaraghavan', '维杰雅拉哈万'),
    ('Pythagoras', '毕达哥拉斯'),
    ('Koblitz', '科布利茨'),
    ('Miller', '米勒'),
    ('Tonelli', '托尼利'),
    ('Shanks', '尚克斯'),
    ('Ginibre', '吉尼布雷'),
    ('Joukowski', '茹科夫斯基'),
    ('Lobachevsky', '罗巴切夫斯基'),
    ('Guthrie', '古斯里'),
    ('Gonthier', '冈蒂耶'),
    ('Riemann', '黎曼'),
    ('Euler', '欧拉'),
    ('Gauss', '高斯'),
    ('Fermat', '费马'),
    ('Archimedes', '阿基米德'),
    ('Euclid', '欧几里得'),
    ('Pythagorean', '毕达哥拉斯'),
    ('Hardy', '哈代'),
    ('Rankin', '兰金'),
    ('Gowers', '高尔斯'),
    ('Tao', '陶'),
    ('Maynard', '梅纳德'),
    ('Polymath', '波利马什'),
    ('Erdos', '埃尔德什'),
    ('Weil', '韦伊'),
    ('Lagrange', '拉格朗日'),
    ('Legendre', '勒让德'),
    ('Dirichlet', '狄利克雷'),
    ('Landau', '朗道'),
    ('Hadamard', '阿达马'),
    ('Klein', '克莱因'),
    ('Fourier', '傅里叶'),
    ('Girko', '吉尔科'),
    ('Gutman', '古特曼'),
    ('Hamilton', '汉密尔顿'),
    ('Perelman', '佩雷尔曼'),
    ('Wiles', '怀尔斯'),
    ('Helfgott', '赫尔福特'),
    ('Yau', '丘'),
    ('Kakeya', '挂谷'),
    ('Besicovitch', '贝西科维奇'),
    ('Falconer', '法尔科纳'),
    ('Furstenberg', '弗斯滕伯格'),
    ('Fefferman', '费弗曼'),
    ('Turing', '图灵'),
    ('Goldbach', '哥德巴赫'),
    ('Wang', '王'),
    ('Tao Zhexuan', '陶哲轩'),
    ('Zhexuan', '哲轩'),
    # 单独短名
    ('Cooper', '库珀'),
    ('Kennedy', '肯尼迪'),
]


def patch_text(text):
    """对单段文本做改写"""
    out = text

    # 1. 英文人名 → 中文（先做长串，再做短串）
    #    长串优先（避免被短串先吃掉）
    long_first = sorted(NAME_MAP, key=lambda x: -len(x[0]))
    for en, zh in long_first:
        out = out.replace(en, zh)

    # 2. "YYYY 年" / "YYYY年" → "YYYY年"按位读
    #    例: 1962 年 → 一九六二年
    #    例: 1993 年 Cooper → 一九九三年 库珀
    #    注意："1000 年" "2000 年" 这种时间长度改 "一千年" "两千年"
    def repl_year(m):
        num = int(m.group(1))
        # 1000/2000 视为时间长度（特殊处理）
        if num == 1000:
            return '一千年'
        if num == 2000:
            return '两千年'
        if num == 500:
            return '五百年'
        if num == 300:
            return '三百年'
        # 1001-2200 真年份按位读
        if 1001 <= num <= 2200:
            return year_to_chinese(num) + '年'
        # 其他保留
        return m.group(0)

    out = re.sub(r'(?<!\d)(\d{4})(\s*)年', repl_year, out)

    return out


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--apply', action='store_true', help='应用修改到文件')
    p.add_argument('--dry-run', action='store_true', help='只报告不修改（默认）')
    p.add_argument('--files', nargs='*', help='指定要处理的文件')
    p.add_argument('--report', default='patch_year_tts_report.md', help='报告文件')
    args = p.parse_args()

    project_root = Path(__file__).parent
    audio_dir = project_root / 'audio'
    if not audio_dir.exists():
        print('No audio dir')
        return 1

    if args.files:
        files = [Path(f) for f in args.files]
    else:
        files = sorted(audio_dir.glob('*.txt'))

    total_changed = 0
    total_unchanged = 0
    report_lines = []

    for f in files:
        if not f.exists():
            continue
        text = f.read_text(encoding='utf-8')
        new_text = patch_text(text)
        if new_text != text:
            total_changed += 1
            # 显示变化
            n_year = len(re.findall(r'\d{4}\s*年', text)) - len(re.findall(r'\d{4}\s*年', new_text))
            n_name = sum(text.count(en) for en, _ in NAME_MAP) - sum(new_text.count(en) for en, _ in NAME_MAP)
            report_lines.append((f.name, n_year, n_name))
            if args.apply:
                f.write_text(new_text, encoding='utf-8')
                print(f'  ✅ 改: {f.name} (年份: {n_year}, 人名: {n_name})')
            else:
                print(f'  📝 待改: {f.name} (年份: {n_year}, 人名: {n_name})')
        else:
            total_unchanged += 1

    print(f'\n=== 总结 ===')
    print(f'总文件: {len(files)}')
    print(f'要修改: {total_changed}')
    print(f'无变化: {total_unchanged}')

    if args.apply:
        print(f'\n✅ 已应用修改到 {total_changed} 个文件')
    else:
        print(f'\n⚠️  Dry run 模式 — 加 --apply 才真的改文件')

    # 写报告
    if report_lines:
        report_path = project_root / args.report
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(f'# v18.3 patch_year_tts 报告\n\n')
            f.write(f'扫了 {len(files)} 个讲稿 .txt 文件\n\n')
            f.write(f'要修改: **{total_changed}** 个\n\n')
            f.write(f'## 待改清单\n\n')
            f.write(f'| 文件 | YYYY 年替换 | 英文人名替换 |\n')
            f.write(f'|---|---|---|\n')
            for name, ny, nn in report_lines:
                f.write(f'| {name} | {ny} | {nn} |\n')
        print(f'报告写到: {report_path}')

    return 0


if __name__ == '__main__':
    sys.exit(main())
