import addClasses from 'rehype-add-classes'
import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    sitemap(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    tailwind()
  ],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-4xl font-bold font-silkScreen text-expresso-200',
          h2: 'text-2xl font-bold font-silkScreen text-expresso-300',
          h3: 'text-xl font-bold font-mplus',
          h4: 'text-lg font-bold font-mplus',
          h5: 'font-bold font-mplus',
          h6: 'font-mplus',
          img: 'border border-expresso-300 rounded-xl mb-6',
          p: 'mb-6',
          a: 'underline underline-offset-2 text-expresso-300 hover:text-expresso-200',
          ul:'list-disc list-inside pl-2',
          ol:'list-decimal list-inside pl-2',
          blockquote:'italic flex justify-end',
          table:'border-2 border-collapse my-2',
          th:'border-2 p-2 text-lg',
          td:'border-2 text-center p-2',    
        }
      ]
    ]
  }
})

