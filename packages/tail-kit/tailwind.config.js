const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    // Safelist actually works from safelist.txt file
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/styles/safelist.txt'],
  },

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
