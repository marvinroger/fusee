const { getEslintConfig } = require('./eslint')
const { getJestConfig } = require('./jest')
const { getPrettierConfig } = require('./prettier')

module.exports = {
  getEslintConfig,
  getJestConfig,
  getPrettierConfig,
}
