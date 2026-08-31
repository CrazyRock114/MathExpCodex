import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const pagesDir = join(process.cwd(), 'pages');
const experimentPages = readdirSync(pagesDir)
  .filter((name) => name.endsWith('.html'))
  .sort();

test('仓库包含 148 个独立实验页面', () => {
  expect(experimentPages).toHaveLength(148);
});

test('共享旧壳不请求缺失音频', async ({ page }) => {
  const mediaRequests = [];
  page.on('request', (request) => {
    if (/\.(?:mp3|wav|m4a|ogg)(?:\?.*)?$/i.test(request.url())) mediaRequests.push(request.url());
  });
  await page.goto('/dist/legacy.html#NT06', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/dist\/legacy\.html#NT06$/);
  await expect(page.getByText('音频二进制未随源码分发').first()).toBeVisible();
  await expect(page.locator('audio[src]')).toHaveCount(0);
  expect(mediaRequests).toEqual([]);
});

test('NT19 使用 Lucas–Lehmer 判据并展示当前梅森素数纪录', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/dist/legacy.html#NT19', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/dist\/legacy\.html#NT19$/, { timeout: 10_000 });
  await expect(page.locator('#plazaDetail')).toBeVisible({ timeout: 15_000 });

  await expect(page.locator('.stage-panel').first()).toContainText('截至 2026-08 已知 52 个');
  await expect(page.locator('.stage-panel').first()).toContainText('41,024,320 位');

  await page.locator('.stage-tab').nth(1).click();
  await page.locator('#nt19s2-p').fill('31');
  await expect(page.locator('#nt19s2-result')).toContainText('524287');
  await expect(page.locator('#nt19s2-result')).not.toContainText('2047');
  await expect(page.locator('#nt19s2-result')).not.toContainText('536870911');

  await page.locator('#nt19_p').fill('31');
  await page.getByRole('button', { name: '用 Lucas–Lehmer 检验' }).click();
  await expect(page.locator('#nt19_out')).toContainText('2147483647');
  await expect(page.locator('#nt19_out')).not.toContainText('536870911');
});

for (const filename of experimentPages) {
  const experimentId = basename(filename, '.html');

  test(`${experimentId} 可加载并展示完整五阶段`, async ({ page }) => {
    // 原生阶段的全量 axe 扫描会与旧页并行；给单页留出资源竞争余量。
    // 等待共享旧壳完成解析，避免把 CPU 争用误判成缺页。
    test.setTimeout(60_000);
    const runtimeErrors = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('console', (message) => {
      const text = message.text();
      // 资源层网络错误由独立的依赖/媒体测试负责；这里聚焦会破坏页面逻辑的 JS 错误。
      if (message.type() === 'error' && !/^Failed to load resource: net::ERR_/.test(text)) {
        runtimeErrors.push(text);
      }
    });

    // 冒烟测试不下载数百 MB 音频；返回空媒体响应，避免把预期的拦截记作控制台错误。
    await page.route(/\.(?:mp3|wav|m4a)(?:\?.*)?$/i, (route) =>
      route.fulfill({ status: 204, contentType: 'audio/mpeg', body: '' })
    );
    await page.goto(`/dist/legacy.html#${experimentId}`, { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(new RegExp(`/dist/legacy\\.html#${experimentId}$`), { timeout: 10_000 });
    await expect(page.locator('#plazaDetail')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.stage-tab')).toHaveCount(5);
    await expect(page.locator('#plazaDetail')).not.toContainText('错误:');

    const interactiveBody = page.locator('#plazaBody');
    await expect(interactiveBody).toHaveCount(1);
    expect((await interactiveBody.innerHTML()).trim(), `${experimentId} 的互动区为空`).not.toBe('');
    expect(runtimeErrors, `${experimentId} 存在运行时错误`).toEqual([]);
  });
}
