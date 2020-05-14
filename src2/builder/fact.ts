type CustomFn = (info: {}) => Promise<boolean>

interface FactBuilder {
  dependencies: (deps: Record<string, string>) => void
  custom: (fn: CustomFn) => void
}

enum FactType {
  Dependencies = 'dependencies',
  Custom = 'custom',
}

type Fact =
  | {
      type: FactType.Dependencies
      dependencies: Record<string, string>
    }
  | { type: FactType.Custom; fn: CustomFn }
