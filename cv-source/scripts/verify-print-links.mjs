/**
 * Assert every print-view constellation href resolves to a known project id,
 * topic id, or cluster slug. Run: node scripts/verify-print-links.mjs
 */
import { PRINT_STYLES, buildModelForStyles } from '../src/print/registry.js';
import content from '../src/content-data.json' with { type: 'json' };
import topics from '../src/topics.json' with { type: 'json' };
import { THEME_CLUSTER_SLUGS } from '../src/print/icons.js';

const THEME_ORDER = Object.keys(THEME_CLUSTER_SLUGS);
const printColors = Object.fromEntries(THEME_ORDER.map((t) => [t, '#123']));
const projectIds = new Set(content.map((p) => p.id).filter(Boolean));
const topicIds = new Set(topics.map((t) => t.id));
const clusterSlugs = new Set(Object.values(THEME_CLUSTER_SLUGS));
clusterSlugs.add('art');
clusterSlugs.add('physics');

function extractLinks(html) {
  const out = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const href = (attrs.match(/\bhref="([^"]*)"/i) || [])[1] || '';
    const target = (attrs.match(/\btarget="([^"]*)"/i) || [])[1] || '';
    out.push({ text, href, target });
  }
  return out;
}

function classify(href) {
  if (!href) return { kind: 'empty' };
  let url;
  try {
    url = new URL(href, 'https://c3d.github.io/cv/');
  } catch {
    return { kind: 'bad', href };
  }
  if (url.hostname === 'c3d.github.io' && url.pathname.replace(/\/+$/, '').endsWith('/cv')) {
    const topic = url.searchParams.get('topic');
    const cluster = url.searchParams.get('cluster');
    const hash = decodeURIComponent((url.hash || '').replace(/^#/, ''));
    if (topic) return { kind: 'topic', id: topic };
    if (cluster) return { kind: 'cluster', id: cluster };
    if (hash && hash !== 'print') return { kind: 'entry', id: hash };
    return { kind: 'overview' };
  }
  if (href.startsWith('#')) return { kind: 'hash-relative', id: decodeURIComponent(href.slice(1)) };
  return { kind: 'external' };
}

const failures = [];
const rows = [];

for (const style of PRINT_STYLES) {
  const model = buildModelForStyles(content, THEME_ORDER, printColors);
  const html = style.render(model);
  for (const link of extractLinks(html)) {
    const c = classify(link.href);
    let ok = true;
    let note = '';
    if (c.kind === 'entry') {
      ok = projectIds.has(c.id);
      if (!ok) note = 'missing project id';
    } else if (c.kind === 'topic') {
      ok = topicIds.has(c.id);
      if (!ok) note = 'missing topic id';
    } else if (c.kind === 'cluster') {
      ok = clusterSlugs.has(c.id);
      if (!ok) note = 'bad cluster slug';
    } else if (c.kind === 'hash-relative') {
      ok = false;
      note = 'relative hash (print-page zoom risk)';
    } else if (c.kind === 'empty' || c.kind === 'bad') {
      ok = false;
      note = c.kind;
    }
    if (
      (c.kind === 'entry' || c.kind === 'topic' || c.kind === 'cluster')
      && link.target !== '_blank'
    ) {
      ok = false;
      note = (note ? note + '; ' : '') + 'missing target=_blank';
    }
    rows.push({ style: style.id, ...link, ...c, ok, note });
    if (!ok) failures.push({ style: style.id, text: link.text, href: link.href, note });
  }
}

if (failures.length) {
  console.error('FAIL: print link verification');
  for (const f of failures) {
    console.error(`  [${f.style}] "${f.text}" → ${f.href} (${f.note})`);
  }
  process.exit(1);
}

const constellation = rows.filter((r) => ['entry', 'topic', 'cluster'].includes(r.kind));
console.log(`OK: ${rows.length} links across ${PRINT_STYLES.length} styles; ${constellation.length} constellation deep links resolve.`);
