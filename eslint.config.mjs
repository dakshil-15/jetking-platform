import next from 'eslint-config-next';

/**
 * eslint-config-next v16 ships a native flat-config array, so it is spread
 * directly. The FlatCompat bridge is not used — it breaks on this version.
 */
const eslintConfig = [
  ...next,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'scripts/**'],
  },
  {
    // Scoped to match `next/typescript`, which is where the @typescript-eslint
    // plugin is registered. An unscoped block fails on .mjs config files.
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default eslintConfig;
