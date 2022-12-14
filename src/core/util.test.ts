import util from './util'

describe('Tests utility', () => {
    describe('fixRange', () => {
        it ('Returns default range when min and max values are not given', () => {
            const { min, max } = util.fixRange( { min: 2, max: 10 })

            expect(min).toBe(2)
            expect(max).toBe(10)
        })

        it ('Returns default range when min and max values are set to undefined given', () => {
            const { min, max } = util.fixRange( { min: 2, max: 10 }, { min: undefined, max: undefined })

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

    describe('cleanObject', () => {
        it ('Removes all properties with values undefined or null', () => {
            expect(util.clean({ a: 'a', b: undefined, c: null, d: 1 })).toStrictEqual({ a: 'a', d: 1})
        })
        it ('Removes all properties from array', () => {
            expect(util.clean([
                { a: 'a', b: undefined, c: null, d: 1 },
                { a: 'b', b: undefined, c: null, d: 2 }
            ])).toStrictEqual([{ a: 'a', d: 1 }, { a: 'b', d: 2 }])
        })
        
        it ('Removes all nested properties with values undefined or null', () => {
            expect(util.clean({
                a: 'a',
                b: {
                    k1: undefined,
                    k2: 12,
                    k3: [
                        { a: 'a', b: undefined, c: null, d: 1 },
                    ]
                },
                c: null,
                d: 1
            })).toStrictEqual({ a: 'a', b: { k2: 12, k3: [{ a: 'a', d: 1 }]}, d: 1})
        })

        it ('Does not remove nested properties when deep is set to false', () => {
            expect(util.clean({
                a: 'a',
                b: {
                    k1: undefined,
                    k2: 12,
                },
                c: null,
                d: 1
            }, false)).toStrictEqual({
                a: 'a',
                b: {
                    k1: undefined,
                    k2: 12,
                },
                d: 1
            })
        })
    })
})