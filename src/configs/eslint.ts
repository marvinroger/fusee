import { FuseeParams } from '../fusee'

enum Level {
  Off = 'off',
  Warn = 'warn',
  Error = 'error',
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ESLintConfig {
  parser: string
  plugins: string[]
  extends: string[]
  rules: {
    [rule: string]: Level | [Level, any]
  }
  settings: any
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const makeConfig = ({ react }: FuseeParams) => {
  const config: ESLintConfig = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],

    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier/@typescript-eslint',
      'plugin:promise/recommended',
      'plugin:node/recommended-module',
      'plugin:jest/recommended',
    ],

    rules: {
      '@typescript-eslint/explicit-function-return-type': Level.Off,
      '@typescript-eslint/no-parameter-properties': Level.Off,
      '@typescript-eslint/no-unused-vars': [
        Level.Warn,
        { argsIgnorePattern: '^_' },
      ],
      'eslint-comments/no-unused-disable': Level.Error,
      'node/no-unsupported-features/es-syntax': Level.Off,
      'node/no-missing-import': Level.Off,
      'node/shebang': Level.Off,
    },

    settings: {},
  }

  if (react) {
    // React
    config.extends.push('plugin:react/recommended')
    config.settings.react = {
      version: 'detect',
    }

    // React hooks
    config.plugins.push('react-hooks')
    config.rules['react-hooks/rules-of-hooks'] = Level.Error
    config.rules['react-hooks/exhaustive-deps'] = Level.Warn

    // Accessibility
    config.extends.push('plugin:jsx-a11y/recommended')
  }

  return config
}

export function buildGetEslintConfig(fuseeParams: FuseeParams) {
  /**
   * Get the ESLint configuration object
   */
  function get() {
    return makeConfig(fuseeParams)
  }

  return get
}
