import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function resolveBuildId() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return String(Date.now());
  }
}

const BUILD_ID = resolveBuildId();

function writeBuildMeta() {
  const meta = {
    buildId: BUILD_ID,
    builtAt: new Date().toISOString()
  };
  const out = path.resolve('public/build-meta.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(meta, null, 2));
  return meta;
}

writeBuildMeta();

export default defineConfig({
  base: '/cv/',
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  plugins: [
    {
      name: 'cv-index-cache-headers',
      transformIndexHtml(html) {
        const tags = [
          '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />',
          `<meta name="cv-build-id" content="${BUILD_ID}" />`
        ].join('\n  ');
        return html.replace('<head>', `<head>\n  ${tags}`);
      }
    },
    viteStaticCopy({
      targets: [
        {
          // Copy the folder itself into dist/content (avoid dist/content/content)
          src: 'content',
          dest: '.'
        }
      ]
    })
  ]
});
