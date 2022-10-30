import BasePlugin, { IPluginInterface } from '../core/base'
import { IDataProvider } from '../core/provider'
import util, { bind } from '../core/util'

export interface IObjectOptions {
  [key: string]: any
}

export interface Shape {
  [key: string]: any
}

export type ObjectGeneratorFn = (options?: IObjectOptions) => Shape

export default class ObjectPlugin extends BasePlugin implements IPluginInterface {
  constructor (provider: IDataProvider) {
    super(provider)

    this.expose('with', this.with)
  }

  @bind
  any (options: IObjectOptions = {}): Shape {
    const opts = this.opts(options)
    const _process = (partial: Partial<IObjectOptions>): Shape => {
      const obj: any = {}
      for (const key in partial) {
        let value; const generator = partial[key]
        if (util.isFunction(generator)) {
          value = generator()
        } else if (util.isObject(generator)) {
          value = _process(generator)
        } else {
          value = generator
        }
        obj[key] = value
      }

      return obj
    }

    return _process(opts)
  }

  @bind
  with (options: IObjectOptions): ObjectGeneratorFn {
    return (overrides: IObjectOptions = {}) => this.any(util.extend({}, options, overrides))
  }

  opts (options: IObjectOptions): IObjectOptions {
    if (options == null || typeof options !== 'object' || Array.isArray(options)) {
      throw new Error('config must be an object')
    }
    return options
  }
}

export interface IObjectGenerator {
  (options?: IObjectOptions): Shape
  with: (options: IObjectOptions) => ObjectGeneratorFn
}
