const config = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}

/**
 * Get the Prettier configuration object
 */
export function getPrettierConfig(): typeof config {
  return config
}
