/* eslint import/no-extraneous-dependencies: 0 */
import alias from '@rollup/plugin-alias';

const path = require('path');

const cwd = process.cwd();

export default alias({
  entries: {
    lib: path.join(cwd, 'lib'),
    subject: path.join(cwd, 'subject'),
    view: path.join(cwd, 'view'),
    dependencies: path.join(cwd, 'dependencies', process.env.TEST ? 'test' : 'index'),
  },
});
