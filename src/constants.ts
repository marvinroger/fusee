export const LINT_GLOB = '*.{ts,tsx,js,jsx}'
export const SRC_GLOB = `src/**/${LINT_GLOB}`
export const SRC_GLOB_MONOREPO = `packages/**/src/**/${LINT_GLOB}`

export const FUSEE_FILE_NAME = 'fusee.js'

export const SUPPORTED_COMMANDS = [
  'eslint',
  'prettier',
  'typedoc',
  'mrm',
  'commitlint',
  'git-cz',
  'jest',
  'lint-staged',
  'release-it',
]
