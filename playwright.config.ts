import { defineConfig, devices } from '@playwright/test';
import { URL_BASE } from './data/urls';

/** Fora do CI: gera print ao fim de cada teste e vídeo (resolução moderada = arquivos menores). */
const evidenciasSempre = !process.env.CI;

/**
 * Configuração global do Playwright para o Saucedemo.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],
  use: {
    baseURL: URL_BASE,
    trace: 'on-first-retry',
    // Prints: após cada teste (local); em CI só em falha.
    screenshot: evidenciasSempre ? 'on' : 'only-on-failure',
    // Vídeo curto por teste (duração = tempo do cenário; resolução reduz tamanho do arquivo).
    video: evidenciasSempre
      ? { mode: 'on', size: { width: 960, height: 540 } }
      : 'retain-on-failure',
    locale: 'pt-BR',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
