const config = {
  '*.{ts,tsx,js,jsx}': 'dev-core lint',
}

/**
 * Get the lint-staged configuration object
 */
export function getLintStagedConfig(): typeof config {
  return config
}
