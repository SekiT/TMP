import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import wyw from '@wyw-in-js/rollup';
import alias from './alias.mjs';
import minifyTemplate from './minifyTemplate.mjs';

const commonPlugins = [
  resolve(),
  alias('index'),
  wyw({ sourceMap: !process.env.PRODUCTION }),
  css({ output: 'styles.css' }),
];

const envDependentPlugins = process.env.PRODUCTION ? [
  esbuild({ minify: true }),
  minifyTemplate(),
] : [
  serve({ contentBase: 'build', open: true }),
  livereload(),
];

export default {
  input: 'index.js',
  plugins: [...commonPlugins, ...envDependentPlugins],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
  },
};
