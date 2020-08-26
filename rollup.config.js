import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import includePaths from 'rollup-plugin-includepaths'

export default {
  input: 'src/index.js',

  output: {
    dir: 'dist',
    format: 'cjs',
  },

  external: ['react'],

  plugins: [
    // allow absolute imports
    includePaths({
      include: {},
      paths: ['src'],
      external: [],
      extensions: ['.ts', '.tsx'],
    }),

    typescript(),

    postcss({
      plugins: [
        require('tailwindcss')(require('./tailwind.config')),
        require('autoprefixer'),
        require('cssnano'),
      ],
    }),

    nodeResolve(),
  ],
}
