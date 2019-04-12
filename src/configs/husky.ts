const config = {
  hooks: {
    'pre-commit': 'dev-core run lint-staged',
    'commit-msg': 'dev-core run commitlint -- -E HUSKY_GIT_PARAMS',
    'pre-push': 'yarn build && yarn test',
  },
}

/**
 * Get the Husky configuration object
 */
export function getHuskyConfig(): typeof config {
  return config
}
