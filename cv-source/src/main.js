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
import { rasterizePrintDecor } from './print/rasterize-decor.js';
import { THEME_CLUSTER_SLUGS } from './print/icons.js';

/** Resolves when Nebula/Orbit header SVG decor has been baked to PNG for print/PDF. */
let printDecorReady = Promise.resolve();
if (typeof window !== 'undefined') {
  window.__printDecorReady = () => printDecorReady;
}

/** Injected by vite.config.js — used to cache-bust content-data.json fetches.
 *  Falls back to 'dev' when the define is absent (e.g. non-Vite tooling). */
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

/* Object key order = print section order:
 * Systems → Languages → Tools → Games → Research → Communications. */
const THEME_COLORS = {
  'Systems & Virtualization': 0xff4a5a,
  'Languages & Compilers': 0x4a90ff,
  'Tools & Apps': 0x40e0ff,
  'Games & 3D': 0x5dff6a,
  Research: 0xffb040,
  Communications: 0xff5ad6
};

/** Darker cousins of THEME_COLORS for print on white paper (same hue family). */
const PRINT_THEME_COLORS = {
  'Systems & Virtualization': 0xc62838,
  'Languages & Compilers': 0x1f5fd0,
  'Tools & Apps': 0x1496b0,
  'Games & 3D': 0x2aa83a,
  Research: 0xd48918,
  Communications: 0xc2188a
};

/** Hexagonal ring for every aspect ratio — fitOverviewToClusters scales/fits the
 * camera instead of switching to a portrait 3×2 column layout. */
const THEME_LAYOUT_RING = {
  Research: { x: -78, y: 40, z: 42 },
  'Languages & Compilers': { x: -132, y: -6, z: -40 },
  'Tools & Apps': { x: 2, y: 36, z: -58 },
  'Systems & Virtualization': { x: 132, y: -2, z: -12 },
  'Games & 3D': { x: -44, y: -60, z: 6 },
  Communications: { x: 76, y: -48, z: 42 }
};

/** @deprecated alias — kept so older call sites / docs still resolve */
const THEME_LAYOUT_DESKTOP = THEME_LAYOUT_RING;

/** Active theme centers (mutated by applyThemeLayout). */
const THEME_POSITIONS = { ...THEME_LAYOUT_RING };
let themeLayoutApplied = false;

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
/* Legacy deep-link slugs from former cluster names. */
CLUSTER_BY_SLUG.art = 'Communications';
CLUSTER_BY_SLUG.physics = 'Research';
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
/** Warp tour timing — configure idle delays and jump interval in one place. */
const IDLE_MS_OVERVIEW_DEFAULT = 30_000;       // fully zoomed-out overview: short idle → warp
const IDLE_MS_ENGAGED_DEFAULT = 5 * 60_000;    // after real user engagement: 5 min
const WARP_INTERVAL_MS_DEFAULT = 10_000;       // seconds between jumps (countdown + progress bar)
/** Optional test overrides: `{ overviewMs, engagedMs, intervalMs }`. */
let warpTimingOverrides = null;
function idleOverviewMs() {
  return warpTimingOverrides?.overviewMs ?? IDLE_MS_OVERVIEW_DEFAULT;
}
function idleEngagedMs() {
  return warpTimingOverrides?.engagedMs ?? IDLE_MS_ENGAGED_DEFAULT;
}
function warpIntervalMs() {
  return warpTimingOverrides?.intervalMs ?? WARP_INTERVAL_MS_DEFAULT;
}

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

/** Keyboard navigation — velocity with accel while held, damp on release. */
const KEY_NAV = Object.freeze({
  orbitAccel: 2.4,   // rad/s²
  orbitMax: 1.35,    // rad/s
  orbitDamp: 5.5,    // 1/s
  dollyAccel: 220,   // zoom units/s²
  dollyMax: 140,
  dollyDamp: 5.5,
  hudScrollAccel: 4200, // px/s²
  hudScrollMax: 1400,
  hudScrollDamp: 7,
  hudPageAccel: 5200,
  hudPageMax: 1800
});
const keyNav = {
  left: false,
  right: false,
  up: false,
  down: false,
  pageUp: false,
  pageDown: false,
  velRotX: 0,
  velRotY: 0,
  velZoom: 0,
  hudVelY: 0,
  hudVelX: 0
};

function clearKeyNavHeld() {
  keyNav.left = keyNav.right = keyNav.up = keyNav.down = false;
  keyNav.pageUp = keyNav.pageDown = false;
}

function isHudOpen() {
  const hud = document.getElementById('hud');
  return !!(hud?.classList.contains('open') && (viewLevel >= 3 || currentStar));
}

/** Skip nav when typing or when a YouTube iframe / form control has focus. */
function isKeyboardNavBlocked(target) {
  if (isEditableTarget(target)) return true;
  if (target?.id === 'search-input') return true;
  const ae = document.activeElement;
  if (!ae || ae === document.body) return false;
  const tag = (ae.tagName || '').toLowerCase();
  if (tag === 'iframe' || tag === 'input' || tag === 'textarea' || tag === 'select') return true;
  if (ae.isContentEditable) return true;
  if (ae.closest?.('.hud-video, [data-hud="media"] iframe')) return true;
  return false;
}

function approachVel(vel, target, accel, dt) {
  if (vel < target) return Math.min(target, vel + accel * dt);
  if (vel > target) return Math.max(target, vel - accel * dt);
  return vel;
}

function dampVel(vel, damp, dt) {
  const f = Math.exp(-damp * dt);
  const next = vel * f;
  return Math.abs(next) < 1e-4 ? 0 : next;
}

const STAR_PICK_RADIUS_PX = 14;
/** Featured stars (`featured: true` or explicit `scale`) render larger; default 1.5×. */
const FEATURED_STAR_SCALE = 1.5;

/** Per-entry visual scale from content front-matter (`scale` or `featured`). */
function projectVisualScale(project) {
  const raw = project?.scale;
  if (raw != null && Number.isFinite(Number(raw))) {
    return Math.max(0.5, Math.min(3, Number(raw)));
  }
  if (project?.featured) return FEATURED_STAR_SCALE;
  return 1;
}

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
 * Apply the hexagonal ring layout and move nebulae / stars / labels.
 * Aspect ratio is handled by fitOverviewToClusters (scale/fit), not a column layout.
 */
function applyThemeLayout(_forceMobile = null) {
  // _forceMobile ignored — ring at any aspect (kept for call-site compat).
  if (themeLayoutApplied && nebulaGroups.length) return;
  themeLayoutApplied = true;
  const layout = THEME_LAYOUT_RING;
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

/** Title HUD bottom edge in CSS pixels — overview labels must stay below this. */
function titleOverlayBottomPx() {
  const title = document.getElementById('title-overlay');
  if (!title) return 0;
  const r = title.getBoundingClientRect();
  // Include a small gap under the title chrome so labels never kiss the frame.
  return Math.ceil(r.bottom) + 10;
}

/**
 * Fit overview so all six ring clusters + theme labels sit fully inside the
 * viewport. Narrow/portrait: zoom/fit the same ring (never switch to columns).
 * Top margin always clears the title HUD height.
 */
function fitOverviewToClusters() {
  applyThemeLayout();

  const w = window.innerWidth;
  const h = window.innerHeight;
  const narrow = w < 768;
  const veryNarrow = w < 480;
  // Nebula glow + bloom halo; theme labels sit ~26 above centers
  const padX = veryNarrow ? 40 : narrow ? 34 : 38;
  const padYLo = veryNarrow ? 34 : narrow ? 30 : 36;
  const padYHi = veryNarrow ? 48 : narrow ? 42 : 46;
  const padZ = veryNarrow ? 32 : narrow ? 28 : 36;
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
  // Narrow: leave more fill headroom so the ring scales down instead of clipping
  const fill = veryNarrow ? 0.42 : narrow ? 0.50 : 0.58;
  const halfH = Math.max(size.y, size.z * 0.55) * 0.5;
  const halfW = Math.max(size.x, size.z * 0.45) * 0.5;
  const distV = halfH / Math.tan((vFov * fill) / 2);
  const distH = halfW / Math.tan((hFov * fill) / 2);
  let dist = Math.max(distV, distH);
  dist = THREE.MathUtils.clamp(dist, narrow ? 180 : 190, veryNarrow ? 640 : narrow ? 560 : 480);

  controls.targetZoom = dist;
  controls.currentZoom = dist;
  controls.targetRotationX = narrow ? 0.10 : 0.08;
  // On portrait, reduce yaw so left/right ring nodes stay in-frame
  controls.targetRotationY = veryNarrow ? 0.02 : narrow ? 0.04 : 0.10;
  controls.currentRotationX = controls.targetRotationX;
  controls.currentRotationY = controls.targetRotationY;
  updateCameraFromControls();
  camera.lookAt(controls.lookAt);

  // Screen-space guard: zoom out until every theme (+ bloom + real DOM label)
  // is inset, and no theme label sits under the title HUD.
  const marginX = veryNarrow ? 4 : narrow ? Math.max(10, w * 0.025) : Math.max(48, w * 0.06);
  const marginYBottom = narrow ? Math.max(24, h * 0.05) : Math.max(52, h * 0.08);
  const marginYTop = Math.max(marginYBottom, titleOverlayBottomPx());
  const bloomPad = veryNarrow ? 14 : narrow ? Math.max(20, Math.min(w, h) * 0.04) : Math.max(42, Math.min(w, h) * 0.055);
  const ndc = new THREE.Vector3();
  const themeLabels = () => labelSprites.filter((l) => l.userData.kind === 'theme' && l.userData.el);

  const projectThemeLabelEls = () => {
    themeLabels().forEach((label) => {
      if (label.userData.home) label.position.copy(label.userData.home);
      label.getWorldPosition(_labelWorld);
      _labelNdc.copy(_labelWorld).project(camera);
      const off = label.userData.screenOffset || { x: 0, y: -14 };
      const sx = Math.round((_labelNdc.x * 0.5 + 0.5) * w + off.x);
      const sy = Math.round((-_labelNdc.y * 0.5 + 0.5) * h + off.y);
      label.userData.el.style.transform =
        `translate3d(${sx}px, ${sy}px, 0) translate(-50%, calc(-100% - 6px))`;
    });
  };

  for (let iter = 0; iter < 24; iter++) {
    let needsZoom = false;
    Object.values(THEME_POSITIONS).forEach((p) => {
      ndc.set(p.x, p.y, p.z).project(camera);
      const sx = (ndc.x * 0.5 + 0.5) * w;
      const sy = (-ndc.y * 0.5 + 0.5) * h;
      if (
        sx - bloomPad < marginX || sx + bloomPad > w - marginX
        || sy - bloomPad < marginYTop || sy + bloomPad > h - marginYBottom
      ) {
        needsZoom = true;
      }
    });
    // Measure actual theme mini-HUD boxes. Long names ("Languages & Compilers",
    // "Systems & Virtualization") are ~220–250px once Orbitron loads — if the
    // DOM box is still unset/pre-font, assume a conservative half-width.
    projectThemeLabelEls();
    const themeEls = themeLabels();
    if (themeEls.length) {
      themeEls.forEach((label) => {
        const r = label.userData.el.getBoundingClientRect();
        const halfW = Math.max(r.width > 4 ? r.width * 0.5 : (veryNarrow ? 120 : 70), 1);
        const halfH = Math.max(r.height > 2 ? r.height * 0.5 : 14, 1);
        const cx = r.width > 4 ? r.left + r.width * 0.5 : null;
        const cy = r.height > 2 ? r.top + r.height * 0.5 : null;
        // Prefer live box; fall back to projected center ± assumed size.
        if (cx != null && cy != null) {
          if (
            cx - halfW < marginX
            || cx + halfW > w - marginX
            || cy - halfH < marginYTop
            || cy + halfH > h - marginYBottom * 0.35
          ) {
            needsZoom = true;
          }
        } else {
          needsZoom = true;
        }
      });
    } else if (veryNarrow || narrow) {
      // Labels not mounted yet — still reserve space for wide theme names.
      Object.values(THEME_POSITIONS).forEach((p) => {
        ndc.set(p.x, p.y + 26, p.z).project(camera);
        const lsx = (ndc.x * 0.5 + 0.5) * w;
        const lsy = (-ndc.y * 0.5 + 0.5) * h;
        const halfW = veryNarrow ? 120 : 80;
        if (
          lsx - halfW < marginX || lsx + halfW > w - marginX
          || lsy - 14 < marginYTop || lsy + 14 > h - marginYBottom * 0.35
        ) {
          needsZoom = true;
        }
      });
    }
    if (!needsZoom) break;
    dist *= 1.07;
    dist = Math.min(dist, veryNarrow ? 1100 : narrow ? 720 : 520);
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
  const visualScale = projectVisualScale(project);

  // Every project gets an L2 mini-HUD label (fixed screen size)
  {
    const pl = createLabelAnchor({ text: project.title, hex: color, kind: 'project', parent: scene });
    const yOff = satellite ? 1.6 : 2.8 + (slot % 2) * 1.1;
    const xOff = satellite ? ((slot % 2 === 0) ? -1.6 : 1.8) : ((slot % 2 === 0) ? -2.8 : 3.2);
    pl.position.copy(cluster).add(new THREE.Vector3(xOff, yOff, (slot % 2) * 0.8));
    pl.userData.projectId = project.id;
    pl.userData.projectTheme = theme;
    // Featured entries keep a slight priority bump so labels stay preferred.
    const basePri = satellite ? Math.min(project.weight || 3, 3) : (project.weight || 5);
    pl.userData.priority = visualScale > 1 ? basePri + 2 : basePri;
    pl.userData.satelliteOf = project.satelliteOf || null;
    pl.userData.visualScale = visualScale;
    pl.userData.home = pl.position.clone();
    pl.userData.themeOffset = pl.position.clone().sub(themePos);
    // Nudge featured labels up a few px so they clear the larger glow.
    pl.userData.screenOffset = {
      x: slot % 2 === 0 ? -10 : 10,
      y: visualScale > 1 ? -18 : -14
    };
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
    const baseSize = satellite
      ? 0.85 + (Math.min(weight, 4) / 10) * 1.1
      : 1.6 + (weight / 10) * 2.2;
    const size = baseSize * visualScale;
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
      visualScale,
      pickRadiusPx: STAR_PICK_RADIUS_PX * visualScale,
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
    // Lift/side offset grow with visual scale so labels clear the larger glow.
    const lift = (satellite ? 2.0 : 3.2) * visualScale;
    const sideDist = (satellite ? 1.5 : 2.4) * Math.sqrt(visualScale);
    pl.position.copy(firstStar.position).add(new THREE.Vector3(side * sideDist, lift, 0.4));
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
    } else if (e.key === 'Backspace') {
      // Native delete only — never let constellation/HUD nav see Backspace while typing.
      e.stopPropagation();
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
    // keep print params; cluster is session-only (cleared on user navigation)
    const q = params.toString();
    const url = `${location.pathname}${q ? `?${q}` : ''}${location.hash || ''}`;
    history.pushState({ topic: activeTopicId }, '', url);
  }
}
window.setActiveTopic = setActiveTopic;

/** Drop ?cluster= so a sticky deep-link cluster cannot override later clicks. */
function clearClusterQueryParam() {
  const params = new URLSearchParams(location.search);
  if (!params.has('cluster')) return false;
  params.delete('cluster');
  const q = params.toString();
  const url = `${location.pathname}${q ? `?${q}` : ''}${location.hash || ''}`;
  history.replaceState(null, '', url);
  return true;
}
window.clearClusterQueryParam = clearClusterQueryParam;

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

function rectsOverlap(a, b, pad = 0) {
  return !(
    a.right < b.left - pad
    || a.left > b.right + pad
    || a.bottom < b.top - pad
    || a.top > b.bottom + pad
  );
}

/** Project world anchors → pixel-snapped HTML mini-HUD labels. */
function updateLabels(_dt) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const camPos = camera.position;
  const hudEl = document.getElementById('hud');
  const hudOpen = !!currentStar && !!hudEl?.classList.contains('open');
  // Bottom-docked HUD (narrow) sits over the constellation; desktop uses a right rail.
  const narrowHud = w <= 768;
  const hudRect = hudOpen ? hudEl.getBoundingClientRect() : null;

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
      // Narrow: hide all project mini-labels while HUD is open so they cannot
      // show through the translucent panel and cover cartoon titles / media.
      if (wantVisible && hudOpen && narrowHud) wantVisible = false;
    }

    _labelNdc.copy(_labelWorld).project(camera);
    const behind = _labelNdc.z > 1 || _labelNdc.z < -1;
    if (behind) wantVisible = false;

    // Always project screen position (even while hidden) so HUD open/close FLIP
    // can measure the live slot — never leave the DOM node at 0×0 / unset.
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

    // Desktop rail: hide any project label that projects over the open HUD glass.
    if (wantVisible && hudOpen && !narrowHud && !isTheme && hudRect) {
      const approx = {
        left: sx - 120,
        right: sx + 120,
        top: sy - 36,
        bottom: sy + 4
      };
      if (rectsOverlap(approx, hudRect, 8)) wantVisible = false;
    }

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

/**
 * Force-project one label's DOM box for FLIP.
 * Optional `pose` projects from a stored cluster/overview camera so close FLIP
 * targets where the mini-HUD will sit after the camera returns — not the
 * distorted detail-camera projection (which parks the label on the HUD).
 */
function syncLabelScreenPosition(projectId, { pose = null } = {}) {
  const label = labelSprites.find(
    (l) => l.userData.kind === 'project' && l.userData.projectId === projectId
  );
  if (!label?.userData?.el) return null;
  const el = label.userData.el;
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (label.userData.home) label.position.copy(label.userData.home);
  label.getWorldPosition(_labelWorld);

  let projCam = camera;
  let tmpCam = null;
  if (pose?.position && pose?.lookAt) {
    tmpCam = camera.clone();
    tmpCam.position.copy(pose.position);
    tmpCam.fov = typeof pose.fov === 'number' ? pose.fov : camera.fov;
    tmpCam.aspect = camera.aspect;
    tmpCam.near = camera.near;
    tmpCam.far = camera.far;
    tmpCam.up.copy(camera.up);
    tmpCam.lookAt(pose.lookAt);
    tmpCam.updateProjectionMatrix();
    tmpCam.updateMatrixWorld(true);
    projCam = tmpCam;
  }

  _labelNdc.copy(_labelWorld).project(projCam);
  const off = label.userData.screenOffset || { x: 0, y: -14 };
  const sx = Math.round((_labelNdc.x * 0.5 + 0.5) * w + off.x);
  const sy = Math.round((-_labelNdc.y * 0.5 + 0.5) * h + off.y);
  label.userData.lastSx = sx;
  label.userData.lastSy = sy;
  el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, calc(-100% - 6px))`;
  // Clear leftover animation inline styles; visibility stays driven by classes.
  el.style.opacity = '';
  el.style.visibility = '';
  el.style.left = '';
  el.style.top = '';
  el.style.width = '';
  el.style.height = '';
  el.style.maxWidth = '';
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

/**
 * Top title (name + print link) and help panel: show when zoomed out, hide when
 * zoomed in. Driven by camera distance every frame (wheel / keys / warp / flights),
 * with hysteresis so it does not flicker near the threshold.
 *
 * Regression note: continuous HUD title morph (#61) keeps `currentStar` set until
 * the close morph finishes, while updateClusterDimming treated `!!currentStar` as
 * focused and set opacity 0 — then never ran again after currentStar cleared, so
 * the title stayed invisible after zooming back out. Distance + class sync below
 * replaces that one-shot inline opacity write.
 */
// Absolute distances must sit below the narrowest overview fit (~180) so a
// fully zoomed-out view always clears the show threshold.
const TITLE_HIDE_ZOOM = 145; // hide when distance drops below this
const TITLE_SHOW_ZOOM = 170; // show again only after zooming out past this
let titleOverlayShown = true;

function syncTitleOverlayVisibility() {
  const title = document.getElementById('title-overlay');
  const help = document.getElementById('controls');
  const zoom = controls.currentZoom;
  const detailOpen = viewLevel >= 3 || !!currentStar || isHudOpen();

  if (titleOverlayShown) {
    if (detailOpen || viewLevel >= 2 || zoom < TITLE_HIDE_ZOOM) {
      titleOverlayShown = false;
    }
  } else if (!detailOpen && viewLevel === 1 && zoom >= TITLE_SHOW_ZOOM) {
    titleOverlayShown = true;
  }

  if (title) {
    title.classList.toggle('is-away', !titleOverlayShown);
    title.style.opacity = '';
    title.setAttribute('aria-hidden', titleOverlayShown ? 'false' : 'true');
  }
  if (help) {
    help.classList.toggle('is-away', !titleOverlayShown);
    help.style.opacity = '';
  }
}

function updateClusterDimming() {
  const focused = viewLevel >= 3 || !!currentStar;
  bloomPass.strength = focused ? 0.28 : (viewLevel === 2 ? 0.5 : 0.62);
  renderer.toneMappingExposure = focused ? 0.68 : (viewLevel === 2 ? 1.22 : 1.34);
  labelResolveAt = 0;
  syncTitleOverlayVisibility();
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
    // Keep zoom metric live during flights so the title overlay can track distance.
    const liveDist = camera.position.distanceTo(look);
    controls.currentZoom = liveDist;
    controls.targetZoom = liveDist;
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

/** In-flight rAF for the continuous title morph (cancelled on interrupt). */
let hudMorphRaf = 0;
/** Open morph clone planted before flyToStar so the in-cloud label never drifts. */
let hudOpenMorph = null; // { fly, from, projectId }

function cancelHudMorphRaf() {
  if (hudMorphRaf) {
    cancelAnimationFrame(hudMorphRaf);
    hudMorphRaf = 0;
  }
}

function removeHudFlyLabel() {
  cancelHudMorphRaf();
  document.getElementById('hud-fly-label')?.remove();
  hudOpenMorph = null;
}

/** Always leave the real HUD title readable — no leftover opacity/transform from morph. */
function revealHudProjectTitle(hud) {
  if (!hud) return;
  removeHudFlyLabel();
  hud.classList.remove('hud-flying');
  const titleBar = hud.querySelector('.hud-title-bar');
  const titleText = hud.querySelector('[data-hud="project"]');
  if (titleBar) {
    titleBar.style.opacity = '';
    titleBar.style.transition = '';
  }
  if (titleText) {
    titleText.style.opacity = '';
    titleText.style.transition = '';
    titleText.style.fontSize = '';
    titleText.style.transform = '';
  }
}

function makeHudFlyLabel(title, accent) {
  const fly = document.createElement('div');
  fly.id = 'hud-fly-label';
  fly.style.setProperty('--hud-accent', accent || '#40e0ff');
  fly.innerHTML = `<span class="ms-label-bar" aria-hidden="true"></span><span class="ms-label-text"></span>`;
  fly.querySelector('.ms-label-text').textContent = title || '';
  return fly;
}

function copyRect(r) {
  if (!r) return null;
  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
    right: r.left + r.width,
    bottom: r.top + r.height
  };
}

function applyFlyRect(el, r) {
  if (!el || !r) return;
  el.style.left = `${r.left}px`;
  el.style.top = `${r.top}px`;
  el.style.width = `${Math.max(0, r.width)}px`;
  el.style.height = `${Math.max(0, r.height)}px`;
  el.style.maxWidth = 'none';
  el.style.transform = '';
  el.style.transition = 'none';
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpRect(a, b, t) {
  return {
    left: lerp(a.left, b.left, t),
    top: lerp(a.top, b.top, t),
    width: lerp(a.width, b.width, t),
    height: lerp(a.height, b.height, t)
  };
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * Plant the open morph clone at the in-cloud label BEFORE the camera moves.
 * Hides the real label in the same frame so only one box is visible.
 */
function plantOpenMorphClone(star) {
  removeHudFlyLabel();
  if (prefersReducedMotion() || !star) return null;
  const projectId = star.project?.id;
  const labelEl = findProjectLabelEl(projectId);
  if (!labelEl) return null;
  syncLabelScreenPosition(projectId);
  void labelEl.offsetWidth;
  const from = copyRect(labelEl.getBoundingClientRect());
  if (!from || from.width < 2 || from.height < 2) return null;
  labelEl.classList.add('ms-label-hud-open');
  labelEl.classList.remove('is-visible');
  labelEl.dataset.hudOpenRect = JSON.stringify({
    left: from.left, top: from.top, width: from.width, height: from.height
  });
  const accent = `#${new THREE.Color(star.color).getHexString()}`;
  const fly = makeHudFlyLabel(star.project?.title || '', accent);
  document.body.appendChild(fly);
  applyFlyRect(fly, from);
  hudOpenMorph = { fly, from, projectId };
  return hudOpenMorph;
}

/**
 * Continuous morph: one box, left/top/width/height lerped each frame toward a
 * live getToRect() so camera motion cannot leave a stale target.
 */
function animateTrackedMorph(fly, startRect, getToRect, {
  duration = HUD_TIMING.flipMs,
  gen = hudAnimGen,
  asTitleStart = false,
  asTitleEnd = true
} = {}) {
  return new Promise((resolve) => {
    const finish = () => {
      cancelHudMorphRaf();
      resolve();
    };
    if (!fly || !startRect) {
      finish();
      return;
    }
    if (asTitleStart) fly.classList.add('hud-fly-as-title');
    else fly.classList.remove('hud-fly-as-title');
    applyFlyRect(fly, startRect);

    if (prefersReducedMotion()) {
      const to = (typeof getToRect === 'function' ? getToRect() : getToRect) || startRect;
      applyFlyRect(fly, to);
      if (asTitleEnd) fly.classList.add('hud-fly-as-title');
      else fly.classList.remove('hud-fly-as-title');
      finish();
      return;
    }

    const t0 = performance.now();
    const tick = (now) => {
      if (gen !== hudAnimGen) {
        finish();
        return;
      }
      const raw = Math.min(1, (now - t0) / Math.max(1, duration));
      const t = easeOutCubic(raw);
      const to = (typeof getToRect === 'function' ? getToRect() : getToRect) || startRect;
      applyFlyRect(fly, lerpRect(startRect, to, t));
      if (asTitleEnd && !asTitleStart && t >= 0.35) fly.classList.add('hud-fly-as-title');
      if (asTitleStart && !asTitleEnd && t >= 0.55) fly.classList.remove('hud-fly-as-title');
      if (raw < 1) {
        hudMorphRaf = requestAnimationFrame(tick);
      } else {
        applyFlyRect(fly, to);
        if (asTitleEnd) fly.classList.add('hud-fly-as-title');
        else fly.classList.remove('hud-fly-as-title');
        finish();
      }
    };
    hudMorphRaf = requestAnimationFrame(tick);
  });
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
  // Title text must never keep a leftover fade (close used to leave opacity:0).
  hud.querySelectorAll(
    '[data-hud="project"], [data-hud="theme"], [data-hud="section"], [data-hud="years"], .hud-index, .hud-topics, [data-hud="media"], .hud-bullet, .hud-connected'
  ).forEach((el) => {
    el.style.opacity = '';
    el.style.transition = '';
    el.style.fontSize = '';
    el.style.transform = '';
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
  // Generous pad so title glyphs are never sliced by the inset edge.
  const pad = 6;
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
  const { timer, onSkip, chars, cursor, root, resolve } = hudTeletype;
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
  // Always resolve so a superseded teletype cannot hang open choreography
  // (which used to leave [data-hud=media] at opacity 0 indefinitely).
  if (typeof resolve === 'function') resolve();
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
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const finish = () => {
      stopHudTeletype({ finish: true });
      settle();
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
    // resolve is invoked by stopHudTeletype (supersede) or finish() above.
    hudTeletype = { timer, onSkip, chars, cursor, root, resolve: settle };
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

/** Measure the in-cloud label box (works while ms-label-hud-open hides it). */
function measureProjectLabelRect(projectId, { pose = null } = {}) {
  const labelEl = findProjectLabelEl(projectId);
  if (!labelEl) return null;
  syncLabelScreenPosition(projectId, { pose });
  void labelEl.offsetWidth;
  const r = copyRect(labelEl.getBoundingClientRect());
  if (r && r.width >= 2 && r.height >= 2) return r;
  const saved = labelEl.dataset.hudOpenRect;
  if (saved) {
    try {
      return copyRect(JSON.parse(saved));
    } catch { /* ignore */ }
  }
  return r;
}

function waitMs(ms) {
  return new Promise((r) => setTimeout(r, prefersReducedMotion() ? 0 : ms));
}

function stillHudGen(gen) {
  return gen === hudAnimGen;
}

/**
 * Tear down YouTube embeds in the HUD so playback (and audio) cannot continue
 * after close, Escape, empty-space dismiss, cluster exit, or node switch.
 * Blanking iframe src is more reliable than postMessage alone when the panel
 * is only hidden.
 */
function stopHudVideos() {
  const media = document.querySelector('#hud [data-hud="media"]');
  if (!media) return;
  media.querySelectorAll('iframe').forEach((iframe) => {
    try {
      iframe.src = 'about:blank';
    } catch (_) {
      /* ignore cross-document teardown errors */
    }
    iframe.removeAttribute('src');
  });
  media.querySelectorAll('.hud-video').forEach((el) => el.remove());
}

/** Media focus: HUD = media only, centered, sized to ≤95vw/95vh. */
let mediaFocusEl = null;

function isMediaFocus() {
  return !!document.getElementById('hud')?.classList.contains('hud-media-focus');
}

function ensureMediaFocusBackdrop() {
  let el = document.getElementById('hud-media-focus-backdrop');
  if (!el) {
    el = document.createElement('div');
    el.id = 'hud-media-focus-backdrop';
    document.body.appendChild(el);
  }
  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  return el;
}

function sizeMediaFocus(mediaEl) {
  const hud = document.getElementById('hud');
  if (!hud || !mediaEl) return;
  // Fit the decorated frame to the media aspect ratio, as large as possible
  // within 98vw×98vh. Close is overlaid inside the frame — no chrome strip.
  const HUD_PAD = 8;
  const PANEL_PAD = 8;
  const inset = HUD_PAD + PANEL_PAD;
  const maxOuterW = window.innerWidth * 0.98;
  const maxOuterH = window.innerHeight * 0.98;
  const maxW = Math.max(160, maxOuterW - inset * 2);
  const maxH = Math.max(90, maxOuterH - inset * 2);
  let mediaW = maxW;
  let mediaH = maxH;

  if (mediaEl.classList.contains('hud-image')) {
    const img = mediaEl.querySelector('img');
    const nw = img?.naturalWidth || img?.width || 640;
    const nh = img?.naturalHeight || img?.height || 360;
    if (nw > 0 && nh > 0) {
      if (nw <= maxW && nh <= maxH) {
        mediaW = nw;
        mediaH = nh;
      } else {
        const s = Math.min(maxW / nw, maxH / nh);
        mediaW = nw * s;
        mediaH = nh * s;
      }
    }
  } else if (mediaEl.classList.contains('hud-video')) {
    const vertical = mediaEl.classList.contains('hud-video-vertical');
    const ar = vertical ? 9 / 16 : 16 / 9;
    if (maxW / maxH > ar) {
      mediaH = maxH;
      mediaW = mediaH * ar;
    } else {
      mediaW = maxW;
      mediaH = mediaW / ar;
    }
  }

  const hudW = Math.min(maxOuterW, mediaW + inset * 2);
  const hudH = Math.min(maxOuterH, mediaH + inset * 2);
  hud.style.setProperty('--hud-focus-w', `${Math.ceil(hudW)}px`);
  hud.style.setProperty('--hud-focus-h', `${Math.ceil(hudH)}px`);
  hud.style.setProperty('--hud-focus-media-w', `${Math.ceil(mediaW)}px`);
  hud.style.setProperty('--hud-focus-media-h', `${Math.ceil(mediaH)}px`);
}

function enterMediaFocus(mediaEl) {
  const hud = document.getElementById('hud');
  if (!hud?.classList.contains('open') || !mediaEl) return;
  if (!mediaEl.classList.contains('hud-image') && !mediaEl.classList.contains('hud-video')) return;

  mediaFocusEl = mediaEl;
  hud.querySelectorAll('.hud-media-focus-active').forEach((el) => {
    el.classList.remove('hud-media-focus-active');
  });
  mediaEl.classList.add('hud-media-focus-active');
  sizeMediaFocus(mediaEl);
  if (mediaEl.classList.contains('hud-image')) {
    const img = mediaEl.querySelector('img');
    if (img && !img.complete) {
      img.addEventListener('load', () => {
        if (mediaFocusEl === mediaEl) sizeMediaFocus(mediaEl);
      }, { once: true });
    }
  }
  hud.classList.add('hud-media-focus');

  const backdrop = ensureMediaFocusBackdrop();
  backdrop.classList.add('is-on');
  // Pin media into view
  const below = hud.querySelector('.hud-below-inner');
  if (below) below.scrollTop = 0;

  // Full-screen media focus: kill auto-warp entirely (paused or playing).
  if (autoMode) exitAutoMode();
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

function exitMediaFocus() {
  const hud = document.getElementById('hud');
  const wasFocus = hud?.classList.contains('hud-media-focus');
  mediaFocusEl = null;
  hud?.classList.remove('hud-media-focus');
  hud?.querySelectorAll('.hud-media-focus-active').forEach((el) => {
    el.classList.remove('hud-media-focus-active');
  });
  if (hud) {
    hud.style.removeProperty('--hud-focus-w');
    hud.style.removeProperty('--hud-focus-h');
    hud.style.removeProperty('--hud-focus-media-w');
    hud.style.removeProperty('--hud-focus-media-h');
  }
  const backdrop = document.getElementById('hud-media-focus-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-on');
    backdrop.hidden = true;
    backdrop.setAttribute('aria-hidden', 'true');
  }
  // Resume normal idle delay (5 min while HUD still open, 30s at overview).
  if (wasFocus) noteUserActivity();
}

function setupMediaFocusInteractions() {
  const hud = document.getElementById('hud');
  if (!hud || hud.dataset.mediaFocusBound) return;
  hud.dataset.mediaFocusBound = '1';

  hud.addEventListener('click', (e) => {
    const mediaEl = e.target?.closest?.('.hud-image, .hud-video');
    if (mediaEl && hud.contains(mediaEl) && !isMediaFocus()) {
      // Image click / video chrome click → focus. Links inside credits still work
      // (credit is hidden in focus; ignore credit clicks before focus).
      if (e.target?.closest?.('.hud-image-credit, .hud-links, a')) return;
      noteUserActivity();
      enterMediaFocus(mediaEl);
      return;
    }
    if (isMediaFocus() && !e.target?.closest?.('.hud-image, .hud-video, #hud-close')) {
      noteUserActivity();
      exitMediaFocus();
    }
  });

  const backdrop = ensureMediaFocusBackdrop();
  backdrop.hidden = true;
  backdrop.addEventListener('click', (e) => {
    e.preventDefault();
    noteUserActivity();
    exitMediaFocus();
  });

  window.addEventListener('message', (e) => {
    if (!e.origin || !String(e.origin).includes('youtube.com')) return;
    let data = e.data;
    try {
      if (typeof data === 'string') data = JSON.parse(data);
    } catch {
      return;
    }
    const state = data?.event === 'onStateChange'
      ? data.info
      : data?.info?.playerState;
    // 1 = playing
    if (state !== 1) return;
    if (!hud.classList.contains('open')) return;
    const frames = hud.querySelectorAll('.hud-video iframe');
    for (const frame of frames) {
      if (frame.contentWindow === e.source) {
        const wrap = frame.closest('.hud-video');
        if (wrap) enterMediaFocus(wrap);
        break;
      }
    }
  });

  window.addEventListener('resize', () => {
    if (isMediaFocus() && mediaFocusEl) sizeMediaFocus(mediaFocusEl);
  });
}

/**
 * HUD-only: turn a list that has exactly one <li> into a plain <p> (keep inner HTML).
 * Innermost lists first so nested singleton lists collapse cleanly. Print CV uses
 * the separate `bullets` array and is unchanged.
 */
function collapseSingletonListsHtml(html) {
  if (!html) return html;
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  const lists = [...wrap.querySelectorAll('ul, ol')].reverse();
  lists.forEach((list) => {
    const items = [...list.children].filter((el) => el.tagName === 'LI');
    if (items.length !== 1) return;
    const p = document.createElement('p');
    p.innerHTML = items[0].innerHTML;
    list.replaceWith(p);
  });
  return wrap.innerHTML;
}

function populateHUD(star, { allowAutoplay = true } = {}) {
  const hud = document.getElementById('hud');
  const project = star.project;
  const bullet = star.bullet;
  const themeColor = `#${new THREE.Color(star.color).getHexString()}`;

  // Stop any previous node's video before rebuilding media.
  exitMediaFocus();
  stopHudVideos();

  hud.style.setProperty('--hud-accent', themeColor);
  hud.querySelector('[data-hud="theme"]').textContent = project.theme || '';
  // Title: plain text immediately — no teletype, no measure/fit, no leftover opacity.
  const titleEl = hud.querySelector('[data-hud="project"]');
  if (titleEl) {
    titleEl.style.opacity = '';
    titleEl.style.transition = '';
    titleEl.style.fontSize = '';
    titleEl.style.transform = '';
    titleEl.textContent = project.title || '';
  }
  // Section / Years may contain markdown links — render like the body (visible text + real <a>).
  const yearsRaw = project.years || '—';
  const sectionRaw = bullet.section || 'DATUM';
  const yearsEl = hud.querySelector('[data-hud="years"]');
  const sectionEl = hud.querySelector('[data-hud="section"]');
  yearsEl.innerHTML = marked.parseInline(String(yearsRaw), { async: false });
  sectionEl.innerHTML = marked.parseInline(String(sectionRaw), { async: false });
  // Prefer full project HTML so teletype walks rendered text nodes (links/formatting survive).
  // Fall back to the clicked bullet for sparse items.
  const bulletEl = hud.querySelector('[data-hud="bullet"]');
  if (project.content) {
    // Singleton <ul>/<ol> → <p> (cartoons and other one-liner sections); print CV untouched.
    bulletEl.innerHTML = collapseSingletonListsHtml(project.content);
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
  // Prefer video when both are present — keep images in content for print / other uses.
  const hasVideos = !!(project.videos && project.videos.length);
  if (!hasVideos && project.images && project.images.length) {
    project.images.forEach((entry) => {
      const src = typeof entry === 'string' ? entry : entry?.src;
      if (!src) return;
      const credit = typeof entry === 'object' ? entry.credit : null;
      const wrap = document.createElement('div');
      wrap.className = 'hud-image';
      const img = document.createElement('img');
      img.src = src;
      img.alt = project.title || '';
      // Eager: deep-link / open path must show the full image (incl. top title /
      // cover lettering) as soon as the panel expands — lazy deferral left a
      // blank media plate for cartoons, book covers, and other HUD images.
      img.loading = 'eager';
      img.decoding = 'async';
      const pinMediaTop = () => {
        const below = hud.querySelector('.hud-below-inner');
        if (below) below.scrollTop = 0;
      };
      img.addEventListener('load', pinMediaTop);
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
    project.videos.forEach((entry) => {
      // Support plain id strings or { id, start } / "id?start=N" for timed embeds.
      let id = entry;
      let start = null;
      if (entry && typeof entry === 'object') {
        id = entry.id || entry.videoId || '';
        start = entry.start ?? entry.t ?? null;
      } else if (typeof entry === 'string') {
        const m = entry.match(/^([\w-]+)(?:[?&](?:start|t)=(\d+))?$/);
        if (m) {
          id = m[1];
          start = m[2] ? Number(m[2]) : null;
        }
      }
      if (!id) return;
      const wrap = document.createElement('div');
      wrap.className = vertical ? 'hud-video hud-video-vertical' : 'hud-video';
      const extras = allowAutoplay ? '' : '&mute=1';
      const startParam = Number.isFinite(start) && start > 0 ? `&start=${start}` : '';
      wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?rel=0${extras}${startParam}&enablejsapi=1" allowfullscreen allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
      const iframe = wrap.querySelector('iframe');
      iframe?.addEventListener('load', () => {
        try {
          iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: id }), '*');
        } catch { /* ignore */ }
      });
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
  // Keep the clone planted by openHUD (before flyToStar); only drop a stale leftover.
  if (!hudOpenMorph || hudOpenMorph.projectId !== projectId) {
    removeHudFlyLabel();
  }
  clearHudStageClasses(hud);
  applyHudTimingCss(hud);

  populateHUD(star, { allowAutoplay: !fromAuto && !autoMode });

  const snapOpen = async () => {
    clearHudStageClasses(hud);
    revealHudProjectTitle(hud);
    hud.classList.add('open', 'hud-expanded', 'hud-chip-section', 'hud-chip-years', 'hud-body-in', 'hud-ready');
    hud.setAttribute('aria-hidden', 'false');
    if (labelEl) labelEl.classList.add('ms-label-hud-open');
    if (!prefersReducedMotion()) {
      await startHudTeletype(hud.querySelector('[data-hud="bullet"]'), { cps: HUD_TIMING.bodyTeletypeCps });
    }
  };

  // Prefer the clone planted in openHUD before flyToStar (one box, no camera drift).
  let planted = hudOpenMorph;
  if (planted && planted.projectId !== projectId) planted = null;
  // Reduced-motion or a missing label/panel snaps open with the title visible.
  if (prefersReducedMotion() || !labelEl || !titleBar || !panel) {
    await snapOpen();
    return;
  }

  let from = planted?.from || null;
  let fly = planted?.fly && document.body.contains(planted.fly) ? planted.fly : null;
  if (!from || !fly) {
    // Fallback if openHUD could not plant (label not laid out yet).
    syncLabelScreenPosition(projectId);
    void labelEl.offsetWidth;
    from = copyRect(labelEl.getBoundingClientRect());
    if (!from || from.width < 2 || from.height < 2) {
      await waitMs(32);
      syncLabelScreenPosition(projectId);
      void labelEl.offsetWidth;
      from = copyRect(labelEl.getBoundingClientRect());
    }
    if (!from || from.width < 2 || from.height < 2) {
      await snapOpen();
      return;
    }
    labelEl.classList.add('ms-label-hud-open');
    labelEl.classList.remove('is-visible');
    labelEl.dataset.hudOpenRect = JSON.stringify({
      left: from.left, top: from.top, width: from.width, height: from.height
    });
    removeHudFlyLabel();
    fly = makeHudFlyLabel(
      star.project?.title || '',
      hud.style.getPropertyValue('--hud-accent') || '#40e0ff'
    );
    document.body.appendChild(fly);
    applyFlyRect(fly, from);
  }

  // Hide teletype targets until their stage; keep labels for chip chrome.
  // Preserve HTML so Section/Years markdown links survive the clear/restore cycle.
  const themeHtml = themeEl?.innerHTML || '';
  const sectionHtml = sectionEl?.innerHTML || '';
  const yearsHtml = yearsEl?.innerHTML || '';
  if (themeEl) themeEl.innerHTML = '';
  if (sectionEl) sectionEl.innerHTML = '';
  if (yearsEl) yearsEl.innerHTML = '';

  labelEl.classList.add('ms-label-hud-open');
  labelEl.classList.remove('is-visible');

  // 1) Same clone → HUD title (track live title rect; real title hidden only while clone shows).
  hud.classList.add('open', 'hud-clipping', 'hud-stage-title');
  hud.setAttribute('aria-hidden', 'false');
  void panel.offsetWidth;
  setPanelClip(panel, panelClipInsets(panel, titleBar, 'title'), { immediate: true, ms: HUD_TIMING.lateralMs });
  // Hide the real title only after the flying clone is already on screen.
  hud.classList.add('hud-flying');

  const getTitleRect = () => copyRect(titleBar.getBoundingClientRect()) || from;
  await animateTrackedMorph(fly, from, getTitleRect, {
    duration: HUD_TIMING.flipMs,
    gen,
    asTitleStart: false,
    asTitleEnd: true
  });
  // Same-frame handoff to the real title (even if this open was superseded).
  revealHudProjectTitle(hud);
  if (!stillHudGen(gen)) return;

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
  if (themeEl) themeEl.innerHTML = themeHtml;
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

  // Reveal media as soon as the panel is expanded so any HUD image top
  // (cartoon titles, book-cover lettering, etc.) is not blank during
  // Section/Years teletype — especially on deep-link opens.
  hud.classList.add('hud-body-in');
  const belowInner = hud.querySelector('.hud-below-inner');
  if (belowInner) belowInner.scrollTop = 0;

  // 5) Section then Years boxes extend right (overlap)
  hud.classList.add('hud-chip-section');
  await waitMs(Math.max(0, HUD_TIMING.chipMs - HUD_TIMING.chipOverlapMs));
  if (!stillHudGen(gen)) return;
  hud.classList.add('hud-chip-years');
  await waitMs(HUD_TIMING.chipOverlapMs);
  if (!stillHudGen(gen)) return;

  // 6) Teletype Section / Years (HTML restored — teletype types visible link text only)
  if (sectionEl) sectionEl.innerHTML = sectionHtml;
  if (yearsEl) yearsEl.innerHTML = yearsHtml;
  // Mark ready before chip teletype so deep-links don't leave media gated on
  // typing; layout/clip cleanup can run while chips type.
  hud.classList.add('hud-ready');
  if (belowInner) belowInner.scrollTop = 0;
  clearHudInlineAnimStyles(hud);
  await startHudTeletype(sectionEl, { cps: HUD_TIMING.chipTeletypeCps });
  if (!stillHudGen(gen)) return;
  await startHudTeletype(yearsEl, { cps: HUD_TIMING.chipTeletypeCps });
  if (!stillHudGen(gen)) return;

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
    const titleText = titleBar?.querySelector('[data-hud="project"]');
    [themeEl, sectionEl, yearsEl, titleBar, titleText, ...bodyBits].forEach((el) => {
      if (!el) return;
      el.style.opacity = '';
      el.style.transition = '';
      el.style.fontSize = '';
    });
  };

  if (!hud || prefersReducedMotion() || !star || !labelEl || !titleBar || !panel) {
    snapClose();
    return { cameraHandled: false };
  }

  // Reverse 6: blink+fade teletyped body / chip / theme text
  await blinkFadeHudText([...bodyBits, sectionEl, yearsEl, themeEl], gen);
  if (!stillHudGen(gen)) return { cameraHandled: false };
  hud.classList.remove('hud-body-in', 'hud-ready');

  // Reverse 5: years then section collapse horizontally
  hud.classList.remove('hud-chip-years');
  await waitMs(Math.max(0, HUD_TIMING.chipMs - HUD_TIMING.chipOverlapMs));
  if (!stillHudGen(gen)) return { cameraHandled: false };
  hud.classList.remove('hud-chip-section');
  await waitMs(HUD_TIMING.chipOverlapMs);
  if (!stillHudGen(gen)) return { cameraHandled: false };

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
  if (!stillHudGen(gen)) return { cameraHandled: false };
  band = panelClipInsets(panel, titleBar, 'title');
  setPanelClip(panel, {
    top: 0,
    right: 0,
    bottom: Math.max(0, band.bottom),
    left: 0
  }, { immediate: true });

  // Reverse 3: collapse upward. Open bottom clip first so the moving title
  // cannot be cut; title text stays centered in the title bar meanwhile.
  setPanelClip(panel, { top: 0, right: 0, bottom: 0, left: 0 }, { immediate: true, ms: HUD_TIMING.upMs });
  hud.classList.remove('hud-stage-up');
  await waitMs(HUD_TIMING.upMs);
  if (!stillHudGen(gen)) return { cameraHandled: false };
  void panel.offsetWidth;

  band = panelClipInsets(panel, titleBar, 'title');

  // Reverse 2: clip to the live title band (title stays plain CSS — no fade/fit).
  hud.classList.remove('hud-stage-wide');
  hud.classList.add('hud-stage-title');
  setPanelClip(panel, band, { ms: HUD_TIMING.lateralMs });
  await waitMs(HUD_TIMING.lateralMs);
  if (!stillHudGen(gen)) return { cameraHandled: false };

  // Reverse 1: one clone from HUD title → live in-cloud label while the camera returns.
  const returnPose = clusterPose || preHudPose;
  const from = copyRect(titleBar.getBoundingClientRect());
  const preview = measureProjectLabelRect(projectId, { pose: returnPose })
    || measureProjectLabelRect(projectId);
  if (!from || from.width < 2 || !preview || preview.width < 2) {
    snapClose();
    return { cameraHandled: false };
  }

  const miniText = labelEl.querySelector('.ms-label-text')?.textContent || star.project?.title || '';
  const fly = makeHudFlyLabel(
    miniText,
    hud.style.getPropertyValue('--hud-accent') || '#40e0ff'
  );
  fly.classList.add('hud-fly-as-title');
  document.body.appendChild(fly);
  applyFlyRect(fly, from);
  // Same frame: clone owns the box; real HUD title hidden.
  hud.classList.add('hud-flying');

  // Camera returns during the morph so the projected target moves continuously —
  // never animate to a stale rect then reveal the label elsewhere.
  let cameraHandled = false;
  if (returnPose) {
    flyToPose(returnPose);
    cameraHandled = true;
  }

  const morphMs = Math.max(HUD_TIMING.flipMs, Math.round(FLY_DURATION_MS * 0.9));
  const getLabelRect = () => measureProjectLabelRect(projectId) || preview;
  await animateTrackedMorph(fly, from, getLabelRect, {
    duration: morphMs,
    gen,
    asTitleStart: true,
    asTitleEnd: false
  });
  if (!stillHudGen(gen)) {
    removeHudFlyLabel();
    revealHudProjectTitle(hud);
    return { cameraHandled };
  }

  // Same-frame handoff: show in-cloud label at the clone's final spot, drop clone.
  const finalRect = getLabelRect();
  if (finalRect) applyFlyRect(fly, finalRect);
  syncLabelScreenPosition(projectId);
  labelEl.classList.remove('ms-label-hud-open');
  labelEl.style.opacity = '';
  labelEl.style.visibility = '';
  delete labelEl.dataset.hudOpenRect;
  removeHudFlyLabel();
  snapClose();
  return { cameraHandled };
}

function enterClusterView(theme, { fromAuto = false, fromDeepLink = false } = {}) {
  if (!THEME_POSITIONS[theme]) return Promise.resolve();
  // User navigation drops sticky ?cluster=; initial deep-link keeps it until then.
  if (!fromDeepLink && !fromAuto) clearClusterQueryParam();
  if (viewLevel === 1 && !overviewPose) overviewPose = captureCameraPose();
  // Closing HUD without leaving cluster (instant — cluster fly owns motion)
  if (currentStar) {
    hudAnimGen += 1;
    stopHudTeletype({ finish: true });
    stopHudVideos();
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
  // User zoomed into a cluster → switch idle warp delay to the engaged (5 min) timer.
  if (!fromAuto) noteUserActivity();
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
  // Snap-close any in-flight HUD/morph synchronously. Calling closeHUD() here was
  // racy: a prior Escape may still be morphing (currentStar set, .open still on),
  // and starting a second async close left the panel stuck while the camera left.
  const hud = document.getElementById('hud');
  if (currentStar || hud?.classList.contains('open')) {
    hudAnimGen += 1;
    stopHudTeletype({ finish: true });
    stopHudVideos();
    exitMediaFocus();
    removeHudFlyLabel();
    findProjectLabelEl(currentStar?.project?.id)?.classList.remove('ms-label-hud-open');
    currentStar = null;
    clearHudStageClasses(hud);
    revealHudProjectTitle(hud);
    hud?.classList.remove('open');
    hud?.setAttribute('aria-hidden', 'true');
    highlightConnectedEdges(null);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }
  focusTheme = null;
  viewLevel = 1;
  clusterPose = null;
  preHudPose = null;
  updateClusterDimming();
  // Back at top-level overview → restore the short (30s) idle warp delay.
  // Skip while auto-warp is driving navigation (only real input engages).
  if (!autoMode) noteUserActivity();
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
  // Selecting a node always clears sticky ?cluster= so it cannot re-force focus.
  if (!fromAuto) clearClusterQueryParam();
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
    stopHudVideos();
    findProjectLabelEl(currentStar.project?.id)?.classList.remove('ms-label-hud-open');
    const prevHud = document.getElementById('hud');
    clearHudStageClasses(prevHud);
    revealHudProjectTitle(prevHud);
    prevHud?.classList.remove('open');
    prevHud?.setAttribute('aria-hidden', 'true');
    prevHud?.querySelectorAll('[data-hud], .hud-index, .hud-topics, .hud-connected').forEach((el) => {
      el.style.opacity = '';
      el.style.transition = '';
      el.style.fontSize = '';
      el.style.transform = '';
    });
  }
  if (!clusterPose) clusterPose = captureCameraPose();
  preHudPose = clusterPose;
  currentStar = star;
  viewLevel = 3;
  updateClusterDimming();
  // Auto-warp: replaceState so hashchange does not re-enter openHUD without fromAuto
  // (that path called noteUserActivity and killed the tour after the first jump).
  if (fromAuto) {
    const url = `${location.pathname}${location.search}#${encodeURIComponent(star.id)}`;
    history.replaceState(null, '', url);
  } else {
    window.location.hash = star.id;
  }
  highlightConnectedEdges(star.project.id);
  // Plant morph clone + hide in-cloud label BEFORE the camera moves so the
  // original box cannot fly off-screen independently of the HUD title.
  plantOpenMorphClone(star);
  flyToStar(star);
  runHudOpenContinuity(star, { fromAuto });
  // Any open (click, Enter, ] next-node, warp) counts as visited for the warp tour.
  if (star.project?.id) {
    warpVisited.add(star.project.id);
    lastWarpedProjectId = star.project.id;
  }
  // User opened a node → arm the engaged (5 min) idle delay.
  if (!fromAuto) noteUserActivity();
}

function closeHUD({ restoreCamera = true } = {}) {
  const hud = document.getElementById('hud');
  if (!currentStar && !hud?.classList.contains('open')) {
    if (!restoreCamera) preHudPose = null;
    return;
  }
  exitMediaFocus();
  // Stop embeds immediately so audio does not continue through the close animation.
  stopHudVideos();
  const closingStar = currentStar;
  highlightConnectedEdges(null);
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  // Return to cluster view (L2), not overview
  viewLevel = focusTheme ? 2 : 1;
  updateClusterDimming();

  // Keep currentStar during reverse morph so label identity is available.
  // Camera return is started inside the title→label morph when possible so the
  // clone can track the live projected label (one box, no jump at the end).
  runHudCloseContinuity().then((result) => {
    currentStar = null;
    // Re-run dimming/title sync now that currentStar is cleared — otherwise the
    // title overlay stays at opacity 0 forever (see syncTitleOverlayVisibility).
    updateClusterDimming();
    findProjectLabelEl(closingStar?.project?.id)?.classList.remove('ms-label-hud-open');
    // Re-arm idle: L2 keeps the engaged delay; L1 overview returns to 30s.
    // Skip while auto-warp owns the camera/HUD (real input already called noteUserActivity).
    if (!autoMode) noteUserActivity();
    if (!restoreCamera) {
      preHudPose = null;
      return;
    }
    const pose = clusterPose || preHudPose;
    preHudPose = clusterPose;
    // Morph already started flyToPose when cameraHandled; only snap-path needs it here.
    if (!result?.cameraHandled && pose) flyToPose(pose);
  });
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

/**
 * Stable review order = the `stars` array (same index as NODE xxx / yyy).
 * delta +1 = next (]), -1 = previous ([); wraps at ends.
 */
function reviewNeighborStar(delta) {
  if (!stars.length) return null;
  let idx = currentStar ? stars.indexOf(currentStar) : -1;
  if (idx < 0) idx = delta > 0 ? -1 : 0;
  const next = (idx + delta + stars.length) % stars.length;
  return stars[next];
}

/** Open the previous/next node in NODE-counter order (stops video, title morph via openHUD). */
function goReviewStar(delta) {
  const target = reviewNeighborStar(delta);
  if (!target) return;
  if (isMediaFocus()) exitMediaFocus();
  openHUD(target);
}

/** Uniform random index in `[0, n)` via crypto when available (no fixed seed). */
function randomIndex(n) {
  if (n <= 0) return 0;
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % n;
  }
  return Math.floor(Math.random() * n);
}

/** Pick one entry uniformly at random from `pool` (empty → null). */
function pickRandomFrom(pool) {
  if (!pool.length) return null;
  return pool[randomIndex(pool.length)];
}

/**
 * Next idle-warp target. Uniform random among not-yet-visited project reps
 * (Math.random / crypto — not seeded, not a fixed order). No repeats until
 * every project has been seen; then clear the set, keep the current node
 * marked so the new round never starts on the node just visited.
 */
function pickWarpTarget() {
  const reps = projectStarRepresentatives();
  if (!reps.length) return null;
  const current = currentStar || reps.find((s) => s.project.id === lastWarpedProjectId) || null;
  const currentId = current?.project?.id || lastWarpedProjectId || null;

  const unvisited = reps.filter((s) => !warpVisited.has(s.project.id));
  if (unvisited.length) {
    return pickRandomFrom(unvisited);
  }

  // All projects visited — start a new pass, keep the current one marked.
  warpVisited.clear();
  if (currentId) warpVisited.add(currentId);
  const pool = reps.filter((s) => s.project.id !== currentId);
  return pickRandomFrom(pool) || reps[0];
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
  const total = prefersReducedMotion() ? warpIntervalMs() * 1.5 : warpIntervalMs();
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
  const interval = prefersReducedMotion() ? warpIntervalMs() * 1.5 : warpIntervalMs();
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
  // Never jump while full-screen media focus is open (paused or playing).
  // Embedded HUD videos must NOT stop the tour — warp inserts muted iframes and
  // used to treat them as "user watching", which armed IDLE_MS_ENGAGED and stalled.
  if (isMediaFocus()) {
    exitAutoMode();
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
  // Level 2 first, then level 3 item HUD (fromAuto: skip noteUserActivity)
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

/** Top-level overview: fully zoomed out, no cluster/HUD/node selected. */
function isOverviewIdleContext() {
  return viewLevel === 1 && !focusTheme && !currentStar && !isHudOpen() && !isMediaFocus();
}

function enterAutoMode() {
  if (autoMode || document.body.classList.contains('print-preview')) return;
  if (searchActive) return; // pause autopilot while searching
  // Full-screen media focus: auto-warp stays completely off.
  if (isMediaFocus()) return;
  autoMode = true;
  document.body.classList.add('auto-warp');
  warpVisited = new Set(currentStar ? [currentStar.project.id] : []);
  lastWarpedProjectId = currentStar?.project?.id || null;
  if (!currentStar) {
    // Reveal the warp counter immediately (stacks above the topic filter)
    // while the first jump flies; the post-jump path re-arms the timer.
    const interval = prefersReducedMotion() ? warpIntervalMs() * 1.5 : warpIntervalMs();
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

function idleDelayMs() {
  return isOverviewIdleContext() ? idleOverviewMs() : idleEngagedMs();
}

/**
 * Real user input only. Auto-warp navigation must not call this — it exits the
 * tour and arms the engaged (5 min) delay whenever a HUD/cluster is open.
 */
function noteUserActivity() {
  if (autoMode) exitAutoMode();
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = null;
  if (document.body.classList.contains('print-preview')) return;
  if (searchActive) return; // do not arm idle warp while the search HUD is open
  // Full-screen media focus: do not arm idle at all (warp fully disabled).
  if (isMediaFocus()) return;
  const delay = idleDelayMs();
  idleTimer = setTimeout(() => {
    if (searchActive) return;
    if (isMediaFocus()) return; // still in media focus — stay fully off
    enterAutoMode();
  }, delay);
}

/** Test/QA hooks — shorten timers without touching production defaults. */
window.__warpTiming = {
  get overviewMs() { return idleOverviewMs(); },
  get engagedMs() { return idleEngagedMs(); },
  get intervalMs() { return warpIntervalMs(); },
  setForTest({ overviewMs, engagedMs, intervalMs } = {}) {
    warpTimingOverrides = {
      overviewMs: overviewMs ?? IDLE_MS_OVERVIEW_DEFAULT,
      engagedMs: engagedMs ?? IDLE_MS_ENGAGED_DEFAULT,
      intervalMs: intervalMs ?? WARP_INTERVAL_MS_DEFAULT
    };
  },
  clearTest() {
    warpTimingOverrides = null;
  }
};

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
    const pickR = star.pickRadiusPx || STAR_PICK_RADIUS_PX;
    if (screenD > pickR) return;
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

/** Enter key: open the node whose projection is closest to the viewport center. */
function pickStarNearestScreenCenter() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = w * 0.5;
  const cy = h * 0.5;
  const ndc = new THREE.Vector3();
  let best = null;
  let bestScore = Infinity;
  const maxD = Math.min(w, h) * 0.48;

  stars.forEach((star) => {
    ndc.copy(star.position).project(camera);
    if (ndc.z > 1 || ndc.z < -1) return;
    const sx = (ndc.x * 0.5 + 0.5) * w;
    const sy = (-ndc.y * 0.5 + 0.5) * h;
    let score = Math.hypot(sx - cx, sy - cy);
    if (score > maxD) return;
    // Prefer the focused cluster when in L2.
    if (viewLevel === 2 && focusTheme && star.project?.theme !== focusTheme) score += maxD;
    if (score < bestScore) {
      bestScore = score;
      best = star;
    }
  });
  return best;
}

function zoomOutOneLevel() {
  // viewLevel is authoritative. closeHUD drops it to 2/1 immediately but keeps
  // currentStar (and often the .open class) until the title morph finishes —
  // so isHudOpen()/currentStar must not block the next Escape from leaving L2.
  if (viewLevel >= 3) {
    closeHUD();
    return;
  }
  if (viewLevel === 2) {
    clearClusterQueryParam();
    exitClusterView();
    return;
  }
  // L1 overview: already zoomed out — no-op.
}

function updateKeyboardNav(dt) {
  if (dt <= 0) return;
  const hudOpen = isHudOpen();

  if (hudOpen) {
    // Decelerate unused orbit/dolly velocities so release feels clean after close.
    keyNav.velRotX = dampVel(keyNav.velRotX, KEY_NAV.orbitDamp, dt);
    keyNav.velRotY = dampVel(keyNav.velRotY, KEY_NAV.orbitDamp, dt);
    keyNav.velZoom = dampVel(keyNav.velZoom, KEY_NAV.dollyDamp, dt);

    const below = document.querySelector('#hud .hud-below-inner');
    if (!below) return;
    const canScrollX = below.scrollWidth > below.clientWidth + 4;
    // Left/Right: horizontal when content overflows; otherwise same axis as Up/Down
    // (smooth vertical scroll — documented in the PR).
    let wantY = (keyNav.down ? 1 : 0) + (keyNav.up ? -1 : 0);
    let wantX = 0;
    if (canScrollX) {
      wantX = (keyNav.right ? 1 : 0) + (keyNav.left ? -1 : 0);
    } else {
      wantY += (keyNav.right ? 1 : 0) + (keyNav.left ? -1 : 0);
    }
    const yMax = canScrollX || !(keyNav.left || keyNav.right)
      ? KEY_NAV.hudScrollMax
      : KEY_NAV.hudPageMax;
    const yAccel = yMax === KEY_NAV.hudPageMax ? KEY_NAV.hudPageAccel : KEY_NAV.hudScrollAccel;
    if (wantY) keyNav.hudVelY = approachVel(keyNav.hudVelY, wantY * yMax, yAccel, dt);
    else keyNav.hudVelY = dampVel(keyNav.hudVelY, KEY_NAV.hudScrollDamp, dt);
    if (wantX) keyNav.hudVelX = approachVel(keyNav.hudVelX, wantX * KEY_NAV.hudScrollMax, KEY_NAV.hudScrollAccel, dt);
    else keyNav.hudVelX = dampVel(keyNav.hudVelX, KEY_NAV.hudScrollDamp, dt);

    if (keyNav.hudVelY) below.scrollTop += keyNav.hudVelY * dt;
    if (keyNav.hudVelX) below.scrollLeft += keyNav.hudVelX * dt;
    return;
  }

  keyNav.hudVelX = dampVel(keyNav.hudVelX, KEY_NAV.hudScrollDamp, dt);
  keyNav.hudVelY = dampVel(keyNav.hudVelY, KEY_NAV.hudScrollDamp, dt);

  if (isFlying || autoMode) {
    keyNav.velRotX = dampVel(keyNav.velRotX, KEY_NAV.orbitDamp, dt);
    keyNav.velRotY = dampVel(keyNav.velRotY, KEY_NAV.orbitDamp, dt);
    keyNav.velZoom = dampVel(keyNav.velZoom, KEY_NAV.dollyDamp, dt);
    return;
  }

  const wantX = (keyNav.down ? 1 : 0) + (keyNav.up ? -1 : 0);
  const wantY = (keyNav.right ? 1 : 0) + (keyNav.left ? -1 : 0);
  // Page Up = dolly in (smaller radius); Page Down = dolly out.
  const wantZ = (keyNav.pageDown ? 1 : 0) + (keyNav.pageUp ? -1 : 0);

  if (wantX) keyNav.velRotX = approachVel(keyNav.velRotX, wantX * KEY_NAV.orbitMax, KEY_NAV.orbitAccel, dt);
  else keyNav.velRotX = dampVel(keyNav.velRotX, KEY_NAV.orbitDamp, dt);
  if (wantY) keyNav.velRotY = approachVel(keyNav.velRotY, wantY * KEY_NAV.orbitMax, KEY_NAV.orbitAccel, dt);
  else keyNav.velRotY = dampVel(keyNav.velRotY, KEY_NAV.orbitDamp, dt);
  if (wantZ) keyNav.velZoom = approachVel(keyNav.velZoom, wantZ * KEY_NAV.dollyMax, KEY_NAV.dollyAccel, dt);
  else keyNav.velZoom = dampVel(keyNav.velZoom, KEY_NAV.dollyDamp, dt);

  if (keyNav.velRotX) {
    controls.targetRotationX = THREE.MathUtils.clamp(
      controls.targetRotationX + keyNav.velRotX * dt,
      -1.1,
      1.1
    );
  }
  if (keyNav.velRotY) controls.targetRotationY += keyNav.velRotY * dt;
  if (keyNav.velZoom) {
    const zMin = viewLevel >= 2 ? 36 : 120;
    const zMax = viewLevel >= 2 ? 240 : 520;
    controls.targetZoom = THREE.MathUtils.clamp(
      controls.targetZoom + keyNav.velZoom * dt,
      zMin,
      zMax
    );
    if (viewLevel === 2) refreshClusterPoseFromControls();
  }
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
    // L2: individual stars open the HUD (including stars from another cluster)
    if (viewLevel === 2) {
      const starHit = pickStarAt(e.clientX, e.clientY);
      if (starHit) {
        openHUD(starHit);
        return;
      }
      // Empty space / other cluster → back to overview, or switch cluster
      const other = pickThemeAt(e.clientX, e.clientY);
      if (other && other !== focusTheme) {
        enterClusterView(other);
        return;
      }
      clearClusterQueryParam();
      exitClusterView();
      return;
    }
    if (viewLevel >= 3 || currentStar) {
      closeHUD();
      return;
    }
  });

  const setArrowHeld = (key, pressed) => {
    if (key === 'ArrowLeft') keyNav.left = pressed;
    else if (key === 'ArrowRight') keyNav.right = pressed;
    else if (key === 'ArrowUp') keyNav.up = pressed;
    else if (key === 'ArrowDown') keyNav.down = pressed;
    else if (key === 'PageUp') keyNav.pageUp = pressed;
    else if (key === 'PageDown') keyNav.pageDown = pressed;
    else return false;
    return true;
  };

  window.addEventListener('keydown', (e) => {
    const blocked = isKeyboardNavBlocked(e.target);
    const inEditable = isEditableTarget(e.target);
    const inSearchInput = e.target?.id === 'search-input';
    const hudOpen = isHudOpen();
    const navKey = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Enter', 'Backspace', 'Escape'].includes(e.key);

    // [ / ] — sequential review of every NODE (stars[] order).
    // No Ctrl/Cmd-P/N handlers so browser print / new-window shortcuts work.
    if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === '[' || e.key === ']')) {
      if (inEditable || inSearchInput || blocked) return;
      e.preventDefault();
      noteUserActivity();
      goReviewStar(e.key === ']' ? 1 : -1);
      return;
    }

    if (e.key === 'Escape') {
      if (blocked && !searchActive && !hudOpen) return;
      noteUserActivity();
      closePrintStyleMenu();
      e.preventDefault();
      if (searchActive) {
        closeSearchHud();
        return;
      }
      // Media focus first; a second Esc (via zoomOutOneLevel) closes the HUD.
      if (isMediaFocus()) {
        exitMediaFocus();
        return;
      }
      // HUD open → close; else step out of cluster → overview.
      zoomOutOneLevel();
      return;
    }

    // Inputs / contenteditable: never navigate on Backspace (leave native editing alone).
    if ((inEditable || inSearchInput) && e.key === 'Backspace') return;

    // Type-to-search / search HUD open (even if the input is not focused): Backspace
    // only edits the query — never zoom-out, cluster exit, or HUD close.
    // Must run before the hudOpen branch, which otherwise steals Backspace.
    if (searchActive && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (e.key === 'Backspace') {
        e.preventDefault();
        noteUserActivity();
        const next = searchQuery.slice(0, -1);
        if (!next) closeSearchHud();
        else setSearchQuery(next);
        return;
      }
      if (e.key === 'Delete') {
        e.preventDefault();
        noteUserActivity();
        closeSearchHud();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        noteUserActivity();
        commitSearchBestMatch();
        return;
      }
    }

    if (blocked) return;

    if (hudOpen && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (setArrowHeld(e.key, true)) {
        e.preventDefault();
        noteUserActivity();
        return;
      }
      // Backspace / Enter close the panel (or leave media focus) — never zoomOutOneLevel.
      if (e.key === 'Enter' || e.key === 'Backspace') {
        e.preventDefault();
        noteUserActivity();
        // While media-focused, leave focus instead of closing the HUD.
        if (isMediaFocus()) {
          exitMediaFocus();
          return;
        }
        closeHUD();
        return;
      }
    }

    if (!inEditable && !inSearchInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Overview / cluster: Backspace / Delete step out one level (search handled above).
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        noteUserActivity();
        zoomOutOneLevel();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        noteUserActivity();
        const star = pickStarNearestScreenCenter();
        if (star) openHUD(star);
        return;
      }
      if (setArrowHeld(e.key, true)) {
        e.preventDefault();
        noteUserActivity();
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

    if (navKey && !inEditable && !inSearchInput) e.preventDefault();
    noteUserActivity();
  });

  window.addEventListener('keyup', (e) => {
    if (setArrowHeld(e.key, false)) e.preventDefault();
  });
  window.addEventListener('blur', () => clearKeyNavHeld());

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
    // Close button steps out of media focus before closing the HUD.
    if (isMediaFocus()) {
      exitMediaFocus();
      return;
    }
    closeHUD();
  });

  setupMediaFocusInteractions();

  // In-HUD markdown deep links (`#projectId` / `#projectId__0`) open that node
  // in the constellation HUD instead of only changing the URL bar.
  document.getElementById('hud')?.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[href^="#"]');
    if (!a || !document.getElementById('hud')?.contains(a)) return;
    const href = a.getAttribute('href') || '';
    if (!href.startsWith('#') || href === '#' || href === '#print') return;
    const id = decodeURIComponent(href.slice(1));
    const star = stars.find((s) => s.id === id) || firstStarForProject(id);
    if (!star) return;
    e.preventDefault();
    e.stopPropagation();
    noteUserActivity();
    openHUD(star);
  });

  setupTitlePrintMenu();
  setupTypeToSearch();
  noteUserActivity();
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.getElapsedTime();

  updateKeyboardNav(dt);
  // Title overlay tracks camera distance every frame (wheel, keys, flights, warp).
  syncTitleOverlayVisibility();

  // Apply orbit at L1–L3; idle auto-spin only in overview. Never fight fly tweens.
  if (!isFlying && !autoMode) {
    const keyOrbiting = keyNav.left || keyNav.right || keyNav.up || keyNav.down
      || Math.abs(keyNav.velRotX) > 1e-4 || Math.abs(keyNav.velRotY) > 1e-4;
    if (viewLevel === 1 && !controls.mouseDown && !keyOrbiting && !isHudOpen()) {
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

function applyPrintStyle(styleId, { persist = true, updateUrl = false } = {}) {
  const style = getPrintStyle(styleId);
  activePrintStyleId = style.id;
  if (persist) {
    try { localStorage.setItem(PRINT_STYLE_STORAGE_KEY, style.id); } catch { /* ignore */ }
  }
  // Only rewrite the URL in print mode. Constellation boot must not inject
  // print=1/style or strip entry deep-link hashes needed by ?cluster= / #id.
  if (updateUrl) {
    const params = new URLSearchParams(location.search);
    if (!params.has('print')) params.set('print', '1');
    params.set('style', style.id);
    const next = `${location.pathname}?${params.toString()}${location.hash || ''}`;
    const cur = `${location.pathname}${location.search}${location.hash || ''}`;
    if (cur !== next) history.replaceState(null, '', next);
  }
  const printView = document.getElementById('print-view');
  // Use cached print model (populated by generatePrintView); do not reference init's local contentData
  const model = { ...ensurePrintModel(), showPhoto: resolveShowPhoto(style) };
  printView.dataset.printStyle = style.id;
  printView.dataset.photo = model.showPhoto ? '1' : '0';
  printView.innerHTML = renderPrintStyleControls() + style.render(model);
  printView.querySelectorAll('[data-print-style]').forEach((btn) => {
    btn.addEventListener('click', () => applyPrintStyle(btn.dataset.printStyle, { updateUrl: true }));
  });
  // Bake SVG header backgrounds to PNG so Chromium PDF matches the web print view.
  printDecorReady = (async () => {
    await document.fonts.ready.catch(() => {});
    // Layout must settle so getBoundingClientRect matches A4 print width.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await rasterizePrintDecor(printView);
  })();
}

function generatePrintView(data) {
  ensurePrintModel(data);
  const params = new URLSearchParams(location.search);
  let stored = null;
  try { stored = localStorage.getItem(PRINT_STYLE_STORAGE_KEY); } catch { /* ignore */ }
  activePrintStyleId = resolvePrintStyleId({ urlStyle: params.get('style'), stored });
  const inPrint = params.get('print') === '1' || location.hash === '#print';
  applyPrintStyle(activePrintStyleId, { persist: true, updateUrl: inPrint });

  if (inPrint) {
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
  // Belt-and-suspenders: never let constellation deep links become in-page
  // hash scrolls on the print document (that reads as a "zoom" of the page).
  document.getElementById('print-view')?.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[href]');
    if (!a || a.target === '_blank') return;
    let url;
    try { url = new URL(a.getAttribute('href') || '', location.href); } catch { return; }
    const path = url.pathname.replace(/\/+$/, '');
    if (!path.endsWith('/cv')) return;
    const deep = url.searchParams.has('topic') || url.searchParams.has('cluster')
      || (url.hash && url.hash !== '#print');
    if (!deep) return;
    e.preventDefault();
    window.open(url.href, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('loading')?.classList.add('hidden');
}

function entryStarFromHash() {
  const raw = window.location.hash.slice(1);
  if (!raw || raw === 'print') return null;
  const id = decodeURIComponent(raw);
  return stars.find((s) => s.id === id) || firstStarForProject(id) || null;
}

function applyDeepLinkFromUrl({ pushUrl = false } = {}) {
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic');
  const cluster = params.get('cluster');
  setActiveTopic(topic, { pushUrl });
  // Per-entry deep link (`#hpvm`) wins over `?cluster=` on load.
  if (entryStarFromHash()) {
    clearClusterQueryParam();
    return;
  }
  if (cluster && CLUSTER_BY_SLUG[cluster]) {
    const theme = CLUSTER_BY_SLUG[cluster];
    // Defer until stars/labels exist; mark as deep-link so ?cluster= stays until user navigates
    setTimeout(() => enterClusterView(theme, { fromDeepLink: true }), 120);
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

  // Orbitron load expands theme mini-HUD boxes — refit so long names stay on-screen.
  const refit = () => {
    if (viewLevel === 1 && !currentStar && !isFlying) fitOverviewToClusters();
  };
  if (document.fonts?.ready) {
    document.fonts.ready.then(refit).catch(() => {});
  }
  setTimeout(refit, 400);

  function openFromHash({ delayMs = 0 } = {}) {
    const star = entryStarFromHash();
    if (!star) return false;
    // Already showing this node (warp/openHUD just set the hash) — do not re-open
    // as a user navigation (that would arm IDLE_MS_ENGAGED and stop auto-warp).
    if (
      currentStar
      && (currentStar.id === star.id || currentStar.project?.id === star.project?.id)
    ) {
      return true;
    }
    // Entry deep links clear sticky cluster focus.
    clearClusterQueryParam();
    const go = () => openHUD(star, { fromAuto: autoMode });
    if (delayMs > 0) setTimeout(go, delayMs);
    else go();
    return true;
  }
  // Initial deep link (print PDFs use `#<projectId>`); brief delay lets the first frame settle.
  openFromHash({ delayMs: 500 });
  window.addEventListener('hashchange', () => {
    if (!isPrintMode()) openFromHash({ delayMs: 0 });
  });

  animate();
}

init().catch((err) => {
  console.error(err);
  const msg = (err && err.message) ? String(err.message).slice(0, 180) : 'Unknown error';
  document.getElementById('loading').innerHTML =
    `<p>Failed to load. Please refresh.</p><p style="opacity:.65;font-size:12px;margin-top:8px">${msg}</p>`;
});
