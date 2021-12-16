import { HydratedFuseeOptions } from '../options'

const config = {
  preset: 'ts-jest',
}

export function buildGetJestConfig(
  _hydratedFuseeOptions: HydratedFuseeOptions
) {
  /**
   * Get the Jest configuration object
   */
  function get(): typeof config {
    return config
  }

  return get
}
