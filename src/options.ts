export interface FuseeOptions {
  /* Is the project using React? */
  react?: boolean
}

export type HydratedFuseeOptions = Required<FuseeOptions>

export function hydrateOptions(options: FuseeOptions): HydratedFuseeOptions {
  return {
    react: options.react ?? false,
  }
}
