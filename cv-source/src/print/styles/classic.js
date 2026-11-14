import { TECH_TAGS, TECH_TAG_TOPIC_IDS, topicHref, clusterHref, entryTitleLink } from '../icons.js';

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
        <h2><a class="pv-deep pv-deep-on-dark" href="${clusterHref(theme.name)}">${theme.name}</a></h2>`;
      theme.projects.forEach((p) => {
        html += `<div class="pvc-project"><h3>${entryTitleLink(p.id, p.title, p.titleHref ? { href: p.titleHref } : {})}</h3>`;
        if (p.years) html += `<span class="pvc-years">${p.years}</span>`;
        if (p.bullets.length) {
          html += '<ul>';
          p.bullets.forEach((b) => { html += `<li>${b}</li>`; });
          html += '</ul>';
        }
        html += '</div>';
      });
      html += '</section>';
    });
    html += `<div class="pvc-tech">${TECH_TAGS.map((t) => {
      const tid = TECH_TAG_TOPIC_IDS[t];
      return tid
        ? `<a class="pv-deep" href="${topicHref(tid)}">${t}</a>`
        : `<span>${t}</span>`;
    }).join('')}</div>`;
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
