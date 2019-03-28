import { defaults } from 'jest-config'

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

/**
 * Get the Jest configuration object
 */
export function getJestConfig(): typeof config {
  return config
}
