import DataProvider, { IDataProvider } from './core/provider'
import bool from './categories/boolean'
import { GeneratorFn } from './core/base'
import array from './categories/array'
import int from './categories/integer'
import num from './categories/number'
import object, { Shape } from './categories/object'
import string from './categories/string'
import select from './categories/select'

export class FakeData {
  private readonly provider: DataProvider
  bool!: GeneratorFn<boolean>
  int!: GeneratorFn<number>
  number!: GeneratorFn<number>
  string!: GeneratorFn<string>
  array!: <T>(size: number, fn: GeneratorFn<T>) => T[]
  object!: <T>(opts: Partial<T>) => Shape
  select!: <T>(list: T[]) => T

  constructor (provider: IDataProvider) {
    this.provider = provider

    this.initFakers()
  }

  initFakers (): void {
    this.bool = bool.any
    this.int = int.any
    this.number = num.any
    this.string = string.any
    this.array = array.any
    this.object = object.any
    this.select = select.any
  }
}

export default new FakeData(new DataProvider())
