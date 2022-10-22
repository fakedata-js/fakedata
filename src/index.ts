import DataProvider, { IDataProvider } from './core/provider'
import bool from './categories/boolean'
import { GeneratorFn } from './core/base'
import array from './categories/array'
import int from './categories/integer'
import num from './categories/number'
import object, { Shape } from './categories/object'
import string from './categories/string'
import from from './categories/from'

export class FakeData {
  private readonly provider: DataProvider
  bool!: GeneratorFn<boolean>
  int!: GeneratorFn<number>
  intWith!: GeneratorFn<() => number>
  number!: GeneratorFn<number>
  numberWith!: GeneratorFn<() => number>
  string!: GeneratorFn<string>
  stringWith!: GeneratorFn<() => string>
  array!: <T>(size: number, fn: GeneratorFn<T>) => T[]
  arrayWith!: <T>(size: number, fn: GeneratorFn<T>) => (() => T[])
  object!: <T>(opts: Partial<T>) => Shape
  objectWith!: <T>(opts: Partial<T>) => GeneratorFn<Shape>
  from!: <T>(list: T[]) => T
  fromWith!: <T>(list: T[]) => (() => T)

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
    this.from = from.any
  }
}

export default new FakeData(new DataProvider())
