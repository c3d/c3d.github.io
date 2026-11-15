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
        <div>
          <h1>${model.name}</h1>
          <p class="pvc-sub">${model.subtitle}</p>
          <p class="pvc-sub">${model.aboutFacts[0] || ''}</p>
        </div>
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
    </footer></div>`;
    return html;
  }
};
