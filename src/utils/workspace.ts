import path from 'path'
import { sync as readPackageUpSync } from 'read-pkg-up'

import { buildFusee } from '../fusee'

const FUSEE_FILE_NAME = 'fusee.js'

export const readPackage = () => {
  const pkg = readPackageUpSync()

  if (!pkg)
    throw Error(
      'Not in the context of a Node.js project (no package.json found in parents)'
    )

  const { packageJson, path: packageJsonPath } = pkg
  const packagePath = path.dirname(packageJsonPath)

  return {
    path: packagePath,
    packageJson,
  }
}

export const loadFusee = (
  packagePath: string
): ReturnType<typeof buildFusee> => {
  const fuseePath = path.join(packagePath, FUSEE_FILE_NAME)

  try {
    return require(fuseePath)
  } catch (_err) {
    throw new Error(
      'Cannot load fusee.js in your workspace - are you sure it exists and is valid JS?'
    )
  }
}

export const loadPackageAndFusee = () => {
  const pkg = readPackage()
  const fusee = loadFusee(pkg.path)

  return { pkg, fusee }
}
