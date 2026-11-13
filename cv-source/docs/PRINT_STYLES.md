# Print styles

The printable CV (`/cv/?print=1`) is rendered from a **shared collapsed data model** by pluggable **style modules**.

## Layout

```
cv-source/src/print/
  model.js          # buildPrintModel(data) — facts only from content
  icons.js          # shared space line-icons + tech tags
  registry.js       # PRINT_STYLES list + resolvePrintStyleId()
  print-styles.css  # CSS for every style (classic / nebula / orbit)
  styles/
    classic.js
    nebula.js
    orbit.js
```

## Selecting a style

- URL: `/cv/?print=1&style=orbit`
- On-screen segmented control (hidden when printing)
- Preference remembered in `localStorage` key `c3d-cv-print-style`
- Long-press / right-click the 3D title for HTML + PDF links

## PDFs

Build generates A4 PDFs when Puppeteer/Chrome is available:

```bash
cd cv-source
npm run build          # vite → dist/
npm run generate-pdfs  # dist/pdf/{nebula,orbit,classic}.pdf
```

CI runs the same after build and deploys to `/cv/pdf/`. If a headless browser is unavailable, the step is skipped and previously committed PDFs (if any) remain; prefer CI-built artifacts.

## Adding a style

1. Create `src/print/styles/<id>.js` exporting `{ id, label, description, render(model) }`.
2. Register it in `src/print/registry.js` (`PRINT_STYLES` array).
3. Add CSS under a `.pv-<id>` root in `print-styles.css`.
4. Keep content to facts from `buildPrintModel` — no invented bio fields.
5. Re-run `npm run build && npm run generate-pdfs` and check one A4 page.
