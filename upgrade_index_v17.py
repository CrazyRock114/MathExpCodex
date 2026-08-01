#!/usr/bin/env python3
"""
v17 首页改造：
1. 在 header 后加 Mavis 引导卡（带语音播放）
2. 在 plaza section 顶部加 3 类 type 切换 tab
3. 改 plazaRenderCats + plazaRenderGrid 支持 type 过滤
4. 卡片加 type 标签（彩色）

type 三类：
- axiom_theorem (120): 基础公理/定理可视化（蓝色 #2563eb）
- conjecture_open (8): 尚未完全证明的猜想（橙色 #f59e0b）
- conjecture_proven (20): 已被证明的猜想（绿色 #10b981）
"""
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ===== 改动 1: header 之后加 Mavis 引导卡 =====
MAVIS_HERO = '''
<!-- ===== Mavis 引导卡 (v17) ===== -->
<div class="mavis-hero card">
  <div class="mavis-avatar">🎓</div>
  <div class="mavis-content">
    <h2 style="margin: 0 0 8px; color: var(--ink); font-size: 20px;">
      同学们好！我是 <span style="color: var(--accent);">Mavis</span>，你们的数学实验小助手 👋
    </h2>
    <p style="margin: 0 0 12px; color: var(--muted); font-size: 14px; line-height: 1.6;">
      这里有 <strong>148 个数学小实验</strong>，分成三类：<br>
      <span style="color: #2563eb;">●</span> <strong>基础公理/定理</strong>（120 个）— 加法、勾股、圆周率，看经典结论；<br>
      <span style="color: #f59e0b;">●</span> <strong>尚未证明的猜想</strong>（8 个）— 黎曼、哥德巴赫、BSD，数学家还在努力；<br>
      <span style="color: #10b981;">●</span> <strong>已被证明的猜想</strong>（20 个）— 庞加莱、费马大定理、王虹 2025 挂谷猜想、邓煜 2025 希尔伯特第六问题。
    </p>
    <div class="mavis-actions">
      <button id="playMavisIntro" class="primary">▶ 听 Mavis 介绍（1分30秒）</button>
      <button id="mavisSkip" class="ghost small">跳过</button>
    </div>
    <audio id="mavisIntroAudio" src="audio/mavis_intro.mp3" preload="metadata"></audio>
    <div id="mavisProgress" style="margin-top: 8px; font-size: 12px; color: var(--muted); display: none;">
      <span id="mavisTime">0:00</span> / <span id="mavisDuration">0:00</span>
      <button id="mavisPause" class="ghost small" style="margin-left: 12px;">⏸ 暂停</button>
    </div>
  </div>
</div>
'''

# 在 <nav class="tabs"> 前插入
old = '<nav class="tabs">'
new = MAVIS_HERO + old
if old in html:
    html = html.replace(old, new, 1)
    print('✅ 改动 1: Mavis 引导卡已插入')
else:
    print('❌ 改动 1 失败: 找不到 <nav class="tabs">')

# ===== 改动 2: 加 Mavis Hero CSS =====
MAVIS_HERO_CSS = '''
/* ===== Mavis 引导卡 v17 ===== */
.mavis-hero {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin: 16px 24px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #eff6ff 0%, #fef3c7 100%);
  border: 2px solid var(--accent);
  border-radius: 14px;
  position: relative;
}
body.dark .mavis-hero { background: linear-gradient(135deg, #1e3a8a33 0%, #78350f33 100%); }
.mavis-avatar {
  font-size: 56px;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
.mavis-content { flex: 1; min-width: 0; }
.mavis-actions { display: flex; gap: 8px; align-items: center; }
#mavisProgress { display: flex; align-items: center; gap: 8px; }
#playMavisIntro { font-size: 14px; }
'''

# 插入到 </style> 之前
old = '</style>'
if old in html:
    html = html.replace(old, MAVIS_HERO_CSS + '\n' + old, 1)
    print('✅ 改动 2: Mavis Hero CSS 已插入')
else:
    print('❌ 改动 2 失败')

# ===== 改动 3: plaza section 加 type 切换 tab =====
TYPE_TABS_HTML = '''
    <!-- v17: 三类 type 切换 -->
    <div class="type-tabs" id="typeTabs" style="margin-bottom: 16px;">
      <button class="type-tab active" data-type="all" style="background: var(--ink); color: white; border-color: var(--ink);">
        全部 <span class="num">148</span>
      </button>
      <button class="type-tab" data-type="axiom_theorem" style="border-color: #2563eb; color: #2563eb;">
        📘 基础公理/定理 <span class="num">120</span>
      </button>
      <button class="type-tab" data-type="conjecture_open" style="border-color: #f59e0b; color: #f59e0b;">
        🔍 尚未证明的猜想 <span class="num">8</span>
      </button>
      <button class="type-tab" data-type="conjecture_proven" style="border-color: #10b981; color: #10b981;">
        🏆 已被证明的猜想 <span class="num">20</span>
      </button>
    </div>
    <!-- v17: type 介绍卡（动态显示） -->
    <div id="typeIntroCard" class="card" style="margin-bottom: 16px; padding: 12px 16px; background: #f0f9ff; border-left: 4px solid var(--accent); display: none;">
      <p id="typeIntroText" style="margin: 0; font-size: 14px; line-height: 1.6; color: var(--ink);"></p>
    </div>
'''

# 在 <div class="row" id="plazaCats" 前插入
old = '<div class="row" id="plazaCats" style="margin-bottom: 16px; gap: 6px;"></div>'
new = TYPE_TABS_HTML + '\n    ' + old
if old in html:
    html = html.replace(old, new, 1)
    print('✅ 改动 3: type tabs 已插入')
else:
    print('❌ 改动 3 失败')

# ===== 改动 4: type tabs CSS =====
TYPE_TABS_CSS = '''
/* ===== v17 type 切换 tabs ===== */
.type-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.type-tab {
  padding: 8px 14px;
  border: 2px solid;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.type-tab:hover { transform: translateY(-1px); box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.type-tab .num {
  display: inline-block;
  background: rgba(0,0,0,0.08);
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-left: 4px;
}
.type-tab.active .num { background: rgba(255,255,255,0.25); }
body.dark .type-tab { background: #1e293b; }
body.dark #typeIntroCard { background: #1e3a8a44 !important; }
'''

# 插入 Mavis Hero CSS 后
old = MAVIS_HERO_CSS + '\n</style>'
new = MAVIS_HERO_CSS + TYPE_TABS_CSS + '\n</style>'
if old in html:
    html = html.replace(old, new, 1)
    print('✅ 改动 4: type tabs CSS 已插入')
else:
    print('❌ 改动 4 失败')

# ===== 改动 5: 改 plazaRenderCats + plazaRenderGrid + 加 type 过滤 =====
# 替换原 plazaRenderCats
old = '''let plazaCurrentCat = '全部';
let plazaCurrentExp = null;'''

new = '''let plazaCurrentCat = '全部';
let plazaCurrentType = 'all';  // v17: type 过滤 all/axiom_theorem/conjecture_open/conjecture_proven
let plazaCurrentExp = null;

const TYPE_INTRO = {
  'axiom_theorem': '📘 <strong>基础公理/定理可视化</strong>：从小学加法、勾股定理，到圆周率、素数、群论——这些是数学家已经证明好的"基本工具"，在这里被做成可以亲手玩的小游戏。',
  'conjecture_open': '🔍 <strong>尚未证明的猜想</strong>：黎曼 ζ、哥德巴赫、BSD、孪生素数……这些是数学家们还没攻下的堡垒，每一个都悬赏百万美金。看看这些"还没解开的谜"，感受数学未解之谜的魅力。',
  'conjecture_proven': '🏆 <strong>已被证明的猜想</strong>：从 1995 年怀尔斯证明费马大定理，到 2003 年佩雷尔曼证明庞加莱猜想，再到 <strong>2025 年中国数学家王虹完整证明 3D 挂谷猜想</strong>，<strong>邓煜完整证明狭义希尔伯特第六问题</strong>——这些是数学史上的伟大时刻，每一步都改写了人类认知。'
};
'''

if old in html:
    html = html.replace(old, new, 1)
    print('✅ 改动 5a: type 变量 + TYPE_INTRO 已加')
else:
    print('❌ 改动 5a 失败')

# 替换 plazaRenderGrid，加 type 过滤 + type 标签
old = '''function plazaRenderGrid() {
  const q = plazaSearch.value.toLowerCase();
  const filtered = EXPERIMENTS.filter(e => {
    if (plazaCurrentCat !== '全部' && e.cat !== plazaCurrentCat) return false;
    if (q && !(e.id.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) || e.intro.toLowerCase().includes(q) || e.cat.toLowerCase().includes(q))) return false;
    return true;
  });
  plazaGrid.innerHTML = filtered.map(e =>
    `<a class="plaza-card" href="pages/${e.id}.html" data-id="${e.id}" style="text-decoration: none; color: inherit; display: block;">
      <span class="cat-tag ${PLAZA_CATEGORIES[e.cat]}">${e.cat}</span>
      <span class="id-tag">${e.id}</span>
      <div class="title">${e.title}</div>
      <p class="intro">${e.intro}</p>
    </a>`
  ).join('');
  const cnt = document.getElementById('plazaCount');
  if (cnt) cnt.textContent = `共 ${EXPERIMENTS.length} 个实验（显示 ${filtered.length}）`;
}'''

new = '''function plazaRenderGrid() {
  const q = plazaSearch.value.toLowerCase();
  const filtered = EXPERIMENTS.filter(e => {
    if (plazaCurrentCat !== '全部' && e.cat !== plazaCurrentCat) return false;
    if (plazaCurrentType !== 'all' && e.type !== plazaCurrentType) return false;  // v17
    if (q && !(e.id.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) || e.intro.toLowerCase().includes(q) || e.cat.toLowerCase().includes(q))) return false;
    return true;
  });
  plazaGrid.innerHTML = filtered.map(e => {
    // v17: type 标签
    const typeMeta = e.type === 'conjecture_proven' ? {color:'#10b981', icon:'🏆', label:'已证猜想'}
      : e.type === 'conjecture_open' ? {color:'#f59e0b', icon:'🔍', label:'未解猜想'}
      : {color:'#2563eb', icon:'📘', label:'定理'};
    return `<a class="plaza-card" href="pages/${e.id}.html" data-id="${e.id}" style="text-decoration: none; color: inherit; display: block;">
      <span class="cat-tag ${PLAZA_CATEGORIES[e.cat]}">${e.cat}</span>
      <span class="type-tag" style="position:absolute; top:8px; right:8px; background:${typeMeta.color}; color:white; padding:2px 8px; border-radius:10px; font-size:11px;">${typeMeta.icon} ${typeMeta.label}</span>
      <span class="id-tag">${e.id}</span>
      <div class="title">${e.title}</div>
      <p class="intro">${e.intro}</p>
    </a>`;
  }).join('');
  const cnt = document.getElementById('plazaCount');
  if (cnt) cnt.textContent = `共 ${EXPERIMENTS.length} 个实验（显示 ${filtered.length}）`;
}

// v17: type tab 切换
document.querySelectorAll('.type-tab').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.type-tab').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'white';
      b.style.color = b.style.borderColor;
    });
    btn.classList.add('active');
    btn.style.background = btn.style.borderColor;
    btn.style.color = 'white';
    plazaCurrentType = btn.dataset.type;
    // 显示/隐藏 type 介绍卡
    const card = document.getElementById('typeIntroCard');
    const txt = document.getElementById('typeIntroText');
    if (plazaCurrentType === 'all') {
      card.style.display = 'none';
    } else {
      card.style.display = 'block';
      txt.innerHTML = TYPE_INTRO[plazaCurrentType] || '';
    }
    plazaRenderGrid();
  };
});'''

if old in html:
    html = html.replace(old, new, 1)
    print('✅ 改动 5b: plazaRenderGrid 加 type 过滤 + type tab 切换')
else:
    print('❌ 改动 5b 失败')

# ===== 改动 6: Mavis 引导卡 JS 播放控制 =====
MAVIS_JS = '''
// ===== Mavis 引导卡播放控制 (v17) =====
(function() {
  const audio = document.getElementById('mavisIntroAudio');
  const playBtn = document.getElementById('playMavisIntro');
  const skipBtn = document.getElementById('mavisSkip');
  const pauseBtn = document.getElementById('mavisPause');
  const progress = document.getElementById('mavisProgress');
  const timeEl = document.getElementById('mavisTime');
  const durEl = document.getElementById('mavisDuration');
  if (!audio) return;

  function fmt(s) { const m = Math.floor(s/60); const sec = Math.floor(s%60); return m + ':' + (sec<10?'0':'') + sec; }

  playBtn.onclick = () => {
    audio.play();
    progress.style.display = 'block';
    playBtn.style.display = 'none';
  };
  pauseBtn.onclick = () => {
    if (audio.paused) { audio.play(); pauseBtn.textContent = '⏸ 暂停'; }
    else { audio.pause(); pauseBtn.textContent = '▶ 继续'; }
  };
  skipBtn.onclick = () => {
    audio.pause();
    progress.style.display = 'none';
    playBtn.style.display = 'inline-block';
  };
  audio.addEventListener('loadedmetadata', () => { durEl.textContent = fmt(audio.duration); });
  audio.addEventListener('timeupdate', () => { timeEl.textContent = fmt(audio.currentTime); });
  audio.addEventListener('ended', () => {
    progress.style.display = 'none';
    playBtn.style.display = 'inline-block';
    playBtn.textContent = '🔁 再听一次';
  });
})();
'''

# 插入到 EXPERIMENTS 数组之前
old = '/* ===================== 广场渲染 ===================== */\nconst plazaGrid = document.getElementById(\'plazaGrid\');'
new = MAVIS_JS + '\n' + old
if old in html:
    html = html.replace(old, new, 1)
    print('✅ 改动 6: Mavis 引导卡 JS 已加')
else:
    print('❌ 改动 6 失败')

# 写回
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print()
print('✅ 全部改动完成，已写入 index.html')
