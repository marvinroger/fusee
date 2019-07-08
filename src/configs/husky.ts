const config = {
  hooks: {
    'pre-commit': 'fusee run lint-staged',
    'commit-msg': 'fusee run commitlint -- -E HUSKY_GIT_PARAMS',
  },
}

/**
 * Get the Husky configuration object
 */
export function getHuskyConfig(): typeof config {
  return config
}
