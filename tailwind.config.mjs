const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      }
    },
    fontFamily: {
      // sans: 'DM Sans',
      // serif: 'Lora'
    }
  },
  plugins: [],
}
