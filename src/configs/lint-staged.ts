interface LintStagedParams {
  monorepo?: boolean
}

const defaultParams: LintStagedParams = {
  monorepo: false,
}

const makeConfig = (params: LintStagedParams) => ({
  linters: {
    '*.{ts,tsx,js,jsx}': [
      `dev-core lint${params.monorepo ? ' --monorepo' : ''}`,
      'git add',
    ],
  },
})

/**
 * Get the lint-staged configuration object
 */
export function getLintStagedConfig(params: LintStagedParams = defaultParams) {
  return makeConfig(params)
}
