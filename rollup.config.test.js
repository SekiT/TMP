import multiEntry from 'rollup-plugin-multi-entry';
import replace from '@rollup/plugin-replace';

export default {
  input: 'test/**/*.js',
  plugins: [
    multiEntry(),
    replace({ 'process.env.TEST': true }),
  ],
  output: { format: 'cjs' },
  external: ['tape'],
};
