const config = {
  extends: ['@commitlint/config-conventional'],
}

/**
 * Get the commitlint configuration object
 */
export function getCommitlintConfig(): typeof config {
  return config
}
