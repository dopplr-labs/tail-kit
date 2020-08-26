const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindUI = require('@tailwindcss/ui')

module.exports = {
  purge: ['./src/**/*.tsx'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {},

  plugins: [tailwindUI],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
