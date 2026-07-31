#!/usr/bin/env python3
"""
为 108 个实验每个生成一个真·独立 HTML 页面 (pages/{id}.html)。
每个页面直接复用 index.html 的 plazaOpen 渲染 4 区 + 互动演示。
"""
import json, os, re

WORK = '/Users/paulshi/Documents/MiniMax/π/mathexperiment'
os.chdir(WORK)

# 1. 读 index.html
with open('index.html', 'r', encoding='utf-8') as f:
    src = f.read()

# 2. 抽 <style> 块内容
m = re.search(r'<style>(.*?)</style>', src, re.DOTALL)
CSS = m.group(1)

# 3. 抽 <script> 块中 EXPERIMENTS 之前的部分（共享 setupXxx + HTML 模板常量）
m = re.search(r'<script>(.*?)const EXPERIMENTS = \[', src, re.DOTALL)
SHARED_JS_PRE = m.group(1).rstrip()

# 4. 抽 EXPERIMENTS 之后到 plazaSearch.addEventListener 之前的部分
#    （广场渲染 + plazaOpen + buildExampleExplain + escapeHtml）
#    再加上 Twin + PiAlg（在 plazaSearch 之后，但不包含 plazaSearch 初始化）
m = re.search(r'// EXPERIMENTS 结束(.*?)plazaSearch\.addEventListener', src, re.DOTALL)
PART_A = m.group(1).rstrip()
# Twin + PiAlg 段：从 const TWIN_HTML 开始到 piRunAll 函数结束
# 截到 '/* ===================== Tabs' 之前（piRunAll 在 Tabs 之前结束）
twin_idx = src.find('const TWIN_HTML = ')
if twin_idx > 0:
    end_idx = src.find('/* ===================== Tabs', twin_idx)
    if end_idx < 0:
        end_idx = src.find('</script>', twin_idx)
    PART_B = src[twin_idx:end_idx].rstrip()
else:
    PART_B = ''
SHARED_JS_POST = PART_A + '\n' + PART_B

# 5. 读元数据
with open('experiments_meta.json', 'r', encoding='utf-8') as f:
    exps = json.load(f)

# 6. 箭头函数 → function 表达式
def to_function(render_src):
    s = render_src.strip()
    m = re.match(r'^\(([^)]*)\)\s*=>\s*([\s\S]+)$', s)
    if not m:
        return s
    args, body = m.group(1), m.group(2).strip()
    if body.startswith('{'):
        return f'function({args}) {body}'
    else:
        return f'function({args}) {{ return {body}; }}'

# 7. PLAZA_CATEGORIES
PLAZA_CATS = {
    '数论': 'cat-nt', '序列': 'cat-sq', 'π·e': 'cat-pi', '几何': 'cat-gm',
    '图论': 'cat-gr', '概率': 'cat-pb', '算法': 'cat-al', '分形': 'cat-fr', '其他': 'cat-ot',
}

# 8. 写 pages 目录
os.makedirs('pages', exist_ok=True)

print(f'生成 {len(exps)} 个独立页面...')
errors = []

for exp in exps:
    try:
        exp_id = exp['id']
        cat = exp['cat']
        title = exp['title']
        intro = exp['intro']
        principle = exp['principle']
        history = exp['history']
        tryit = exp['tryit']
        svg_demo = exp['svgDemo']
        explain = exp['explain']
        audio_url = exp['audioUrl']
        render_func = to_function(exp['renderSrc'])

        cat_class = PLAZA_CATS.get(cat, 'cat-ot')

        # audio URL 路径（独立页面在 pages/，audio 在 ../audio/）
        audio_path = '../' + audio_url if audio_url else ''

        # 构建独立 HTML
        # 顶部 header 含返回链接 + 标题 + intro
        # plazaOpen 会填充 plazaDetail（包含 4 区 + 互动演示 + AI 讲解 + Mavis 讲解）
        html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#2563eb">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="AI 数学课堂">
<title>{title}（{exp_id}） | 数学小实验广场</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<style>
{CSS}
.back-link {{
  display: inline-block;
  margin-bottom: 12px;
  padding: 6px 14px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 6px;
  text-decoration: none;
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.15s;
}}
.back-link:hover {{ background: #f3f4f6; }}
/* 独立页面：隐藏 nav tabs */
header {{ position: relative; }}
nav.tabs {{ display: none; }}
</style>
</head>
<body>

<header>
  <a href="../index.html" class="back-link">← 返回广场</a>
  <h1>{title} <span class="cat-tag {cat_class}" style="font-size: 12px;">{cat}</span> <span class="id-tag">{exp_id}</span></h1>
  <p>{intro}</p>
  <div style="position: absolute; top: 16px; right: 24px; display: flex; gap: 8px;">
    <button id="darkToggle" class="ghost small" style="font-size: 12px;">🌙 深色</button>
  </div>
</header>

<section class="tab-panel active" id="plaza">
  <div id="plazaGrid" style="display: none;"></div>
  <div id="plazaCount" style="display: none;"></div>
  <div id="plazaDetail" class="plaza-detail" style="display: block; margin-top: 16px;">
    <p style="text-align: center; color: var(--muted); padding: 40px;">加载中…</p>
  </div>
</section>

<script>
// ========== 1. 共享 JS：8 个 setupXxx + 8 个 HTML 模板常量（含 PLAZA_CATEGORIES）==========
{SHARED_JS_PRE}

// ========== 2. 当前实验（独立页面只含一个） ==========
const EXPERIMENTS = [{{
  id: {json.dumps(exp_id)},
  cat: {json.dumps(cat, ensure_ascii=False)},
  title: {json.dumps(title, ensure_ascii=False)},
  intro: {json.dumps(intro, ensure_ascii=False)},
  principle: {json.dumps(principle, ensure_ascii=False)},
  history: {json.dumps(history, ensure_ascii=False)},
  tryit: {json.dumps(tryit, ensure_ascii=False)},
  svgDemo: {json.dumps(svg_demo, ensure_ascii=False)},
  explain: {json.dumps(explain, ensure_ascii=False)},
  audioUrl: {json.dumps(audio_url, ensure_ascii=False)},
  render: {render_func}
}}];

// ========== 3. 共享 JS：广场渲染 + plazaOpen + Twin + PiAlg ==========
{SHARED_JS_POST}

// ========== 4. 修复 audio 路径（独立页面 audio 在 ../audio/）============
(function fixAudioPaths() {{
  if (!{json.dumps(audio_url, ensure_ascii=False)}) return;
  const audios = document.querySelectorAll('audio[src*="audio/"]');
  audios.forEach(a => {{ a.src = '../' + a.getAttribute('src'); }});
  const links = document.querySelectorAll('a[href*="audio/"]');
  links.forEach(l => {{ l.href = '../' + l.getAttribute('href'); }});
}})();

// ========== 5. 独立渲染 ==========
function initPage() {{
  try {{
    // 直接打开当前实验（不写 hash）
    plazaOpen({json.dumps(exp_id)}, false);

    // plazaOpen 内部生成的 "返回列表" 按钮是冗余的（顶部 header 已有返回链接），删掉
    const backBtn = document.getElementById('plazaBack');
    if (backBtn) backBtn.remove();
    // 修复 audio 路径（独立页面 audio 在 ../audio/）
    const audios = document.querySelectorAll('audio[src*="audio/"]');
    audios.forEach(a => {{ a.src = '../' + a.getAttribute('src'); }});
    const links = document.querySelectorAll('a[href*="audio/"]');
    links.forEach(l => {{ l.href = '../' + l.getAttribute('href'); }});
  }} catch (e) {{
    document.getElementById('plazaDetail').innerHTML = '<pre style="color:red; padding:20px;">错误: ' + e.message + '\\n\\n' + e.stack + '</pre>';
  }}

  // 深色模式
  const darkBtn = document.getElementById('darkToggle');
  if (darkBtn) {{
    darkBtn.onclick = () => {{
      document.body.classList.toggle('dark');
      darkBtn.textContent = document.body.classList.contains('dark') ? '☀️ 浅色' : '🌙 深色';
    }};
  }}
}}

if (document.readyState === 'loading') {{
  document.addEventListener('DOMContentLoaded', initPage);
}} else {{
  initPage();
}}
</script>
</body>
</html>
'''

        with open(f'pages/{exp_id}.html', 'w', encoding='utf-8') as f:
            f.write(html)
    except Exception as e:
        errors.append((exp['id'], str(e)))

print(f'\\n✓ 生成 {len(exps) - len(errors)} / {len(exps)} 个页面')
if errors:
    print('错误:')
    for eid, err in errors[:10]:
        print(f'  {eid}: {err}')
