import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const commonPlugins = [
  resolve(),
];

const envDependentPlugins = process.env.PRODUCTION ? [
  terser(),
] : [
  serve(),
  livereload(),
];

export default {
  input: 'index.js',
  plugins: [...commonPlugins, ...envDependentPlugins],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
};
