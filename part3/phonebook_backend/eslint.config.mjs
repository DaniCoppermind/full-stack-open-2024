import globals from 'globals'
import eslintRecommended from 'eslint/conf/eslint-recommended'
import pluginReactRecommended from 'eslint-plugin-react/configs/recommended'
import pluginJsxA11yRecommended from 'eslint-plugin-jsx-a11y/configs/recommended'
import pluginPrettierRecommended from 'eslint-plugin-prettier/configs/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintRecommended,
  ...pluginReactRecommended,
  ...pluginJsxA11yRecommended,
  ...pluginPrettierRecommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    plugins: ['react', 'jsx-a11y', 'prettier'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'warn',
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
]
