const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  presets: [require('../tailwind.config')],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      },
      size: {
        '8xl': '90rem',
      },
    },
  },
  purge: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
}
