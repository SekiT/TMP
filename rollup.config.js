import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

export default {
  input: 'index.js',
  plugins: [
    resolve(),
    ...[
      process.env.MINIFY ? [
        terser(),
      ] : [
        serve(),
      ],
    ],
  ],
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
};
