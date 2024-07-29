const COMMON_RULES = {
  camelcase: 'off',
  'prefer-const': 'warn',
  'no-unused-vars': 'warn',
  semi: ['error', 'always'],
  'comma-dangle': ['error', 'only-multiline'],
};

module.exports = {
  root: true,
  extends: ['@mpxjs/eslint-config-ts'],
  rules: {
    // .mpx文件规则 https://mpx-ecology.github.io/eslint-plugin-mpx/rules/
    'mpx/script-indent': ['error', 2, { baseIndent: 1 }],
  },
  overrides: [
    {
      files: ['*.mpx'],
      rules: {
        indent: 'off',
        ...COMMON_RULES,
      },
    },
    {
      files: ['**/*.ts'],
      rules: {
        // .ts文件规则 https://typescript-eslint.io/rules/
        ...COMMON_RULES,
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
      },
    },
    {
      files: ['**/*.js'],
      rules: {
        // .js文件规则 https://eslint.bootcss.com/docs/rules/
        ...COMMON_RULES,
        'no-extra-semi': 'error',
      },
    },
  ],
};
