module.exports = {
  extends: 'eslint-config-airbnb-base',
  env: {
    browser: true,
  },
  rules: {
    // We should allow hyperHTML.bind at index.js
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],

    // We use bitwise operators in this project
    'no-bitwise': ['error', { allow: ['&', '|', '>>', '<<'] }],

    // Defining constructor function requires { Name: function() { ... }}
    'object-shorthand': ['error', 'properties'],
    'func-names': ['error', 'as-needed'],

    // We use devDependencies in rollup-config, which is not included in eslint-config-airbnb-base
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['test/**', 'rollup-config/**'],
      optionalDependencies: false,
    }],

    // We need sopmething like eslint-plugin-resolve-rollup to resolve aliases...
    'import/no-unresolved': ['error', {
      ignore: ['^dependencies$', '^lib/', '^subject/', '^view/', '^phase/'],
    }],
  },
}
