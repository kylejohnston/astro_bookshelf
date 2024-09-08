import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';

export default defineConfig({
  build: {
    format: "file",
  },
  site: 'https://books.kyleio.com/',
  integrations: [tailwind(), pagefind()],
});