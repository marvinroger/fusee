#!/usr/bin/env node

import { program } from 'commander'
import * as path from 'path'
import { SRC_GLOB } from '../constants'
import { die, buildRunLocalBin } from '../utils/bin'
import { loadPackageAndFusee } from '../utils/workspace'

const SUPPORTED_COMMANDS = ['typedoc', 'mrm', 'lint-staged']

const TASKS_DIR = path.resolve(__dirname, '../tasks')

const { pkg } = loadPackageAndFusee()

const runLocalBin = buildRunLocalBin(__dirname)
const runPackageBin = buildRunLocalBin(pkg.path)

program.version(pkg.packageJson.version)

program
  .command('init')
  .description('initialize a project')
  .action(async () => {
    await runLocalBin('mrm', ['package', 'files', '--dir', TASKS_DIR])
  })

program
  .command('run <cmd> [args...]')
  .description('run the given cmd')
  .action(async (cmd: string, args: string[]) => {
    if (!SUPPORTED_COMMANDS.includes(cmd)) {
      die(`${cmd} is not supported`)
      return
    }

    await runLocalBin(cmd, args)
  })

program
  .command('lint [files...]')
  .description('lint and try to fix the code')
  .action(async (files: string[]) => {
    const pattern = SRC_GLOB

    let toCheck = [path.join(pkg.path, pattern)]
    if (files.length) {
      toCheck = files
    }

    await runPackageBin('eslint', [
      '--ignore-path',
      path.join(pkg.path, '.gitignore'),
      '--fix',
      ...toCheck,
    ])
    await runPackageBin('prettier', ['--write', ...toCheck])
  })

program
  .command('test')
  .description('run the tests')
  .action(async () => {
    await runPackageBin('jest', ['--passWithNoTests'])
  })

program
  .command('generate-docs')
  .description('generate the docs')
  .action(async () => {
    await runLocalBin('typedoc', [
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
      path.join(pkg.path, 'docs/'),
      path.join(pkg.path, 'src/'),
    ])
  })

program.showHelpAfterError()
program.showSuggestionAfterError()

program.parse()
