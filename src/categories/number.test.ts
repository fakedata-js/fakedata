import { createPlugin } from '../../test/util'
import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'
import Plugin from './number'

const num: Plugin = createPlugin(Plugin)

describe('NumberFake', () => {
    it ('Generates a random number between a range', () => {
        const value = num.any()
        expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
        expect(value).toBeLessThanOrEqual(MAX_NUMBER)
    })

    it('Generates a random number between default min and max range', () => {
        const value = num.any()
        expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
        expect(value).toBeLessThanOrEqual(MAX_NUMBER)
      })
    
      it('Generates a random number between given min value and default max value', () => {
        const value = num.any({ min: 10 })
        expect(value).toBeGreaterThanOrEqual(10)
        expect(value).toBeLessThanOrEqual(MAX_NUMBER)
      })
    
      it('Generates a random number between default min value and given max value', () => {
        const value = num.any({ max: 10 })
        expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
        expect(value).toBeLessThanOrEqual(10)
      })
    
      it('Generates a random number between given min and max values', () => {
        const value = num.any({ min: 20, max: 25 })
        expect(value).toBeGreaterThanOrEqual(20)
        expect(value).toBeLessThanOrEqual(25)
      })
    
      it('Generates same value when min and max values are same', () => {
        const value = num.any({ min: 25, max: 25 })
        expect(value).toEqual(25)
      })
    
      it('Throws error when min value is greater than max value', () => {
        expect(() => num.any({ min: 25, max: 20 })).toThrowError()
      })

      it('Generates number from aliased generator', () => {
        const alias = num.any.with({ min: 20, max: 25 })
        const value = alias()
        expect(value).toBeGreaterThanOrEqual(20)
        expect(value).toBeLessThanOrEqual(25)
      })

      it ('Generate positive numbers from alias', () => {
        expect(num.any.positive()).toBeGreaterThanOrEqual(0)
      })

      it ('Generate negative numbers from alias', () => {
        expect(num.any.negative()).toBeLessThan(0)
      })

      it ('Override options in aliased generator', () => {
        const alias = num.any.with({ min: 0, max: 25 })
        const value = alias({ min: 30, max: 40 })
        expect(value).toBeGreaterThanOrEqual(30)
        expect(value).toBeLessThanOrEqual(40)
      })
})