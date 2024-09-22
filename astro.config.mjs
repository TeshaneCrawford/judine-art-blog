// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	image: {
		domains: ["res.cloudinary.com"],
		service: passthroughImageService()
	},
	experimental: {
		contentLayer: true,
	}
});
