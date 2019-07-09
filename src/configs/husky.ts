import { FuseeParams } from '../fusee'

const config = {
  hooks: {
    'pre-commit': 'fusee run lint-staged',
    'commit-msg': 'fusee run commitlint -- -E HUSKY_GIT_PARAMS',
  },
}

export function buildGetHuskyConfig(_fuseeParams: FuseeParams) {
  /**
   * Get the Husky configuration object
   */
  function getHuskyConfig(): typeof config {
    return config
  }

  return getHuskyConfig
}
