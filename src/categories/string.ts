import { DIGITS, LOWER, UPPER } from '../core/constants'
import BasePlugin, { GeneratorFn, IPluginInterface } from '../core/base'
import util, { bind } from '../core/util'

export interface IStringOptions {
  length?: number
  min: number
  max: number
  charset?: string
  upper: boolean
  lower: boolean
  digits: boolean
  hex: boolean
}

export class StringPlugin extends BasePlugin implements IPluginInterface {
  readonly defaults = {
    min: 2,
    max: 10,
    upper: true,
    lower: true,
    digits: false,
    hex: false
  }

  constructor () {
    super()

    this.expose('with', this.with)
    this.expose('t', this.fromTemplate)
  }

  @bind
  any (options: Partial<IStringOptions> = {}): string {
    const opts = this.opts(options)
    const length = opts.length ?? util.random(opts.min, opts.max)
    const charset = this.getCharset(opts)

    const arr = Array(length).fill(undefined).map(() => charset.charAt(util.random(0, charset.length - 1)))
    return arr.join('')
  }

  @bind
  with (options: Partial<IStringOptions>): GeneratorFn<string> {
    return (overrides: Partial<IStringOptions> = {}) => this.any(util.extend({}, options, overrides))
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

  opts (options: Partial<IStringOptions>): IStringOptions {
    if (typeof options.length === 'number' && options.length < 0) {
      throw new Error('String length cannot be negative')
    }
    return super.opts(options)
  }

  getCharset (opts: IStringOptions): string {
    let charset = opts.charset

    if (charset != null) {
      return charset
    }
    charset = ''

    const { upper, lower, digits, hex } = opts

    if (!(upper || lower || digits || hex)) {
      throw new Error('One of upper, lower, digits and hex must be set to true.')
    }
    if (hex) {
      if (upper) {
        charset = 'ABCDEF' + DIGITS
      } else {
        charset = 'abcdef' + DIGITS
      }
    } else {
      if (lower) {
        charset += LOWER
      }
      if (upper) {
        charset += UPPER
      }
      if (digits) {
        charset += DIGITS
      }
    }

    return charset
  }
}

export default new StringPlugin()
