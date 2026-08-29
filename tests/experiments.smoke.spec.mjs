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

for (const filename of experimentPages) {
  const experimentId = basename(filename, '.html');

  test(`${experimentId} 可加载并展示完整五阶段`, async ({ page }) => {
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
    await page.goto(`/pages/${filename}`, { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#plazaDetail')).toBeVisible();
    await expect(page.locator('.stage-tab')).toHaveCount(5);
    await expect(page.locator('#plazaDetail')).not.toContainText('错误:');

    const interactiveBody = page.locator('#plazaBody');
    await expect(interactiveBody).toHaveCount(1);
    expect((await interactiveBody.innerHTML()).trim(), `${experimentId} 的互动区为空`).not.toBe('');
    expect(runtimeErrors, `${experimentId} 存在运行时错误`).toEqual([]);
  });
}
