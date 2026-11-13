/**
 * Shared collapsed-CV data model for all print styles.
 * Only facts from content — no invented location / experience ranges.
 *
 * Print selection: items with frontmatter `print: 1..n` (lower = more important).
 * Items without `print` are web-only and omitted from print styles.
 */
export function buildPrintModel(data, {
  themeOrder,
  printColors,
  maxProjects = 3,
  maxBullets = 2
} = {}) {
  const about = data.find((d) => d.role === 'about' || d.id === 'intro');
  const aboutLines = (about?.bullets || []).map((b) => b.text);
  const aboutPara = (about?.content || '').match(/<p>([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, '')
    || 'Pushing the boundaries by writing highly innovative and differentiating software to make as much of a difference as possible.';
  const email = aboutLines.find((t) => t.includes('@')) || 'christophe@dinechin.org';
  const education = aboutLines.find((t) => /École|Mines|MS /i.test(t)) || null;
  const website = about?.links?.find((l) => /website/i.test(l.label))?.url || 'https://c3d.github.io';
  const github = about?.links?.find((l) => /github/i.test(l.label))?.url || 'https://github.com/c3d';
  const linkedin = about?.links?.find((l) => /linkedin/i.test(l.label))?.url || null;
  const aboutFacts = aboutLines.filter((t) => !t.includes('@') && !/École|Mines/i.test(t));

  const printRank = (item) => {
    const v = item.print ?? item.printPriority;
    return typeof v === 'number' ? v : null;
  };

  const byTheme = {};
  data.forEach((item) => {
    if (item.role === 'about' || item.id === 'intro') return;
    if (printRank(item) == null) return; // web-only
    // Patents rendered as a compact footer line, not a full project card
    if (item.id === 'patents') return;
    const theme = item.theme;
    if (!themeOrder.includes(theme)) return;
    if (!byTheme[theme]) byTheme[theme] = [];
    byTheme[theme].push(item);
  });

  const themes = themeOrder.map((theme) => {
    const projects = (byTheme[theme] || [])
      .slice()
      .sort((a, b) => printRank(a) - printRank(b))
      .slice(0, maxProjects)
      .map((p) => ({
        title: p.title,
        years: p.years || '',
        bullets: (p.bullets || []).slice(0, maxBullets).map((b) => (typeof b === 'string' ? b : b.text))
      }));
    return {
      id: theme,
      name: theme,
      color: printColors?.[theme] || '#1f5fd0',
      projects
    };
  }).filter((t) => t.projects.length);

  const patents = data.find((d) => d.id === 'patents' && printRank(d) != null);
  const patentsLine = patents
    ? 'Patents (HP virtualization / VMM): USPTO — patents.justia.com/inventor/christophe-de-dinechin'
    : null;

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
    patentsLine
  };
}
