import { defineCollection, z } from 'astro:content';

const blogLikeSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  pubDate: z.date(),
  updated: z.date().optional(),
  category: z.string(), // ← not enum to avoid breaking on typo
  cover: z.string().optional(),
  summary: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  internal_links: z.array(z.string()).optional(),
  external_links: z.array(z.string()).optional(),
  media_files: z.array(z.string()).optional(),
  reading_time: z.string().optional(),
  word_count: z.string().optional(),
  draft: z.boolean().optional(),
  layout: z.string().optional(),
  canonical_url: z.string().optional(),
  tags: z.array(z.string()).optional()
});

const blogCollection = defineCollection({ schema: blogLikeSchema });
const modulesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    code: z.string(),
    category: z.enum([
      'Core', 'AI', 'Communication', 'Payment', 'Content',
      'Video', 'Authentication', 'Performance', 'Admin'
    ]),
    subcategory: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    price: z.string().optional(),
    pubDate: z.date(),
    draft: z.boolean().optional(),
    cover: z.string().optional(),
    icons: z.array(z.string()).optional()
  })
});

export const collections = {
  blog: blogCollection,
  'case-study': blogCollection,
  company: blogCollection,
  press: blogCollection,
  external: blogCollection,
  modules: modulesCollection
};
