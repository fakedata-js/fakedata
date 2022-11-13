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

/**
 * Default global instance for faker interface
 */
const faker: IFaker = new FakeData()

export default faker

/**
 * Class for creating new Faker instances
 */
export interface IFaker {
  /**
   * Generate a random boolean value
   * 
   * @group boolean
   * @example
   * fake.bool() // true or false
   */
  bool: IBooleanGenerator

  /**
   * generate a natural number
   * 
   * @group number
   * @example
   * // generates an integer between -10000000 and 10000000
   * fake.int()
   * 
   * // generate an integer within a custom range
   * fake.int({ min: 0, max: 100 })  // generates a value between 0 and 100
   * fake.int({ min: 0 })            // generates a value between 0 and 10000000
   * fake.int({ max: 0 })            // generates a value between -10000000 and 0
   * 
   * // generate an integer with fix digits
   * // generates a value with 3 digits (i.e. between 100 and 999)
   * fake.int({ digits: 3 })
   */
  int: IIntegerGenerator
  /**
   * Generate a floating point number
   * 
   * @group number
   * @example
   * fake.number() // generates a float between -10000000 and 10000000
   * 
   * // generate a floating point number within a custom range
   * fake.number({ min: 0, max: 100 })  // generates a value between 0 and 100
   * fake.number({ min: 0 })            // generates a value between 0 and 10000000
   * fake.number({ max: 0 })            // generates a value between -10000000 and 0
   */
  number: INumberGenrator

  /**
   * #### fake.string
   * Generate a random string
   * @group string
   * 
   * @example
   * fake.string() // generate a alpha numeric string with length between 2 and 10
   * 
   * // generate a string which only contains letters 'a', 'b' and 'c' (e.g. abcbbca)
   * fake.string({ charset: 'abc' })
   * 
   * #### fake.string.t
   * Generate a custom formatted string using literal string syntax
   * @group string
   * 
   * @example
   * fake.string.t`I have ${fake.int.with({ digits: 1 })} eggs.\`
   * 
   * // Returns a string which looks like
   * 'I have 4 eggs.'
   */
  string: IStringGenerator
}
