#!/usr/bin/env node
/** Capture print-view + HUD screenshots for PR evidence. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = process.argv[2] || path.join(root, 'docs/print-research-hud-links');
fs.mkdirSync(outDir, { recursive: true });

const require = createRequire(import.meta.url);
let puppeteer;
try {
  puppeteer = (await import('puppeteer-core')).default;
} catch {
  puppeteer = require('puppeteer-core');
}

const chrome = ['/usr/local/bin/google-chrome', '/usr/bin/google-chrome'].find((p) => fs.existsSync(p));
const dist = path.join(root, 'dist');
const stage = path.join(root, '.shot-stage');
const port = 4188;

fs.rmSync(stage, { recursive: true, force: true });
fs.mkdirSync(path.join(stage, 'cv'), { recursive: true });
for (const name of fs.readdirSync(dist)) {
  fs.cpSync(path.join(dist, name), path.join(stage, 'cv', name), { recursive: true });
}

const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
  cwd: stage,
  stdio: 'ignore'
});
await new Promise((r) => setTimeout(r, 800));
const base = `http://127.0.0.1:${port}/cv/`;

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none']
});

try {
  // Print styles — full A4 page screenshots
  for (const style of ['nebula', 'orbit', 'classic']) {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
    await page.emulateMediaType('print');
    await page.goto(`${base}?print=1&style=${style}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('#print-view', { timeout: 20000 });
    await new Promise((r) => setTimeout(r, 500));
    const el = await page.$('#print-view');
    const dest = path.join(outDir, `after-print-${style}.png`);
    if (el) await el.screenshot({ path: dest, type: 'png' });
    else await page.screenshot({ path: dest, fullPage: true });
    // Overflow check: compare scrollHeight to A4-ish page box
    const metrics = await page.evaluate(() => {
      const pv = document.querySelector('#print-view');
      const box = pv?.firstElementChild;
      if (!box) return null;
      const cs = getComputedStyle(box);
      return {
        scrollH: box.scrollHeight,
        clientH: box.clientHeight,
        offsetH: box.offsetHeight,
        overflowY: cs.overflowY
      };
    });
    console.log(style, 'saved', dest, metrics);
    await page.close();
  }

  // HUD: open Itanium native bring-up via hash deep link
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(`${base}#itanium-native-bringup__0`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => {
    const s = document.querySelector('[data-hud="section"]');
    return s && s.querySelector('a');
  }, { timeout: 45000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 4000));
  const sectionHtml = await page.evaluate(() => {
    const s = document.querySelector('[data-hud="section"]');
    return s ? { html: s.innerHTML, text: s.textContent } : null;
  });
  console.log('HUD section:', sectionHtml);
  const dest = path.join(outDir, 'after-hud-itanium-section.png');
  await page.screenshot({ path: dest, type: 'png' });
  console.log('saved', dest);
  await page.close();

  // Before: live production print (nebula) for side-by-side
  try {
    const before = await browser.newPage();
    await before.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
    await before.emulateMediaType('print');
    await before.goto('https://c3d.github.io/cv/?print=1&style=nebula', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    await before.waitForSelector('#print-view', { timeout: 20000 });
    await new Promise((r) => setTimeout(r, 500));
    const el = await before.$('#print-view');
    const bdest = path.join(outDir, 'before-print-nebula.png');
    if (el) await el.screenshot({ path: bdest, type: 'png' });
    else await before.screenshot({ path: bdest, fullPage: true });
    console.log('saved', bdest);
    await before.close();
  } catch (e) {
    console.warn('before capture skipped:', e.message);
  }
} finally {
  await browser.close();
  server.kill('SIGTERM');
  fs.rmSync(stage, { recursive: true, force: true });
}
