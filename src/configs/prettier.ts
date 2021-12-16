import { HydratedFuseeOptions } from '../options'

const config = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}

export function buildGetPrettierConfig(
  _hydratedFuseeOptions: HydratedFuseeOptions
) {
  /**
   * Get the Prettier configuration object
   */
  function get(): typeof config {
    return config
  }

  return get
}
