import DataProvider, { IDataProvider } from './core/provider'
import BooleanFake from './categories/boolean'
import { GeneratorFn } from './core/base'
import ArrayFake from './categories/array'
import IntegerFake from './categories/integer'
import NumberFake, { INumberOptions } from './categories/number'
import ObjectFake, { IObjectOptions, Shape } from './categories/object'
import StringFake, { IStringOptions } from './categories/string'
import FromList from './categories/from'

export class FakeData {
  private readonly provider: DataProvider
  bool!: () => boolean
  int!: (opts?: INumberOptions) => number
  number!: (opts?: INumberOptions) => number
  string!: (opts?: IStringOptions) => string
  array!: <T>(size: number, fn: GeneratorFn<T>) => T[]
  object!: (opts?: IObjectOptions) => Shape
  from!: <T>(list: T[]) => T

  constructor (provider: IDataProvider) {
    this.provider = provider

    this.initFakers()
  }

  initFakers (): void {
    this.bool = new BooleanFake(this.provider).any
    this.int = new IntegerFake(this.provider).any
    this.number = new NumberFake(this.provider).any
    this.string = new StringFake(this.provider).any
    this.array = new ArrayFake(this.provider).any
    this.object = new ObjectFake(this.provider).any
    this.from = new FromList(this.provider).any
  }
}

export default new FakeData(new DataProvider())
