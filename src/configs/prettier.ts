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
  function get(): typeof config
  function get<T extends {}>(merge: T): typeof config & T
  function get<T extends {}>(merge?: T): typeof config | (typeof config & T) {
    return { ...config, ...merge }
  }

  return get
}
