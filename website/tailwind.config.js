const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  presets: [require('../tailwind.config')],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  purge: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
}
