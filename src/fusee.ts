import { buildCommitlint } from './configs/commitlint'
import { buildEslint } from './configs/eslint'
import { buildHusky } from './configs/husky'
import { buildJest } from './configs/jest'
import { buildLintStaged } from './configs/lint-staged'
import { buildPrettier } from './configs/prettier'
import { buildReleaseIt } from './configs/release-it'

export interface FuseeParams {
  /* Is the project a monorepo? */
  monorepo?: boolean

  /* Is the project using React? */
  react?: boolean
}

export function fusee(params: FuseeParams) {
  const { monorepo = false, react = false } = params

  const hydratedParams = { monorepo, react }

  return {
    _params: hydratedParams,
    commitlint: buildCommitlint(hydratedParams),
    eslint: buildEslint(hydratedParams),
    husky: buildHusky(hydratedParams),
    jest: buildJest(hydratedParams),
    lintStaged: buildLintStaged(hydratedParams),
    prettier: buildPrettier(hydratedParams),
    releaseIt: buildReleaseIt(hydratedParams),
  }
}
