import { THEME_ICONS, TECH_TAGS } from '../icons.js';

/** Orbit: deep-space navy & gold monochrome elegance. */
export const orbitStyle = {
  id: 'orbit',
  label: 'Orbit',
  description: 'Navy & gold deep-space layout',
  photo: true,
  photoPlacement: 'sidebar-top',
  render(model) {
    const keywords = model.keywords.join('  |  ');
    const showPhoto = model.showPhoto !== false;
    const photo = showPhoto ? `<div class="pvo-photo-wrap">
      <picture class="pvo-photo">
        <source srcset="${model.photoWebp}" type="image/webp">
        <img src="${model.photoJpg}" alt="${model.name}" width="96" height="96">
      </picture>
    </div>` : '';
    let html = `<div class="pv-orbit">
      <aside class="pvo-side">
        ${photo}
        <section class="pvo-block">
          <h2><span class="pvo-mini">◈</span> About</h2>
          <p>${model.aboutPara}</p>
          ${model.aboutFacts.slice(0, 3).map((t) => `<p class="pvo-muted">${t}</p>`).join('')}
        </section>
        <section class="pvo-block">
          <h2><span class="pvo-mini">◎</span> Key skills</h2>
          <ul class="pvo-skills">${model.skills.map((t) => `<li><span class="pvo-check">✓</span>${t}</li>`).join('')}</ul>
        </section>
        <section class="pvo-block">
          <h2><span class="pvo-mini">▤</span> Technologies</h2>
          <div class="pvo-tags">${TECH_TAGS.map((t) => `<span>${t}</span>`).join('')}</div>
        </section>
        <section class="pvo-block">
          <h2><span class="pvo-mini">ℹ</span> Info</h2>
          <ul class="pvo-info">
            ${model.education ? `<li><span>★</span>${model.education}</li>` : ''}
            <li><span>✉</span>${model.email}</li>
            <li><span>⌘</span>${model.github.replace(/^https?:\/\//, '')}</li>
            <li><span>◉</span>${model.website.replace(/^https?:\/\//, '')}</li>
          </ul>
        </section>
        <a class="pvo-block pvo-qr" href="${model.qrUrl}" target="_blank" rel="noopener">
          <img src="${model.qrSrc}" alt="QR to interactive CV" width="64" height="64">
          <div><strong>Scan the constellation</strong><br>${model.qrUrl}</div>
        </a>
        <div class="pvo-earth" aria-hidden="true">
          <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMax slice">
            <defs>
              <radialGradient id="pvoGlow" cx="50%" cy="0%" r="70%">
                <stop offset="0%" stop-color="#7ec8ff" stop-opacity=".55"/>
                <stop offset="100%" stop-color="#0a1a3a" stop-opacity="0"/>
              </radialGradient>
              <linearGradient id="pvoNight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0b1e3d"/>
                <stop offset="100%" stop-color="#06101f"/>
              </linearGradient>
            </defs>
            <rect width="200" height="90" fill="url(#pvoGlow)"/>
            <g fill="#d4e7ff">${[...Array(18)].map((_, i) =>
              `<circle cx="${(i * 37 + 9) % 195}" cy="${(i * 17 + 5) % 40}" r="${i % 3 ? 0.6 : 1.1}" opacity=".5"/>`
            ).join('')}</g>
            <ellipse cx="100" cy="95" rx="95" ry="42" fill="url(#pvoNight)" stroke="#c9a227" stroke-width="0.6" opacity=".95"/>
            <g fill="#f0d878" opacity=".75">
              <circle cx="70" cy="78" r="0.8"/><circle cx="88" cy="72" r="0.6"/>
              <circle cx="110" cy="80" r="0.7"/><circle cx="130" cy="74" r="0.5"/>
              <circle cx="55" cy="82" r="0.5"/><circle cx="150" cy="78" r="0.6"/>
            </g>
          </svg>
        </div>
      </aside>
      <div class="pvo-right">
        <header class="pvo-header">
          <div class="pvo-header-wave" aria-hidden="true">
            <svg viewBox="0 0 420 80" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="pvoWave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#c9a227" stop-opacity="0"/>
                  <stop offset="40%" stop-color="#7ec8ff" stop-opacity=".7"/>
                  <stop offset="100%" stop-color="#c9a227" stop-opacity=".85"/>
                </linearGradient>
              </defs>
              <rect width="420" height="80" fill="#0a1628"/>
              <path d="M180 50 C220 20, 260 70, 300 35 S360 20, 420 45" fill="none" stroke="url(#pvoWave)" stroke-width="1.4"/>
              <g fill="#e8f2ff">${[...Array(20)].map((_, i) =>
                `<circle cx="${200 + (i * 11) % 210}" cy="${12 + (i * 19) % 55}" r="${i % 4 ? 0.7 : 1.3}" opacity=".55"/>`
              ).join('')}</g>
            </svg>
          </div>
          <div class="pvo-header-inner">
            <img class="pvo-logo" src="${model.logoSrc}" alt="">
            <div>
              <h1>${model.name}</h1>
              <p class="pvo-sub">${model.subtitle}</p>
              <p class="pvo-keys">${keywords}</p>
            </div>
          </div>
        </header>
        <main class="pvo-main">`;

    model.themes.forEach((theme) => {
      const icon = THEME_ICONS[theme.name] || '';
      html += `<section class="pvo-theme">
        <div class="pvo-theme-head">
          <span class="pvo-tile">${icon}</span>
          <h2>${theme.name}</h2>
          <span class="pvo-rule"></span>
        </div>
        <div class="pvo-timeline">`;
      theme.projects.forEach((p) => {
        html += `<article class="pvo-project">
          <div class="pvo-dot"></div>
          <div class="pvo-head"><h3>${p.title}</h3>${p.years ? `<span class="pvo-years">${p.years}</span>` : ''}</div>
          <ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        </article>`;
      });
      html += '</div></section>';
    });

    if (model.patentsLine) {
      html += `<p class="pvo-patents">${model.patentsLine}</p>`;
    }

    html += '</main></div></div>';
    return html;
  }
};
