import BasePlugin, { GeneratorFn, IPluginInterface } from '../core/base'
import util, { bind } from '../core/util'

export default class FromListPlugin extends BasePlugin implements IPluginInterface {
  @bind
  any<T>(list: T[]): T {
    list = this.opts(list)
    const min = 0; const max = list.length
    const index = util.random(min, max)

    return list[index]
  }

  @bind
  with<T>(list: T[]): GeneratorFn<T> {
    return () => this.any(list)
  }

  opts<T>(list: T[]): T[] {
    if (list == null) {
      throw new Error('List must not be null or undefined')
    }
    if (!Array.isArray(list)) {
      throw new Error(`List must not be an array, found ${typeof list}`)
    }
    if (list.length === 0) {
      throw new Error('List must not be empty')
    }

    return list
  }
}
