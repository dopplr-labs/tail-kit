module.exports = {
  mode: 'jit',
  purge: {
    // Safelist actually works from safelist.txt file
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/styles/safelist.txt'],
  },

  theme: {
    extend: {
      fontFamily: {
        default: 'var(--font-family)',
      },
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',
        disabled: 'var(--disabled-color)',
        primary: 'var(--primary-color)',
        info: 'var(--info-color)',
        success: 'var(--success-color)',
        error: 'var(--error-color)',
        'text-primary': 'var(--text-primary-color)',
        'text-secondary': 'var(--text-secondary-color)',
        'text-inverse': 'var(--text-color-inverse)',
      },
      borderRadius: {
        default: 'var(--border-radius-default)',
        small: 'var(--border-radius-small)',
      },
    },
  },

  plugins: [],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
