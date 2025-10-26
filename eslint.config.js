const { fixupConfigRules } = require('@eslint/compat')
const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const { defineConfig, globalIgnores } = require('eslint/config')
const prettier = require('eslint-plugin-prettier')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends('next/core-web-vitals', 'prettier', 'plugin:import/recommended', 'plugin:import/typescript')
    ),

    plugins: {
      prettier,
    },

    rules: {
      semi: ['error', 'never'],
      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '~/lib/*',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '~/interfaces/*',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '~/modules/*',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '~/components/*',
              group: 'internal',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          named: true,
        },
      ],
      'import/namespace': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Usage of relative parent imports is not allowed.',
            },
          ],
        },
      ],
    },

    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  globalIgnores([
    '**/node_modules',
    '**/nativewind-env.d.ts',
    '**/*.config.(js|ts)',
    '**/*.md',
    '**/*.json',
    '**/*.css',
    '**/ui/**',
  ]),
])
