import { DIGITS, LOWER, UPPER } from '../core/constants'
import BasePlugin, { SingleValueInterface } from '../core/base'
import util, { bind } from '../util'

export interface IStringOptions {
  length?: number
  min: number
  max: number
  charset?: string
  upper: boolean
  lower: boolean
  digits: boolean
}

export default class StringPlugin extends BasePlugin<IStringOptions> implements SingleValueInterface<string, IStringOptions> {
  @bind
  any (options: Partial<IStringOptions> = {}): string {
    const opts = this.normalizeOptions(options)
    const length = opts.length ?? util.random(opts.min, opts.max)
    const charset = this.getCharset(opts)

    const arr = Array(length).fill(undefined).map(() => charset.charAt(util.random(0, charset.length - 1)))
    return arr.join('')
  }

  @bind
  fromTemplate (parts: TemplateStringsArray, ...expressions: any) {
    return () => {
      return parts.reduce((all, part, index) => {
        let value = ''
        if (index < expressions.length) {
          if (util.isFunction(expressions[index])) {
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

  initDefaults (): void {
    super.initDefaults()
    this.defaults = util.extend(this.defaults, {
      min: 2,
      max: 10,
      upper: true,
      lower: true,
      digits: true
    })
  }

  normalizeOptions (options: Partial<IStringOptions>): IStringOptions {
    if (typeof options.length === 'number' && options.length < 0) {
      throw new Error('String length cannot be negative')
    }
    return super.normalizeOptions(options)
  }

  getCharset (opts: IStringOptions): string {
    let charset = opts.charset

    if (charset != null) {
      return charset
    }
    charset = ''

    const { upper, lower, digits } = opts

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
}
