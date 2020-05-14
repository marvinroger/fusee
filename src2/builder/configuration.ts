type ExportFn = () => {} | Promise<{}>

export interface ConfigurationBuilder {
  requireFacts: (facts: string[]) => ConfigurationBuilder
  export: (fn: ExportFn) => void
}

export interface Configuration {
  requiredFacts: Set<string>
  fn: ExportFn
}

export const createConfigurationBuilder: () => {
  configuration: Configuration
  configurationBuilder: ConfigurationBuilder
} = () => {
  const configuration: Configuration = {
    requiredFacts: new Set(),
    fn: () => ({}),
  }

  const configurationBuilder: ConfigurationBuilder = {
    requireFacts(facts: string[]) {
      for (const fact of facts) {
        configuration.requiredFacts.add(fact)
      }

      return this
    },
    export(fn: ExportFn) {
      configuration.fn = fn
    },
  }

  return {
    configuration,
    configurationBuilder,
  }
}
