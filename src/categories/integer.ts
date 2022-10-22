import { MAX_NUMBER } from '../core/constants'
import util, { bind } from '../core/util'
import NumberPlugin, { INumberOptions } from './number'

export interface IntegerOptions extends INumberOptions {
  digits?: number
}

export default class IntegerPlugin extends NumberPlugin {
  @bind
  any (options: Partial<IntegerOptions> = {}): number {
    const range = this.getRangeFromDigits(options.digits) || this.fixRange(options)
    return util.random(range.min, range.max)
  }

  getRangeFromDigits(digits?: number) {
    if (!digits) {
      return
    }
    const min = Math.pow(10, digits - 1), max = Math.pow(10, digits) - 1
    return { min, max }
  }
}
