import { THEME_ICONS, TECH_TAGS, TECH_TAG_TOPIC_IDS, topicHref, clusterHref } from '../icons.js';

/** Nebula: colorful theme bars, light sidebar cards, deep-space header. */
export const nebulaStyle = {
  id: 'nebula',
  label: 'Nebula',
  description: 'Colorful constellation one-pager',
  photo: true,
  photoPlacement: 'header',
  render(model) {
    const keywords = model.keywords.join(' · ');
    const showPhoto = model.showPhoto !== false;
    const photo = showPhoto ? `<picture class="pvn-photo">
      <source srcset="${model.photoWebp}" type="image/webp">
      <img src="${model.photoJpg}" alt="${model.name}" width="72" height="72">
    </picture>` : '';
    const stars = Array.from({ length: 28 }, (_, i) => {
      const x = (i * 47 + 13) % 390 + 5;
      const y = (i * 31 + 9) % 100 + 8;
      const r = (i % 5 === 0) ? 1.4 : 0.7;
      return `<circle cx="${x}" cy="${y}" r="${r}" opacity="${0.35 + (i % 4) * 0.15}"/>`;
    }).join('');

    let html = `<div class="pv-nebula">
      <header class="pvn-header">
        <div class="pvn-space" aria-hidden="true">
          <svg class="pvn-starfield" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="pvnNeb1" cx="70%" cy="40%" r="45%"><stop offset="0%" stop-color="#4a90ff" stop-opacity=".55"/><stop offset="100%" stop-color="#4a90ff" stop-opacity="0"/></radialGradient>
              <radialGradient id="pvnNeb2" cx="85%" cy="70%" r="40%"><stop offset="0%" stop-color="#ff5ad6" stop-opacity=".4"/><stop offset="100%" stop-color="#ff5ad6" stop-opacity="0"/></radialGradient>
              <radialGradient id="pvnNeb3" cx="55%" cy="60%" r="35%"><stop offset="0%" stop-color="#40e0ff" stop-opacity=".35"/><stop offset="100%" stop-color="#40e0ff" stop-opacity="0"/></radialGradient>
            </defs>
            <rect width="400" height="120" fill="#050b18"/>
            <rect width="400" height="120" fill="url(#pvnNeb1)"/>
            <rect width="400" height="120" fill="url(#pvnNeb2)"/>
            <rect width="400" height="120" fill="url(#pvnNeb3)"/>
            <g fill="#fff">${stars}</g>
            <g fill="none" stroke="rgba(180,220,255,.45)" stroke-width="0.8">
              <path d="M250 30 L280 55 L310 40 L340 70 L365 48"/>
              <circle cx="250" cy="30" r="2" fill="#9cf" stroke="none"/>
              <circle cx="280" cy="55" r="2" fill="#9cf" stroke="none"/>
              <circle cx="310" cy="40" r="2.2" fill="#fff" stroke="none"/>
              <circle cx="340" cy="70" r="2" fill="#9cf" stroke="none"/>
              <circle cx="365" cy="48" r="2" fill="#9cf" stroke="none"/>
            </g>
          </svg>
        </div>
        <div class="pvn-header-inner">
          <img class="pvn-logo" src="${model.logoSrc}" alt="">
          <div class="pvn-header-text">
            <h1>${model.name}</h1>
            <p class="pvn-sub">${model.subtitle}</p>
            <p class="pvn-keys">${keywords}</p>
          </div>
          ${photo}
        </div>
      </header>
      <div class="pvn-body">
        <aside class="pvn-side">
          <section class="pvn-card"><h2>About</h2><p>${model.aboutPara}</p>
            ${model.aboutFacts.slice(0, 3).map((t) => `<p class="pvn-muted">${t}</p>`).join('')}
          </section>
          <section class="pvn-card"><h2>Key skills</h2>
            <ul class="pvn-skills">${model.skills.map((t) => {
              const theme = model.themes.find((x) => x.name === t);
              const c = theme?.color || '#1f5fd0';
              return `<li><span class="pvn-check" style="background:${c}">✓</span><a class="pv-deep" href="${clusterHref(t)}">${t}</a></li>`;
            }).join('')}</ul>
          </section>
          <section class="pvn-card"><h2>Info</h2>
            <ul class="pvn-info">
              ${model.education ? `<li><span>★</span>${model.education}</li>` : ''}
              <li><span>✉</span>${model.email}</li>
              <li><span>⌘</span>${model.github.replace(/^https?:\/\//, '')}</li>
              <li><span>◉</span>${model.website.replace(/^https?:\/\//, '')}</li>
            </ul>
          </section>
          <section class="pvn-card"><h2>Tools &amp; technologies</h2>
            <div class="pvn-tags">${TECH_TAGS.map((t) => {
              const tid = TECH_TAG_TOPIC_IDS[t];
              return tid
                ? `<a class="pv-deep" href="${topicHref(tid)}">${t}</a>`
                : `<span>${t}</span>`;
            }).join('')}</div>
          </section>
          <a class="pvn-card pvn-qr" href="${model.qrUrl}" target="_blank" rel="noopener">
            <img src="${model.qrSrc}" alt="QR to interactive CV" width="72" height="72">
            <div><p class="pvn-qr-title">Interactive constellation</p><p class="pvn-muted">${model.qrUrl}</p></div>
          </a>
        </aside>
        <main class="pvn-main">`;

    model.themes.forEach((theme) => {
      const icon = THEME_ICONS[theme.name] || '';
      html += `<section class="pvn-theme" style="--theme-color:${theme.color}">
        <div class="pvn-bar"><span class="pvn-ico">${icon}</span><h2><a class="pv-deep pv-deep-on-dark" href="${clusterHref(theme.name)}">${theme.name}</a></h2></div>
        <div class="pvn-theme-body">
          <div class="pvn-timeline">`;
      theme.projects.forEach((p) => {
        html += `<article class="pvn-project">
          <div class="pvn-dot"></div>
          <div class="pvn-head"><h3>${p.title}</h3>${p.years ? `<span class="pvn-years">${p.years}</span>` : ''}</div>
          <ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        </article>`;
      });
      html += `</div></div></section>`;
    });

    if (model.patentsLine) {
      html += `<p class="pvn-patents">${model.patentsLine}</p>`;
    }

    html += '</main></div></div>';
    return html;
  }
};
