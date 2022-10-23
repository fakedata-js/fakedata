import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'
import BasePlugin, { GeneratorFn, IPluginInterface } from '../core/base'
import util, { bind, Range } from '../core/util'

export interface INumberOptions {
  min: number
  max: number
}

export class NumberPlugin extends BasePlugin implements IPluginInterface {
  readonly defaults = {
    min: MIN_NUMBER,
    max: MAX_NUMBER
  }

  constructor () {
    super()
    this.expose('with', this.with)
    this.expose('positive', this.with({ min: 0 }))
    this.expose('negative', this.with({ max: -1 }))
  }

  @bind
  any (options: Partial<INumberOptions> = {}): number {
    const range = this.fixRange(options)
    return util.randomDouble(range.min, range.max)
  }

  @bind
  with (options: Partial<INumberOptions> = {}): GeneratorFn<number> {
    return () => this.any(options)
  }

  fixRange (range: Partial<Range>): Range {
    return util.fixRange(this.defaults, range)
  }
}

export default new NumberPlugin()
