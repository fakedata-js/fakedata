import DataProvider, { IDataProvider } from './core/provider'
import BooleanPlugin, { IBooleanGenerator } from './categories/boolean'
import ArrayPlugin, { IArrayGenerator } from './categories/array'
import IntegerPlugin, { IIntegerGenerator } from './categories/integer'
import NumberPlugin, { INumberGenrator } from './categories/number'
import ObjectPlugin, { IObjectGenerator } from './categories/object'
import StringPlugin, { IStringGenerator } from './categories/string'
import SelectPlugin, { ISelectGenerator } from './categories/select'

export class FakeData {
  private readonly provider: IDataProvider
  bool!: IBooleanGenerator
  int!: IIntegerGenerator
  number!: INumberGenrator
  string!: IStringGenerator
  array!: IArrayGenerator
  object!: IObjectGenerator
  select!: ISelectGenerator

  constructor (provider: IDataProvider) {
    this.provider = provider

    this.initFakers()
  }

  initFakers (): void {
    this.bool = new BooleanPlugin(this.provider).any
    this.int = new IntegerPlugin(this.provider).any as IIntegerGenerator
    this.number = new NumberPlugin(this.provider).any as INumberGenrator
    this.string = new StringPlugin(this.provider).any as IStringGenerator
    this.array = new ArrayPlugin(this.provider).any as IArrayGenerator
    this.object = new ObjectPlugin(this.provider).any as IObjectGenerator
    this.select = new SelectPlugin(this.provider).any as ISelectGenerator
  }
}

/**
 * Default global instance for faker interface
 */
const faker: IFaker = new FakeData(new DataProvider(Math.random))

export default faker

/**
 * Class for creating new Faker instances
 */
export interface IFaker {
  /** Generate a random boolean value */
  bool: IBooleanGenerator
}