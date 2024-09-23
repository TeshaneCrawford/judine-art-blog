import { defineCollection, z } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const assets = defineCollection({
	type: 'content_layer',
	loader: cldAssetsLoader({
		limit: 2,
		folder: 'NewYork'
	  })
  })

export const collections = { blog, assets };
