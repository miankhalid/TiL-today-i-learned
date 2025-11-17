// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const ERROR = 2;
const OFF = 0;

// We no longer use tseslint.config()
export default [
  // 1. Base configs (Recommended, not 'all')
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Unpack the array
  ...tseslint.configs.stylisticTypeChecked, // Unpack the array
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  importPlugin.flatConfigs.react,
  importPlugin.flatConfigs['react-native'],
  importPlugin.flatConfigs.typescript,
  reactRefresh.configs.recommended,
  testingLibrary.configs['flat/react'],
  perfectionist.configs['recommended-alphabetical'],

  // 2. Prettier (MUST be last to override styling)
  eslintConfigPrettier,

  // 3. Main Configuration Object
  {
    languageOptions: {
      globals: {
        __DEV__: 'readonly',
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // Define ONLY plugins NOT provided by a spread config above.
      'react-hooks': reactHooks,
      'unicorn': unicorn,
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
      perfectionist: {
        partitionByComment: true,
        type: 'alphabetical',
      },
      react: {
        version: 'detect',
      },
    },
  },

  // 4. Custom Rule Overrides
  {
    rules: {
      // --- React & React Hooks ---
      ...reactHooks.configs.recommended.rules, // Add react-hooks rules
      'react-refresh/only-export-components': OFF,
      'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', '.jsx'] }],
      'react/jsx-sort-props': OFF, // Handled by perfectionist
      'react/require-default-props': [
        ERROR,
        { forbidDefaultForRequired: true, functions: 'defaultArguments' },
      ],

      // --- TypeScript ---
      '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
      '@typescript-eslint/no-floating-promises': ERROR,
      '@typescript-eslint/no-unused-vars': [
        ERROR,
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],

      // --- General Code Quality ---
      'no-console': [ERROR, { allow: ['warn', 'error'] }],
      'no-magic-numbers': [
        ERROR,
        { ignore: [-1, 0, 1, 2, 3, 4, 5, 6], ignoreArrayIndexes: true },
      ],

      // --- Import & Sorting (Your perfectionist config) ---
      'import/no-unresolved': OFF,
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            value: {
              components: '@/components(/.+)?',
              hooks: '@/hooks(/.+)?',
              navigation: '@/navigation(/.+)?',
              screens: '@/screens(/.+)?',
              services: '@/services(/.+)?',
              test: '@/test(/.+)?',
              theme: '@/theme(/.+)?',
              translations: '@/translations(/.+)?',
              utils: '@/utils(/.+)?',
            },
          },
          groups: [
            'side-effect',
            ['type', 'internal-type'],
            ['builtin', 'external'],
            ['theme', 'hooks', 'navigation', 'translations', 'services', 'utils'],
            ['components', 'screens'],
            ['test'],
            'internal',
            'unknown',
          ],
          newlinesBetween: 'always',
          type: 'alphabetical',
        },
      ],

      // --- Unicorn ---
      'unicorn/filename-case': OFF,
      'unicorn/no-keyword-prefix': OFF,
      'unicorn/no-useless-undefined': OFF,
      'unicorn/prefer-top-level-await': OFF, // Not valid in RN
      'unicorn/prevent-abbreviations': [
        ERROR,
        {
          allowList: {
            env: true,
            Param: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },

  // 5. File-Specific Overrides (Globs)
  {
    files: ['**/theme/*.ts'],
    rules: {
      'no-magic-numbers': OFF,
    },
  },
  {
    files: ['*.conf.js', '*.config.js', '*.setup.js'],
    rules: {
      '@typescript-eslint/no-require-imports': OFF,
      '@typescript-eslint/no-unsafe-assignment': OFF,
      '@typescript-eslint/no-unsafe-call': OFF,
      'no-undef': OFF,
      'unicorn/prefer-module': OFF,
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': OFF,
      '@typescript-eslint/no-unsafe-assignment': OFF,
      '@typescript-eslint/no-unsafe-call': OFF,
      '@typescript-eslint/no-unsafe-member-access': OFF,
    },
  },
  {
    // Apply Jest rules ONLY to test files
    files: ['**/*.spec.{js,ts,jsx,tsx}', '**/*.test.{js,ts,jsx,tsx}'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
    },
  },
  {
    ignores: ['plugins/**', 'sample/**'],
  },
];