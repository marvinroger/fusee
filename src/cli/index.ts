#!/usr/bin/env node

import program from 'commander'
import * as path from 'path'
import { SRC_GLOB, SRC_GLOB_MONOREPO } from '../constants'
import { buildFusee } from '../index'
import { getPackageInformation, runLocalBin } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package')

const FUSEE_FILE_NAME = 'fusee.js'

const SUPPORTED_COMMANDS = [
  'eslint',
  'prettier',
  'typedoc',
  'mrm',
  'commitlint',
  'git-cz',
  'jest',
  'lint-staged',
]

const TASKS_DIR = path.resolve(__dirname, '../tasks')

const packageInformation = getPackageInformation().$
const fuseePath = path.join(packageInformation.root, FUSEE_FILE_NAME)

const getFusee = (): ReturnType<typeof buildFusee> => {
  try {
    return require(fuseePath)
  } catch (_err) {
    throw new Error('Cannot find fusee.js in root')
  }
}
const FUSEE = getFusee()

program.version(pkg.version)

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
      throw new Error(`${cmd} is not supported`)
    }

    await runLocalBin(cmd, args)
  })

program
  .command('lint [files...]')
  .description('lint and try to fix the code')
  .action(async (files: string[]) => {
    const pattern = FUSEE._params.monorepo ? SRC_GLOB_MONOREPO : SRC_GLOB

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
    await runLocalBin('jest', ['--passWithNoTests'])
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
  .action(async () => {
    await runLocalBin('jest', ['--passWithNoTests'])
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
      path.join(packageInformation.root, 'docs/'),
      path.join(packageInformation.root, 'src/'),
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
