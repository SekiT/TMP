import alias from '@rollup/plugin-alias';

const path = require('path');

const cwd = process.cwd();

export default (dependenciesFileName) => alias({
  entries: {
    lib: path.join(cwd, 'lib'),
    subject: path.join(cwd, 'subject'),
    view: path.join(cwd, 'view'),
    phase: path.join(cwd, 'phase'),
    dependencies: path.join(cwd, 'dependencies', dependenciesFileName),
  },
});
