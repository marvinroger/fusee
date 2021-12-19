import { getProjectDirectory, makeConfig } from '../configs/eslint'
import { loadPackageAndFusee } from '../utils/workspace'

const { fusee, pkg } = loadPackageAndFusee(getProjectDirectory())
const config = makeConfig(pkg.path, fusee.options)

export = config
