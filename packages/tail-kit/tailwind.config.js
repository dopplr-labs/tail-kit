module.exports = {
  presets: [require('../../tailwind.config')],
  purge: ['./src/**/*.tsx', './src/**/*.ts', './src/styles/safelist.txt'],
  theme: {
    extend: {
      fontFamily: {
        default: 'var(--font-family)',
      },
      colors: {
        primary: 'var(--primary-color)',
        error: 'var(--error-color)',
        disabled: 'var(--disabled-color)',
        text: {
          primary: 'var(--text-primary-color)',
          inverse: 'var(--text-inverse-color)',
        },
      },
      borderRadius: {
        default: 'var(--border-radius-default)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
