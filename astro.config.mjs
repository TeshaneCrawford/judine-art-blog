// @ts-check
// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://judinefiddler.com',
  prefetch: {
      prefetchAll: true,
      defaultStrategy: "viewport",
  },
  integrations: [tailwind(), sitemap(), icon()],
  image: {
    domains: ["res.cloudinary.com"],
    service: passthroughImageService()
},
// output: "static",
});