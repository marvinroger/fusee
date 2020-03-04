#!/usr/bin/env node

import program from 'commander'
import * as path from 'path'
import { SRC_GLOB, SRC_GLOB_MONOREPO, SUPPORTED_COMMANDS } from '../constants'
import { loadContext, PackageContext, runLocalBin } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../../package').version)

program
  .command('init')
  .description('initialize a project')
  .action(async () => {
    await runLocalBin('mrm', [
      'package',
      'files',
      '--dir',
      path.resolve(__dirname, '../tasks'),
    ])
  })

program
  .command('doctor')
  .description('check the project is setup correctly')
  .action(async () => {
    const context = loadContext().$

    console.log('todo')
  })

program
  .command('run <cmd> [args...]')
  .description('run the given cmd')
  .action(async (cmd: string, args: string[]) => {
    loadContext().$

    if (!SUPPORTED_COMMANDS.includes(cmd)) {
      throw new Error(`${cmd} is not supported`)
    }

    await runLocalBin(cmd, args)
  })

program
  .command('lint [files...]')
  .description('lint and try to fix the code')
  .action(async (files: string[]) => {
    const { packageInformation, fusee } = loadContext().$
    const pattern = fusee._params.monorepo ? SRC_GLOB_MONOREPO : SRC_GLOB

    let toCheck = [path.join(packageInformation.root, pattern)]
    if (files.length) {
      toCheck = files
    }

    await runLocalBin('eslint', [
      '--ignore-path',
      path.join(packageInformation.root, '.gitignore'),
      '--fix',
      ...toCheck,
    ])
    await runLocalBin('prettier', ['--write', ...toCheck])
  })

program
  .command('test')
  .description('run the tests')
  .action(async () => {
    const { packageInformation, fusee } = loadContext().$
    const { packageRoot, context } = packageInformation
    if (context === PackageContext.MonorepoRoot) {
      throw new Error('You must be in the context of a workspace package')
    }

    await runLocalBin('jest', ['--passWithNoTests'], { cwd: packageRoot })
  })

program
  .command('commit')
  .description('commit interactively')
  .action(async () => {
    await runLocalBin('git-cz')
  })

program
  .command('release')
  .description('release the package')
  .action(async (params: string[]) => {
    const { packageInformation, fusee } = loadContext().$
    const { packageRoot, context } = packageInformation
    if (context === PackageContext.MonorepoRoot) {
      throw new Error('You must be in the context of a workspace package')
    }

    await runLocalBin('release-it', params, { cwd: packageRoot })
  })

program
  .command('generate-docs')
  .description('generate the docs')
  .action(async () => {
    const { packageInformation, fusee } = loadContext().$
    const { packageRoot, context } = packageInformation
    if (context === PackageContext.MonorepoRoot) {
      throw new Error('You must be in the context of a workspace package')
    }

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
      path.join(packageRoot, 'docs/'),
      path.join(packageRoot, 'src/'),
    ])
  })

program.on('command:*', () => {
  throw new Error(
    `Invalid command: ${program.args.join(
      ' '
    )}\nSee --help for a list of available commands.`
  )
})

program.parse(process.argv)

if (!program.args.length) program.help()
