import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { 
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    ignores: [
      'venv/',
      '**/site-packages/**'
    ]
  },
];
