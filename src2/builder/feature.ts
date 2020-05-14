interface FeatureBuilder {
  fact: (name: string) => FactBuilder
  configuration: (name: string) => ConfigurationBuilder
  command: (name: string) => CommandBuilder
}

type FeatureBuilderFn = (feature: FeatureBuilder) => void

interface Feature {
  facts: Map<string, Fact>
  configurations: Map<string, Configuration>
  commands: Map<string, Command>
}
