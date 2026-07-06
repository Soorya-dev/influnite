import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '**/*.json', '**/*.jsonc'], // More explicit patterns
  },

  js.configs.recommended,

  // Spread TS recommended configs for better type-aware linting
  ...tseslint.configs.recommended,

  // JS/TS files (broaden if you have .js too)
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Keep for custom rules
      prettier: prettierPlugin,
    },
    rules: {
      /**
       * IMPORTANT: disable base rule
       */
      'no-unused-vars': 'off',

      /**
       * Use TS rule instead (with your ignore patterns)
       */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      /**
       * Allow temporary any (warn instead of error for leniency)
       */
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * Backend friendly
       */
      'no-console': 'off',

      /**
       * Prettier integration
       */
      'prettier/prettier': 'warn',

      // Optional: A few more TS-friendly rules
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },

  // Optional: For JSON/JSONC files (if you lint package.json, etc.)
  {
    files: ['**/*.json', '**/*.jsonc'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
