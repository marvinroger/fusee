import { install, packageJson } from 'mrm-core'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package')

function task(): void {
  packageJson()
    .setScript('build', 'echo TODO')
    .setScript('generate-docs', 'fusee generate-docs')
    .setScript('lint', 'fusee lint')
    .setScript('test', 'fusee test')
    .setScript('commit', 'fusee run git-cz')
    .setScript('release', 'fusee run standard-version')
    .setScript('prepublishOnly', 'yarn lint && yarn build && yarn test')
    .set('config.commitizen', {
      path: 'cz-conventional-changelog',
    })

    .save()

  install(
    {
      '@marvinroger/fusee': `^${pkg.version}`,
      ...pkg.peerDependencies,
    },
    { yarn: true }
  )
}

task.description = 'Install @marvinroger/fusee and add scripts'
export = task
