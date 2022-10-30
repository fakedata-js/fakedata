import { createPlugin } from "../../test/util";
import { DIGITS, LOWER, UPPER } from "../core/constants";
import Plugin, { IStringGenerator } from "./string";

const plugin: Plugin = createPlugin(Plugin)
const string: IStringGenerator = plugin.any

describe('StringFake', () => {
    it ('Generates a string of length betwwen default range', () => {
        const value = string()

        expect(value).toBeTruthy()
        expect(value.length).toBeGreaterThanOrEqual(plugin.defaults.min)
        expect(value.length).toBeLessThanOrEqual(plugin.defaults.max)
    })

    it ('Generates a string of fixed length when length is given', () => {
        const value = string({ length: 20 })
        expect(value).toHaveLength(20)
    })

    it ('Throws error when string length is negative', () => {
        expect(() => string({ length: -10 })).toThrowError()
    })

    it ('Generates a string from aliased generator', () => {
        const alias = string.with({ length: 20 })
        expect(alias()).toHaveLength(20)
    })

    it ('Override option in aliased generator', () => {
        const alias = string.with({ length: 20 })
        expect(alias({ length: 10 })).toHaveLength(10)
    })

    describe('getCharset', () => {
        it ('Returns charset as it is when supplied by user', () => {
            const expected = 'ABCD'
            expect(plugin.getCharset(plugin.opts({ charset: expected }))).toEqual(expected)
        })
    
        it ('Returns default charset when charset, upper, lower and digits options are not set', () => {
            const expected = LOWER + UPPER
            expect(plugin.getCharset(plugin.opts({ }))).toEqual(expected)
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
            expect(plugin.getCharset(plugin.opts({ upper, lower, digits }))).toEqual(expected)
        })

        it ('Returns charset for containing A-F and 0-9 when hex is set to true', () => {
            expect(plugin.getCharset(plugin.opts({ hex: true }))).not.toMatch(/[^A-F0-9]/)
        })
    
        it ('Returns charset for containing a-f and 0-9 when in lower case hex is set to true and upper is set to false', () => {
            expect(plugin.getCharset(plugin.opts({ hex: true, upper: false }))).not.toMatch(/[^a-f0-9]/)
        })
    
        it('Throws error when upper, lower and digits all are set to false', () => {
            expect(() => plugin.getCharset(plugin.opts({ upper: false, lower: false, digits: false }))).toThrowError()
        })
    })

    describe('String template', () => {
        it('Generates string without an placeholder', () => {
            const alias = string.t`Hello world`
            expect(alias()).toEqual('Hello world')
        })

        it('Generates string with one string placeholder', () => {
            const alias = string.t`Hello ${string}`
            expect(alias()).toMatch(/Hello [a-zA-Z]+/)
        })

        it('Generates string with multiple placeholders', () => {
            const alias = string.t`My name is ${string} and I live in ${string}`
            expect(alias()).toMatch(/My name is [a-zA-Z]+ and I live in [a-zA-Z]+/)
        })

        it('Generates string with multiple placeholders starting from a placeholder', () => {
            const alias = string.t`${string}: Do something amazing, like ${string}`
            expect(alias()).toMatch(/[a-zA-Z]+: Do something amazing, like [a-zA-Z]+/)
        })
        
        it('If placeholder contains a constant then values is used as is', () => {
            const alias = string.t`My name is ${'Vikash'} and I live in ${'India'}`
            expect(alias()).toEqual('My name is Vikash and I live in India')
        })

        it('Generates different strings each time', () => {
            const alias = string.t`My name is ${string} and I live in ${string}`
            const str1 = alias(), str2 = alias(), str3 = alias()

            expect(str1).not.toEqual(str2)
            expect(str1).not.toEqual(str3)
            expect(str2).not.toEqual(str3)
        })
    })
})