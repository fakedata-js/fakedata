import DataProvider, { IDataProvider } from './core/provider'
import { GeneratorFn } from './core/base'
import BooleanPlugin from './categories/boolean'
import ArrayPlugin from './categories/array'
import IntegerPlugin from './categories/integer'
import NumberPlugin from './categories/number'
import ObjectPlugin, { Shape } from './categories/object'
import StringPlugin from './categories/string'
import SelectPlugin from './categories/select'

export class FakeData {
  private readonly provider: IDataProvider
  bool!: GeneratorFn<boolean>
  int!: GeneratorFn<number>
  number!: GeneratorFn<number>
  string!: GeneratorFn<string>
  array!: <T>(size: number, fn: GeneratorFn<T>) => T[]
  object!: <T>(opts: Partial<T>) => Shape
  select!: <T>(list: T[]) => T | T[]

  constructor (provider: IDataProvider) {
    this.provider = provider

    this.initFakers()
  }

  initFakers (): void {
    this.bool = new BooleanPlugin(this.provider).any
    this.int = new IntegerPlugin(this.provider).any
    this.number = new NumberPlugin(this.provider).any
    this.string = new StringPlugin(this.provider).any
    this.array = new ArrayPlugin(this.provider).any
    this.object = new ObjectPlugin(this.provider).any
    this.select = new SelectPlugin(this.provider).any
  }
}

export default new FakeData(new DataProvider(Math.random))
