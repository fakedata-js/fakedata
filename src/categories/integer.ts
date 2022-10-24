import { bind, Range } from '../core/util'
import NumberPlugin, { INumberOptions } from './number'

export interface IntegerOptions extends INumberOptions {
  digits?: number
}

export default class IntegerPlugin extends NumberPlugin {
  @bind
  any (options: Partial<IntegerOptions> = {}): number {
    let range
    if (options.digits != null && options.digits !== 0) {
      range = this.getRangeFromDigits(options.digits)
    } else {
      range = this.fixRange(options)
    }
    return this.provider.randomInt(range.min, range.max)
  }

  getRangeFromDigits (digits: number): Range {
    const min = Math.pow(10, digits - 1)
    const max = Math.pow(10, digits) - 1
    return { min, max }
  }
}
