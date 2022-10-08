import { DIGITS, LOWER, UPPER } from '../constants/ascii'
import { NormalizedConfig } from '../fake'
import util from '../util'

export interface StringFakeConfig {
  length?: number
  minLength: number
  maxLength: number
  charset: string
}
export const defaults: StringFakeConfig = {
  minLength: 2,
  maxLength: 10,
  charset: LOWER + UPPER + DIGITS
}

type OptionalConfig = Partial<StringFakeConfig>

const normalizeConfig = (config?: OptionalConfig): NormalizedConfig<StringFakeConfig> => {
  const fConfig = util.extend({}, defaults, config ?? { })

  return fConfig
}

export default function StringFake (config?: OptionalConfig): string {
  const fConfig = normalizeConfig(config)
  const length = fConfig.length ?? util.random(fConfig.minLength, fConfig.maxLength)

  const arr = Array(length).fill(undefined).map(() => fConfig.charset.charAt(util.random(0, fConfig.charset.length - 1)))
  return arr.join('')
}
