#!/usr/bin/env node

import program from 'commander'
import findRoot from 'find-root'
import findYarnWorkspaceRoot from 'find-yarn-workspace-root'
import * as path from 'path'
import { buildFusee } from '../index'
import { die, runLocalBin } from './utils'

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
  'standard-version',
]

export const LINT_GLOB = '*.{ts,tsx,js,jsx}'
const SRC_GLOB = `src/**/${LINT_GLOB}`
const SRC_GLOB_MONOREPO = `packages/**/src/**/${LINT_GLOB}`

const TASKS_DIR = path.resolve(__dirname, '../tasks')

const CURRENT_PATH = process.cwd()
const getPackageRoot = (): string => {
  try {
    return findRoot(CURRENT_PATH)
  } catch (_err) {
    die(
      'Not in the context of a Node.js project (no package.json found in parents)'
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any
  }
}
const PACKAGE_ROOT = getPackageRoot()

const WORKSPACE_ROOT = findYarnWorkspaceRoot(PACKAGE_ROOT)

const IS_MONOREPO = WORKSPACE_ROOT !== null
const ROOT = IS_MONOREPO ? (WORKSPACE_ROOT as string) : PACKAGE_ROOT

const FUSEE_PATH = path.join(ROOT, FUSEE_FILE_NAME)

const getFusee = (): ReturnType<typeof buildFusee> => {
  try {
    return require(FUSEE_PATH)
  } catch (_err) {
    die('Cannot find fusee.js in root')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any
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
      die(`${cmd} is not supported`)
      return
    }

    await runLocalBin(cmd, args)
  })

program
  .command('lint [files...]')
  .description('lint and try to fix the code')
  .action(async (files: string[]) => {
    const pattern = FUSEE._params.monorepo ? SRC_GLOB_MONOREPO : SRC_GLOB

    let toCheck = [path.join(ROOT, pattern)]
    if (files.length) {
      toCheck = files
    }

    await runLocalBin('eslint', [
      '--ignore-path',
      path.join(ROOT, '.gitignore'),
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
      path.join(PACKAGE_ROOT, 'docs/'),
      path.join(PACKAGE_ROOT, 'src/'),
    ])
  })

program.on('command:*', () => {
  die(
    `Invalid command: ${program.args.join(
      ' '
    )}\nSee --help for a list of available commands.`
  )
})

program.parse(process.argv)

if (!program.args.length) program.help()
