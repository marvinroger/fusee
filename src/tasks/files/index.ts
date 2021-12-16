import { copyFiles } from 'mrm-core'
import * as path from 'path'

const ASSETS_DIR = path.resolve(__dirname, '../../../assets')

const FILES = [
  '.editorconfig',
  '.eslintrc.js',
  '.gitignore',
  '.huskyrc.js',
  '.prettierignore',
  '.prettierrc.js',
  'jest.config.js',
  '.lintstagedrc.js',
  'tsconfig.json',
  'tsconfig.build.json',
]

function task(): void {
  copyFiles(ASSETS_DIR, FILES, { overwrite: false })
}

task.description = 'Add files'
export = task
