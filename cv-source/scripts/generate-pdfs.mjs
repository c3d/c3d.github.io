#!/usr/bin/env node
/**
 * Build A4 PDFs for each print style into dist/pdf/<style>.pdf (copied to /cv/pdf/).
 * Uses Puppeteer when available; otherwise prints a clear skip message.
 *
 * Usage (after vite build + static server, or with file:// via preview):
 *   node scripts/generate-pdfs.mjs [baseUrl]
 * Default baseUrl: http://127.0.0.1:4173/cv/
 */
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const styles = ['nebula', 'orbit', 'classic'];

async function loadPuppeteer() {
  try {
    return (await import('puppeteer')).default;
  } catch {
    try {
      return (await import('puppeteer-core')).default;
    } catch {
      const require = createRequire(import.meta.url);
      for (const p of ['puppeteer', 'puppeteer-core', '/tmp/node_modules/puppeteer-core']) {
        try { return require(p); } catch { /* continue */ }
      }
    }
  }
  return null;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser'
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p)) || null;
}

async function withServer(distDir, fn) {
  // Vite base is /cv/ — stage dist under a /cv path for correct asset URLs
  const port = 4179;
  const stage = path.join(root, '.pdf-stage');
  fs.rmSync(stage, { recursive: true, force: true });
  fs.mkdirSync(path.join(stage, 'cv'), { recursive: true });
  for (const name of fs.readdirSync(distDir)) {
    fs.cpSync(path.join(distDir, name), path.join(stage, 'cv', name), { recursive: true });
  }
  const base = `http://127.0.0.1:${port}/cv/`;
  const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: stage,
    stdio: 'ignore'
  });
  await new Promise((r) => setTimeout(r, 700));
  try {
    return await fn(base);
  } finally {
    server.kill('SIGTERM');
    fs.rmSync(stage, { recursive: true, force: true });
  }
}

async function main() {
  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    console.warn('generate-pdfs: puppeteer not installed — skipping PDF generation');
    console.warn('Install with: npm i -D puppeteer   (or set up Chrome + puppeteer-core)');
    process.exit(0);
  }

  const dist = path.join(root, 'dist');
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('generate-pdfs: dist/ missing — run vite build first');
    process.exit(1);
  }

  const outDir = path.join(dist, 'pdf');
  fs.mkdirSync(outDir, { recursive: true });

  const chrome = findChrome();
  const launchOpts = chrome
    ? { executablePath: chrome, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] }
    : { headless: 'new', args: ['--no-sandbox', '--disable-gpu'] };

  await withServer(dist, async (base) => {
    const browser = await puppeteer.launch(launchOpts);
    try {
      for (const style of styles) {
        const page = await browser.newPage();
        const url = `${base}?print=1&style=${style}`;
        await page.emulateMediaType('print');
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.waitForSelector('#print-view', { timeout: 15000 });
        // Wait for fonts + images (logo, QR); hide screen-only chrome
        await page.evaluate(async () => {
          document.querySelectorAll('.no-print, .pv-style-bar').forEach((el) => {
            el.style.display = 'none';
          });
          await document.fonts.ready;
          const imgs = [...document.images];
          await Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((res) => {
            img.onload = img.onerror = res;
          }))));
        });
        await new Promise((r) => setTimeout(r, 500));
        const metrics = await page.evaluate(() => {
          const el = document.getElementById('print-view');
          const h = el?.scrollHeight || 0;
          return { heightPx: h, approxPages: h / 1123 };
        });
        // If content spills slightly past one A4, scale the print root to fit
        if (metrics.heightPx > 1120) {
          const scale = Math.min(0.98, 1100 / metrics.heightPx);
          await page.addStyleTag({
            content: `#print-view{transform:scale(${scale});transform-origin:top left;width:${100 / scale}% !important;}`
          });
          await new Promise((r) => setTimeout(r, 200));
        }
        const out = path.join(outDir, `${style}.pdf`);
        await page.pdf({
          path: out,
          format: 'A4',
          printBackground: true,
          preferCSSPageSize: true,
          margin: { top: '0', right: '0', bottom: '0', left: '0' },
          pageRanges: '1'
        });
        console.log(`✓ ${style}.pdf  (screen height ${Math.round(metrics.heightPx)}px → forced page 1)`);
        await page.close();
      }
    } finally {
      await browser.close();
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
