import NumberFake, { defaults } from './number'

describe('NumberFake', () => {
    it ('Generates a random number between a range', () => {
        const value = NumberFake()
        expect(value).toBeGreaterThanOrEqual(defaults.min)
        expect(value).toBeLessThanOrEqual(defaults.max)
    })

    it('Generates a random number between default min and max range', () => {
        const value = NumberFake()
        expect(value).toBeGreaterThanOrEqual(defaults.min)
        expect(value).toBeLessThanOrEqual(defaults.max)
      })
    
      it('Generates a random number between given min value and default max value', () => {
        const value = NumberFake({ min: 10 })
        expect(value).toBeGreaterThanOrEqual(10)
        expect(value).toBeLessThanOrEqual(defaults.max)
      })
    
      it('Generates a random number between default min value and given max value', () => {
        const value = NumberFake({ max: 10 })
        expect(value).toBeGreaterThanOrEqual(defaults.min)
        expect(value).toBeLessThanOrEqual(10)
      })
    
      it('Generates a random number between given min and max values', () => {
        const value = NumberFake({ min: 20, max: 25 })
        expect(value).toBeGreaterThanOrEqual(20)
        expect(value).toBeLessThanOrEqual(25)
      })
    
      it('Generates same value when min and max values are same', () => {
        const value = NumberFake({ min: 25, max: 25 })
        expect(value).toEqual(25)
      })
    
      it('When min value is greater than max value then default max value is used', () => {
        const value = NumberFake({ min: 25, max: 20 })
        expect(value).toBeGreaterThanOrEqual(25)
        expect(value).toBeLessThanOrEqual(defaults.max)
      })
})