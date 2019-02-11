const { install, packageJson } = require('mrm-core')

const pkg = require('../../package')

function task() {
  install({ '@marvinroger/dev-core': `^${pkg.version}` }, { yarn: true })

  const file = packageJson()
    .setScript('generate-docs', 'dev-core generate-docs')
    .setScript('lint', 'dev-core lint')
    .setScript('test', 'dev-core test')
    .save()
}

task.description = 'Install @marvinroger/dev-core and add scripts'
module.exports = task
