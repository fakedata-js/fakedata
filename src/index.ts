import DataProvider, { IDataProvider, RandomGenerator } from './core/provider'
import BooleanPlugin, { IBooleanGenerator } from './categories/boolean'
import ArrayPlugin, { IArrayGenerator } from './categories/array'
import IntegerPlugin, { IIntegerGenerator } from './categories/integer'
import NumberPlugin, { INumberGenrator } from './categories/number'
import ObjectPlugin, { IObjectGenerator } from './categories/object'
import StringPlugin, { IStringGenerator } from './categories/string'
import SelectPlugin, { ISelectGenerator } from './categories/select'
import MersenneTwister from 'mersenne-twister'

export class FakeData {
  private provider!: IDataProvider
  private generator!: MersenneTwister
  private _seed!: number

  bool!: IBooleanGenerator
  int!: IIntegerGenerator
  number!: INumberGenrator
  string!: IStringGenerator
  array!: IArrayGenerator
  object!: IObjectGenerator
  select!: ISelectGenerator

  constructor (fn?: RandomGenerator) {
    this.init(fn)
    this.initFakers()
  }

  init (fn?: RandomGenerator): void {
    const seed = Date.now()
    this.generator = new MersenneTwister(seed)
    this.seed(seed)

    const provider: IDataProvider = new DataProvider(fn != null ? fn : this.generator.random.bind(this.generator))
    this.provider = provider
  }

  seed (seed: number): void {
    this._seed = seed
    this.generator.init_seed(seed)
  }

  reset (): void {
    this.seed(this._seed)
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
