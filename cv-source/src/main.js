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
  'Languages & Compilers': { x: -75, y: 32, z: -12 },
  'Systems & Virtualization': { x: 78, y: 30, z: -10 },
  // Spread Games / Art so they no longer sit on top of each other in overview
  'Games & 3D': { x: -70, y: -68, z: -55 },
  'Physics': { x: -48, y: 58, z: 48 },
  'Art & Culture': { x: 82, y: -8, z: 68 },
  'Tools & Apps': { x: 8, y: 22, z: -72 }
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

function makeLabelTexture(text, hex, { large = false } = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const font = large ? '700 44px Orbitron, sans-serif' : '600 34px Orbitron, sans-serif';
  ctx.font = font;
  const textW = Math.ceil(ctx.measureText(text).width);
  const padX = large ? 28 : 36;
  const padY = large ? 20 : 18;
  const boxH = large ? 64 : 52;
  canvas.width = Math.min(1024, Math.max(large ? 420 : 320, textW + padX * 2 + 24));
  canvas.height = boxH + padY * 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // High-contrast plate: near-opaque dark + bright Orbitron text
  ctx.fillStyle = 'rgba(1,6,16,0.88)';
  const boxW = canvas.width - padX * 2;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(padX, padY, boxW, boxH, 10);
  else ctx.rect(padX, padY, boxW, boxH);
  ctx.fill();
  // Accent bar
  ctx.fillStyle = `#${new THREE.Color(hex).getHexString()}`;
  ctx.fillRect(padX, padY, 8, boxH);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, canvas.width / 2 + 4, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  // Aspect for sprite scale callers
  tex.userData = { aspect: canvas.width / canvas.height };
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
let flyGeneration = 0;
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
  scene.fog = new THREE.FogExp2(0x03060f, 0.0045);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // Mid-ground between PR5 washout and over-dark polish
  renderer.toneMappingExposure = 1.18;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.55, // luminous but not white-saturated
    0.6,
    0.72
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

    for (let i = 0; i < 52; i++) {
      const x = (rand() - 0.5) * 44;
      const y = (rand() - 0.5) * 28;
      const z = (rand() - 0.5) * 36;
      const fall = Math.exp(-(x * x + y * y * 1.3 + z * z) / 780);
      if (fall < 0.1) continue;
      const sprite = createSoftSprite(color, 9 + fall * 20, 0.12 + fall * 0.2);
      sprite.position.set(x, y, z);
      sprite.userData._baseOp = sprite.material.opacity;
      group.add(sprite);
    }

    const themeMap = makeLabelTexture(theme, color, { large: true });
    const themeAspect = themeMap.userData?.aspect || 6.5;
    const themeLabel = new THREE.Sprite(new THREE.SpriteMaterial({
      map: themeMap,
      transparent: true,
      depthWrite: false,
      opacity: 1,
      sizeAttenuation: true
    }));
    themeLabel.position.set(0, 38, 0);
    // World size at ~overview distance; clamped in updateLabelVisibility when close
    const themeH = 9.2;
    themeLabel.scale.set(themeH * themeAspect, themeH, 1);
    themeLabel.userData.isLabel = true;
    themeLabel.userData.kind = 'theme';
    themeLabel.userData.baseOpacity = 1;
    themeLabel.userData.baseScale = themeLabel.scale.clone();
    themeLabel.userData.refDist = 160; // distance where baseScale looks right
    themeLabel.userData.priority = 100;
    themeLabel.userData.home = themeLabel.position.clone();
    themeLabel.userData.nudge = new THREE.Vector3();
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
  // Skip "about" intro — it is header/about, not a Tools project cluster
  projects = projectList.filter((p) => p.role !== 'about' && p.id !== 'intro');
  createNebulae();

  const byTheme = {};
  projects.forEach((p) => {
    const theme = p.theme || 'Tools & Apps';
    if (!THEME_POSITIONS[theme]) return; // ignore non-nebula themes
    if (!byTheme[theme]) byTheme[theme] = [];
    byTheme[theme].push(p);
  });

  Object.keys(byTheme).forEach((theme) => {
    const themePos = THEME_POSITIONS[theme];
    const color = THEME_COLORS[theme];
    const plist = byTheme[theme];
    const themeRand = mulberry32(theme.split('').reduce((a, c) => a + c.charCodeAt(0), 0));

    // Rank projects so high-weight labels get preferred screen slots
    const ranked = [...plist].sort((a, b) => (b.weight || 0) - (a.weight || 0));
    const labelSlot = {};
    ranked.forEach((p, i) => { labelSlot[p.id] = i; });

    plist.forEach((project, pi) => {
      // Spread clusters more so sibling project labels don't stack
      const slot = labelSlot[project.id] ?? pi;
      const angle = (slot / Math.max(plist.length, 1)) * Math.PI * 2 + themeRand() * 0.2;
      const ring = 10 + (slot % 3) * 6;
      const cluster = new THREE.Vector3(
        themePos.x + Math.cos(angle) * ring + (themeRand() - 0.5) * 8,
        themePos.y + (slot % 2 === 0 ? 6 : -8) + (themeRand() - 0.5) * 6,
        themePos.z + Math.sin(angle) * ring + (themeRand() - 0.5) * 8
      );

      // Project labels for weight >= 9; screen size clamped when camera approaches
      if ((project.weight || 0) >= 9) {
        const pMap = makeLabelTexture(project.title, color, { large: false });
        const pAspect = pMap.userData?.aspect || 6;
        const pl = new THREE.Sprite(new THREE.SpriteMaterial({
          map: pMap,
          transparent: true,
          depthWrite: false,
          opacity: 0.95,
          sizeAttenuation: true
        }));
        // Stagger label heights by slot to reduce overlap (Taodyne vs HP-48, ECUTEST vs HPVM)
        const yOff = 20 + slot * 14 - (slot % 2) * 6;
        const xOff = (slot % 2 === 0 ? -14 : 16) + slot * 3;
        pl.position.copy(cluster).add(new THREE.Vector3(xOff, yOff, (slot % 3) * 3));
        const pH = 6.8;
        pl.scale.set(pH * pAspect, pH, 1);
        pl.userData.isLabel = true;
        pl.userData.kind = 'project';
        pl.userData.baseOpacity = 0.95;
        pl.userData.baseScale = pl.scale.clone();
        pl.userData.refDist = 140;
        pl.userData.projectId = project.id;
        pl.userData.priority = project.weight || 5;
        pl.userData.home = pl.position.clone();
        pl.userData.nudge = new THREE.Vector3();
        scene.add(pl);
        labelSprites.push(pl);
      }

      const bullets = project.bullets || [];
      const n = Math.max(bullets.length, 1);
      bullets.forEach((bullet, bi) => {
        const br = mulberry32(10000 + pi * 97 + bi * 13);
        const angle = (bi / n) * Math.PI * 2 + br() * 0.4;
        const radius = 4 + br() * 7;
        const position = new THREE.Vector3(
          cluster.x + Math.cos(angle) * radius,
          cluster.y + (br() - 0.5) * 6,
          cluster.z + Math.sin(angle) * radius
        );

        const weight = project.weight || 5;
        const size = 1.6 + (weight / 10) * 2.2;

        const group = new THREE.Group();
        const halo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: softThemeDiscs[theme] || softWhiteDisc,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: 0.92,
          fog: true
        }));
        halo.scale.set(size * 2.8, size * 2.8, 1);
        group.add(halo);

        const core = new THREE.Sprite(new THREE.SpriteMaterial({
          map: softWhiteDisc,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: 1,
          fog: true
        }));
        core.scale.set(size * 0.7, size * 0.7, 1);
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
  console.log(`Created ${stars.length} bullet-stars from ${projects.length} projects`);
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

const _labelWorld = new THREE.Vector3();
const _labelNdc = new THREE.Vector3();

function updateLabelVisibility() {
  const camPos = camera.position;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isMobile = w < 768;
  const screenMeta = [];

  labelSprites.forEach((label) => {
    // Reset toward home + accumulated collision nudge
    if (label.userData.home) {
      const n = label.userData.nudge || new THREE.Vector3();
      if (label.parent && label.parent !== scene) {
        // theme labels live in nebula groups — nudge in local space
        label.position.copy(label.userData.home).add(n);
      } else {
        label.position.copy(label.userData.home).add(n);
      }
    }

    label.getWorldPosition(_labelWorld);
    const dist = _labelWorld.distanceTo(camPos);

    // Too close → hide (giant blurred text)
    if (dist < 50) {
      label.visible = false;
      return;
    }

    let opacity = label.userData.baseOpacity || 0.9;
    if (dist < 75) opacity *= (dist - 50) / 25;
    if (dist > 260) opacity *= Math.max(0, 1 - (dist - 260) / 120);
    if (label.userData.kind === 'project' && dist > 190) {
      opacity *= Math.max(0.3, 1 - (dist - 190) / 100);
    }
    // Dim while HUD open (keep stars clickable; avoid giant text behind glass)
    if (currentStar) opacity *= 0.18;

    const base = label.userData.baseScale;
    const ref = label.userData.refDist || 150;
    if (base) {
      const f = dist / ref;
      const clamped = THREE.MathUtils.clamp(f, 0.45, 1.35);
      // Slightly smaller on mobile so theme plates fit the narrow viewport
      const m = isMobile ? 0.7 : 1;
      label.scale.set(base.x * clamped * m, base.y * clamped * m, 1);
    }

    // Screen-space: hide labels that clip too far past the viewport (esp. mobile)
    _labelNdc.copy(_labelWorld).project(camera);
    const sx = (_labelNdc.x * 0.5 + 0.5) * w;
    const sy = (-_labelNdc.y * 0.5 + 0.5) * h;
    const behind = _labelNdc.z > 1 || _labelNdc.z < -1;
    const halfWpx = Math.max(28, (label.scale.x / Math.max(dist, 1)) * (h * 0.32));
    const halfHpx = Math.max(10, (label.scale.y / Math.max(dist, 1)) * (h * 0.32));
    const inset = isMobile ? 4 : 2;
    const overflowL = Math.max(0, inset - (sx - halfWpx));
    const overflowR = Math.max(0, (sx + halfWpx) - (w - inset));
    const overflowT = Math.max(0, inset - (sy - halfHpx));
    const overflowB = Math.max(0, (sy + halfHpx) - (h - inset));
    // Hide when center is outside, or the plate heavily clips the viewport
    let offscreen = behind
      || sx < inset || sx > w - inset || sy < inset || sy > h - inset
      || (overflowL + overflowR) > halfWpx * 0.85
      || (overflowT + overflowB) > halfHpx * 0.85;
    // Mobile: keep theme plates away from left/right gutters
    if (isMobile && label.userData.kind === 'theme' && (sx < w * 0.28 || sx > w * 0.72)) {
      offscreen = true;
    }

    if (offscreen) {
      label.visible = false;
      return;
    }

    label.material.opacity = opacity;
    label.visible = opacity > 0.06;

    if (label.visible) {
      screenMeta.push({
        label,
        sx,
        sy,
        dist,
        halfW: Math.max(56, (label.scale.x / Math.max(dist, 1)) * (h * 0.28)),
        halfH: Math.max(14, (label.scale.y / Math.max(dist, 1)) * (h * 0.28)),
        priority: label.userData.priority || 1
      });
    }
  });

  // Screen-space collision avoidance (2 passes): nudge lower-priority labels apart
  screenMeta.sort((a, b) => b.priority - a.priority);
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < screenMeta.length; i++) {
      for (let j = i + 1; j < screenMeta.length; j++) {
        const a = screenMeta[i];
        const b = screenMeta[j];
        const dx = b.sx - a.sx;
        const dy = b.sy - a.sy;
        const minX = a.halfW + b.halfW;
        const minY = a.halfH + b.halfH + 10;
        if (Math.abs(dx) < minX && Math.abs(dy) < minY) {
          const pushY = (minY - Math.abs(dy) + 4) * (dy >= 0 ? 1 : -1 || 1);
          const pushX = (minX - Math.abs(dx) + 2) * 0.25 * (dx >= 0 ? 1 : -1);
          const worldPushY = (pushY / h) * b.dist * 0.65;
          const worldPushX = (pushX / w) * b.dist * 0.45;
          if (!b.label.userData.nudge) b.label.userData.nudge = new THREE.Vector3();
          b.label.userData.nudge.y = THREE.MathUtils.clamp(
            (b.label.userData.nudge.y || 0) + worldPushY * 0.5,
            -28,
            28
          );
          b.label.userData.nudge.x = THREE.MathUtils.clamp(
            (b.label.userData.nudge.x || 0) + worldPushX * 0.5,
            -20,
            20
          );
          if (b.label.userData.home) {
            b.label.position.x = b.label.userData.home.x + b.label.userData.nudge.x;
            b.label.position.y = b.label.userData.home.y + b.label.userData.nudge.y;
          }
          b.sx += pushX;
          b.sy += pushY;
        }
      }
    }
  }
}

function setSceneFocus(focused) {
  bloomPass.strength = focused ? 0.25 : 0.55;
  renderer.toneMappingExposure = focused ? 0.6 : 1.18;
  const title = document.getElementById('title-overlay');
  if (title) title.style.opacity = focused ? '0' : '1';
  const controlsEl = document.getElementById('controls');
  if (controlsEl) controlsEl.style.opacity = focused ? '0' : '1';
  nebulaGroups.forEach(({ group }) => {
    group.traverse((obj) => {
      if (obj.isSprite && !obj.userData.isLabel) {
        const base = obj.userData._baseOp ?? 0.12;
        obj.material.opacity = focused ? base * 0.35 : base;
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
window.openHUD = openHUD;

function flyToStar(star) {
  const gen = ++flyGeneration;
  isFlying = true;
  const startPos = camera.position.clone();
  // Bring the bullet-star near screen center, leave room for right HUD on desktop
  const isMobile = window.innerWidth < 768;
  const endPos = star.position.clone().add(new THREE.Vector3(
    isMobile ? 0 : -14,
    4,
    isMobile ? 36 : 32
  ));
  const look = new THREE.Vector3().copy(star.position);
  const endLook = star.position.clone();
  // Keep current look direction as start by unprojecting center — approx star
  const startLook = star.position.clone();
  const start = performance.now();
  const duration = 900;

  function step(now) {
    if (gen !== flyGeneration) return; // superseded by a newer fly target
    const t = Math.min((now - start) / duration, 1);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(startPos, endPos, e);
    look.lerpVectors(startLook, endLook, e);
    camera.lookAt(look);
    if (t < 1) requestAnimationFrame(step);
    else if (gen === flyGeneration) isFlying = false;
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
      new THREE.SphereGeometry(Math.max(2.6, s.size * 1.15), 8, 8),
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
    if (dragDist > 8) return;
    // Screen-space pick: nearest projected star to the click (works while HUD open)
    const w = window.innerWidth;
    const h = window.innerHeight;
    const threshold = currentStar ? 42 : 28;
    let best = null;
    let bestD = threshold;
    const ndc = new THREE.Vector3();
    stars.forEach((star) => {
      ndc.copy(star.position).project(camera);
      if (ndc.z > 1) return;
      const sx = (ndc.x * 0.5 + 0.5) * w;
      const sy = (-ndc.y * 0.5 + 0.5) * h;
      const d = Math.hypot(sx - e.clientX, sy - e.clientY);
      if (d < bestD) {
        bestD = d;
        best = star;
      }
    });
    if (best) {
      openHUD(best);
      return;
    }
    // Empty space while HUD open → close
    if (currentStar) closeHUD();
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

  document.getElementById('hud-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeHUD();
  });
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
  const printView = document.getElementById('print-view');
  const about = data.find((d) => d.role === 'about' || d.id === 'intro');

  let html = `<div class="print-header">
    <img class="logo" src="/cv/logo.png" alt="Christophe de Dinechin">
    <div>
      <h1>Christophe de Dinechin</h1>
      <p class="subtitle">Software as a Passion</p>
      ${about?.bullets?.[0] ? `<p class="subtitle">${about.bullets[0].text}</p>` : ''}
    </div>
  </div>`;

  const themes = {};
  data.forEach((item) => {
    if (item.role === 'about' || item.id === 'intro') return;
    const theme = item.theme || 'Other';
    if (!THEME_COLORS[theme]) return;
    if (!themes[theme]) themes[theme] = [];
    themes[theme].push(item);
  });

  // Collapsed one-pager: up to 3 projects/theme, 2 bullets each
  Object.keys(THEME_COLORS).forEach((theme) => {
    if (!themes[theme]) return;
    const color = `#${new THREE.Color(THEME_COLORS[theme]).getHexString()}`;
    themes[theme].sort((a, b) => (b.weight || 0) - (a.weight || 0));
    html += `<div class="theme-section" style="--theme-color:${color}">`;
    html += `<h2>${theme}</h2>`;
    themes[theme].slice(0, 3).forEach((item) => {
      html += `<div class="project"><h3>${item.title}</h3>`;
      if (item.years) html += `<div class="years">${item.years}</div>`;
      if (item.bullets?.length) {
        html += '<ul>';
        item.bullets.slice(0, 2).forEach((b) => { html += `<li>${b.text}</li>`; });
        html += '</ul>';
      }
      html += '</div>';
    });
    html += '</div>';
  });

  html += `<div class="qr-section">
    <img class="logo-sm" src="/cv/logo.png" alt="Logo">
    <img class="qr" src="/cv/qr-cv.png" alt="QR code to interactive CV" width="96" height="96">
    <div class="qr-text">
      <p><strong>Scan for the interactive constellation</strong></p>
      <p>https://c3d.github.io/cv/</p>
      <p>christophe@dinechin.org</p>
    </div>
  </div>`;
  printView.innerHTML = html;

  if (location.search.includes('print=1') || location.hash === '#print') {
    document.body.classList.add('print-preview');
  }
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
