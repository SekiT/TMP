import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'test/**/*.js',
  plugins: [multiEntry()],
  output: { format: 'cjs' },
  external: ['tape'],
};
