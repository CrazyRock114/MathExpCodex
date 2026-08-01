#!/usr/bin/env python3
"""
构建 knowledge.html 知识点索引页
"""
import sys, os
sys.path.insert(0, '/Users/paulshi/Documents/MiniMax/π/mathexperiment')
from knowledge_points import (KPS, EXPERIMENT_KPS, TIER_NAMES, TIER_COLORS,
                              get_kp_learning_order_by_tier)
import json
import re

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

# 读 experiments_meta.json
with open('experiments_meta.json', 'r', encoding='utf-8') as f:
    exps = json.load(f)
exp_info = {e['id']: e['title'] for e in exps}
exp_cat = {e['id']: e.get('cat', '其他') for e in exps}

# 读 index.html 抽 <style>
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()
style_match = re.search(r'<style>(.*?)</style>', index_html, re.DOTALL)
CSS_BASE = style_match.group(1) if style_match else ''

# 转 KP 数据为 JS
def js_obj(o, indent=2):
    if isinstance(o, dict):
        items = []
        for k, v in o.items():
            items.append(f'{json.dumps(k, ensure_ascii=False)}: {js_obj(v, indent+2)}')
        return '{\n' + ',\n'.join('  ' * (indent // 2) + i for i in items) + '\n' + '  ' * ((indent - 2) // 2) + '}'
    if isinstance(o, list):
        return '[' + ', '.join(json.dumps(x, ensure_ascii=False) if not isinstance(x, (dict, list)) else js_obj(x, indent) for x in o) + ']'
    if isinstance(o, str):
        return json.dumps(o, ensure_ascii=False)
    return json.dumps(o)

# 生成 KP 分组 JS 数据
kp_by_tier = {}
for kp_id, kp in KPS.items():
    kp_by_tier.setdefault(kp['tier'], {})[kp_id] = kp

# 生成实验 → KP 反向索引
exps_by_kp = {}
for eid, kps in EXPERIMENT_KPS.items():
    for kp in kps:
        exps_by_kp.setdefault(kp, []).append(eid)

# KP 顺序
order = get_kp_learning_order_by_tier()

# ====== 构建 HTML ======
html_parts = []
html_parts.append(f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>📚 知识点索引（55 个 KP） | 数学小实验广场</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<style>
{CSS_BASE}

/* 知识点页特有样式 */
.kp-hero {{
  background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
  color: white;
  padding: 36px 32px;
  border-radius: 16px;
  margin-bottom: 24px;
}}
.kp-hero h1 {{ color: white; font-size: 32px; margin: 0 0 8px; }}
.kp-hero p {{ color: rgba(255,255,255,0.92); font-size: 15px; margin: 0; }}

.kp-search {{
  background: white;
  border: 2px solid var(--line);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}}
.kp-search input {{
  flex: 1;
  min-width: 220px;
  padding: 10px 14px;
  border: 1.5px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}}
.kp-search input:focus {{ border-color: var(--accent); }}
.kp-search select {{
  padding: 10px 12px;
  border: 1.5px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}}

.kp-section {{
  background: white;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
}}
.kp-section h2 {{
  font-size: 20px;
  margin: 0 0 16px;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
}}
.kp-tier-block {{
  margin-bottom: 24px;
  border-left: 4px solid var(--accent);
  padding-left: 16px;
}}
.kp-tier-block h3 {{
  font-size: 16px;
  margin: 0 0 12px;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 8px;
}}
.kp-tier-block .tier-tag {{
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  font-size: 11px;
  font-weight: 700;
}}

.kp-card {{
  display: inline-block;
  vertical-align: top;
  width: calc(33.33% - 12px);
  margin: 0 12px 12px 0;
  padding: 12px 14px;
  background: #fafafa;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  color: var(--ink);
}}
.kp-card:hover {{
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}}
.kp-card .kp-id {{
  font-size: 11px;
  font-weight: 700;
  opacity: 0.65;
  display: inline-block;
  margin-right: 6px;
}}
.kp-card .kp-name {{
  font-size: 15px;
  font-weight: 700;
}}
.kp-card .kp-desc {{
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
  line-height: 1.5;
}}
.kp-card .kp-prereq {{
  margin-top: 6px;
  font-size: 11px;
  color: var(--muted);
}}

.kp-detail {{
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 480px;
  max-width: 95vw;
  background: white;
  border-left: 1px solid var(--line);
  box-shadow: -4px 0 24px rgba(0,0,0,0.12);
  padding: 24px;
  overflow-y: auto;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.25s;
}}
.kp-detail.open {{ transform: translateX(0); }}
.kp-detail .close-btn {{
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
}}

.kp-detail .kp-header {{
  padding-bottom: 14px;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 16px;
}}
.kp-detail .kp-tier-tag {{
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  color: white;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 6px;
}}
.kp-detail .kp-title {{
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 6px;
}}
.kp-detail .kp-cat {{
  font-size: 12px;
  color: var(--muted);
}}

.kp-detail .kp-section-body {{
  margin-bottom: 18px;
}}
.kp-detail .kp-section-body h4 {{
  font-size: 13px;
  font-weight: 700;
  color: var(--muted);
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}}
.kp-detail .kp-section-body p {{
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}}

.kp-detail .kp-mini {{
  display: inline-block;
  padding: 3px 10px;
  background: #f3f4f6;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 12px;
  margin: 0 6px 6px 0;
  cursor: pointer;
  text-decoration: none;
  color: var(--ink);
  transition: all 0.15s;
}}
.kp-detail .kp-mini:hover {{ background: var(--accent); color: white; }}

.kp-detail .exp-link {{
  display: block;
  padding: 10px 12px;
  background: #fafafa;
  border: 1px solid var(--line);
  border-radius: 8px;
  margin-bottom: 6px;
  text-decoration: none;
  color: var(--ink);
  font-size: 13px;
  transition: all 0.15s;
}}
.kp-detail .exp-link:hover {{ background: var(--accent); color: white; }}
.kp-detail .exp-link .exp-id {{
  display: inline-block;
  padding: 1px 6px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  margin-right: 6px;
}}

.kp-path-card {{
  display: inline-block;
  margin: 4px 4px 4px 0;
  padding: 6px 10px;
  background: #f3f4f6;
  border: 1.5px solid var(--line);
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}}
.kp-path-card.has-prereq {{ border-left: 3px solid var(--accent); }}
.kp-path-card:hover {{ background: var(--accent); color: white; }}
.kp-path-card .path-num {{
  display: inline-block;
  width: 18px; height: 18px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  font-size: 10px;
  text-align: center;
  line-height: 18px;
  margin-right: 4px;
  font-weight: 700;
}}
.kp-path-card:hover .path-num {{ background: white; color: var(--accent); }}

@media (max-width: 700px) {{
  .kp-card {{ width: 100%; margin-right: 0; }}
  .kp-detail {{ width: 100vw; }}
}}

/* 隐藏 nav */
nav.tabs {{ display: none; }}
</style>
</head>
<body>

<header>
  <a href="index.html" class="back-link" style="display: inline-block; margin-bottom: 12px; padding: 6px 14px; background: white; border: 1px solid var(--line); border-radius: 6px; text-decoration: none; color: var(--accent); font-size: 14px; font-weight: 600;">← 返回广场</a>
  <h1 style="margin: 8px 0 4px;">📚 知识点索引</h1>
</header>

<div style="max-width: 1100px; margin: 0 auto; padding: 0 16px;">

<div class="kp-hero">
  <h1>🧠 128 个实验背后的 55 个知识点</h1>
  <p>从小学加减乘除到前沿同伦群，按照"依赖关系"梳理的学习路径。每个实验都标注了所需的前置知识。</p>
  <div style="margin-top: 14px; display: flex; gap: 18px; flex-wrap: wrap; font-size: 13px;">
    <span>📊 <strong>55</strong> 个知识点</span>
    <span>🎯 <strong>9</strong> 个层级（小学→前沿）</span>
    <span>🔗 <strong>128</strong> 个实验已关联</span>
    <span>📐 <strong>完整</strong> 拓扑排序学习路径</span>
  </div>
</div>

<!-- 搜索 + 实验反查 -->
<div class="kp-search">
  <input type="text" id="kpSearchInput" placeholder="🔍 搜索知识点（输入名称/描述/ID）">
  <select id="kpExpSelect">
    <option value="">📌 按实验反查（选一个实验）</option>
  </select>
</div>

<!-- 推荐学习路径 -->
<div class="kp-section">
  <h2>🗺️ 推荐学习路径（按依赖排序）</h2>
  <p style="font-size: 13px; color: var(--muted); margin: 0 0 14px;">
    从左到右、从上到下依次学习。每个 KP 卡片点击查看详情。
  </p>
  <div id="kpPathContainer" style="line-height: 1.8;"></div>
</div>

<!-- 按 tier 分组 -->
<div class="kp-section">
  <h2>📊 知识点全景（按 9 个层级分组）</h2>
  <div id="kpByTier"></div>
</div>

<!-- KP 详情侧栏 -->
<div class="kp-detail" id="kpDetail">
  <button class="close-btn" onclick="document.getElementById('kpDetail').classList.remove('open')">×</button>
  <div id="kpDetailBody"></div>
</div>

</div>

<script>
// ===== 知识点数据库 =====
const KNOWLEDGE_POINTS = {js_obj(KPS, indent=2)};

// ===== 实验 → KP 映射 =====
const EXPERIMENT_KPS = {js_obj(EXPERIMENT_KPS, indent=2)};

// ===== 实验信息（用于反查） =====
const EXP_INFO = {json.dumps({eid: {'title': t, 'cat': c} for eid, (t, c) in [(eid, (exp_info.get(eid, ''), exp_cat.get(eid, ''))) for eid in EXPERIMENT_KPS.keys()]}, ensure_ascii=False)};

// ===== Tier 信息 =====
const KP_TIER_NAMES = {json.dumps(TIER_NAMES, ensure_ascii=False)};
const KP_TIER_COLORS = {json.dumps(TIER_COLORS, ensure_ascii=False)};

// ===== 推荐学习顺序（按 tier 分层 + 拓扑序）=====
const KP_LEARN_ORDER = {json.dumps(order, ensure_ascii=False)};

// ===== 反向索引：KP → 实验 =====
const KP_TO_EXPS = {js_obj(exps_by_kp, indent=2)};

// ===== 渲染学习路径 =====
function renderPath() {{
  const c = document.getElementById('kpPathContainer');
  c.innerHTML = '';
  let currentTier = -1;
  let tierLine = document.createElement('div');
  tierLine.style.cssText = 'margin-bottom: 8px;';
  KP_LEARN_ORDER.forEach((kpId, i) => {{
    const kp = KNOWLEDGE_POINTS[kpId];
    if (kp.tier !== currentTier) {{
      if (tierLine.children.length) c.appendChild(tierLine);
      currentTier = kp.tier;
      tierLine = document.createElement('div');
      tierLine.style.cssText = 'margin-bottom: 8px; padding: 6px 0; border-top: 2px solid ' + (KP_TIER_COLORS[kp.tier] || '#6b7280') + '33;';
      const label = document.createElement('span');
      label.style.cssText = 'font-size: 11px; font-weight: 700; color: ' + (KP_TIER_COLORS[kp.tier] || '#6b7280') + '; margin-right: 8px;';
      label.textContent = 'T' + kp.tier + ' ' + (KP_TIER_NAMES[kp.tier] || '');
      tierLine.appendChild(label);
    }}
    const card = document.createElement('a');
    card.className = 'kp-path-card' + (kp.prereq.length ? ' has-prereq' : '');
    card.onclick = (e) => {{ e.preventDefault(); showKPDetail(kpId); }};
    const num = document.createElement('span');
    num.className = 'path-num';
    num.textContent = i + 1;
    num.style.background = KP_TIER_COLORS[kp.tier] || '#6b7280';
    card.appendChild(num);
    const txt = document.createElement('span');
    txt.textContent = kpId + ' ' + kp.name;
    card.appendChild(txt);
    tierLine.appendChild(card);
  }});
  if (tierLine.children.length) c.appendChild(tierLine);
}}

// ===== 渲染按 tier 分组 =====
function renderByTier() {{
  const c = document.getElementById('kpByTier');
  c.innerHTML = '';
  for (let tier = 1; tier <= 9; tier++) {{
    const kpsInTier = KP_LEARN_ORDER.filter(id => KNOWLEDGE_POINTS[id].tier === tier);
    if (kpsInTier.length === 0) continue;
    const block = document.createElement('div');
    block.className = 'kp-tier-block';
    block.style.borderLeftColor = KP_TIER_COLORS[tier] || '#6b7280';
    const h3 = document.createElement('h3');
    h3.innerHTML = `<span class="tier-tag" style="background: ${{KP_TIER_COLORS[tier]}}">T${{tier}}</span> ${{KP_TIER_NAMES[tier]}} <span style="font-size: 12px; color: var(--muted); font-weight: 400;">(${{kpsInTier.length}} 个)</span>`;
    block.appendChild(h3);
    kpsInTier.forEach(kpId => {{
      const kp = KNOWLEDGE_POINTS[kpId];
      const card = document.createElement('a');
      card.className = 'kp-card';
      card.href = '#kp-' + kpId;
      card.onclick = (e) => {{ e.preventDefault(); showKPDetail(kpId); }};
      const expCount = (KP_TO_EXPS[kpId] || []).length;
      card.innerHTML = `
        <div><span class="kp-id">${{kpId}}</span><span class="kp-name">${{kp.name}}</span></div>
        <div class="kp-desc">${{kp.desc}}</div>
        <div class="kp-prereq">${{kp.prereq.length ? '← ' + kp.prereq.map(p => KNOWLEDGE_POINTS[p].name).join('、') : '起点（无前置）'}} · 用于 ${{expCount}} 个实验</div>
      `;
      block.appendChild(card);
    }});
    c.appendChild(block);
  }}
}}

// ===== 渲染实验下拉框 =====
function renderExpSelect() {{
  const sel = document.getElementById('kpExpSelect');
  const exps = Object.keys(EXPERIMENT_KPS).sort();
  exps.forEach(eid => {{
    const opt = document.createElement('option');
    opt.value = eid;
    const info = EXP_INFO[eid] || {{}};
    opt.textContent = `${{eid}} ${{info.title || ''}}`;
    sel.appendChild(opt);
  }});
  sel.onchange = () => {{
    if (sel.value) {{
      const kps = EXPERIMENT_KPS[sel.value];
      if (kps.length) showKPDetail(kps[0], sel.value);
    }}
  }};
}}

// ===== 搜索过滤 =====
document.getElementById('kpSearchInput').oninput = (e) => {{
  const q = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.kp-card');
  cards.forEach(c => {{
    const txt = c.textContent.toLowerCase();
    c.style.display = (!q || txt.includes(q)) ? '' : 'none';
  }});
}};

// ===== 详情面板 =====
function showKPDetail(kpId, focusExpId) {{
  const kp = KNOWLEDGE_POINTS[kpId];
  if (!kp) return;
  const color = KP_TIER_COLORS[kp.tier] || '#6b7280';
  const usedExps = KP_TO_EXPS[kpId] || [];
  const isPrereqOf = KP_LEARN_ORDER.filter(id => (KNOWLEDGE_POINTS[id].prereq || []).includes(kpId));
  const html = `
    <div class="kp-header">
      <div class="kp-tier-tag" style="background: ${{color}}">T${{kp.tier}} ${{KP_TIER_NAMES[kp.tier] || ''}}</div>
      <h2 class="kp-title" id="kp-${{kpId}}">${{kpId}} ${{kp.name}}</h2>
      <div class="kp-cat">分类：${{kp.cat}} · 用于 ${{usedExps.length}} 个实验</div>
    </div>
    <div class="kp-section-body">
      <h4>📝 描述</h4>
      <p>${{kp.desc}}</p>
    </div>
    ${{kp.prereq.length ? `
    <div class="kp-section-body">
      <h4>📚 前置知识（要先学这些）</h4>
      ${{kp.prereq.map(p => {{
        const pk = KNOWLEDGE_POINTS[p];
        if (!pk) return '';
        return `<a class="kp-mini" href="#kp-${{p}}" onclick="event.preventDefault(); showKPDetail('${{p}}')">${{p}} ${{pk.name}}</a>`;
      }}).join('')}}
    </div>
    ` : '<div class="kp-section-body"><p style="color: var(--good); font-size: 13px;">✅ 起点（无前置）</p></div>'}}
    ${{isPrereqOf.length ? `
    <div class="kp-section-body">
      <h4>➡️ 后继知识（学完这个再学）</h4>
      ${{isPrereqOf.map(p => {{
        const pk = KNOWLEDGE_POINTS[p];
        if (!pk) return '';
        return `<a class="kp-mini" href="#kp-${{p}}" onclick="event.preventDefault(); showKPDetail('${{p}}')">${{p}} ${{pk.name}}</a>`;
      }}).join('')}}
    </div>
    ` : ''}}
    <div class="kp-section-body">
      <h4>🧪 用于以下实验（${{usedExps.length}} 个）</h4>
      ${{usedExps.length === 0 ? '<p style="color: var(--muted); font-size: 13px;">暂未关联实验</p>' : usedExps.map(eid => {{
        const info = EXP_INFO[eid] || {{}};
        return `<a class="exp-link" href="pages/${{eid}}.html" target="_blank"><span class="exp-id">${{eid}}</span>${{info.title || ''}}</a>`;
      }}).join('')}}
    </div>
    ${{focusExpId ? `
    <div style="margin-top: 16px; padding: 12px; background: #fef3c7; border-radius: 8px; font-size: 12px; color: #92400e;">
      💡 你正在看 <strong>${{focusExpId}}</strong> 的前置知识。<br>
      ${{EXPERIMENT_KPS[focusExpId].length}} 个 KP：${{EXPERIMENT_KPS[focusExpId].map(p => p + ' ' + (KNOWLEDGE_POINTS[p]?.name || '')).join('、')}}
    </div>
    ` : ''}}
  `;
  document.getElementById('kpDetailBody').innerHTML = html;
  document.getElementById('kpDetail').classList.add('open');
  document.getElementById('kpDetail').scrollTop = 0;
}}

// 初始化
renderPath();
renderByTier();
renderExpSelect();

// 自动打开链接锚点对应的 KP
const hash = window.location.hash;
if (hash && hash.startsWith('#kp-')) {{
  const kpId = hash.slice(4);
  if (KNOWLEDGE_POINTS[kpId]) showKPDetail(kpId);
}}

// URL 参数 focus=EX_ID
const params = new URLSearchParams(window.location.search);
const focus = params.get('focus');
if (focus && EXPERIMENT_KPS[focus]) {{
  showKPDetail(EXPERIMENT_KPS[focus][0], focus);
}}
</script>
</body>
</html>''')

html = '\n'.join(html_parts)

with open('knowledge.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Wrote knowledge.html ({len(html)} bytes)')

# 写一个 knowledge_assets 目录
os.makedirs('pages', exist_ok=True)
print('Done')
