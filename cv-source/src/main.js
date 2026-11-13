import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import contentData from './content-data.json';

// ============================================================================
// Configuration — palette from Christophe's lightbulb logo rainbow rays
// ============================================================================

const THEME_COLORS = {
  'Languages & Compilers': 0x4488ff,
  'Systems & Virtualization': 0xff4444,
  'Games & 3D': 0x44ff44,
  'Physics': 0xffaa00,
  'Art & Culture': 0xff44ff,
  'Tools & Apps': 0x00ddff
};

// Compact layout so everything is visible from the initial camera
const THEME_POSITIONS = {
  'Languages & Compilers': { x: -55, y: 25, z: 0 },
  'Systems & Virtualization': { x: 55, y: 25, z: 0 },
  'Games & 3D': { x: 0, y: -45, z: -30 },
  'Physics': { x: -45, y: 45, z: 35 },
  'Art & Culture': { x: 45, y: -25, z: 35 },
  'Tools & Apps': { x: 0, y: 15, z: -55 }
};

// Deterministic PRNG so layout is stable across loads
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================================
// State
// ============================================================================

let camera, scene, renderer, cssRenderer, composer;
let stars = [];
let starData = [];
let currentCard = null;
let isFlying = false;

let controls = {
  mouseDown: false,
  mouseX: 0,
  mouseY: 0,
  // Slightly elevated angled view — constellation fills the frame
  targetRotationX: 0.35,
  targetRotationY: 0.55,
  currentRotationX: 0.35,
  currentRotationY: 0.55,
  targetZoom: 140,
  currentZoom: 140
};

// ============================================================================
// Content (bundled at build time — no fetch, no Node Buffer)
// ============================================================================

async function loadContent() {
  console.log(`Loaded ${contentData.length} projects from bundled content`);
  return contentData;
}

// ============================================================================
// Scene Setup
// ============================================================================

function initScene() {
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.5,
    2000
  );
  updateCameraFromControls();
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02040a);
  scene.fog = new THREE.FogExp2(0x02040a, 0.004);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = '0';
  cssRenderer.domElement.style.pointerEvents = 'none';
  document.getElementById('ui-overlay').appendChild(cssRenderer.domElement);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.15, // strength — glow without washing out labels
    0.4,  // radius
    0.25  // threshold
  );
  composer.addPass(bloomPass);

  createBackgroundStars();
}

function updateCameraFromControls() {
  const radius = controls.currentZoom;
  const rx = controls.currentRotationX;
  const ry = controls.currentRotationY;
  camera.position.x = Math.sin(ry) * Math.cos(rx) * radius;
  camera.position.z = Math.cos(ry) * Math.cos(rx) * radius;
  camera.position.y = Math.sin(rx) * radius * 0.65 + 20;
}

function createBackgroundStars() {
  const colors = [0xff4444, 0xff8800, 0xffff00, 0x44ff44, 0x4488ff, 0x8844ff, 0xff44ff];
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const vertexColors = [];
  const rand = mulberry32(42);

  for (let i = 0; i < 800; i++) {
    // Distant field — don't compete with the constellation
    const r = 250 + rand() * 600;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    vertices.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    const c = new THREE.Color(colors[i % colors.length]);
    vertexColors.push(c.r, c.g, c.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(vertexColors, 3));

  scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  })));
}

// ============================================================================
// Glow textures / labels
// ============================================================================

function makeGlowTexture(hex) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const c = new THREE.Color(hex);
  const rgb = `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, `rgba(255,255,255,1)`);
  g.addColorStop(0.15, `rgba(${rgb},1)`);
  g.addColorStop(0.45, `rgba(${rgb},0.45)`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function makeLabelTexture(text, hex) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 640, 128);
  // Soft plate behind text for readability
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  roundRect(ctx, 40, 28, 560, 72, 16);
  ctx.fill();
  ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `#${new THREE.Color(hex).getHexString()}`;
  ctx.fillText(text, 320, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ============================================================================
// Stars, nebulae, connections
// ============================================================================

function createNebulae() {
  Object.keys(THEME_POSITIONS).forEach((theme, ti) => {
    const pos = THEME_POSITIONS[theme];
    const color = THEME_COLORS[theme];
    const rand = mulberry32(1000 + ti * 17);
    const count = 280;
    const positions = [];
    const colors = [];

    for (let i = 0; i < count; i++) {
      // Soft ellipsoidal cloud around theme center
      const rx = (rand() - 0.5) * 55;
      const ry = (rand() - 0.5) * 40;
      const rz = (rand() - 0.5) * 45;
      positions.push(pos.x + rx, pos.y + ry, pos.z + rz);
      const c = new THREE.Color(color);
      // Slight luminance variation
      const f = 0.55 + rand() * 0.45;
      colors.push(c.r * f, c.g * f, c.b * f);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    })));

    // Theme label at nebula center
    const themeLabel = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeLabelTexture(theme, color),
      transparent: true,
      depthWrite: false
    }));
    themeLabel.position.set(pos.x, pos.y + 28, pos.z);
    themeLabel.scale.set(48, 9.6, 1);
    scene.add(themeLabel);
  });
}

function createStars(data) {
  starData = data;
  createNebulae();

  const rand = mulberry32(7);

  data.forEach((item, index) => {
    const theme = item.theme || 'Tools & Apps';
    const color = THEME_COLORS[theme] || 0xffffff;
    const weight = item.weight || 5;
    // Substantial stars — weight 10 ≈ diameter ~18 world units
    const size = 3.5 + (weight / 10) * 14;

    const themePos = THEME_POSITIONS[theme] || { x: 0, y: 0, z: 0 };
    const spread = 22;
    const position = new THREE.Vector3(
      themePos.x + (rand() - 0.5) * spread,
      themePos.y + (rand() - 0.5) * spread,
      themePos.z + (rand() - 0.5) * spread
    );

    const glowGroup = new THREE.Group();

    // Bright core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(size * 0.35, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    glowGroup.add(core);

    // Colored body
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(size * 0.55, 24, 24),
      new THREE.MeshBasicMaterial({ color })
    );
    glowGroup.add(body);

    // Additive glow sprite (main visual punch)
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(color),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    }));
    sprite.scale.set(size * 4.5, size * 4.5, 1);
    glowGroup.add(sprite);

    glowGroup.position.copy(position);
    scene.add(glowGroup);

    // Project labels for bright stars
    if (weight >= 8) {
      const label = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeLabelTexture(item.title, color),
        transparent: true,
        depthWrite: false
      }));
      label.position.set(position.x, position.y + size * 1.4, position.z);
      label.scale.set(36, 7.2, 1);
      scene.add(label);
    }

    stars.push({
      mesh: glowGroup,
      data: item,
      position,
      color,
      size,
      index
    });
  });

  createConnections();

  // Debug hooks for verification scripts
  window.stars = stars;
  window.scene = scene;
  window.camera = camera;
  window.starData = starData;
  window.controls = controls;

  console.log(`Created ${stars.length} stars, scene children: ${scene.children.length}`);
}

function createConnections() {
  stars.forEach((star) => {
    if (!star.data.related) return;
    star.data.related.forEach((relatedId) => {
      const related = stars.find((s) => s.data.id === relatedId);
      if (!related) return;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        star.position,
        related.position
      ]);
      const midColor = new THREE.Color(star.color).lerp(new THREE.Color(related.color), 0.5);
      scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: midColor,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      })));
    });
  });
}

// ============================================================================
// Cards
// ============================================================================

function createCard(star) {
  if (currentCard) closeCard();

  const data = star.data;
  const cardElement = document.createElement('div');
  cardElement.className = 'star-card';
  cardElement.style.pointerEvents = 'auto';

  let logoHtml = '';
  if (data.id === 'intro') {
    logoHtml = '<img src="/cv/logo.png" alt="Christophe de Dinechin" style="width:100px;height:100px;margin:0 auto 20px;display:block;">';
  }

  let html = `
    <button class="close-button" onclick="window.closeCard()">×</button>
    ${logoHtml}
    <h2>${data.title}</h2>
    <div class="meta">
      ${data.theme ? `<span class="theme-badge">${data.theme}</span>` : ''}
      ${data.years ? `<span class="years">${data.years}</span>` : ''}
    </div>
    <div class="content">${data.content}</div>
  `;

  if (data.videos && data.videos.length) {
    data.videos.forEach((videoId) => {
      html += `
        <div class="video-container">
          <iframe
            src="https://www.youtube.com/embed/${videoId}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>`;
    });
  }

  if (data.links && data.links.length) {
    html += '<div class="links">';
    data.links.forEach((link) => {
      html += `<a href="${link.url}" target="_blank" rel="noopener" class="link-button">${link.label}</a>`;
    });
    html += '</div>';
  }

  cardElement.innerHTML = html;

  // DOM overlay card (reliable on mobile + desktop; CSS3D kept for scene depth)
  cardElement.style.position = 'fixed';
  cardElement.style.top = '50%';
  cardElement.style.left = '50%';
  cardElement.style.transform = 'translate(-50%, -50%)';
  cardElement.style.zIndex = '20';
  document.body.appendChild(cardElement);

  const cssObject = new CSS3DObject(document.createElement('div'));
  cssObject.position.copy(star.position).add(new THREE.Vector3(0, 0, 40));
  scene.add(cssObject);

  currentCard = { element: cardElement, cssObject, star };
  animateCameraToStar(star);
  window.location.hash = data.id;
}

function closeCard() {
  if (!currentCard) return;
  if (currentCard.element && currentCard.element.parentNode) {
    currentCard.element.parentNode.removeChild(currentCard.element);
  }
  scene.remove(currentCard.cssObject);
  currentCard = null;
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}
window.closeCard = closeCard;

// ============================================================================
// Camera flights
// ============================================================================

function animateCameraToStar(star) {
  isFlying = true;
  const startPos = camera.position.clone();
  const endPos = star.position.clone().add(new THREE.Vector3(0, 12, 55));
  const startLook = new THREE.Vector3(0, 0, 0);
  const endLook = star.position.clone();
  const look = startLook.clone();
  const start = Date.now();
  const duration = 1100;

  function step() {
    const t = Math.min((Date.now() - start) / duration, 1);
    const e = easeInOutCubic(t);
    camera.position.lerpVectors(startPos, endPos, e);
    look.lerpVectors(startLook, endLook, e);
    camera.lookAt(look);
    if (t < 1) requestAnimationFrame(step);
    else isFlying = false;
  }
  step();
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function enterOverviewMode() {
  closeCard();
  isFlying = true;
  controls.targetRotationX = 0.35;
  controls.targetRotationY = 0.55;
  controls.targetZoom = 140;
  controls.currentRotationX = 0.35;
  controls.currentRotationY = 0.55;
  controls.currentZoom = 140;
  const startPos = camera.position.clone();
  updateCameraFromControls();
  const endPos = camera.position.clone();
  camera.position.copy(startPos);
  const start = Date.now();
  function step() {
    const t = Math.min((Date.now() - start) / 1000, 1);
    const e = easeInOutCubic(t);
    camera.position.lerpVectors(startPos, endPos, e);
    camera.lookAt(0, 0, 0);
    if (t < 1) requestAnimationFrame(step);
    else isFlying = false;
  }
  step();
}

// ============================================================================
// Interaction
// ============================================================================

function setupInteraction() {
  const container = document.getElementById('canvas-container');
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let dragDist = 0;

  container.addEventListener('mousedown', (e) => {
    controls.mouseDown = true;
    controls.mouseX = e.clientX;
    controls.mouseY = e.clientY;
    dragDist = 0;
  });

  container.addEventListener('mousemove', (e) => {
    if (!controls.mouseDown || currentCard || isFlying) return;
    const dx = e.clientX - controls.mouseX;
    const dy = e.clientY - controls.mouseY;
    dragDist += Math.abs(dx) + Math.abs(dy);
    controls.targetRotationY += dx * 0.005;
    controls.targetRotationX = Math.max(-1.2, Math.min(1.2, controls.targetRotationX + dy * 0.005));
    controls.mouseX = e.clientX;
    controls.mouseY = e.clientY;
  });

  container.addEventListener('mouseup', () => { controls.mouseDown = false; });

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      controls.mouseDown = true;
      controls.mouseX = e.touches[0].clientX;
      controls.mouseY = e.touches[0].clientY;
      dragDist = 0;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1 || !controls.mouseDown || currentCard || isFlying) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - controls.mouseX;
    const dy = e.touches[0].clientY - controls.mouseY;
    dragDist += Math.abs(dx) + Math.abs(dy);
    controls.targetRotationY += dx * 0.005;
    controls.targetRotationX = Math.max(-1.2, Math.min(1.2, controls.targetRotationX + dy * 0.005));
    controls.mouseX = e.touches[0].clientX;
    controls.mouseY = e.touches[0].clientY;
  }, { passive: false });

  container.addEventListener('touchend', () => { controls.mouseDown = false; });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    controls.targetZoom = Math.max(70, Math.min(320, controls.targetZoom + e.deltaY * 0.08));
  }, { passive: false });

  container.addEventListener('click', (e) => {
    if (dragDist > 8 || currentCard || isFlying) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(stars.map((s) => s.mesh), true);
    if (!hits.length) return;
    let obj = hits[0].object;
    while (obj && !stars.find((s) => s.mesh === obj)) obj = obj.parent;
    const star = stars.find((s) => s.mesh === obj);
    if (star) createCard(star);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCard();
    else if (e.key === 'o' || e.key === 'O') enterOverviewMode();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================================================
// Animation
// ============================================================================

function animate() {
  requestAnimationFrame(animate);

  if (!currentCard && !isFlying) {
    controls.currentRotationX += (controls.targetRotationX - controls.currentRotationX) * 0.06;
    controls.currentRotationY += (controls.targetRotationY - controls.currentRotationY) * 0.06;
    controls.currentZoom += (controls.targetZoom - controls.currentZoom) * 0.06;
    updateCameraFromControls();
    camera.lookAt(0, 0, 0);
  }

  composer.render();
  cssRenderer.render(scene, camera);
}

// ============================================================================
// Print (unchanged baseline — follow-up PR for QR)
// ============================================================================

function generatePrintView(data) {
  const printView = document.getElementById('print-view');
  let html = '<h1>Christophe de Dinechin</h1>';
  html += '<p class="subtitle">Software as a Passion</p>';

  const themes = {};
  data.forEach((item) => {
    const theme = item.theme || 'Other';
    if (!themes[theme]) themes[theme] = [];
    themes[theme].push(item);
  });
  Object.keys(themes).forEach((theme) => {
    themes[theme].sort((a, b) => (b.weight || 0) - (a.weight || 0));
    themes[theme] = themes[theme].slice(0, 5);
  });

  Object.keys(themes).forEach((theme) => {
    html += `<div class="theme-section"><h2>${theme}</h2>`;
    themes[theme].forEach((item) => {
      html += `<div class="project"><h3>${item.title}</h3>`;
      if (item.years) html += `<div class="years">${item.years}</div>`;
      const temp = document.createElement('div');
      temp.innerHTML = item.content;
      const p = temp.querySelector('p');
      if (p) html += `<p>${p.textContent.substring(0, 180)}...</p>`;
      html += '</div>';
    });
    html += '</div>';
  });

  html += `<div class="qr-section">
    <img src="/cv/logo.png" alt="Christophe de Dinechin">
    <div class="qr-text">
      <p><strong>Christophe de Dinechin</strong></p>
      <p>Interactive 3D version:</p>
      <p><strong>https://c3d.github.io/cv/</strong></p>
    </div>
  </div>`;
  printView.innerHTML = html;
}

// ============================================================================
// Init
// ============================================================================

async function init() {
  console.log('Initializing 3D CV...');
  initScene();
  const data = await loadContent();
  console.log(`Loaded ${data.length} projects`);
  createStars(data);
  setupInteraction();
  generatePrintView(data);
  document.getElementById('loading').classList.add('hidden');

  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const star = stars.find((s) => s.data.id === id);
    if (star) setTimeout(() => createCard(star), 400);
  }

  animate();
}

init().catch((error) => {
  console.error('Failed to initialize:', error);
  document.getElementById('loading').innerHTML = '<p>Failed to load. Please refresh.</p>';
});
