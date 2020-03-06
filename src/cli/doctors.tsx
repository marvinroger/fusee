import semver from 'semver'
import {
  REQUIRED_ESLINT_PACKAGES,
  REQUIRED_JEST_PACKAGES,
  REQUIRED_PRETTIER_PACKAGES,
  REQUIRED_RELEASE_IT_PACKAGES,
  REQUIRED_TYPEDOC_PACKAGES,
  REQUIRED_TYPESCRIPT_PACKAGES,
} from '../dependencies'
import { Context, resolveVersion } from './utils'

export interface DoctorReport {
  healthy: boolean
  warnings: string[]
  errors: string[]
}

const checkDependencies = async (
  context: Context,
  packages: Record<string, string>,
  report: DoctorReport
) => {
  for (const [name, range] of Object.entries(packages)) {
    const resolvedVersion = await resolveVersion(name, {
      from: context.packageInformation.packageRoot,
    })

    if (!resolvedVersion) {
      report.errors.push(`The "${name}" package is not installed`)
      continue
    }

    if (!semver.satisfies(resolvedVersion, range)) {
      report.errors.push(
        `"${name}" v${resolvedVersion} does not satisfy the "${range}" range`
      )
    }
  }
}

const buildReport = (): DoctorReport => ({
  healthy: false,
  warnings: [],
  errors: [],
})

const finalizeReport = (report: DoctorReport): DoctorReport => {
  if (report.errors.length === 0) {
    report.healthy = true
  }

  return report
}

export const runLintDoctor = async (
  context: Context
): Promise<DoctorReport> => {
  const report = buildReport()

  const requiredPackages = {
    ...REQUIRED_TYPESCRIPT_PACKAGES,
    ...REQUIRED_ESLINT_PACKAGES.common,
    ...REQUIRED_PRETTIER_PACKAGES,
  }

  await checkDependencies(context, requiredPackages, report)

  if (context.fusee._params.react) {
    await checkDependencies(context, REQUIRED_ESLINT_PACKAGES.react, report)
  }

  return finalizeReport(report)
}

export const runTestDoctor = async (
  context: Context
): Promise<DoctorReport> => {
  const report = buildReport()

  await checkDependencies(
    context,
    { ...REQUIRED_TYPESCRIPT_PACKAGES, ...REQUIRED_JEST_PACKAGES },
    report
  )

  return finalizeReport(report)
}

export const runReleaseDoctor = async (
  context: Context
): Promise<DoctorReport> => {
  const report = buildReport()

  await checkDependencies(context, REQUIRED_RELEASE_IT_PACKAGES, report)

  return finalizeReport(report)
}

export const runGenerateDocsDoctor = async (
  context: Context
): Promise<DoctorReport> => {
  const report = buildReport()

  await checkDependencies(
    context,
    { ...REQUIRED_TYPESCRIPT_PACKAGES, ...REQUIRED_TYPEDOC_PACKAGES },
    report
  )

  return finalizeReport(report)
}
