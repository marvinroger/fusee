import { buildGetCommitlintConfig } from './configs/commitlint'
import { buildGetEslintConfig } from './configs/eslint'
import { buildGetHuskyConfig } from './configs/husky'
import { buildGetJestConfig } from './configs/jest'
import { buildGetPrettierConfig } from './configs/prettier'

export interface FuseeParams {
  /* Is the project a monorepo? */
  monorepo?: boolean

  /* Is the project using React? */
  react?: boolean
}

export function buildFusee(params: FuseeParams) {
  const { monorepo = false, react = false } = params

  const hydratedParams = { monorepo, react }

  return {
    getCommitlintConfig: buildGetCommitlintConfig(hydratedParams),
    getEslintConfig: buildGetEslintConfig(hydratedParams),
    getHuskyConfig: buildGetHuskyConfig(hydratedParams),
    getJestConfig: buildGetJestConfig(hydratedParams),
    getLintStagedConfig: buildGetJestConfig(hydratedParams),
    getPrettierConfig: buildGetPrettierConfig(hydratedParams),
  }
}
