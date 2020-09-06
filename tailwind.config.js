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

  variants: [
    'responsive',
    'group-hover',
    'group-focus',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],

  plugins: [tailwindUI],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
