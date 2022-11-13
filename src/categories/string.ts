import { DIGITS, LOWER, UPPER } from '../core/constants'
import BasePlugin, { IPluginInterface } from '../core/base'
import util, { bind } from '../core/util'
import { IDataProvider } from '../core/provider'

const TEMPLATE_REGEX = /(\\{)|{([a-zA-Z#]+)}/g

export interface IStringOptions {
  length?: number
  min: number
  max: number
  charset?: string
  upper: boolean
  lower: boolean
  digits: boolean
  hex: boolean
  template: string
}

export type StringGeneratorFn = (options?: Partial<IStringOptions>) => string

export default class StringPlugin extends BasePlugin implements IPluginInterface {
  readonly defaults = {
    min: 2,
    max: 10,
    upper: true,
    lower: true,
    digits: false,
    hex: false
  }

  constructor (provider: IDataProvider) {
    super(provider)

    this.expose('with', this.with)
    this.expose('t', this.fromTemplate)
    this.expose('from', this.from)
  }

  @bind
  any (options: Partial<IStringOptions> = {}): string {
    const opts = this.opts(options)
    if (opts.template != null) {
      return this.from(opts.template)
    }
    const length = opts.length ?? this.provider.randomInt(opts.min, opts.max)
    const charset = this.getCharset(opts)

    const arr = Array(length).fill(undefined).map(() => charset.charAt(this.provider.randomInt(0, charset.length - 1)))
    return arr.join('')
  }

  @bind
  with (options: Partial<IStringOptions>): StringGeneratorFn {
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

  @bind
  from (input: string): string {
    if (input == null) {
      return input
    }
    return input.replace(TEMPLATE_REGEX, (match: string, ...groups: string[]) => {
      const group = groups[0] != null ? groups[0] : groups[1]
      return this.replacer(group)
    })
  }

  @bind
  private replacer (match: string): string {
    if (match.startsWith('\\{')) {
      return '{'
    }
    return match.split('').map((c: string, index: number) => {
      let charset = ''
      if (c === 'a') {
        charset = LOWER
      } else if (c === 'A') {
        charset = UPPER
      } else if (c === '#') {
        charset = DIGITS
      } else {
        return ''
      }
      return this.any({ charset, length: 1 })
    }).join('')
  }
}

/**
 * String generator interface
 */
export interface IStringGenerator {
   /**
   * Generate a random string
   * 
   * @example
   * fake.string() // generate a alpha numeric string with length between 2 and 10
   * 
   * // generate a string which only contains letters 'a', 'b' and 'c' (e.g. abcbbca)
   * fake.string({ charset: 'abc' })
   */
  (options?: Partial<IStringOptions>): string

  with: (options: Partial<IStringOptions>) => StringGeneratorFn
  t(parts: TemplateStringsArray, ...expressions: any): () => string
  from: (template: string) => string
}
