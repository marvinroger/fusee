import { hydrateOptions, type FuseeOptions } from './options'
import { buildGetEslintConfig } from './configs/eslint'
import { buildGetHuskyConfig } from './configs/husky'
import { buildGetJestConfig } from './configs/jest'
import { buildGetLintStagedConfig } from './configs/lint-staged'
import { buildGetPrettierConfig } from './configs/prettier'

export function buildFusee(options: FuseeOptions = {}) {
  const hydratedOptions = hydrateOptions(options)

  return {
    options: hydratedOptions,

    getEslintConfig: buildGetEslintConfig(hydratedOptions),
    getHuskyConfig: buildGetHuskyConfig(hydratedOptions),
    getJestConfig: buildGetJestConfig(hydratedOptions),
    getLintStagedConfig: buildGetLintStagedConfig(hydratedOptions),
    getPrettierConfig: buildGetPrettierConfig(hydratedOptions),
  }
}
