import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
    '../pages/PR01.html'
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
  await expect(page.getByText(/仍未被证明/)).toBeVisible();
  await page.getByRole('tab', { name: /奇偶/ }).click();
  await expect(page.getByText(/不能推出长期必下降/)).toBeVisible();
});

test('PR03 原生实验复现 c≤1000 的 158 组计数', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR03', { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /枚举/ }).click();
  await expect(page.getByText('158 组', { exact: true })).toBeVisible();
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

  test(`三个原生实验全部阶段在 ${width}px 无横向溢出`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const experimentId of ['PR01', 'PR02', 'PR03']) {
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

test('三个原生实验的全部 15 个阶段无严重无障碍问题', async ({ page }) => {
  for (const experimentId of ['PR01', 'PR02', 'PR03']) {
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

test('三个原生实验切换全部阶段时没有运行时错误', async ({ page }) => {
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  for (const experimentId of ['PR01', 'PR02', 'PR03']) {
    await page.goto(`/dist/app/index.html#/experiment/${experimentId}`, { waitUntil: 'domcontentloaded' });
    for (let index = 0; index < 5; index += 1) await page.getByRole('tab').nth(index).click();
  }
  expect(runtimeErrors).toEqual([]);
});
