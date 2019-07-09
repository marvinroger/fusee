import { FuseeParams } from '../fusee'

const config = {
  extends: ['@commitlint/config-conventional'],
}

export function buildGetCommitlintConfig(_fuseeParams: FuseeParams) {
  /**
   * Get the commitlint configuration object
   */
  function get(): typeof config {
    return config
  }

  return get
}
