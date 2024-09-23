// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://judinefiddler.com',
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport",
    },
    integrations: [mdx(), sitemap(), icon({
        include: {
            uil: ["instagram-alt", "twitter-alt", "facebook"],
          },
    })],
    image: {
        domains: ["res.cloudinary.com"],
        service: passthroughImageService()
    },
    experimental: {
        contentLayer: true,
    },
    output: "static",
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                  api: 'modern-compiler', // or "modern", "legacy"
                  importers: [
                    // ...
                  ],
                },
              },
        }
    }
});