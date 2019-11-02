/* eslint import/no-extraneous-dependencies: 0 */
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import alias from './alias';

export default {
  input: 'test/**/*.js',
  plugins: [
    multiEntry(),
    resolve(),
    alias,
  ],
  output: { format: 'cjs' },
  external: ['tape'],
};
