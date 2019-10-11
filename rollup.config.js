import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

const commonPlugins = [
  resolve(),
];

const envDependentPlugins = process.env.MINIFY ? [
  terser(),
] : [
  serve(),
];

export default {
  input: 'index.js',
  plugins: [...commonPlugins, ...envDependentPlugins],
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
};
