import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route(/\.(?:mp3|wav|m4a)(?:\?.*)?$/i, (route) =>
    route.fulfill({ status: 204, contentType: 'audio/mpeg', body: '' })
  );
});

test('首页分类数量与数据一致', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.plaza-card')).toHaveCount(148);

  const counts = await page.locator('.type-tab .num').allTextContents();
  expect(counts.map((value) => Number(value))).toEqual([148, 119, 9, 20]);
});

for (const width of [360, 390, 768]) {
  test(`首页在 ${width}px 视口无横向溢出`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}
