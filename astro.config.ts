import { defineConfig } from 'astro/config';
import { site } from './src/config';

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
