import { FuseeParams } from '../fusee'

const config = {
  preset: 'ts-jest',
}

export function buildJest(_fuseeParams: FuseeParams) {
  /**
   * Get the Jest configuration object
   */
  function get(): typeof config
  function get<T extends {}>(merge: T): typeof config & T
  function get<T extends {}>(merge?: T): typeof config | (typeof config & T) {
    return { ...config, ...merge }
  }

  return get
}
