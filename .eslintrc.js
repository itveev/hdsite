// http://eslint.org/docs/user-guide/configuring
require('@babel/register');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 9,
    sourceType: 'module',
    // ecmaVersion: 6,
  },
  env: {
    browser: true,
    node:true,
    es6:true,
    jest: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:jest/recommended', "plugin:cypress/recommended"],
  // required to lint *.vue files
  plugins: [
    'vue',
    'jest',
    'cypress',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'no-unused-expressions': ['error', { "allowTernary": true }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': ['error', { 'props' : false }],
    'linebreak-style': 'off',
    // 'no-param-reassign': ['error', {
    //   props: true,
    //   ignorePropertyModificationsFor: [
    //     'state', // for vuex state
    //     'acc', // for reduce accumulators
    //     'e' // for e.returnvalue
    //   ]
    // }],
  }
}
