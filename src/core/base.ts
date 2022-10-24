import { IDataProvider } from './provider'
import util from './util'

export const normalizeConfig = <T>(defaults: T, config?: Partial<T>): T => {
  return util.extend({}, defaults, util.clean(config))
}

export type GeneratorFn<T> = (options?: {}) => T

export interface IPluginInterface {
  any: Function
  with?: Function
}

export default abstract class BasePlugin implements IPluginInterface {
  protected provider: IDataProvider
  readonly defaults = {}

  constructor (provider: IDataProvider) {
    this.provider = provider
  }

  abstract any (...args: any[]): any

  opts (options: any): any {
    return util.extend({}, this.defaults, util.clean(options))
  }

  expose (name: string, fn: Function): void {
    Object.defineProperty(this.any, name, {
      get (): Function {
        return fn
      }
    })
  }
}
