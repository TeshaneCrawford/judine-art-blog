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
      lora: ['Lora', 'serif'],
      suranna: ['Suranna', 'serif'],
      sans: ['system-ui', 'sans-serif']
    }
  },
  plugins: [],
}
