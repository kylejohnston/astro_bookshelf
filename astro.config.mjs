import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

export default defineConfig({
  build: {
    format: "file",
  },

  site: 'https://books.kyleio.com/',
  integrations: [pagefind()],

  vite: {
    plugins: [tailwindcss()],
  },
});