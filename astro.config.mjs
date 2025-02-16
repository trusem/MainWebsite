// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    responsiveImages: true,
  },

  adapter: node({
    mode: 'standalone',
  }),
});