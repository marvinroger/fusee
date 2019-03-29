const config = {
  linters: {
    '*.{ts,tsx,js,jsx}': ['dev-core lint', 'git add'],
  },
}

/**
 * Get the lint-staged configuration object
 */
export function getLintStagedConfig(): typeof config {
  return config
}
