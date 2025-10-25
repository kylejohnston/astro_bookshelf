// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define the book collection using the Content Layer API
const book = defineCollection({
  type: 'content',
  // loader: glob({ pattern: '**/*.md', base: './src/content/book' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    coverImage: z.string(), // Just the filename, e.g., "aurora.webp"
    startDate: z.coerce.date().optional(),
    finishDate: z.coerce.date().optional(),
    added: z.coerce.date(),
    currentlyReading: z.boolean().optional(),
    favorite: z.boolean().optional(),
    notes: z.boolean().optional(),
    library: z.string().optional(),
    bookshop: z.string().optional(),
    amazon: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = { book };
