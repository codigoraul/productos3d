// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://productos3d.cl',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
