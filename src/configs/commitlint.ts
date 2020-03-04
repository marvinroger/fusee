import { FuseeParams } from '../fusee'

const config = {
  extends: ['@commitlint/config-conventional'],
}

export function buildCommitlint(_fuseeParams: FuseeParams) {
  /**
   * Get the commitlint configuration object
   */
  function get(merge?: any): typeof config {
    return { ...config, ...merge }
  }

  return get
}
