const defaultConfig = require('tailwindcss/defaultConfig')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/styles/safelist.txt'],
    // Safelist actually works from safelist.txt file
    // The below section is just for referrance which classes are in safelist file
    options: {
      safelist: [
        /text-[red,green,yellow,blue]+-[400,700]+/,
        /bg-[red,green,yellow,blue]+-50/,
        /lg:col-span-[0-9]+/,
        /lg:col-start-[0-9]+/,
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

  variants: {
    borderColor: [...defaultConfig.variants.borderColor, 'group-hover'],
    opacity: [...defaultConfig.variants.opacity, 'group-hover'],
    boxShadow: [...defaultConfig.variants.boxShadow, 'focus-within'],
  },

  plugins: [],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
