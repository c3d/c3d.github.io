#!/usr/bin/env node
/**
 * Scripted QA: load the CV, click every visible label via assertLabelClicks(),
 * assert HUD project title matches the label's project/theme target.
 *
 * Usage:
 *   node scripts/test-label-clicks.mjs [baseUrl]
 * Default baseUrl: http://127.0.0.1:8765/cv/
 */
import { createRequire } from 'module';
import { pathToFileURL } from 'url';

async function loadPuppeteer() {
  try {
    return (await import('puppeteer-core')).default;
  } catch {
    // Fallbacks for agent VMs that install puppeteer outside cv-source
    const require = createRequire(import.meta.url);
    for (const p of ['/tmp/node_modules/puppeteer-core', 'puppeteer-core']) {
      try {
        return require(p);
      } catch { /* continue */ }
    }
    throw new Error('puppeteer-core not found; npm i -D puppeteer-core or set NODE_PATH');
  }
}

const puppeteer = await loadPuppeteer();

const BASE = process.argv[2] || 'http://127.0.0.1:8765/cv/';
const CDP = process.env.CHROME_CDP || 'http://127.0.0.1:9467';

async function main() {
  const browser = await puppeteer.connect({
    browserURL: CDP,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE}?labeltest=${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForFunction(() => window.stars?.length > 0 && typeof window.assertLabelClicks === 'function', {
    timeout: 15000
  });
  // Settle overview framing + labels
  await new Promise((r) => setTimeout(r, 2500));

  const report = await page.evaluate(async () => window.assertLabelClicks());
  console.log(JSON.stringify(report, null, 2));

  await page.close();
  await browser.disconnect();

  if (!report.ok) {
    console.error(`FAIL: ${report.failed.length}/${report.total} label clicks mismatched`);
    process.exit(1);
  }
  console.log(`PASS: ${report.total} visible labels matched HUD titles`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
