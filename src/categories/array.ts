import BasePlugin, { GeneratorFn, MultiValueInterface } from '../core/base'
import util, { bind } from '../util'

export interface IArrayOptions<T = any> {
  length: number
  fn: GeneratorFn<T>
}

export default class ArrayPlugin extends BasePlugin<IArrayOptions> implements MultiValueInterface {
  @bind
  any<T>(length: number, fn: GeneratorFn<T>): T[] {
    const opts = this.normalizeOptions({ length, fn })

    return Array(opts.length).fill(undefined).map(() => opts.fn())
  }

  @bind
  with<T>(length: number, fn: GeneratorFn<T>): () => T[] {
    return () => {
      return this.any(length, fn)
    }
  }

  normalizeOptions (options: Partial<IArrayOptions>): IArrayOptions {
    if (options.length == null || typeof options.length !== 'number') {
      throw new Error('Array length must be a number')
    }
    if (options.fn == null || !util.isFunction(options.fn)) {
      throw new Error('Generator must be a function')
    }

    return options as IArrayOptions
  }
}
