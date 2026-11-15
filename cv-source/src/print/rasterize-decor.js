/**
 * Chromium's PDF backend mishandles SVG header decor: stop-opacity gradients,
 * rgba() strokes, and per-element opacity flatten into a washed / flattened look
 * even with print-color-adjust: exact. Screen print preview stays correct because
 * Blink paints SVG; PDF export does not.
 *
 * Bake decorative SVG layers to PNG before print/PDF so output matches the web view.
 */

const DECOR_LAYERS = [
  { selector: '.pvn-space', background: '#050b18' },
  { selector: '.pvo-header-wave', background: '#0a1628' }
];

/**
 * @param {Element | Document} root
 * @returns {Promise<void>}
 */
export async function rasterizePrintDecor(root = document) {
  await Promise.all(
    DECOR_LAYERS.map(({ selector, background }) => {
      const el = root.querySelector?.(selector) ?? null;
      return bakeSvgContainer(el, background);
    })
  );
}

/**
 * @param {Element | null} container
 * @param {string} background
 */
async function bakeSvgContainer(container, background) {
  if (!container || container.dataset.rasterized === '1') return;
  const svg = container.querySelector('svg');
  if (!svg) return;

  const rect = container.getBoundingClientRect();
  const cssW = Math.max(1, rect.width || container.clientWidth || 1);
  const cssH = Math.max(1, rect.height || container.clientHeight || 1);
  const scale = Math.min(3, Math.max(2, window.devicePixelRatio || 2));
  const w = Math.round(cssW * scale);
  const h = Math.round(cssH * scale);

  const clone = svg.cloneNode(true);
  clone.setAttribute('width', String(cssW));
  clone.setAttribute('height', String(cssH));
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }

  const xml = new XMLSerializer().serializeToString(clone);
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  const img = new Image();
  img.decoding = 'sync';
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  const png = canvas.toDataURL('image/png');
  container.innerHTML =
    `<img alt="" aria-hidden="true" src="${png}" ` +
    `style="width:100%;height:100%;display:block;object-fit:cover">`;
  container.dataset.rasterized = '1';
}
