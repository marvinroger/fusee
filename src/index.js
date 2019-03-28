/* eslint-disable @typescript-eslint/no-var-requires */

const { getEslintConfig } = require('./eslint')
const { getJestConfig } = require('./jest')
const { getLintStagedConfig } = require('./lint-staged')
const { getPrettierConfig } = require('./prettier')

module.exports = {
  getEslintConfig,
  getJestConfig,
  getLintStagedConfig,
  getPrettierConfig,
}
