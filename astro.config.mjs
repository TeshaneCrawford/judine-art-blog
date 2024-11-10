// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  site: 'https://judinefiddler.com',

  integrations: [tailwind(), sitemap(), icon()],

  image: {
    domains: ["res.cloudinary.com"],
    service: imageService({
      placeholder: "blurhash",
    }),
},
output: "server",
});