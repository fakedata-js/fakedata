import BasePlugin, { GeneratorFn, IPluginInterface } from '../core/base'
import { IDataProvider } from '../core/provider'
import util, { bind } from '../core/util'

export interface IArrayOptions<T = any> {
  length: number
  fn: GeneratorFn<T>
}

export default class ArrayPlugin extends BasePlugin implements IPluginInterface {
  constructor (provider: IDataProvider) {
    super(provider)

    this.expose('with', this.with)
  }

  @bind
  any<T>(length: number, fn: GeneratorFn<T>): T[] {
    const opts = this.opts({ length, fn })

    return Array(opts.length).fill(undefined).map(() => opts.fn())
  }

  @bind
  with<T>(options: Partial<IArrayOptions<T>>): (overrides: Partial<IArrayOptions<T>>) => T[] {
    return (overrides: Partial<IArrayOptions<T>>) => {
      const opts = util.extend({}, options, overrides)
      return this.any(opts.length, opts.fn)
    }
  }

  opts (options: IArrayOptions): IArrayOptions {
    if (options.length == null || typeof options.length !== 'number') {
      throw new Error('Array length must be a number')
    }
    if (options.fn == null || !util.isFunction(options.fn)) {
      throw new Error('Generator must be a function')
    }

    return options
  }
}
