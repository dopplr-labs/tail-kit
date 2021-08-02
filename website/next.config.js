const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: async () => [
    {
      source: '/:id',
      // Allow search engines to index the page
      headers: [{ key: 'x-robots-tag', value: 'all' }],
    },
  ],
})
