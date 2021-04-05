module.exports = {
  plugins: [
    require('tailwindcss')(require('./tailwind.config')),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
