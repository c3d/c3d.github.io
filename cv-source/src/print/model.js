/**
 * Shared collapsed-CV data model for all print styles.
 * Only facts from content — no invented location / experience ranges.
 */
export function buildPrintModel(data, { themeOrder, printColors, maxProjects = 3, maxBullets = 2 } = {}) {
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

  const byTheme = {};
  data.forEach((item) => {
    if (item.role === 'about' || item.id === 'intro') return;
    const theme = item.theme;
    if (!themeOrder.includes(theme)) return;
    if (!byTheme[theme]) byTheme[theme] = [];
    byTheme[theme].push(item);
  });

  const themes = themeOrder.map((theme) => {
    const projects = (byTheme[theme] || [])
      .slice()
      .sort((a, b) => (b.weight || 0) - (a.weight || 0))
      .slice(0, maxProjects)
      .map((p) => ({
        title: p.title,
        years: p.years || '',
        bullets: (p.bullets || []).slice(0, maxBullets).map((b) => b.text)
      }));
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
    themes,
    skills: themeOrder
  };
}
