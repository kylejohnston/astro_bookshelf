import { defineConfig } from 'astro/config';
// import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
export default defineConfig({
  site: 'https://bookshelf.kylewjohnston.com',
  integrations: [tailwind(), mdx()],
});
