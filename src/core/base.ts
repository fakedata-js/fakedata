import { IFakeDataProvider } from './provider'
import util from '../util'

export const normalizeConfig = <T>(defaults: T, config?: Partial<T>): T => {
  return util.extend({}, defaults, util.clean(config))
}

export type GeneratorFn<T> = (options?: {}) => T

export interface IFakeDataGenerator {
}

export interface SingleValueInterface<TValue, TOptions> {
  any: (options: Partial<TOptions>) => TValue
}

export interface MultiValueInterface {
  any: <TValue>(size: number, fn: GeneratorFn<TValue>) => TValue[]
}

export default abstract class BasePlugin<TOptions> implements IFakeDataGenerator {
  protected readonly provider: IFakeDataProvider
  protected defaults!: TOptions

  constructor (provider: IFakeDataProvider) {
    this.provider = provider
    this.initDefaults()
  }

  initDefaults (): void {
    this.defaults = {} as TOptions
  }

  normalizeOptions (options: Partial<TOptions>): TOptions {
    return util.extend({}, this.defaults, util.clean(options))
  }
}
