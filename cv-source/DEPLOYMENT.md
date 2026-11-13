# Deployment Guide

## How It Works

The 3D CV constellation is built as a static site that can be deployed to GitHub Pages.

### Directory Structure

```
/workspace/
├── cv-source/          # Source code (not served)
│   ├── content/        # Markdown files for projects
│   ├── src/            # JavaScript source
│   ├── public/         # Static assets (logo, etc.)
│   └── ...
└── cv/                 # Built output (served by GitHub Pages)
    ├── index.html
    ├── assets/         # Bundled JS/CSS
    ├── content/        # Copied markdown files
    └── logo.png
```

## Local Development

### Prerequisites

- Node.js 18 or later
- npm

### Setup

```bash
cd cv-source
npm install
```

### Development Server

```bash
npm run dev
```

This starts a development server at `http://localhost:5173/cv/` with hot module replacement.

### Building

```bash
npm run build
```

This builds the production-ready site to `cv-source/dist/`. You then need to copy it to the `cv/` directory:

```bash
cd /workspace
rm -rf cv/*
cp -r cv-source/dist/* cv/
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Manual Deployment

1. Build the project:
   ```bash
   cd cv-source
   npm run build
   ```

2. Copy to deployment location:
   ```bash
   cd /workspace
   rm -rf cv/*
   cp -r cv-source/dist/* cv/
   ```

3. Commit and push:
   ```bash
   git add cv/
   git commit -m "Deploy CV constellation"
   git push
   ```

### Automated Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow at `.github/workflows/build-cv.yml` that automatically:

1. Builds the site when changes are pushed to `cv-source/`
2. Copies the built files to `cv/`
3. Commits and pushes the changes

The workflow runs on pushes to `master` branch when files in `cv-source/` change.

## GitHub Pages Configuration

This site is served from the `master` branch at the `/cv/` path:

- **URL**: https://c3d.github.io/cv/
- **Source**: `master` branch, `/cv/` directory
- **Base path**: `/cv/` (configured in `vite.config.js`)

### Verifying Deployment

After pushing, check:

1. **GitHub Actions**: Go to the Actions tab to see if the build succeeded
2. **GitHub Pages**: Settings → Pages to verify the site is published
3. **Live Site**: Visit https://c3d.github.io/cv/ (may take a few minutes)

## Updating Content

To add or modify projects:

1. Edit or create Markdown files in `cv-source/content/`
2. Follow the YAML front matter format (see README.md)
3. Build and deploy using the steps above

The constellation will automatically include the new/modified projects.

## Troubleshooting

### Build Fails

- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for syntax errors in Markdown files

### Site Not Updating

- Verify GitHub Actions completed successfully
- Clear browser cache (Ctrl/Cmd + Shift + R)
- Check GitHub Pages settings are correct
- Wait a few minutes for GitHub Pages to rebuild

### Video Embeds Not Working

- Verify YouTube video IDs are correct (11 characters)
- Check browser console for errors
- Test in different browsers

### Mobile Issues

- Test with browser DevTools mobile viewport
- Verify viewport meta tag is present
- Check for console errors on mobile device
