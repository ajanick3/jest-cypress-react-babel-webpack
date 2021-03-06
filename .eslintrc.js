const path = require('path')

module.exports = {
  extends: [
    'kentcdodds',
    'kentcdodds/import',
    'kentcdodds/jest',
    'kentcdodds/react',
    'plugins:cypress/recommended',
  ],
  overrides: [
    {
      files: ['**/src/**'],
      settings: {'import/resolver': 'webpack'},
      rules: {
        'import/no-unassigned-import': ['warn', {allow: ['**/*.css']}],
      },
    },
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
}
