module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#2a9d8f",
          "base-100": "#FFFFFF",
          "info": "#C1C1E6",
          "success": "#2a9d8f",
        }
      }
    ],
  },
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`
  ],
}