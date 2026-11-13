import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/cv/',
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
    viteStaticCopy({
      targets: [
        {
          src: 'content/*.md',
          dest: 'content'
        }
      ]
    })
  ]
});
