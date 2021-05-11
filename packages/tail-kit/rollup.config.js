import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'
import ignoreImport from 'rollup-plugin-ignore-import'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { visualizer } from 'rollup-plugin-visualizer'

export default (command) => {
  return {
    input: './src/index.ts',

    output: {
      dir: 'dist',
      format: 'cjs',
      compact: true,
    },

    plugins: [
      peerDepsExternal(),

      terser(),

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

      command.visualize ? visualizer() : undefined,
    ].filter(Boolean),
  }
}
