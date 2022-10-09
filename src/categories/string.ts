import { DIGITS, LOWER, UPPER } from '../constants/ascii'
import { NormalizedConfig } from '../fake'
import util from '../util'

export interface StringFakeConfig {
  length?: number
  min: number
  max: number
  charset?: string
  upper: boolean
  lower: boolean
  digits: boolean
}

export const defaults: StringFakeConfig = {
  min: 2,
  max: 10,
  upper: true,
  lower: true,
  digits: true
}

type OptionalConfig = Partial<StringFakeConfig>

export const normalizeConfig = (config?: OptionalConfig): NormalizedConfig<StringFakeConfig> => {
  const fConfig = util.extend({}, defaults, util.clean(config ?? {}))

  return fConfig
}

export const getCharset = (config: StringFakeConfig): string => {
  let charset = config.charset

  if (charset != null) {
    return charset
  }
  charset = ''

  const { upper, lower, digits } = config

  if (!(upper || lower || digits)) {
    throw new Error('One of upper, lower and digits must be set to true.')
  }
  if (lower) {
    charset += LOWER
  }
  if (upper) {
    charset += UPPER
  }
  if (digits) {
    charset += DIGITS
  }

  return charset
}

export default function StringFake (config?: OptionalConfig): string {
  const fConfig = normalizeConfig(config)
  const length = fConfig.length ?? util.random(fConfig.min, fConfig.max)
  const charset = getCharset(fConfig)

  const arr = Array(length).fill(undefined).map(() => charset.charAt(util.random(0, charset.length - 1)))
  return arr.join('')
}
