// binName: packageName
const binMapping: {
  [binName: string]: string
} = {
  eslint: 'eslint',
  prettier: 'prettier',
  typedoc: 'typedoc',
  mrm: 'mrm',
  commitlint: '@commitlint/cli',
  'git-cz': 'commitizen',
  jest: 'jest',
  'lint-staged': 'lint-staged',
  'standard-version': 'standard-version',
}

export { binMapping }
