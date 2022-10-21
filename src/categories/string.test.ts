import { DIGITS, LOWER, UPPER } from "../core/constants";
import DataProvider from "../core/provider";
import StringFake from "./string";

const newFaker = () => new StringFake(new DataProvider)

describe('StringFake', () => {
    it ('Generates a string of length betwwen default range', () => {
        const faker = newFaker()
        const value = faker.any()

        expect(value).toBeTruthy()
        expect(value.length).toBeGreaterThanOrEqual(faker.defaults.min)
        expect(value.length).toBeLessThanOrEqual(faker.defaults.max)
    })

    it ('Generates a string of fixed length when length is given', () => {
        const faker = newFaker()
        const value = faker.any({ length: 20 })
        expect(value).toHaveLength(20)
    })

    it ('Throws error when string lenght is negative', () => {
        const faker = newFaker()
        expect(() => faker.any({ length: -10 })).toThrowError()
    })

    describe('getCharset', () => {
        it ('Returns charset as it is when supplied by user', () => {
            const expected = 'ABCD'
            const faker = newFaker()
            expect(faker.getCharset(faker.opts({ charset: expected }))).toEqual(expected)
        })
    
        it ('Returns default charset when charset, upper, lower and digits options are not set', () => {
            const expected = LOWER + UPPER + DIGITS
            const faker = newFaker()
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
            const faker = newFaker()
            expect(faker.getCharset(faker.opts({ upper, lower, digits }))).toEqual(expected)
        })
    
        it('Throws error when upper, lower and digits all are set to false', () => {
            const faker = newFaker()
            expect(() => faker.getCharset(faker.opts({ upper: false, lower: false, digits: false }))).toThrowError()
        })
    })

    describe('String template', () => {
        it('Generates string without an placeholder', () => {
            const faker = newFaker()
            const alias = faker.fromTemplate`Hello world`
            expect(alias()).toEqual('Hello world')
        })

        it('Generates string with one string placeholder', () => {
            const faker = newFaker()
            const alias = faker.fromTemplate`Hello ${faker.any}`
            expect(alias()).toMatch(/Hello [a-zA-Z0-9]+/)
        })

        it('Generates string with multiple placeholders', () => {
            const faker = newFaker()
            const alias = faker.fromTemplate`My name is ${faker.any} and I live in ${faker.any}`
            expect(alias()).toMatch(/My name is [a-zA-Z0-9]+ and I live in [a-zA-Z0-9]+/)
        })

        it('Generates string with multiple placeholders starting from a placeholder', () => {
            const faker = newFaker()
            const alias = faker.fromTemplate`${faker.any}: Do something amazing, like ${faker.any}`
            expect(alias()).toMatch(/[a-zA-Z0-9]+: Do something amazing, like [a-zA-Z0-9]+/)
        })
        
        it('If placeholder contains a constant then values is used as is', () => {
            const faker = newFaker()
            const alias = faker.fromTemplate`My name is ${'Vikash'} and I live in ${'India'}`
            expect(alias()).toEqual('My name is Vikash and I live in India')
        })

        it('Generates different strings each time', () => {
            const faker = newFaker()
            const alias = faker.fromTemplate`My name is ${faker.any} and I live in ${faker.any}`
            const str1 = alias(), str2 = alias(), str3 = alias()

            expect(str1).not.toEqual(str2)
            expect(str1).not.toEqual(str3)
            expect(str2).not.toEqual(str3)
        })
    })
})