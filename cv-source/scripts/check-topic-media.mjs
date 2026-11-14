#!/usr/bin/env node
/**
 * Reject topic media that looks like bot-block / captcha / empty error pages.
 * Scans content frontmatter images under public/ and fails on:
 *  - missing files
 *  - tiny files
 *  - near-uniform images (low variance)
 *  - OCR-ish text sniff via embedded strings / filename heuristics
 *  - PNG/JPEG metadata or raw bytes containing block keywords
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const BLOCK_RE = /blocked|verification|forbidden|captcha|cookies?|unusual traffic|access denied|are you a robot|just a moment|cf-browser|attention required|perplexed|toutes nos excuses/i;

const failures = [];
const reports = [];

function nearUniform(buf) {
  // Sample every Nth byte; reject if almost all samples equal (blank/solid page)
  if (buf.length < 800) return true;
  const step = Math.max(1, Math.floor(buf.length / 400));
  const samples = [];
  for (let i = 0; i < buf.length; i += step) samples.push(buf[i]);
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  let varSum = 0;
  for (const v of samples) varSum += (v - mean) ** 2;
  const std = Math.sqrt(varSum / samples.length);
  return std < 4.5;
}

function bytesLookBlocked(buf) {
  // Search ascii/utf8 windows for block phrases (works on PNG text chunks / JPEG comments / HTML mistaken as image)
  const text = buf.toString('latin1');
  return BLOCK_RE.test(text);
}

for (const file of fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))) {
  if (file === 'topics.md') continue;
  const { data } = matter(fs.readFileSync(path.join(contentDir, file), 'utf8'));
  if (!data.id || data.role === 'about' || data.id === 'intro') continue;
  const images = Array.isArray(data.images) ? data.images : [];
  const videos = Array.isArray(data.videos) ? data.videos.filter(Boolean) : [];
  if (!images.length) {
    reports.push({ id: data.id, status: videos.length ? 'video-only' : 'no-media' });
    continue;
  }
  for (const imgEntry of images) {
    const img = typeof imgEntry === 'string' ? imgEntry : imgEntry?.src;
    if (!img) {
      failures.push({ id: data.id, img: imgEntry, reason: 'missing-src' });
      continue;
    }
    const rel = String(img).replace(/^\/cv\//, '');
    const candidates = [
      path.join(root, 'public', rel.replace(/^media\//, 'media/')),
      path.join(root, 'public', path.basename(rel)),
      path.join(root, rel),
      path.join(root, 'public', rel)
    ];
    // /cv/media/foo.png → public/media/foo.png
    const m = String(img).match(/^\/cv\/(media\/.+)$/);
    if (m) candidates.unshift(path.join(root, 'public', m[1]));
    if (String(img).startsWith('/cv/') && !String(img).includes('/media/')) {
      candidates.unshift(path.join(root, 'public', path.basename(img)));
    }
    const abs = candidates.find((p) => fs.existsSync(p));
    if (!abs) {
      failures.push({ id: data.id, img, reason: 'missing-file' });
      continue;
    }
    const buf = fs.readFileSync(abs);
    const reasons = [];
    if (buf.length < 1500) reasons.push(`too-small(${buf.length})`);
    if (nearUniform(buf)) reasons.push('near-uniform');
    if (bytesLookBlocked(buf)) reasons.push('block-keywords-in-bytes');
    // GIF/JPEG magic
    const isImg = buf[0] === 0xff || buf[0] === 0x89 || buf.slice(0, 3).toString() === 'GIF' || buf.slice(0, 4).toString() === 'RIFF';
    if (!isImg && buf.slice(0, 15).toString().includes('<!DOCTYPE')) reasons.push('html-document');
    if (reasons.length) failures.push({ id: data.id, img, file: abs, reason: reasons.join(',') });
    else reports.push({ id: data.id, img, file: path.relative(root, abs), bytes: buf.length, status: 'ok' });
  }
}

console.log(JSON.stringify({ ok: failures.length === 0, failures, reports }, null, 2));
if (failures.length) {
  console.error(`\ncheck-topic-media: ${failures.length} bad image(s)`);
  process.exit(1);
}
console.log(`\ncheck-topic-media: ${reports.length} ok`);
