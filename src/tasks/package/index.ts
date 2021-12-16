import { sync as readPkgUp } from 'read-pkg-up'
import { install, packageJson } from 'mrm-core'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { packageJson: pkg } = readPkgUp({ cwd: __dirname })!

function task(): void {
  packageJson()
    .setScript('build', 'echo TODO')
    .setScript('generate-docs', 'fusee generate-docs')
    .setScript('lint', 'fusee lint')
    .setScript('test', 'fusee test')
    .setScript('prepublishOnly', 'yarn lint && yarn build && yarn test')

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
