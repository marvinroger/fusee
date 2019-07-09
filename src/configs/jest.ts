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

export function buildGetJestConfig(_fuseeParams: FuseeParams) {
  /**
   * Get the Jest configuration object
   */
  function get(): typeof config {
    return config
  }

  return get
}
