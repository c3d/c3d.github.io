/**
 * Shared collapsed-CV data model for all print styles.
 * Only facts from content — no invented location / experience ranges.
 *
 * Print selection: items with frontmatter `print: 1..n` (lower = more important).
 * Items without `print` are web-only and omitted from print styles.
 */

const PATENT_COUNT = 11; // unique US grant numbers for inventor Christophe de Dinechin (family-once)
const PATENT_LIST_URL = 'https://patents.google.com/?inventor=Christophe+de+Dinechin&oq=inventor%3D(Christophe+de+Dinechin)';
const WIESS_URL = 'https://www.usenix.org/legacy/events/wiess2000/full_papers/dinechin/dinechin.pdf';
const FOSDEM_2024_URL = 'https://fosdem.org/2024/schedule/event/fosdem-2024-1990-how-much-math-can-you-fit-in-700k-/';
const FOSDEM_2023_URL = 'https://fosdem.org/2023/schedule/event/reversepolishlisp/';
const TIM_URL = 'https://c3d.github.io/TIM/';
const REUNIFIONS_URL = 'https://www.amazon.fr/dp/B0C5GQTWTQ';
const INFORMAGIE_URL = 'https://www.amazon.fr/Informagie-Roman-danticipation-ou-pas/dp/169985081X';
const TIM_AMAZON_URL = 'https://www.amazon.com/theory-incomplete-measurements-Towards-unified/dp/B09TMN922M';

function deepLink(href, label) {
  return `<a class="pv-deep" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

/** Curated Research print projects (overrides per-entry cards). */
function researchPrintProjects() {
  return [
    {
      title: 'Computer science research',
      years: '',
      bullets: [
        `Published CS research: ${deepLink(WIESS_URL, 'WIESS 2000')} C++ exception handling; ${deepLink(FOSDEM_2024_URL, 'FOSDEM 2024')} / ${deepLink(FOSDEM_2023_URL, 'FOSDEM 2023')} talks on DB48X`
      ]
    },
    {
      title: `${PATENT_COUNT} patents awarded`,
      years: '',
      bullets: [
        `${PATENT_COUNT} granted US patents (family-once) — ${deepLink(PATENT_LIST_URL, 'Google Patents inventor list')}`
      ]
    },
    {
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
      title: 'Books',
      years: '',
      bullets: [
        `Sample: ${deepLink(INFORMAGIE_URL, 'Informagie')}; ${deepLink(TIM_AMAZON_URL, 'A Theory of Incomplete Measurements')}; ${deepLink(REUNIFIONS_URL, 'Réunifions la physique')}`
      ]
    },
    {
      title: 'Conferences',
      years: '',
      bullets: [
        `Sample: ${deepLink(WIESS_URL, 'WIESS 2000')}; ${deepLink(FOSDEM_2023_URL, 'FOSDEM 2023')} / ${deepLink(FOSDEM_2024_URL, 'FOSDEM 2024')} on DB48X`
      ]
    },
    {
      title: 'Taodyne',
      years: '2010-2016',
      bullets: [
        'Founder and CEO of Taodyne, a company selling 3D interactive presentation software'
      ]
    }
  ];
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
    || 'Pushing the boundaries by writing highly innovative and differentiating software that makes a real difference.';
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
        .map((p) => ({
          title: p.title,
          years: p.years || '',
          bullets: (p.bullets || []).slice(0, maxBullets).map((b) => (typeof b === 'string' ? b : b.text))
        }));
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
