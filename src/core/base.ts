import { IFakeDataProvider } from './provider'
import util from '../util'

export const normalizeConfig = <T>(defaults: T, config?: Partial<T>): T => {
  return util.extend({}, defaults, util.clean(config))
}

export type GeneratorFn<T> = (options?: {}) => T

export interface IPluginInterface {
  any: Function
}

export default abstract class BasePlugin {
  protected readonly provider: IFakeDataProvider
  readonly defaults = {}

  constructor (provider: IFakeDataProvider) {
    this.provider = provider
  }

  opts (options: any): any {
    return util.extend({}, this.defaults, util.clean(options))
  }
}
