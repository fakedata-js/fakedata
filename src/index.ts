import FakeDataProvider, { IFakeDataProvider } from './core/provider'
import BooleanFake from './categories/boolean'
import { GeneratorFn } from './core/base'
import ArrayFake from './categories/array'
import IntegerFake from './categories/integer'
import NumberFake, { INumberOptions } from './categories/number'
import ObjectFake, { IObjectOptions, Shape } from './categories/object'
import StringFake, { IStringOptions } from './categories/string'

export class FakeData {
  private readonly provider: FakeDataProvider
  bool!: () => boolean
  int!: (opts?: INumberOptions) => number
  number!: (opts?: INumberOptions) => number
  string!: (opts?: IStringOptions) => string
  array!: <T>(size: number, fn: GeneratorFn<T>) => T[]
  object!: (opts?: IObjectOptions) => Shape

  constructor (provider: IFakeDataProvider) {
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
  }
}

export default new FakeData(new FakeDataProvider())
