import DataProvider, { IDataProvider } from './core/provider'
import BooleanFake from './categories/boolean'
import { GeneratorFn } from './core/base'
import ArrayFake from './categories/array'
import IntegerFake from './categories/integer'
import NumberFake from './categories/number'
import ObjectFake, { Shape } from './categories/object'
import StringFake from './categories/string'
import FromList from './categories/from'

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
    this.bool = new BooleanFake(this.provider).any
    this.int = new IntegerFake(this.provider).any
    this.intWith = new IntegerFake(this.provider).with
    this.number = new NumberFake(this.provider).any
    this.numberWith = new NumberFake(this.provider).with
    this.string = new StringFake(this.provider).any
    this.stringWith = new StringFake(this.provider).with
    this.array = new ArrayFake(this.provider).any
    this.arrayWith = new ArrayFake(this.provider).with
    this.object = new ObjectFake(this.provider).any
    this.objectWith = new ObjectFake(this.provider).with
    this.from = new FromList(this.provider).any
    this.fromWith = new FromList(this.provider).with
  }
}

export default new FakeData(new DataProvider())
