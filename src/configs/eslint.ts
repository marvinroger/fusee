const config = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],

  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}

/**
 * Get the ESLint configuration object
 */
export function getEslintConfig(): typeof config {
  return config
}
