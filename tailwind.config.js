const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
