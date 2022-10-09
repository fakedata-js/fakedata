import { normalizeConfig as _normalizeConfig } from '../fake'
import util from '../util'

export interface NumberFakeConfig {
  min: number
  max: number
}

export const defaults = {
  min: -10000000,
  max: 10000000
}

type OptionalConfig = Partial<NumberFakeConfig>

const normalizeConfig = (config?: OptionalConfig): NumberFakeConfig => {
  const fConfig = _normalizeConfig(defaults, config)

  const { min, max } = util.fixRange(defaults, config)
  fConfig.min = min
  fConfig.max = max

  return fConfig
}

export default function NumberFake (config?: OptionalConfig): number {
  const fConfig = normalizeConfig(config)
  return util.randomDouble(fConfig.min, fConfig.max)
}
