import BasePlugin, { GeneratorFn, IPluginInterface } from '../core/base'
import util, { bind } from '../core/util'

export interface IObjectOptions {
  [key: string]: any
}

export interface Shape {
  [key: string]: any
}

export class ObjectPlugin extends BasePlugin implements IPluginInterface {
  constructor () {
    super()

    this.expose('with', this.with)
  }

  @bind
  any (options: Partial<IObjectOptions> = {}): Shape {
    const opts = this.opts(options)

    const obj: any = {}
    for (const key in opts) {
      let value; const generator = opts[key]
      if (util.isFunction(generator)) {
        value = generator()
      } else {
        value = generator
      }
      obj[key] = value
    }

    return obj
  }

  @bind
  with (config: IObjectOptions): GeneratorFn<Shape> {
    return () => this.any(config)
  }

  opts (options: IObjectOptions): IObjectOptions {
    if (options == null || typeof options !== 'object' || Array.isArray(options)) {
      throw new Error('config must be an object')
    }
    return options
  }
}

export default new ObjectPlugin()
