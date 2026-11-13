import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { marked } from 'marked';
import matter from 'gray-matter';

// ============================================================================
// Configuration
// ============================================================================

// Color palette inspired by the rainbow dots in Christophe's logo
const THEME_COLORS = {
  'Languages & Compilers': 0x4488ff,   // Blue
  'Systems & Virtualization': 0xff4444, // Red
  'Games & 3D': 0x44ff44,              // Green
  'Physics': 0xffaa00,                 // Orange
  'Art & Culture': 0xff44ff,           // Magenta
  'Tools & Apps': 0x00ddff             // Cyan
};

const THEME_POSITIONS = {
  'Languages & Compilers': { x: -150, y: 50, z: 0 },
  'Systems & Virtualization': { x: 150, y: 50, z: 0 },
  'Games & 3D': { x: 0, y: -100, z: -100 },
  'Physics': { x: -100, y: 100, z: 100 },
  'Art & Culture': { x: 100, y: -50, z: 100 },
  'Tools & Apps': { x: 0, y: 50, z: -150 }
};

// ============================================================================
// State
// ============================================================================

let camera, scene, renderer, cssRenderer, composer;
let stars = [];
let starData = [];
let currentCard = null;
let isOverview = false;
let controls = {
  mouseDown: false,
  mouseX: 0,
  mouseY: 0,
  targetRotationX: 0,
  targetRotationY: 0,
  currentRotationX: 0,
  currentRotationY: 0,
  targetZoom: 300,
  currentZoom: 300
};

// ============================================================================
// Content Loading
// ============================================================================

async function loadContent() {
  const contentFiles = [
    'intro.md',
    'db48x.md',
    'xl-tao3d.md',
    'hpcpp.md',
    'hpvm.md',
    'kata-containers.md',
    'spice.md',
    'dxo-one.md',
    'ecutest.md',
    'taodyne.md',
    'alpha-waves.md',
    'hp48-games.md',
    'recorder.md',
    'make-it-quick.md',
    'emacs-aqua.md',
    'physics-books.md',
    'informagie.md',
    '3divart.md'
  ];

  const loadedContent = [];

  for (const file of contentFiles) {
    try {
      const response = await fetch(`/cv/content/${file}`);
      const text = await response.text();
      const { data, content } = matter(text);
      
      loadedContent.push({
        ...data,
        content: marked(content)
      });
    } catch (error) {
      console.warn(`Failed to load ${file}:`, error);
    }
  }

  return loadedContent;
}

// ============================================================================
// Scene Setup
// ============================================================================

function initScene() {
  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 300;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);

  // WebGL Renderer for stars
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // CSS3D Renderer for cards
  cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = '0';
  cssRenderer.domElement.style.pointerEvents = 'none';
  document.getElementById('ui-overlay').appendChild(cssRenderer.domElement);

  // Post-processing bloom
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // strength
    0.4, // radius
    0.85 // threshold
  );
  composer.addPass(bloomPass);

  // Ambient background particles
  createBackgroundStars();
}

function createBackgroundStars() {
  // Create rainbow-colored particles inspired by the logo's radiating dots
  const colors = [0xff4444, 0xff8800, 0xffff00, 0x44ff44, 0x4488ff, 0x8844ff, 0xff44ff];
  
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const vertexColors = [];
  
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    vertices.push(x, y, z);
    
    // Assign rainbow colors
    const color = new THREE.Color(colors[i % colors.length]);
    vertexColors.push(color.r, color.g, color.b);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(vertexColors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.4
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

// ============================================================================
// Star Creation
// ============================================================================

function createStars(data) {
  starData = data;

  data.forEach((item, index) => {
    const theme = item.theme || 'Tools & Apps';
    const color = THEME_COLORS[theme] || 0xffffff;
    const weight = item.weight || 5;
    const size = 2 + (weight / 10) * 8; // 2-10 based on weight

    // Position based on theme cluster
    const themePos = THEME_POSITIONS[theme] || { x: 0, y: 0, z: 0 };
    const spread = 40;
    const position = new THREE.Vector3(
      themePos.x + (Math.random() - 0.5) * spread,
      themePos.y + (Math.random() - 0.5) * spread,
      themePos.z + (Math.random() - 0.5) * spread
    );

    // Create glow effect with multiple spheres
    const glowGroup = new THREE.Group();
    
    // Core star
    const coreGeometry = new THREE.SphereGeometry(size, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    glowGroup.add(core);

    // Glow halo
    const haloGeometry = new THREE.SphereGeometry(size * 1.5, 16, 16);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    glowGroup.add(halo);

    glowGroup.position.copy(position);
    scene.add(glowGroup);

    stars.push({
      mesh: glowGroup,
      data: item,
      position: position,
      color: color,
      size: size,
      index: index
    });
  });

  // Create connection lines between related stars
  createConnections();
}

function createConnections() {
  stars.forEach(star => {
    if (star.data.related) {
      star.data.related.forEach(relatedId => {
        const relatedStar = stars.find(s => s.data.id === relatedId);
        if (relatedStar) {
          const points = [star.position, relatedStar.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      });
    }
  });
}

// ============================================================================
// Card System
// ============================================================================

function createCard(star) {
  if (currentCard) {
    closeCard();
  }

  const data = star.data;
  
  // Create card element
  const cardElement = document.createElement('div');
  cardElement.className = 'star-card';
  
  // Special treatment for intro card - include the logo
  let logoHtml = '';
  if (data.id === 'intro') {
    logoHtml = '<img src="/cv/logo.png" alt="Christophe de Dinechin" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block;">';
  }
  
  let html = `
    <button class="close-button" onclick="window.closeCard()">×</button>
    ${logoHtml}
    <h2>${data.title}</h2>
    <div class="meta">
      ${data.theme ? `<span class="theme-badge">${data.theme}</span>` : ''}
      ${data.years ? `<span class="years">${data.years}</span>` : ''}
    </div>
    <div class="content">
      ${data.content}
    </div>
  `;

  // Add videos
  if (data.videos && data.videos.length > 0) {
    data.videos.forEach(videoId => {
      html += `
        <div class="video-container">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    });
  }

  // Add external links
  if (data.links && data.links.length > 0) {
    html += '<div class="links">';
    data.links.forEach(link => {
      html += `<a href="${link.url}" target="_blank" rel="noopener" class="link-button">${link.label}</a>`;
    });
    html += '</div>';
  }

  cardElement.innerHTML = html;

  // Create CSS3D object
  const cssObject = new CSS3DObject(cardElement);
  
  // Position card near the star
  const offset = new THREE.Vector3(0, 0, 50);
  cssObject.position.copy(star.position).add(offset);
  
  scene.add(cssObject);

  currentCard = {
    element: cardElement,
    cssObject: cssObject,
    star: star
  };

  // Animate camera to star
  animateCameraToStar(star);

  // Update URL hash
  window.location.hash = data.id;
}

function closeCard() {
  if (currentCard) {
    scene.remove(currentCard.cssObject);
    currentCard = null;
    window.location.hash = '';
  }
}

// Make closeCard available globally for the close button
window.closeCard = closeCard;

// ============================================================================
// Camera Animation
// ============================================================================

function animateCameraToStar(star) {
  const targetPosition = star.position.clone().add(new THREE.Vector3(0, 20, 80));
  const startPosition = camera.position.clone();
  const duration = 1000;
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    camera.position.lerpVectors(startPosition, targetPosition, eased);
    camera.lookAt(star.position);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function enterOverviewMode() {
  isOverview = true;
  closeCard();
  
  const targetPosition = new THREE.Vector3(0, 100, 400);
  const startPosition = camera.position.clone();
  const duration = 1000;
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    camera.position.lerpVectors(startPosition, targetPosition, eased);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// ============================================================================
// Interaction
// ============================================================================

function setupInteraction() {
  const container = document.getElementById('canvas-container');
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Mouse/touch events
  container.addEventListener('mousedown', onPointerDown);
  container.addEventListener('mousemove', onPointerMove);
  container.addEventListener('mouseup', onPointerUp);
  container.addEventListener('touchstart', onTouchStart, { passive: false });
  container.addEventListener('touchmove', onTouchMove, { passive: false });
  container.addEventListener('touchend', onPointerUp);
  container.addEventListener('wheel', onWheel, { passive: false });
  container.addEventListener('click', onClick);

  // Keyboard events
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCard();
    } else if (e.key === 'o' || e.key === 'O') {
      enterOverviewMode();
    }
  });

  function onPointerDown(e) {
    controls.mouseDown = true;
    controls.mouseX = e.clientX;
    controls.mouseY = e.clientY;
  }

  function onPointerMove(e) {
    if (controls.mouseDown && !currentCard) {
      const deltaX = e.clientX - controls.mouseX;
      const deltaY = e.clientY - controls.mouseY;
      
      controls.targetRotationY += deltaX * 0.005;
      controls.targetRotationX += deltaY * 0.005;
      
      controls.mouseX = e.clientX;
      controls.mouseY = e.clientY;
    }
  }

  function onPointerUp() {
    controls.mouseDown = false;
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      controls.mouseDown = true;
      controls.mouseX = e.touches[0].clientX;
      controls.mouseY = e.touches[0].clientY;
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1 && controls.mouseDown && !currentCard) {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - controls.mouseX;
      const deltaY = e.touches[0].clientY - controls.mouseY;
      
      controls.targetRotationY += deltaX * 0.005;
      controls.targetRotationX += deltaY * 0.005;
      
      controls.mouseX = e.touches[0].clientX;
      controls.mouseY = e.touches[0].clientY;
    }
  }

  function onWheel(e) {
    e.preventDefault();
    controls.targetZoom += e.deltaY * 0.1;
    controls.targetZoom = Math.max(100, Math.min(controls.targetZoom, 600));
  }

  function onClick(e) {
    if (controls.mouseDown) return; // Was dragging

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersectObjects = stars.map(s => s.mesh);
    const intersects = raycaster.intersectObjects(intersectObjects, true);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object.parent || intersects[0].object;
      const star = stars.find(s => s.mesh === clickedMesh);
      if (star) {
        createCard(star);
      }
    }
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================================================
// Animation Loop
// ============================================================================

function animate() {
  requestAnimationFrame(animate);

  // Smooth rotation
  if (!currentCard) {
    controls.currentRotationX += (controls.targetRotationX - controls.currentRotationX) * 0.05;
    controls.currentRotationY += (controls.targetRotationY - controls.currentRotationY) * 0.05;
    
    const rotationGroup = new THREE.Group();
    scene.children.forEach(child => rotationGroup.add(child.clone()));
    
    // Apply rotation around center
    camera.position.x = Math.sin(controls.currentRotationY) * controls.currentZoom;
    camera.position.z = Math.cos(controls.currentRotationY) * controls.currentZoom;
    camera.position.y = Math.sin(controls.currentRotationX) * 50;
  }

  // Smooth zoom
  controls.currentZoom += (controls.targetZoom - controls.currentZoom) * 0.05;

  // Look at center
  if (!currentCard) {
    camera.lookAt(0, 0, 0);
  }

  // Render
  composer.render();
  cssRenderer.render(scene, camera);
}

// ============================================================================
// Print View
// ============================================================================

function generatePrintView(data) {
  const printView = document.getElementById('print-view');
  
  let html = '<h1>Christophe de Dinechin</h1>';
  html += '<p class="subtitle">Software as a Passion</p>';

  // Group by theme
  const themes = {};
  data.forEach(item => {
    const theme = item.theme || 'Other';
    if (!themes[theme]) themes[theme] = [];
    themes[theme].push(item);
  });

  // Sort by weight and take top 5 per theme
  Object.keys(themes).forEach(theme => {
    themes[theme].sort((a, b) => (b.weight || 0) - (a.weight || 0));
    themes[theme] = themes[theme].slice(0, 5);
  });

  // Render themes
  Object.keys(themes).forEach(theme => {
    html += `<div class="theme-section">`;
    html += `<h2>${theme}</h2>`;
    
    themes[theme].forEach(item => {
      html += `<div class="project">`;
      html += `<h3>${item.title}</h3>`;
      if (item.years) html += `<div class="years">${item.years}</div>`;
      
      // Extract first paragraph from content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.content;
      const firstP = tempDiv.querySelector('p');
      if (firstP) {
        html += `<p>${firstP.textContent.substring(0, 200)}...</p>`;
      }
      
      html += `</div>`;
    });
    
    html += `</div>`;
  });

  html += `<div class="qr-section">`;
  html += `<img src="/cv/logo.png" alt="Christophe de Dinechin">`;
  html += `<div class="qr-text">`;
  html += `<p><strong>Christophe de Dinechin</strong></p>`;
  html += `<p>View the interactive 3D version at:</p>`;
  html += `<p><strong>https://c3d.github.io/cv/</strong></p>`;
  html += `</div>`;
  html += `</div>`;

  printView.innerHTML = html;
}

// ============================================================================
// Initialization
// ============================================================================

async function init() {
  console.log('Initializing 3D CV...');
  
  initScene();
  
  const data = await loadContent();
  console.log(`Loaded ${data.length} projects`);
  
  createStars(data);
  setupInteraction();
  generatePrintView(data);
  
  // Hide loading screen
  document.getElementById('loading').classList.add('hidden');
  
  // Check for deep link
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const star = stars.find(s => s.data.id === id);
    if (star) {
      setTimeout(() => createCard(star), 500);
    }
  }
  
  animate();
}

// Start the app
init().catch(error => {
  console.error('Failed to initialize:', error);
  document.getElementById('loading').innerHTML = '<p>Failed to load. Please refresh.</p>';
});
