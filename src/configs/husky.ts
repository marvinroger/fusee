import { HydratedFuseeOptions } from '../options'

const config = {
  hooks: {
    'pre-commit': 'fusee run lint-staged',
  },
}

export function buildGetHuskyConfig(
  _hydratedFuseeOptions: HydratedFuseeOptions
) {
  /**
   * Get the Husky configuration object
   */
  function getHuskyConfig(): typeof config {
    return config
  }

  return getHuskyConfig
}
