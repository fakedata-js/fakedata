import { normalizeConfig as _normalizeConfig } from '../fake'
import util from '../util'

export interface IntFakeConfig {
  min: number
  max: number
  padding: number
  upper: boolean
}

export const defaults = {
  min: -10000000,
  max: 10000000,
  padding: 0,
  upper: false
}

type OptionalConfig = Partial<IntFakeConfig>

const normalizeConfig = (config?: OptionalConfig): IntFakeConfig => {
  const fConfig = _normalizeConfig(defaults, config)

  const { min, max } = util.fixRange(defaults, config)
  fConfig.min = min
  fConfig.max = max
  if (fConfig.padding < 0) {
    fConfig.padding = 0
  }

  return fConfig
}

export default function IntegerFake (config?: OptionalConfig): number {
  const fConfig = normalizeConfig(config)
  return util.random(fConfig.min, fConfig.max)
}

IntegerFake.hex = function (config?: OptionalConfig) {
  const fConfig = normalizeConfig(config)

  let value = IntegerFake(fConfig)

  if (value < 0) {
    value = value >>> 0
  }
  let valueStr = value.toString(16)

  if (fConfig.upper) {
    valueStr = valueStr.toUpperCase()
  }
  const paddingStr = '0'.repeat(fConfig.padding < valueStr.length ? 0 : fConfig.padding - valueStr.length)

  return `0x${paddingStr}${valueStr}`
}
