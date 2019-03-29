const config = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
}

/**
 * Get the ESLint configuration object
 */
export function getEslintConfig(): typeof config {
  return config
}
