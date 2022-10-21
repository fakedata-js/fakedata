import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'
import BasePlugin, { SingleValueInterface } from '../core/base'
import util, { bind, Range } from '../util'

export interface INumberOptions {
  min: number
  max: number
}

export default class NumberPlugin extends BasePlugin<INumberOptions> implements SingleValueInterface<number, INumberOptions> {
  @bind
  any (options: Partial<INumberOptions> = {}): number {
    const range = this.fixRange(options)
    return util.randomDouble(range.min, range.max)
  }

  initDefaults (): void {
    super.initDefaults()
    this.defaults = util.extend(this.defaults, {
      min: MIN_NUMBER,
      max: MAX_NUMBER
    })
  }

  fixRange (range: Partial<Range>): Range {
    return util.fixRange(this.defaults, range)
  }
}
