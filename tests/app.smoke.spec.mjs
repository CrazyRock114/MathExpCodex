import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const NATIVE_EXPERIMENT_IDS = [
  'PR01', 'PR02', 'PR03', 'PR04', 'PR05', 'PR06', 'PR07', 'PR08',
  'NT01',
  'SQ01', 'SQ04', 'SQ07', 'SQ09', 'GM01', 'GM03', 'GM04', 'GM07', 'GR01', 'GR02', 'GR07', 'GR09',
  'PB01', 'PB02', 'PB03', 'PB08', 'AL01', 'AL04', 'AL07', 'AL10', 'FR03'
];

test('新应用展示全部 148 个实验并支持搜索', async ({ page }) => {
  await page.goto('/dist/app/index.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.experiment-card')).toHaveCount(148);

  await page.getByLabel('搜索').fill('斐波那契');
  await expect(page.getByText('找到 3 个实验')).toBeVisible();
  await expect(page.locator('.experiment-card')).toHaveCount(3);
});

test('新应用详情路由提供原生五步实验并保留旧实验对照', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR01', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toContainText('投针');
  await expect(page.getByRole('tab')).toHaveCount(5);
  await expect(page.getByRole('link', { name: /打开 PR01 旧版实验/ })).toHaveAttribute(
    'href',
    '../../pages/PR01.html'
  );
});

test('PR01 原生实验能累计投针并显示实验频率', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR01', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /频率/ }).click();
  await page.getByRole('button', { name: '+100 根', exact: true }).click();
  await expect(page.locator('.stage-panel:not([hidden]) .metric-grid > div').filter({ hasText: /^总针数/ }).locator('strong')).toHaveText('100');
});

test('PR02 明确区分有限计算与未解决猜想', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR02', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('tab')).toHaveCount(5, { timeout: 10_000 });
  await expect(page.getByText(/仍未被证明/)).toBeVisible({ timeout: 10_000 });
  await page.getByRole('tab', { name: /奇偶/ }).click();
  await expect(page.getByText(/不能推出长期必下降/)).toBeVisible();
});

test('PR03 原生实验复现 c≤1000 的 158 组计数', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR03', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /枚举/ }).click();
  await expect(page.getByText('158 组', { exact: true })).toBeVisible();
});

test('PR04 纠正点接触相邻规则的错误上界', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR04', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/没有相邻同色；当前只用了两种颜色/)).toBeVisible();
  await page.getByRole('tab', { name: /相邻定义/ }).click();
  await expect(page.getByText(/不存在固定上限/)).toBeVisible();
  await expect(page.locator('.stage-panel:not([hidden]) .metric-grid').getByText('6', { exact: true })).toBeVisible();
});

test('PR05 精确枚举证明 K6 没有可避开染色', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR05', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /枚举/ }).click();
  await expect(page.getByRole('row', { name: /K6 32,768 0 0\.0000%/ })).toBeVisible();
});

test('PR06 准确列出 100 的六个不重复素数分拆', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR06', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/100 恰有 6 个不重复素数分拆/)).toBeVisible();
  await expect(page.locator('.stage-panel:not([hidden]) .number-pair-list li')).toHaveCount(6);
});

test('PR07 准确给出一万以内 205 对孪生素数', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR07', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /计数/ }).click();
  await expect(page.getByText(/不超过 10,000/).locator('..').getByText('205 对', { exact: true })).toBeVisible();
});

test('PR08 展示 96 边形给出的 π 上下界', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR08', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: '96 边', exact: true }).click();
  await expect(page.getByText(/96 边时得到/)).toBeVisible();
});

test('SQ01 明确斐波那契下标与不完整整除命题', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/SQ01', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.stage-panel:not([hidden])').getByText(/采用统一下标 F₀=0、F₁=1/)).toBeVisible({ timeout: 10_000 });
  await page.getByRole('tab', { name: /恒等式/ }).click();
  await expect(page.getByText(/F₂=1 整除所有整数/)).toBeVisible();
});

test('GM01 区分凸多边形扇形切法与一般三角剖分', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GM01', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /凹多边形/ }).click();
  await expect(page.getByText(/简单扇形构造只对凸多边形自动成立/)).toBeVisible();
});

test('GR01 的完整判据包含连通性', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GR01', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /判据/ }).click();
  await expect(page.getByText(/判定要同时满足两件事/)).toBeVisible();
  await expect(page.getByText(/K₅ 每个顶点度数是 4/)).toBeVisible();
});

test('PB01 披露 50.73% 的模型假设', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PB01', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/23 人时概率约 50.73%/)).toBeVisible();
  await page.getByRole('tab', { name: /假设/ }).click();
  await expect(page.getByText(/均匀、独立、365 天/)).toBeVisible();
});

test('AL04 修正 64 盘耗时数量级', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/AL04', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /^A 盘/ }).click();
  await page.getByRole('button', { name: 'C', exact: true }).click();
  await expect(page.getByText('把盘 1 移到 C。', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /规模/ }).click();
  await expect(page.getByText(/约为 138 亿年宇宙年龄的 42 倍/)).toBeVisible();
});

test('SQ07 修正杨辉三角奇数项个数公式', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/SQ07', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /奇偶/ }).click();
  await expect(page.getByText(/正确公式是 2 的 popcount\(n\) 次方/)).toBeVisible();
  await expect(page.locator('.stage-panel:not([hidden]) .correction-note')).toContainText('2 的 popcount(n) 次方');
});

test('GM03 只在固定周长下比较等边最大面积', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GM03', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /最大值/ }).click();
  await expect(page.getByText(/只有在周长固定时才成立/)).toBeVisible();
  await expect(page.getByText(/必须明确“固定周长”/)).toBeVisible();
});

test('GR07 用精确公式替代错误的随机桶碰撞模拟', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GR07', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /碰撞/ }).click();
  await expect(page.locator('.stage-panel:not([hidden]) .probability-meter').getByText('49.68%', { exact: true })).toBeVisible();
  await expect(page.getByText(/检查一个随机桶、写入另一个随机桶/)).toBeVisible();
});

test('PB02 明确主持人协议并删除伪贝叶斯推导', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PB02', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/标准规则必须完整/)).toBeVisible();
  await page.getByRole('button', { name: '选择 1 号门' }).click();
  await expect(page.getByRole('button', { name: /换到/ })).toBeVisible();
  await page.getByRole('tab', { name: /协议/ }).click();
  await expect(page.getByText(/不是完整的贝叶斯计算/)).toBeVisible();
});

test('AL07 修正 4 亿规模和 JavaScript 位运算中点', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/AL07', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /复杂度/ }).click();
  await expect(page.getByText(/4 亿个元素最坏约 29 次/)).toBeVisible();
  await page.getByRole('tab', { name: /中点/ }).click();
  await expect(page.getByText(/不能作为通用“防溢出”写法/)).toBeVisible();
});

test('SQ09 用拼图和代数证明连续三角数恒等式', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/SQ09', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /拼图/ }).click();
  await expect(page.getByText(/= 36 = 6²/)).toBeVisible();
  await page.getByRole('tab', { name: /证据/ }).click();
  await expect(page.getByText(/移除“欧几里得已经证明此恒等式”/)).toBeVisible();
});

test('GM04 修正球内接正方体边长与最优条件', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GM04', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /纠错/ }).click();
  await expect(page.getByText(/2r\/√3/)).toBeVisible();
  await expect(page.getByText(/固定体积时球的表面积最小/)).toBeVisible();
});

test('GR02 区分精确最短路线与最近邻启发式', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GR02', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /规模/ }).click();
  await expect(page.getByText(/候选是 \(n−1\)!\/2/)).toBeVisible();
  await expect(page.getByText(/最近邻也不是“快速近似最优”的保证/)).toBeVisible();
});

test('PB03 先披露二项模型条件再讨论近似', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PB03', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/次数固定、每次只有成功\/失败、各次独立/)).toBeVisible();
  await page.getByRole('tab', { name: /近似/ }).click();
  await expect(page.getByText(/“n 大就像正态”太含糊/)).toBeVisible();
});

test('AL01 用精确有理数找到分数解并修正枚举数量', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/AL01', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /分数/ }).click();
  await expect(page.getByText('精确有理数解', { exact: true })).toBeVisible();
  await expect(page.locator('.stage-panel:not([hidden]) .factory-output')).toContainText('= 24');
  await page.getByRole('tab', { name: /搜索/ }).click();
  await expect(page.getByText(/不能再乘一次 4³/)).toBeVisible();
});

test('SQ04 修正三对括号枚举并明确计数对象', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/SQ04', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /括号/ }).click();
  await expect(page.locator('.stage-panel:not([hidden]) .number-pair-list li')).toHaveCount(5);
  await expect(page.getByText('()()()', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /边界/ }).click();
  await expect(page.getByText(/n 个内部节点的有序满二叉树形状/)).toBeVisible();
});

test('GM07 用合法环面胞腔分解得到 χ=0', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GM07', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /曲面/ }).click();
  await expect(page.getByText('χ = 0', { exact: true })).toBeVisible();
  await expect(page.getByText(/V=1、E=2、F=1/)).toBeVisible();
});

test('GR09 展示度数和与边数的双重计数', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/GR09', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.stage-panel:not([hidden]) output')).toContainText(/度数总和\s*6\s*=\s*2×3/);
  await page.getByRole('tab', { name: /推论/ }).click();
  await expect(page.getByText(/还必须检查所有有边顶点是否连通/)).toBeVisible();
});

test('PB08 区分灵敏度与阳性预测值', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PB08', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /频数/ }).click();
  await expect(page.getByText(/99 \/ \(99 \+ 495\) = 1\/6/)).toBeVisible();
  await expect(page.getByText(/99% 是灵敏度/)).toBeVisible();
});

test('AL10 从 p² 开始筛并修正十亿以内素数个数', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/AL10', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /步骤/ }).click();
  await expect(page.getByText('从 2²=4 开始', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /复杂度/ }).click();
  await expect(page.getByText(/50,847,534 个素数/)).toBeVisible();
});

test('NT01 修正完全数范围、定理归属与当前记录', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/NT01', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /搜索/ }).click();
  await expect(page.getByText(/1 到 1,000 共有 3 个/)).toBeVisible();
  await page.getByRole('tab', { name: /定理/ }).click();
  await expect(page.getByText(/构造方向属于欧几里得，穷尽性方向由欧拉证明/)).toBeVisible();
  await page.getByRole('tab', { name: /前沿/ }).click();
  await expect(page.getByText(/52 个已知梅森素数/)).toBeVisible();
  await expect(page.getByText(/数学下界定理，不是把此前每个奇数逐个暴力测试/)).toBeVisible();
});

test('FR03 区分无限边界、有限区域与不准确现实类比', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/FR03', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /面积/ }).click();
  await expect(page.getByText(/极限为 8\/5 A₀ = 1.6 A₀/)).toBeVisible();
  await page.getByRole('tab', { name: /边界/ }).click();
  await expect(page.getByText(/边界也不会“填满整个圆”/)).toBeVisible();
  await expect(page.getByText(/删除“现代手机天线标配”/)).toBeVisible();
});

for (const width of [360, 390, 768]) {
  test(`新应用在 ${width}px 视口无横向溢出`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/dist/app/index.html', { waitUntil: 'domcontentloaded' });
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test(`三十个原生实验全部阶段在 ${width}px 无横向溢出`, async ({ page }) => {
    test.setTimeout(150_000);
    await page.setViewportSize({ width, height: 900 });
    for (const experimentId of NATIVE_EXPERIMENT_IDS) {
      await page.goto(`/dist/app/index.html#/experiment/${experimentId}`, { waitUntil: 'domcontentloaded' });
      for (let index = 0; index < 5; index += 1) {
        await page.getByRole('tab').nth(index).click();
        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth
        }));
        expect(dimensions.scrollWidth, `${experimentId} 第 ${index + 1} 阶段`).toBeLessThanOrEqual(dimensions.clientWidth);
      }
    }
  });
}

test('新应用目录与详情页无严重无障碍问题', async ({ page }) => {
  for (const path of [
    '/dist/app/index.html',
    '/dist/app/index.html#/experiment/PR01'
  ]) {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#main-content')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    const severeViolations = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious'
    );
    expect(severeViolations, `${path} 存在严重无障碍问题`).toEqual([]);
  }
});

test('三十个原生实验的全部 150 个阶段无严重无障碍问题', async ({ page }) => {
  // 全套回归会与 148 个旧页面并行运行；给 150 次 axe 扫描留出资源竞争余量。
  test.setTimeout(420_000);
  for (const experimentId of NATIVE_EXPERIMENT_IDS) {
    await page.goto(`/dist/app/index.html#/experiment/${experimentId}`, { waitUntil: 'domcontentloaded' });
    const tabs = page.getByRole('tab');
    for (let index = 0; index < 5; index += 1) {
      await tabs.nth(index).click();
      const results = await new AxeBuilder({ page }).analyze();
      const severeViolations = results.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious'
      );
      expect(severeViolations, `${experimentId} 第 ${index + 1} 阶段存在严重无障碍问题`).toEqual([]);
    }
  }
});

test('三十个原生实验切换全部阶段时没有运行时错误', async ({ page }) => {
  test.setTimeout(150_000);
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  for (const experimentId of NATIVE_EXPERIMENT_IDS) {
    await page.goto(`/dist/app/index.html#/experiment/${experimentId}`, { waitUntil: 'domcontentloaded' });
    for (let index = 0; index < 5; index += 1) await page.getByRole('tab').nth(index).click();
  }
  expect(runtimeErrors).toEqual([]);
});
