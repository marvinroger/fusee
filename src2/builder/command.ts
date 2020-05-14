type HandleFn = () => Promise<void>

interface CommandBuilder {
  requireFacts: (facts: string[]) => CommandBuilder
  handle: (fn: HandleFn) => void
}

interface Command {
  requiredFacts: Set<string>
  fn: HandleFn
}
