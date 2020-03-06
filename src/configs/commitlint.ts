import { FuseeParams } from '../fusee'

const config = {
  extends: ['@commitlint/config-conventional'],
}

export function buildCommitlint(_fuseeParams: FuseeParams) {
  /**
   * Get the commitlint configuration object
   */
  function get(): typeof config
  function get<T extends {}>(merge: T): typeof config & T
  function get<T extends {}>(merge?: T): typeof config | (typeof config & T) {
    return { ...config, ...merge }
  }

  return get
}
