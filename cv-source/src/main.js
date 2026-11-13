import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import './print/print-styles.css';
import contentData from './content-data.json';
import {
  PRINT_STYLES,
  PRINT_STYLE_STORAGE_KEY,
  getPrintStyle,
  resolvePrintStyleId,
  buildModelForStyles
} from './print/registry.js';

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

/** Darker cousins of THEME_COLORS for print on white paper (same hue family). */
const PRINT_THEME_COLORS = {
  'Languages & Compilers': 0x1f5fd0,
  'Systems & Virtualization': 0xc62838,
  'Games & 3D': 0x2aa83a,
  'Physics': 0xd48918,
  'Art & Culture': 0xc2188a,
  'Tools & Apps': 0x1496b0
};

/** Wide constellation for landscape. Physics (front-left) ≠ Languages (back-left). */
const THEME_LAYOUT_DESKTOP = {
  'Physics': { x: -98, y: 52, z: 58 },
  'Languages & Compilers': { x: -102, y: -8, z: -52 },
  'Tools & Apps': { x: 4, y: 48, z: -78 },
  'Systems & Virtualization': { x: 102, y: 46, z: -18 },
  'Games & 3D': { x: -55, y: -78, z: 8 },
  'Art & Culture': { x: 98, y: -62, z: 58 }
};

/** Tall 3×2 for portrait — all six clusters fit without right-edge clip. */
const THEME_LAYOUT_MOBILE = {
  'Physics': { x: -42, y: 95, z: 28 },
  'Languages & Compilers': { x: 42, y: 88, z: -32 },
  'Tools & Apps': { x: -48, y: 12, z: -48 },
  'Systems & Virtualization': { x: 48, y: 18, z: 12 },
  'Games & 3D': { x: -44, y: -82, z: -12 },
  'Art & Culture': { x: 46, y: -76, z: 42 }
};

/** Active theme centers (mutated by applyThemeLayout). */
const THEME_POSITIONS = { ...THEME_LAYOUT_DESKTOP };
let activeLayoutMobile = null;

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

let camera, scene, renderer, composer, bloomPass, warpShiftPass;
let stars = []; // one per CV bullet
let projects = [];
let labelSprites = [];
let nebulaGroups = [];
let currentStar = null;
let isFlying = false;
let flyGeneration = 0;
let preHudPose = null;
let softWhiteDisc;
const softThemeDiscs = {};
const clock = new THREE.Clock();
const FLY_DURATION_MS = 900;
const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Label springs ---
const LABEL_RESOLVE_MS = 200;
const LABEL_CAM_MOVE_EPS = 2.8;
const LABEL_TARGET_DEADZONE = 0.55;
const SPRING_OMEGA = 6.5;
const SPRING_ZETA = 0.88;
const OPACITY_LAMBDA = 9;
let labelResolveAt = 0;
const lastResolveCamPos = new THREE.Vector3(1e9, 1e9, 1e9);

// --- Warp tour ---
let autoMode = false;
let idleTimer = null;
let warpCountdownTimer = null;
let warpDeadline = 0;
let warpVisited = new Set();
let lastWarpedProjectId = null;
let warpJumpInProgress = false;
const IDLE_MS = 30000;
const WARP_INTERVAL_MS = 30000;

let controls = {
  mouseDown: false,
  mouseX: 0,
  mouseY: 0,
  targetRotationX: 0.22,
  targetRotationY: 0.32,
  currentRotationX: 0.22,
  currentRotationY: 0.32,
  targetZoom: 220,
  currentZoom: 220,
  lookAt: new THREE.Vector3(0, -8, 0)
};

const STAR_PICK_RADIUS_PX = 14;

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
  scene.fog = new THREE.FogExp2(0x03060f, 0.0032);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // Vibrant overview without washout
  renderer.toneMappingExposure = 1.34;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.62,
    0.55,
    0.68
  );
  composer.addPass(bloomPass);

  warpShiftPass = new ShaderPass(WarpShiftShader);
  warpShiftPass.uniforms.strength.value = 0;
  warpShiftPass.uniforms.accelSign.value = 0;
  composer.addPass(warpShiftPass);

  createDistantField();
}

/** Doppler-ish warp shift: blue ahead / red trail, streaks + CA by speed. */
const WarpShiftShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0 },
    accelSign: { value: 0 },
    resolution: { value: new THREE.Vector2(1, 1) }
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform float accelSign;
    uniform vec2 resolution;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5);
      vec2 dir = uv - center;
      float r = length(dir);
      float radial = smoothstep(0.05, 0.75, r);
      // accelSign > 0: accelerating outward → blue center, red edges
      // accelSign < 0: decelerating → reverse
      float blueW = clamp(0.5 - 0.5 * accelSign * (1.0 - radial) + 0.5 * accelSign * radial, 0.0, 1.0);
      float redW = 1.0 - blueW;
      float streak = strength * 0.012 * radial;
      vec2 streakDir = r > 1e-4 ? normalize(dir) : vec2(0.0);
      vec2 ca = streakDir * strength * 0.004;
      vec3 col;
      col.r = texture2D(tDiffuse, uv - streakDir * streak + ca).r;
      col.g = texture2D(tDiffuse, uv - streakDir * streak * 0.55).g;
      col.b = texture2D(tDiffuse, uv + streakDir * streak - ca).b;
      vec3 tinted = col;
      tinted.r = mix(col.r, col.r * 1.18 + 0.04, redW * strength);
      tinted.b = mix(col.b, col.b * 1.22 + 0.05, blueW * strength);
      tinted.g = mix(col.g, col.g * 0.96, strength * 0.35);
      gl_FragColor = vec4(mix(col, tinted, clamp(strength, 0.0, 1.0)), 1.0);
    }
  `
};

const _camPrevPos = new THREE.Vector3();
const _camVel = new THREE.Vector3();
let _camSpeed = 0;
let _camAccel = 0;
let _warpStrengthSmoothed = 0;
let _camPrevInit = false;

function updateWarpShift(dt) {
  if (!warpShiftPass) return;
  if (!_camPrevInit) {
    _camPrevPos.copy(camera.position);
    _camPrevInit = true;
  }
  const prevSpeed = _camSpeed;
  _camVel.subVectors(camera.position, _camPrevPos).divideScalar(Math.max(dt, 1e-4));
  _camSpeed = _camVel.length();
  _camAccel = (_camSpeed - prevSpeed) / Math.max(dt, 1e-4);
  _camPrevPos.copy(camera.position);

  const reduced = prefersReducedMotion();
  const speedN = THREE.MathUtils.clamp(_camSpeed / (reduced ? 220 : 140), 0, 1);
  const target = reduced ? 0 : speedN * speedN;
  const ease = 1 - Math.exp(-(reduced ? 3 : 6) * dt);
  _warpStrengthSmoothed += (target - _warpStrengthSmoothed) * ease;
  if (_warpStrengthSmoothed < 0.01) _warpStrengthSmoothed = 0;

  warpShiftPass.uniforms.strength.value = _warpStrengthSmoothed;
  // Positive accelSign while speeding up (blue ahead), negative while braking
  const aSign = THREE.MathUtils.clamp(_camAccel / 80, -1, 1);
  warpShiftPass.uniforms.accelSign.value += (aSign - warpShiftPass.uniforms.accelSign.value) * ease;
  warpShiftPass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
}

function updateCameraFromControls() {
  const radius = controls.currentZoom;
  const rx = controls.currentRotationX;
  const ry = controls.currentRotationY;
  const look = controls.lookAt;
  camera.position.x = look.x + Math.sin(ry) * Math.cos(rx) * radius;
  camera.position.z = look.z + Math.cos(ry) * Math.cos(rx) * radius;
  camera.position.y = look.y + Math.sin(rx) * radius * 0.55 + 10;
}

/**
 * Swap desktop ↔ portrait theme layouts and move nebulae / stars / labels.
 */
function applyThemeLayout(forceMobile = null) {
  const isMobile = forceMobile ?? window.innerWidth < 768;
  if (activeLayoutMobile === isMobile && nebulaGroups.length) return;
  activeLayoutMobile = isMobile;
  const layout = isMobile ? THEME_LAYOUT_MOBILE : THEME_LAYOUT_DESKTOP;
  Object.keys(layout).forEach((theme) => {
    THEME_POSITIONS[theme] = { ...layout[theme] };
  });

  nebulaGroups.forEach(({ group, theme }) => {
    const p = THEME_POSITIONS[theme];
    if (p) group.position.set(p.x, p.y, p.z);
  });

  stars.forEach((s) => {
    const theme = s.project?.theme;
    const base = THEME_POSITIONS[theme];
    const off = s.themeOffset;
    if (!base || !off) return;
    s.position.set(base.x + off.x, base.y + off.y, base.z + off.z);
    s.mesh.position.copy(s.position);
  });

  labelSprites.forEach((label) => {
    const theme = label.userData.theme || label.userData.projectTheme;
    const base = THEME_POSITIONS[theme];
    const off = label.userData.themeOffset;
    if (!base || !off) return;
    if (label.userData.kind === 'theme') {
      label.userData.home.set(off.x, off.y, off.z);
      label.position.copy(label.userData.home);
      resetLabelSpring(label);
      return;
    }
    const home = new THREE.Vector3(base.x + off.x, base.y + off.y, base.z + off.z);
    label.userData.home.copy(home);
    label.position.copy(home);
    resetLabelSpring(label);
  });

  if (stars.length) createProjectLineages();
}

/**
 * Fit overview so clusters fill ~75–85% of the viewport (tight bounds).
 */
function fitOverviewToClusters() {
  applyThemeLayout();

  const isMobile = window.innerWidth < 768;
  const pad = 22; // nebula glow only — no giant label padding
  const box = new THREE.Box3();
  Object.values(THEME_POSITIONS).forEach((p) => {
    box.expandByPoint(new THREE.Vector3(p.x - pad, p.y - pad * 0.7, p.z - pad));
    box.expandByPoint(new THREE.Vector3(p.x + pad, p.y + pad * 0.85, p.z + pad));
  });

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const titleBand = isMobile ? 0.12 : 0.10;
  const fill = isMobile ? 0.78 : 0.82; // target FOV fraction filled by clusters

  controls.lookAt.set(center.x * 0.05, center.y - size.y * (titleBand * 0.35), center.z * 0.08);

  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const aspect = Math.max(camera.aspect, 0.35);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  const halfH = Math.max(size.y, size.z * 0.55) * 0.5;
  const halfW = Math.max(size.x, size.z * 0.45) * 0.5;
  const distV = halfH / Math.tan((vFov * fill) / 2);
  const distH = halfW / Math.tan((hFov * fill) / 2);
  let dist = Math.max(distV, distH);
  dist = THREE.MathUtils.clamp(dist, isMobile ? 140 : 130, isMobile ? 320 : 280);

  controls.targetZoom = dist;
  controls.currentZoom = dist;
  controls.targetRotationX = isMobile ? 0.18 : 0.12;
  controls.targetRotationY = isMobile ? 0.04 : 0.22;
  controls.currentRotationX = controls.targetRotationX;
  controls.currentRotationY = controls.targetRotationY;
  updateCameraFromControls();
  camera.lookAt(controls.lookAt);
  if (scene.fog) scene.fog.density = THREE.MathUtils.clamp(0.7 / dist, 0.0016, 0.0036);
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
    themeLabel.position.set(0, 26, 0);
    // World size at ~overview distance; clamped in updateLabelVisibility when close
    const themeH = 8.4;
    themeLabel.scale.set(themeH * themeAspect, themeH, 1);
    themeLabel.userData.isLabel = true;
    themeLabel.userData.kind = 'theme';
    themeLabel.userData.theme = theme;
    themeLabel.userData.labelTitle = theme;
    themeLabel.userData.baseOpacity = 1;
    themeLabel.userData.baseScale = themeLabel.scale.clone();
    themeLabel.userData.refDist = 170;
    themeLabel.userData.priority = 100;
    themeLabel.userData.home = themeLabel.position.clone();
    themeLabel.userData.themeOffset = themeLabel.position.clone();
    initLabelSpring(themeLabel);
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
        pl.userData.projectTheme = theme;
        pl.userData.labelTitle = project.title;
        pl.userData.priority = project.weight || 5;
        pl.userData.home = pl.position.clone();
        pl.userData.themeOffset = pl.position.clone().sub(themePos);
        initLabelSpring(pl);
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
          themeOffset: position.clone().sub(themePos),
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

let lineageLines = [];

function createProjectLineages() {
  lineageLines.forEach((line) => scene.remove(line));
  lineageLines = [];
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
      const line = new THREE.Line(geom, new THREE.LineBasicMaterial({
        color: mid,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }));
      scene.add(line);
      lineageLines.push(line);
    });
  });
}

const _labelWorld = new THREE.Vector3();
const _labelNdc = new THREE.Vector3();
const _springTmp = new THREE.Vector3();

function initLabelSpring(label) {
  if (label.userData.spring) return;
  label.userData.spring = {
    offset: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    target: new THREE.Vector3(),
    committed: new THREE.Vector3(),
    opacity: label.material.opacity ?? 1,
    opacityTarget: label.material.opacity ?? 1,
    wantVisible: true
  };
}

function resetLabelSpring(label) {
  initLabelSpring(label);
  const s = label.userData.spring;
  s.offset.set(0, 0, 0);
  s.velocity.set(0, 0, 0);
  s.target.set(0, 0, 0);
  s.committed.set(0, 0, 0);
}

function commitLabelTarget(spring, tx, ty, tz = 0) {
  _springTmp.set(tx, ty, tz);
  if (_springTmp.distanceTo(spring.committed) < LABEL_TARGET_DEADZONE) return;
  spring.committed.copy(_springTmp);
  spring.target.copy(_springTmp);
}

/** Low-rate collision / viewport resolve → spring targets (not applied immediately). */
function resolveLabelTargets() {
  const camPos = camera.position;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isMobile = w < 768;
  const screenMeta = [];

  labelSprites.forEach((label) => {
    initLabelSpring(label);
    const isTheme = label.userData.kind === 'theme';
    // Measure at home (ignore current spring offset) so targets are stable
    if (label.userData.home) label.position.copy(label.userData.home);

    label.getWorldPosition(_labelWorld);
    const dist = Math.max(_labelWorld.distanceTo(camPos), 1);

    const base = label.userData.baseScale;
    const ref = label.userData.refDist || 150;
    if (base) {
      if (isTheme) {
        const clamped = THREE.MathUtils.clamp(dist / ref, 0.85, 1.55);
        const m = isMobile ? 0.72 : 1;
        label.scale.set(base.x * clamped * m, base.y * clamped * m, 1);
      } else {
        const clamped = THREE.MathUtils.clamp(dist / ref, 0.45, 1.35);
        const m = isMobile ? 0.58 : 1;
        label.scale.set(base.x * clamped * m, base.y * clamped * m, 1);
      }
    }

    let opacityTarget = label.userData.baseOpacity || 0.9;
    let wantVisible = true;
    if (isTheme) {
      opacityTarget = currentStar ? 0.14 : 1;
    } else {
      if (dist < 50) {
        opacityTarget = 0;
        wantVisible = false;
      } else {
        if (dist < 75) opacityTarget *= (dist - 50) / 25;
        if (dist > 150) opacityTarget *= Math.max(0, 1 - (dist - 150) / 70);
        if (currentStar) opacityTarget *= 0.18;
        if (opacityTarget <= 0.06) wantVisible = false;
      }
    }

    _labelNdc.copy(_labelWorld).project(camera);
    let sx = (_labelNdc.x * 0.5 + 0.5) * w;
    let sy = (-_labelNdc.y * 0.5 + 0.5) * h;
    const behind = _labelNdc.z > 1 || _labelNdc.z < -1;
    const halfWpx = Math.max(24, (label.scale.x / dist) * (h * 0.3));
    const halfHpx = Math.max(10, (label.scale.y / dist) * (h * 0.3));
    const inset = isMobile ? 10 : 6;

    let ox = 0;
    let oy = 0;
    if (isTheme) {
      const marginX = inset + halfWpx;
      const marginY = inset + halfHpx + (isMobile ? 4 : 18);
      let dx = 0;
      let dy = 0;
      if (behind || sx < marginX) dx = marginX - sx;
      if (sx > w - marginX) dx = (w - marginX) - sx;
      if (sy < marginY) dy = marginY - sy;
      if (sy > h - marginY) dy = (h - marginY) - sy;
      ox = THREE.MathUtils.clamp((dx / w) * dist * 0.55, -36, 36);
      oy = THREE.MathUtils.clamp(-(dy / h) * dist * 0.55, -36, 36);
      sx += dx;
      sy += dy;
    } else if (wantVisible) {
      const offscreen = behind
        || sx < inset || sx > w - inset || sy < inset || sy > h - inset;
      if (offscreen) {
        opacityTarget = 0;
        wantVisible = false;
      }
    }

    const spring = label.userData.spring;
    spring.opacityTarget = opacityTarget;
    spring.wantVisible = isTheme ? true : wantVisible;
    commitLabelTarget(spring, ox, oy, 0);

    if (isTheme || wantVisible) {
      screenMeta.push({
        label,
        spring,
        sx,
        sy,
        dist,
        halfW: Math.max(isTheme ? 70 : 56, (label.scale.x / dist) * (h * 0.28)),
        halfH: Math.max(14, (label.scale.y / dist) * (h * 0.28)),
        priority: label.userData.priority || 1,
        isTheme,
        ox,
        oy
      });
    }
  });

  screenMeta.sort((a, b) => b.priority - a.priority);
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < screenMeta.length; i++) {
      for (let j = i + 1; j < screenMeta.length; j++) {
        const a = screenMeta[i];
        const b = screenMeta[j];
        if (b.isTheme) continue;
        const dx = b.sx - a.sx;
        const dy = b.sy - a.sy;
        const minX = a.halfW + b.halfW;
        const minY = a.halfH + b.halfH + 10;
        if (Math.abs(dx) >= minX || Math.abs(dy) >= minY) continue;
        const pushY = (minY - Math.abs(dy) + 4) * (dy >= 0 ? 1 : -1 || 1);
        const pushX = (minX - Math.abs(dx) + 2) * 0.25 * (dx >= 0 ? 1 : -1);
        b.oy += (pushY / h) * b.dist * 0.65;
        b.ox += (pushX / w) * b.dist * 0.45;
        b.ox = THREE.MathUtils.clamp(b.ox, -28, 28);
        b.oy = THREE.MathUtils.clamp(b.oy, -28, 28);
        b.sx += pushX;
        b.sy += pushY;
      }
    }
  }

  screenMeta.forEach((m) => commitLabelTarget(m.spring, m.ox, m.oy, 0));
  lastResolveCamPos.copy(camPos);
}

function integrateLabelSprings(dt) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isMobile = w < 768;
  const camPos = camera.position;
  const omega = SPRING_OMEGA;
  const zeta = SPRING_ZETA;
  const damp = 2 * zeta * omega;
  const stiff = omega * omega;

  labelSprites.forEach((label) => {
    initLabelSpring(label);
    const spring = label.userData.spring;
    const isTheme = label.userData.kind === 'theme';

    // Spring toward committed target (critically / slightly under-damped)
    const ox = spring.offset.x;
    const oy = spring.offset.y;
    const tx = spring.target.x;
    const ty = spring.target.y;
    let vx = spring.velocity.x;
    let vy = spring.velocity.y;
    const ax = stiff * (tx - ox) - damp * vx;
    const ay = stiff * (ty - oy) - damp * vy;
    vx += ax * dt;
    vy += ay * dt;
    spring.offset.x = ox + vx * dt;
    spring.offset.y = oy + vy * dt;
    spring.velocity.x = vx;
    spring.velocity.y = vy;

    if (label.userData.home) {
      label.position.copy(label.userData.home).add(spring.offset);
    }

    label.getWorldPosition(_labelWorld);
    const dist = Math.max(_labelWorld.distanceTo(camPos), 1);
    const base = label.userData.baseScale;
    const ref = label.userData.refDist || 150;
    if (base) {
      if (isTheme) {
        const clamped = THREE.MathUtils.clamp(dist / ref, 0.85, 1.55);
        const m = isMobile ? 0.72 : 1;
        label.scale.set(base.x * clamped * m, base.y * clamped * m, 1);
      } else {
        const clamped = THREE.MathUtils.clamp(dist / ref, 0.45, 1.35);
        const m = isMobile ? 0.58 : 1;
        label.scale.set(base.x * clamped * m, base.y * clamped * m, 1);
      }
    }

    // Ease opacity
    const k = 1 - Math.exp(-OPACITY_LAMBDA * dt);
    spring.opacity += (spring.opacityTarget - spring.opacity) * k;
    label.material.opacity = spring.opacity;
    if (isTheme) {
      label.visible = true;
    } else {
      label.visible = spring.wantVisible && spring.opacity > 0.04;
    }
  });
}

function updateLabels(dt) {
  const now = performance.now();
  const camMoved = camera.position.distanceToSquared(lastResolveCamPos) > LABEL_CAM_MOVE_EPS * LABEL_CAM_MOVE_EPS;
  if (now >= labelResolveAt || camMoved) {
    resolveLabelTargets();
    labelResolveAt = now + LABEL_RESOLVE_MS;
  }
  integrateLabelSprings(dt);
}

/** Sample label local positions for a few seconds; assert near-zero variance after settle. */
async function assertLabelStability({ settleMs = 1200, sampleMs = 2000, maxStd = 0.08 } = {}) {
  await new Promise((r) => setTimeout(r, settleMs));
  const ids = labelSprites.filter((l) => l.visible).map((l) => l.userData.labelTitle || l.uuid);
  const series = Object.fromEntries(ids.map((id) => [id, []]));
  const t0 = performance.now();
  while (performance.now() - t0 < sampleMs) {
    labelSprites.forEach((l) => {
      if (!l.visible) return;
      const id = l.userData.labelTitle || l.uuid;
      if (!series[id]) series[id] = [];
      series[id].push({ x: l.position.x, y: l.position.y, z: l.position.z });
    });
    await new Promise((r) => setTimeout(r, 50));
  }
  const failed = [];
  Object.entries(series).forEach(([id, samples]) => {
    if (samples.length < 8) return;
    const mean = samples.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y, z: a.z + p.z }), { x: 0, y: 0, z: 0 });
    mean.x /= samples.length; mean.y /= samples.length; mean.z /= samples.length;
    let varSum = 0;
    samples.forEach((p) => {
      const dx = p.x - mean.x; const dy = p.y - mean.y; const dz = p.z - mean.z;
      varSum += dx * dx + dy * dy + dz * dz;
    });
    const std = Math.sqrt(varSum / samples.length);
    if (std > maxStd) failed.push({ id, std });
  });
  return { ok: failed.length === 0, failed, sampled: Object.keys(series).length, maxStd };
}
window.assertLabelStability = assertLabelStability;
window.assertLabelClicks = assertLabelClicks;

function setSceneFocus(focused) {
  bloomPass.strength = focused ? 0.28 : 0.62;
  renderer.toneMappingExposure = focused ? 0.68 : 1.34;
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

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function captureCameraPose() {
  const lookDir = new THREE.Vector3();
  camera.getWorldDirection(lookDir);
  const lookAt = camera.position.clone().add(lookDir.multiplyScalar(controls.currentZoom || 80));
  return {
    position: camera.position.clone(),
    lookAt,
    quaternion: camera.quaternion.clone(),
    fov: camera.fov,
    controls: {
      targetRotationX: controls.targetRotationX,
      targetRotationY: controls.targetRotationY,
      currentRotationX: controls.currentRotationX,
      currentRotationY: controls.currentRotationY,
      targetZoom: controls.targetZoom,
      currentZoom: controls.currentZoom,
      lookAt: controls.lookAt.clone()
    }
  };
}

function applyPoseControls(pose) {
  if (!pose?.controls) return;
  const c = pose.controls;
  controls.targetRotationX = c.targetRotationX;
  controls.targetRotationY = c.targetRotationY;
  controls.currentRotationX = c.currentRotationX;
  controls.currentRotationY = c.currentRotationY;
  controls.targetZoom = c.targetZoom;
  controls.currentZoom = c.currentZoom;
  controls.lookAt.copy(c.lookAt);
  if (typeof pose.fov === 'number') {
    camera.fov = pose.fov;
    camera.updateProjectionMatrix();
  }
}

function currentLookPoint() {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  return camera.position.clone().add(dir.multiplyScalar(Math.max(controls.currentZoom * 0.45, 40)));
}

function starFocusPose(star) {
  const isMobile = window.innerWidth < 768;
  const reduced = prefersReducedMotion();
  const dist = reduced ? (isMobile ? 48 : 42) : (isMobile ? 36 : 32);
  return {
    position: star.position.clone().add(new THREE.Vector3(isMobile ? 0 : -14, 4, dist)),
    lookAt: star.position.clone()
  };
}

function flyCameraPath(fromPos, toPos, fromLook, toLook, duration, onDone) {
  const gen = ++flyGeneration;
  isFlying = true;
  const start = performance.now();
  const look = fromLook.clone();
  function step(now) {
    if (gen !== flyGeneration) return;
    const t = Math.min((now - start) / duration, 1);
    const e = easeInOutCubic(t);
    camera.position.lerpVectors(fromPos, toPos, e);
    look.lerpVectors(fromLook, toLook, e);
    camera.lookAt(look);
    if (t < 1) requestAnimationFrame(step);
    else if (gen === flyGeneration) {
      camera.position.copy(toPos);
      camera.lookAt(toLook);
      isFlying = false;
      onDone?.();
    }
  }
  requestAnimationFrame(step);
}

function flyToStar(star) {
  const focus = starFocusPose(star);
  const duration = prefersReducedMotion() ? FLY_DURATION_MS * 1.6 : FLY_DURATION_MS;
  flyCameraPath(
    camera.position.clone(),
    focus.position,
    currentLookPoint(),
    focus.lookAt,
    duration
  );
}

function flyToPose(pose, onDone) {
  if (!pose) {
    onDone?.();
    return;
  }
  const duration = prefersReducedMotion() ? FLY_DURATION_MS * 1.6 : FLY_DURATION_MS;
  flyCameraPath(
    camera.position.clone(),
    pose.position.clone(),
    currentLookPoint(),
    pose.lookAt.clone(),
    duration,
    () => {
      applyPoseControls(pose);
      camera.position.copy(pose.position);
      camera.lookAt(pose.controls?.lookAt || pose.lookAt);
      onDone?.();
    }
  );
}

function populateHUD(star, { allowAutoplay = true } = {}) {
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

  const idx = stars.indexOf(star);
  hud.querySelector('[data-hud="index"]').textContent =
    `NODE ${String(idx + 1).padStart(3, '0')} / ${String(stars.length).padStart(3, '0')}`;

  const media = hud.querySelector('[data-hud="media"]');
  media.innerHTML = '';
  if (project.videos && project.videos.length) {
    project.videos.forEach((id) => {
      const wrap = document.createElement('div');
      wrap.className = 'hud-video';
      // Auto mode: never autoplay YouTube
      const extras = allowAutoplay ? '' : '&mute=1';
      const auto = allowAutoplay ? '' : ''; // keep autoplay off always in embed URL unless user clicks
      wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?rel=0${auto}${extras}" allowfullscreen allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
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
}

function openHUD(star, { fromAuto = false } = {}) {
  if (!preHudPose) preHudPose = captureCameraPose();
  currentStar = star;
  setSceneFocus(true);
  populateHUD(star, { allowAutoplay: !fromAuto && !autoMode });
  const hud = document.getElementById('hud');
  hud.classList.add('open');
  hud.setAttribute('aria-hidden', 'false');
  window.location.hash = star.id;
  flyToStar(star);
  if (fromAuto || autoMode) {
    warpVisited.add(star.project.id);
    lastWarpedProjectId = star.project.id;
  }
}

function closeHUD({ restoreCamera = true } = {}) {
  if (!currentStar && !document.getElementById('hud')?.classList.contains('open')) {
    if (!restoreCamera) preHudPose = null;
    return;
  }
  currentStar = null;
  setSceneFocus(false);
  const hud = document.getElementById('hud');
  hud.classList.remove('open');
  hud.setAttribute('aria-hidden', 'true');
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  const pose = preHudPose;
  if (!restoreCamera) {
    preHudPose = null;
    return;
  }
  preHudPose = null;
  if (pose) flyToPose(pose);
}
window.closeHUD = closeHUD;
window.openHUD = openHUD;

function enterOverviewMode() {
  closeHUD({ restoreCamera: false });
  isFlying = true;
  const startPos = camera.position.clone();
  const startLook = currentLookPoint();
  fitOverviewToClusters();
  const endPos = camera.position.clone();
  const endLook = controls.lookAt.clone();
  camera.position.copy(startPos);
  const duration = prefersReducedMotion() ? 1600 : 1000;
  flyCameraPath(startPos, endPos, startLook, endLook, duration, () => {
    applyPoseControls({
      fov: camera.fov,
      controls: {
        targetRotationX: controls.targetRotationX,
        targetRotationY: controls.targetRotationY,
        currentRotationX: controls.currentRotationX,
        currentRotationY: controls.currentRotationY,
        targetZoom: controls.targetZoom,
        currentZoom: controls.currentZoom,
        lookAt: controls.lookAt.clone()
      }
    });
  });
}

// ============================================================================
// Warp tour (idle auto mode)
// ============================================================================

function projectStarRepresentatives() {
  const byId = new Map();
  stars.forEach((s) => {
    const id = s.project.id;
    if (!byId.has(id) || (s.project.weight || 0) > (byId.get(id).project.weight || 0)) {
      byId.set(id, s);
    }
  });
  return [...byId.values()];
}

function pickWarpTarget() {
  const reps = projectStarRepresentatives();
  if (!reps.length) return null;
  const current = currentStar || reps.find((s) => s.project.id === lastWarpedProjectId) || null;
  const relatedIds = new Set(current?.project?.related || []);
  const related = reps.filter((s) => relatedIds.has(s.project.id) && s.project.id !== current?.project?.id);
  const unvisitedRelated = related.filter((s) => !warpVisited.has(s.project.id));
  if (unvisitedRelated.length) return unvisitedRelated[0];
  if (related.length) {
    const nonBack = related.filter((s) => s.project.id !== lastWarpedProjectId);
    return nonBack[0] || related[0];
  }
  const sameTheme = reps.filter((s) =>
    s.project.theme === current?.project?.theme && s.project.id !== current?.project?.id
  );
  const unvisitedTheme = sameTheme.filter((s) => !warpVisited.has(s.project.id));
  if (unvisitedTheme.length) return unvisitedTheme[0];
  if (sameTheme.length) {
    const nonBack = sameTheme.filter((s) => s.project.id !== lastWarpedProjectId);
    return nonBack[0] || sameTheme[0];
  }
  const unvisited = reps.filter((s) => !warpVisited.has(s.project.id));
  if (unvisited.length) return unvisited[Math.floor(Math.random() * unvisited.length)];
  warpVisited.clear();
  const pool = reps.filter((s) => s.project.id !== lastWarpedProjectId);
  return pool[Math.floor(Math.random() * pool.length)] || reps[0];
}

function updateWarpBar() {
  const bar = document.getElementById('warp-bar');
  if (!bar) return;
  if (!autoMode) {
    bar.hidden = true;
    bar.setAttribute('aria-hidden', 'true');
    return;
  }
  bar.hidden = false;
  bar.setAttribute('aria-hidden', 'false');
  const left = Math.max(0, Math.ceil((warpDeadline - performance.now()) / 1000));
  const fill = bar.querySelector('[data-warp-fill]');
  const label = bar.querySelector('[data-warp-label]');
  const total = prefersReducedMotion() ? WARP_INTERVAL_MS * 1.5 : WARP_INTERVAL_MS;
  const remain = Math.max(0, warpDeadline - performance.now());
  if (fill) fill.style.transform = `scaleX(${remain / total})`;
  if (label) label.textContent = `NEXT WARP JUMP IN ${left} SECOND${left === 1 ? '' : 'S'}`;
}

function clearWarpCountdown() {
  if (warpCountdownTimer) {
    clearInterval(warpCountdownTimer);
    warpCountdownTimer = null;
  }
}

function scheduleNextWarp() {
  clearWarpCountdown();
  const interval = prefersReducedMotion() ? WARP_INTERVAL_MS * 1.5 : WARP_INTERVAL_MS;
  warpDeadline = performance.now() + interval;
  updateWarpBar();
  warpCountdownTimer = setInterval(() => {
    updateWarpBar();
    if (performance.now() >= warpDeadline) {
      clearWarpCountdown();
      doWarpJump();
    }
  }, 200);
}

function doWarpJump() {
  if (!autoMode) return;
  const target = pickWarpTarget();
  if (!target) {
    scheduleNextWarp();
    return;
  }
  warpJumpInProgress = true;
  openHUD(target, { fromAuto: true });
  const duration = prefersReducedMotion() ? FLY_DURATION_MS * 1.6 : FLY_DURATION_MS;
  setTimeout(() => {
    warpJumpInProgress = false;
    if (autoMode) scheduleNextWarp();
  }, duration + 80);
}

function enterAutoMode() {
  if (autoMode || document.body.classList.contains('print-preview')) return;
  autoMode = true;
  document.body.classList.add('auto-warp');
  warpVisited = new Set(currentStar ? [currentStar.project.id] : []);
  lastWarpedProjectId = currentStar?.project?.id || null;
  if (!currentStar) doWarpJump();
  else scheduleNextWarp();
}
function exitAutoMode() {
  if (!autoMode) return;
  autoMode = false;
  document.body.classList.remove('auto-warp');
  clearWarpCountdown();
  updateWarpBar();
  // Jump in progress may finish; idle timer restarts via noteUserActivity
}
window.enterAutoMode = enterAutoMode;
window.exitAutoMode = exitAutoMode;
window.doWarpJump = doWarpJump;

function noteUserActivity() {
  if (autoMode) exitAutoMode();
  if (idleTimer) clearTimeout(idleTimer);
  if (document.body.classList.contains('print-preview')) return;
  idleTimer = setTimeout(() => enterAutoMode(), IDLE_MS);
}

function firstStarForProject(projectId) {
  return stars.find((s) => s.project.id === projectId) || null;
}

function firstStarForTheme(theme) {
  const list = stars
    .filter((s) => s.project.theme === theme)
    .sort((a, b) => (b.project.weight || 0) - (a.project.weight || 0));
  return list[0] || null;
}

function expectedHudTitleForLabel(label) {
  if (label.userData.kind === 'project') {
    return label.userData.labelTitle
      || projects.find((p) => p.id === label.userData.projectId)?.title
      || null;
  }
  if (label.userData.kind === 'theme') {
    return firstStarForTheme(label.userData.theme)?.project?.title || null;
  }
  return null;
}

function openFromLabel(label) {
  if (!label) return false;
  let star = null;
  if (label.userData.kind === 'project' && label.userData.projectId) {
    star = firstStarForProject(label.userData.projectId);
  } else if (label.userData.kind === 'theme' && label.userData.theme) {
    star = firstStarForTheme(label.userData.theme);
  }
  if (!star) return false;
  openHUD(star);
  return true;
}

/** Screen-space hit test for visible labels (explicit click targets). */
function pickLabelAt(clientX, clientY) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const world = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  let best = null;
  let bestScore = Infinity;

  labelSprites.forEach((label) => {
    if (!label.visible) return;
    label.getWorldPosition(world);
    ndc.copy(world).project(camera);
    if (ndc.z > 1 || ndc.z < -1) return;
    const sx = (ndc.x * 0.5 + 0.5) * w;
    const sy = (-ndc.y * 0.5 + 0.5) * h;
    const dist = world.distanceTo(camera.position);
    const halfW = Math.max(36, (label.scale.x / Math.max(dist, 1)) * (h * 0.36));
    const halfH = Math.max(12, (label.scale.y / Math.max(dist, 1)) * (h * 0.36));
    if (Math.abs(clientX - sx) > halfW || Math.abs(clientY - sy) > halfH) return;
    const score = dist + Math.hypot(clientX - sx, clientY - sy) * 0.02;
    if (score < bestScore) {
      bestScore = score;
      best = label;
    }
  });
  return best;
}

/** Tight screen-space star pick — only within STAR_PICK_RADIUS_PX; prefer frontmost. */
function pickStarAt(clientX, clientY) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const ndc = new THREE.Vector3();
  let best = null;
  let bestCamDist = Infinity;
  let bestScreenD = Infinity;

  stars.forEach((star) => {
    ndc.copy(star.position).project(camera);
    if (ndc.z > 1) return;
    const sx = (ndc.x * 0.5 + 0.5) * w;
    const sy = (-ndc.y * 0.5 + 0.5) * h;
    const screenD = Math.hypot(sx - clientX, sy - clientY);
    if (screenD > STAR_PICK_RADIUS_PX) return;
    const camDist = star.position.distanceTo(camera.position);
    if (camDist < bestCamDist - 0.05
      || (Math.abs(camDist - bestCamDist) <= 0.05 && screenD < bestScreenD)) {
      best = star;
      bestCamDist = camDist;
      bestScreenD = screenD;
    }
  });
  return best;
}

/**
 * Scripted check: activate every visible label and assert HUD title matches.
 * Exposed on window for QA / CI scripts.
 */
async function assertLabelClicks() {
  const results = [];
  const visible = labelSprites.filter((l) => l.visible);
  for (const label of visible) {
    const expected = expectedHudTitleForLabel(label);
    const opened = openFromLabel(label);
    await new Promise((r) => setTimeout(r, 80));
    const got = document.querySelector('[data-hud="project"]')?.textContent || '';
    const ok = opened && !!expected && got === expected;
    results.push({
      kind: label.userData.kind,
      label: label.userData.labelTitle || label.userData.theme || label.userData.projectId,
      expected,
      got,
      ok
    });
  }
  if (currentStar) closeHUD();
  const failed = results.filter((r) => !r.ok);
  return { ok: failed.length === 0, total: results.length, failed, results };
}
window.assertLabelClicks = assertLabelClicks;
window.openFromLabel = openFromLabel;
window.pickLabelAt = pickLabelAt;

// ============================================================================
// Interaction
// ============================================================================

function setupInteraction() {
  const container = document.getElementById('canvas-container');
  let dragDist = 0;

  stars.forEach((s) => {
    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(2.6, s.size * 1.15), 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    s.mesh.add(hit);
    s.hit = hit;
  });

  const onDown = (x, y) => {
    noteUserActivity();
    controls.mouseDown = true;
    controls.mouseX = x;
    controls.mouseY = y;
    dragDist = 0;
  };
  const onMove = (x, y) => {
    if (!controls.mouseDown || currentStar || isFlying) return;
    noteUserActivity();
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
    noteUserActivity();
    e.preventDefault();
    controls.targetZoom = Math.max(120, Math.min(520, controls.targetZoom + e.deltaY * 0.1));
  }, { passive: false });

  container.addEventListener('click', (e) => {
    noteUserActivity();
    if (dragDist > 8) return;
    const labelHit = pickLabelAt(e.clientX, e.clientY);
    if (labelHit) {
      openFromLabel(labelHit);
      return;
    }
    const starHit = pickStarAt(e.clientX, e.clientY);
    if (starHit) {
      openHUD(starHit);
      return;
    }
    if (currentStar) closeHUD();
  });

  window.addEventListener('keydown', (e) => {
    noteUserActivity();
    if (e.key === 'Escape') {
      closePrintStyleMenu();
      closeHUD();
    } else if (e.key === 'o' || e.key === 'O') enterOverviewMode();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    if (warpShiftPass) warpShiftPass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    if (!currentStar && !isFlying) fitOverviewToClusters();
  });

  document.getElementById('hud-close')?.addEventListener('click', (e) => {
    noteUserActivity();
    e.stopPropagation();
    closeHUD();
  });

  setupTitlePrintMenu();
  noteUserActivity();
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.getElapsedTime();

  if (!currentStar && !isFlying && !autoMode) {
    controls.targetRotationY += 0.00025;
    controls.currentRotationX += (controls.targetRotationX - controls.currentRotationX) * 0.05;
    controls.currentRotationY += (controls.targetRotationY - controls.currentRotationY) * 0.05;
    controls.currentZoom += (controls.targetZoom - controls.currentZoom) * 0.05;
    updateCameraFromControls();
    camera.lookAt(controls.lookAt);
  }

  nebulaGroups.forEach(({ group, theme, phase }) => {
    const base = THEME_POSITIONS[theme];
    if (!base) return;
    group.position.y = base.y + Math.sin(t * 0.12 + phase) * 1.1;
  });

  updateLabels(dt);
  updateWarpShift(dt);
  composer.render();
}


// ============================================================================
// Print styles + title popover
// ============================================================================

let activePrintStyleId = 'nebula';
let printModelCache = null;
let titleLongPressTimer = null;
let titleLongPressFired = false;

function printColorsMap() {
  const map = {};
  Object.keys(PRINT_THEME_COLORS).forEach((t) => {
    map[t] = `#${new THREE.Color(PRINT_THEME_COLORS[t]).getHexString()}`;
  });
  return map;
}

function ensurePrintModel(data) {
  if (!printModelCache) {
    printModelCache = buildModelForStyles(data, Object.keys(THEME_COLORS), printColorsMap());
    // Keep the one-pager to two projects per theme for exact A4 fit
    printModelCache.themes.forEach((t) => { t.projects = t.projects.slice(0, 2); });
  }
  return printModelCache;
}

function renderPrintStyleControls() {
  return `<div class="pv-style-bar no-print" role="group" aria-label="Print style">
    ${PRINT_STYLES.map((s) => `
      <button type="button" class="pv-style-btn${s.id === activePrintStyleId ? ' active' : ''}"
        data-print-style="${s.id}" title="${s.description || s.label}">${s.label}</button>`).join('')}
    <a class="pv-style-pdf" href="/cv/pdf/${activePrintStyleId}.pdf" download>PDF</a>
  </div>`;
}

function applyPrintStyle(styleId, { persist = true } = {}) {
  const style = getPrintStyle(styleId);
  activePrintStyleId = style.id;
  if (persist) {
    try { localStorage.setItem(PRINT_STYLE_STORAGE_KEY, style.id); } catch { /* ignore */ }
  }
  const params = new URLSearchParams(location.search);
  if (!params.has('print')) params.set('print', '1');
  params.set('style', style.id);
  const next = `${location.pathname}?${params.toString()}`;
  if (location.search !== `?${params.toString()}`) {
    history.replaceState(null, '', next);
  }
  const printView = document.getElementById('print-view');
  const model = ensurePrintModel(contentData);
  printView.dataset.printStyle = style.id;
  printView.innerHTML = renderPrintStyleControls() + style.render(model);
  printView.querySelectorAll('[data-print-style]').forEach((btn) => {
    btn.addEventListener('click', () => applyPrintStyle(btn.dataset.printStyle));
  });
}

function generatePrintView(data) {
  ensurePrintModel(data);
  const params = new URLSearchParams(location.search);
  let stored = null;
  try { stored = localStorage.getItem(PRINT_STYLE_STORAGE_KEY); } catch { /* ignore */ }
  activePrintStyleId = resolvePrintStyleId({ urlStyle: params.get('style'), stored });
  applyPrintStyle(activePrintStyleId, { persist: true });

  if (params.get('print') === '1' || location.hash === '#print') {
    document.body.classList.add('print-preview');
  }
}

function closePrintStyleMenu() {
  const menu = document.getElementById('print-style-menu');
  if (menu) {
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
  }
  document.querySelector('.title-print-link')?.classList.remove('holding');
}

function openPrintStyleMenu(anchor) {
  const menu = document.getElementById('print-style-menu');
  if (!menu) return;
  const html = `
    <div class="psm-title">Print &amp; PDF</div>
    <div class="psm-section">HTML views</div>
    ${PRINT_STYLES.map((s) => `
      <a class="psm-item" href="/cv/?print=1&style=${s.id}">
        <span class="psm-label">${s.label}</span>
        <span class="psm-desc">${s.description || 'Print view'}</span>
      </a>`).join('')}
    <div class="psm-section">PDF downloads</div>
    ${PRINT_STYLES.map((s) => `
      <a class="psm-item" href="/cv/pdf/${s.id}.pdf" download>
        <span class="psm-label">${s.label} PDF</span>
        <span class="psm-desc">A4 one-pager</span>
      </a>`).join('')}`;
  menu.innerHTML = html;
  menu.hidden = false;
  menu.setAttribute('aria-hidden', 'false');
  const rect = anchor.getBoundingClientRect();
  menu.style.left = `${Math.min(window.innerWidth - 280, Math.max(12, rect.left + rect.width / 2 - 130))}px`;
  menu.style.top = `${Math.min(window.innerHeight - 20, rect.bottom + 10)}px`;
}

function setupTitlePrintMenu() {
  const link = document.querySelector('.title-print-link');
  if (!link) return;
  const HOLD_MS = 500;

  const clearHold = () => {
    if (titleLongPressTimer) {
      clearTimeout(titleLongPressTimer);
      titleLongPressTimer = null;
    }
    link.classList.remove('holding');
  };

  const startHold = (e) => {
    noteUserActivity();
    titleLongPressFired = false;
    clearHold();
    link.classList.add('holding');
    titleLongPressTimer = setTimeout(() => {
      titleLongPressFired = true;
      link.classList.remove('holding');
      openPrintStyleMenu(link);
    }, HOLD_MS);
  };

  link.addEventListener('pointerdown', (e) => {
    if (e.button === 2) return;
    startHold(e);
  });
  link.addEventListener('pointerup', clearHold);
  link.addEventListener('pointerleave', clearHold);
  link.addEventListener('pointercancel', clearHold);
  link.addEventListener('click', (e) => {
    e.stopPropagation();
    if (titleLongPressFired) {
      e.preventDefault();
      titleLongPressFired = false;
      return;
    }
    // short click → default print view (href)
  });
  link.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearHold();
    titleLongPressFired = true;
    openPrintStyleMenu(link);
  });
  document.addEventListener('pointerdown', (e) => {
    const menu = document.getElementById('print-style-menu');
    if (!menu || menu.hidden) return;
    if (menu.contains(e.target) || link.contains(e.target)) return;
    closePrintStyleMenu();
  });
}

async function init() {
  console.log('Initializing 3D CV...');
  initScene();
  console.log(`Loaded ${contentData.length} projects from bundled content`);
  createStarsFromBullets(contentData);
  fitOverviewToClusters();
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
