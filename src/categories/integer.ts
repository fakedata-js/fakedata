import util, { bind } from '../util'
import NumberPlugin, { INumberOptions } from './number'

export default class IntegerPlugin extends NumberPlugin {
  @bind
  any (options: Partial<INumberOptions> = {}): number {
    const range = this.fixRange(options)

    return util.random(range.min, range.max)
  }
}
