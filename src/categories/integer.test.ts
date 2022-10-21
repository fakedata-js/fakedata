import IntegerFake from './integer'

import util from '../core/util'
import FakeDataProvider from '../core/provider'
import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'

const newFaker = (opts?) => new IntegerFake(new FakeDataProvider).any(opts)

describe('Tests Interger fake generator', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('Generates a random integer between default min and max range', () => {
    const value = newFaker()
    expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
    expect(value).toBeLessThanOrEqual(MAX_NUMBER)
  })

  it('Generates a random integer between given min value and default max value', () => {
    const value = newFaker({ min: 10 })
    expect(value).toBeGreaterThanOrEqual(10)
    expect(value).toBeLessThanOrEqual(MAX_NUMBER)
  })

  it('Generates a random integer between default min value and given max value', () => {
    const value = newFaker({ max: 10 })
    expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
    expect(value).toBeLessThanOrEqual(10)
  })

  it('Generates a random integer between given min and max values', () => {
    const value = newFaker({ min: 20, max: 25 })
    expect(value).toBeGreaterThanOrEqual(20)
    expect(value).toBeLessThanOrEqual(25)
  })

  it('Generates same value when min and max values are same', () => {
    const value = newFaker({ min: 25, max: 25 })
    expect(value).toEqual(25)
  })

  it('Throws error when min value is greater than max value', () => {
    expect(() => newFaker({ min: 25, max: 20 })).toThrowError()
  })
})