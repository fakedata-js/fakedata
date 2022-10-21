import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'
import BasePlugin, { IPluginInterface } from '../core/base'
import util, { bind, Range } from '../core/util'

export interface INumberOptions {
  min: number
  max: number
}

export default class NumberPlugin extends BasePlugin implements IPluginInterface {
  readonly defaults = {
    min: MIN_NUMBER,
    max: MAX_NUMBER
  }

  @bind
  any (options: Partial<INumberOptions> = {}): number {
    const range = this.fixRange(options)
    return util.randomDouble(range.min, range.max)
  }

  fixRange (range: Partial<Range>): Range {
    return util.fixRange(this.defaults, range)
  }
}
