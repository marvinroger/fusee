type SetupFn = (info: {}) => void

interface TODONameMe {
  requireFeatures: (features: string[]) => TODONameMe
  setup: (fn: SetupFn) => void
}

interface FuseeBuilder {
  feature: (name: string) => TODONameMe
}

type FuseeBuilderFn = (fuseeBuilder: FuseeBuilder) => void

interface Fusee {
  _features: Map<
    string,
    {
      dependencies: Set<string>
      fn: SetupFn
    }
  >

  (features: string[]): {
    feature: (
      name: string
    ) => {
      getConfiguration: (name: string) => {}
    }
  }
}
