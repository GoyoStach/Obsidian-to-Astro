// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// 2. Define your collection(s)
const blogPost = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string().optional(),
      tags: z.array(z.string()),
      heroImage: image()
    })
})

const phraseData = defineCollection({
  type: 'data',
  schema: () =>
    z.array(
      z.object({
        label: z.string(),
        value: z.string().optional()
      })
    )
})

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blogPost: blogPost,
  phraseData: phraseData
}
