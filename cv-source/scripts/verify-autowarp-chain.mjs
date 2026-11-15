#!/usr/bin/env node
/**
 * Headless check: auto-warp continues for ≥3 jumps with no user input.
 * Shortens idle/interval via window.__warpTiming.setForTest.
 */
import { spawn } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const stage = join(root, '.autowarp-test-stage');

async function loadPuppeteer() {
  for (const p of ['puppeteer', 'puppeteer-core', '/tmp/node_modules/puppeteer-core']) {
    try {
      return (await import(p)).default;
    } catch {
      /* try next */
    }
  }
  throw new Error('puppeteer not found');
}

if (!readdirSync(dist).includes('index.html')) {
  console.error('dist/ missing — run npm run build first');
  process.exit(1);
}

rmSync(stage, { recursive: true, force: true });
mkdirSync(join(stage, 'cv'), { recursive: true });
for (const name of readdirSync(dist)) {
  cpSync(join(dist, name), join(stage, 'cv', name), { recursive: true });
}
const port = 4188;
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
  cwd: stage,
  stdio: 'ignore'
});
await new Promise((r) => setTimeout(r, 700));

const puppeteer = await loadPuppeteer();
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu']
});

let failed = false;
try {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => document.getElementById('loading')?.classList.contains('hidden'), {
    timeout: 60000
  });
  await page.waitForFunction(() => typeof window.enterAutoMode === 'function', { timeout: 30000 });

  const result = await page.evaluate(async () => {
    window.__warpTiming.setForTest({
      overviewMs: 200,
      engagedMs: 60_000,
      // After each landing, scheduleNextWarp uses this; keep short but > 0.
      intervalMs: 500
    });
    window.enterAutoMode();

    const jumps = [];
    const t0 = performance.now();
    while (jumps.length < 3 && performance.now() - t0 < 40000) {
      const auto = document.body.classList.contains('auto-warp');
      const hash = location.hash.replace(/^#/, '');
      if (!auto) {
        return { ok: false, reason: 'auto-warp exited early', jumps, ms: performance.now() - t0 };
      }
      if (hash && (jumps.length === 0 || jumps[jumps.length - 1] !== hash)) {
        jumps.push(hash);
      }
      await new Promise((r) => setTimeout(r, 200));
    }

    if (jumps.length < 3) {
      return { ok: false, reason: 'fewer than 3 jumps', jumps, ms: performance.now() - t0 };
    }

    // Real pointer must cancel the tour.
    document.getElementById('canvas-container')?.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 40, clientY: 40 })
    );
    await new Promise((r) => setTimeout(r, 50));
    const autoAfter = document.body.classList.contains('auto-warp');
    if (autoAfter) {
      return { ok: false, reason: 'pointer did not exit auto-warp', jumps, ms: performance.now() - t0 };
    }

    return {
      ok: true,
      jumps,
      ms: performance.now() - t0,
      stillAutoAfterPointer: autoAfter
    };
  });

  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) {
    failed = true;
    console.error('FAIL:', result.reason);
  } else {
    console.log(`OK: ${result.jumps.length} consecutive auto-warp jumps in ${Math.round(result.ms)}ms`);
  }

  await page.close();
} catch (err) {
  failed = true;
  console.error(err);
} finally {
  await browser.close();
  server.kill('SIGTERM');
  rmSync(stage, { recursive: true, force: true });
}

process.exit(failed ? 1 : 0);
