const config = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}

function getPrettierConfig() {
  return config
}

module.exports = {
  getPrettierConfig,
}
