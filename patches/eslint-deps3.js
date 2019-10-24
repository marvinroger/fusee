/* eslint-env node */
// This is a workaround for https://github.com/eslint/eslint/issues/3458
//
// To correct how ESLint searches for plugin packages, add this line to the top of your project's .eslintrc.js file:
//
//    require('@marvinroger/fusee/patches/eslint-deps')
//

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

let currentModule = module
while (
  !/[\\/]eslint[\\/]lib[\\/]cli-engine[\\/]config-array-factory\.js/i.test(
    currentModule.filename
  )
) {
  if (!currentModule.parent) {
    // This was tested with ESLint 6.1.0; other versions may not work
    throw new Error(
      'Failed to patch ESLint because the calling module was not recognized'
    )
  }
  currentModule = currentModule.parent
}
const eslintFolder = path.join(path.dirname(currentModule.filename), '../..')

const configArrayFactoryPath = path.join(
  eslintFolder,
  'lib/cli-engine/config-array-factory'
)
const ConfigArrayFactory = require(configArrayFactoryPath).ConfigArrayFactory

if (!ConfigArrayFactory.__patched) {
  ConfigArrayFactory.__patched = true

  const moduleResolverPath = path.join(
    eslintFolder,
    'lib/shared/relative-module-resolver'
  )
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ModuleResolver = require(moduleResolverPath)

  const originalLoadPlugin = ConfigArrayFactory.prototype._loadPlugin
  ConfigArrayFactory.prototype._loadPlugin = function(
    _name,
    _importerPath,
    _importerName
  ) {
    const originalResolve = ModuleResolver.resolve
    try {
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

      // eslint-disable-next-line prefer-rest-params
      return originalLoadPlugin.apply(this, arguments)
    } finally {
      ModuleResolver.resolve = originalResolve
    }
  }
}
