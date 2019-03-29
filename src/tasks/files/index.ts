import * as path from 'path'
import { copyFiles } from 'mrm-core'

const ASSETS_DIR = path.resolve(__dirname, '../../../assets')

const FILES = [
  '.editorconfig',
  '.eslintrc.js',
  '.gitignore',
  '.prettierrc.js',
  'jest.config.js',
  'lint-staged.config.js',
  'tsconfig.json',
]

function task(): void {
  copyFiles(ASSETS_DIR, FILES, { overwrite: false })
}

task.description = 'Add files'
export = task
