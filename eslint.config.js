import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier'; // Import Prettier config

export default tseslint.config(
  {
    // Global ignores
    ignores: ['dist', 'node_modules', '.yarn', '.vscode-test'],
  },
  // Base JS/React configuration (applied to JS/JSX files)
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Add node globals if needed
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // TypeScript configuration (applied to TS/TSX files)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended, // Recommended TS rules
      ...tseslint.configs.stylistic, // Stylistic TS rules (optional)
    ],
    languageOptions: {
      parserOptions: {
        project: true, // Use tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Apply React Hooks rules to TS/TSX files as well
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Example: Disable a specific TS rule if needed
      // '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Prettier configuration (MUST be the last one)
  // Disables rules that conflict with Prettier
  prettierConfig,
);
