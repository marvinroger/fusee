import { FuseeParams } from '../fusee'

const config = {
  hooks: {
    'pre-commit': 'fusee run lint-staged',
    'commit-msg': 'fusee run commitlint -- -E HUSKY_GIT_PARAMS',
  },
}

export function buildHusky(_fuseeParams: FuseeParams) {
  /**
   * Get the Husky configuration object
   */
  function get(): typeof config
  function get<T extends {}>(merge: T): typeof config & T
  function get<T extends {}>(merge?: T): typeof config | (typeof config & T) {
    return { ...config, ...merge }
  }

  return get
}
