#!/usr/bin/env node

const path = require('path')
const program = require('commander')

const { die, runBin } = require('./utils')

const pkg = require('../../package')

const SUPPORTED_COMMANDS = ['eslint', 'prettier', 'typedoc', 'mrm']

const SRC_GLOB = 'src/**/*.ts'

const TASKS_DIR = path.resolve(__dirname, '../tasks')

program.version(pkg.version)

program
  .command('init')
  .description('initialize a project')
  .action(async () => {
    await runBin('mrm', ['package', 'files', '--dir', TASKS_DIR])
  })

program
  .command('run <cmd> [args...]')
  .description('run the given cmd')
  .action(async (cmd, args) => {
    if (!SUPPORTED_COMMANDS.includes(cmd)) {
      die(`${cmd} is not supported`)
    }

    await runBin(cmd, args)
  })

program
  .command('lint')
  .description('lint and try to fix the code')
  .action(async () => {
    await runBin('eslint', ['--fix', SRC_GLOB])
    await runBin('prettier', ['--write', SRC_GLOB])
  })

program
  .command('test')
  .description('run the tests')
  .action(async () => {
    await runBin('jest')
  })

program
  .command('generate-docs')
  .description('generate the docs')
  .action(async () => {
    await runBin('typedoc', [
      '--target',
      'ES6',
      '--mode',
      'file',
      '--excludePrivate',
      '--excludeProtected',
      '--excludeNotExported',
      '--theme',
      'minimal',
      '--out',
      'docs/',
      'src/',
    ])
  })

program
  .command('lint-staged')
  .description('lint-staged hook')
  .action(async () => {
    await runBin('lint-staged')
  })

program.on('command:*', function() {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )

  process.exit(1)
})

program.parse(process.argv)

if (!program.args.length) program.help()
