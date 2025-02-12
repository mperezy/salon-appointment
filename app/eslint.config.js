import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'src/graphql-generated'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],

      'max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
        },
      ],

      'no-console': 'error',

      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: true,
        },
      ],

      'eol-last': ['error', 'always'],
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
    },
  }
);
