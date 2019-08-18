import { FuseeParams } from '../fusee'

const makeConfig = (fuseeParams: FuseeParams) => ({
  '*.{ts,tsx,js,jsx}': [`fusee lint`, 'git add'],
})

export function buildGetLintStagedConfig(fuseeParams: FuseeParams) {
  /**
   * Get the lint-staged configuration object
   */
  function get() {
    return makeConfig(fuseeParams)
  }

  return get
}
