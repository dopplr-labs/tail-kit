module.exports = {
  presets: [require('../../tailwind.config')],
  purge: ['./src/**/*.tsx', './src/**/*.ts', './src/styles/safelist.txt'],
}
