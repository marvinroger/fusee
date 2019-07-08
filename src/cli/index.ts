#!/usr/bin/env node

import * as program from 'commander'
import * as path from 'path'
// @ts-ignore
import * as pkg from '../../package.json'
import { die, runBin } from './utils'

const SUPPORTED_COMMANDS = [
  'eslint',
  'prettier',
  'typedoc',
  'mrm',
  'commitlint',
  'git-cz',
  'jest',
  'lint-staged',
  'standard-version',
]

const SRC_GLOB = 'src/**/*.ts'
const SRC_GLOB_MONOREPO = 'packages/**/src/**/*.ts'

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
  .action(async (cmd: string, args: string[]) => {
    if (!SUPPORTED_COMMANDS.includes(cmd)) {
      die(`${cmd} is not supported`)
    }

    await runBin(cmd, args)
  })

program
  .command('lint [files...]')
  .option('--monorepo', 'Lint on a monorepo (packages/**)')
  .description('lint and try to fix the code')
  .action(async (files: string[], cmd: { monorepo?: boolean }) => {
    const pattern = cmd.monorepo ? SRC_GLOB_MONOREPO : SRC_GLOB

    let toCheck = [pattern]
    if (files.length) {
      toCheck = files
    }

    await runBin('eslint', ['--fix', ...toCheck])
    await runBin('prettier', ['--write', ...toCheck])
  })

program
  .command('test')
  .description('run the tests')
  .action(async () => {
    await runBin('jest', ['--passWithNoTests'])
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
      '--ignoreCompilerErrors',
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

program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )

  process.exit(1)
})

program.parse(process.argv)

if (!program.args.length) program.help()
