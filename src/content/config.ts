// 1. Import utilities from `astro:content`
// import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)

// defineCollection({
//   schema: z.object({
//   })
// })

// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define a schema for each collection you'd like to validate.
const book = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    coverImage: z.string(),
    startDate: z.string().transform((str) => new Date(str)).optional(),
    finishDate: z.string().transform((str) => new Date(str)),
    added: z.string().transform((str) => new Date(str)),
    currentlyReading: z.boolean().optional(),
    notes: z.boolean().optional(),
    library: z.string().optional(),
    bookshop: z.string().optional(),
    amazon: z.string().optional(),
}),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'book': book,
};



// export const collections = {
// 	 book: defineCollection({
// 		schema: z.object({
// 			title: z.string(),
//       author: z.string(),
//       currentlyReading: z.boolean().optional(),
//       // startDate: z.string().transform((str) => new Date(str)).optional(),
//       finishDate: z.string().transform((str) => new Date(str)),
//       added: z.string().transform((str) => new Date(str)),
//       notes: z.boolean().optional(),
//       coverImage: z.string(),
//       library: z.string().optional(),
//       bookshop: z.string().optional(),
//       amazon: z.string().optional(),
// 		}),
// 	}),
// };
