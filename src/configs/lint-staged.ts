import { LINT_GLOB } from '../constants'
import { FuseeParams } from '../fusee'

const makeConfig = (_fuseeParams: FuseeParams) => ({
  [LINT_GLOB]: [`fusee lint`],
})

export function buildGetLintStagedConfig(fuseeParams: FuseeParams) {
  /**
   * Get the lint-staged configuration object
   */
  function get() {
    return makeConfig(fuseeParams)
  }

  return get
}
