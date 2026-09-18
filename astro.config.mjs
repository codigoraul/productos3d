// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://productos3d.cl',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // URLs cortas que siguen funcionando; la canónica es /merchandising-corporativo
  redirects: { '/empresa': '/merchandising-corporativo', '/regalos-corporativos': '/merchandising-corporativo' },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
