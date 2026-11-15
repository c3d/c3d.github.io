/** Shared space-themed line icons for print styles. Key order matches print. */
export const THEME_ICONS = {
  'Languages & Compilers': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="6"/><ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(25 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(-35 24 24)"/><circle cx="38" cy="14" r="2.2" fill="currentColor" stroke="none"/></g></svg>`,
  'Systems & Virtualization': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="18" width="20" height="12" rx="2"/><path d="M18 18v-4h12v4M22 30v4h4v-4"/><circle cx="24" cy="24" r="2.5"/><path d="M8 24h6M34 24h6M24 8v4M24 36v4"/></g></svg>`,
  'Tools & Apps': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M30 8l4 4-8 8-4-4 8-8z"/><path d="M26 20L12 34l-2 6 6-2 14-14"/><circle cx="34" cy="34" r="6"/><path d="M34 30v8M30 34h8"/></g></svg>`,
  'Games & 3D': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l8 14-3 2 5 12-10-6-10 6 5-12-3-2z"/><path d="M18 40c2-3 4-4 6-4s4 1 6 4"/><path d="M24 22v8"/></g></svg>`,
  Research: `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><ellipse cx="24" cy="24" rx="16" ry="7"/><ellipse cx="24" cy="24" rx="16" ry="7" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="16" ry="7" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></g></svg>`,
  Communications: `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16h18a4 4 0 014 4v8a4 4 0 01-4 4H20l-6 6v-6h-4a4 4 0 01-4-4v-8a4 4 0 014-4z"/><path d="M28 12h6a4 4 0 014 4v6a4 4 0 01-4 4h-1"/><circle cx="16" cy="24" r="1.4" fill="currentColor" stroke="none"/><circle cx="22" cy="24" r="1.4" fill="currentColor" stroke="none"/><circle cx="28" cy="24" r="1.4" fill="currentColor" stroke="none"/></g></svg>`
};

/** Print Tools & technologies pills — exact order and membership. */
export const TECH_TAGS = [
  'C', 'C++', 'Asm', 'FOSS', 'AI', 'ARM', 'Firmware',
  'Virtualization', 'Kernel', 'Real-time', '3D',
  'Embedded', 'Validation', 'Performance',
  'Linux', 'macOS', 'OpenShift',
  'RPL', 'XL', 'Tao3D', 'ELFE', 'SPICE', 'Make'
];

/**
 * Map print tech-tag labels → constellation deep links.
 * Tags that name a specific project/node open that entry (`#id`).
 * Skill-area tags open the matching `?topic=` filter.
 */
export const TECH_TAG_LINKS = {
  C: { kind: 'topic', id: 'cpp' },
  'C++': { kind: 'topic', id: 'cpp' },
  Asm: { kind: 'topic', id: 'asm' },
  FOSS: { kind: 'topic', id: 'opensource' },
  AI: { kind: 'entry', id: 'ai' },
  ARM: { kind: 'topic', id: 'arm' },
  Firmware: { kind: 'topic', id: 'firmware' },
  Virtualization: { kind: 'topic', id: 'virtualization' },
  Kernel: { kind: 'topic', id: 'linux' },
  'Real-time': { kind: 'topic', id: 'realtime' },
  '3D': { kind: 'topic', id: 'graphics3d' },
  Embedded: { kind: 'topic', id: 'embedded' },
  Validation: { kind: 'topic', id: 'validation' },
  Performance: { kind: 'topic', id: 'performance' },
  Linux: { kind: 'topic', id: 'linux' },
  macOS: { kind: 'topic', id: 'macos' },
  OpenShift: { kind: 'entry', id: 'kata-containers' },
  RPL: { kind: 'entry', id: 'db48x' },
  XL: { kind: 'entry', id: 'xl' },
  Tao3D: { kind: 'entry', id: 'tao3d' },
  ELFE: { kind: 'entry', id: 'elfe' },
  SPICE: { kind: 'entry', id: 'spice' },
  Make: { kind: 'entry', id: 'make-it-quick' }
};

/** @deprecated Prefer TECH_TAG_LINKS; kept for any leftover topic-id lookups. */
export const TECH_TAG_TOPIC_IDS = Object.fromEntries(
  Object.entries(TECH_TAG_LINKS)
    .filter(([, v]) => v.kind === 'topic')
    .map(([k, v]) => [k, v.id])
);

export const THEME_CLUSTER_SLUGS = {
  'Languages & Compilers': 'languages',
  'Systems & Virtualization': 'systems',
  'Tools & Apps': 'tools',
  'Games & 3D': 'games',
  Research: 'research',
  Communications: 'communication'
};

const CV_ORIGIN = 'https://c3d.github.io/cv/';

/** Always open constellation links in a new tab so the print page never hash-scrolls. */
const DEEP_ATTRS = 'target="_blank" rel="noopener noreferrer"';

export function topicHref(topicId) {
  return `${CV_ORIGIN}?topic=${encodeURIComponent(topicId)}`;
}

export function clusterHref(themeName) {
  const slug = THEME_CLUSTER_SLUGS[themeName] || themeName;
  return `${CV_ORIGIN}?cluster=${encodeURIComponent(slug)}`;
}

/** Deep link that opens a constellation entry HUD (`#<projectId>`). */
export function entryHref(projectId) {
  return `${CV_ORIGIN}#${encodeURIComponent(projectId)}`;
}

export function techTagHref(tag) {
  const link = TECH_TAG_LINKS[tag];
  if (!link) return null;
  return link.kind === 'entry' ? entryHref(link.id) : topicHref(link.id);
}

/** Anchor for a Technologies pill (entry node or topic filter). */
export function techTagLink(tag, { onDark = false } = {}) {
  const href = techTagHref(tag);
  if (!href) return `<span>${tag}</span>`;
  const cls = onDark ? 'pv-deep pv-deep-on-dark' : 'pv-deep';
  return `<a class="${cls}" href="${href}" ${DEEP_ATTRS}>${tag}</a>`;
}

/**
 * Print project title → constellation deep link, or an external href when provided
 * (e.g. patents title → Google Patents search).
 */
export function entryTitleLink(projectId, title, { href } = {}) {
  if (href) {
    return `<a class="pv-deep" href="${href}" ${DEEP_ATTRS}>${title}</a>`;
  }
  if (!projectId) return title;
  return `<a class="pv-deep" href="${entryHref(projectId)}" ${DEEP_ATTRS}>${title}</a>`;
}

/** Cluster heading / skills-list deep link. */
export function clusterTitleLink(themeName, { onDark = false } = {}) {
  const cls = onDark ? 'pv-deep pv-deep-on-dark' : 'pv-deep';
  return `<a class="${cls}" href="${clusterHref(themeName)}" ${DEEP_ATTRS}>${themeName}</a>`;
}
