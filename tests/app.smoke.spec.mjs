import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('新应用展示全部 148 个实验并支持搜索', async ({ page }) => {
  await page.goto('/dist/app/index.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.experiment-card')).toHaveCount(148);

  await page.getByLabel('搜索').fill('斐波那契');
  await expect(page.getByText('找到 3 个实验')).toBeVisible();
  await expect(page.locator('.experiment-card')).toHaveCount(3);
});

test('新应用详情路由保留旧实验入口', async ({ page }) => {
  await page.goto('/dist/app/index.html#/experiment/PR01', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toContainText('投针');
  await expect(page.getByRole('link', { name: /打开 PR01 互动实验/ })).toHaveAttribute(
    'href',
    '../pages/PR01.html'
  );
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
