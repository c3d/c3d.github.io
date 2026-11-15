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
        // Wait for fonts + images (logo, QR); hide screen-only chrome.
        // Also wait for header SVG→PNG bake (Chromium PDF washes SVG stop-opacity /
        // rgba strokes; rasterize-decor.js matches the web print view).
        await page.evaluate(async () => {
          document.querySelectorAll('.no-print, .pv-style-bar').forEach((el) => {
            el.style.display = 'none';
          });
          await document.fonts.ready;
          if (typeof window.__printDecorReady === 'function') {
            await window.__printDecorReady();
          }
          const imgs = [...document.images];
          await Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((res) => {
            img.onload = img.onerror = res;
          }))));
        });
        // Belt-and-suspenders for single-page A4:
        // - theme break-inside:avoid ejected Communications entirely (#99)
        // - space-between packed the last bullet to the edge so link text
        //   fragmented onto discarded page 2 (last-line fix)
        await page.addStyleTag({
          content: `
            .pvc-theme,.pvn-theme,.pvo-theme{break-inside:auto!important;page-break-inside:auto!important;}
            .pvn-main,.pvo-main{justify-content:flex-start!important;}
            .pvn-project li,.pvo-project li,.pvc-project li,a.pv-deep{break-inside:avoid!important;page-break-inside:avoid!important;}
          `
        });
        await new Promise((r) => setTimeout(r, 500));
        // If bake did not run (older bundle), screenshot decorative layers here.
        await page.evaluate(async () => {
          async function bake(sel, bg) {
            const space = document.querySelector(sel);
            if (!space || space.dataset.rasterized === '1') return;
            const svg = space.querySelector('svg');
            if (!svg) return;
            const rect = space.getBoundingClientRect();
            const cssW = Math.max(1, rect.width || 1);
            const cssH = Math.max(1, rect.height || 1);
            const scale = Math.min(3, Math.max(2, window.devicePixelRatio || 2));
            const clone = svg.cloneNode(true);
            clone.setAttribute('width', String(cssW));
            clone.setAttribute('height', String(cssH));
            if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`;
            const img = new Image();
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(cssW * scale);
            canvas.height = Math.round(cssH * scale);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            space.innerHTML = `<img alt="" aria-hidden="true" src="${canvas.toDataURL('image/png')}" style="width:100%;height:100%;display:block;object-fit:cover">`;
            space.dataset.rasterized = '1';
          }
          await bake('.pvn-space', '#050b18');
          await bake('.pvo-header-wave', '#0a1628');
        });
        // Measure intrinsic content height (unconstrained), not the fixed 297mm box.
        const metrics = await page.evaluate(() => {
          const pageRoot = document.querySelector('.pv-classic, .pv-nebula, .pv-orbit');
          if (!pageRoot) return { heightPx: 0, pageH: 0, sparePx: 0 };
          const pageH = pageRoot.getBoundingClientRect().height;
          const main = pageRoot.querySelector('.pvn-main, .pvo-main');
          const saved = {
            h: pageRoot.style.height,
            mh: pageRoot.style.maxHeight,
            mn: pageRoot.style.minHeight,
            o: pageRoot.style.overflow,
            mj: main?.style.justifyContent,
            mf: main?.style.flex
          };
          pageRoot.style.height = 'auto';
          pageRoot.style.maxHeight = 'none';
          pageRoot.style.minHeight = '0';
          pageRoot.style.overflow = 'visible';
          if (main) {
            main.style.justifyContent = 'flex-start';
            main.style.flex = '0 0 auto';
          }
          const contentH = Math.max(pageRoot.getBoundingClientRect().height, pageRoot.scrollHeight);
          Object.assign(pageRoot.style, {
            height: saved.h,
            maxHeight: saved.mh,
            minHeight: saved.mn,
            overflow: saved.o
          });
          if (main) {
            main.style.justifyContent = saved.mj || '';
            main.style.flex = saved.mf || '';
          }
          return {
            heightPx: contentH,
            pageH,
            sparePx: pageH - contentH,
            approxPages: contentH / 1123
          };
        });
        // Scale only on real overflow (spare negative) — not when box is merely min-height:297mm.
        if (metrics.sparePx < -1) {
          const scale = Math.min(0.98, (metrics.pageH - 8) / metrics.heightPx);
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
