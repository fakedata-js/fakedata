import { FromObject } from '../fake'
import util from '../util'

export const defaults = {
  min: -10000000,
  max: 10000000,
}

export type IntFakeConfig = FromObject<typeof defaults>

export default function IntegerFake (config?: IntFakeConfig) {
  const fConfig = util.extend({}, defaults, config)

  if (fConfig.min > fConfig.max) {
    fConfig.max = defaults.max
  }

  return util.random(fConfig.max, fConfig.min)
}