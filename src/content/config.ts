// Import utilities from `astro:content`
import { z, defineCollection, reference } from "astro:content";

// Define a `type` and `schema` for each collection
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    caption: z.string(),
    date: z.date(),
    relatedPosts: z.array(reference('news')).optional(),
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  news,
};