import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'
import BasePlugin, { IPluginInterface } from '../core/base'
import util, { bind, Range } from '../core/util'
import { IDataProvider } from '../core/provider'

export interface INumberOptions {
  min: number
  max: number
}

export type NumberGenratorFn = (options?: Partial<INumberOptions>) => number
export default class NumberPlugin extends BasePlugin implements IPluginInterface {
  readonly defaults = {
    min: MIN_NUMBER,
    max: MAX_NUMBER
  }

  constructor (provider: IDataProvider) {
    super(provider)
    this.expose('with', this.with)
    this.expose('positive', this.with({ min: 0 }))
    this.expose('negative', this.with({ max: -1 }))
  }

  @bind
  any (options: Partial<INumberOptions> = {}): number {
    const range = this.fixRange(options)
    return this.provider.random(range.min, range.max)
  }

  @bind
  with (options: Partial<INumberOptions>): NumberGenratorFn {
    return (overrides: Partial<INumberOptions> = {}) => this.any(util.extend({}, options, overrides))
  }

  fixRange (range: Partial<Range>): Range {
    return util.fixRange(this.defaults, range)
  }
}

export interface INumberGenrator<T = INumberOptions> {
  (options?: Partial<T>): number
  with: (options: Partial<T>) => NumberGenratorFn
  positive: (options?: Partial<T>) => NumberGenratorFn
  negative: (options?: Partial<T>) => NumberGenratorFn
}
