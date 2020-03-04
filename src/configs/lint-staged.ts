import { LINT_GLOB } from '../constants'
import { FuseeParams } from '../fusee'

const makeConfig = (_fuseeParams: FuseeParams) => ({
  [LINT_GLOB]: [`fusee lint`],
})

export function buildLintStaged(fuseeParams: FuseeParams) {
  /**
   * Get the lint-staged configuration object
   */
  function get(): ReturnType<typeof makeConfig>
  function get<T extends {}>(merge: T): ReturnType<typeof makeConfig> & T
  function get<T extends {}>(merge?: T): any {
    return { ...makeConfig(fuseeParams), ...merge }
  }

  return get
}
