import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import includePaths from 'rollup-plugin-includepaths'

export default {
  input: './src/index.ts',

  output: {
    dir: 'dist',
    format: 'cjs',
  },

  external: ['react'],

  plugins: [
    commonjs(),

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
