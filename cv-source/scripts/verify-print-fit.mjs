#!/usr/bin/env node
/**
 * Assert every print section's last project title + key last-bullet phrases
 * appear in each generated PDF (classic / nebula / orbit). Also reports A4
 * spare px from the HTML print view.
 *
 * Usage (after build + generate-pdfs):
 *   node scripts/verify-print-fit.mjs
 */
import { execFileSync } from 'node:child_process';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRINT_STYLES, buildModelForStyles } from '../src/print/registry.js';
import content from '../src/content-data.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const styles = PRINT_STYLES.map((s) => s.id);

function pdfText(pdfPath) {
  const script = `
from pypdf import PdfReader
import sys
r = PdfReader(sys.argv[1])
print("\\n".join((p.extract_text() or "") for p in r.pages))
`;
  return execFileSync('python3', ['-c', script, pdfPath], { encoding: 'utf8' });
}

/**
 * Phrases that must survive PDF text extraction for each theme's last entry.
 * Prefer short unique tokens — Chromium PDF text often splits long titles.
 */
function lastLineAnchors(model) {
  const out = [];
  for (const theme of model.themes) {
    const projects = theme.projects || [];
    if (!projects.length) continue;
    const last = projects[projects.length - 1];
    const title = String(last.title || '').trim();
    const bullet = String((last.bullets || [])[0] || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const phrases = [];
    // Distinctive title token (first run of letters/digits, length ≥4)
    const titleTok = title.match(/[A-Za-z0-9][A-Za-z0-9+./-]{3,}/)?.[0];
    if (titleTok) phrases.push(titleTok);
    for (const needle of ['WIESS', 'DevConf', 'CoCo', 'Sample:']) {
      if (bullet.includes(needle)) phrases.push(needle);
    }
    // Always require the section's last title to be recognizable
    if (title.length && title.length <= 40) phrases.push(title);
    out.push({ theme: theme.name, title, phrases: [...new Set(phrases.filter(Boolean))] });
  }
  return out;
}

const themeOrder = [
  'Systems & Virtualization',
  'Languages & Compilers',
  'Tools & Apps',
  'Games & 3D',
  'Research',
  'Communications'
];
const printColors = Object.fromEntries(themeOrder.map((t) => [t, '#123']));
const model = buildModelForStyles(content, themeOrder, printColors);
const anchors = lastLineAnchors(model);

let failed = false;
for (const style of styles) {
  const pdfPath = path.join(root, 'dist', 'pdf', `${style}.pdf`);
  const alt = path.join(root, '..', 'cv', 'pdf', `${style}.pdf`);
  const file = fs.existsSync(pdfPath) ? pdfPath : alt;
  if (!fs.existsSync(file)) {
    console.error(`MISSING PDF: ${pdfPath}`);
    failed = true;
    continue;
  }
  const text = pdfText(file);
  console.log(`\n=== ${style} (${file}) ===`);
  for (const a of anchors) {
    const missing = a.phrases.filter((p) => !text.includes(p));
    if (missing.length) {
      failed = true;
      console.error(`  FAIL ${a.theme} / "${a.title}": missing ${JSON.stringify(missing)}`);
    } else {
      console.log(`  OK   ${a.theme} / "${a.title}"`);
    }
  }
}

async function measureFit() {
  let puppeteer;
  for (const p of ['puppeteer', 'puppeteer-core', '/tmp/node_modules/puppeteer-core']) {
    try {
      puppeteer = (await import(p)).default;
      break;
    } catch {
      /* next */
    }
  }
  if (!puppeteer) {
    console.warn('fit measure skipped (no puppeteer)');
    return {};
  }
  const dist = path.join(root, 'dist');
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.warn('fit measure skipped (no dist)');
    return {};
  }
  const stage = path.join(root, '.print-fit-stage');
  fs.rmSync(stage, { recursive: true, force: true });
  fs.mkdirSync(path.join(stage, 'cv'), { recursive: true });
  for (const name of fs.readdirSync(dist)) {
    fs.cpSync(path.join(dist, name), path.join(stage, 'cv', name), { recursive: true });
  }
  const port = 4195;
  const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: stage,
    stdio: 'ignore'
  });
  await new Promise((r) => setTimeout(r, 700));
  const chrome = ['/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) =>
    fs.existsSync(p)
  );
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu']
  });
  const fits = {};
  try {
    for (const style of styles) {
      const page = await browser.newPage();
      await page.emulateMediaType('print');
      await page.goto(`http://127.0.0.1:${port}/cv/?print=1&style=${style}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
      await page.waitForSelector('#print-view');
      await page.evaluate(async () => {
        document.querySelectorAll('.pv-style-bar').forEach((el) => {
          el.style.display = 'none';
        });
        await document.fonts.ready;
      });
      await new Promise((r) => setTimeout(r, 400));
      fits[style] = await page.evaluate(() => {
        const pageRoot = document.querySelector('.pv-classic, .pv-nebula, .pv-orbit');
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
        const spare = pageH - contentH;
        return {
          pageH: Math.round(pageH * 10) / 10,
          contentH: Math.round(contentH * 10) / 10,
          sparePx: Math.round(spare * 10) / 10,
          overflowPx: Math.round(Math.max(0, -spare) * 10) / 10
        };
      });
      await page.close();
    }
  } finally {
    await browser.close();
    server.kill('SIGTERM');
    fs.rmSync(stage, { recursive: true, force: true });
  }
  return fits;
}

const fits = await measureFit();
console.log('\n=== A4 fit (spare = pageH − contentH) ===');
console.log(JSON.stringify(fits, null, 2));
for (const [style, f] of Object.entries(fits)) {
  if (f.overflowPx > 0) {
    failed = true;
    console.error(`OVERFLOW ${style}: ${f.overflowPx}px`);
  }
}

if (failed) {
  console.error('\nverify-print-fit FAILED');
  process.exit(1);
}
console.log('\nverify-print-fit OK');
