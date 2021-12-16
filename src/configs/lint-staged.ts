import { LINT_GLOB } from '../constants'
import { HydratedFuseeOptions } from '../options'

const makeConfig = (_hydratedFuseeOptions: HydratedFuseeOptions) => ({
  [LINT_GLOB]: [`fusee lint`],
})

export function buildGetLintStagedConfig(
  hydratedFuseeOptions: HydratedFuseeOptions
) {
  /**
   * Get the lint-staged configuration object
   */
  function get() {
    return makeConfig(hydratedFuseeOptions)
  }

  return get
}
