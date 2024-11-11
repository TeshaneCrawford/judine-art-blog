// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { imageService } from "@unpic/astro/service";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://judinefiddler.com',

  integrations: [tailwind(), sitemap(), icon({
    include: {
      uil: ["instagram-alt", "twitter-alt", "facebook"],
    },
  })],

  image: {
    domains: ["res.cloudinary.com"],
    service: imageService({
      placeholder: "blurhash",
    }),
},

  output: "server",
  adapter: vercel(),
});