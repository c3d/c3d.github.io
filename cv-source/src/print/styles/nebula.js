import { THEME_ICONS, TECH_TAGS, techTagLink, clusterTitleLink, entryTitleLink } from '../icons.js';

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
    // Deterministic starfield: varied size/brightness, denser on the right so
    // header text on the left stays crisp against the deep-space fill.
    const stars = Array.from({ length: 42 }, (_, i) => {
      const x = (i * 53 + 11) % 392 + 4;
      const y = (i * 29 + 7) % 108 + 6;
      const bright = i % 7 === 0;
      const mid = i % 3 === 0;
      const r = bright ? 1.55 : mid ? 0.95 : 0.55;
      const op = bright ? 0.85 : mid ? 0.55 : 0.28 + (i % 5) * 0.06;
      const fill = bright ? '#e8f4ff' : '#fff';
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${op.toFixed(2)}"/>`;
    }).join('');

    let html = `<div class="pv-nebula">
      <header class="pvn-header">
        <div class="pvn-space" aria-hidden="true">
          <svg class="pvn-starfield" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="pvnNeb1" cx="70%" cy="40%" r="45%"><stop offset="0%" stop-color="#4a90ff" stop-opacity=".55"/><stop offset="100%" stop-color="#4a90ff" stop-opacity="0"/></radialGradient>
              <radialGradient id="pvnNeb2" cx="85%" cy="70%" r="40%"><stop offset="0%" stop-color="#ff5ad6" stop-opacity=".4"/><stop offset="100%" stop-color="#ff5ad6" stop-opacity="0"/></radialGradient>
              <radialGradient id="pvnNeb3" cx="55%" cy="60%" r="35%"><stop offset="0%" stop-color="#40e0ff" stop-opacity=".35"/><stop offset="100%" stop-color="#40e0ff" stop-opacity="0"/></radialGradient>
              <linearGradient id="pvnCometTail1" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stop-color="#40e0ff" stop-opacity="0"/>
                <stop offset="55%" stop-color="#9cf0ff" stop-opacity=".35"/>
                <stop offset="100%" stop-color="#fff" stop-opacity=".9"/>
              </linearGradient>
              <linearGradient id="pvnCometTail2" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stop-color="#ff5ad6" stop-opacity="0"/>
                <stop offset="60%" stop-color="#ff9ad6" stop-opacity=".3"/>
                <stop offset="100%" stop-color="#fff" stop-opacity=".85"/>
              </linearGradient>
              <radialGradient id="pvnCometHead" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
                <stop offset="45%" stop-color="#cfefff" stop-opacity=".9"/>
                <stop offset="100%" stop-color="#40e0ff" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <rect width="400" height="120" fill="#050b18"/>
            <rect width="400" height="120" fill="url(#pvnNeb1)"/>
            <rect width="400" height="120" fill="url(#pvnNeb2)"/>
            <rect width="400" height="120" fill="url(#pvnNeb3)"/>
            <g fill="#fff">${stars}</g>
            <!-- Planetary orbital arcs (right/center — keep left text clear) -->
            <g fill="none" stroke-linecap="round" opacity="0.9">
              <ellipse cx="318" cy="62" rx="78" ry="34" stroke="rgba(180,220,255,.28)" stroke-width="0.7"
                transform="rotate(-18 318 62)" stroke-dasharray="210 320"/>
              <ellipse cx="318" cy="62" rx="58" ry="24" stroke="rgba(64,224,255,.32)" stroke-width="0.65"
                transform="rotate(-18 318 62)" stroke-dasharray="150 240"/>
              <ellipse cx="318" cy="62" rx="40" ry="16" stroke="rgba(255,90,214,.26)" stroke-width="0.55"
                transform="rotate(-18 318 62)" stroke-dasharray="95 180"/>
              <ellipse cx="255" cy="78" rx="52" ry="18" stroke="rgba(180,220,255,.22)" stroke-width="0.55"
                transform="rotate(12 255 78)" stroke-dasharray="120 200"/>
              <!-- Soft partial arc sweeps -->
              <path d="M210 95 Q255 48 318 38 Q360 32 392 55" stroke="rgba(180,220,255,.3)" stroke-width="0.7"/>
              <path d="M230 18 Q280 55 340 88" stroke="rgba(64,224,255,.22)" stroke-width="0.55"/>
            </g>
            <!-- Small "planets" on the orbits -->
            <g>
              <circle cx="318" cy="62" r="2.4" fill="#9cf" opacity="0.85"/>
              <circle cx="318" cy="62" r="4.5" fill="none" stroke="rgba(156,204,255,.35)" stroke-width="0.5"/>
              <circle cx="372" cy="48" r="1.7" fill="#fff" opacity="0.9"/>
              <circle cx="278" cy="82" r="1.5" fill="#ff9ad6" opacity="0.75"/>
              <circle cx="350" cy="78" r="1.3" fill="#40e0ff" opacity="0.8"/>
            </g>
            <!-- Comets: bright head + tapering curved tail -->
            <g>
              <path d="M168 22 C198 28, 228 40, 252 58" fill="none" stroke="url(#pvnCometTail1)" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M168 22 C198 28, 228 40, 252 58" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="0.7" stroke-linecap="round"/>
              <circle cx="252" cy="58" r="2.6" fill="url(#pvnCometHead)"/>
              <circle cx="252" cy="58" r="1.2" fill="#fff"/>
              <path d="M392 18 C360 28, 338 48, 322 72" fill="none" stroke="url(#pvnCometTail2)" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="322" cy="72" r="2.1" fill="#fff" opacity="0.95"/>
              <circle cx="322" cy="72" r="3.4" fill="url(#pvnCometHead)" opacity="0.7"/>
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
              return `<li><span class="pvn-check" style="background:${c}">✓</span>${clusterTitleLink(t)}</li>`;
            }).join('')}</ul>
          </section>
          <section class="pvn-card"><h2>Info</h2>
            <ul class="pvn-info">
              ${model.educationHtml || model.education ? `<li><span>★</span><span>${model.educationHtml || model.education}</span></li>` : ''}
              <li><span>✉</span><span>${model.email}</span></li>
              <li><span>⌘</span><span>${model.github.replace(/^https?:\/\//, '')}</span></li>
              <li><span>◉</span><span>${model.website.replace(/^https?:\/\//, '')}</span></li>
            </ul>
          </section>
          <section class="pvn-card"><h2>Technologies</h2>
            <div class="pvn-tags">${TECH_TAGS.map((t) => techTagLink(t)).join('')}</div>
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
        <div class="pvn-bar"><span class="pvn-ico">${icon}</span><h2>${clusterTitleLink(theme.name, { onDark: true })}</h2></div>
        <div class="pvn-theme-body">
          <div class="pvn-timeline">`;
      theme.projects.forEach((p) => {
        html += `<article class="pvn-project">
          <div class="pvn-dot"></div>
          <div class="pvn-head"><h3>${entryTitleLink(p.id, p.title, p.titleHref ? { href: p.titleHref } : {})}</h3>${p.years ? `<span class="pvn-years">${p.years}</span>` : ''}</div>
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
