const config = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
}

function getEslintConfig() {
  return config
}

module.exports = {
  getEslintConfig,
}
