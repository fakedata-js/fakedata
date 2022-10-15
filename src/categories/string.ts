import { DIGITS, LOWER, UPPER } from '../constants/ascii'
import { normalizeConfig } from '../fake'
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
  const fConfig = normalizeConfig(defaults, config)
  const length = fConfig.length ?? util.random(fConfig.min, fConfig.max)
  const charset = getCharset(fConfig)

  const arr = Array(length).fill(undefined).map(() => charset.charAt(util.random(0, charset.length - 1)))
  return arr.join('')
}

StringFake.t = function (parts: TemplateStringsArray, ...expressions: any) {
  return () => {
    return parts.reduce((all, part, index) => {
      let value = ''
      if (index < expressions.length) {
        if (typeof expressions[index] === 'function') {
          value = expressions[index].call(expressions[index])
        } else {
          value = expressions[index]
        }
      }
      all += part + value
      return all
    }, '')
  }
}
