import { FromObject, NormalizedConfig } from '../fake'
import util from '../util'

export const defaults = {
  min: -10000000,
  max: 10000000,
  padding: 0,
  upper: false
}

export type IntFakeConfig = FromObject<typeof defaults>
type OptionalConfig = Partial<IntFakeConfig>

const normalizeConfig = (config?: OptionalConfig) => {
  const fConfig: NormalizedConfig<IntFakeConfig> = util.extend({ }, defaults, config || {})

  if (fConfig.normalized) {
    return fConfig
  }
  if (fConfig.min > fConfig.max) {
    fConfig.max = defaults.max
  }
  if (fConfig.padding < 0) {
    fConfig.padding = 0
  }
  fConfig.normalized = true

  return fConfig
}

export default function IntegerFake (config?: OptionalConfig) {
  const fConfig = normalizeConfig(config)
  return util.random(fConfig.min, fConfig.max)
}

IntegerFake.hex = (config?: OptionalConfig) => {
  const fConfig = normalizeConfig(config)

  let value = IntegerFake(fConfig)

  if (value < 0) {
    value = value>>>0
  }
  let valueStr = value.toString(16)

  if (fConfig.upper) {
    valueStr = valueStr.toUpperCase()
  }
  const paddingStr = '0'.repeat(fConfig.padding < valueStr.length ? 0 : fConfig.padding - valueStr.length)

  return `0x${paddingStr}${valueStr}`
}

