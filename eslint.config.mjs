import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { configs as airbnbConfigs, plugins, rules } from 'eslint-config-airbnb-extended';
import globals from 'globals';

const gitignorePath = path.resolve('.', '.gitignore');

// Formatting is delegated to dprint, so strip all @stylistic/* rules
// that airbnb-extended's recommended configs would otherwise enable.
const stripStylisticRules = (configs) =>
  configs.map((config) => {
    if (!config.rules) return config;
    const filteredRules = Object.fromEntries(
      Object.entries(config.rules).filter(([key]) => !key.startsWith('@stylistic/')),
    );
    return { ...config, rules: filteredRules };
  });

const jsConfig = [
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  {
    ...plugins.importX,
    settings: {
      'import-x/resolver': {
        alias: [
          ['@', './'],
          ['dependencies', './dependencies'],
        ],
      },
    },
  },
  ...airbnbConfigs.base.recommended,
  rules.base.importsStrict,
];

const nodeConfig = [
  plugins.node,
  ...airbnbConfigs.node.recommended,
];

export default [
  includeIgnoreFile(gitignorePath),
  ...stripStylisticRules(jsConfig),
  ...stripStylisticRules(nodeConfig),
  {
    name: 'project/settings',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // We use bitwise operators in this project
      'no-bitwise': ['error', { allow: ['&', '|', '>>', '<<'] }],

      // We should allow hyperHTML.bind at index.js
      'no-unused-expressions': ['error', { allowTaggedTemplates: true }],

      // Defining constructor function requires { Name: function() { ... } }
      'object-shorthand': ['error', 'properties'],
      'func-names': ['error', 'as-needed'],

      // Allow missing extensions including for alias imports
      'import-x/extensions': ['error', 'ignorePackages', {
        js: 'never',
        '': 'never', // Allow extensionless imports (for aliases)
      }],

      // Disable no-unresolved for alias patterns until resolver is properly configured
      'import-x/no-unresolved': ['error', {
        ignore: ['^@/', '^dependencies$'],
      }],

      // Allow anonymous default exports
      'import-x/no-anonymous-default-export': 'off',
    },
  },
  {
    // Allow devDependencies in rollup-config and test directories
    name: 'project/dev-files',
    files: ['rollup-config/**/*', 'test/**/*'],
    rules: {
      'import-x/no-extraneous-dependencies': ['error', {
        devDependencies: true,
        optionalDependencies: false,
      }],
    },
  },
  {
    // Config files need .mjs extensions in their imports
    name: 'project/config-files',
    files: ['rollup-config/**/*'],
    rules: {
      'import-x/extensions': ['error', 'ignorePackages', {
        mjs: 'always',
      }],
    },
  },
];
