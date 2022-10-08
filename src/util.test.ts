import util from './util'

describe('Tests utility', () => {
    describe('Tests random method', () => {
        it ('Generates random values betwen a range', () => {
            for(let i = 0; i < 10000; i++) {
                const random = util.random(25, 10000000)
                expect(random).toBeGreaterThanOrEqual(25)
                expect(random).toBeLessThanOrEqual(10000000)
            }
        })
    })
    describe('fixRange', () => {
        it ('Returns default range when min and max values are not given', () => {
            const { min, max } = util.fixRange( { min: 2, max: 10 })

            expect(min).toBe(2)
            expect(max).toBe(10)
        })

        it ('Returns default min and given max value when only max value is given', () => {
            const { min, max } = util.fixRange( { min: 2, max: 10 }, { max: 100 })

            expect(min).toBe(2)
            expect(max).toBe(100)
        })

        it ('Returns default max and given min value when only min value is given', () => {
            const { min, max } = util.fixRange( { min: 20, max: 100 }, { min: 1 })

            expect(min).toBe(1)
            expect(max).toBe(100)
        })

        it ('Returns given min and maxl values when both min and max values are given', () => {
            const { min, max } = util.fixRange( { min: 20, max: 100 }, { min: 1, max: 200 })

            expect(min).toBe(1)
            expect(max).toBe(200)
        })

        it ('Throws error when given min value is greater than given max value', () => {
            expect(() => util.fixRange( { min: 20, max: 100 }, { min: 25, max: 20 })).toThrowError()
        })

        it ('When given min values is greater than default max and no max is given then max is set to given min', () => {

            expect(() => util.fixRange( { min: 20, max: 100 }, { min: 200 })).toThrowError()
        })

        it ('When given max values is less than default min and no min is given then min is set to given max', () => {
            expect(() => util.fixRange( { min: 20, max: 100 }, { max: 10 })).toThrowError()
        })
    })
})