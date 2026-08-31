import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // 三个测试文件并行；文件内顺序执行，避免多个 2.5MB 旧壳同时解析造成首屏饥饿。
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 4,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never' }]] : 'line',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:4173/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
