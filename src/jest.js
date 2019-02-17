const { defaults } = require('jest-config')

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

function getJestConfig() {
  return config
}

module.exports = {
  getJestConfig,
}
