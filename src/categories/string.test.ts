import { DIGITS, LOWER, UPPER } from "../constants/ascii";
import StringFake, { defaults, getCharset } from "./string";

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

    describe('String template', () => {
        it('Generates string without an placeholder', () => {
            const alias = StringFake.t`Hello world`
            expect(alias()).toEqual('Hello world')
        })

        it('Generates string with one string placeholder', () => {
            const alias = StringFake.t`Hello ${StringFake}`
            expect(alias()).toMatch(/Hello [a-zA-Z0-9]+/)
        })

        it('Generates string with multiple placeholders', () => {
            const alias = StringFake.t`My name is ${StringFake} and I live in ${StringFake}`
            expect(alias()).toMatch(/My name is [a-zA-Z0-9]+ and I live in [a-zA-Z0-9]+/)
        })

        it('Generates string with multiple placeholders starting from a placeholder', () => {
            const alias = StringFake.t`${StringFake}: Do something amazing, like ${StringFake}`
            expect(alias()).toMatch(/[a-zA-Z0-9]+: Do something amazing, like [a-zA-Z0-9]+/)
        })
        
        it('If placeholder contains a constant then values is used as is', () => {
            const alias = StringFake.t`My name is ${'Vikash'} and I live in ${'India'}`
            expect(alias()).toEqual('My name is Vikash and I live in India')
        })

        it('Generates different strings each time', () => {
            const alias = StringFake.t`My name is ${StringFake} and I live in ${StringFake}`
            const str1 = alias(), str2 = alias(), str3 = alias()

            expect(str1).not.toEqual(str2)
            expect(str1).not.toEqual(str3)
            expect(str2).not.toEqual(str3)
        })
    })
})