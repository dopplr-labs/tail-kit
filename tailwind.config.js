const defaultConfig = require('tailwindcss/defaultConfig')
const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindForm = require('@tailwindcss/forms')
const tailwindTypography = require('@tailwindcss/typography')
const tailwindAspectRatio = require('@tailwindcss/aspect-ratio')
const { range } = require('lodash')

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
        ...range(6).map((val) => `lg:col-span-${val + 1}`),
        ...range(6).map((val) => `lg:col-start-${val + 1}`),
      ],
    },
  },

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        0.5: '0.125rem',
      },
    },
  },

  variants: {
    borderColor: [...defaultConfig.variants.borderColor, 'group-hover'],
    opacity: [...defaultConfig.variants.opacity, 'group-hover'],
    boxShadow: [...defaultConfig.variants.boxShadow, 'focus-within'],
  },

  plugins: [tailwindForm, tailwindTypography, tailwindAspectRatio],
}
