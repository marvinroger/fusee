import { install, packageJson } from 'mrm-core'

// @ts-ignore
import * as pkg from '../../../package.json'

function task(): void {
  packageJson()
    .setScript('generate-docs', 'dev-core generate-docs')
    .setScript('lint', 'dev-core lint')
    .setScript('test', 'dev-core test')
    .set('husky', {
      hooks: {
        'pre-commit': 'dev-core lint-staged',
      },
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
