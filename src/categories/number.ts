import { FromObject, NormalizedConfig } from '../fake'
import util from '../util'

export const defaults = {
  min: -10000000,
  max: 10000000
}

export type NumberFakeConfig = FromObject<typeof defaults>
type OptionalConfig = Partial<NumberFakeConfig>

const normalizeConfig = (config?: OptionalConfig): NormalizedConfig<NumberFakeConfig> => {
  const fConfig: NormalizedConfig<NumberFakeConfig> = util.extend({ }, defaults, config ?? {})

  const { min, max } = util.fixRange(defaults, config)
  fConfig.min = min
  fConfig.max = max
  fConfig.normalized = true

  return fConfig
}

export default function NumberFake (config?: OptionalConfig): number {
  const fConfig = normalizeConfig(config)
  return util.randomDouble(fConfig.min, fConfig.max)
}
