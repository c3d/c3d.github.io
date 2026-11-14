# Christophe de Dinechin - 3D CV Constellation

An interactive 3D visualization of Christophe de Dinechin's career as a constellation of glowing stars. Each star represents a project, grouped into thematic nebulae spanning languages & compilers, systems & virtualization, games & 3D, physics, art & culture, and tools & apps.

## Concept

The CV is presented as a "constellation of a career" - a dark, deep 3D mindscape where:

- **Stars** represent individual projects, their brightness determined by importance (weight 1-10)
- **Nebulae** group related projects by theme, each with a distinct color from the rainbow palette
- **Connection lines** show project lineages and relationships
- **Rainbow particles** fill the space, inspired by the radiating rays of Christophe's lightbulb logo
- **Floating cards** appear in 3D space when you click a star, with full content including text, images, and embedded YouTube videos

## Technology Stack

- **Three.js** - WebGL rendering for the 3D constellation
- **CSS3DRenderer** - DOM elements (cards, videos, images) placed in 3D space
- **Post-processing** - UnrealBloomPass for glowing star effects
- **Vite** - Modern build system
- **Marked** - Markdown parsing
- **Gray-matter** - YAML front matter parsing

## Content System

Each project is a Markdown file in `content/` with YAML front matter:

```markdown
---
id: project-id
title: Project Title
theme: Languages & Compilers
years: 2020-Present
weight: 9
related: [other-project-id]
videos:
  - YouTube-video-ID
links:
  - label: GitHub
    url: https://github.com/...
---

## Markdown content here

Your project description in Markdown format.
```

### Front Matter Fields

- **id** (required): Unique identifier, used for deep linking and relationships
- **title** (required): Display name
- **theme** (required): One of:
  - `Languages & Compilers`
  - `Systems & Virtualization`
  - `Games & 3D`
  - `Research`
  - `Tools & Apps`
  - `Communication Skills`
- **years**: Time period (e.g., "2020-Present", "1989-1990")
- **weight**: Importance 1-10, affects star size and prominence
- **related**: Array of related project IDs for connection lines
- **videos**: Array of YouTube video IDs for embedding
- **links**: Array of external links with `label` and `url`

## Features

### 3D Navigation

- **Click** a star to open its detailed card
- **Drag** to orbit around the constellation
- **Scroll** to zoom in/out
- **O key** - Enter overview mode (camera pulls back)
- **ESC key** - Close the current card
- **Touch** - Full mobile support with touch orbit and tap

### Deep Linking

Each project has a URL hash: `https://c3d.github.io/cv/#project-id`

Share direct links to specific projects. The camera will automatically fly to that star on load.

### Video Embedding

YouTube videos play directly in the 3D floating cards using real iframe embeds via CSS3DRenderer.

### Print View

A print-optimized layout showing the top 5 projects per theme, suitable for a one-page CV. Access via print dialog or print stylesheet.

Includes the lightbulb logo and a link to the interactive version.

### Mobile Support

- Touch orbit controls
- Tap to open cards
- Responsive card sizing
- Automatic quality reduction on weaker devices
- Works on high-end phones in both portrait and landscape

### Visual Design

The rainbow color palette and particle system are inspired by Christophe's personal logo - a smiling lightbulb with radiating rainbow-colored dots. The logo appears:

- As the favicon
- On the loading screen (animated pulse)
- In the intro card
- On the print view next to contact info

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
cd cv
npm install
```

### Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173/cv/`

### Production Build

```bash
npm run build
```

Builds to `../cv/` (the parent directory, which is served by GitHub Pages at `/cv/` path).

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

This repository uses GitHub Pages to serve the site. The `/cv/` directory at the repository root contains the built static files.

### Manual Deployment

1. Build the project:
   ```bash
   cd cv
   npm run build
   ```

2. The built files are output to `/workspace/cv/` (parent of the source directory)

3. Commit and push:
   ```bash
   git add ../cv/
   git commit -m "Build CV constellation"
   git push
   ```

### GitHub Actions (Alternative)

A GitHub Actions workflow can automate the build:

```yaml
name: Build and Deploy CV

on:
  push:
    branches: [master]
    paths:
      - 'cv/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd cv && npm ci && npm run build
      - run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add cv/
          git commit -m "Deploy CV constellation" || exit 0
          git push
```

## Adding a New Project

1. Create a new Markdown file in `content/`, e.g., `my-project.md`

2. Add front matter and content:
   ```markdown
   ---
   id: my-project
   title: My Amazing Project
   theme: Tools & Apps
   years: 2024
   weight: 7
   related: [other-project]
   videos:
     - dQw4w9WgXcQ
   links:
     - label: GitHub
       url: https://github.com/user/repo
   ---

   ## Description

   This project does amazing things!
   ```

3. Rebuild: `npm run build`

4. The new star will appear in the constellation automatically

## Project Structure

```
cv/
├── content/           # Markdown files for each project
│   ├── intro.md
│   ├── db48x.md
│   ├── xl-tao3d.md
│   └── ...
├── public/            # Static assets
│   └── logo.png       # Christophe's lightbulb logo
├── src/
│   └── main.js        # Main Three.js application
├── index.html         # Entry point
├── package.json       # Dependencies
├── vite.config.js     # Build configuration
└── README.md          # This file
```

## Browser Compatibility

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari 14+, Chrome Android 90+
- **WebGL 2**: Required for post-processing effects
- **Fallback**: Degrades gracefully on older devices

## Performance

- **Bloom post-processing**: Can be disabled on low-end devices
- **Particle count**: Automatically reduced on mobile
- **60 FPS target**: Achieved on mid-range devices and up

## Credits

**Design & Development**: Built for Christophe de Dinechin  
**Visual Concept**: "Constellation of a career" mindscape  
**Logo**: Christophe de Dinechin's lightbulb with rainbow rays  
**Technology**: Three.js, Vite, modern web standards

## License

Content © Christophe de Dinechin. Code available under MIT license.


## Print styles

The printable CV supports multiple pluggable layouts (`nebula`, `orbit`, `classic`).

- Open `/cv/?print=1&style=orbit` (or use the on-screen style toggle)
- Long-press / right-click the 3D title for HTML views and PDF downloads
- See [docs/PRINT_STYLES.md](docs/PRINT_STYLES.md) for how to add a style
- A4 PDFs are generated at build time into `/cv/pdf/<style>.pdf` when Chromium is available

