import { z, defineCollection, reference } from "astro:content";

const plugins = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    info: z.string(),
    url: z.string(),
    icon: z.string(),
    sort_order: z.number(),
  })
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    caption: z.string(),
    date: z.date(),
    relatedPosts: z.array(reference('news')).optional(),
  })
});

const help = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    sort_order: z.number(),
  })
});

const buildings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    caption: z.string(),
    author: z.string(),
    world: z.string(),
    date: z.date(),
    cordoarias: z.object({
      x: z.number(),
      y: z.number(),
      z: z.number(),
    }).optional(),
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  plugins,
  news,
  help,
  buildings
};