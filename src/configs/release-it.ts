import { FuseeParams } from '../fusee'

const makeConfig = (fuseeParams: FuseeParams) => ({
  git: {
    requireBranch: 'master',
    commitMessage: `chore${
      fuseeParams.monorepo ? '(${name})' : ''
    }: bump to v\${version}`,
    tagName: fuseeParams.monorepo ? '${name}@v${version}' : 'v${version}',
  },
})

export function buildReleaseIt(fuseeParams: FuseeParams) {
  /**
   * Get the release-it configuration object
   */
  function get<T extends {}>(merge: T): ReturnType<typeof makeConfig> & T {
    return { ...makeConfig(fuseeParams), ...merge }
  }

  return get
}
