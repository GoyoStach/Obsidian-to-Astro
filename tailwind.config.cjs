/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    'astro.config.mjs'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mplus: ["'M PLUS Rounded 1c'", 'Verdana', 'sans-serif'],
        silkScreen: ["'Silkscreen'", 'Verdana', 'sans-serif'],
        oswald: ["'Oswald'", 'Verdana', 'sans-serif']
      },
      colors: {
        expresso: {
          100: '#DCD7C9',
          200: '#DEA057',
          300: '#A27B5C',
          400: '#3F4E4F',
          500: '#2C3639'
        }
      }
    }
  },
  plugins: []
}
