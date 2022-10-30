import BasePlugin, { IPluginInterface } from '../core/base'
import { IDataProvider } from '../core/provider'
import { bind } from '../core/util'

export interface ISelectOptions<T> {
  list: T[]
  length: number
}

export type SelectGeneratorFn<T> = (length?: number) => T | T[]

export default class SelectPlugin extends BasePlugin implements IPluginInterface {
  constructor (provider: IDataProvider) {
    super(provider)

    this.expose('with', this.with)
  }

  @bind
  any<T>(list: T[], length: number = 1): T | T[] {
    const opts = this.opts({ list, length })
    const min = 0; const max = opts.list.length
    const index = this.provider.randomInt(min, max)

    const getOne = (): T => {
      return opts.list[index]
    }
    if (opts.length === 1) {
      return getOne()
    } else {
      return Array(opts.length).fill(undefined).map(getOne)
    }
  }

  @bind
  with<T>(list: T[], length: number = 1): SelectGeneratorFn<T> {
    return (overrides?: number) => this.any(list, overrides ?? length)
  }

  opts<T>(opts: ISelectOptions<T>): ISelectOptions<T> {
    if (opts.list == null) {
      throw new Error('List must not be null or undefined')
    }
    if (!Array.isArray(opts.list)) {
      throw new Error(`List must not be an array, found ${typeof opts.list}`)
    }
    if (opts.list.length === 0) {
      throw new Error('List must not be empty')
    }
    if (opts.length < 0) {
      throw new Error('length cannot be negative')
    }

    return opts
  }
}

export interface ISelectGenerator {
  <T>(list: T[], length?: number): T | T[]
  with: <T>(list: T[], length?: number) => SelectGeneratorFn<T>
}
