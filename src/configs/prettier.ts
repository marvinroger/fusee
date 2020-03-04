import { FuseeParams } from '../fusee'

const config = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}

export function buildPrettier(_fuseeParams: FuseeParams) {
  /**
   * Get the Prettier configuration object
   */
  function get(merge?: any): typeof config {
    return { ...config, ...merge }
  }

  return get
}
