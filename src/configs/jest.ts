import { defaults } from 'jest-config'
import { FuseeParams } from '../fusee'

const BUILT_PACKAGE_DIR = '/pkg/'

const config = {
  preset: 'ts-jest',

  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    BUILT_PACKAGE_DIR,
  ],
  modulePathIgnorePatterns: [
    ...defaults.modulePathIgnorePatterns,
    BUILT_PACKAGE_DIR,
  ],
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
