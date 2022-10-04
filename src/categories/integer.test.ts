import IntegerFake, { defaults } from './integer'

import util from '../util'

describe('Tests Interger fake generator', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('Generates a random integer between default min and max range', () => {
    const value = IntegerFake()
    expect(value).toBeGreaterThanOrEqual(defaults.min)
    expect(value).toBeLessThanOrEqual(defaults.max)
  })

  it('Generates a random integer between given min value and default max value', () => {
    const value = IntegerFake({ min: 10 })
    expect(value).toBeGreaterThanOrEqual(10)
    expect(value).toBeLessThanOrEqual(defaults.max)
  })

  it('Generates a random integer between default min value and given max value', () => {
    const value = IntegerFake({ max: 10 })
    expect(value).toBeGreaterThanOrEqual(defaults.min)
    expect(value).toBeLessThanOrEqual(10)
  })

  it('Generates a random integer between given min and max values', () => {
    const value = IntegerFake({ min: 20, max: 25 })
    expect(value).toBeGreaterThanOrEqual(20)
    expect(value).toBeLessThanOrEqual(25)
  })

  it('Generates same value when min and max values are same', () => {
    const value = IntegerFake({ min: 25, max: 25 })
    expect(value).toEqual(25)
  })

  it('When min value is greater than max value then default max value is used', () => {
    const value = IntegerFake({ min: 25, max: 20 })
    expect(value).toBeGreaterThanOrEqual(25)
    expect(value).toBeLessThanOrEqual(defaults.max)
  })

  describe('Tests hexadecimal format', () => {
    it('Generates value in hex format for positive numbers', () => {
      jest.spyOn(util, 'random').mockReturnValueOnce(21231)
      const value = IntegerFake.hex()
      expect(`${value}`).toEqual('0x52ef')
    })

    it('Generates value in hex format for positive numbers', () => {
      jest.spyOn(util, 'random').mockReturnValueOnce(-21231)
      const value = IntegerFake.hex()
      expect(`${value}`).toEqual('0xffffad11')
    })

    it('Adds 0 padding when hex value has less characters than padding', () => {
      jest.spyOn(util, 'random').mockReturnValueOnce(21231)
      const value = IntegerFake.hex({ padding: 6 })
      expect(`${value}`).toEqual('0x0052ef')
    })

    it('Does not add any padding when padding length is less than 0', () => {
      jest.spyOn(util, 'random').mockReturnValueOnce(21231)
      const value = IntegerFake.hex({ padding: -8 })
      expect(`${value}`).toEqual('0x52ef')
    })

    it('Generates hex value in with uppercase characters', () => {
      jest.spyOn(util, 'random').mockReturnValueOnce(21231)
      const value = IntegerFake.hex({ upper: true })
      expect(`${value}`).toEqual('0x52EF')
    })
  })
})