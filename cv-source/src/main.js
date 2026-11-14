import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/500.css';
import '@fontsource/source-sans-3/600.css';
import './print/print-styles.css';
import { marked } from 'marked';
import topicsRegistry from './topics.json';
import {
  PRINT_STYLES,
  PRINT_STYLE_STORAGE_KEY,
  getPrintStyle,
  resolvePrintStyleId,
  buildModelForStyles
} from './print/registry.js';
import { THEME_CLUSTER_SLUGS } from './print/icons.js';

/** Injected by vite.config.js — used to cache-bust content-data.json fetches. */
const BUILD_ID = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';

async function loadContentData() {
  const url = `${import.meta.env.BASE_URL}content-data.json?v=${encodeURIComponent(BUILD_ID)}`;
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`content-data.json ${res.status} (${url})`);
  const data = await res.json();
  if (!Array.isArray(data) || !data.length) throw new Error('content-data.json empty or invalid');
  return data;
}

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
/** Desktop layout — hexagonal ring (middle waist pushed outward, not two columns). */
const THEME_LAYOUT_DESKTOP = {
  'Physics': { x: -78, y: 40, z: 42 },
  'Languages & Compilers': { x: -132, y: -6, z: -40 },
  'Tools & Apps': { x: 2, y: 36, z: -58 },
  'Systems & Virtualization': { x: 132, y: -2, z: -12 },
  'Games & 3D': { x: -44, y: -60, z: 6 },
  'Art & Culture': { x: 76, y: -48, z: 42 }
};

/** Tall 3×2 for portrait — inset so labels/clusters stay inside the viewport. */
const THEME_LAYOUT_MOBILE = {
  'Physics': { x: -28, y: 78, z: 22 },
  'Languages & Compilers': { x: 28, y: 72, z: -28 },
  'Tools & Apps': { x: -32, y: 8, z: -40 },
  'Systems & Virtualization': { x: 30, y: 14, z: 8 },
  'Games & 3D': { x: -30, y: -70, z: -10 },
  'Art & Culture': { x: 30, y: -64, z: 34 }
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

/** Fixed-screen mini-HUD labels (HTML overlay), pixel-snapped — no CSS3D/sprite scale jitter. */
function getLabelLayer() {
  return document.getElementById('label-layer');
}

function createHudLabelEl(text, hex, { kind = 'project' } = {}) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `ms-label ms-label-${kind}`;
  el.style.setProperty('--ms-accent', `#${new THREE.Color(hex).getHexString()}`);
  el.innerHTML = `<span class="ms-label-bar" aria-hidden="true"></span><span class="ms-label-text"></span>`;
  el.querySelector('.ms-label-text').textContent = text;
  el.setAttribute('aria-label', text);
  getLabelLayer()?.appendChild(el);
  return el;
}

function createLabelAnchor({ text, hex, kind, parent }) {
  const anchor = new THREE.Object3D();
  const el = createHudLabelEl(text, hex, { kind });
  anchor.userData.isLabel = true;
  anchor.userData.kind = kind;
  anchor.userData.el = el;
  anchor.userData.labelTitle = text;
  anchor.userData.baseOpacity = 1;
  anchor.userData.lastSx = -9999;
  anchor.userData.lastSy = -9999;
  anchor.visible = false;
  // Sprite-compat shim used by older QA helpers
  anchor.material = { opacity: 0 };
  // Object3D.scale is read-only in modern Three.js — mutate in place
  anchor.scale.set(1, 1, 1);
  el.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    noteUserActivity();
  });
  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    noteUserActivity();
    openFromLabel(anchor);
  });
  (parent || scene).add(anchor);
  labelSprites.push(anchor);
  return anchor;
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
/** Semantic zoom: 1 = overview, 2 = cluster, 3 = HUD detail */
let viewLevel = 1;
let focusTheme = null;
let overviewPose = null;
let clusterPose = null;
/** Active skills/tech topic filter (?topic=<id>); null = show all. */
let activeTopicId = null;
const TOPICS_BY_ID = Object.fromEntries(topicsRegistry.map((t) => [t.id, t]));
const CLUSTER_BY_SLUG = Object.fromEntries(
  Object.entries(THEME_CLUSTER_SLUGS).map(([theme, slug]) => [slug, theme])
);
/** Type-to-search: query string while the Searching… HUD is open. */
let searchQuery = '';
let searchActive = false;
const searchMatchIds = new Set(); // project ids that match the current query
let softWhiteDisc;
const softThemeDiscs = {};
const clock = new THREE.Clock();
const FLY_DURATION_MS = 900;
const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- HUD labels (HTML overlay) ---
let labelResolveAt = 0; // kept for call sites that force a refresh

// --- Warp tour ---
let autoMode = false;
let idleTimer = null;
let warpCountdownTimer = null;
let warpDeadline = 0;
let warpVisited = new Set();
let lastWarpedProjectId = null;
let warpJumpInProgress = false;
/** Warp tour timing — configure both in one place. */
const IDLE_MS = 30000;           // idle delay before entering warp tour
const WARP_INTERVAL_MS = 10000;  // seconds between jumps (countdown + progress bar)

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
      float streak = strength * 0.028 * radial;
      vec2 streakDir = r > 1e-4 ? normalize(dir) : vec2(0.0);
      vec2 ca = streakDir * strength * 0.010;
      vec3 col;
      col.r = texture2D(tDiffuse, uv - streakDir * streak + ca).r;
      col.g = texture2D(tDiffuse, uv - streakDir * streak * 0.55).g;
      col.b = texture2D(tDiffuse, uv + streakDir * streak - ca).b;
      vec3 tinted = col;
      // Stronger but still tasteful Doppler tint
      tinted.r = mix(col.r, min(col.r * 1.45 + 0.08, 1.0), redW * strength);
      tinted.b = mix(col.b, min(col.b * 1.55 + 0.10, 1.0), blueW * strength);
      tinted.g = mix(col.g, col.g * 0.88, strength * 0.55);
      float mixAmt = clamp(strength * 1.15, 0.0, 1.0);
      gl_FragColor = vec4(mix(col, tinted, mixAmt), 1.0);
    }
  `
};

/** Zoom-only Doppler: driven by radial dolly / zoom velocity — not orbit or idle. */
let _prevLookDist = 0;
let _prevZoomCtrl = 0;
let _zoomVelSmoothed = 0;
let _warpStrengthSmoothed = 0;
let _warpCamInit = false;

function updateWarpShift(dt) {
  if (!warpShiftPass) return;
  const lookDist = camera.position.distanceTo(controls.lookAt);
  const zoomCtrl = controls.currentZoom;
  if (!_warpCamInit) {
    _prevLookDist = lookDist;
    _prevZoomCtrl = zoomCtrl;
    _warpCamInit = true;
  }
  const invDt = 1 / Math.max(dt, 1e-4);
  // Radial distance change = zoom in/out; pure orbit keeps lookDist ≈ constant
  const radialVel = (lookDist - _prevLookDist) * invDt;
  const zoomCtrlVel = (zoomCtrl - _prevZoomCtrl) * invDt;
  _prevLookDist = lookDist;
  _prevZoomCtrl = zoomCtrl;

  const zoomVel = Math.max(Math.abs(radialVel), Math.abs(zoomCtrlVel) * 0.85);
  const reduced = prefersReducedMotion();
  const speedN = THREE.MathUtils.clamp(zoomVel / (reduced ? 140 : 48), 0, 1);
  let target = reduced ? 0 : Math.pow(speedN, 0.9);
  // Dead-zone: ignore tiny jitter from orbit smoothing / idle spin
  if (zoomVel < (reduced ? 8 : 3.5)) target = 0;

  const ease = 1 - Math.exp(-(reduced ? 4 : 12) * dt);
  _zoomVelSmoothed += (zoomVel - _zoomVelSmoothed) * ease;
  _warpStrengthSmoothed += (target - _warpStrengthSmoothed) * ease;
  if (_warpStrengthSmoothed < 0.012) _warpStrengthSmoothed = 0;

  const forced = typeof window.__forceWarpShift === 'number' ? window.__forceWarpShift : null;
  warpShiftPass.uniforms.strength.value = forced != null ? forced : _warpStrengthSmoothed;
  // Zooming in (distance ↓) → blue ahead; zooming out → red-forward feel
  const rawSign = -Math.sign(radialVel || zoomCtrlVel);
  const aSign = rawSign * THREE.MathUtils.clamp(_zoomVelSmoothed / 40, 0, 1);
  const forcedSign = typeof window.__forceWarpAccel === 'number' ? window.__forceWarpAccel : null;
  warpShiftPass.uniforms.accelSign.value = forcedSign != null
    ? forcedSign
    : (warpShiftPass.uniforms.accelSign.value + (aSign - warpShiftPass.uniforms.accelSign.value) * ease);
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

/** Derive spherical control state from the current camera vs an orbit target. */
function syncControlsFromCamera(lookAt = controls.lookAt) {
  const look = lookAt.clone();
  const dx = camera.position.x - look.x;
  const dy = camera.position.y - look.y - 10;
  const dz = camera.position.z - look.z;
  const flat = Math.hypot(dx, dz);
  // Invert updateCameraFromControls: y = look.y + sin(rx)*r*0.55 + 10
  // Use flat ≈ r*cos(rx) to recover r, then rx
  let rx = Math.atan2(dy / 0.55, flat);
  rx = THREE.MathUtils.clamp(rx, -1.1, 1.1);
  const cosRx = Math.max(Math.cos(rx), 1e-4);
  const radius = Math.max(flat / cosRx, 24);
  const ry = Math.atan2(dx, dz);
  controls.lookAt.copy(look);
  controls.currentZoom = radius;
  controls.targetZoom = radius;
  controls.currentRotationX = rx;
  controls.targetRotationX = rx;
  controls.currentRotationY = ry;
  controls.targetRotationY = ry;
}

function applyOrbitSmoothing() {
  controls.currentRotationX += (controls.targetRotationX - controls.currentRotationX) * 0.05;
  controls.currentRotationY += (controls.targetRotationY - controls.currentRotationY) * 0.05;
  controls.currentZoom += (controls.targetZoom - controls.currentZoom) * 0.05;
  updateCameraFromControls();
  camera.lookAt(controls.lookAt);
}

function refreshClusterPoseFromControls() {
  if (viewLevel !== 2 || !focusTheme) return;
  clusterPose = captureCameraPose();
  preHudPose = clusterPose;
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
      return;
    }
    const home = new THREE.Vector3(base.x + off.x, base.y + off.y, base.z + off.z);
    label.userData.home.copy(home);
    label.position.copy(home);
  });

  if (stars.length) createProjectLineages();
}

/**
 * Fit overview so all six clusters + theme labels sit fully inside the
 * viewport with a comfortable margin (desktop + mobile).
 */
function fitOverviewToClusters() {
  applyThemeLayout();

  const isMobile = window.innerWidth < 768;
  // Nebula glow + bloom halo; theme labels sit ~26 above centers
  const padX = isMobile ? 28 : 38;
  const padYLo = isMobile ? 26 : 36;
  const padYHi = isMobile ? 38 : 46;
  const padZ = isMobile ? 26 : 36;
  const box = new THREE.Box3();
  Object.values(THEME_POSITIONS).forEach((p) => {
    box.expandByPoint(new THREE.Vector3(p.x - padX, p.y - padYLo, p.z - padZ));
    box.expandByPoint(new THREE.Vector3(p.x + padX, p.y + padYHi, p.z + padZ));
  });

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  // Keep lookAt near true center so corners aren't asymmetrically clipped
  controls.lookAt.set(center.x * 0.01, center.y * 0.2, center.z * 0.02);

  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const aspect = Math.max(camera.aspect, 0.35);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  // Leave margin for bloom halo + labels (mobile layout already inset)
  const fill = isMobile ? 0.70 : 0.58;
  const halfH = Math.max(size.y, size.z * 0.55) * 0.5;
  const halfW = Math.max(size.x, size.z * 0.45) * 0.5;
  const distV = halfH / Math.tan((vFov * fill) / 2);
  const distH = halfW / Math.tan((hFov * fill) / 2);
  let dist = Math.max(distV, distH);
  dist = THREE.MathUtils.clamp(dist, isMobile ? 155 : 190, isMobile ? 340 : 480);

  controls.targetZoom = dist;
  controls.currentZoom = dist;
  controls.targetRotationX = isMobile ? 0.14 : 0.08;
  controls.targetRotationY = isMobile ? 0.02 : 0.10;
  controls.currentRotationX = controls.targetRotationX;
  controls.currentRotationY = controls.targetRotationY;
  updateCameraFromControls();
  camera.lookAt(controls.lookAt);

  // Screen-space guard: zoom out until every theme (+ bloom + label) is inset
  const w = window.innerWidth;
  const h = window.innerHeight;
  const marginX = isMobile ? 18 : Math.max(48, w * 0.06);
  const marginY = isMobile ? 28 : Math.max(52, h * 0.08);
  const bloomPad = isMobile ? 28 : Math.max(42, Math.min(w, h) * 0.055);
  const ndc = new THREE.Vector3();
  for (let iter = 0; iter < 12; iter++) {
    let needsZoom = false;
    Object.values(THEME_POSITIONS).forEach((p) => {
      ndc.set(p.x, p.y, p.z).project(camera);
      const sx = (ndc.x * 0.5 + 0.5) * w;
      const sy = (-ndc.y * 0.5 + 0.5) * h;
      const labelHalfW = Math.max(48, (55 / Math.max(controls.currentZoom, 1)) * h * 0.32);
      const labelHalfH = Math.max(12, (8.4 / Math.max(controls.currentZoom, 1)) * h * 0.32);
      ndc.set(p.x, p.y + 26, p.z).project(camera);
      const lsx = (ndc.x * 0.5 + 0.5) * w;
      const lsy = (-ndc.y * 0.5 + 0.5) * h;
      if (
        sx - bloomPad < marginX || sx + bloomPad > w - marginX
        || sy - bloomPad < marginY || sy + bloomPad > h - marginY
        || lsx - labelHalfW < marginX * 0.55
        || lsx + labelHalfW > w - marginX * 0.55
        || lsy - labelHalfH < marginY * 0.6
        || lsy + labelHalfH > h - marginY * 0.45
      ) {
        needsZoom = true;
      }
    });
    if (!needsZoom) break;
    dist *= 1.09;
    dist = Math.min(dist, isMobile ? 360 : 520);
    controls.targetZoom = dist;
    controls.currentZoom = dist;
    updateCameraFromControls();
    camera.lookAt(controls.lookAt);
  }

  if (scene.fog) scene.fog.density = THREE.MathUtils.clamp(0.7 / dist, 0.0012, 0.0036);
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

/** Background starfield: dense points on a far sphere, constant screen size so they stay visible. */
let starfieldPoints = null;
let starfieldAccent = null;

function createDistantField() {
  const N = 4800;
  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  const phases = new Float32Array(N);
  const rand = mulberry32(42);
  for (let i = 0; i < N; i++) {
    const r = 420 + rand() * 780;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    // Bright enough to survive ACES + bloom threshold (~0.68)
    const b = 0.55 + rand() * 0.45;
    const cool = rand() > 0.62;
    colors[i * 3] = cool ? b * 0.82 : b;
    colors[i * 3 + 1] = b * (0.88 + rand() * 0.1);
    colors[i * 3 + 2] = cool ? Math.min(1, b * 1.15) : b * 0.92;
    phases[i] = rand() * Math.PI * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 2.4,
    sizeAttenuation: false, // fixed screen pixels at every zoom
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    fog: false
  });
  starfieldPoints = new THREE.Points(geo, mat);
  starfieldPoints.frustumCulled = false;
  starfieldPoints.renderOrder = -2;
  starfieldPoints.userData.kind = 'starfield';
  starfieldPoints.userData.phases = phases;
  starfieldPoints.userData.baseColors = Float32Array.from(colors);
  starfieldPoints.userData.pickable = false;
  scene.add(starfieldPoints);

  const accentColors = [0x88aacc, 0xccaa88, 0xaa88cc, 0x88ccaa];
  starfieldAccent = new THREE.Group();
  starfieldAccent.renderOrder = -1;
  for (let i = 0; i < 64; i++) {
    const r = 400 + rand() * 600;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const sprite = createSoftSprite(accentColors[i % accentColors.length], 6 + rand() * 10, 0.22);
    sprite.material.fog = false;
    sprite.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    sprite.userData.pickable = false;
    starfieldAccent.add(sprite);
  }
  scene.add(starfieldAccent);
}

function updateStarfieldTwinkle(t) {
  if (!starfieldPoints) return;
  const cols = starfieldPoints.geometry.attributes.color;
  const phases = starfieldPoints.userData.phases;
  const base = starfieldPoints.userData.baseColors;
  // Update a rolling subset each frame for cheap twinkle
  const n = phases.length;
  const start = Math.floor(t * 60) % n;
  const span = Math.min(400, n);
  for (let k = 0; k < span; k++) {
    const i = (start + k) % n;
    const tw = 0.65 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.7 + phases[i]));
    const i3 = i * 3;
    cols.array[i3] = base[i3] * tw;
    cols.array[i3 + 1] = base[i3 + 1] * tw;
    cols.array[i3 + 2] = base[i3 + 2] * tw;
  }
  cols.needsUpdate = true;
  // Gentle parallax: counter-shift accents slightly opposite camera orbit
  if (starfieldAccent) {
    starfieldAccent.position.set(
      -camera.position.x * 0.02,
      -camera.position.y * 0.02,
      -camera.position.z * 0.02
    );
  }
  if (starfieldPoints) {
    starfieldPoints.position.set(
      -camera.position.x * 0.015,
      -camera.position.y * 0.015,
      -camera.position.z * 0.015
    );
  }
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

    const themeLabel = createLabelAnchor({ text: theme, hex: color, kind: 'theme', parent: group });
    themeLabel.position.set(0, 26, 0);
    themeLabel.userData.theme = theme;
    themeLabel.userData.priority = 100;
    themeLabel.userData.home = themeLabel.position.clone();
    themeLabel.userData.themeOffset = themeLabel.position.clone();
    themeLabel.userData.screenOffset = { x: 0, y: -18 };

    scene.add(group);
    nebulaGroups.push({ group, theme, phase: rand() * Math.PI * 2 });
  });
}

/**
 * Each Markdown bullet → one star, clustered by project inside its theme nebula.
 */
function addProjectStarCluster({
  project,
  cluster,
  theme,
  themePos,
  color,
  slot = 0,
  pi = 0,
  satellite = false
}) {
  // Every project gets an L2 mini-HUD label (fixed screen size)
  {
    const pl = createLabelAnchor({ text: project.title, hex: color, kind: 'project', parent: scene });
    const yOff = satellite ? 1.6 : 2.8 + (slot % 2) * 1.1;
    const xOff = satellite ? ((slot % 2 === 0) ? -1.6 : 1.8) : ((slot % 2 === 0) ? -2.8 : 3.2);
    pl.position.copy(cluster).add(new THREE.Vector3(xOff, yOff, (slot % 2) * 0.8));
    pl.userData.projectId = project.id;
    pl.userData.projectTheme = theme;
    pl.userData.priority = satellite ? Math.min(project.weight || 3, 3) : (project.weight || 5);
    pl.userData.satelliteOf = project.satelliteOf || null;
    pl.userData.home = pl.position.clone();
    pl.userData.themeOffset = pl.position.clone().sub(themePos);
    pl.userData.screenOffset = { x: slot % 2 === 0 ? -10 : 10, y: -14 };
  }

  const bullets = project.bullets || [];
  const n = Math.max(bullets.length, 1);
  const starBullets = bullets.length ? bullets : [{ text: project.title || project.id, section: null }];
  starBullets.forEach((bullet, bi) => {
    const br = mulberry32(10000 + pi * 97 + bi * 13 + (satellite ? 3331 : 0));
    const angle = (bi / n) * Math.PI * 2 + br() * 0.4;
    const radius = satellite ? (1.2 + br() * 1.6) : (4 + br() * 7);
    const position = new THREE.Vector3(
      cluster.x + Math.cos(angle) * radius,
      cluster.y + (br() - 0.5) * (satellite ? 2.2 : 6),
      cluster.z + Math.sin(angle) * radius
    );

    const weight = project.weight || (satellite ? 3 : 5);
    const size = satellite
      ? 0.85 + (Math.min(weight, 4) / 10) * 1.1
      : 1.6 + (weight / 10) * 2.2;
    const haloOpacity = satellite ? 0.55 : 0.92;

    const group = new THREE.Group();
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: softThemeDiscs[theme] || softWhiteDisc,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: haloOpacity,
      fog: true
    }));
    halo.scale.set(size * 2.8, size * 2.8, 1);
    group.add(halo);

    const core = new THREE.Sprite(new THREE.SpriteMaterial({
      map: softWhiteDisc,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: satellite ? 0.85 : 1,
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
      id: `${project.id}__${bi}`,
      satellite: !!satellite
    });
  });

  // Snap project label just above the project's first star
  const pl = labelSprites.find(
    (l) => l.userData.kind === 'project' && l.userData.projectId === project.id
  );
  const firstStar = stars.find((s) => s.project.id === project.id);
  if (pl && firstStar) {
    const side = (slot % 2 === 0) ? -1 : 1;
    const lift = satellite ? 2.0 : 3.2;
    pl.position.copy(firstStar.position).add(new THREE.Vector3(side * (satellite ? 1.5 : 2.4), lift, 0.4));
    pl.userData.home.copy(pl.position);
    pl.userData.themeOffset = pl.position.clone().sub(themePos);
  }
}

function createStarsFromBullets(projectList) {
  // Skip "about" intro — it is header/about, not a Tools project cluster
  projects = projectList.filter((p) => p.role !== 'about' && p.role !== 'meta' && p.id !== 'intro');
  createNebulae();

  const byTheme = {};
  projects.forEach((p) => {
    const theme = p.theme || 'Tools & Apps';
    if (!THEME_POSITIONS[theme]) return; // ignore non-nebula themes
    if (!byTheme[theme]) byTheme[theme] = [];
    byTheme[theme].push(p);
  });

  // Place hubs first so satellites can orbit them (even across themes).
  Object.keys(byTheme).forEach((theme) => {
    const themePos = THEME_POSITIONS[theme];
    const color = THEME_COLORS[theme];
    const plist = byTheme[theme].filter((p) => !p.satelliteOf);
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

      addProjectStarCluster({
        project,
        cluster,
        theme,
        themePos,
        color,
        slot,
        pi,
        satellite: false
      });
    });
  });

  // Satellites orbit their parent hub (may be in another theme).
  const satellites = projects.filter((p) => p.satelliteOf && THEME_POSITIONS[p.theme || '']);
  const byParent = {};
  satellites.forEach((p) => {
    const key = p.satelliteOf;
    if (!byParent[key]) byParent[key] = [];
    byParent[key].push(p);
  });
  Object.entries(byParent).forEach(([parentId, kids]) => {
    const parentStar = stars.find((s) => s.project.id === parentId);
    const parentProject = projects.find((p) => p.id === parentId);
    const parentTheme = parentProject?.theme || kids[0].theme;
    // Layout offsets follow the parent hub's theme so satellites stay nearby
    // when desktop/mobile theme layouts swap.
    const layoutTheme = parentTheme || kids[0].theme;
    const themePos = THEME_POSITIONS[layoutTheme] || THEME_POSITIONS[kids[0].theme];
    const center = parentStar
      ? parentStar.position.clone()
      : (themePos ? new THREE.Vector3(themePos.x, themePos.y, themePos.z) : new THREE.Vector3());
    kids.forEach((project, si) => {
      const angle = (si / Math.max(kids.length, 1)) * Math.PI * 2;
      const orbit = 5.5 + (si % 3) * 1.2;
      const cluster = new THREE.Vector3(
        center.x + Math.cos(angle) * orbit,
        center.y + Math.sin(angle * 1.7) * 2.4,
        center.z + Math.sin(angle) * orbit
      );
      // Keep visual theme color from the content theme; layout uses parent themePos.
      const visualTheme = project.theme || layoutTheme;
      addProjectStarCluster({
        project,
        cluster,
        theme: visualTheme,
        themePos: themePos || center,
        color: THEME_COLORS[visualTheme] || THEME_COLORS[layoutTheme],
        slot: si,
        pi: si + 50,
        satellite: true
      });
    });
  });

  createProjectLineages();

  window.stars = stars;
  window.scene = scene;
  window.camera = camera;
  window.controls = controls;
  window.composer = composer;
  window.fitOverviewToClusters = fitOverviewToClusters;
  Object.defineProperty(window, 'viewLevel', { get: () => viewLevel, configurable: true });
  Object.defineProperty(window, 'focusTheme', { get: () => focusTheme, configurable: true });
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
      // Deduplicate undirected edges
      if (lineageLines.some((l) =>
        (l.userData.fromId === star.project.id && l.userData.toId === rid)
        || (l.userData.fromId === rid && l.userData.toId === star.project.id)
      )) return;
      const geom = new THREE.BufferGeometry().setFromPoints([star.position, other.position]);
      const mid = new THREE.Color(star.color).lerp(new THREE.Color(other.color), 0.5);
      const line = new THREE.Line(geom, new THREE.LineBasicMaterial({
        color: mid,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }));
      line.userData.fromId = star.project.id;
      line.userData.toId = rid;
      line.userData.baseOpacity = 0.22;
      scene.add(line);
      lineageLines.push(line);
    });
  });
}

function projectMatchesTopic(project, topicId = activeTopicId) {
  if (!topicId) return true;
  return (project?.topics || []).includes(topicId);
}

/** Case- and accent-insensitive fold (Réunifions ↔ reunifions). */
function foldText(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function projectSearchBlob(project) {
  if (!project) return '';
  const parts = [
    project.title,
    project.id,
    project.theme,
    THEME_CLUSTER_SLUGS[project.theme],
    ...(project.bullets || []).map((b) => (typeof b === 'string' ? b : b.text)),
    String(project.content || '').replace(/<[^>]+>/g, ' ')
  ];
  for (const tid of project.topics || []) {
    const t = TOPICS_BY_ID[tid];
    parts.push(tid, t?.name, t?.description);
  }
  return foldText(parts.filter(Boolean).join('\n'));
}

function scoreProjectSearch(project, qFold) {
  if (!project || !qFold) return 0;
  const title = foldText(project.title);
  const theme = foldText(project.theme);
  const slug = foldText(THEME_CLUSTER_SLUGS[project.theme] || '');
  if (title === qFold) return 100;
  if (title.startsWith(qFold)) return 92;
  if (title.includes(qFold)) return 80;
  if (theme.includes(qFold) || slug.includes(qFold)) return 58;
  for (const tid of project.topics || []) {
    const t = TOPICS_BY_ID[tid];
    if (foldText(tid).includes(qFold) || foldText(t?.name).includes(qFold)) return 52;
  }
  if (projectSearchBlob(project).includes(qFold)) return 28;
  return 0;
}

function recomputeSearchMatches() {
  searchMatchIds.clear();
  const q = foldText(searchQuery.trim());
  if (!searchActive || !q) return;
  projects.forEach((p) => {
    if (scoreProjectSearch(p, q) > 0) searchMatchIds.add(p.id);
  });
}

function bestSearchMatch() {
  const q = foldText(searchQuery.trim());
  if (!q) return null;
  let best = null;
  let bestScore = 0;
  projects.forEach((p) => {
    const s = scoreProjectSearch(p, q);
    if (s > bestScore) {
      bestScore = s;
      best = p;
    }
  });
  return best;
}

function refreshEdgeOpacities() {
  const focusId = currentStar?.project?.id || null;
  lineageLines.forEach((line) => {
    let op = line.userData.baseOpacity ?? 0.22;
    if (activeTopicId) {
      const a = projects.find((p) => p.id === line.userData.fromId);
      const b = projects.find((p) => p.id === line.userData.toId);
      const am = projectMatchesTopic(a, activeTopicId);
      const bm = projectMatchesTopic(b, activeTopicId);
      // Brightest when both ends match the topic; still visible if one matches
      if (am && bm) op = 0.88;
      else if (am || bm) op = 0.42;
      else op = 0.05;
    }
    if (searchActive && foldText(searchQuery.trim())) {
      const aMatch = searchMatchIds.has(line.userData.fromId);
      const bMatch = searchMatchIds.has(line.userData.toId);
      if (aMatch && bMatch) op = Math.max(op, 0.7);
      else if (aMatch || bMatch) op = Math.max(op * 0.85, 0.28);
      else op = Math.min(op, 0.06);
    }
    if (focusId) {
      const onFocus = line.userData.fromId === focusId || line.userData.toId === focusId;
      op = onFocus ? Math.max(op, 0.8) : Math.min(op, (activeTopicId || searchActive) ? op : 0.08);
    }
    line.material.opacity = op;
  });
}

function highlightConnectedEdges(_projectId) {
  refreshEdgeOpacities();
}

function starVisibilityMul(star) {
  let mul = 1;
  const topicOk = projectMatchesTopic(star.project);
  if (activeTopicId) mul *= topicOk ? 1.05 : 0.42;
  if (searchActive && foldText(searchQuery.trim())) {
    const hit = searchMatchIds.has(star.project.id);
    mul *= hit ? 1.08 : 0.32;
  }
  if (viewLevel >= 3) mul *= 0.7;
  return mul;
}

function applyTopicFilter() {
  refreshStarVisibility();
  updateTopicIndicator();
}

function refreshStarVisibility() {
  recomputeSearchMatches();
  stars.forEach((s) => {
    const topicOk = projectMatchesTopic(s.project);
    const searchHit = !searchActive || !foldText(searchQuery.trim()) || searchMatchIds.has(s.project.id);
    const mul = starVisibilityMul(s);
    if (s.halo?.material) {
      const base = s.userDataHaloOp ?? 0.92;
      s.userDataHaloOp = base;
      s.halo.material.opacity = base * mul;
    }
    if (s.core?.material) {
      const base = s.userDataCoreOp ?? 1;
      s.userDataCoreOp = base;
      s.core.material.opacity = base * mul;
    }
    if (s.mesh) {
      s.mesh.userData.topicMatch = topicOk;
      s.mesh.userData.searchMatch = searchHit;
    }
  });
  labelSprites.forEach((label) => {
    const el = label.userData.el;
    if (!el) return;
    const project = label.userData.projectId
      ? projects.find((p) => p.id === label.userData.projectId)
      : null;
    const topicMatch = label.userData.kind === 'theme'
      ? (!activeTopicId || projects.some((p) => p.theme === label.userData.theme && projectMatchesTopic(p)))
      : projectMatchesTopic(project);
    el.classList.toggle('ms-label-dim', !!activeTopicId && !topicMatch);

    const qOn = searchActive && !!foldText(searchQuery.trim());
    let searchMatch = false;
    if (qOn) {
      if (label.userData.kind === 'theme') {
        searchMatch = projects.some(
          (p) => p.theme === label.userData.theme && searchMatchIds.has(p.id)
        ) || foldText(label.userData.theme || label.userData.labelTitle || '').includes(foldText(searchQuery.trim()));
      } else {
        searchMatch = !!(project && searchMatchIds.has(project.id));
      }
    }
    el.classList.toggle('ms-label-search-match', qOn && searchMatch);
    el.classList.toggle('ms-label-search-miss', qOn && !searchMatch);
  });
  refreshEdgeOpacities();
  updateSearchHud();
}

function updateSearchPulse(t) {
  if (!searchActive || !foldText(searchQuery.trim()) || prefersReducedMotion()) return;
  // ~2s breathing cycle
  const breath = 0.5 + 0.5 * Math.sin(Math.PI * t);
  stars.forEach((s) => {
    if (!s.mesh?.userData.searchMatch) return;
    if (!searchMatchIds.has(s.project.id)) return;
    const mul = starVisibilityMul(s);
    const pulse = 0.72 + 0.28 * breath;
    if (s.halo?.material) s.halo.material.opacity = (s.userDataHaloOp ?? 0.92) * mul * pulse;
    if (s.core?.material) s.core.material.opacity = (s.userDataCoreOp ?? 1) * mul * (0.85 + 0.15 * breath);
  });
}

function isEditableTarget(el) {
  if (!el || el === document.body) return false;
  const tag = (el.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
  if (el.isContentEditable) return true;
  return false;
}

function updateSearchHud() {
  const hud = document.getElementById('search-hud');
  const typedEl = hud?.querySelector('[data-search-typed]');
  const meta = hud?.querySelector('[data-search-meta]');
  const input = document.getElementById('search-input');
  if (!hud) return;
  if (!searchActive) {
    hud.hidden = true;
    hud.setAttribute('aria-hidden', 'true');
    return;
  }
  hud.hidden = false;
  hud.setAttribute('aria-hidden', 'false');
  // Exact live copy: Searching 'typed text here'…
  if (typedEl) typedEl.textContent = searchQuery;
  if (input && input !== document.activeElement) input.value = searchQuery;
  const q = foldText(searchQuery.trim());
  const n = q ? searchMatchIds.size : 0;
  if (meta) {
    meta.textContent = !q
      ? 'Type to filter the constellation'
      : (n === 0 ? 'No matches' : `${n} match${n === 1 ? '' : 'es'}`);
  }
}

function openSearchHud({ focusInput = false } = {}) {
  if (document.body.classList.contains('print-preview')) return;
  searchActive = true;
  if (autoMode) exitAutoMode();
  if (idleTimer) clearTimeout(idleTimer);
  recomputeSearchMatches();
  refreshStarVisibility();
  updateSearchHud();
  if (focusInput) {
    const input = document.getElementById('search-input');
    input?.focus({ preventScroll: true });
  }
}

function closeSearchHud() {
  searchActive = false;
  searchQuery = '';
  searchMatchIds.clear();
  const input = document.getElementById('search-input');
  if (input) {
    input.value = '';
    if (document.activeElement === input) input.blur();
  }
  refreshStarVisibility();
  updateSearchHud();
  noteUserActivity(); // re-arm idle after search
}

function setSearchQuery(next, { focusInput = false } = {}) {
  searchQuery = String(next ?? '');
  if (!searchActive) openSearchHud({ focusInput });
  else {
    recomputeSearchMatches();
    refreshStarVisibility();
  }
  updateSearchHud();
}

function commitSearchBestMatch() {
  const best = bestSearchMatch();
  if (!best) return false;
  const star = firstStarForProject(best.id);
  closeSearchHud();
  if (star) openHUD(star);
  else if (best.theme) enterClusterView(best.theme);
  return true;
}

function setupTypeToSearch() {
  const input = document.getElementById('search-input');
  const fab = document.getElementById('search-fab');
  fab?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    noteUserActivity();
    openSearchHud({ focusInput: true });
  });
  input?.addEventListener('input', () => {
    if (!input.value) {
      // Keep HUD open on mobile while the field is focused but empty
      searchQuery = '';
      searchMatchIds.clear();
      refreshStarVisibility();
      updateSearchHud();
      return;
    }
    setSearchQuery(input.value, { focusInput: true });
  });
  window.foldText = foldText;
  window.scoreProjectSearch = scoreProjectSearch;
  window.setSearchQuery = setSearchQuery;
  window.closeSearchHud = closeSearchHud;
  window.commitSearchBestMatch = commitSearchBestMatch;
  input?.addEventListener('keydown', (e) => {
    // Handled in bubble phase below too; stop overview/other globals when focused
    if (e.key === 'Escape' || e.key === 'Delete') {
      e.preventDefault();
      e.stopPropagation();
      closeSearchHud();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      commitSearchBestMatch();
    }
  });
}

function setActiveTopic(topicId, { pushUrl = true } = {}) {
  const next = topicId && TOPICS_BY_ID[topicId] ? topicId : null;
  activeTopicId = next;
  applyTopicFilter();
  if (pushUrl) {
    const params = new URLSearchParams(location.search);
    if (activeTopicId) params.set('topic', activeTopicId);
    else params.delete('topic');
    // keep print/cluster params
    const q = params.toString();
    const url = `${location.pathname}${q ? `?${q}` : ''}${location.hash || ''}`;
    history.pushState({ topic: activeTopicId }, '', url);
  }
}
window.setActiveTopic = setActiveTopic;

function updateTopicIndicator() {
  let bar = document.getElementById('topic-filter-bar');
  const mount =
    document.getElementById('bss-topic-inner')
    || document.getElementById('bottom-stack')
    || document.body;
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'topic-filter-bar';
    bar.hidden = true;
    mount.appendChild(bar);
  } else if (bar.parentElement !== mount && mount) {
    mount.appendChild(bar);
  }
  if (!activeTopicId || !TOPICS_BY_ID[activeTopicId]) {
    bar.hidden = true;
    bar.innerHTML = '';
    return;
  }
  const t = TOPICS_BY_ID[activeTopicId];
  bar.hidden = false;
  bar.innerHTML = `
    <div class="topic-filter-panel">
      <span class="topic-filter-kicker">Topic</span>
      <strong class="topic-filter-name"></strong>
      <span class="topic-filter-desc"></span>
      <button type="button" class="topic-filter-clear" aria-label="Clear topic filter">×</button>
    </div>`;
  bar.querySelector('.topic-filter-name').textContent = t.name;
  bar.querySelector('.topic-filter-desc').textContent = t.description || '';
  bar.querySelector('.topic-filter-clear').addEventListener('click', (e) => {
    e.preventDefault();
    noteUserActivity();
    setActiveTopic(null);
  });
}

function connectedProjectsFor(projectId) {
  const ids = new Set();
  const self = projects.find((p) => p.id === projectId);
  (self?.related || []).forEach((id) => ids.add(id));
  projects.forEach((p) => {
    if ((p.related || []).includes(projectId)) ids.add(p.id);
  });
  ids.delete(projectId);
  return [...ids]
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean)
    .sort((a, b) => (b.weight || 0) - (a.weight || 0));
}

const _labelWorld = new THREE.Vector3();
const _labelNdc = new THREE.Vector3();

function resolveLabelTargets() {
  // Compatibility no-op: visibility is decided each frame in updateLabels.
  labelResolveAt = performance.now() + 250;
}

/** Project world anchors → pixel-snapped HTML mini-HUD labels. */
function updateLabels(_dt) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const camPos = camera.position;

  labelSprites.forEach((label) => {
    const el = label.userData.el;
    if (!el) return;
    if (label.userData.home) label.position.copy(label.userData.home);
    label.getWorldPosition(_labelWorld);
    const dist = Math.max(_labelWorld.distanceTo(camPos), 1);
    const isTheme = label.userData.kind === 'theme';
    const labelTheme = label.userData.theme || label.userData.projectTheme;

    let wantVisible = true;
    if (isTheme) {
      if (viewLevel >= 3 || currentStar || dist < 95) wantVisible = false;
      else if (viewLevel === 2 && focusTheme && labelTheme !== focusTheme) wantVisible = false;
    } else {
      if (viewLevel < 2 || (focusTheme && labelTheme !== focusTheme)) wantVisible = false;
      else if (dist < 12) wantVisible = false;
      // Keep the open node's mini-label hidden while its large HUD is up
      if (
        currentStar
        && label.userData.projectId
        && label.userData.projectId === currentStar.project?.id
      ) {
        wantVisible = false;
        el.classList.add('ms-label-hud-open');
      } else {
        el.classList.remove('ms-label-hud-open');
      }
    }

    _labelNdc.copy(_labelWorld).project(camera);
    const behind = _labelNdc.z > 1 || _labelNdc.z < -1;
    if (behind) wantVisible = false;

    // Always project screen position — even while the open-HUD label is hidden —
    // so close FLIP can re-measure the live 3D-projected slot.
    const off = label.userData.screenOffset || { x: 0, y: -14 };
    let sx = Math.round((_labelNdc.x * 0.5 + 0.5) * w + off.x);
    let sy = Math.round((-_labelNdc.y * 0.5 + 0.5) * h + off.y);
    const lx = label.userData.lastSx;
    const ly = label.userData.lastSy;
    if (Math.abs(sx - lx) < 1 && Math.abs(sy - ly) < 1) {
      sx = lx;
      sy = ly;
    } else {
      label.userData.lastSx = sx;
      label.userData.lastSy = sy;
    }
    el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, calc(-100% - 6px))`;

    if (!wantVisible) {
      el.classList.remove('is-visible');
      label.visible = false;
      label.material.opacity = 0;
      return;
    }

    el.classList.add('is-visible');
    label.visible = true;
    label.material.opacity = 1;
  });
}

/** Force-project one label's DOM box to its current camera projection (for FLIP). */
function syncLabelScreenPosition(projectId) {
  const label = labelSprites.find(
    (l) => l.userData.kind === 'project' && l.userData.projectId === projectId
  );
  if (!label?.userData?.el) return null;
  const el = label.userData.el;
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (label.userData.home) label.position.copy(label.userData.home);
  label.getWorldPosition(_labelWorld);
  _labelNdc.copy(_labelWorld).project(camera);
  const off = label.userData.screenOffset || { x: 0, y: -14 };
  const sx = Math.round((_labelNdc.x * 0.5 + 0.5) * w + off.x);
  const sy = Math.round((-_labelNdc.y * 0.5 + 0.5) * h + off.y);
  label.userData.lastSx = sx;
  label.userData.lastSy = sy;
  el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, calc(-100% - 6px))`;
  el.style.opacity = '';
  el.style.visibility = '';
  return el;
}

function integrateLabelSprings(_dt) {
  // Legacy no-op kept for assertClusterItemLabels settle loop
}

/** Sample label screen positions; assert near-zero variance after settle. */
async function assertLabelStability({ settleMs = 1200, sampleMs = 2000, maxStd = 1.2 } = {}) {
  await new Promise((r) => setTimeout(r, settleMs));
  const ids = labelSprites.filter((l) => l.visible).map((l) => l.userData.labelTitle || l.uuid);
  const series = Object.fromEntries(ids.map((id) => [id, []]));
  const t0 = performance.now();
  while (performance.now() - t0 < sampleMs) {
    labelSprites.forEach((l) => {
      if (!l.visible) return;
      const id = l.userData.labelTitle || l.uuid;
      if (!series[id]) series[id] = [];
      series[id].push({ x: l.userData.lastSx || 0, y: l.userData.lastSy || 0 });
    });
    await new Promise((r) => setTimeout(r, 50));
  }
  const failed = [];
  Object.entries(series).forEach(([id, samples]) => {
    if (samples.length < 8) return;
    const mean = samples.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
    mean.x /= samples.length; mean.y /= samples.length;
    let varSum = 0;
    samples.forEach((p) => {
      const dx = p.x - mean.x; const dy = p.y - mean.y;
      varSum += dx * dx + dy * dy;
    });
    const std = Math.sqrt(varSum / samples.length);
    if (std > maxStd) failed.push({ id, std });
  });
  return { ok: failed.length === 0, failed, sampled: Object.keys(series).length, maxStd };
}
window.assertLabelStability = assertLabelStability;
window.assertLabelClicks = assertLabelClicks;

function updateClusterDimming() {
  const focused = viewLevel >= 3 || !!currentStar;
  bloomPass.strength = focused ? 0.28 : (viewLevel === 2 ? 0.5 : 0.62);
  renderer.toneMappingExposure = focused ? 0.68 : (viewLevel === 2 ? 1.22 : 1.34);
  labelResolveAt = 0;
  const title = document.getElementById('title-overlay');
  if (title) title.style.opacity = focused ? '0' : (viewLevel === 2 ? '0.35' : '1');
  const controlsEl = document.getElementById('controls');
  if (controlsEl) controlsEl.style.opacity = focused ? '0' : (viewLevel === 2 ? '0.4' : '1');
  nebulaGroups.forEach(({ group, theme }) => {
    group.traverse((obj) => {
      if (obj.isSprite && !obj.userData.isLabel) {
        const base = obj.userData._baseOp ?? 0.12;
        let mul = 1;
        if (focused) mul = 0.35;
        else if (viewLevel === 2 && focusTheme && theme !== focusTheme) mul = 0.22;
        obj.material.opacity = base * mul;
      }
    });
  });
}

function setSceneFocus(focused) {
  // Compatibility wrapper — semantic zoom owns focus via updateClusterDimming
  if (focused) viewLevel = 3;
  updateClusterDimming();
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

function clusterFocusPose(theme) {
  const pos = THEME_POSITIONS[theme];
  if (!pos) return null;
  const isMobile = window.innerWidth < 768;
  const reduced = prefersReducedMotion();
  const dist = reduced ? (isMobile ? 110 : 100) : (isMobile ? 92 : 82);
  const lookAt = new THREE.Vector3(pos.x, pos.y - 2, pos.z);
  const rx = isMobile ? 0.14 : 0.12;
  const ry = isMobile ? 0.06 : 0.18;
  // Position must match updateCameraFromControls so L2 orbit doesn't jump
  const position = new THREE.Vector3(
    lookAt.x + Math.sin(ry) * Math.cos(rx) * dist,
    lookAt.y + Math.sin(rx) * dist * 0.55 + 10,
    lookAt.z + Math.cos(ry) * Math.cos(rx) * dist
  );
  return {
    position,
    lookAt: lookAt.clone(),
    controls: {
      targetRotationX: rx,
      targetRotationY: ry,
      currentRotationX: rx,
      currentRotationY: ry,
      targetZoom: dist,
      currentZoom: dist,
      lookAt: lookAt.clone()
    }
  };
}

function poseFromVectors(position, lookAt) {
  return {
    position: position.clone(),
    lookAt: lookAt.clone(),
    fov: camera.fov,
    controls: {
      targetRotationX: controls.targetRotationX,
      targetRotationY: controls.targetRotationY,
      currentRotationX: controls.currentRotationX,
      currentRotationY: controls.currentRotationY,
      targetZoom: controls.targetZoom,
      currentZoom: controls.currentZoom,
      lookAt: lookAt.clone()
    }
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
    duration,
    () => {
      // Orbit around the focused star while HUD is open
      syncControlsFromCamera(focus.lookAt);
      updateCameraFromControls();
      camera.lookAt(controls.lookAt);
    }
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
      const look = pose.controls?.lookAt || pose.lookAt;
      controls.lookAt.copy(look);
      syncControlsFromCamera(look);
      updateCameraFromControls();
      camera.lookAt(controls.lookAt);
      onDone?.();
    }
  );
}

/**
 * HUD open/close choreography timings (one place).
 * Open stages ≈ flip+lateral+up+down+chips ≈ 1.1–1.4s before body teletype.
 */
const HUD_TIMING = Object.freeze({
  flipMs: 280,
  lateralMs: 220,
  upMs: 200,
  downMs: 220,
  chipMs: 160,
  chipOverlapMs: 70, // years starts before section finishes
  themeTeletypeCps: 58,
  chipTeletypeCps: 70,
  bodyTeletypeCps: 90,
  remanenceMs: 1100,
  blinkCount: 3,
  blinkPeriodMs: 70,
  fadeMs: 140,
  bodyFadeMs: 180
});
/** @deprecated aliases used by older call sites */
const HUD_FLIP_MS = HUD_TIMING.flipMs;
const HUD_EXPAND_MS = HUD_TIMING.downMs;
const HUD_TELETYPE_CPS = HUD_TIMING.bodyTeletypeCps;

let hudAnimGen = 0;
let hudTeletype = null;
const HUD_STAGE_CLASSES = [
  'hud-flying',
  'hud-clipping',
  'hud-stage-title',
  'hud-stage-wide',
  'hud-stage-up',
  'hud-stage-down',
  'hud-expanded',
  'hud-chip-section',
  'hud-chip-years',
  'hud-body-in',
  'hud-ready'
];

function findProjectLabelEl(projectId) {
  const label = labelSprites.find(
    (l) => l.userData.kind === 'project' && l.userData.projectId === projectId
  );
  return label?.userData?.el || null;
}

function removeHudFlyLabel() {
  document.getElementById('hud-fly-label')?.remove();
}

function applyHudTimingCss(hud) {
  if (!hud) return;
  hud.style.setProperty('--hud-clip-ms', `${HUD_TIMING.lateralMs}ms`);
  hud.style.setProperty('--hud-up-ms', `${HUD_TIMING.upMs}ms`);
  hud.style.setProperty('--hud-down-ms', `${HUD_TIMING.downMs}ms`);
  hud.style.setProperty('--hud-chip-ms', `${HUD_TIMING.chipMs}ms`);
  hud.style.setProperty('--hud-remanence-ms', `${HUD_TIMING.remanenceMs}ms`);
  hud.style.setProperty('--hud-blink-period', `${HUD_TIMING.blinkPeriodMs}ms`);
  hud.style.setProperty('--hud-blink-count', String(HUD_TIMING.blinkCount));
}

function clearHudInlineAnimStyles(hud) {
  if (!hud) return;
  const panel = hud.querySelector('.hud-panel');
  if (panel) {
    panel.style.clipPath = '';
    panel.style.transition = '';
    panel.style.removeProperty('--hud-clip-ms');
  }
  const titleBar = hud.querySelector('.hud-title-bar');
  if (titleBar) {
    titleBar.style.opacity = '';
    titleBar.style.transition = '';
  }
  hud.querySelectorAll(
    '[data-hud="theme"], [data-hud="section"], [data-hud="years"], .hud-index, .hud-topics, [data-hud="media"], .hud-bullet, .hud-connected'
  ).forEach((el) => {
    el.style.opacity = '';
    el.style.transition = '';
  });
  // Chip open is class/transform driven — never leave width clamps from experiments.
  hud.querySelectorAll('.hud-chip').forEach((el) => {
    el.style.width = '';
    el.style.maxWidth = '';
    el.style.flexBasis = '';
    el.style.transform = '';
    el.style.opacity = '';
    el.style.transition = '';
  });
}

function clearHudStageClasses(hud) {
  if (!hud) return;
  hud.classList.remove(...HUD_STAGE_CLASSES);
  clearHudInlineAnimStyles(hud);
}

function panelClipInsets(panel, titleBar, mode) {
  const pr = panel.getBoundingClientRect();
  const tr = titleBar.getBoundingClientRect();
  const pad = 2;
  const titleTop = Math.max(0, tr.top - pr.top - pad);
  const titleLeft = Math.max(0, tr.left - pr.left - pad);
  const titleRight = Math.max(0, pr.right - tr.right - pad);
  const titleBottom = Math.max(0, pr.bottom - tr.bottom - pad);
  if (mode === 'title') {
    return { top: titleTop, right: titleRight, bottom: titleBottom, left: titleLeft };
  }
  if (mode === 'wide') {
    return { top: titleTop, right: 0, bottom: titleBottom, left: 0 };
  }
  if (mode === 'up') {
    return { top: 0, right: 0, bottom: titleBottom, left: 0 };
  }
  return { top: 0, right: 0, bottom: 0, left: 0 };
}

function setPanelClip(panel, insets, { ms, immediate = false } = {}) {
  if (!panel) return;
  if (ms != null) panel.style.setProperty('--hud-clip-ms', `${ms}ms`);
  const next = `inset(${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px)`;
  if (immediate) {
    const prev = panel.style.transition;
    panel.style.transition = 'none';
    panel.style.clipPath = next;
    void panel.offsetWidth;
    panel.style.transition = prev || '';
    return;
  }
  panel.style.clipPath = next;
}

function stopHudTeletype({ finish = false } = {}) {
  if (!hudTeletype) return;
  const { timer, onSkip, chars, cursor, root } = hudTeletype;
  if (timer) clearInterval(timer);
  if (onSkip) {
    window.removeEventListener('keydown', onSkip, true);
    window.removeEventListener('pointerdown', onSkip, true);
  }
  if (finish && chars) {
    chars.forEach((span) => {
      span.classList.remove('hud-tt-fresh');
      span.style.visibility = 'visible';
    });
  }
  cursor?.remove();
  if (root) root.classList.remove('hud-tt-active');
  hudTeletype = null;
}

function prepareTeletypeChars(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  const chars = [];
  for (const tn of textNodes) {
    const text = tn.textContent;
    if (!text) continue;
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      const span = document.createElement('span');
      span.className = 'hud-tt-char';
      span.textContent = ch;
      span.style.visibility = 'hidden';
      frag.appendChild(span);
      chars.push(span);
    }
    tn.parentNode.replaceChild(frag, tn);
  }
  return chars;
}

function startHudTeletype(root, { cps = HUD_TIMING.bodyTeletypeCps } = {}) {
  stopHudTeletype();
  if (!root) return Promise.resolve();
  if (prefersReducedMotion()) {
    root.querySelectorAll('.hud-tt-char').forEach((el) => {
      el.style.visibility = 'visible';
      el.classList.remove('hud-tt-fresh');
    });
    return Promise.resolve();
  }
  const chars = prepareTeletypeChars(root);
  if (!chars.length) return Promise.resolve();

  root.classList.add('hud-tt-active');
  const cursor = document.createElement('span');
  cursor.className = 'hud-tt-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  root.appendChild(cursor);

  let i = 0;
  const interval = Math.max(8, Math.round(1000 / cps));
  return new Promise((resolve) => {
    const finish = () => {
      stopHudTeletype({ finish: true });
      resolve();
    };
    const onSkip = (e) => {
      if (e.type === 'keydown' && e.key === 'Escape') return; // let ESC close HUD
      e.stopPropagation();
      finish();
    };
    const timer = setInterval(() => {
      if (i >= chars.length) {
        finish();
        return;
      }
      const span = chars[i++];
      span.style.visibility = 'visible';
      span.classList.add('hud-tt-fresh');
      // High phosphor remanence — keep bright, then decay
      setTimeout(() => span.classList.remove('hud-tt-fresh'), HUD_TIMING.remanenceMs);
      cursor.remove();
      span.after(cursor);
    }, interval);
    hudTeletype = { timer, onSkip, chars, cursor, root };
    window.addEventListener('keydown', onSkip, true);
    window.addEventListener('pointerdown', onSkip, true);
  });
}

async function blinkFadeHudText(roots, gen) {
  const list = (Array.isArray(roots) ? roots : [roots]).filter(Boolean);
  if (!list.length) return;
  if (prefersReducedMotion()) {
    list.forEach((el) => {
      el.style.opacity = '0';
    });
    return;
  }
  for (let i = 0; i < HUD_TIMING.blinkCount; i++) {
    if (gen !== hudAnimGen) return;
    list.forEach((el) => {
      el.style.opacity = '0';
    });
    await waitMs(HUD_TIMING.blinkPeriodMs);
    if (gen !== hudAnimGen) return;
    list.forEach((el) => {
      el.style.opacity = '1';
    });
    await waitMs(HUD_TIMING.blinkPeriodMs);
  }
  if (gen !== hudAnimGen) return;
  list.forEach((el) => {
    el.style.transition = `opacity ${HUD_TIMING.fadeMs}ms ease`;
    el.style.opacity = '0';
  });
  await waitMs(HUD_TIMING.fadeMs);
}

function animateFlipRect(el, from, to, { duration = HUD_TIMING.flipMs, growTitle = false } = {}) {
  return new Promise((resolve) => {
    if (!el || prefersReducedMotion()) {
      resolve();
      return;
    }
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const sx = from.width / Math.max(to.width, 1);
    const sy = from.height / Math.max(to.height, 1);
    el.style.left = `${to.left}px`;
    el.style.top = `${to.top}px`;
    el.style.width = `${to.width}px`;
    el.style.height = `${to.height}px`;
    el.style.maxWidth = 'none';
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    if (growTitle) el.classList.add('hud-fly-as-title');
    el.style.transition = 'none';
    void el.offsetWidth;
    el.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.transform = 'translate(0, 0) scale(1, 1)';
    const done = () => {
      el.removeEventListener('transitionend', done);
      resolve();
    };
    el.addEventListener('transitionend', done);
    setTimeout(done, duration + 40);
  });
}

function waitMs(ms) {
  return new Promise((r) => setTimeout(r, prefersReducedMotion() ? 0 : ms));
}

function stillHudGen(gen) {
  return gen === hudAnimGen;
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
  // Prefer full project HTML so teletype walks rendered text nodes (links/formatting survive).
  // Fall back to the clicked bullet for sparse items.
  const bulletEl = hud.querySelector('[data-hud="bullet"]');
  if (project.content) {
    bulletEl.innerHTML = project.content;
  } else {
    const raw = bullet.text || '';
    bulletEl.innerHTML = raw ? marked.parseInline(raw, { async: false }) : '';
  }

  const topicsEl = hud.querySelector('[data-hud="topics"]');
  if (topicsEl) {
    topicsEl.innerHTML = '';
    const topics = Array.isArray(project.topics) ? project.topics : [];
    if (!topics.length) {
      topicsEl.hidden = true;
    } else {
      topicsEl.hidden = false;
      topics.forEach((tid) => {
        const chip = document.createElement('span');
        chip.className = 'hud-topic-chip';
        chip.textContent = TOPICS_BY_ID[tid]?.name || tid;
        topicsEl.appendChild(chip);
      });
    }
  }

  const idx = stars.indexOf(star);
  hud.querySelector('[data-hud="index"]').textContent =
    `NODE ${String(idx + 1).padStart(3, '0')} / ${String(stars.length).padStart(3, '0')}`;

  const media = hud.querySelector('[data-hud="media"]');
  media.innerHTML = '';
  if (project.images && project.images.length) {
    project.images.forEach((entry) => {
      const src = typeof entry === 'string' ? entry : entry?.src;
      if (!src) return;
      const credit = typeof entry === 'object' ? entry.credit : null;
      const wrap = document.createElement('div');
      wrap.className = 'hud-image';
      const img = document.createElement('img');
      img.src = src;
      img.alt = project.title || '';
      img.loading = 'lazy';
      wrap.appendChild(img);
      if (credit && (credit.caption || credit.author)) {
        const cap = document.createElement('p');
        cap.className = 'hud-image-credit';
        if (credit.caption) {
          // Freeform illustration / context caption (e.g. TK!Solver stand-in for MuSolver)
          cap.textContent = credit.caption;
        } else {
          const license = document.createElement('a');
          license.href = credit.licenseUrl || '#';
          license.target = '_blank';
          license.rel = 'noopener noreferrer';
          license.textContent = credit.license || 'license';
          const via = document.createElement('a');
          via.href = credit.viaUrl || '#';
          via.target = '_blank';
          via.rel = 'noopener noreferrer';
          via.textContent = credit.via || 'source';
          cap.append(
            document.createTextNode(`Photo: ${credit.author} · `),
            license,
            document.createTextNode(' · via '),
            via
          );
        }
        wrap.appendChild(cap);
      }
      media.appendChild(wrap);
    });
  }
  if (project.videos && project.videos.length) {
    const vertical = project.videoAspect === '9:16' || project.videoAspect === 'vertical';
    project.videos.forEach((id) => {
      const wrap = document.createElement('div');
      wrap.className = vertical ? 'hud-video hud-video-vertical' : 'hud-video';
      const extras = allowAutoplay ? '' : '&mute=1';
      wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?rel=0${extras}&enablejsapi=1" allowfullscreen allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
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

  const connectedWrap = hud.querySelector('[data-hud="connected"]');
  const connectedList = hud.querySelector('[data-hud="connected-list"]');
  if (connectedWrap && connectedList) {
    connectedList.innerHTML = '';
    const connected = connectedProjectsFor(project.id);
    if (!connected.length) {
      connectedWrap.hidden = true;
    } else {
      connectedWrap.hidden = false;
      connected.forEach((p) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hud-connected-chip';
        const accent = THEME_COLORS[p.theme] || 0x40e0ff;
        const color = `#${new THREE.Color(accent).getHexString()}`;
        btn.innerHTML = `<span class="hud-connected-dot" style="background:${color};color:${color}"></span><span></span>`;
        btn.querySelector('span:last-child').textContent = p.title;
        btn.title = p.theme || '';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          noteUserActivity();
          const target = firstStarForProject(p.id);
          if (target) openHUD(target);
        });
        connectedList.appendChild(btn);
      });
    }
  }
}

async function runHudOpenContinuity(star, { fromAuto = false } = {}) {
  const gen = ++hudAnimGen;
  const hud = document.getElementById('hud');
  const panel = hud?.querySelector('.hud-panel');
  const projectId = star.project?.id;
  const labelEl = findProjectLabelEl(projectId);
  const titleBar = hud?.querySelector('.hud-title-bar');
  const themeEl = hud?.querySelector('[data-hud="theme"]');
  const sectionEl = hud?.querySelector('[data-hud="section"]');
  const yearsEl = hud?.querySelector('[data-hud="years"]');

  stopHudTeletype();
  removeHudFlyLabel();
  clearHudStageClasses(hud);
  applyHudTimingCss(hud);

  populateHUD(star, { allowAutoplay: !fromAuto && !autoMode });

  const snapOpen = async () => {
    clearHudStageClasses(hud);
    hud.classList.add('open', 'hud-expanded', 'hud-chip-section', 'hud-chip-years', 'hud-body-in', 'hud-ready');
    hud.setAttribute('aria-hidden', 'false');
    if (labelEl) labelEl.classList.add('ms-label-hud-open');
    if (!prefersReducedMotion()) {
      await startHudTeletype(hud.querySelector('[data-hud="bullet"]'), { cps: HUD_TIMING.bodyTeletypeCps });
    }
  };

  if (prefersReducedMotion() || !labelEl || !titleBar || !panel) {
    await snapOpen();
    return;
  }

  // Hide teletype targets until their stage; keep labels for chip chrome.
  const themeText = themeEl?.textContent || '';
  const sectionText = sectionEl?.textContent || '';
  const yearsText = yearsEl?.textContent || '';
  if (themeEl) themeEl.textContent = '';
  if (sectionEl) sectionEl.textContent = '';
  if (yearsEl) yearsEl.textContent = '';

  const from = labelEl.getBoundingClientRect();
  labelEl.classList.add('ms-label-hud-open');
  labelEl.classList.remove('is-visible');

  // 1) Title flies to final title slot
  hud.classList.add('open', 'hud-flying', 'hud-clipping', 'hud-stage-title');
  hud.setAttribute('aria-hidden', 'false');
  // Force layout with above/below collapsed so title rect is stable
  void panel.offsetWidth;
  setPanelClip(panel, panelClipInsets(panel, titleBar, 'title'), { immediate: true, ms: HUD_TIMING.lateralMs });

  const to = titleBar.getBoundingClientRect();
  const fly = document.createElement('div');
  fly.id = 'hud-fly-label';
  fly.style.setProperty('--hud-accent', hud.style.getPropertyValue('--hud-accent') || '#40e0ff');
  fly.innerHTML = `<span class="ms-label-bar" aria-hidden="true"></span><span class="ms-label-text"></span>`;
  fly.querySelector('.ms-label-text').textContent = star.project?.title || '';
  document.body.appendChild(fly);
  fly.style.left = `${from.left}px`;
  fly.style.top = `${from.top}px`;
  fly.style.width = `${from.width}px`;
  fly.style.height = `${from.height}px`;

  await animateFlipRect(fly, from, to, { duration: HUD_TIMING.flipMs, growTitle: true });
  if (!stillHudGen(gen)) return;

  removeHudFlyLabel();
  hud.classList.remove('hud-flying');
  titleBar.style.opacity = '1';

  // Freeze title-band insets before vertical expansion shifts the title bar.
  const titleBand = panelClipInsets(panel, titleBar, 'title');

  // 2) Outer frame expands laterally to full width
  hud.classList.add('hud-stage-wide');
  setPanelClip(panel, {
    top: titleBand.top,
    right: 0,
    bottom: titleBand.bottom,
    left: 0
  }, { ms: HUD_TIMING.lateralMs });
  await waitMs(HUD_TIMING.lateralMs);
  if (!stillHudGen(gen)) return;

  // 3) Expand upward + teletype cluster/area name
  hud.classList.add('hud-stage-up');
  setPanelClip(panel, {
    top: 0,
    right: 0,
    bottom: titleBand.bottom,
    left: 0
  }, { ms: HUD_TIMING.upMs });
  if (themeEl) themeEl.textContent = themeText;
  const themePromise = startHudTeletype(themeEl, { cps: HUD_TIMING.themeTeletypeCps });
  await waitMs(HUD_TIMING.upMs);
  if (!stillHudGen(gen)) return;
  await themePromise;
  if (!stillHudGen(gen)) return;

  // 4) Expand downward to full height
  hud.classList.add('hud-stage-down', 'hud-expanded');
  setPanelClip(panel, { top: 0, right: 0, bottom: 0, left: 0 }, { ms: HUD_TIMING.downMs });
  await waitMs(HUD_TIMING.downMs);
  if (!stillHudGen(gen)) return;
  // Restore chamfered clip once fully open
  panel.style.clipPath = '';
  hud.classList.remove('hud-clipping', 'hud-stage-title', 'hud-stage-wide');

  // 5) Section then Years boxes extend right (overlap)
  hud.classList.add('hud-chip-section');
  await waitMs(Math.max(0, HUD_TIMING.chipMs - HUD_TIMING.chipOverlapMs));
  if (!stillHudGen(gen)) return;
  hud.classList.add('hud-chip-years');
  await waitMs(HUD_TIMING.chipOverlapMs);
  if (!stillHudGen(gen)) return;

  // 6) Teletype Section / Years contents, then description/media as today
  if (sectionEl) sectionEl.textContent = sectionText;
  if (yearsEl) yearsEl.textContent = yearsText;
  await startHudTeletype(sectionEl, { cps: HUD_TIMING.chipTeletypeCps });
  if (!stillHudGen(gen)) return;
  await startHudTeletype(yearsEl, { cps: HUD_TIMING.chipTeletypeCps });
  if (!stillHudGen(gen)) return;

  hud.classList.add('hud-body-in', 'hud-ready');
  // Layout is final; drop any open-path inline overrides (clip / title opacity).
  clearHudInlineAnimStyles(hud);
  await startHudTeletype(hud.querySelector('[data-hud="bullet"]'), { cps: HUD_TIMING.bodyTeletypeCps });
}

async function runHudCloseContinuity() {
  const gen = ++hudAnimGen;
  const hud = document.getElementById('hud');
  const panel = hud?.querySelector('.hud-panel');
  const star = currentStar;
  const projectId = star?.project?.id;
  const labelEl = projectId ? findProjectLabelEl(projectId) : null;
  const titleBar = hud?.querySelector('.hud-title-bar');
  const themeEl = hud?.querySelector('[data-hud="theme"]');
  const sectionEl = hud?.querySelector('[data-hud="section"]');
  const yearsEl = hud?.querySelector('[data-hud="years"]');
  const bulletEl = hud?.querySelector('[data-hud="bullet"]');
  const bodyBits = [
    hud?.querySelector('.hud-index'),
    hud?.querySelector('.hud-topics'),
    hud?.querySelector('[data-hud="media"]'),
    bulletEl,
    hud?.querySelector('.hud-connected')
  ].filter(Boolean);

  stopHudTeletype({ finish: true });
  removeHudFlyLabel();
  applyHudTimingCss(hud);

  const snapClose = () => {
    clearHudStageClasses(hud);
    hud?.classList.remove('open');
    hud?.setAttribute('aria-hidden', 'true');
    if (labelEl) {
      labelEl.classList.remove('ms-label-hud-open');
      labelEl.style.opacity = '';
      labelEl.style.visibility = '';
      // transform stays owned by updateLabels (live projection)
    }
    [themeEl, sectionEl, yearsEl, titleBar, ...bodyBits].forEach((el) => {
      if (!el) return;
      el.style.opacity = '';
      el.style.transition = '';
    });
  };

  if (!hud || prefersReducedMotion() || !star || !labelEl || !titleBar || !panel) {
    snapClose();
    return;
  }

  // Reverse 6: blink+fade teletyped body / chip / theme text (title stays readable)
  await blinkFadeHudText([...bodyBits, sectionEl, yearsEl, themeEl], gen);
  if (!stillHudGen(gen)) return;
  hud.classList.remove('hud-body-in', 'hud-ready');

  // Reverse 5: years then section collapse horizontally
  hud.classList.remove('hud-chip-years');
  await waitMs(Math.max(0, HUD_TIMING.chipMs - HUD_TIMING.chipOverlapMs));
  if (!stillHudGen(gen)) return;
  hud.classList.remove('hud-chip-section');
  await waitMs(HUD_TIMING.chipOverlapMs);
  if (!stillHudGen(gen)) return;

  hud.classList.add('hud-clipping');
  // Keep clip fully open while vertical grids collapse so the title bar is never
  // sliced by a stale inset (title moves when .hud-above goes 1fr → 0fr).
  setPanelClip(panel, { top: 0, right: 0, bottom: 0, left: 0 }, { immediate: true, ms: HUD_TIMING.downMs });

  // Reverse 4: collapse downward (hide below) — remeasure after settle
  let band = panelClipInsets(panel, titleBar, 'title');
  hud.classList.remove('hud-stage-down', 'hud-expanded');
  setPanelClip(panel, {
    top: 0,
    right: 0,
    bottom: band.bottom,
    left: 0
  }, { ms: HUD_TIMING.downMs });
  await waitMs(HUD_TIMING.downMs);
  if (!stillHudGen(gen)) return;
  band = panelClipInsets(panel, titleBar, 'title');
  setPanelClip(panel, {
    top: 0,
    right: 0,
    bottom: Math.max(0, band.bottom),
    left: 0
  }, { immediate: true });

  // Reverse 3: collapse upward. Open bottom clip first so the moving title
  // cannot be cut; tighten to a fresh title band after the grid settles.
  setPanelClip(panel, { top: 0, right: 0, bottom: 0, left: 0 }, { immediate: true, ms: HUD_TIMING.upMs });
  hud.classList.remove('hud-stage-up');
  await waitMs(HUD_TIMING.upMs);
  if (!stillHudGen(gen)) return;
  void panel.offsetWidth;
  band = panelClipInsets(panel, titleBar, 'title');

  // Reverse 2: clip to the live title band (lateral + vertical frame)
  hud.classList.remove('hud-stage-wide');
  hud.classList.add('hud-stage-title');
  setPanelClip(panel, band, { ms: HUD_TIMING.lateralMs });
  await waitMs(HUD_TIMING.lateralMs);
  if (!stillHudGen(gen)) return;

  // Reverse 1: title returns to mini-HUD label at its CURRENT projected position
  syncLabelScreenPosition(projectId);
  void labelEl.offsetWidth;
  const to = labelEl.getBoundingClientRect();
  const from = titleBar.getBoundingClientRect();
  if (to.width < 2 || to.height < 2) {
    // Label not laid out — snap rather than FLIP to a degenerate rect
    snapClose();
    return;
  }

  hud.classList.add('hud-flying');
  const fly = document.createElement('div');
  fly.id = 'hud-fly-label';
  fly.classList.add('hud-fly-as-title');
  fly.style.setProperty('--hud-accent', hud.style.getPropertyValue('--hud-accent') || '#40e0ff');
  fly.innerHTML = `<span class="ms-label-bar" aria-hidden="true"></span><span class="ms-label-text"></span>`;
  // Prefer the live mini-label text so the FLIP lands on the same string/style
  const miniText = labelEl.querySelector('.ms-label-text')?.textContent || star.project?.title || '';
  fly.querySelector('.ms-label-text').textContent = miniText;
  document.body.appendChild(fly);
  fly.style.left = `${from.left}px`;
  fly.style.top = `${from.top}px`;
  fly.style.width = `${from.width}px`;
  fly.style.height = `${from.height}px`;
  fly.style.maxWidth = 'none';

  await animateFlipRect(fly, from, to, { duration: HUD_TIMING.flipMs });
  if (!stillHudGen(gen)) return;

  removeHudFlyLabel();
  // Reveal the real mini-label in its normal projected slot (no leftover inline)
  labelEl.classList.remove('ms-label-hud-open');
  labelEl.style.opacity = '';
  labelEl.style.visibility = '';
  snapClose();
}

function enterClusterView(theme, { fromAuto = false } = {}) {
  if (!THEME_POSITIONS[theme]) return Promise.resolve();
  if (viewLevel === 1 && !overviewPose) overviewPose = captureCameraPose();
  // Closing HUD without leaving cluster (instant — cluster fly owns motion)
  if (currentStar) {
    hudAnimGen += 1;
    stopHudTeletype({ finish: true });
    removeHudFlyLabel();
    findProjectLabelEl(currentStar.project?.id)?.classList.remove('ms-label-hud-open');
    currentStar = null;
    const hud = document.getElementById('hud');
    clearHudStageClasses(hud);
    hud?.classList.remove('open');
    hud?.setAttribute('aria-hidden', 'true');
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }
  focusTheme = theme;
  viewLevel = 2;
  labelResolveAt = 0; // force project labels to resolve for this cluster
  updateClusterDimming();
  const pose = clusterFocusPose(theme);
  clusterPose = pose;
  preHudPose = pose; // L3 close returns here
  const duration = prefersReducedMotion() ? FLY_DURATION_MS * 1.6 : FLY_DURATION_MS;
  return new Promise((resolve) => {
    flyCameraPath(
      camera.position.clone(),
      pose.position.clone(),
      currentLookPoint(),
      pose.lookAt.clone(),
      duration,
      () => {
        applyPoseControls(pose);
        // Lock orbit target to cluster center; sync angles so drag feels like L1
        syncControlsFromCamera(pose.lookAt);
        updateCameraFromControls();
        camera.lookAt(controls.lookAt);
        clusterPose = captureCameraPose();
        preHudPose = clusterPose;
        labelResolveAt = 0;
        resolveLabelTargets();
        resolve();
      }
    );
  });
}

function exitClusterView({ animate = true } = {}) {
  if (currentStar) closeHUD({ restoreCamera: false });
  focusTheme = null;
  viewLevel = 1;
  clusterPose = null;
  preHudPose = null;
  updateClusterDimming();
  const pose = overviewPose;
  overviewPose = null;
  if (!animate) {
    if (pose) {
      applyPoseControls(pose);
      camera.position.copy(pose.position);
      camera.lookAt(pose.lookAt);
    } else {
      fitOverviewToClusters();
    }
    return Promise.resolve();
  }
  if (pose) {
    return new Promise((resolve) => flyToPose(pose, resolve));
  }
  return new Promise((resolve) => {
    const startPos = camera.position.clone();
    const startLook = currentLookPoint();
    fitOverviewToClusters();
    const endPos = camera.position.clone();
    const endLook = controls.lookAt.clone();
    camera.position.copy(startPos);
    const duration = prefersReducedMotion() ? 1600 : 1000;
    flyCameraPath(startPos, endPos, startLook, endLook, duration, resolve);
  });
}

function openHUD(star, { fromAuto = false } = {}) {
  // Ensure we are in the star's cluster before opening detail
  const theme = star.project?.theme;
  if (theme && (viewLevel < 2 || focusTheme !== theme)) {
    enterClusterView(theme, { fromAuto }).then(() => openHUD(star, { fromAuto }));
    return;
  }
  // Switching nodes: abort in-flight choreography and snap previous HUD closed
  if (currentStar && currentStar !== star) {
    hudAnimGen += 1;
    stopHudTeletype({ finish: true });
    removeHudFlyLabel();
    findProjectLabelEl(currentStar.project?.id)?.classList.remove('ms-label-hud-open');
    const prevHud = document.getElementById('hud');
    clearHudStageClasses(prevHud);
    prevHud?.classList.remove('open');
    prevHud?.setAttribute('aria-hidden', 'true');
    prevHud?.querySelectorAll('[data-hud], .hud-index, .hud-topics, .hud-connected').forEach((el) => {
      el.style.opacity = '';
    });
  }
  if (!clusterPose) clusterPose = captureCameraPose();
  preHudPose = clusterPose;
  currentStar = star;
  viewLevel = 3;
  updateClusterDimming();
  window.location.hash = star.id;
  highlightConnectedEdges(star.project.id);
  flyToStar(star);
  runHudOpenContinuity(star, { fromAuto });
  if (fromAuto || autoMode) {
    warpVisited.add(star.project.id);
    lastWarpedProjectId = star.project.id;
  }
}

function closeHUD({ restoreCamera = true } = {}) {
  const hud = document.getElementById('hud');
  if (!currentStar && !hud?.classList.contains('open')) {
    if (!restoreCamera) preHudPose = null;
    return;
  }
  const closingStar = currentStar;
  highlightConnectedEdges(null);
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  // Return to cluster view (L2), not overview
  viewLevel = focusTheme ? 2 : 1;
  updateClusterDimming();

  const finishClose = () => {
    currentStar = null;
    findProjectLabelEl(closingStar?.project?.id)?.classList.remove('ms-label-hud-open');
    if (!restoreCamera) {
      preHudPose = null;
      return;
    }
    const pose = clusterPose || preHudPose;
    preHudPose = clusterPose;
    if (pose) flyToPose(pose);
  };

  // Keep currentStar during reverse FLIP so label identity is available
  runHudCloseContinuity().then(finishClose);
}
window.closeHUD = closeHUD;
window.openHUD = openHUD;
window.enterClusterView = enterClusterView;
window.exitClusterView = exitClusterView;

function enterOverviewMode() {
  exitClusterView({ animate: true });
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
  if (isHudVideoBusy()) {
    exitAutoMode();
    noteUserActivity();
    return;
  }
  const target = pickWarpTarget();
  if (!target) {
    scheduleNextWarp();
    return;
  }
  warpJumpInProgress = true;
  const theme = target.project.theme;
  const flyMs = prefersReducedMotion() ? FLY_DURATION_MS * 1.6 : FLY_DURATION_MS;
  const dwellMs = prefersReducedMotion() ? 2200 : 1400;
  // Level 2 first, then level 3 item HUD
  enterClusterView(theme, { fromAuto: true }).then(() => {
    if (!autoMode) {
      warpJumpInProgress = false;
      return;
    }
    setTimeout(() => {
      if (!autoMode) {
        warpJumpInProgress = false;
        return;
      }
      openHUD(target, { fromAuto: true });
      setTimeout(() => {
        warpJumpInProgress = false;
        if (autoMode) scheduleNextWarp();
      }, flyMs + 120);
    }, dwellMs);
  });
}

/** HUD with an embedded video counts as busy (user may be watching without pointer events). */
function isHudVideoBusy() {
  const hud = document.getElementById('hud');
  if (!hud?.classList.contains('open')) return false;
  return !!hud.querySelector('.hud-video iframe');
}

function enterAutoMode() {
  if (autoMode || document.body.classList.contains('print-preview')) return;
  if (searchActive) return; // pause autopilot while searching
  if (isHudVideoBusy()) {
    // Stay idle-armed but do not warp while a video HUD is open
    noteUserActivity();
    return;
  }
  autoMode = true;
  document.body.classList.add('auto-warp');
  warpVisited = new Set(currentStar ? [currentStar.project.id] : []);
  lastWarpedProjectId = currentStar?.project?.id || null;
  if (!currentStar) {
    // Reveal the warp counter immediately (stacks above the topic filter)
    // while the first jump flies; the post-jump path re-arms the timer.
    const interval = prefersReducedMotion() ? WARP_INTERVAL_MS * 1.5 : WARP_INTERVAL_MS;
    warpDeadline = performance.now() + interval;
    updateWarpBar();
    doWarpJump();
  } else {
    scheduleNextWarp();
  }
}
function exitAutoMode() {
  if (!autoMode) return;
  autoMode = false;
  document.body.classList.remove('auto-warp');
  clearWarpCountdown();
  updateWarpBar();
}
window.enterAutoMode = enterAutoMode;
window.exitAutoMode = exitAutoMode;
window.doWarpJump = doWarpJump;

function noteUserActivity() {
  if (autoMode) exitAutoMode();
  if (idleTimer) clearTimeout(idleTimer);
  if (document.body.classList.contains('print-preview')) return;
  if (searchActive) return; // do not arm idle warp while the search HUD is open
  idleTimer = setTimeout(() => {
    if (searchActive) return;
    if (isHudVideoBusy()) {
      noteUserActivity();
      return;
    }
    enterAutoMode();
  }, IDLE_MS);
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
  if (label.userData.kind === 'theme' && label.userData.theme) {
    // Level 1 → 2: theme titles zoom into the cluster
    enterClusterView(label.userData.theme);
    return true;
  }
  if (label.userData.kind === 'project' && label.userData.projectId) {
    if (viewLevel < 2) {
      const theme = label.userData.projectTheme;
      if (theme) enterClusterView(theme);
      return true;
    }
    const star = firstStarForProject(label.userData.projectId);
    if (!star) return false;
    openHUD(star);
    return true;
  }
  return false;
}

/** Pick a theme cluster by proximity to its center (overview / neighbour click). */
function pickThemeAt(clientX, clientY) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const ndc = new THREE.Vector3();
  let best = null;
  let bestD = viewLevel === 1 ? 78 : 64;
  Object.keys(THEME_POSITIONS).forEach((theme) => {
    const p = THEME_POSITIONS[theme];
    ndc.set(p.x, p.y, p.z).project(camera);
    if (ndc.z > 1) return;
    const sx = (ndc.x * 0.5 + 0.5) * w;
    const sy = (-ndc.y * 0.5 + 0.5) * h;
    const d = Math.hypot(sx - clientX, sy - clientY);
    if (d < bestD) {
      bestD = d;
      best = theme;
    }
  });
  return best;
}

/** Hit-test visible HTML labels via their DOM boxes. */
function pickLabelAt(clientX, clientY) {
  let best = null;
  let bestArea = Infinity;
  labelSprites.forEach((label) => {
    if (!label.visible) return;
    const el = label.userData.el;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) return;
    const area = r.width * r.height;
    if (area < bestArea) {
      bestArea = area;
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
  // Enter a cluster so project labels are visible, then click them
  const theme = Object.keys(THEME_POSITIONS)[0];
  await enterClusterView(theme);
  await new Promise((r) => setTimeout(r, 1000));
  const visible = labelSprites.filter((l) => l.visible && l.userData.kind === 'project');
  for (const label of visible) {
    const expected = expectedHudTitleForLabel(label);
    const opened = openFromLabel(label);
    await new Promise((r) => setTimeout(r, 120));
    const got = document.querySelector('[data-hud="project"]')?.textContent || '';
    const ok = opened && !!expected && got === expected;
    results.push({
      kind: label.userData.kind,
      label: label.userData.labelTitle || label.userData.theme || label.userData.projectId,
      expected,
      got,
      ok
    });
    if (currentStar) closeHUD({ restoreCamera: true });
    await new Promise((r) => setTimeout(r, 200));
  }
  await exitClusterView({ animate: false });
  const failed = results.filter((r) => !r.ok);
  return { ok: failed.length === 0, total: results.length, failed, results };
}

/**
 * Automated semantic-zoom check:
 * enter cluster → assert item labels visible → click a label → HUD opens for that item.
 */
async function assertClusterItemLabels(theme = 'Systems & Virtualization') {
  if (viewLevel !== 1) await exitClusterView({ animate: false });
  await enterClusterView(theme);
  await new Promise((r) => setTimeout(r, 1100));
  labelResolveAt = 0;
  resolveLabelTargets();
  // Let springs catch opacity
  for (let i = 0; i < 8; i++) {
    integrateLabelSprings(0.05);
  }
  const visible = labelSprites.filter(
    (l) => l.visible && l.userData.kind === 'project' && l.userData.projectTheme === theme
  );
  if (visible.length < 1) {
    return {
      ok: false,
      stage: 'labels-visible',
      visible: 0,
      reason: 'no project labels visible at L2'
    };
  }
  const label = visible[0];
  const expected = label.userData.labelTitle || expectedHudTitleForLabel(label);
  const opened = openFromLabel(label);
  await new Promise((r) => setTimeout(r, 250));
  const got = document.querySelector('[data-hud="project"]')?.textContent || '';
  const hudOpen = !!document.getElementById('hud')?.classList.contains('open');
  const ok = opened && hudOpen && !!expected && got === expected && viewLevel === 3;
  return {
    ok,
    stage: ok ? 'hud-open' : 'label-click',
    visible: visible.length,
    expected,
    got,
    hudOpen,
    level: viewLevel,
    titles: visible.map((l) => l.userData.labelTitle)
  };
}
window.assertLabelClicks = assertLabelClicks;
window.assertClusterItemLabels = assertClusterItemLabels;
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
    noteUserActivity(); // any pointer move resets idle, even without drag
    // Orbit at L1 / L2 / L3 — only blocked while a camera tween is in flight
    if (!controls.mouseDown || isFlying) return;
    const dx = x - controls.mouseX;
    const dy = y - controls.mouseY;
    dragDist += Math.abs(dx) + Math.abs(dy);
    controls.targetRotationY += dx * 0.004;
    controls.targetRotationX = Math.max(-1.1, Math.min(1.1, controls.targetRotationX + dy * 0.004));
    controls.mouseX = x;
    controls.mouseY = y;
  };

  const onUp = () => {
    controls.mouseDown = false;
    refreshClusterPoseFromControls();
  };

  container.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
  container.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  container.addEventListener('mouseup', onUp);
  container.addEventListener('mouseleave', onUp);
  container.addEventListener('pointermove', () => noteUserActivity(), { passive: true });
  container.addEventListener('touchstart', (e) => {
    noteUserActivity();
    if (e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  container.addEventListener('touchmove', (e) => {
    noteUserActivity();
    if (e.touches.length === 1) {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });
  container.addEventListener('touchend', onUp);

  container.addEventListener('wheel', (e) => {
    noteUserActivity();
    e.preventDefault();
    const zMin = viewLevel >= 2 ? 36 : 120;
    const zMax = viewLevel >= 2 ? 240 : 520;
    controls.targetZoom = Math.max(zMin, Math.min(zMax, controls.targetZoom + e.deltaY * 0.1));
    if (viewLevel === 2) refreshClusterPoseFromControls();
  }, { passive: false });
  window.addEventListener('scroll', () => noteUserActivity(), { passive: true });

  container.addEventListener('click', (e) => {
    noteUserActivity();
    if (dragDist > 8) return;
    const labelHit = pickLabelAt(e.clientX, e.clientY);
    if (labelHit) {
      openFromLabel(labelHit);
      return;
    }
    // L1: click a cluster body → enter that cluster
    if (viewLevel === 1) {
      const theme = pickThemeAt(e.clientX, e.clientY);
      if (theme) {
        enterClusterView(theme);
        return;
      }
    }
    // L2 only: individual stars open the HUD
    if (viewLevel === 2) {
      const starHit = pickStarAt(e.clientX, e.clientY);
      if (starHit && starHit.project?.theme === focusTheme) {
        openHUD(starHit);
        return;
      }
      // Empty space / other cluster → back to overview, or switch cluster
      const other = pickThemeAt(e.clientX, e.clientY);
      if (other && other !== focusTheme) {
        enterClusterView(other);
        return;
      }
      exitClusterView();
      return;
    }
    if (viewLevel >= 3 || currentStar) {
      closeHUD();
      return;
    }
  });

  window.addEventListener('keydown', (e) => {
    // Type-to-search: capture printable keys when not in a form field
    const inEditable = isEditableTarget(e.target);
    const inSearchInput = e.target?.id === 'search-input';

    if (e.key === 'Escape') {
      noteUserActivity();
      closePrintStyleMenu();
      if (searchActive) {
        e.preventDefault();
        closeSearchHud();
        return;
      }
      if (viewLevel >= 3 || currentStar) closeHUD();
      else if (viewLevel === 2) exitClusterView();
      return;
    }

    if (!inEditable && !inSearchInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Search open: Backspace edits; Delete/Esc clear (Esc handled above).
      // Search closed (empty buffer): Backspace / Delete → Overview (O is a search letter).
      if (e.key === 'Backspace') {
        e.preventDefault();
        noteUserActivity();
        if (searchActive) {
          const next = searchQuery.slice(0, -1);
          if (!next) closeSearchHud();
          else setSearchQuery(next);
        } else {
          enterOverviewMode();
        }
        return;
      }
      if (e.key === 'Delete') {
        e.preventDefault();
        noteUserActivity();
        if (searchActive) closeSearchHud();
        else enterOverviewMode();
        return;
      }
      if (e.key === 'Enter' && searchActive) {
        e.preventDefault();
        noteUserActivity();
        commitSearchBestMatch();
        return;
      }
      // No single-letter command shortcuts — printable keys always type-to-search.
      if (e.key.length === 1 && !/[\u0000-\u001f\u007f]/.test(e.key)) {
        e.preventDefault();
        noteUserActivity();
        setSearchQuery(searchQuery + e.key);
        return;
      }
    }

    noteUserActivity();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    if (warpShiftPass) warpShiftPass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    if (viewLevel === 1 && !currentStar && !isFlying) fitOverviewToClusters();
  });

  document.getElementById('hud-close')?.addEventListener('click', (e) => {
    noteUserActivity();
    e.stopPropagation();
    closeHUD();
  });

  setupTitlePrintMenu();
  setupTypeToSearch();
  noteUserActivity();
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.getElapsedTime();

  // Apply orbit at L1–L3; idle auto-spin only in overview. Never fight fly tweens.
  if (!isFlying && !autoMode) {
    if (viewLevel === 1 && !controls.mouseDown) {
      controls.targetRotationY += 0.00025;
    }
    if (viewLevel >= 1 && viewLevel <= 3) {
      applyOrbitSmoothing();
    }
  }

  nebulaGroups.forEach(({ group, theme, phase }) => {
    const base = THEME_POSITIONS[theme];
    if (!base) return;
    group.position.y = base.y + Math.sin(t * 0.12 + phase) * 1.1;
  });

  updateLabels(dt);
  updateStarfieldTwinkle(t);
  updateWarpShift(dt);
  updateSearchPulse(t);
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

function resolveShowPhoto(style) {
  const params = new URLSearchParams(location.search);
  const raw = params.get('photo');
  if (raw === '0' || raw === 'false') return false;
  if (raw === '1' || raw === 'true') return true;
  return !!style.photo;
}

function ensurePrintModel(data) {
  if (!printModelCache) {
    if (!data) throw new Error('Print model requires content data on first call');
    // Selection is `print:` priority in frontmatter (web-only items omitted).
    printModelCache = buildModelForStyles(data, Object.keys(THEME_COLORS), printColorsMap());
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
  // Use cached print model (populated by generatePrintView); do not reference init's local contentData
  const model = { ...ensurePrintModel(), showPhoto: resolveShowPhoto(style) };
  printView.dataset.printStyle = style.id;
  printView.dataset.photo = model.showPhoto ? '1' : '0';
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

function isPrintMode() {
  const params = new URLSearchParams(location.search);
  return params.get('print') === '1' || location.hash === '#print';
}

async function initPrintOnly(contentData) {
  // Print/PDF path: never boot WebGL, stars, or mini-HUD labels.
  document.body.classList.add('print-preview');
  const layer = document.getElementById('label-layer');
  if (layer) {
    layer.innerHTML = '';
    layer.hidden = true;
    layer.setAttribute('aria-hidden', 'true');
  }
  generatePrintView(contentData);
  document.getElementById('loading')?.classList.add('hidden');
}

function applyDeepLinkFromUrl({ pushUrl = false } = {}) {
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic');
  const cluster = params.get('cluster');
  setActiveTopic(topic, { pushUrl });
  if (cluster && CLUSTER_BY_SLUG[cluster]) {
    const theme = CLUSTER_BY_SLUG[cluster];
    // Defer until stars/labels exist
    setTimeout(() => enterClusterView(theme), 120);
  }
}

async function init() {
  console.log('Initializing 3D CV...', { buildId: BUILD_ID });
  const contentData = await loadContentData();
  if (isPrintMode()) {
    console.log(`Print-only mode (${contentData.length} projects, build ${BUILD_ID})`);
    await initPrintOnly(contentData);
    return;
  }
  initScene();
  console.log(`Loaded ${contentData.length} projects (build ${BUILD_ID})`);
  createStarsFromBullets(contentData);
  fitOverviewToClusters();
  setupInteraction();
  generatePrintView(contentData);
  applyDeepLinkFromUrl({ pushUrl: false });
  window.addEventListener('popstate', () => applyDeepLinkFromUrl({ pushUrl: false }));
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
  const msg = (err && err.message) ? String(err.message).slice(0, 180) : 'Unknown error';
  document.getElementById('loading').innerHTML =
    `<p>Failed to load. Please refresh.</p><p style="opacity:.65;font-size:12px;margin-top:8px">${msg}</p>`;
});
