/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: "vue3",
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-multi-spaces": ["error"],
    "vue/no-multiple-template-root": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off"
  }
}
