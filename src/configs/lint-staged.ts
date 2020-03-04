import { LINT_GLOB } from '../constants'
import { FuseeParams } from '../fusee'

const makeConfig = (_fuseeParams: FuseeParams) => ({
  [LINT_GLOB]: [`fusee lint`],
})

export function buildLintStaged(fuseeParams: FuseeParams) {
  /**
   * Get the lint-staged configuration object
   */
  function get(merge?: any): ReturnType<typeof makeConfig> {
    return { ...makeConfig(fuseeParams), ...merge }
  }

  return get
}
