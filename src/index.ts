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

  constructor () {
    const provider: IDataProvider = new DataProvider(Math.random)
    this.provider = provider

    this.initFakers()
  }

  initFakers (): void {
    this.provider.set('bool', new BooleanPlugin(this.provider))
    this.provider.set('int', new IntegerPlugin(this.provider))
    this.provider.set('number', new NumberPlugin(this.provider))
    this.provider.set('string', new StringPlugin(this.provider))
    this.provider.set('array', new ArrayPlugin(this.provider))
    this.provider.set('object', new ObjectPlugin(this.provider))
    this.provider.set('select', new SelectPlugin(this.provider))

    this.bool = this.provider.get('bool').any
    this.int = this.provider.get('int').any as IIntegerGenerator
    this.number = this.provider.get('number').any as INumberGenrator
    this.string = this.provider.get('string').any as IStringGenerator
    this.array = this.provider.get('array').any as IArrayGenerator
    this.object = this.provider.get('object').any as IObjectGenerator
    this.select = this.provider.get('select').any as ISelectGenerator
  }
}

export default new FakeData()
