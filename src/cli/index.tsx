#!/usr/bin/env node

import program from 'commander'
import { render } from 'ink'
import * as path from 'path'
import React from 'react'
import { SRC_GLOB, SRC_GLOB_MONOREPO } from '../constants'
import { DoctorReportView } from './components/doctor'
import { ErrorMessage } from './components/error'
import {
  DoctorReport,
  runGenerateDocsDoctor,
  runLintDoctor,
  runReleaseDoctor,
  runTestDoctor,
} from './doctors'
import { loadContext, PackageContext, runBin, runLocalBin } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../../package').version)

program
  .command('doctor')
  .description('check if the project is setup correctly')
  .action(async () => {
    const context = await loadContext()

    const lint = await runLintDoctor(context)
    const test = await runTestDoctor(context)
    const generateDocs = await runGenerateDocsDoctor(context)
    const release = await runReleaseDoctor(context)

    render(
      <>
        <DoctorReportView report={lint} name="Lint" />
        <DoctorReportView report={test} name="Test" />
        <DoctorReportView report={generateDocs} name="Docs generation" />
        <DoctorReportView report={release} name="Release" />
      </>
    )
  })

const healthCheck = async (op: Promise<DoctorReport>) => {
  const report = await op

  if (!report.healthy) {
    render(<DoctorReportView report={report} />)
    process.exitCode = 1
    return false
  }

  return true
}

program
  .command('lint [files...]')
  .description('lint and try to fix the code')
  .action(async (files: string[]) => {
    const context = await loadContext()
    const { fusee, packageInformation } = context

    if (!(await healthCheck(runLintDoctor(context)))) return

    const pattern = fusee._params.monorepo ? SRC_GLOB_MONOREPO : SRC_GLOB

    let toCheck = [path.join(packageInformation.root, pattern)]
    if (files.length) {
      toCheck = files
    }

    await runBin(
      'eslint',
      [
        '--ignore-path',
        path.join(packageInformation.root, '.gitignore'),
        '--fix',
        ...toCheck,
      ],
      { localDir: packageInformation.root }
    )
    await runLocalBin('prettier', ['--write', ...toCheck])
  })

program
  .command('test')
  .description('run the tests')
  .action(async () => {
    const context = await loadContext()
    const { packageInformation } = context
    if (packageInformation.context === PackageContext.MonorepoRoot) {
      throw new Error('You must be in the context of a workspace package')
    }

    if (!(await healthCheck(runTestDoctor(context)))) return

    await runBin('jest', ['--passWithNoTests'], {
      cwd: packageInformation.packageRoot,
      localDir: packageInformation.packageRoot,
    })
  })

program
  .command('commit')
  .description('commit interactively')
  .action(async () => {
    await runLocalBin('git-cz')
  })

program
  .command('release [params...]')
  .description('release the package')
  .action(async (params: string[]) => {
    const context = await loadContext()
    const { packageInformation } = context
    if (packageInformation.context === PackageContext.MonorepoRoot) {
      throw new Error('You must be in the context of a workspace package')
    }

    if (!(await healthCheck(runReleaseDoctor(context)))) return

    await runBin('release-it', params, {
      cwd: packageInformation.packageRoot,
      localDir: packageInformation.packageRoot,
    })
  })

program
  .command('generate-docs')
  .description('generate the docs')
  .action(async () => {
    const context = await loadContext()
    const { packageInformation } = context
    if (packageInformation.context === PackageContext.MonorepoRoot) {
      throw new Error('You must be in the context of a workspace package')
    }

    if (!(await healthCheck(runGenerateDocsDoctor(context)))) return

    await runBin(
      'typedoc',
      [
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
        path.join(packageInformation.packageRoot, 'docs/'),
        path.join(packageInformation.packageRoot, 'src/'),
      ],
      { localDir: packageInformation.packageRoot }
    )
  })

const handleError = (err: Error) => {
  render(<ErrorMessage message={err.message} />)
  process.exitCode = 1
}

process.on('uncaughtException', (err) => {
  handleError(err)
})

try {
  program.parse(process.argv)
} catch (err) {
  handleError(err)
}

if (program.rawArgs.length < 3) program.help()
