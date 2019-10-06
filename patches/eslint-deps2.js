/* eslint-env node */
// This is a workaround for https://github.com/eslint/eslint/issues/3458
//
// To correct how ESLint searches for plugin packages, add this line to the top of your project's .eslintrc.js file:
//
//    require('@marvinroger/fusee/patches/eslint-deps')
//

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const eslintFolder = path.join(require.resolve('eslint'), '../..')

const moduleResolverPath = path.join(
  eslintFolder,
  'lib/shared/relative-module-resolver'
)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ModuleResolver = require(moduleResolverPath)

const originalResolve = ModuleResolver.resolve
ModuleResolver.resolve = function(moduleName, relativeToPath) {
  const fuseePath = require.resolve('@marvinroger/fusee')

  // if the normal resolve does not work,
  // we try with the fusee path
  try {
    return originalResolve.call(this, moduleName, relativeToPath)
  } catch (err) {
    try {
      return originalResolve.call(this, moduleName, fuseePath)
    } catch (_err2) {
      throw err
    }
  }
}
