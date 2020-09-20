const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: (config) => {
    config.module.rules = config.module.rules.filter(
      (rule) => rule.test.toString() !== '/\\.css$/',
    )

    config.resolve.alias = {
      components: path.resolve(__dirname, '../src/components'),
      hooks: path.resolve(__dirname, '../src/hooks'),
      styles: path.resolve(__dirname, '../src/styles'),
    }

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('tailwindcss')(require('../tailwind.config')),
              require('autoprefixer'),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })

    return config
  },
}
