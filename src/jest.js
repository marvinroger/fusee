const { defaults } = require('jest-config')

const config = {
  preset: 'ts-jest',

  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    '/pkg/',
    '/dist/',
  ],
}

function getJestConfig() {
  return config
}

module.exports = {
  getJestConfig,
}
