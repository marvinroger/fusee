import { SRC_GLOB } from '../constants'
import { HydratedFuseeOptions } from '../options'

const makeConfig = (_hydratedFuseeOptions: HydratedFuseeOptions) => ({
  [SRC_GLOB]: [`fusee lint`],
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
