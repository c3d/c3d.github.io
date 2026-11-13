import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import contentData from './content-data.json';

// ============================================================================
// Logo-inspired theme palette
// ============================================================================

const THEME_COLORS = {
  'Languages & Compilers': 0x4a90ff,
  'Systems & Virtualization': 0xff4a5a,
  'Games & 3D': 0x5dff6a,
  'Physics': 0xffb040,
  'Art & Culture': 0xff5ad6,
  'Tools & Apps': 0x40e0ff
};

const THEME_POSITIONS = {
  'Languages & Compilers': { x: -70, y: 28, z: -8 },
  'Systems & Virtualization': { x: 70, y: 28, z: -8 },
  'Games & 3D': { x: 0, y: -52, z: -35 },
  'Physics': { x: -52, y: 55, z: 40 },
  'Art & Culture': { x: 52, y: -28, z: 40 },
  'Tools & Apps': { x: 0, y: 18, z: -65 }
};

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rgbOf(hex) {
  const c = new THREE.Color(hex);
  return `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
}

function makeSoftDiscTexture(innerRGB) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(255,255,255,1)`);
  g.addColorStop(0.18, `rgba(${innerRGB},1)`);
  g.addColorStop(0.45, `rgba(${innerRGB},0.35)`);
  g.addColorStop(1, `rgba(${innerRGB},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function makeLabelTexture(text, hex) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 640, 96);
  ctx.fillStyle = 'rgba(4,10,20,0.55)';
  ctx.beginPath();
  ctx.roundRect?.(48, 24, 544, 48, 10);
  if (!ctx.roundRect) {
    ctx.rect(48, 24, 544, 48);
  }
  ctx.fill();
  ctx.font = '600 30px Orbitron, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `#${new THREE.Color(hex).getHexString()}`;
  ctx.fillText(text, 320, 48);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ============================================================================
// State
// ============================================================================

let camera, scene, renderer, composer, bloomPass;
let stars = []; // one per CV bullet
let projects = [];
let labelSprites = [];
let nebulaGroups = [];
let currentStar = null;
let isFlying = false;
let softWhiteDisc;
const softThemeDiscs = {};
const clock = new THREE.Clock();

let controls = {
  mouseDown: false,
  mouseX: 0,
  mouseY: 0,
  targetRotationX: 0.28,
  targetRotationY: 0.42,
  currentRotationX: 0.28,
  currentRotationY: 0.42,
  targetZoom: 170,
  currentZoom: 170
};

// ============================================================================
// Scene
// ============================================================================

function initScene() {
  softWhiteDisc = makeSoftDiscTexture('255,255,255');
  Object.keys(THEME_COLORS).forEach((theme) => {
    softThemeDiscs[theme] = makeSoftDiscTexture(rgbOf(THEME_COLORS[theme]));
  });

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 2500);
  updateCameraFromControls();
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x03060f);
  scene.fog = new THREE.FogExp2(0x03060f, 0.008);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.82;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.32,
    0.6,
    0.85
  );
  composer.addPass(bloomPass);

  createDistantField();
}

function updateCameraFromControls() {
  const radius = controls.currentZoom;
  const rx = controls.currentRotationX;
  const ry = controls.currentRotationY;
  camera.position.x = Math.sin(ry) * Math.cos(rx) * radius;
  camera.position.z = Math.cos(ry) * Math.cos(rx) * radius;
  camera.position.y = Math.sin(rx) * radius * 0.5 + 16;
}

function createSoftSprite(hex, scale, opacity) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeSoftDiscTexture(rgbOf(hex)),
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: true
  }));
  sprite.scale.set(scale, scale, 1);
  return sprite;
}

function createDistantField() {
  const colors = [0xff6666, 0xffaa55, 0xffff88, 0x88ff88, 0x88aaff, 0xcc88ff, 0xff88dd];
  const rand = mulberry32(42);
  const group = new THREE.Group();
  for (let i = 0; i < 180; i++) {
    const r = 380 + rand() * 700;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const sprite = createSoftSprite(colors[i % colors.length], 2.5 + rand() * 4, 0.28);
    sprite.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    group.add(sprite);
  }
  scene.add(group);
}

function createNebulae() {
  Object.keys(THEME_POSITIONS).forEach((theme, ti) => {
    const pos = THEME_POSITIONS[theme];
    const color = THEME_COLORS[theme];
    const rand = mulberry32(2000 + ti * 19);
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    for (let i = 0; i < 40; i++) {
      const x = (rand() - 0.5) * 44;
      const y = (rand() - 0.5) * 28;
      const z = (rand() - 0.5) * 36;
      const fall = Math.exp(-(x * x + y * y * 1.3 + z * z) / 780);
      if (fall < 0.12) continue;
      const sprite = createSoftSprite(color, 7 + fall * 16, 0.045 + fall * 0.1);
      sprite.position.set(x, y, z);
      sprite.userData._baseOp = sprite.material.opacity;
      group.add(sprite);
    }

    const themeLabel = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeLabelTexture(theme, color),
      transparent: true,
      depthWrite: false,
      opacity: 0.85
    }));
    themeLabel.position.set(0, 30, 0);
    themeLabel.scale.set(46, 7, 1);
    themeLabel.userData.isLabel = true;
    themeLabel.userData.baseOpacity = 0.85;
    group.add(themeLabel);
    labelSprites.push(themeLabel);

    scene.add(group);
    nebulaGroups.push({ group, theme, phase: rand() * Math.PI * 2 });
  });
}

/**
 * Each Markdown bullet → one star, clustered by project inside its theme nebula.
 */
function createStarsFromBullets(projectList) {
  projects = projectList;
  createNebulae();

  // Group projects by theme for local offsets
  const byTheme = {};
  projectList.forEach((p) => {
    const theme = p.theme || 'Tools & Apps';
    if (!byTheme[theme]) byTheme[theme] = [];
    byTheme[theme].push(p);
  });

  Object.keys(byTheme).forEach((theme) => {
    const themePos = THEME_POSITIONS[theme];
    const color = THEME_COLORS[theme];
    const plist = byTheme[theme];
    const themeRand = mulberry32(theme.split('').reduce((a, c) => a + c.charCodeAt(0), 0));

    plist.forEach((project, pi) => {
      // Project cluster center within nebula
      const cluster = new THREE.Vector3(
        themePos.x + (themeRand() - 0.5) * 28,
        themePos.y + (themeRand() - 0.5) * 20,
        themePos.z + (themeRand() - 0.5) * 24
      );

      // Project label only for high-weight projects
      if ((project.weight || 0) >= 10) {
        const pl = new THREE.Sprite(new THREE.SpriteMaterial({
          map: makeLabelTexture(project.title, color),
          transparent: true,
          depthWrite: false,
          opacity: 0.8
        }));
        pl.position.copy(cluster).add(new THREE.Vector3(0, 8, 0));
        pl.scale.set(34, 5.2, 1);
        pl.userData.isLabel = true;
        pl.userData.baseOpacity = 0.8;
        scene.add(pl);
        labelSprites.push(pl);
      }

      const bullets = project.bullets || [];
      const n = Math.max(bullets.length, 1);
      bullets.forEach((bullet, bi) => {
        const br = mulberry32(10000 + pi * 97 + bi * 13);
        // Spread bullets in a small shell around the project cluster
        const angle = (bi / n) * Math.PI * 2 + br() * 0.4;
        const radius = 4 + br() * 7;
        const position = new THREE.Vector3(
          cluster.x + Math.cos(angle) * radius,
          cluster.y + (br() - 0.5) * 6,
          cluster.z + Math.sin(angle) * radius
        );

        const weight = project.weight || 5;
        const size = 1.1 + (weight / 10) * 1.6;

        const group = new THREE.Group();
        const halo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: softThemeDiscs[theme] || softWhiteDisc,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: 0.8,
          fog: true
        }));
        halo.scale.set(size * 2.2, size * 2.2, 1);
        group.add(halo);

        const core = new THREE.Sprite(new THREE.SpriteMaterial({
          map: softWhiteDisc,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: 0.95,
          fog: true
        }));
        core.scale.set(size * 0.45, size * 0.45, 1);
        group.add(core);
        group.position.copy(position);
        scene.add(group);

        stars.push({
          mesh: group,
          halo,
          position,
          color,
          size,
          bullet,
          project,
          id: `${project.id}__${bi}`
        });
      });
    });
  });

  createProjectLineages();

  window.stars = stars;
  window.scene = scene;
  window.camera = camera;
  console.log(`Created ${stars.length} bullet-stars from ${projectList.length} projects`);
}

function createProjectLineages() {
  // Connect related projects via their cluster centroids (first bullet of each)
  const firstByProject = {};
  stars.forEach((s) => {
    if (!firstByProject[s.project.id]) firstByProject[s.project.id] = s;
  });

  Object.values(firstByProject).forEach((star) => {
    (star.project.related || []).forEach((rid) => {
      const other = firstByProject[rid];
      if (!other) return;
      const geom = new THREE.BufferGeometry().setFromPoints([star.position, other.position]);
      const mid = new THREE.Color(star.color).lerp(new THREE.Color(other.color), 0.5);
      scene.add(new THREE.Line(geom, new THREE.LineBasicMaterial({
        color: mid,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })));
    });
  });
}

function updateLabelVisibility() {
  const camPos = camera.position;
  labelSprites.forEach((label) => {
    const world = new THREE.Vector3();
    label.getWorldPosition(world);
    const dist = world.distanceTo(camPos);
    let opacity = label.userData.baseOpacity || 0.8;
    if (dist > 240) opacity *= Math.max(0, 1 - (dist - 240) / 100);
    if (currentStar) opacity *= 0.2;
    label.material.opacity = opacity;
    label.visible = opacity > 0.06;
  });
}

function setSceneFocus(focused) {
  bloomPass.strength = focused ? 0.16 : 0.32;
  renderer.toneMappingExposure = focused ? 0.45 : 0.82;
  const title = document.getElementById('title-overlay');
  if (title) title.style.opacity = focused ? '0' : '1';
  const controlsEl = document.getElementById('controls');
  if (controlsEl) controlsEl.style.opacity = focused ? '0' : '1';
  nebulaGroups.forEach(({ group }) => {
    group.traverse((obj) => {
      if (obj.isSprite && !obj.userData.isLabel) {
        const base = obj.userData._baseOp ?? 0.1;
        obj.material.opacity = focused ? base * 0.3 : base;
      }
    });
  });
}

// ============================================================================
// Sci-fi HUD (right panel / mobile bottom sheet)
// ============================================================================

function openHUD(star) {
  currentStar = star;
  setSceneFocus(true);

  const hud = document.getElementById('hud');
  const project = star.project;
  const bullet = star.bullet;
  const themeColor = `#${new THREE.Color(star.color).getHexString()}`;

  hud.style.setProperty('--hud-accent', themeColor);
  hud.querySelector('[data-hud="theme"]').textContent = project.theme || '';
  hud.querySelector('[data-hud="project"]').textContent = project.title || '';
  hud.querySelector('[data-hud="years"]').textContent = project.years || '—';
  hud.querySelector('[data-hud="section"]').textContent = bullet.section || 'DATUM';
  hud.querySelector('[data-hud="bullet"]').textContent = bullet.text || '';

  // Index readout
  const idx = stars.indexOf(star);
  hud.querySelector('[data-hud="index"]').textContent =
    `NODE ${String(idx + 1).padStart(3, '0')} / ${String(stars.length).padStart(3, '0')}`;

  // Media / links from parent project
  const media = hud.querySelector('[data-hud="media"]');
  media.innerHTML = '';
  if (project.videos && project.videos.length) {
    project.videos.forEach((id) => {
      const wrap = document.createElement('div');
      wrap.className = 'hud-video';
      wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
      media.appendChild(wrap);
    });
  }
  if (project.links && project.links.length) {
    const links = document.createElement('div');
    links.className = 'hud-links';
    project.links.forEach((l) => {
      const a = document.createElement('a');
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = l.label;
      links.appendChild(a);
    });
    media.appendChild(links);
  }

  hud.classList.add('open');
  hud.setAttribute('aria-hidden', 'false');
  window.location.hash = star.id;
  flyToStar(star);
}

function closeHUD() {
  if (!currentStar) return;
  currentStar = null;
  setSceneFocus(false);
  const hud = document.getElementById('hud');
  hud.classList.remove('open');
  hud.setAttribute('aria-hidden', 'true');
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}
window.closeHUD = closeHUD;

function flyToStar(star) {
  isFlying = true;
  const startPos = camera.position.clone();
  // Bring the bullet-star near screen center, leave room for right HUD on desktop
  const isMobile = window.innerWidth < 768;
  const endPos = star.position.clone().add(new THREE.Vector3(
    isMobile ? 0 : -14,
    4,
    isMobile ? 36 : 32
  ));
  const startLook = star.position.clone();
  // approximate current look-at
  const tmp = new THREE.Vector3(0, 0, 0);
  const look = tmp.clone();
  const endLook = star.position.clone();
  const start = performance.now();
  const duration = 1100;

  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(startPos, endPos, e);
    look.lerpVectors(startLook, endLook, e);
    camera.lookAt(look);
    if (t < 1) requestAnimationFrame(step);
    else isFlying = false;
  }
  requestAnimationFrame(step);
}

function enterOverviewMode() {
  closeHUD();
  isFlying = true;
  controls.targetRotationX = 0.28;
  controls.targetRotationY = 0.42;
  controls.targetZoom = 170;
  controls.currentRotationX = 0.28;
  controls.currentRotationY = 0.42;
  controls.currentZoom = 170;
  const startPos = camera.position.clone();
  updateCameraFromControls();
  const endPos = camera.position.clone();
  camera.position.copy(startPos);
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / 1000, 1);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(startPos, endPos, e);
    camera.lookAt(0, 0, 0);
    if (t < 1) requestAnimationFrame(step);
    else isFlying = false;
  }
  requestAnimationFrame(step);
}

// ============================================================================
// Interaction
// ============================================================================

function setupInteraction() {
  const container = document.getElementById('canvas-container');
  const raycaster = new THREE.Raycaster();
  raycaster.params.Points = { threshold: 1.5 };
  const mouse = new THREE.Vector2();
  let dragDist = 0;

  // Expand hit area: use invisible spheres on stars for picking
  stars.forEach((s) => {
    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(1.8, s.size * 0.9), 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    s.mesh.add(hit);
    s.hit = hit;
  });

  const onDown = (x, y) => {
    controls.mouseDown = true;
    controls.mouseX = x;
    controls.mouseY = y;
    dragDist = 0;
  };
  const onMove = (x, y) => {
    if (!controls.mouseDown || currentStar || isFlying) return;
    const dx = x - controls.mouseX;
    const dy = y - controls.mouseY;
    dragDist += Math.abs(dx) + Math.abs(dy);
    controls.targetRotationY += dx * 0.004;
    controls.targetRotationX = Math.max(-1.1, Math.min(1.1, controls.targetRotationX + dy * 0.004));
    controls.mouseX = x;
    controls.mouseY = y;
  };

  container.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
  container.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  container.addEventListener('mouseup', () => { controls.mouseDown = false; });
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });
  container.addEventListener('touchend', () => { controls.mouseDown = false; });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    controls.targetZoom = Math.max(90, Math.min(320, controls.targetZoom + e.deltaY * 0.07));
  }, { passive: false });

  container.addEventListener('click', (e) => {
    if (dragDist > 8 || isFlying) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(stars.map((s) => s.mesh), true);
    if (!hits.length) return;
    let obj = hits[0].object;
    while (obj && !stars.find((s) => s.mesh === obj)) obj = obj.parent;
    const star = stars.find((s) => s.mesh === obj);
    if (star) openHUD(star);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeHUD();
    else if (e.key === 'o' || e.key === 'O') enterOverviewMode();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  document.getElementById('hud-close')?.addEventListener('click', closeHUD);
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  if (!currentStar && !isFlying) {
    controls.targetRotationY += 0.00025;
    controls.currentRotationX += (controls.targetRotationX - controls.currentRotationX) * 0.05;
    controls.currentRotationY += (controls.targetRotationY - controls.currentRotationY) * 0.05;
    controls.currentZoom += (controls.targetZoom - controls.currentZoom) * 0.05;
    updateCameraFromControls();
    camera.lookAt(0, 0, 0);
  }

  nebulaGroups.forEach(({ group, theme, phase }) => {
    const base = THEME_POSITIONS[theme];
    group.position.y = base.y + Math.sin(t * 0.12 + phase) * 1.1;
  });

  updateLabelVisibility();
  composer.render();
}

function generatePrintView(data) {
  // Baseline — full QR in PR B
  const printView = document.getElementById('print-view');
  let html = '<h1>Christophe de Dinechin</h1><p class="subtitle">Software as a Passion</p>';
  const themes = {};
  data.forEach((item) => {
    const theme = item.theme || 'Other';
    if (!themes[theme]) themes[theme] = [];
    themes[theme].push(item);
  });
  Object.keys(themes).forEach((theme) => {
    themes[theme].sort((a, b) => (b.weight || 0) - (a.weight || 0));
    html += `<div class="theme-section"><h2>${theme}</h2>`;
    themes[theme].slice(0, 5).forEach((item) => {
      html += `<div class="project"><h3>${item.title}</h3>`;
      if (item.years) html += `<div class="years">${item.years}</div>`;
      if (item.bullets?.length) {
        html += '<ul>';
        item.bullets.slice(0, 5).forEach((b) => { html += `<li>${b.text}</li>`; });
        html += '</ul>';
      }
      html += '</div>';
    });
    html += '</div>';
  });
  html += `<div class="qr-section"><img src="/cv/logo.png" alt=""><div class="qr-text"><p><strong>https://c3d.github.io/cv/</strong></p></div></div>`;
  printView.innerHTML = html;
}

async function init() {
  console.log('Initializing 3D CV...');
  initScene();
  console.log(`Loaded ${contentData.length} projects from bundled content`);
  createStarsFromBullets(contentData);
  setupInteraction();
  generatePrintView(contentData);
  document.getElementById('loading').classList.add('hidden');

  if (window.location.hash) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const star = stars.find((s) => s.id === id);
    if (star) setTimeout(() => openHUD(star), 500);
  }

  animate();
}

init().catch((err) => {
  console.error(err);
  document.getElementById('loading').innerHTML = '<p>Failed to load. Please refresh.</p>';
});
