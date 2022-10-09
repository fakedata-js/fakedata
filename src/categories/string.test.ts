import { DIGITS, LOWER, UPPER } from "../constants/ascii";
import StringFake, { defaults, getCharset, normalizeConfig } from "./string";

describe('StringFake', () => {
    it ('Generates a string of length betwwen default range', () => {
        const value = StringFake()

        expect(value).toBeTruthy()
        expect(value.length).toBeGreaterThanOrEqual(defaults.min)
        expect(value.length).toBeLessThanOrEqual(defaults.max)
    })

    it ('Generates a string of fixed length when length is given', () => {
        const value = StringFake({ length: 20 })
        expect(value).toHaveLength(20)
    })
    describe('normalizeConfig', () => {
        it('Removes undefined and null values before normalization', () => {
            const config = normalizeConfig({  upper: undefined, lower: undefined, digits: undefined })
            expect(config).toMatchObject({
                upper: true,
                lower: true,
                digits: true
            })
        })
    })
    
    describe('getCharset', () => {
        it ('Returns charset as it is when supplied by user', () => {
            const expected = 'ABCD'
            expect(getCharset({ ...defaults, charset: expected })).toEqual(expected)
        })
    
        it ('Returns default charset when charset, upper, lower and digits options are not set', () => {
            const expected = LOWER + UPPER + DIGITS
            expect(getCharset({ ...defaults })).toEqual(expected)
        })
    
        it.each`
        upper|lower|digits|expected
        ${false}|${true}|${true}|${LOWER+DIGITS}
        ${true}|${false}|${true}|${UPPER+DIGITS}
        ${true}|${true}|${false}|${LOWER+UPPER}
        ${false}|${false}|${true}|${DIGITS}
        ${false}|${true}|${false}|${LOWER}
        ${true}|${false}|${false}|${UPPER}
        ` ('When upper=$upper, lower=$lower and digits=$digits then charset should be $expected', ({ upper, lower, digits, expected}) => {
            expect(getCharset({ ...defaults, upper, lower, digits })).toEqual(expected)
        })
    
        it('Throws error when upper, lower and digits all are set to false', () => {
            expect(() => getCharset({ ...defaults, upper: false, lower: false, digits: false })).toThrowError()
        })
    })
})