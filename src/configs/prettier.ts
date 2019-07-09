import { FuseeParams } from '../fusee'

const config = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}

export function buildGetPrettierConfig(_fuseeParams: FuseeParams) {
  /**
   * Get the Prettier configuration object
   */
  function get(): typeof config {
    return config
  }

  return get
}
