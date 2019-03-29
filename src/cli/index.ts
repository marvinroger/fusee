#!/usr/bin/env node

import * as path from 'path'
import * as program from 'commander'

import { die, runBin } from './utils'

// @ts-ignore
import * as pkg from '../../package.json'

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
  .action(async (cmd: string, args: string[]) => {
    if (!SUPPORTED_COMMANDS.includes(cmd)) {
      die(`${cmd} is not supported`)
    }

    await runBin(cmd, args)
  })

program
  .command('lint [files...]')
  .description('lint and try to fix the code')
  .action(async (files: string[]) => {
    await runBin('eslint', ['--fix', SRC_GLOB, ...files])
    await runBin('prettier', ['--write', SRC_GLOB, ...files])
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

program
  .command('lint-staged')
  .description('lint-staged hook')
  .action(async () => {
    await runBin('lint-staged')
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
