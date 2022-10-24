import { createPlugin } from "../../test/util";
import { DIGITS, LOWER, UPPER } from "../core/constants";
import Plugin from "./string";

const faker: Plugin = createPlugin(Plugin)
describe('StringFake', () => {
    it ('Generates a string of length betwwen default range', () => {
        const value = faker.any()

        expect(value).toBeTruthy()
        expect(value.length).toBeGreaterThanOrEqual(faker.defaults.min)
        expect(value.length).toBeLessThanOrEqual(faker.defaults.max)
    })

    it ('Generates a string of fixed length when length is given', () => {
        const value = faker.any({ length: 20 })
        expect(value).toHaveLength(20)
    })

    it ('Throws error when string length is negative', () => {
        expect(() => faker.any({ length: -10 })).toThrowError()
    })

    it ('Generates a string from aliased generator', () => {
        const alias = faker.any.with({ length: 20 })
        expect(alias()).toHaveLength(20)
    })

    it ('Override option in aliased generator', () => {
        const alias = faker.any.with({ length: 20 })
        expect(alias({ length: 10 })).toHaveLength(10)
    })

    describe('getCharset', () => {
        it ('Returns charset as it is when supplied by user', () => {
            const expected = 'ABCD'
            expect(faker.getCharset(faker.opts({ charset: expected }))).toEqual(expected)
        })
    
        it ('Returns default charset when charset, upper, lower and digits options are not set', () => {
            const expected = LOWER + UPPER
            expect(faker.getCharset(faker.opts({ }))).toEqual(expected)
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
            expect(faker.getCharset(faker.opts({ upper, lower, digits }))).toEqual(expected)
        })

        it ('Returns charset for containing A-F and 0-9 when hex is set to true', () => {
            expect(faker.getCharset(faker.opts({ hex: true }))).not.toMatch(/[^A-F0-9]/)
        })
    
        it ('Returns charset for containing a-f and 0-9 when in lower case hex is set to true and upper is set to false', () => {
            expect(faker.getCharset(faker.opts({ hex: true, upper: false }))).not.toMatch(/[^a-f0-9]/)
        })
    
        it('Throws error when upper, lower and digits all are set to false', () => {
            expect(() => faker.getCharset(faker.opts({ upper: false, lower: false, digits: false }))).toThrowError()
        })
    })

    describe('String template', () => {
        it('Generates string without an placeholder', () => {
            const alias = faker.any.t`Hello world`
            expect(alias()).toEqual('Hello world')
        })

        it('Generates string with one string placeholder', () => {
            const alias = faker.any.t`Hello ${faker.any}`
            expect(alias()).toMatch(/Hello [a-zA-Z]+/)
        })

        it('Generates string with multiple placeholders', () => {
            const alias = faker.any.t`My name is ${faker.any} and I live in ${faker.any}`
            expect(alias()).toMatch(/My name is [a-zA-Z]+ and I live in [a-zA-Z]+/)
        })

        it('Generates string with multiple placeholders starting from a placeholder', () => {
            const alias = faker.any.t`${faker.any}: Do something amazing, like ${faker.any}`
            expect(alias()).toMatch(/[a-zA-Z]+: Do something amazing, like [a-zA-Z]+/)
        })
        
        it('If placeholder contains a constant then values is used as is', () => {
            const alias = faker.any.t`My name is ${'Vikash'} and I live in ${'India'}`
            expect(alias()).toEqual('My name is Vikash and I live in India')
        })

        it('Generates different strings each time', () => {
            const alias = faker.any.t`My name is ${faker.any} and I live in ${faker.any}`
            const str1 = alias(), str2 = alias(), str3 = alias()

            expect(str1).not.toEqual(str2)
            expect(str1).not.toEqual(str3)
            expect(str2).not.toEqual(str3)
        })
    })
})