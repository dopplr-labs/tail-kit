import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'
import ignoreImport from 'rollup-plugin-ignore-import'
import { uglify } from 'rollup-plugin-uglify'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: './src/index.ts',

  output: {
    dir: 'dist',
    format: 'cjs',
    compact: true,
  },

  plugins: [
    peerDepsExternal(),

    uglify(),

    commonjs(),

    // allow absolute imports
    includePaths({
      include: {},
      paths: ['src'],
      external: [],
      extensions: ['.ts', '.tsx'],
    }),

    typescript(),

    ignoreImport({
      // Ignore all .css file imports while building the bundle
      extensions: ['.css'],
      // Optional: replace body for ignored files. Default value is "export default undefined;"
      body: 'export default undefined;',
    }),

    nodeResolve(),
  ],
}
