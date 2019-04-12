import { install, packageJson } from 'mrm-core'

// @ts-ignore
import * as pkg from '../../../package.json'

function task(): void {
  packageJson()
    .setScript('build', 'echo TODO')
    .setScript('generate-docs', 'dev-core generate-docs')
    .setScript('lint', 'dev-core lint')
    .setScript('test', 'dev-core test')
    .setScript('commit', 'dev-core run git-cz')
    .setScript('release', 'dev-core run standard-version')
    .setScript('prepublishOnly', 'yarn lint && yarn build && yarn test')
    .set('config.commitizen', {
      path: 'cz-conventional-changelog',
    })

    .save()

  install(
    {
      '@marvinroger/dev-core': `^${pkg.version}`,
      husky: pkg.dependencies.husky,
    },
    { yarn: true }
  )
}

task.description = 'Install @marvinroger/dev-core and add scripts'
export = task
