#!/usr/bin/env python3
"""
注入 KP 知识点库到 index.html:
1. 在 EXPERIMENTS 数组前注入 KNOWLEDGE_POINTS 全局对象
2. 在 EXPERIMENTS 数组前注入 EXPERIMENT_KPS 映射
3. 修改 plazaOpen 函数：在 intro 之后添加 KP 标签
"""
import sys, os, re
sys.path.insert(0, '/Users/paulshi/Documents/MiniMax/π/mathexperiment')
from knowledge_points import KPS, EXPERIMENT_KPS, TIER_NAMES, TIER_COLORS

# 补全 K08 长方形正方形
EXPERIMENT_KPS['GM05'] = ['K12', 'K08', 'K10']  # 圆柱需要长方形面积推导

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1) 生成 KNOWLEDGE_POINTS JS
kp_js_lines = ['const KNOWLEDGE_POINTS = {']
for kp_id, kp in KPS.items():
    kp_js_lines.append(
        f'  "{kp_id}": {{name: {repr(kp["name"])}, tier: {kp["tier"]}, '
        f'cat: {repr(kp["cat"])}, desc: {repr(kp["desc"])}, '
        f'prereq: {repr(kp["prereq"])}}},'
    )
kp_js_lines.append('};')
kp_js = '\n'.join(kp_js_lines)

# 2) 生成 EXPERIMENT_KPS JS
ekp_js_lines = ['const EXPERIMENT_KPS = {']
for eid, kps in EXPERIMENT_KPS.items():
    ekp_js_lines.append(f'  "{eid}": {repr(kps)},')
ekp_js_lines.append('};')
ekp_js = '\n'.join(ekp_js_lines)

# 3) 生成 TIER_NAMES / TIER_COLORS JS
tier_names_js = f'const KP_TIER_NAMES = {repr(TIER_NAMES)};'
tier_colors_js = f'const KP_TIER_COLORS = {repr(TIER_COLORS)};'

# 4) 注入到 EXPERIMENTS 数组前
inject_str = f'\n{kp_js}\n{ekp_js}\n{tier_names_js}\n{tier_colors_js}\nconst EXPERIMENTS = ['
if 'const KNOWLEDGE_POINTS' in html:
    # 删除现有的 KP block，再插入
    html = re.sub(
        r'\n?const KNOWLEDGE_POINTS = \{[\s\S]*?const KP_TIER_COLORS = \{[\s\S]*?\};\n?',
        '\n',
        html,
        count=1
    )
    print('Removed existing KP block')
html = html.replace('const EXPERIMENTS = [', inject_str, 1)
print(f'Injected KP JS ({len(kp_js) + len(ekp_js)} bytes)')

# 5) 修改 plazaOpen：在 intro 之后插入 KP 标签
old_marker = '<p style="font-size: 14px; color: var(--muted); margin: 0 0 16px;">${exp.intro}</p>'
old_marker_v2 = '<p style="font-size: 14px; color: var(--muted); margin: 0 0 12px;">${exp.intro}</p>\n    <div id="plazaKPTags"'
new_marker = '''<p style="font-size: 14px; color: var(--muted); margin: 0 0 12px;">${exp.intro}</p>
    <div id="plazaKPTags" style="margin: 0 0 16px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
      <span style="font-size: 11px; color: var(--muted); font-weight: 600;">📚 前置知识：</span>
    </div>'''

if old_marker in html:
    html = html.replace(old_marker, new_marker, 1)
    print('Replaced intro paragraph to add KP tags placeholder')
elif old_marker_v2 in html:
    print('Already has plazaKPTags, skipping intro replacement')
else:
    print('WARNING: intro marker not found')

# 6) 在 plazaDetail.innerHTML 之后追加 renderKPTags 调用
old_render = 'exp.render(document.getElementById(\'plazaBody\'));'
old_render_v2 = 'exp.render(document.getElementById(\'plazaBody\'));\n  renderKPTags(exp.id);'
if old_render in html and 'renderKPTags(exp.id);' not in html:
    new_render = old_render + '\n  renderKPTags(exp.id);'
    html = html.replace(old_render, new_render, 1)
    print('Added renderKPTags call after exp.render')
elif old_render_v2 in html:
    print('Already has renderKPTags call, skipping')

# 7) 注入 renderKPTags 函数
render_kp_fn = '''
/* ========== KP 标签渲染 ========== */
function renderKPTags(expId) {
  const tagsEl = document.getElementById('plazaKPTags');
  if (!tagsEl || typeof EXPERIMENT_KPS === 'undefined') return;
  const kps = EXPERIMENT_KPS[expId] || [];
  if (kps.length === 0) return;
  const sep = document.createElement('span');
  sep.style.cssText = 'font-size: 11px; color: var(--muted); font-weight: 600;';
  sep.textContent = '📚 前置知识：';
  // 清空 placeholder
  tagsEl.innerHTML = '';
  tagsEl.appendChild(sep);
  kps.forEach((kpId, i) => {
    const kp = KNOWLEDGE_POINTS[kpId];
    if (!kp) return;
    const tag = document.createElement('a');
    const color = KP_TIER_COLORS[kp.tier] || '#6b7280';
    tag.href = 'knowledge.html#kp-' + kpId;
    tag.target = '_blank';
    tag.title = kp.desc + (kp.prereq.length ? '（前置：' + kp.prereq.map(p => KNOWLEDGE_POINTS[p]?.name || p).join('、') + '）' : '');
    tag.style.cssText = `
      display: inline-block;
      padding: 3px 10px;
      background: ${color}1a;
      color: ${color};
      border: 1.5px solid ${color}66;
      border-radius: 14px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s;
      cursor: pointer;
    `;
    tag.onmouseover = () => { tag.style.background = color; tag.style.color = 'white'; };
    tag.onmouseout = () => { tag.style.background = color + '1a'; tag.style.color = color; };
    tag.innerHTML = `<span style="opacity: 0.6; font-size: 10px;">${kpId}</span> ${kp.name}`;
    tagsEl.appendChild(tag);
  });
  // 加个"学习路径"链接
  const learnLink = document.createElement('a');
  learnLink.href = 'knowledge.html?focus=' + expId;
  learnLink.target = '_blank';
  learnLink.style.cssText = `
    display: inline-block;
    padding: 3px 10px;
    background: #f3f4f6;
    color: #4b5563;
    border: 1.5px solid #d1d5db;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 600;
    text-decoration: none;
    margin-left: 4px;
  `;
  learnLink.textContent = '🗺️ 学习路径';
  tagsEl.appendChild(learnLink);
}
'''

# 插在 plazaOpen 之前
target = 'function plazaOpen(id, setHash = true) {'
if '/* ========== KP 标签渲染 ========== */' in html:
    # 删除现有的 renderKPTags，再插入
    html = re.sub(
        r'/\* ========== KP 标签渲染 ========== \*/\nfunction renderKPTags[\s\S]*?\n\}\n',
        '',
        html,
        count=1
    )
    print('Removed existing renderKPTags function')
if 'function renderKPTags' not in html:
    html = html.replace(target, render_kp_fn + '\n' + target, 1)
    print('Injected renderKPTags function')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
