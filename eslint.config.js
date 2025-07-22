// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import i from 'eslint-plugin-import';
import reactRefresh from 'eslint-plugin-react-refresh';
import parser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import playwright from 'eslint-plugin-playwright'; // Import the Playwright plugin

export default tseslint.config(
  { ignores: ['dist', 'test-results'] },
  {
    // Configuration for your main application files
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: i,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-empty-pattern': 2,
      'import/no-useless-path-segments': 2,
      'import/export': 2,
      'import/no-extraneous-dependencies': 2,
      'import/no-unused-modules': 2,
      'import/no-amd': 2,
      'import/no-commonjs': 2,
      'import/first': 2,
      'import/exports-last': 0,
      'import/no-duplicates': 2,
      'import/no-namespace': 0,
      'import/order': 2,
      'import/newline-after-import': 2,
      'import/prefer-default-export': 0,
    },
  },
  {
    // NEW CONFIGURATION FOR PLAYWRIGHT TEST FILES
    files: ['**/*.spec.ts', '**/*.test.ts'], // Target common Playwright test file patterns
    extends: [
      playwright.configs['recommended'], // Use Playwright's recommended config
      // You might also want to extend tseslint.configs.recommended here
      // if you want TypeScript rules applied specifically to test files.
      // ...tseslint.configs.recommended,
    ],
    rules: {
      // You can override or add specific Playwright-related rules here if needed
      // For example, to enforce async/await in tests:
      // 'playwright/no-skipped-test': 'warn',
    },
  },
);