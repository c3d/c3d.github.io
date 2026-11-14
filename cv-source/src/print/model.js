/**
 * Shared collapsed-CV data model for all print styles.
 * Only facts from content — no invented location / experience ranges.
 *
 * Print selection: items with frontmatter `print: 1..n` (lower = more important).
 * Items without `print` are web-only and omitted from print styles.
 * Optional PRINT_COPY overrides title/bullets for the print one-pager only.
 */

const PATENT_COUNT = 12; // unique US grants (11 HP + 1 Red Hat); family-once
const PATENT_PENDING = 3; // Red Hat US applications (not counting continuations of the grant)
/** Both inventor name forms; verified not to match other Dinechin inventors. */
const PATENT_LIST_URL =
  'https://patents.google.com/?inventor=Christophe+de+Dinechin&inventor=Christophe+Marie+Francois+Dupont+de+Dinechin';
const WIESS_URL = 'https://www.usenix.org/legacy/events/wiess2000/full_papers/dinechin/dinechin.pdf';
const FOSDEM_2024_URL = 'https://fosdem.org/2024/schedule/event/fosdem-2024-1990-how-much-math-can-you-fit-in-700k-/';
const FOSDEM_2023_URL = 'https://fosdem.org/2023/schedule/event/reversepolishlisp/';
const DEVCONF_2023_URL =
  'https://devconfcz2023.sched.com/event/1MYgS/confidential-computing-from-host-to-workload';
const DEVCONF_SPICE_URL = 'https://devconfcz2019.sched.com/event/JclE/spice-smart-streaming';
const DEVCONF_KATA_URL =
  'https://devconfcz2020a.sched.com/event/YOnz/kata-containers-and-qemu-mini-in-fedora';
const TIM_URL = 'https://c3d.github.io/TIM/';
const REUNIFIONS_URL = 'https://www.amazon.fr/dp/B0C5GQTWTQ';
const INFORMAGIE_URL = 'https://www.amazon.fr/Informagie-Roman-danticipation-ou-pas/dp/169985081X';
const TIM_AMAZON_URL = 'https://www.amazon.com/theory-incomplete-measurements-Towards-unified/dp/B09TMN922M';
const TAO3D_URL = 'https://tao3d.sourceforge.net/';
const GRENOUILLE_URL = 'https://grenouillebouillie.wordpress.com/';
const DB48X_SITE_URL = 'https://c3d.github.io/db48x/';
const DB48X_PLAYLIST_URL =
  'https://www.youtube.com/watch?v=WU5Dg1mPkl8&list=PLz1qkflzABy-Cs1R07zGB8A9K5Yjolmlf';
const TIM_YT_URL = 'https://www.youtube.com/@atheoryofincompletemeasure865';

function deepLink(href, label) {
  return `<a class="pv-deep" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

/** Print-only title/bullet copy (constellation entries keep their full detail). */
const PRINT_COPY = {
  ecutest: {
    title: 'HP ECUTEST Real Time Test System for car electronics',
    bullets: [
      'Engine control unit (ECU) real-time testing and validation, 400 analog and digital I/O signals, "The Matrix" for ECUs'
    ]
  },
  spice: {
    bullets: ['Bring the SPICE remote-access application to the modern 3D and video desktop']
  },
  'dxo-one': {
    bullets: ['A tiny, but high-quality camera for photographers. Dual-core ARM + ISP, RTOS + Linux']
  },
  hpcpp: {
    bullets: [
      'First native pre-silicon Itanium compiler, exception handling, templates, performance, build system'
    ]
  },
  'cxx-abi': {
    title: 'C++ ABI',
    bullets: [
      'Initiated a cross-industry standardization effort for C++ compiler interoperability, still in use today'
    ]
  },
  tao3d: {
    bullets: ['Tao3D is an XL-based platform for interactive real-time 3D presentations']
  },
  xl: {
    bullets: ['XL is an Extensible Language with interpreted and JIT modes']
  },
  xlr8: {
    bullets: [
      'XLR8 is a super-fast VM, with JIT to ARM, x86 and RISC-V, 32 and 64 bits and full LLVM support'
    ]
  },
  'make-it-quick': {
    bullets: [
      'A make-based build system with auto-configuration, replaces automake/autoconf/cmake'
    ]
  },
  recorder: {
    bullets: [
      'A flight recorder for C and C++ programs, printf syntax, continuous logging, real-time graphing'
    ]
  },
  'emacs-aqua': {
    bullets: [
      'First graphical port of Emacs on macOS X (Rhapsody), first Emacs with transparent windows'
    ]
  },
  'alpha-waves': {
    bullets: [
      'First 3D platform game ever (Guinness Book of Records), precursor of Alone in the Dark'
    ]
  },
  'hp48-games': {
    bullets: [
      'Pacman, Tetris, Lemmings, demos for a cross-compiler I had written, went viral over infrared'
    ]
  },
  taodyne: {
    bullets: [
      'A company selling Tao3D and high-end interactive 3D presentations, stereoscopy, glasses-free 3D'
    ]
  }
};

/** Curated Research print projects (overrides per-entry cards). */
function researchPrintProjects() {
  return [
    {
      id: 'wiess-exception-handling',
      title: 'Computer science research',
      years: '',
      bullets: [
        `Published CS research: ${deepLink(WIESS_URL, 'WIESS 2000')} C++ exception handling; ${deepLink(FOSDEM_2024_URL, 'FOSDEM 2024')} / ${deepLink(FOSDEM_2023_URL, 'FOSDEM 2023')} talks on DB48X`
      ]
    },
    {
      id: 'patents',
      title: `${PATENT_COUNT} patents awarded, ${PATENT_PENDING} pending`,
      years: '',
      bullets: [
        `${PATENT_COUNT} granted US patents (HP and Red Hat, virtualization and confidential computing), ${PATENT_PENDING} pending applications including split host/tenant cluster credentials — ${deepLink(PATENT_LIST_URL, 'Google Patents (de Dinechin / Dupont de Dinechin)')}`
      ]
    },
    {
      id: 'physics-books',
      title: 'Physics research',
      years: '',
      bullets: [
        `A Theory of Incomplete Measurements — unifying GR and QM (${deepLink(TIM_URL, 'TIM')}, ${deepLink(REUNIFIONS_URL, 'Réunifions la physique')})`
      ]
    }
  ];
}

/** Curated Communication Skills print projects. */
function communicationPrintProjects() {
  return [
    {
      id: 'informagie',
      title: 'Books',
      years: '',
      bullets: [
        `Science fiction: ${deepLink(INFORMAGIE_URL, 'Informagie')}; Physics: ${deepLink(TIM_AMAZON_URL, 'A Theory of Incomplete Measurements')}, ${deepLink(REUNIFIONS_URL, 'Réunifions la physique')}`
      ]
    },
    {
      id: 'fosdem-db48x',
      title: 'Conferences and papers',
      years: '',
      bullets: [
        `Sample: ${deepLink(WIESS_URL, 'WIESS 2000')} (C++ Exceptions), FOSDEM (${deepLink(DEVCONF_SPICE_URL, 'SPICE')}, ${deepLink(DEVCONF_KATA_URL, 'Kata')}, ${deepLink(FOSDEM_2023_URL, 'DB48x')}), ${deepLink(DEVCONF_2023_URL, 'DevConf')}`
      ]
    },
    {
      id: 'websites-blogs',
      title: 'Web sites and blogs',
      years: '',
      bullets: [
        `Sample: Web sites of ${deepLink(TAO3D_URL, 'Tao3D')}, ${deepLink(GRENOUILLE_URL, 'Grenouille Bouillie')}, ${deepLink(DB48X_SITE_URL, 'DB48X')}`
      ]
    },
    {
      id: 'videos-portfolio',
      title: 'Videos',
      years: '',
      bullets: [
        `Sample: ${deepLink(DB48X_PLAYLIST_URL, 'DB48x playlist')}, ${deepLink(TIM_YT_URL, 'Theory of Incomplete Measurements')}`
      ]
    },
    {
      id: 'presentation-software',
      title: 'Software',
      years: '',
      bullets: [
        'Designed my own presentation software (Tao3D), still using it to this day'
      ]
    }
  ];
}

/** Explicit line break for the Info education line. */
export function formatEducationHtml(education) {
  if (!education) return '';
  const m = String(education).match(/^(MS Computer Science,)\s*(.*)$/i);
  if (m) return `${m[1]}<br>${m[2]}`;
  return education;
}

function applyPrintCopy(project) {
  const over = PRINT_COPY[project.id];
  if (!over) {
    return {
      id: project.id,
      title: project.title,
      years: project.years || '',
      bullets: (project.bullets || []).slice(0, 1).map((b) => (typeof b === 'string' ? b : b.text))
    };
  }
  return {
    id: project.id,
    title: over.title || project.title,
    years: project.years || '',
    bullets: over.bullets
  };
}

export function buildPrintModel(data, {
  themeOrder,
  printColors,
  maxProjects = 4,
  maxBullets = 1
} = {}) {
  const about = data.find((d) => d.role === 'about' || d.id === 'intro');
  const aboutLines = (about?.bullets || []).map((b) => b.text);
  const aboutPara = (about?.content || '').match(/<p>([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, '')
    || 'Pushing the boundaries by writing highly innovative and differentiating software, hoping to change the world one step at a time.';
  const email = aboutLines.find((t) => t.includes('@')) || 'christophe@dinechin.org';
  // Avoid matching incidental "ms " (e.g. "forms of art") — require real education cues.
  const isEducation = (t) => /École|Mines|MS Computer/i.test(t);
  const education = aboutLines.find(isEducation) || null;
  const website = about?.links?.find((l) => /website/i.test(l.label))?.url || 'https://c3d.github.io';
  const github = about?.links?.find((l) => /github/i.test(l.label))?.url || 'https://github.com/c3d';
  const linkedin = about?.links?.find((l) => /linkedin/i.test(l.label))?.url || null;
  // About card: opening paragraph + the two profile lines only (not education/email/languages).
  const aboutFacts = aboutLines.filter((t) =>
    !t.includes('@')
    && !isEducation(t)
    && !/Native French|fluent English/i.test(t)
  );

  const printRank = (item) => {
    const v = item.print ?? item.printPriority;
    return typeof v === 'number' ? v : null;
  };

  const byTheme = {};
  data.forEach((item) => {
    if (item.role === 'about' || item.id === 'intro') return;
    if (printRank(item) == null) return; // web-only
    // Patents rendered inside curated Research section, not as a Systems card
    if (item.id === 'patents') return;
    // Research / Communication use curated print projects below
    if (item.theme === 'Research' || item.theme === 'Communication Skills') return;
    const theme = item.theme;
    if (!themeOrder.includes(theme)) return;
    if (!byTheme[theme]) byTheme[theme] = [];
    byTheme[theme].push(item);
  });

  const themes = themeOrder.map((theme) => {
    let projects;
    if (theme === 'Research') {
      projects = researchPrintProjects();
    } else if (theme === 'Communication Skills') {
      projects = communicationPrintProjects();
    } else {
      projects = (byTheme[theme] || [])
        .slice()
        .sort((a, b) => printRank(a) - printRank(b))
        .slice(0, maxProjects)
        .map((p) => applyPrintCopy(p));
    }
    return {
      id: theme,
      name: theme,
      color: printColors?.[theme] || '#1f5fd0',
      projects
    };
  }).filter((t) => t.projects.length);

  return {
    name: 'Christophe de Dinechin',
    subtitle: 'Software as a Passion',
    keywords: themeOrder.map((t) => t.split('&')[0].trim()),
    aboutPara,
    aboutFacts,
    email,
    education,
    educationHtml: formatEducationHtml(education),
    website,
    github,
    linkedin,
    qrUrl: 'https://c3d.github.io/cv/',
    logoSrc: '/cv/logo.png',
    qrSrc: '/cv/qr-cv.png',
    photoWebp: '/cv/photo.webp',
    photoJpg: '/cv/photo.jpg',
    showPhoto: true,
    themes,
    skills: themeOrder,
    patentsLine: null,
    patentCount: PATENT_COUNT
  };
}
