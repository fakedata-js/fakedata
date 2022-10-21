import { MAX_NUMBER, MIN_NUMBER } from '../core/constants'
import DataProvider from '../core/provider'
import NumberFake from './number'

const newFaker = (opts?) => new NumberFake(new DataProvider).any(opts)
describe('NumberFake', () => {
    it ('Generates a random number between a range', () => {
        const value = newFaker()
        expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
        expect(value).toBeLessThanOrEqual(MAX_NUMBER)
    })

    it('Generates a random number between default min and max range', () => {
        const value = newFaker()
        expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
        expect(value).toBeLessThanOrEqual(MAX_NUMBER)
      })
    
      it('Generates a random number between given min value and default max value', () => {
        const value = newFaker({ min: 10 })
        expect(value).toBeGreaterThanOrEqual(10)
        expect(value).toBeLessThanOrEqual(MAX_NUMBER)
      })
    
      it('Generates a random number between default min value and given max value', () => {
        const value = newFaker({ max: 10 })
        expect(value).toBeGreaterThanOrEqual(MIN_NUMBER)
        expect(value).toBeLessThanOrEqual(10)
      })
    
      it('Generates a random number between given min and max values', () => {
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

      it('Generates number from aliased generator', () => {
        const alias = new NumberFake(new DataProvider).with({ min: 20, max: 25 })
        const value = alias()
        expect(value).toBeGreaterThanOrEqual(20)
        expect(value).toBeLessThanOrEqual(25)
      })
})