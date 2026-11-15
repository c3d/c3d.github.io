import { TECH_TAGS, techTagLink, clusterTitleLink, entryTitleLink } from '../icons.js';

/** Classic compact print style (original one-pager). */
export const classicStyle = {
  id: 'classic',
  label: 'Classic',
  description: 'Compact colored section bars',
  photo: false,
  photoPlacement: null,
  render(model) {
    let html = `<div class="pv-classic">
      <header class="pvc-header">
        <img class="pvc-logo" src="${model.logoSrc}" alt="">
        <div class="pvc-identity">
          <h1>${model.name}</h1>
          <p class="pvc-sub">${model.subtitle}</p>
          <p class="pvc-sub">${model.aboutFacts[0] || ''}</p>
        </div>
        <p class="pvc-about">${model.aboutPara}</p>
      </header>`;
    model.themes.forEach((theme) => {
      html += `<section class="pvc-theme" style="--theme-color:${theme.color}">
        <h2>${clusterTitleLink(theme.name, { onDark: true })}</h2>`;
      theme.projects.forEach((p) => {
        html += `<div class="pvc-project">
          <div class="pvc-meta">
            <h3>${entryTitleLink(p.id, p.title, p.titleHref ? { href: p.titleHref } : {})}</h3>`;
        if (p.years) html += `<div class="pvc-years">${p.years}</div>`;
        html += `</div><div class="pvc-body">`;
        p.bullets.forEach((b) => { html += `<p class="pvc-line">${b}</p>`; });
        html += '</div></div>';
      });
      html += '</section>';
    });
    html += `<div class="pvc-tech">${TECH_TAGS.map((t) => techTagLink(t)).join('')}</div>`;
    if (model.patentsLine) {
      html += `<p class="pvc-patents">${model.patentsLine}</p>`;
    }
    html += `<footer class="pvc-qr">
      <img src="${model.logoSrc}" alt="" class="pvc-logo-sm">
      <a class="pvc-qr-link" href="${model.qrUrl}" target="_blank" rel="noopener">
        <img src="${model.qrSrc}" alt="QR to interactive CV" class="pvc-qr-img" width="64" height="64">
        <div><strong>Interactive constellation</strong><br>${model.qrUrl}<br>${model.email}</div>
      </a>
      <aside class="pvc-info" aria-label="Info">
        <ul class="pvc-info-list">
          ${model.educationHtml || model.education ? `<li><span>★</span><span>${model.educationHtml || model.education}</span></li>` : ''}
          <li><span>✉</span><span>${model.email}</span></li>
          <li><span>⌘</span><span>${model.github.replace(/^https?:\/\//, '')}</span></li>
          <li><span>◉</span><span>${model.website.replace(/^https?:\/\//, '')}</span></li>
        </ul>
      </aside>
    </footer></div>`;
    return html;
  }
};
