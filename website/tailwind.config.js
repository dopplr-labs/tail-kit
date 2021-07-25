module.exports = {
  presets: [require('../tailwind.config')],
  purge: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
}
