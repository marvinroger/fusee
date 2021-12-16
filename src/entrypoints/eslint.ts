import { makeConfig } from '../configs/eslint'
import { loadPackageAndFusee } from '../utils/workspace'

const { fusee, pkg } = loadPackageAndFusee()
const config = makeConfig(pkg.path, fusee.options)

export = config
