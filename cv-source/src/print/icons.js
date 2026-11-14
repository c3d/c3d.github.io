/** Shared space-themed line icons for print styles. */
export const THEME_ICONS = {
  'Languages & Compilers': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="6"/><ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(25 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(-35 24 24)"/><circle cx="38" cy="14" r="2.2" fill="currentColor" stroke="none"/></g></svg>`,
  'Systems & Virtualization': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="18" width="20" height="12" rx="2"/><path d="M18 18v-4h12v4M22 30v4h4v-4"/><circle cx="24" cy="24" r="2.5"/><path d="M8 24h6M34 24h6M24 8v4M24 36v4"/></g></svg>`,
  'Games & 3D': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l8 14-3 2 5 12-10-6-10 6 5-12-3-2z"/><path d="M18 40c2-3 4-4 6-4s4 1 6 4"/><path d="M24 22v8"/></g></svg>`,
  'Physics': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><ellipse cx="24" cy="24" rx="16" ry="7"/><ellipse cx="24" cy="24" rx="16" ry="7" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="16" ry="7" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></g></svg>`,
  'Art & Culture': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 30c6-14 12-20 20-22 2 8-1 16-8 24"/><path d="M28 10c6 2 10 8 12 16"/><circle cx="34" cy="14" r="2.5" fill="currentColor" stroke="none"/><path d="M14 34c4 2 10 3 16 1"/></g></svg>`,
  'Tools & Apps': `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M30 8l4 4-8 8-4-4 8-8z"/><path d="M26 20L12 34l-2 6 6-2 14-14"/><circle cx="34" cy="34" r="6"/><path d="M34 30v8M30 34h8"/></g></svg>`
};

export const TECH_TAGS = [
  'C++', 'C', 'RPL', 'Lisp', 'XL', 'Tao3D', 'ELFE',
  'Linux', 'macOS', 'Windows', 'SPICE', 'Emacs', 'OpenShift', 'Make'
];

/** Map print tech-tag labels → topic ids for ?topic= deep links. */
export const TECH_TAG_TOPIC_IDS = {
  'C++': 'cpp',
  C: 'cpp',
  RPL: 'lisp',
  Lisp: 'lisp',
  XL: 'compilers',
  Tao3D: 'graphics3d',
  ELFE: 'compilers',
  Linux: 'linux',
  macOS: 'macos',
  Windows: 'opensource',
  SPICE: 'networking',
  Emacs: 'emacs',
  OpenShift: 'containers',
  Make: 'build-systems'
};

export const THEME_CLUSTER_SLUGS = {
  'Languages & Compilers': 'languages',
  'Systems & Virtualization': 'systems',
  'Games & 3D': 'games',
  Physics: 'physics',
  'Art & Culture': 'art',
  'Tools & Apps': 'tools'
};

export function topicHref(topicId) {
  return `https://c3d.github.io/cv/?topic=${encodeURIComponent(topicId)}`;
}

export function clusterHref(themeName) {
  const slug = THEME_CLUSTER_SLUGS[themeName] || themeName;
  return `https://c3d.github.io/cv/?cluster=${encodeURIComponent(slug)}`;
}
