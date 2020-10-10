const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindUI = require('@tailwindcss/ui')

module.exports = {
  purge: {
    content: ['./src/**/*.tsx', './src/**/*.ts'],

    // These options are passed through directly to PurgeCSS
    // so add all the classes that could be computed using the `baseColor`
    options: {
      whitelist: [
        'text-red-400',
        'text-green-400',
        'text-yellow-400',
        'text-blue-400',
        'text-red-700',
        'text-green-700',
        'text-yellow-700',
        'text-blue-700',
        'bg-red-50',
        'bg-green-50',
        'bg-yellow-50',
        'bg-blue-50',
      ],
    },
  },

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [tailwindUI],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
